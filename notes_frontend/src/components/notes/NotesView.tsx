"use client";

import { NotesProvider } from "@/components/notes/NotesProvider";
import { NotesList } from "@/components/notes/NotesList";
import { NoteEditor } from "@/components/notes/NoteEditor";

export const NotesView = () => {
  return (
    <NotesProvider>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[360px_1fr] min-h-0">
        <div className="p-4 border-default border-r bg-secondary/60 min-h-[40vh] md:min-h-0">
          <NotesList />
        </div>
        <div className="p-4 min-w-0">
          <NoteEditor />
        </div>
      </div>
    </NotesProvider>
  );
};
