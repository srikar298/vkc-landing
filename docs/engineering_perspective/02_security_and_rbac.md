# Security & Role-Based Access Control (RBAC)

This document defines the technical implementation of roles and sub-roles in the VKC platform using **Drizzle ORM** and **PostgreSQL**.

## 1. Role Hierarchy
We implement a multi-tiered security model where roles are stored as **PostgreSQL Enums** for maximum performance and type safety.

### Technical Roles (Primary)
Stored in the `users.role` column:
- `GUEST`: Unauthenticated visitor.
- `MEMBER_BASIC`: Registered user with Digital ID.
- `MEMBER_VERIFIED`: ID-verified user with Matrimony access.
- `EXPERT`: Professional hub member (Doctors, Lawyers, etc.).
- `MODERATOR`: Content and user report manager.
- `SUPER_ADMIN`: Global system controller.

## 2. Drizzle Implementation: Schema Definitions

We use `pgEnum` to maintain a single source of truth for all role definitions.

```typescript
// @workspace/db/schema/enums.ts
import { pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', [
  'GUEST', 
  'MEMBER_BASIC', 
  'MEMBER_VERIFIED', 
  'EXPERT', 
  'MODERATOR', 
  'SUPER_ADMIN'
]);

export const donorTierEnum = pgEnum('donor_tier', [
  'SILVER', 
  'GOLD', 
  'PATRON'
]);

export const expertCategoryEnum = pgEnum('expert_category', [
  'MEDICAL', 
  'LEGAL', 
  'TECH', 
  'ARCHITECTURE', 
  'ACADEMIC'
]);
```

## 3. Sub-Role Matrix
Sub-roles are specialized permissions that stack on top of primary roles, typically stored in specialized hub tables.

| Role | Sub-Role Table | Purpose |
| :--- | :--- | :--- |
| **EXPERT** | `professional_profiles.category` | Defines if the expert is `MEDICAL`, `LEGAL`, etc. |
| **MEMBER_VERIFIED** | `donors.tier` | Defines if the member is a `PATRON`, `GOLD`, or `SILVER` donor. |
| **MODERATOR** | `admin_permissions.scope` | Restricts moderation to specific hubs (e.g., `MATRIMONY_MOD`). |

## 4. Zod Validation (drizzle-zod)
To ensure the frontend and backend are perfectly synchronized, we generate validation schemas directly from the Drizzle definitions.

```typescript
// @workspace/shared/validators/auth.ts
import { createInsertSchema } from 'drizzle-zod';
import { users } from '@workspace/db/schema/users';

// This schema automatically enforces the roleEnum constraints
export const insertUserSchema = createInsertSchema(users);
```

## 5. Middleware & Guardians
Access control is enforced at the **API Route Handler** level and the **Service Layer** level.

> [!IMPORTANT]
> **Privacy Guardrail**: Any query fetching `matrimony_profiles` must first verify the requesting user has the `MEMBER_VERIFIED` role.
