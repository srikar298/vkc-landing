// Best Practice: Shared rate-limit configurations for Fastify
export const defaultRateLimit = {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: (request: any, context: any) => ({
    statusCode: 429,
    error: 'Too Many Requests',
    message: `Rate limit exceeded. Try again in ${context.after}`,
  }),
};
