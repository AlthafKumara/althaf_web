/**
 * @fileoverview Root Layout — HTML Shell
 *
 * The absolute root layout of the application. This file is intentionally
 * kept as THIN as possible — it only handles:
 * 1. HTML `<html>` and `<body>` tags
 * 2. Global font loading (Inter)
 * 3. Global CSS import
 * 4. SEO metadata
 *
 * Page-specific layouts (Navbar, footer, admin sidebar) are handled by
 * nested layouts in their respective route groups:
 * - `(public)/layout.tsx` → Navbar + DevAlert for public pages
 * - `admin/layout.tsx` → Admin sidebar
 *
 * @module app/layout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Althaf Kumara Web",
  description:
    "Mobile Developer Specialist (Flutter/Dart) & Full-Stack Engineer",
};

/**
 * Root HTML layout wrapper.
 * All routes in the app inherit this shell.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
