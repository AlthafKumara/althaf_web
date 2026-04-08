/**
 * @fileoverview Global Navigation Bar
 *
 * The sticky top navigation bar displayed on all public-facing pages.
 * Contains the logo/brand, section anchor links, social media links,
 * and a primary "Contact Me" CTA button.
 *
 * This is a **Server Component** — it has no client-side interactivity
 * and can be rendered entirely on the server for optimal performance.
 *
 * @module core/ui/Navbar
 */

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

/**
 * Renders the sticky navigation bar with section links and social icons.
 */
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-xl font-bold tracking-tighter text-text-primary hover:text-primary transition-colors">
          Althaf<span className="text-primary">Kumara</span>
        </Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-text-secondary">
          <Link href="#about" className="hover:text-primary transition-colors">About</Link>
          <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
          <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="#activity" className="hover:text-primary transition-colors">Activity</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/AlthafKumara" target="_blank" className="text-text-secondary hover:text-primary transition-colors">
            <FaGithub className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-text-secondary hover:text-primary transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </Link>
          <Link href="mailto:contact@example.com" className="px-4 py-2 bg-primary text-background font-bold text-sm rounded-xl hover:scale-105 transition-transform duration-200">
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
