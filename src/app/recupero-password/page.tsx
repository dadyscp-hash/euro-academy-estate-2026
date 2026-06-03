"use client";

import { useState } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";

export default function PasswordRecoveryPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[76vh] max-w-xl items-center px-4 py-14 sm:px-6">
        <GlassCard className="w-full">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Recupero password mock</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Recupera accesso</h1>
          <p className="mt-4 leading-7 text-metal">In questo MVP il recupero password e simulato. In produzione verra collegato a un backend reale con invio email sicuro.</p>
          {sent ? (
            <p className="mt-6 rounded-md border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-100">Email mock inviata. Controlla la console del prodotto reale quando sara collegato al backend.</p>
          ) : (
            <form className="mt-8 grid gap-5" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <label className="grid gap-2 text-sm text-metal">Email<input type="email" required className="input" /></label>
              <OrbitalButton>Invia email mock</OrbitalButton>
            </form>
          )}
        </GlassCard>
      </section>
    </PageShell>
  );
}
