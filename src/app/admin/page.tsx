/**
 * @fileoverview Admin Dashboard Page
 *
 * This page is intentionally thin — it simply renders the
 * `AdminDashboard` view component from the admin feature module.
 *
 * All CRUD logic, state management, and UI rendering is handled
 * within the feature layer (`features/admin/`).
 *
 * @module app/admin/page
 */

import AdminDashboard from "@/features/admin/views/AdminDashboard";

/**
 * Renders the admin CMS dashboard.
 * Previously 188 lines — now a single import.
 */
export default function AdminPage() {
  return <AdminDashboard />;
}
