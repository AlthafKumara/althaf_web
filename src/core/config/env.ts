/**
 * @fileoverview Centralized Environment Variable Access
 *
 * This module provides a single source of truth for all environment variables
 * used throughout the application. By centralizing access here, we:
 * - Eliminate scattered `process.env` calls across multiple files
 * - Make it immediately clear which env vars the app depends on
 * - Provide type-safe accessors with clear documentation
 *
 * @module core/config/env
 */

// ---------------------------------------------------------------------------
// Supabase Configuration
// ---------------------------------------------------------------------------

/** Public Supabase URL — safe to expose to the browser. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/** Public Supabase Anonymous Key — safe to expose to the browser. */
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ---------------------------------------------------------------------------
// Git Integration Tokens (Server-Side Only)
// ---------------------------------------------------------------------------

/** GitHub Personal Access Token — increases rate limit from 60 to 5 000 req/hr. */
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

/** GitHub username used for the activity heatmap. */
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "github_user";

/** GitLab Personal Access Token (scope: read_api). */
export const GITLAB_TOKEN = process.env.GITLAB_TOKEN ?? "";

/** Numeric GitLab user ID — required for the events endpoint. */
export const GITLAB_USER_ID = process.env.GITLAB_USER_ID ?? "";

// ---------------------------------------------------------------------------
// Admin Configuration
// ---------------------------------------------------------------------------

/** The single email address allowed to access `/admin`. */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim() ?? "";

// ---------------------------------------------------------------------------
// App Settings
// ---------------------------------------------------------------------------

/** Public-facing site URL used for SEO & metadata. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
