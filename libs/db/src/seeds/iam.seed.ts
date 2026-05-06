import { eq, sql } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { roles, permissions, rolePermissions } from "../schema/modules/iam/permissions";
import { users, identities } from "../schema/modules/iam/index";
import { userRoles } from "../schema/modules/iam/permissions";
import { config } from "@vishwakarma-k-c/shared";

export async function seedIAM(db: any) {
  console.log("  - Ensuring auth_mod schema exists...");
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS auth_mod;`);

  // 1. Seed Permissions
  const permissionsToSeed = [
    { slug: "heritage:view", description: "View the heritage story gallery" },
    { slug: "auth:register", description: "Register as a new member" },
    { slug: "profile:manage", description: "Manage own user profile" },
    { slug: "network:view_teaser", description: "View teaser data in networking hubs" },
    { slug: "matrimony:search", description: "Search for matrimony candidates" },
    { slug: "matrimony:contact", description: "Contact matrimony profiles" },
    { slug: "official:view", description: "View community official details" },
    { slug: "expert:publish_listing", description: "Publish expert profile" },
    { slug: "mentorship:respond", description: "Respond to mentorship requests" },
    { slug: "system:write_config", description: "Modify system-wide configurations" },
    { slug: "admin:full_access", description: "Complete access to all admin tools" },
  ];

  console.log("  - Seeding Permissions...");
  for (const p of permissionsToSeed) {
    await db.insert(permissions).values(p).onConflictDoUpdate({
      target: permissions.slug,
      set: { description: p.description },
    });
  }

  // 2. Seed Roles
  const rolesToSeed = [
    { name: "GUEST", description: "Unregistered visitor" },
    { name: "MEMBER_BASIC", description: "Standard registered member" },
    { name: "MEMBER_VERIFIED", description: "Verified community member" },
    { name: "EXPERT", description: "Verified domain expert" },
    { name: "MODERATOR", description: "Community moderator" },
    { name: "SUPER_ADMIN", description: "System administrator" },
  ];

  console.log("  - Seeding Roles...");
  for (const r of rolesToSeed) {
    await db.insert(roles).values(r).onConflictDoUpdate({
      target: roles.name,
      set: { description: r.description },
    });
  }

  // 3. Link Roles to Permissions
  console.log("  - Linking Roles and Permissions...");
  const mapping: Record<string, string[]> = {
    GUEST: ["heritage:view", "auth:register"],
    MEMBER_BASIC: ["heritage:view", "profile:manage", "network:view_teaser"],
    MEMBER_VERIFIED: [
      "heritage:view",
      "profile:manage",
      "matrimony:search",
      "matrimony:contact",
      "official:view",
    ],
    EXPERT: [
      "heritage:view",
      "profile:manage",
      "expert:publish_listing",
      "mentorship:respond",
    ],
    SUPER_ADMIN: permissionsToSeed.map((p) => p.slug),
  };

  for (const [roleName, permissionSlugs] of Object.entries(mapping)) {
    const role = await db.query.roles.findFirst({
      where: eq(roles.name, roleName),
    });
    if (!role) continue;

    for (const slug of permissionSlugs) {
      const perm = await db.query.permissions.findFirst({
        where: eq(permissions.slug, slug),
      });
      if (!perm) continue;

      await db
        .insert(rolePermissions)
        .values({
          roleId: role.id,
          permissionId: perm.id,
        })
        .onConflictDoNothing();
    }
  }

  // 4. Seed Initial Super Admin User (Environmental)
  if (config.auth.initialAdminIdentifier) {
    console.log(`  - Seeding Super Admin: ${config.auth.initialAdminIdentifier}`);
    
    // Check if user already exists
    const adminIdentifier = config.auth.initialAdminIdentifier;
    const provider = adminIdentifier.includes("@") ? "EMAIL" : "PHONE";

    const existingIdentity = await db.query.identities.findFirst({
      where: eq(identities.identifier, adminIdentifier),
    });

    if (!existingIdentity) {
      await db.transaction(async (tx: any) => {
        // Create User
        const [newUser] = await tx.insert(users).values({
          role: "SUPER_ADMIN",
          firstName: "System",
          lastName: "Admin",
        }).returning();

        // Create Identity
        await tx.insert(identities).values({
          userId: newUser.id,
          provider: provider,
          identifier: adminIdentifier,
          isVerified: true,
        });

        // Assign Role
        const superAdminRole = await tx.query.roles.findFirst({
          where: eq(roles.name, "SUPER_ADMIN"),
        });

        if (superAdminRole) {
          await tx.insert(userRoles).values({
            userId: newUser.id,
            roleId: superAdminRole.id,
          });
        }
      });
      console.log("    ✔ Super Admin created successfully.");
    } else {
      console.log("    ℹ Super Admin identity already exists. Skipping creation.");
    }
  } else {
    console.log("  ⚠ No INITIAL_ADMIN_IDENTIFIER found. Skipping admin user seeding.");
  }
}
