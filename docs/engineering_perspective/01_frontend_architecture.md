---
sidebar_position: 1
title: Enterprise Frontend Architecture (React + Vite)
description: Strict, scalable architecture pattern designed for 10+ engineers working on the React/Vite SPA.
---

# Enterprise Frontend Architecture

This document defines the strict, production-ready frontend architecture for our **Vite-based React application** (VKC Platform). 

This pattern is designed for:
- Pure Client-Side Rendering (CSR) React applications using Vite.
- Standalone frontend repositories integrating with an external API or Supabase.
- Extensive use of **Shadcn/ui** for building accessible, premium design systems.
- **Feature-first** (vertical slice) development.
- Strict dependency direction and encapsulated boundaries to survive years of rapid scaling.

---

## 🏗 Folder Structure (Feature-Sliced React)

```text
src/
│
├── app/                          # React App Composition & Routing Adapter
│   ├── routes.tsx                # React Router DOM configuration
│   ├── layout.tsx                # Global application shell
│   ├── providers.tsx             # Context, QueryClient, Auth Providers
│   └── index.tsx                 # Application entry point
│
├── features/                     # Business UI domains (Vertical Slices)
│   ├── auth/
│   │   ├── components/           # UI Components (Feature specific)
│   │   ├── hooks/                # Complex local logic & Query Hooks
│   │   ├── services/             # UI orchestration
│   │   ├── store/                # Zustand local state
│   │   ├── mappers/              # DTO -> ViewModel conversion
│   │   ├── types/
│   │   ├── __tests__/
│   │   └── index.ts              # STRICT Public API Boundary
│   │
│   ├── heritage/
│   └── artisan-directory/
│
├── shared/                       # Pure domain-agnostic layer
│   ├── ui/                       # Shadcn/ui baseline components
│   ├── hooks/                    # Stateless reusable hooks
│   ├── lib/                      # Pure utilities (cn utility, parsers)
│   ├── constants/
│   ├── types/
│   └── index.ts
│
├── infrastructure/               # IO Boundary Layer
│   ├── http/                     # Axios/fetch/Supabase base instances
│   ├── api/                      # Backend API clients
│   ├── interceptors/             # Auth refresh logic, error normalization
│   ├── config/                   # Typed env config & endpoints
│   ├── monitoring/               # Logger, Analytics wrappers
│   └── persistence/              # localStorage/sessionStorage handlers
│
├── contracts/                    # Backend DTO contracts & Zod schemas
│   ├── user.contract.ts          # Zod schema directly matching backend shape
│   ├── directory.contract.ts
│   └── index.ts
│
├── tests/                        # Cross-feature test configurations
│   ├── integration/
│   ├── e2e/
│   └── mocks/                    # MSW handlers & workers
│
└── main.tsx                      # Vite Root Mount
```

---

## 🎨 Shadcn/ui & Shared Component Strategy

