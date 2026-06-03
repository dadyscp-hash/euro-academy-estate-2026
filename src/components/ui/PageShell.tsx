"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Shield, UserRound } from "lucide-react";
import { CosmicBackground } from "@/components/cosmic/CosmicBackground";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { getSession, logout } from "@/lib/auth";

export function PageShell({ children, internal = false }: { children: React.ReactNode; internal?: boolean }) {
  const router = useRouter();
  const session = typeof window !== "undefined" ? getSession() : null;
  const doLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <CosmicBackground />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-void/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-xl font-bold text-lunar">Euro Academy</Link>
          <div className="hidden items-center gap-5 text-sm text-metal md:flex">
            <Link href="/regolamento">Regolamento</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/termini">Termini</Link>
            {internal && session?.role === "candidate" ? <Link href="/dashboard">Dashboard</Link> : null}
            {internal && session?.role === "admin" ? <Link href="/admin">Admin</Link> : null}
          </div>
          <div className="flex items-center gap-2">
            {session ? (
              <button onClick={doLogout} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-metal hover:text-gold">
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <>
                <OrbitalButton href="/login" variant="secondary" className="hidden sm:inline-flex"><UserRound size={16} /> Login</OrbitalButton>
                <OrbitalButton href="/admin/login" variant="ghost" className="hidden sm:inline-flex"><Shield size={16} /> Admin</OrbitalButton>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
