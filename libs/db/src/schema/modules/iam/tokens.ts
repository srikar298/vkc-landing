import { integer, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { authSchema, users } from "./users";

/**
 * Refresh Tokens Table
 * Supports token rotation and revocation.
 */
export const refreshTokens = authSchema.table("refreshTokens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  isRevoked: boolean("isRevoked").default(false).notNull(),
  replacedByToken: varchar("replacedByToken", { length: 255 }), // For rotation tracking
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
