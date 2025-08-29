"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { storage, StoredUser } from "@/lib/storage";

/**
 PUBLIC_INTERFACE
 Provides authentication context for the app.
 - Sign up / Sign in are mocked and stored in localStorage.
 - Not for production; replace with real identity provider as needed.
*/
type AuthContextType = {
  user: StoredUser | null;
  loading: boolean;
  // PUBLIC_INTERFACE
  signIn: (email: string, _password: string) => Promise<void>;
  // PUBLIC_INTERFACE
  signUp: (email: string, _password: string) => Promise<void>;
  // PUBLIC_INTERFACE
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  // hydrate from localStorage
  useEffect(() => {
    const u = storage.getUser();
    setUser(u);
    setLoading(false);
  }, []);

  // mock user directory by email to userId mapping
  const getOrCreateUserByEmail = (email: string): StoredUser => {
    const directoryKey = "notes.user.directory";
    const raw = typeof window !== "undefined" ? localStorage.getItem(directoryKey) : null;
    const directory = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    let id = directory[email];
    if (!id) {
      id = `user_${Math.random().toString(36).slice(2, 10)}`;
      directory[email] = id;
      localStorage.setItem(directoryKey, JSON.stringify(directory));
    }
    return { id, email };
  };

  const signIn = useCallback(async (email: string) => {
    const u = getOrCreateUserByEmail(email);
    storage.setUser(u);
    setUser(u);
  }, []);

  const signUp = useCallback(async (email: string) => {
    const u = getOrCreateUserByEmail(email);
    storage.setUser(u);
    setUser(u);
  }, []);

  const signOut = useCallback(() => {
    storage.setUser(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut }),
    [user, loading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 PUBLIC_INTERFACE
 Hook to access authentication context.
*/
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
