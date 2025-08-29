"use client";

import { useAuth } from "@/components/AuthProvider";
import { useNotes } from "@/components/notes/NotesProvider";

export const Header = () => {
  const { signOut, user } = useAuth();
  const { setQuery, createNote } = useNotes();

  return (
    <header className="header sticky top-0 z-10">
      <div className="flex items-center gap-3 p-3">
        <div className="relative flex-1">
          <input
            aria-label="Search notes"
            className="input"
            placeholder="Search notes..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-accent" onClick={createNote} aria-label="Create new note">
          New Note
        </button>
        {user && (
          <button className="btn" onClick={signOut} aria-label="Sign out">
            Sign out
          </button>
        )}
      </div>
    </header>
  );
};
