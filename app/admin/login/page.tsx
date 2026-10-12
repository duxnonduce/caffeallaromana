"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Email o password non corrette.");
      return;
    }
    router.push("/admin/menu");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-ink">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border p-6"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
      >
        <h1 className="font-display mb-1 text-2xl italic" style={{ color: "var(--rust)" }}>
          Accesso gestione menù
        </h1>
        <p className="mb-6 text-sm" style={{ color: "var(--sage)" }}>
          Entra con le credenziali del locale
        </p>

        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--line)", background: "var(--paper)" }}
        />

        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--line)", background: "var(--paper)" }}
        />

        {error && (
          <p className="mb-4 text-sm" style={{ color: "#c0392b" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-2.5 text-sm font-medium"
          style={{ background: "var(--rust)", color: "var(--card)" }}
        >
          {loading ? "Accesso in corso…" : "Entra"}
        </button>
      </form>
    </main>
  );
}
