# Modular Monolith Strategy

VKC V2 adheres to a **Modular Monolith** architecture. This provides the clean boundaries, isolation, and developer experience of microservices without the operational complexity or network latency.

## 1. Core Principles: The "No-Leaking" Policy
To ensure our modules remain truly independent, we follow strict interaction rules:

- **Service-Only Communication**: If the `Matrimony` module needs user data, it must call `userService.findById()`. It is **strictly forbidden** to import and query the `users` database table directly from another module.
- **Independent Folders**: Every module (e.g., `professionals`, `matrimony`) contains its own controllers, services, and internal logic.
- **Physical Isolation**: Each module utilizes its own PostgreSQL schema (namespace) via Drizzle.

---

## 2. Module Inventory (Granular)
To support independent scaling and clear ownership, we organize the backend into the following granular modules:

- **IAM (Identity & Access Management)**: Authentication, Session, and Role-based security.
- **Members**: Core artisan/member profiles and Digital ID generation.
- **Finance**: Payments, transactions, ledgers, and invoicing.
- **Matrimony**: High-growth matchmaking engine.
- **Professionals**: Directory listing for artisans and professional experts.
- **Community**: Events, testimonials, and donor management.
- **Heritage**: Divine CMS for historical records and scriptures.
- **Support**: Inquiries, leads, and customer support.

---

## 3. Communication Patterns

### Internal API (Direct Calls)
Used for synchronous interactions where immediate consistency is required.
```typescript
// modules/matrimony/service.ts
async function createCandidate(data: any) {
  // Call other module via its public service interface
  const user = await userService.getVerifiedUser(data.userId); 
  if (!user) throw new Error("User must be verified");
  
  return await db.insert(matrimonyProfiles).values(data);
}
```

### Internal Event Bus (Decoupling)
Used for side effects that don't need to block the primary request (e.g., sending notification emails or updating search indexes).
```typescript
// modules/users/service.ts
async function registerUser(data: any) {
  const user = await db.insert(users).values(data);
  
  // Decoupled notification
  eventEmitter.emit('user.registered', user); 
}
```

---

## 3. Dependency Injection & Bootstrapping
We use **Fastify Plugins** to manage module isolation during the application lifecycle.

- **Isolation**: Each module is a self-contained Fastify plugin.
- **Registry**: The `main.ts` entry point registers these plugins in order.
- **Decorators**: Shared services (like the database or logger) are "decorated" onto the Fastify instance for easy, type-safe access.

---

## 4. External Gateways

### ConnectRPC (Proto/gRPC)
Our **"Golden Path"** for communication with the **Flutter Mobile App**. This provides a strict, typed contract that generates both TypeScript and Dart code.

### Pothos GraphQL
Used for the **React Admin Dashboard**. Pothos allows us to define types and resolvers within each individual module and then merge them into a single, cohesive schema at the root.

---

## 5. Architectural Benefits
1. **Transactional Integrity**: We can maintain ACID transactions across module boundaries because they share a single physical database.
2. **Simplified DevOps**: One CI/CD pipeline, one deployment target, and unified logging.
3. **Future Microservices**: If the `Matrimony` hub grows too large, it can be extracted into its own repository and database with minimal code changes.
