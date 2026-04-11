import { integer, varchar, text, timestamp, primaryKey, index } from "drizzle-orm/pg-core";
import { authSchema, users } from "./users";

// Roles Table (Dynamic)
export const roles = authSchema.table("roles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 50 }).notNull().unique(), // e.g. 'MEMBER_VERIFIED'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Permissions Table
export const permissions = authSchema.table("permissions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar("slug", { length: 100 }).notNull().unique(), // e.g. 'matrimony:search'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Role-Permissions Join Table
export const rolePermissions = authSchema.table("role_permissions", {
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  permissionId: integer("permission_id")
    .notNull()
    .references(() => permissions.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
  // Optimizes reverse lookup: Given a permission, find all roles
  idx_perm_id: index("idx_role_perms_permission_id").on(t.permissionId),
}));

// User-Roles Join Table
export const userRoles = authSchema.table("user_roles", {
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.roleId] }),
  // Optimizes reverse lookup: Given a role, find all users
  idx_role_id: index("idx_user_roles_role_id").on(t.roleId),
}));
