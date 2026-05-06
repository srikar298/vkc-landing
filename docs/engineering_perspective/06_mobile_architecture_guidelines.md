# Mobile Architecture & Engineering Discipline

This document establishes the enterprise-grade architectural standards, engineering discipline, and coding patterns for the `vkc_mobile` application. It is designed for engineers transitioning from a React/Next.js mental model to Flutter's declarative, layered paradigm.

---

## 🧠 1. Mental Model Shift (React → Flutter)

Flutter is not just "React for Mobile"; it is a single-runtime, Skia-rendered environment where UI, state, and logic must be tightly structured in layers.

| React / Next       | Flutter                            |
| ------------------ | ---------------------------------- |
| JSX                | Widget tree                        |
| DOM                | Skia rendering (no DOM)            |
| Hooks              | StatefulWidget / Riverpod / BLoC   |
| CSS                | Layout widgets (Row, Column, Flex) |
| API calls in hooks | Repository layer                   |
| Components         | Widgets                            |
| Global store       | Scoped providers                   |

---

## 🏗 2. Enterprise Folder Structure (Feature-First)

We follow a **Feature-First + Clean Architecture** (DDD-lite) structure to ensure boundaries remain scalable.

```text
lib/
├── app/                         # App setup (composition layer)
│   ├── router/                  # GoRouter / AutoRoute
│   ├── providers/               # Global providers (Auth, Theme)
│   ├── theme/                   # Design system (ThemeData, Tokens)
│   └── app.dart                 # Root MaterialApp
│
├── features/                    # Vertical Slices (Feature Modules)
│   ├── auth/
│   │   ├── presentation/        # UI: Screens, Widgets, Providers/Blocs
│   │   ├── domain/              # Logic: Entities, Repo Interfaces, Use Cases
│   │   ├── data/                # IO: DTOs, Mappers, Repo Implementation
│   │   └── index.dart           # Public API for the feature
│
├── shared/                      # Purely reusable domain-agnostic layer
│   ├── widgets/                 # Common UI components
│   ├── utils/                   # Extensions, Validators
│   └── constants/               # Global enums, strings
│
├── core/                        # Infrastructure layer
│   ├── network/                 # Dio, Interceptors, Response Wrappers
│   ├── storage/                 # SecureStorage, Hive/Isar
│   ├── config/                  # Endpoints registry, Env variables
│   ├── errors/                  # Failure models & Normalization
│   └── logger/                  # Centralized logging abstraction
│
└── main.dart                    # Entry point & DI initialization
```

### 🔒 Dependency Direction
**`presentation → domain ← data → core`**
*   **Domain is the Core**: It contains the stable business rules.
*   **Strict Boundaries**: `presentation` must never import `data`. `shared` and `core` must not depend on features.

---

## 🧩 3. Layer Responsibilities

### 1️⃣ Presentation Layer (UI)
*   **Widgets**: Purely visual. Use `const` wherever possible.
*   **State Management**: Orchestrates UI snapshots. **Riverpod** is recommended for its balance of testability; **BLoC** is preferred for large-scale strictness.
*   **❌ No DTOs or API calls**: Never leak network logic into the UI.

### 2️⃣ Domain Layer (Pure Business Logic)
*   **Entities**: Simple data classes.
*   **Use Cases**: Individual units of business logic (e.g., `UpdateArtisanProfile`).
*   **Repository Interfaces**: Contracts that decouple the domain from the data source.

### 3️⃣ Data Layer (IO)
*   **DTOs (Data Transfer Objects)**: Classes matching the backend JSON.
*   **Mappers**: Mandatory conversion logic: `UserDTO → UserEntity`.
*   **Implementation**: Concrete logic for Remote (API) and Local (Cache) datasources.

### 4️⃣ Core Layer (Infrastructure)
*   **API Client (Dio)**: Centralized HTTP client with an **Interceptor Stack** (Auth, Refresh, Logging, Request-ID).
*   **Error Normalization**: Central `ErrorHandler` to convert server errors into domain `AppError`.

---

## 🌐 4. Engineering Discipline Layer

### A. API Standardization
*   **No Magic Strings**: All paths must come from `core/config/endpoints.dart`.
*   **Response Wrapper**: Every API call must return a normalized `ApiResponse<T>`.
```dart
class ApiResponse<T> {
  final T? data;
  final AppError? error;
  bool get isSuccess => data != null;
}
```

### B. State Management & Ownership
| Type          | Where                 |
| ------------- | --------------------- |
| **UI state**      | Widget / `useState`   |
| **Feature state** | Provider / BLoC       |
| **Server state**  | Repository + Provider |
| **Global state**  | `app/providers`       |

### C. Advanced Infrastructure
*   **Feature Flags**: Use a centralized `FeatureFlags` class. No inline toggles in widgets.
*   **Form Standardization**: Use `reactive_forms` or `flutter_form_builder`.
*   **Access Control (RBAC)**: Centralize logic in `Permissions.canEdit(user)` wrappers.
*   **Caching Strategy**: Every API call must define its caching, refresh, and retry behavior.

---

## 🧪 5. Testing & SDLC Discipline

### Development Flow
**`Contracts (DTO) → Domain (Entity/Repo) → Data (Repo Impl) → Presentation (UI)`**

### Testing Pyramid
| Layer        | Test Type          |
| ------------ | ------------------ |
| **Domain**       | Unit (Logic/UseCases) |
| **Data**         | Repository (Mock Dio) |
| **Presentation** | Widget (Flows)     |
| **App**          | Integration (E2E)  |

