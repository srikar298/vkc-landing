# Vishwakarma Nexus (Technical Core)
> **Powered by Vishwakarma Knowledge Centre (VKC)**

**Vishwakarma Nexus** is the next-generation modular platform for the global Vishwakarma community. It bridges 5,000 years of traditional artisan heritage with modern digital empowerment, providing a high-granularity technical foundation for identity, networking, finance, and community growth.

---

## 🏛️ Project Vision
Vishwakarma Nexus is designed as a **Modular Monolith**, allowing for clear domain boundaries and independent scaling of features while maintaining the simplicity of a unified codebase. Our goal is to provide a "Digital Backbone" for artisans and professionals, enabling:
- **Verified Digital Identity**: Institutional recognition for traditional craftsmen.
- **Economic Empowerment**: Seamless directory search and professional networking.
- **Dynamic Growth**: Independent modules for Matrimony, Finance, Education, and Heritage.

---

## 🛠️ Technical Stack
The project utilizes a high-performance, type-safe polyglot stack:

- **Backend**: [Fastify](https://www.fastify.io/) (Node.js) with [Zod](https://zod.dev/) for contract-first API development.
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/) using granular schema isolation.
- **Web Hub**: [React](https://react.dev/) (TypeScript) + [Vite](https://vitejs.dev/) + [Tailwind CSS](https://tailwindcss.com/).
- **Mobile**: [Flutter](https://flutter.dev/) (Dart) for high-fidelity cross-platform experience.
- **Orchestration**: [Nx](https://nx.dev/) for monorepo management and task caching.

---

## 🏗️ Modular Architecture
To ensure scalability, the backend is organized into granular, logically isolated modules:

| Module | Responsibility |
| :--- | :--- |
| **IAM** | Identity & Access Management (Auth, Roles, Sessions). |
| **Members** | Core profiles, Digital ID generation, and verification. |
| **Finance** | Payments, ledger management, and transactional auditing. |
| **Matrimony** | High-growth matchmaking and interaction engine. |
| **Professionals** | Dedicated directory for artisans and professional experts. |
| **Community** | Events, Testimonials, and Donor management. |
| **Heritage** | Divine CMS for historical records, legends, and scriptures. |
| **Support** | Lead management, inquiries, and customer support. |

---

## 🤝 Open to Contributions
We believe in the power of the community. Vishwakarma Nexus is an open-source project, and we welcome contributions from developers, designers, and domain experts.

### **How to Contribute**
1.  **Fork** the repository to your own account.
2.  **Clone** your fork locally.
3.  **Create a branch** for your feature: `git checkout -b feature/feat/my-awesome-feature`.
4.  **Implement & Test**: Ensure your changes follow our coding standards (Clean Architecture, Type Safety).
5.  **Submit a PR**: Open a Pull Request from your fork to the `develop` branch of the main repository.

> [!NOTE]
> Please refer to our [**Branching Strategy**](./docs/branching_strategy.md) for detailed workflow instructions.

---

## 📈 Roadmap
We are currently in **Phase 1: Foundation & Identity**.
1.  **Iterative Onboarding**: Implementing the paid membership flow via Finance integration.
2.  **Digital ID Card**: Dynamic generation and persistence of artisan identities.
3.  **Heritage Timeline**: Building the interactive divine history experience.

---

## 📜 License
This project is licensed under the terms defined by the **Vishwakarma Knowledge Centre**.

---
*Built with precision and devotion by the Vishwakarma Community.*
