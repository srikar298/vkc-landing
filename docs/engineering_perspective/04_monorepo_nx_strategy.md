# Polyglot Monorepo Strategy: Nx + Melos + Flutter

This document outlines the architectural strategy for managing the VKC V2 expansion as a **Polyglot Monorepo**. This setup integrates the TypeScript ecosystem (React, Node, Hono) with the Dart ecosystem (Flutter).

## 1. The Orchestration Layer: Nx
We use **Nx** as the primary workspace orchestrator. Nx manages the dependency graph across all languages and ensures that tasks (build, test, lint) are executed efficiently with unified caching.

### Why Nx for the Polyglot Stack?
- **Unified Workflow**: A single command (`nx run-many -t test`) can trigger tests across both React and Flutter projects in parallel.
- **Smart Caching**: Nx understands the relationship between projects. If the Backend API contract changes, Nx can trigger a rebuild/regeneration for the Flutter app.
- **Generators**: Custom generators automate the creation of new domain modules, adding backend endpoints and generating Dart client code in a single step.

---

## 2. Dart Package Management: Melos
While Nx orchestrates the overall graph, we use **[Melos](https://melos.invertase.dev/)** to manage the internal Dart/Flutter workspace logic (resolving `pubspec.yaml` dependencies and linking).

### The "Bridge" Pattern
Nx triggers Melos commands. This allows the Dart environment to remain "standard" while benefiting from the Nx task runner and distributed caching.

---

## 3. The "Golden Path" Architecture
To support an iterative modular growth and cross-platform clients, we adopt a domain-focused directory structure:

```text
/ (Root)
├── apps/
│   ├── mobile/            # Flutter Mobile App (Dart/Melos)
│   ├── web-dashboard/     # React Admin (Pothos/Tailwind)
│   └── backend/           # Fastify Modular Monolith (TypeScript)
│       ├── src/
│       │   ├── modules/
│       │   │   ├── users/     # Isolated user logic & services
│       │   │   ├── matrimony/ # Isolated matrimony hub
│       │   │   └── donors/    # Isolated donor management
│       │   └── main.ts        # Central Fastify entry point
├── libs/
│   ├── shared/            # Zod schemas, Utility types
│   ├── db/                # Drizzle ORM (pgSchema based)
│   └── api-contracts/     # OpenAPI / Proto Definitions
├── nx.json                # Nx Task & Cache configuration
└── melos.yaml             # Dart workspace configuration
```

## 4. Contract Sharing: The "Glue"
To ensure the Web Hub and Flutter App never drift from the Backend logic, we use **OpenAPI Generator**:

1.  **Define**: The Hono backend exports an OpenAPI spec in the `libs/api-contracts` folder.
2.  **Generate**: Nx detects changes to the spec and triggers `openapi-generator` to update the Dart API client inside `apps/mobile`.
3.  **Validate**: Zod schemas in `libs/shared` remain the source of truth for the TypeScript side, ensuring end-to-end type safety.

---

## 5. Technical Decision Log: Nx vs. Turborepo
| Feature | Nx (Chosen) | Turborepo |
| :--- | :--- | :--- |
| **Flutter Integration** | **High**: Native plugins for Dart task inference. | **Manual**: Shell-script based integration. |
| **Cross-Language Sync** | **Smart**: Auto-detects dependencies across ecosystems. | **Manual**: Requires explicit config updates. |
| **Generators** | **Full Schematics**: Automates polyglot feature scaffolding. | **None**: No built-in scaffolding engine. |

> [!TIP]
> **Performance Optimization**: For high-scale CI/CD, enable **Nx Cloud** to share task results across the team and ensure that the Flutter build (~15-30 mins) is cached unless code changes occur.