We use [Shadcn/ui](https://ui.shadcn.com/) as the foundational design system. To align it perfectly with the architecture:

1. **Configuration**: When configuring Shadcn (`components.json`), route the core components directly into `src/shared/ui/` instead of the default `src/components/ui/`. The utility file should perfectly map to `src/shared/lib/utils.ts`.
2. **Ownership**: Baseline Shadcn components (`Button`, `Dialog`, `Input`) belong globally to `shared/`. They must remain generic. 
3. **Usage**: If `features/heritage` requires a heavily customized Timeline Card, you **compose** it inside the feature folder using the baseline Shadcn elements. Do not bake heritage-specific logic into the global Shadcn components.

---

## 🔒 Strict Dependency Direction (Non-Negotiable)

The direction of dependency is the real architecture. It limits the "blast radius" of code changes.

```text
app → features → shared
app → infrastructure
features → infrastructure
features → contracts
infrastructure → contracts

shared → nothing
contracts → nothing
```

### ❌ Forbidden Dependencies
- `feature` → `feature` (A feature cannot hard-import another feature. Use generic shared hooks or context instead).
- `shared` → `feature`
- `infrastructure` → `feature`
- `app` → internal feature paths (deep imports)

**💥 Public API Enforcement Rule:** Every feature MUST expose its components and hooks only via `features/[name]/index.ts`. Deep imports (e.g., `import { Form } from '@/features/auth/components/Form'`) are strictly forbidden.

---

## 🧠 Layer Responsibilities

### 1️⃣ `app/` — Composition Layer
Responsible for unifying the app. Defines `react-router-dom` trees, error boundaries, and context providers.
**Must NOT contain:** Business logic, actual API calls, or DTO mapping.

---

### 2️⃣ `features/` — UI Domain Modules
Where product managers' requirements actually live.
**Responsibilities:** UI components, feature-level state (Zustand), TanStack Query hooks, UI orchestration.
**Must NOT:** Call `fetch` or `supabase` queries directly in components.

**❌ No DTO Leakage Rule:** React components must NEVER consume raw backend DTO types. ✅ Always map them to ViewModels via Mapper functions. If the Backend changes a key from `created_at` to `createdAt`, only the Mapper file changes; the 20 UI components utilizing it remain perfectly untouched.

---

### 3️⃣ `infrastructure/` — IO Layer
Your boundary to the physical world (APIs, LocalStorage, Analytics, Supabase).

**❌ No Direct Database Rules in UI:** Avoid raw Supabase queries in the view layer.
```ts
// ❌ WRONG (Inside a Component)
const { data } = await supabase.from('users').select('*');

// ✅ CORRECT (Inside infrastructure/api/users.api.ts)
import { supabase } from '../config/supabaseClient';
import { UserSchema } from '@/contracts/user.contract';

export async function fetchDirectory() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  
  // Zod Validation guarantees runtime safety before hitting the UI
  return data.map(UserSchema.parse); 
}
```

---

### 4️⃣ `contracts/` — The Stability Layer
All backend Zod schemas and DTO TypeScript interfaces live here. Since this is a standalone frontend repository without access to monorepo types, these contracts represent our strict agreement with the backend APIs. If an API breaks contract, Zod catches it here before the UI crashes.

---

## ⚡ Performance & Data Fetching (Vite SPA Specifics)

Because we aren't using Next.js Server Components, managing our JavaScript bundle size is incredibly critical to hit performance KPIs.

1. **Route-Level Code Splitting (React.lazy)**
   Never load the massive Artisan Directory code when a user is just reading the Home page.
   ```tsx
   import { Suspense, lazy } from 'react';
   const ArtisanDirectory = lazy(() => import('@/features/directory'));
   ```
2. **Server State Management**
   Use **TanStack Query (React Query)** or RTK Query exclusively for fetching logic. It seamlessly handles caching, invalidation, polling, and optimistic updates.
3. **Optimistic UI Updates**
   Interactions (like clicking "Follow" or registering) must feel immediate. Manipulate the React Query cache manually on click via `onMutate`, and quietly revert if the server throws an error.

---

## 📊 State Ownership Rules

| State Type | Primary Location | Responsibility |
| :--- | :--- | :--- |
| **UI State** | Component (`useState`) | Modals open/close, toggle switches. |
| **Feature State** | `feature/store` (Zustand) | Shared multi-step form data between components. |
| **Server State** | TanStack Query | Caching, loading, error synchronization with the DB/API. |
| **Global State** | `app/providers` (Context) | Color theme, Auth session, Localization (i18n). |

---

## 🔍 SEO & Meta Strategy (For CSR)

Single Page Apps naturally struggle with SEO. To compensate:
1. **Dynamic Meta Tags (`react-helmet-async`)**: Inject clean `<title>`, `<meta name="description">`, and proper Open Graph tags dynamically upon route change.
2. **Proper Routing Structure**: Utilize clean, hierarchical React Router paths (no hash `#` routing for pages you want indexed).
3. **Automated Sitemap**: Keep `public/sitemap.xml` strictly synced with the public-facing pages.

---

## 🚨 Mandatory Error Boundary Granularity

For large applications, error boundaries are **mandatory**. 
- Every feature's root export MUST be wrapped in a React `ErrorBoundary`.
- If an API fails inside the `ArtisanDirectory` feature, that segment should cleanly display a fallback UI ("Failed to load directory. [Retry]"). It must **never** crash the entire VKC website header and navigation array.
