/**
 * @fileoverview Auth Controller Hook
 *
 * Manages authentication state and actions for both the login page
 * and admin layout (logout). Extracted from the inline logic previously
 * split across `login/page.tsx` and `admin/layout.tsx`.
 *
 * @module features/admin/controllers/useAuthController
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/core/lib/supabase";

/**
 * Return type of the {@link useAuthController} hook.
 */
interface AuthControllerState {
  /** Email field value. */
  email: string;
  /** Password field value. */
  password: string;
  /** Loading state during authentication. */
  loading: boolean;
  /** Error message from the last failed attempt, or empty string. */
  error: string;
  /** Updates the email field. */
  setEmail: (value: string) => void;
  /** Updates the password field. */
  setPassword: (value: string) => void;
  /** Handles login form submission. */
  handleLogin: (e: React.FormEvent) => Promise<void>;
  /** Signs out and redirects to login. */
  handleLogout: () => Promise<void>;
}

/**
 * Controller hook for authentication (login + logout).
 *
 * @returns State and handlers for auth UI.
 *
 * @example
 * ```tsx
 * // Login page:
 * const { email, setEmail, handleLogin, loading, error } = useAuthController();
 *
 * // Admin layout:
 * const { handleLogout } = useAuthController();
 * ```
 */
export function useAuthController(): AuthControllerState {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  /**
   * Handles login form submission:
   * 1. Calls Supabase signInWithPassword
   * 2. On success: redirects to /admin
   * 3. On failure: sets error message
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  /**
   * Signs out the current user and redirects to the login page.
   */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    handleLogout,
  };
}
