# Task: Comprehensive Project Refactoring to Modular Feature-Based Architecture (MVCR)

## 1. Objective
Refactor the entire Next.js web portfolio into a highly organized, modular feature-based architecture (Clean Architecture / MVCR). The primary goal is structural improvement without altering any existing flow or user functionality. 

This issue describes the exact standards, procedures, and architectural requirements that need to be followed.

## 2. Research & Rationale: Why This Structure?
The proposed structure leans on **Feature-Sliced Design (FSD)** combined with the **MVCR (Model-View-Controller-Repository)** pattern, which is considered a best practice for modern Next.js React applications.
- **Separation of Concerns (SoC)**: Business logic, API calls, and UI components are strictly separated. This drastically prevents "spaghetti code."
- **Scalability**: New features can be added as self-contained modules without cluttering global scopes or stepping on other features.
- **Maintainability**: Makes it exponentially easier for junior developers and AI models to locate files. Everything related to a feature (e.g., "activity") lives in one directory instead of being fragmented.
- **Testability**: By isolating the Repository (data fetching) from the Controller (UI logic), each layer can be unit tested independently.

## 3. Proposed Folder Structure
The codebase should be migrated into the following hierarchy:

```text
src/
├── app/                       # Next.js App Router (Keep strict and thin)
│   ├── admin/
│   ├── layout.tsx
│   └── page.tsx
├── core/                      # Global shared infrastructure
│   ├── ui/                    # Primitive/shared UI components (e.g., Buttons, Inputs)
│   ├── utils/                 # Global helpers (date formatting, string parsers)
│   ├── config/                # Environment variables, constants
│   └── types/                 # Global generic types
└── features/                  # Domain-specific modules (The Core of MVCR)
    ├── auth/                  # Everything related to login/session
    ├── projects/              # The project portfolio feature
    └── activity/              # The Git Activity dashboard feature
        ├── models/            # TS Interfaces, Zod schemas (Activity, CommitLog)
        ├── views/             # Local UI Components (Heatmap, ActivityFeed)
        ├── controllers/       # React Hooks / Server Actions (useActivity)
        └── repositories/      # External API/DB logic (GitHub API, Supabase)
```

## 4. Roles of Each Layer (The MVCR Pattern)
Each directory inside a feature has a strict, well-defined role:
1. **`models/` (Model)**: Defines the shape of the data. **No logic**. Only TypeScript interfaces, types, or validation schemas (like Zod).
2. **`views/` (View)**: Presentational React components. They should be "dumb" and only receive props or consume local controllers. **No API fetching** directly inside `.tsx` view files.
3. **`controllers/` (Controller)**: The "glue" between View and Repository. Extracted as custom React hooks (for client components) or Server Actions (for server components). Handles loading states, data formatting, and event handlers.
4. **`repositories/` (Repository)**: Pure data fetching logic. Interacts directly with databases (Supabase), external APIs (GitHub, GitLab), or standard `fetch()`. Returns cleanly typed data back to the Controller.

## 5. Coding Standards & Consistency
- **No direct API calls in views**: You must route external interactions through the Repository.
- **Clear Naming Conventions**: 
  - Controllers must be named with verbs or hooks: `useProjectController.ts` or `createProjectAction.ts`.
  - Repositories must append `Repository`: `ActivityRepository.ts`.
- **Documentation**: All public functions, complex views, and repository methods must use `JSDoc` comments to ensure easy onboarding.
- **Error Handling**: Repositories must catch HTTP errors and throw standard error formats. Controllers catch these errors to display friendly UI messages.

## 6. Code Examples

### A. Model (`src/features/activity/models/ActivityModel.ts`)
```typescript
/**
 * Represents a single commit from git platforms.
 */
export interface CommitLog {
  source: 'github' | 'gitlab';
  repo: string;
  message: string;
  date: string;
  url: string;
}
```

