# 🏗️ Clean Architecture / MVVM Structure Guide
**Pattern**: Model → Repository → Controller (State) → View**  
**Inspired by**: `A_newstructure` (Flutter + GetX) | **Applicable to**: Mobile (Flutter) & Web (Next.js / React)

---

## 📋 Table of Contents
1. [Philosophy & Principles](#-philosophy--principles)
2. [Flutter (Mobile) Directory Tree](#-flutter-mobile-directory-tree)
3. [Web (Next.js / React) Directory Tree](#-web-nextjs--react-directory-tree)
4. [Universal Layer Responsibilities](#-universal-layer-responsibilities)
5. [Data Flow Diagram](#-data-flow-diagram)
6. [Naming Conventions](#-naming-conventions)
7. [Feature Anatomy (Deep Dive)](#-feature-anatomy-deep-dive)
8. [Shared vs Feature-Local](#-shared-vs-feature-local)

---

## 🧠 Philosophy & Principles

| Principle | Rule |
|-----------|------|
| **Separation of Concerns** | Each layer has one job. Views don't fetch data; Repositories don't hold state |
| **Single Source of Truth** | State lives only in Controllers / State Managers |
| **DRY (Don't Repeat Yourself)** | Reusable logic → `shared/`, reusable UI → `components/` or `shared/widgets/` |
| **Dependency Direction** | View → Controller → Repository → Model. Never reverse |
| **Feature Isolation** | Each feature is self-contained with its own bindings, controllers, models, repositories, and views |
| **Platform Agnostic Logic** | Business logic and data layers are identical across Mobile and Web |

---

## 📱 Flutter (Mobile) Directory Tree

```
lib/
├── main.dart                         # App entry point
├── my_app.dart                       # Root widget, theme, initial bindings
│
├── configs/
│   ├── routes/
│   │   └── app_routes.dart           # Named route constants (GetX: GetPage list)
│   └── pages/
│       └── app_pages.dart            # Route → Binding → View mapping
│
├── constants/
│   ├── app_constants.dart            # Global string constants, keys, timeouts
│   └── asset_constants.dart          # Image, icon, font asset paths
│
├── env/
│   └── app_env.dart                  # Environment configs (base URLs, Supabase keys)
│
├── utils/
│   ├── enums/
│   │   ├── user_role.dart
│   │   ├── borrow_status.dart
│   │   └── book_status.dart
│   ├── extensions/
│   │   └── string_extensions.dart    # Dart extension methods
│   ├── functions/
│   │   ├── date_formatter.dart
│   │   ├── validator.dart
│   │   └── snackbar_helper.dart
│   └── services/
│       └── supabase_service.dart     # Supabase client init / singleton
│
├── shared/                           # Cross-feature shared assets
│   ├── models/
│   │   ├── book_model.dart
│   │   ├── profile_model.dart
│   │   ├── borrow_model.dart
│   │   ├── book_review_model.dart
│   │   ├── book_category_model.dart
│   │   ├── saved_list_model.dart
│   │   ├── remote/                   # DTOs from API/Supabase
│   │   └── local/                    # Local storage models
│   ├── repositories/
│   │   ├── auth_repository.dart
│   │   ├── profile_repository.dart
│   │   ├── get_all_book_repository.dart
│   │   ├── get_book_by_id_repository.dart
│   │   ├── get_book_category_repository.dart
│   │   ├── get_book_review_repository.dart
│   │   ├── get_all_borrow_repository.dart
│   │   ├── get_borrow_by_id_repository.dart
│   │   ├── get_saved_list.dart
│   │   └── delete_book_repository.dart
│   ├── controllers/
│   │   ├── auth_controller.dart
│   │   ├── get_profile_controller.dart
│   │   ├── get_all_book_controller.dart
│   │   ├── book_category_controller.dart
│   │   ├── get_book_review.dart
│   │   ├── get_saved_list.dart
│   │   ├── delete_book_controller.dart
│   │   ├── chip_controller.dart
│   │   ├── user_navbar_controller.dart
│   │   └── admin_navbar_controller.dart
│   ├── bindings/
│   │   ├── initial_binding.dart      # Global app bindings (auth, profile)
│   │   └── shared_binding.dart
│   ├── widgets/                      # Globally reusable UI components
│   │   ├── app_button.dart
│   │   ├── app_text_field.dart
│   │   ├── app_loader.dart
│   │   ├── book_card.dart
│   │   ├── error_state_widget.dart
│   │   ├── empty_state_widget.dart
│   │   ├── cached_image.dart
│   │   ├── rating_bar.dart
│   │   └── shimmer_card.dart
│   └── styles/
│       ├── app_colors.dart
│       └── app_text_styles.dart
│
└── features/                         # Feature-first modules
    ├── auth/
    │   ├── splash/
    │   │   ├── view/
    │   │   │   └── splash_screen.dart
    │   │   └── bindings/
    │   │       └── splash_binding.dart
    │   ├── onboarding/
    │   │   └── view/
    │   │       └── onboarding_screen.dart
    │   ├── login/
    │   │   ├── bindings/
    │   │   │   └── login_binding.dart
    │   │   ├── controllers/
    │   │   │   └── login_controller.dart
    │   │   ├── models/
    │   │   ├── repositories/
    │   │   └── view/
    │   │       ├── components/       # Atomic, feature-specific widgets
    │   │       │   └── login_form.dart
    │   │       └── ui/
    │   │           └── login_screen.dart
    │   ├── register/
    │   │   └── (same pattern as login/)
    │   └── complete_profile/
    │       └── (same pattern as login/)
    │
    ├── user/
    │   ├── user_home/
    │   │   ├── bindings/
    │   │   ├── controllers/
    │   │   ├── models/
    │   │   ├── repositories/
    │   │   └── view/
    │   │       ├── components/
    │   │       └── ui/
    │   ├── user_feed/
    │   │   └── (same pattern)
    │   ├── user_search/
    │   │   └── (same pattern)
    │   ├── user_library/
    │   │   └── (same pattern)
    │   ├── user_book_detail/
    │   │   └── (same pattern)
    │   ├── user_book_borrow_detail/
    │   │   └── (same pattern)
    │   └── user_profile/
    │       └── (same pattern)
    │
    ├── admin/
    │   ├── admin_home/
    │   ├── admin_library/
    │   ├── admin_book_detail/
    │   ├── admin_borrow_detail/
    │   ├── admin_search/
    │   ├── admin_scan/
    │   └── admin_profile/
    │       └── (same pattern as user features)
    │
    └── notification/
        └── (same pattern)
```

---

## 🌐 Web (Next.js / React) Directory Tree

> Mirrors the Flutter architecture exactly. GetX → Zustand/Context/TanStack Query. Bindings → Providers.

```
src/
├── app/                              # Next.js App Router (or pages/ for Pages Router)
│   ├── layout.tsx                   # Root layout — mounts Providers (equivalent to my_app.dart)
│   ├── page.tsx                     # Landing / redirect logic
│   │
│   ├── (auth)/                      # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx             # View entry point (calls useLoginController)
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── complete-profile/
│   │       └── page.tsx
│   │
│   ├── (user)/                      # User role route group
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── feed/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── library/
│   │   │   └── page.tsx
│   │   ├── book/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   │
│   └── (admin)/                     # Admin role route group
│       ├── home/
│       ├── library/
│       ├── book/[id]/
│       ├── borrow/[id]/
│       ├── search/
│       └── profile/
│           └── page.tsx
│
├── configs/
│   ├── routes.ts                    # Route path constants (equivalent to app_routes.dart)
│   └── site.ts                      # Site-wide metadata (title, description)
│
├── constants/
│   ├── app_constants.ts             # Global string constants, keys
│   └── asset_constants.ts           # Image / icon paths
│
├── env/
│   └── app_env.ts                   # Environment variables wrapper (process.env abstraction)
│
├── utils/
│   ├── enums/
│   │   ├── user_role.ts
│   │   ├── borrow_status.ts
│   │   └── book_status.ts
│   ├── extensions/                  # Pure utility functions (string, date helpers)
│   │   └── string_utils.ts
│   ├── functions/
│   │   ├── date_formatter.ts
│   │   ├── validator.ts
│   │   └── toast_helper.ts
│   └── services/
│       └── supabase_client.ts       # Supabase JS client singleton
│
├── shared/                          # Cross-feature shared assets
│   ├── models/                      # TypeScript interfaces / types (equivalent to Dart models)
│   │   ├── book.model.ts
│   │   ├── profile.model.ts
│   │   ├── borrow.model.ts
│   │   ├── book_review.model.ts
│   │   ├── book_category.model.ts
│   │   ├── saved_list.model.ts
│   │   ├── remote/                  # API response DTOs (raw Supabase shape)
│   │   │   └── book.dto.ts
│   │   └── local/                   # Local/session storage models
│   │       └── user_session.model.ts
│   ├── repositories/                # Data fetching — returns mapped Models
│   │   ├── auth.repository.ts
│   │   ├── profile.repository.ts
│   │   ├── book.repository.ts
│   │   ├── book_category.repository.ts
│   │   ├── book_review.repository.ts
│   │   ├── borrow.repository.ts
│   │   └── saved_list.repository.ts
│   ├── controllers/                 # Global state hooks / stores (Zustand / React Context)
│   │   ├── auth.controller.ts
│   │   ├── profile.controller.ts
│   │   ├── book.controller.ts
│   │   ├── book_category.controller.ts
│   │   ├── book_review.controller.ts
│   │   └── saved_list.controller.ts
│   ├── providers/                   # Context providers / DI wrappers (equivalent to bindings)
│   │   ├── auth.provider.tsx
│   │   └── query.provider.tsx       # TanStack Query root provider
│   ├── components/                  # Globally reusable atomic components
│   │   ├── AppButton.tsx
│   │   ├── AppTextField.tsx
│   │   ├── AppLoader.tsx
│   │   ├── BookCard.tsx
│   │   ├── ErrorState.tsx
│   │   ├── EmptyState.tsx
│   │   ├── CachedImage.tsx
│   │   ├── RatingBar.tsx
│   │   └── ShimmerCard.tsx
│   └── styles/
│       ├── colors.ts                # Design token: color palette
│       └── typography.ts            # Design token: font sizes, weights
│
└── features/                        # Feature-first modules
    ├── auth/
    │   ├── login/
    │   │   ├── controllers/
    │   │   │   └── use_login.controller.ts   # Feature-local state hook
    │   │   ├── repositories/
    │   │   │   └── login.repository.ts       # (or uses shared/auth.repository)
    │   │   ├── models/
    │   │   └── components/                   # Feature-specific atomic UI
    │   │       ├── LoginForm.tsx
    │   │       └── SocialLoginButton.tsx
    │   ├── register/
    │   │   └── (same pattern)
    │   └── complete-profile/
    │       └── (same pattern)
    │
    ├── user/
    │   ├── user-home/
    │   │   ├── controllers/
    │   │   │   └── use_user_home.controller.ts
    │   │   ├── repositories/
    │   │   ├── models/
    │   │   └── components/
    │   │       ├── HeroSection.tsx
    │   │       └── RecommendedBooks.tsx
    │   ├── user-feed/
    │   │   └── (same pattern)
    │   ├── user-search/
    │   │   └── (same pattern)
    │   ├── user-library/
    │   │   └── (same pattern)
    │   ├── user-book-detail/
    │   │   └── (same pattern)
    │   └── user-profile/
    │       └── (same pattern)
    │
    └── admin/
        ├── admin-home/
        ├── admin-library/
        ├── admin-book-detail/
        ├── admin-borrow-detail/
        ├── admin-search/
        └── admin-profile/
            └── (same pattern)
```

---

## 🗂️ Universal Layer Responsibilities

### 1. `models/` — Data Structures & DTOs

| Sub-type | Responsibility | Example |
|----------|---------------|---------|
| **Model** | Clean domain object used in controllers & views | `BookModel`, `ProfileModel` |
| **DTO (remote/)** | Raw API/Supabase response shape | `BookDto` — matches DB column names |
| **Local model** | Persisted session/cache data | `UserSessionModel` |

> **Rule**: DTOs live in `remote/`, clean models live at root level. Repositories perform the DTO → Model mapping.

---

### 2. `repositories/` — Data Access Layer

- **Only** this layer talks to external data sources (Supabase, REST API, local DB)
- Returns **clean Models** (never raw API types) to controllers
- Contains no business logic or state
- One file per data operation (e.g. `get_book_by_id_repository.dart`)

---

### 3. `controllers/` — State Management (The GetX Equivalent)

| Property | Flutter (GetX) | Web (Zustand / Hook) |
|----------|---------------|----------------------|
| Reactive state | `RxBool isLoading` | `useState<boolean>` / store state |
| Data state | `Rx<BookModel?> book` | `book: BookModel \| null` |
| Error state | `RxString errorMessage` | `error: string \| null` |
| Trigger fetch | `onInit()` override | `useEffect()` |
| Expose to UI | `Get.find<MyController>()` | `useMyController()` custom hook |

> **Rule**: Controllers call only Repositories. They NEVER call Supabase or HTTP directly.

---

### 4. `view/` (Flutter) / `page.tsx + components/` (Web) — Presentation Layer

- **`ui/` (Flutter) / `page.tsx` (Web)**: High-level page scaffold. Initialises the controller/provider. Assembles components.
- **`components/` (Flutter & Web)**: Atomic, feature-specific UI parts. Pure presentation — receive data via props/parameters.

> **Rule**: Views/Pages read state from controllers. They do NOT own business logic.

---

### 5. `bindings/` (Flutter) / `providers/` (Web) — Dependency Injection

| Platform | Tool | Role |
|----------|------|------|
| Flutter | `GetX Binding` | Lazily registers controllers on route navigate |
| Web (Next.js) | `Context.Provider` / Zustand | Wraps page/layout, provides store access |

---

### 6. `configs/` — App-Wide Configuration

| File | Contents |
|------|----------|
| `routes / app_routes` | Named route string constants |
| `pages / app_pages` | Route → Binding → View mapping table |
| `site.ts` (Web) | SEO metadata defaults |

---

### 7. `utils/` — Pure Helpers (No State, No UI)

| Sub-folder | Contents |
|------------|----------|
| `enums/` | Typed enumerations (role, status, category) |
| `extensions/` | Extension methods on primitives (Dart) / utility functions (TS) |
| `functions/` | Stateless helper functions (format, validate, toast) |
| `services/` | Client singletons (Supabase, HTTP client) |

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      USER ACTION                        │
│          (tap button, submit form, page load)           │
└───────────────────────┬─────────────────────────────────┘
                        │ calls method on
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    CONTROLLER                           │
│  • Sets isLoading = true                                │
│  • Calls repository.fetchData()                         │
│  • On success: updates reactive data state              │
│  • On error: sets errorMessage state                    │
│  • Sets isLoading = false                               │
└───────────────────────┬─────────────────────────────────┘
                        │ calls
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   REPOSITORY                            │
│  • Calls Supabase / REST API                            │
│  • Receives raw DTO from remote                         │
│  • Maps DTO → clean Model                               │
│  • Returns Model (or throws typed Exception)            │
└───────────────────────┬─────────────────────────────────┘
                        │ queries
                        ▼
┌─────────────────────────────────────────────────────────┐
│              DATA SOURCE (Supabase / API)               │
│  supabase_service.dart / supabase_client.ts             │
└───────────────────────┬─────────────────────────────────┘
                        │ returns raw JSON
                        ▼
               Repository maps to Model
                        │
                        ▼
              Controller updates state
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  VIEW / PAGE                            │
│  • Observes controller state (Obx / useStore)           │
│  • Shows loader when isLoading == true                  │
│  • Shows error widget when errorMessage != null         │
│  • Renders data via components/ when data is ready      │
└─────────────────────────────────────────────────────────┘
```

### Concrete Example — Load Book Detail

```
User taps BookCard
    → navigation passes bookId to BookDetailPage
        → BookDetailPage.onInit() calls controller.fetchBook(bookId)
            → BookDetailController sets isLoading = true
            → calls GetBookByIdRepository.execute(bookId)
                → Repository calls supabase.from('books').select().eq('id', bookId)
                → Maps raw JSON → BookModel
                → Returns BookModel
            → Controller: book.value = returnedModel
            → Controller: isLoading = false
        → Obx/useStore rebuilds UI
    → BookDetailPage renders BookInfoComponent, ReviewListComponent
```

---

## 🏷️ Naming Conventions

### Flutter (Dart)

| Category | Convention | Example |
|----------|-----------|---------|
| Files | `snake_case.dart` | `get_book_by_id_repository.dart` |
| Classes | `PascalCase` | `GetBookByIdRepository` |
| Variables | `camelCase` | `isLoading`, `bookList` |
| Rx variables | `camelCase` with Rx prefix on type | `final isLoading = false.obs` |
| Feature folders | `snake_case` | `user_book_detail/` |
| Bindings | `[feature]_binding.dart` | `login_binding.dart` |
| Controllers | `[action/feature]_controller.dart` | `get_all_book_controller.dart` |
| Repositories | `[action]_repository.dart` | `get_book_by_id_repository.dart` |
| View screens | `[feature]_screen.dart` | `login_screen.dart` |
| Components | `[name]_widget.dart` | `book_card_widget.dart` |

### Web (TypeScript / Next.js)

| Category | Convention | Example |
|----------|-----------|---------|
| Files (components) | `PascalCase.tsx` | `BookCard.tsx` |
| Files (logic) | `kebab-case.ts` | `book.repository.ts` |
| Files (controllers) | `use_[feature].controller.ts` | `use_book_detail.controller.ts` |
| Files (models) | `[name].model.ts` | `book.model.ts` |
| Files (DTOs) | `[name].dto.ts` | `book.dto.ts` |
| Interfaces | `PascalCase` + `I` prefix optional | `BookModel`, `IBookModel` |
| Feature folders | `kebab-case` | `user-book-detail/` |
| Route groups | `(group-name)/` | `(auth)/`, `(user)/`, `(admin)/` |
| State hooks | `use` prefix | `useBookDetailController()` |
| Providers | `PascalCase` + `Provider` | `AuthProvider`, `QueryProvider` |

---

## 🔬 Feature Anatomy (Deep Dive)

Every feature under `features/[role]/[feature-name]/` follows this internal layout:

```
[feature-name]/
├── bindings/                        # (Flutter) DI — lazy register controllers
│   └── [feature]_binding.dart
│
├── controllers/                     # State mgmt — mediates UI ↔ Repository
│   └── [feature]_controller.dart    # (Web: use_[feature].controller.ts)
│
├── models/                          # Feature-local types (if not in shared/)
│   └── [entity]_model.dart
│
├── repositories/                    # Feature-local data access (if not in shared/)
│   └── [action]_repository.dart
│
└── view/                            # (Flutter) Presentation layer
    ├── components/                  # Atomic UI pieces — receive data via params
    │   ├── [feature]_header.dart
    │   └── [feature]_list_item.dart
    └── ui/                          # Page scaffold — assembles components
        └── [feature]_screen.dart    # (Web: page.tsx in app/(role)/[feature]/)
```

---

## 🔗 Shared vs Feature-Local

Use this decision matrix to decide where to put a Model, Repository, or Controller:

```
Is this data used by more than one feature?
├── YES → Place in shared/models | shared/repositories | shared/controllers
│         Register in InitialBinding (Flutter) / Root Provider (Web)
│
└── NO  → Place inside features/[role]/[feature-name]/
           Register in [feature]_binding.dart (Flutter)
           Use local hook / context (Web)
```

| Layer | Shared (`shared/`) | Feature-local (`features/.../`) |
|-------|-------------------|--------------------------------|
| Model | `BookModel`, `ProfileModel` | e.g. `FeedFilterModel` |
| Repository | `GetAllBookRepository` | e.g. `GetFeedWithFilterRepository` |
| Controller | `AuthController`, `NavbarController` | e.g. `UserFeedController` |
| Component | `BookCard`, `AppButton` | e.g. `FeedStoryTile` |

---

## ✅ Quick Reference Checklist

When adding a **new feature**, follow this order:

- [ ] 1. Define Model(s) in `shared/models/` (or feature-local if only used here)
- [ ] 2. Define DTO in `shared/models/remote/` for API response shape
- [ ] 3. Write Repository — fetches data, maps DTO → Model
- [ ] 4. Write Controller — calls repository, manages `isLoading / data / error` state
- [ ] 5. Register Controller in Binding (Flutter) / Provider (Web)
- [ ] 6. Build feature-specific `components/` (atomic UI)
- [ ] 7. Assemble `view/ui/[screen]` (Flutter) or `page.tsx` (Web) using components
- [ ] 8. Add route in `configs/routes` and map binding in `configs/pages`

---

*Generated: 2026-03-27 | Based on: `lib/A_newstructure/` (Flutter + GetX)*  
*Applicable to: Flutter (Mobile) + Next.js/React (Web)*
