import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/**/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // This is the key for supporting multiple PostgreSQL schemas (auth_mod, etc.)
  schemaFilter: ["public", "auth_mod", "member_mod"],
  strict: true,
  verbose: true,
});
