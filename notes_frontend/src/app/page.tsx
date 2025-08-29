"use client";

import { useAuth } from "@/components/AuthProvider";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/Sidebar";
import { NotesView } from "@/components/notes/NotesView";
import { AuthCard } from "@/components/ui/AuthCard";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center p-6">
        <AuthCard />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <NotesView />
      </div>
    </div>
  );
}