### CI Enforcement
CI must block merges unless `flutter analyze`, `flutter test`, and `dart format` pass. Coverage threshold targets: ≥ 70%.

---

## 📱 6. Mobile Realities & Cross-Platform Adaptation

*   **Adaptive UI**: Use **Material 3 (Android)** and **Cupertino (iOS)** for platform-native behaviors (back buttons, scrolling physics, dialogs).
*   **Offline-First**: Every repository must support a sync strategy using a local DB (Hive/Isar).
*   **Lifecycle Awareness**: Use `WidgetsBindingObserver` to handle token refreshes and background sync upon app resume.
*   **Observability**: Track `screen_load_time`, `api_latency`, and `jank` (slow frames) using Firebase Performance.
*   **Deep Linking**: Full support for Universal/App links via `go_router`.

---

## ⚙️ 7. Backend-to-Mobile Contracts (The Golden Path)

For mobile UX to excel, the backend MUST adhere to these 12 rules:
1.  **Response Consistency**: Always wrap in `{ success, data, error }`.
2.  **Pagination Standardization**: Consistent `{ items, total, page, pageSize }` contract.
3.  **Error Standardization**: Return `{ code, message }` for UI-side localization.
4.  **Idempotency**: All write operations must support idempotency keys for aggressive retries.
5.  **Optimized Payloads**: No unnecessary fields; avoid deeply nested JSON.
6.  **Low Latency**: Target <200ms for primary interaction APIs.
7.  **Batch APIs**: Provide "Bootstrap" endpoints (e.g., `/user/init`) to reduce round-trips.
8.  **Token Strategy**: Use short-lived access tokens + secure refresh flows.
9.  **Versioning**: Strict `/api/v1/` versioning (Mobile apps cannot be instantly updated).
10. **File Optimization**: Support chunk uploads and pre-signed URLs.
11. **Rate Limiting**: Mobile-aware limits that allow for network retry bursts.
12. **Request Cancellation**: Support `CancelToken` and include `x-request-id` in all headers.

---

## 🏁 8. Final Mapping (React → Flutter)

| React Concept  | Flutter Equivalent |
| -------------- | ------------------ |
| Feature folder | Feature module     |
| Hooks          | Providers / BLoC   |
| Services       | Use Cases          |
| API Layer      | Data Layer         |
| Shared UI      | `shared/widgets`   |
| Context        | Riverpod           |
| React Query    | Repository + Cache |
| ESLint         | Analyzer + CI      |

---

## 🛠 9. Developer Experience (DX) & Tooling

To maintain velocity in a large monorepo, we mandate the use of code generation and scaffolding.

### A. Code Generation (The "No-Boilerplate" Rule)
*   **Data Classes**: Use **Freezed** for immutable entities and unions (e.g., `AsyncValue` patterns).
*   **JSON Serialization**: Use `json_serializable` for all DTOs to ensure type-safe parsing.
*   **Asset Management**: Use `flutter_gen` to generate a type-safe `Assets.as` reference for images, fonts, and SVGs. (❌ No more `Image.asset('assets/images/logo.png')`).

### B. Scaffolding (Mason)
We use **Mason** bricks to scaffold new features. Running `mason make vkc_feature --name profile` must generate the entire 4-layer folder structure and `index.dart` export automatically to ensure architectural consistency.

---

## 🏗 10. Dependency Injection (DI) & Service Locator

We use **GetIt** combined with **Injectable** for Compile-Time DI.

*   **Registry**: All services, repositories, and use cases must be annotated with `@lazySingleton` or `@injectable`.
*   **Mocking**: This allows us to easily swap a `FirebaseAuthRepository` with a `MockAuthRepository` during widget testing by using a separate `test_injection.dart`.

---

## 🌐 11. Environment & Flavor Management

We strictly separate environments using **Flutter Flavors** (or `--dart-define-from-file`).

| Flavor | API Endpoint | Purpose |
| :--- | :--- | :--- |
| **Dev** | `dev-api.vkc.org` | Local development and unstable builds. |
| **Staging** | `staging-api.vkc.org` | UAT and final QA before production. |
| **Prod** | `api.vkc.org` | Live production data. |

> [!CAUTION]
> **Hardcoding API Keys**: Never hardcode keys in `main.dart`. Use a `Config` class that reads from the injected environment variables.

---

## 🔒 12. Security & Compliance (Mobile Hardening)

1.  **Secure Storage**: Sensitive data (JWTs, Refresh Tokens) MUST be stored in `flutter_secure_storage` (Keychain for iOS, EncryptedSharedPreferences for Android).
2.  **SSL Pinning**: For high-security modules (Donations/Matrimony), implement SSL Pinning in the Dio client to prevent Man-in-the-Middle (MitM) attacks.
3.  **Root/Jailbreak Detection**: Critical for modules involving financial transactions or sensitive community data.
4.  **No Logs in Prod**: Use a logging wrapper (like `logger`) that automatically disables `debugPrint` and console logs in Production builds.

---

## 📊 13. Observability & Monitoring (Deep Dive)

1.  **Crash Reporting**: Mandatory integration with **Firebase Crashlytics**. Every `try/catch` in the Data layer should log non-fatal exceptions to Crashlytics.
2.  **Analytics**: Use a centralized `AnalyticsService` to track "Artisan Onboarding Flow" completion rates and "ID Card Downloads."
3.  **Performance Monitoring**: Track the "Time to First Byte" for the Heritage Timeline assets to ensure low-end devices aren't experiencing significant lag.
