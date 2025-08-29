"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export const AuthCard = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!email) return setError("Email is required");
      if (!password) return setError("Password is required");
      if (mode === "signin") await signIn(email);
      else await signUp(email);
    } catch (err) {
      setError("Authentication failed");
      console.error(err);
    }
  };

  return (
    <div className="card w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-1">Secure Notes</h1>
      <p className="text-muted mb-6">Sign {mode === "signin" ? "in" : "up"} to continue</p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="input"
            placeholder="you@example.com"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-muted mt-1">Demo only; credentials are stored locally.</p>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button disabled={loading} className="btn btn-primary w-full" type="submit">
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="text-sm text-center mt-4">
        {mode === "signin" ? (
          <>
            Don&apos;t have an account?{" "}
            <button className="text-primary underline" onClick={() => setMode("signup")}>
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button className="text-primary underline" onClick={() => setMode("signin")}>
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};
