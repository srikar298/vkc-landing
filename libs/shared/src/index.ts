import "fastify";

declare module "fastify" {
  interface FastifyContextConfig {
    idempotency?: boolean;
  }
}

export * from './logger';
export * from './config';
export * from './rate-limit';
export * from './constants';
export * from './auth/jwt.service';
export * from './auth/fastify-guards';
export * from './messaging/firebase.service';
export * from './domain-shared/enums';
export * from './validation/auth.schema';
export * from './cache/interfaces/cache-provider.interface';
export * from './cache/providers/redis-cache.provider';
export * from './rate-limit/profiles';
export { default as idempotencyPlugin } from './infrastructure/plugins/idempotency.plugin';

// Domain Shared Utilities
export * from './domain-shared/result';
export * from './domain-shared/errors';
export * from './domain-shared/branding';
