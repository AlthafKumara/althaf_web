# Modern Developer Portfolio

A sleek, high-performance personal developer portfolio built with the modern web stack. It features a stunning "Yellow-Dark" aesthetic, smooth animations, an interactive 365-day contribution heatmap fetching from both GitHub and GitLab, and a secure Supabase-powered Admin CMS for managing projects and skills dynamically.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Directory)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** Vercel (Recommended)

## ✨ Features

- **Dynamic Projects Showcase**: Pulls directly from Supabase with image uploads.
- **Skills Management**: Filterable and manageable via the admin panel.
- **Git Contribution Heatmap**: Aggregates commits from both GitHub and GitLab to display a 365-day active contribution graph.
- **Admin Dashboard CMS**: Secure area to add, toggle, or delete projects and skills.
- **SSR & SEO Optimized**: Lightning-fast load times with standard Next.js optimizations.

## 🛠️ Local Development Setup

### 1. Clone & Install
```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Admin Access
ADMIN_EMAIL=your_admin_email@example.com

# Git Integration (For Heatmap)
GITHUB_TOKEN=your_github_personal_access_token
GITLAB_TOKEN=your_gitlab_personal_access_token
GITLAB_USER_ID=your_gitlab_user_id
```
*(Note: `.env.local` is ignored by git for security purposes.)*

### 3. Supabase Setup
You need to create standard tables for `projects` and `skills`, and a storage bucket named `portfolio`.
If you don't have the SQL schema, refer to the project setup docs to run the initialization script in your Supabase SQL Editor.

### 4. Run the Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site, and [http://localhost:3000/login](http://localhost:3000/login) to access the admin CMS.

## 🔒 Security
- **Middleware Protected Routes**: The `/admin` path is locked down by Next.js edge middleware. It strictly validates the user's Supabase session cookie and ensures their email matches the strict `ADMIN_EMAIL` environment variable.
- **Row Level Security (RLS)**: Supabase tables are strictly configured to only allow authenticated admin users to execute `INSERT`, `UPDATE`, and `DELETE` commands.

## 📝 License

This project is open-sourced under the MIT License. Feel free to use it as inspiration for your own portfolio!
