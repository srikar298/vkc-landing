import { pgSchema, integer, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { roleEnum } from "./enums";

// Isolated Schema as per Modular Monolith Strategy
export const authSchema = pgSchema("auth_mod");

export const users = authSchema.table("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar("public_id", { length: 21 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: roleEnum("role").default("MEMBER_BASIC").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
