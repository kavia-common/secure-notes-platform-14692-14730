"use client";

import { useMemo } from "react";
import { useNotes } from "./NotesProvider";

export const NotesList = () => {
  const { notes, selectedId, selectNote, query, deleteNote } = useNotes();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <div className="flex flex-col gap-3 min-h-0">
      <div className="text-sm text-muted">Notes ({filtered.length})</div>
      <div className="flex-1 min-h-0 overflow-auto pr-1 space-y-2">
        {filtered.map((n) => (
          <button
            key={n.id}
            onClick={() => selectNote(n.id)}
            className={`note-item w-full text-left ${selectedId === n.id ? "border-primary" : ""}`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{n.title || "Untitled"}</div>
                <div className="text-xs text-muted truncate">
                  {n.content ? n.content.replace(/\n/g, " ").slice(0, 80) : "No content yet"}
                </div>
              </div>
              <div className="text-[10px] text-muted whitespace-nowrap pl-2">
                {new Date(n.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="btn text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Delete this note?")) deleteNote(n.id);
                }}
              >
                Delete
              </button>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-sm text-muted">No notes match your search.</div>
        )}
      </div>
    </div>
  );
};
