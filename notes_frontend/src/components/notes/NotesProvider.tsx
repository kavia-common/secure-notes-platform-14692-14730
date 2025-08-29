"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage, StoredNote } from "@/lib/storage";
import { useAuth } from "@/components/AuthProvider";

type NotesContextType = {
  notes: StoredNote[];
  selectedId: string | null;
  query: string;
  // PUBLIC_INTERFACE
  createNote: () => void;
  // PUBLIC_INTERFACE
  updateNote: (id: string, patch: Partial<Pick<StoredNote, "title" | "content">>) => void;
  // PUBLIC_INTERFACE
  deleteNote: (id: string) => void;
  // PUBLIC_INTERFACE
  selectNote: (id: string | null) => void;
  // PUBLIC_INTERFACE
  setQuery: (q: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<StoredNote[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // load notes for user
  useEffect(() => {
    if (!user) {
      setNotes([]);
      setSelectedId(null);
      return;
    }
    const ns = storage.getNotes(user.id);
    setNotes(ns.sort((a, b) => b.updatedAt - a.updatedAt));
    setSelectedId(ns[0]?.id ?? null);
  }, [user]);

  // persist on changes
  useEffect(() => {
    if (user) storage.setNotes(user.id, notes);
  }, [user, notes]);

  const createNote = () => {
    const now = Date.now();
    const newNote: StoredNote = {
      id: `note_${Math.random().toString(36).slice(2, 10)}`,
      title: "Untitled",
      content: "",
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(newNote.id);
  };

  const updateNote = (id: string, patch: Partial<Pick<StoredNote, "title" | "content">>) => {
    setNotes(prev =>
      prev
        .map(n => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } as StoredNote : n))
        .sort((a, b) => b.updatedAt - a.updatedAt)
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setSelectedId(prev => (prev === id ? null : prev));
  };

  const selectNote = (id: string | null) => setSelectedId(id);

  const value = useMemo(
    () => ({ notes, selectedId, query, createNote, updateNote, deleteNote, selectNote, setQuery }),
    [notes, selectedId, query]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

/** PUBLIC_INTERFACE
 Hook to access notes logic.
*/
export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
};
