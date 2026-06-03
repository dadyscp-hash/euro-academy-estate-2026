"use client";

import { ModuleOrbitCard } from "@/components/academy/ModuleOrbitCard";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { modules } from "@/data/modules";
import { useCandidateGuard } from "@/lib/clientHooks";
import { hasCompletedAllModules, isModuleUnlocked } from "@/lib/progress";

export default function AcademyPage() {
  const { candidate, loading } = useCandidateGuard();
  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento academy...</p></PageShell>;

  return (
    <PageShell internal>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Academy</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">10 orbite formative</h1>
            <p className="mt-4 max-w-3xl leading-7 text-metal">Ogni modulo richiede lezioni completate, esercizio consegnato e quiz superato con almeno 7/10.</p>
          </div>
          {hasCompletedAllModules(candidate) ? <OrbitalButton href="/academy/esame/quiz-finale">Vai al quiz finale</OrbitalButton> : null}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const progress = candidate.moduleProgress[module.id];
            const unitCount = module.lessons.length + 2;
            const done = (progress?.completedLessons.length ?? 0) + (progress?.exercise ? 1 : 0) + ((progress?.bestQuizScore ?? 0) >= module.passScore ? 1 : 0);
            return <ModuleOrbitCard key={module.id} module={module} progress={Math.round((done / unitCount) * 100)} unlocked={isModuleUnlocked(candidate, module.id)} />;
          })}
        </div>
        <GlassCard className="mt-8">
          <h2 className="font-display text-2xl font-semibold">Footer interno Academy</h2>
          <p className="mt-3 leading-7 text-metal">Regola AI: ogni contenuto deve essere personale, originale e coerente con il Metodo Sirius. L'AI puo aiutare nello studio, ma non sostituisce ragionamento reale e capacita di difendere il lavoro.</p>
        </GlassCard>
      </section>
    </PageShell>
  );
}
