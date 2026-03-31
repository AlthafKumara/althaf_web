"use client";

import { useRouter } from "next/navigation";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import { LogOut, MonitorSmartphone } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authRepository.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-surface border-r border-neutral-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <MonitorSmartphone className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-text-primary">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
            Dashboard
          </Link>
          <Link href="/" target="_blank" className="block px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-neutral-800/50 transition-colors">
            View Live Site
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors font-medium border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
