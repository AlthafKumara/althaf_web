/**
 * @fileoverview Supabase Browser Client Singleton
 *
 * Creates and exports a single Supabase client instance configured for
 * browser-side usage via `@supabase/ssr`. This client is used by all
 * client components that need to interact with Supabase (auth, database, storage).
 *
 * For server-side operations, use `createServerClient` directly
 * (see `middleware.ts` for reference).
 *
 * @module core/lib/supabase
 */

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/core/config/env";

/**
 * Singleton Supabase client for client-side usage.
 *
 * @example
 * ```ts
 * import { supabase } from "@/core/lib/supabase";
 * const { data } = await supabase.from("projects").select("*");
 * ```
 */
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
