import { pgSchema, integer, varchar, timestamp, text, index } from "drizzle-orm/pg-core";
import { roleEnum } from "../../enums/iam";
import { UserRole } from "@vishwakarma-k-c/shared";

// Isolated Schema as per Modular Monolith Strategy
export const authSchema = pgSchema("auth_mod");

export const users = authSchema.table("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar("publicId", { length: 21 }).notNull().unique(),
  firstName: text("firstName"), // Optional for initial OTP signup
  lastName: text("lastName"),   // Optional for initial OTP signup
  role: roleEnum("role").default(UserRole.MEMBER_BASIC).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
}, (table) => [
  // Covering Index: Optimizes lookups by publicId to include role and id in a single index scan
  index("idx_users_publicId_role").on(table.publicId, table.role, table.id),
]);
