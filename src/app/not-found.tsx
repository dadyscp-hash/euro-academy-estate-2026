import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";

export default function NotFoundPage() {
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[72vh] max-w-3xl items-center px-4 py-16 text-center sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">404</p>
          <h1 className="mt-3 font-display text-5xl font-semibold">Orbita non trovata</h1>
          <p className="mt-5 leading-8 text-metal">La pagina richiesta non esiste o non e ancora disponibile nel percorso Euro Academy.</p>
          <div className="mt-7">
            <OrbitalButton href="/">Torna alla homepage</OrbitalButton>
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
