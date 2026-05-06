# Data Architecture & Drizzle Best Practices

VKC V2 uses **Drizzle ORM** with **PostgreSQL** as the core data engine. This combination ensures near-zero latency, serverless readiness, and total type safety for our evolving set of database models.

## 1. Modular Schema Strategy
Following the **Modular Monolith** architecture, we do not use a single `schema.ts`. Instead, we split tables into domain-focused files.

**Directory Structure**:
```text
@workspace/db/
├── schema/
│   ├── auth.ts       # Users, Roles, Sessions
│   ├── members.ts    # Profiles, Identity, Verification
│   ├── features/
│   │   ├── professionals.ts
│   │   ├── matrimony.ts
│   │   └── donors.ts
│   └── enums.ts      # Shared PG Enums
└── index.ts          # Central Export
```

## 2. Industry-Standard Best Practices

### A. Strict Migrations
When using `drizzle-kit`, strict mode is mandatory. This prevents ambiguous changes (like column renames) from being interpreted as a "drop and create."

```json
// drizzle.config.ts
export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: 'pg',
  strict: true, // Prevents accidental data loss
}
```

### B. PostgreSQL Identity Columns
We prefer `generatedAlwaysAsIdentity()` for internal primary keys to ensure sequential integrity and performance.

```typescript
export const members = pgTable('members', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar('public_id', { length: 21 }).notNull().unique(), // NanoID for URLs
  name: text('name').notNull(),
  // ...
});
```

### C. Explicit Foreign Keys & Relations
While Drizzle offers a `relations()` API for developer convenience in queries, **physical database constraints** must be explicitly defined using `.references()`.

```typescript
export const professionalProfiles = pgTable('professional_profiles', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  profileId: integer('profile_id').notNull().references(() => profiles.id),
  
  category: expertCategoryEnum('category').notNull(),
  experienceYears: integer("experience_years").notNull(),
  bio: text("bio"),
});
```

## 3. Physical Namespacing: PostgreSQL Schemas
To maintain our **Modular Monolith** isolation, we use `pgSchema()` to separate tables into module-specific namespaces. This prevents table name collisions and prepares the data for potential extraction into microservices.

```typescript
// @workspace/db/schema/matrimony.ts
import { pgSchema } from "drizzle-orm/pg-core";

const matrimonySchema = pgSchema("matrimony_mod");

export const profiles = matrimonySchema.table("profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  // ... module specific fields
});
```

## 4. Performance: Prepared Statements
For high-traffic endpoints (e.g., Professionals search), use Prepared Statements to cache the query plan.

```typescript
// @workspace/db/services/professional.ts
const p1 = db.select().from(professionalProfiles).where(eq(professionalProfiles.category, placeholder('cat'))).prepare('p1');

const results = await p1.execute({ cat: 'MEDICAL' });
```

### E. Validation: Zod Integration
Ensure backend logic and frontend forms use zero-effort synchronization.

```typescript
import { createSelectSchema } from 'drizzle-zod';
export const selectUserSchema = createSelectSchema(users);
```

## 3. Scalability: Serverless & Edge Ready
Drizzle’s tiny bundle size (~7.4 KB) and lack of a heavy query engine make it ideal for our planned expansion into **Cloudflare Workers** or **Vercel Edge Functions** to handle global community traffic with minimal latency.
