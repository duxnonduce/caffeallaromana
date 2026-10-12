"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/admin/login";

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (isLogin) {
    return <>{children}</>;
  }

  const linkStyle = (path: string) => ({
    color: pathname.startsWith(path) ? "var(--rust)" : "var(--ink)",
    fontWeight: pathname.startsWith(path) ? 600 : 400
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header
        className="sticky top-0 z-20 border-b"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/admin/menu" style={linkStyle("/admin/menu")}>
              Menù
            </Link>
            <Link href="/admin/settings" style={linkStyle("/admin/settings")}>
              Impostazioni
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline-offset-2 hover:underline"
              style={{ color: "var(--sage)" }}
            >
              Vedi il menù pubblico ↗
            </a>
            <button
              onClick={handleLogout}
              className="rounded-full border px-3 py-1.5 text-xs"
              style={{ borderColor: "var(--line)" }}
            >
              Esci
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-6">{children}</div>
    </div>
  );
}
