import { RateLimitOptions } from "@fastify/rate-limit";

/**
 * Enterprise Rate Limit Profiles
 * Defines different traffic characteristics for various API modules.
 */

export const AuthRateLimit: RateLimitOptions = {
  max: 5,
  timeWindow: "1 minute",
  // Specific error for security-sensitive throttling
  errorResponseBuilder: (request: any, context: any) => ({
    statusCode: 429,
    error: "Too Many Requests",
    message: `Authentication attempt blocked. Try again in ${context.after}.`,
    code: "AUTH_THROTTLED"
  })
};

export const StandardRateLimit: RateLimitOptions = {
  max: 100,
  timeWindow: "1 minute",
};

export const SearchRateLimit: RateLimitOptions = {
  max: 200,
  timeWindow: "1 minute",
};

export const InternalRateLimit: RateLimitOptions = {
  max: 1000,
  timeWindow: "1 minute",
};
