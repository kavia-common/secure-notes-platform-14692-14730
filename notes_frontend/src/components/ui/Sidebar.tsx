"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar hidden md:flex flex-col p-4 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-accent" />
        <span className="font-semibold tracking-tight">Secure Notes</span>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="#" className="btn">
          All Notes
        </Link>
        <Link href="#" className="btn">
          Favorites (soon)
        </Link>
        <Link href="#" className="btn">
          Archived (soon)
        </Link>
      </nav>

      <div className="mt-auto text-sm text-muted">
        {user ? (
          <div className="pt-4">
            <div className="mb-1">Signed in as</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
        ) : (
          <div className="pt-4">Not signed in</div>
        )}
        <div className="mt-6 text-xs text-muted">
          v1.0 • Minimalistic, light theme
        </div>
      </div>
    </aside>
  );
};