### B. Repository (`src/features/activity/repositories/ActivityRepository.ts`)
```typescript
import { CommitLog } from '../models/ActivityModel';

/**
 * Fetches activity logs from the GitHub API.
 * @param username The GitHub username
 * @returns Array of commit logs
 */
export async function getGitHubActivity(username: string): Promise<CommitLog[]> {
  const res = await fetch(`https://api.github.com/users/${username}/events`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch GitHub activity');
  }
  
  const data = await res.json();
  // Map data to the CommitLog model
  return data.map((event: any) => ({
    source: 'github',
    repo: event.repo.name,
    message: event.payload?.commits?.[0]?.message || 'No message',
    date: event.created_at,
    url: `https://github.com/${event.repo.name}`
  }));
}
```

### C. Controller (`src/features/activity/controllers/useActivityController.ts`)
```typescript
import { useState, useEffect } from 'react';
import { CommitLog } from '../models/ActivityModel';
import { getGitHubActivity } from '../repositories/ActivityRepository';

/**
 * Controller to manage state, loading status, and logic for the activity view.
 */
export function useActivityController(username: string) {
  const [commits, setCommits] = useState<CommitLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getGitHubActivity(username);
        setCommits(data);
      } catch (error) {
        console.error("Error loading activity:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (username) loadData();
  }, [username]);

  return { commits, isLoading };
}
```

### D. View (`src/features/activity/views/ActivityFeed.tsx`)
```typescript
"use client";

import { useActivityController } from '../controllers/useActivityController';

/**
 * Renders the list of recent commits.
 * Notice how clean this component is: NO data fetching, only UI rendering.
 */
export function ActivityFeed({ username }: { username: string }) {
  const { commits, isLoading } = useActivityController(username);

  if (isLoading) return <p className="animate-pulse">Loading activity...</p>;

  return (
    <ul className="space-y-4">
      {commits.map((commit, idx) => (
        <li key={idx} className="p-4 bg-surface rounded-2xl border border-neutral-800">
          <p className="text-text-primary text-sm font-semibold">{commit.repo}</p>
          <p className="text-text-secondary text-sm">{commit.message}</p>
        </li>
      ))}
    </ul>
  );
}
```

## 7. Refactoring Process / Execution Breakdown
*This is the step-by-step roadmap for the junior developer or AI agent executing the task.*

**Phase 1: Setup & Initialization**
1. Create the base folders: `/src/core` and `/src/features`.
2. Map out the features you currently have (e.g., Auth, Projects, Skills, Activity).

**Phase 2: Data & Type Migration (Models)**
1. Move global types from `/types` into their respective `features/<name>/models/`.
2. Ensure interfaces are updated to use TypeScript strictly.

**Phase 3: Relocating Data Access (Repositories)**
1. Isolate every direct Database (Supabase) call or `fetch()` currently sitting in your `/app` route handlers or UI components.
2. Move them to `features/<name>/repositories/`. Ensure they return strongly typed Models.

**Phase 4: Extracting Logic (Controllers)**
1. Track down all `useState`, `useEffect`, or complex event handlers inside existing components.
2. Refactor them into custom hooks inside `features/<name>/controllers/` OR Server Actions if doing server-side mutations.

**Phase 5: UI Migration (Views & Core)**
1. Take primitive generic components (Buttons, Modals) from `/components` to `core/ui/`.
2. Take feature-specific components from `/components` into `features/<name>/views/`.
3. Scrub the view components clean of logic, ensuring they only invoke controllers or consume props.

**Phase 6: Router Wiring (`app/`)**
1. Re-import all your views into their respective Next.js `/app` pages.
2. The `page.tsx` files should now look extremely lean, acting primarily as layout aggregators.

**Phase 7: Validation & Cleanup**
1. Run `npm run build` or the dev server to identify and fix any broken paths.
2. Perform manual QA on the site to guarantee that **no existing flow or functionality has changed**.
3. Delete the legacy `/components`, `/lib`, and `/types` folders once entirely empty.
