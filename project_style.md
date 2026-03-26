# Technical Implementation & Style Guide

## 1. Tech Stack
- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS.
- **Backend/Auth**: Supabase (Postgres, Auth, Storage).
- **Animations**: Framer Motion (Page transitions & Hover states).
- **Icons**: `lucide-react`.

## 2. Visual Style Guide (Modern Dark + Soft Yellow)
- **Palette**:
  - `background`: `#0a0a0a` (Pure Dark).
  - `surface`: `#161616` (Card background).
  - `primary`: `#FACC15` (Yellow-400) - Used for primary buttons, borders, and accents.
  - `text-primary`: `#F9FAFB`.
  - `text-secondary`: `#A3A3A3`.
- **UI Components**:
  - **Cards**: `bg-neutral-900/50`, `border-neutral-800`, `rounded-2xl`. On hover: `border-yellow-400/40`.
  - **Buttons**: Rounded-xl (approx 12px), bold font, 105% scale on hover.
  - **Code Blocks**: Consistent dark theme with yellow syntax highlighting for keywords.

## 3. Engineering Architecture

### A. Git Aggregator Logic (GitHub + GitLab)
- **Service**: Create `/lib/git-service.ts`.
- **Logic**: 
  1. Fetch GitHub events via `https://api.github.com/users/{user}/events`.
  2. Fetch GitLab events via `https://gitlab.com/api/v4/users/{id}/events`.
  3. Normalize both data sets into a standard `CommitLog` interface:
     ```typescript
     interface CommitLog {
       source: 'github' | 'gitlab';
       repo: string;
       message: string;
       date: string;
       url: string;
     }
     ```
  4. Aggregate for the Heatmap by counting occurrences per date.

### B. Database & Auth (Supabase)
- **Tables**:
  - `projects`: id, title, description, tags (text[]), image_url, github_url, demo_url.
  - `skills`: id, name, category (enum), icon_name.
- **Auth**: Use `createClientComponentClient` for the Admin login page. Implement a Middleware to protect the `/admin` route.

### C. Directory Structure
- `/app`: Routing and Server Components.
- `/components/ui`: Primitive UI (Shadcn-like structure).
- `/components/activity`: Specialized components for the Heatmap and Feed.
- `/lib`: Helper functions (Git APIs, Supabase clients).
- `/types`: TypeScript interfaces.

## 4. Coding Standards
- **Clean Code**: Use functional components and Server Actions for form submissions.
- **Responsive**: Mobile-first approach. Use `grid-cols-1 md:grid-cols-2`.
- **Performance**: Optimize images using `next/image`. Cache Git API responses for 30 minutes to avoid rate limits.