# Project Context: Personal Developer Portfolio (Mobile Specialist)

## 1. Vision
To create a high-performance, professional portfolio website that showcases expertise as a Mobile Developer (Flutter/Dart). The site must act as a "Live Resume" by syncing real-time coding activity from both GitHub and GitLab, providing a transparent view of technical dedication and problem-solving capabilities.

## 2. Targeted Expertise Highlights
The content should emphasize:
- **Mobile Development**: Flutter, GetX, State Management.
- **Advanced Integrations**: PaddleOCR, Supabase, Docker, and REST APIs.
- **Problem Solving**: Transitioning complex requirements into functional mobile applications.

## 3. Page-by-Page Feature Requirements

### A. Public Facing Pages
1.  **Home (Hero)**: High-impact introduction. Must include a clear value proposition, a professional photo placeholder, and a primary CTA to "View Projects."
2.  **About & Background**: A storytelling approach to professional experience. Mention specific tech stacks (Flutter, Supabase) and developer workflows (WSL2, Docker).
3.  **Skills (Categorized)**: A dedicated page for technical stacks (Mobile, Backend, DevOps/Tools). Skills must be fetched from Supabase to allow manual updates.
4.  **Portfolio (Projects)**: A grid-based gallery. Each project card should lead to a detail view or modal showing the tech stack, "The Challenge," and "The Solution."
5.  **Activity Dashboard**:
    - **Unified Heatmap**: A single 365-day contribution graph merging data from GitHub and GitLab.
    - **Live Commit Feed**: A scrollable list of recent commits with metadata (Source: GitHub vs GitLab, Repo Name, Message, Timestamp).

### B. Admin & Management (Protected)
1.  **Auth Layer**: Simple Email/Password login via Supabase Auth (Restricted to a specific admin email).
2.  **CMS Dashboard**:
    - **Project Manager**: CRUD interface to upload project images to Supabase Storage and save metadata to the database.
    - **Skill Manager**: Interface to toggle/add/remove technical skills.

## 4. User Journey
- **Visitor**: Lands on Home -> Explores Projects -> Validates expertise via Activity Dashboard -> Contact.
- **Admin**: Log in -> Add a new project from a recent freelance/company task -> Logout.