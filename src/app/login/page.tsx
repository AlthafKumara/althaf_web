/**
 * @fileoverview Login Page
 *
 * This page is intentionally thin — it simply renders the
 * `LoginForm` view component from the admin feature module.
 *
 * All authentication logic is handled within the feature layer
 * (`features/admin/controllers/useAuthController`).
 *
 * @module app/login/page
 */

import LoginForm from "@/features/admin/views/LoginForm";

/**
 * Renders the admin login page.
 */
export default function LoginPage() {
  return <LoginForm />;
}
