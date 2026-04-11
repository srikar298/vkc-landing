import { describe, it, expect, beforeAll } from 'vitest';
import { db } from "../../../index";
import { roles, permissions, rolePermissions } from "./index";
import { eq, sql } from "drizzle-orm";

describe("IAM Database Integration Tests", () => {
  it("should have the auth_mod schema in the search_path", async () => {
    const result = await db.execute(sql`SHOW search_path;`);
    const searchPath = (result as any)[0].search_path;
    expect(searchPath).toContain('auth_mod');
  });

  it('should be able to see the roles table in auth_mod', async () => {
    const allRoles = await db.select().from(roles);
    expect(allRoles.length).toBeGreaterThan(0);
    expect(allRoles.map(r => r.name)).toContain('SUPER_ADMIN');
  });

  it('should have correct permission mappings for SUPER_ADMIN', async () => {
    const adminRole = await db.query.roles.findFirst({
      where: eq(roles.name, 'SUPER_ADMIN'),
      with: {
        // This requires relational helpers to be defined in schema (which I should check!)
      }
    });

    // Fallback to manual join test if relational helpers are missing
    const adminPerms = await db.select()
      .from(roles)
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(eq(roles.name, 'SUPER_ADMIN'));

    expect(adminPerms.length).toBeGreaterThan(0);
    expect(adminPerms.some(p => p.permissions.slug === 'admin:full_access')).toBe(true);
  });

  it('should respect unique constraints on permission slugs', async () => {
    // Attempting to insert a duplicate slug should fail
    const duplicatePerm = { slug: 'heritage:view', description: 'Dupe' };
    await expect(db.insert(permissions).values(duplicatePerm)).rejects.toThrow();
  });
});
