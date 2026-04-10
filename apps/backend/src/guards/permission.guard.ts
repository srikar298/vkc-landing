import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { db } from '@vishwakarma-k-c/db';
import { eq, and } from 'drizzle-orm';
import { userRoles, rolePermissions, permissions as permissionsTable } from '@vishwakarma-k-c/db';

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('checkPermission', async (request: FastifyRequest, reply: FastifyReply, requiredPermission: string) => {
    // 1. Get user from request (Added by Auth Middleware usually)
    const userId = (request as any).user?.id;
    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    // 2. Query DB for Permission check
    // In a real SDE-3 app, this would be cached in Redis
    const hasPermission = await db.select()
      .from(userRoles)
      .innerJoin(rolePermissions, eq(userRoles.roleId, rolePermissions.roleId))
      .innerJoin(permissionsTable, eq(rolePermissions.permissionId, permissionsTable.id))
      .where(and(
        eq(userRoles.userId, userId),
        eq(permissionsTable.slug, requiredPermission)
      ))
      .limit(1);

    if (hasPermission.length === 0) {
      return reply.code(403).send({ error: 'Forbidden: Insufficient Permissions' });
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    checkPermission: (request: FastifyRequest, reply: FastifyReply, requiredPermission: string) => Promise<void>;
  }
}
