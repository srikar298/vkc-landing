import { z } from 'zod';

// Best Practice: Type-safe environment variable validation with constraints
const configSchema = z.object({
  // Database connection string (e.g. postgres://user:pass@host:port/db)
  DATABASE_URL: z.string().url().min(10, "DATABASE_URL is too short"),

  // Port mapping, converted to number with range validation
  PORT: z.preprocess(
    (v) => parseInt(v as string, 10),
    z.number().min(1, "Port must be at least 1").max(65535, "Port cannot exceed 65535")
  ).default('3000'),

  // Environment strings
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Logging level
  LOG_LEVEL: z.enum(['info', 'debug', 'warn', 'error']).default('info'),
});

// Execute validation immediately on import to fail fast
const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(parsedConfig.error.format(), null, 2));
  process.exit(1);
}

// Export the "Golden Config" to be used across the monorepo
export const config = parsedConfig.data;
