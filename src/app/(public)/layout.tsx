/**
 * @fileoverview Public Pages Layout
 *
 * Wraps all public-facing pages (homepage, etc.) with the shared
 * Navbar and DevAlert components. This layout does NOT apply to
 * `/admin` or `/login` routes, which have their own layouts.
 *
 * Route groups in Next.js use parenthesized folder names `(public)`
 * and do NOT affect the URL path — `/` still resolves as expected.
 *
 * @module app/(public)/layout
 */

import Navbar from "@/core/ui/Navbar";
import DevAlert from "@/core/ui/DevAlert";

/**
 * Public layout wrapper — adds Navbar, main content area, and DevAlert.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <DevAlert />
    </>
  );
}
