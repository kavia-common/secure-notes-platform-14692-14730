"use client";

import { useMemo } from "react";
import { useNotes } from "./NotesProvider";

export const NoteEditor = () => {
  const { notes, selectedId, updateNote, createNote } = useNotes();

  const note = useMemo(() => notes.find((n) => n.id === selectedId) ?? null, [notes, selectedId]);

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium mb-2">No note selected</div>
          <button className="btn btn-accent" onClick={createNote}>
            Create your first note
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <input
        className="input text-xl font-semibold"
        placeholder="Title"
        value={note.title}
        onChange={(e) => updateNote(note.id, { title: e.target.value })}
      />
      <textarea
        className="input min-h-[50vh] md:min-h-[60vh] leading-6"
        placeholder="Start typing..."
        value={note.content}
        onChange={(e) => updateNote(note.id, { content: e.target.value })}
      />
      <div className="text-xs text-muted">
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};
