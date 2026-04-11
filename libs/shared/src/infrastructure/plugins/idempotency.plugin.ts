import { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { cacheProvider, logger } from "../../index";

/**
 * Enterprise Idempotency Plugin
 * Plugs into the Fastify lifecycle to provide idempotent request handling.
 */
const idempotencyPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  
  fastify.addHook("preHandler", async (request: FastifyRequest, reply: FastifyReply) => {
    // Only apply to routes that opted in
    if (!request.routeOptions.config.idempotency) return;

    const idempotencyKey = request.headers["idempotency-key"] as string;

    if (!idempotencyKey) {
      reply.code(400).send({
        error: "Bad Request",
        message: "Idempotency-Key header is required for this operation."
      });
      return;
    }

    // Identify the user (must be authenticated before this plugin runs)
    const userId = (request as any).user?.id || "anonymous";
    const cacheKey = `idemp:${userId}:${idempotencyKey}`;

    // 1. Check for cached response or in-progress lock
    const cached = await cacheProvider.get<{ status: number; body: any; headers?: any }>(cacheKey);

    if (cached) {
      if (cached === ("IN_PROGRESS" as any)) {
        logger.warn({ cacheKey }, "Idempotency: Request conflict detected.");
        return reply.code(409).send({
          error: "Conflict",
          message: "A request with the same Idempotency-Key is currently being processed."
        });
      }

      logger.info({ cacheKey }, "Idempotency: Cache hit.");
      reply.header("X-Idempotency-Cache", "HIT");
      
      // Re-apply headers if any
      if (cached.headers) {
        Object.entries(cached.headers).forEach(([k, v]) => reply.header(k, v));
      }

      return reply.code(cached.status).send(cached.body);
    }

    // 2. Set "In-Progress" lock (TTL: 30s)
    // We use a short TTL for the lock to prevent permanent deadlocks if the server crashes
    await cacheProvider.set(cacheKey, "IN_PROGRESS", 30);
    
    // Attach tracking info to request for the onSend hook
    (request as any)._idempotency = { cacheKey };
  });

  fastify.addHook("onSend", async (request: FastifyRequest, reply: FastifyReply, payload: any) => {
    const idemp = (request as any)._idempotency;
    if (!idemp) return payload;

    const { cacheKey } = idemp;
    const statusCode = reply.statusCode;

    // Only cache successful or client-error responses (2xx, 3xx, 4xx)
    // We usually don't cache 5xx to allow retries on server failures
    if (statusCode >= 200 && statusCode < 500) {
      try {
        const body = JSON.parse(payload);
        await cacheProvider.set(cacheKey, {
          status: statusCode,
          body,
          headers: { "Content-Type": reply.getHeader("content-type") }
        }, 86400); // Cache for 24 hours
        
        logger.debug({ cacheKey }, "Idempotency: Response cached.");
      } catch (err) {
        // If payload isn't JSON, we skip caching (or store as-is if needed)
        logger.error({ err, cacheKey }, "Idempotency: Failed to cache response.");
        await cacheProvider.delete(cacheKey);
      }
    } else {
      // Release the lock on server error to allow retry
      await cacheProvider.delete(cacheKey);
    }

    return payload;
  });

  fastify.addHook("onError", async (request: FastifyRequest, _reply, error) => {
    const idemp = (request as any)._idempotency;
    if (!idemp) return;

    // Release lock on crash
    logger.error({ error, cacheKey: idemp.cacheKey }, "Idempotency: Releasing lock due to error.");
    await cacheProvider.delete(idemp.cacheKey);
  });
};

export default fp(idempotencyPlugin, {
  name: "fastify-idempotency",
  fastify: "5.x",
});
