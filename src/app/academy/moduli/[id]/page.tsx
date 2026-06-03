"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicProgressBar } from "@/components/cosmic/CosmicProgressBar";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { getModule } from "@/data/modules";
import { useCandidateGuard } from "@/lib/clientHooks";
import { isModuleUnlocked } from "@/lib/progress";

export default function ModulePage() {
  const params = useParams<{ id: string }>();
  const moduleId = Number(params.id);
  const module = getModule(moduleId);
  const { candidate, loading } = useCandidateGuard();

  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento modulo...</p></PageShell>;
  if (!module) return <PageShell internal><p className="p-8 text-metal">Modulo non trovato.</p></PageShell>;
  const unlocked = isModuleUnlocked(candidate, moduleId);
  const progress = candidate.moduleProgress[moduleId];
  const unitCount = module.lessons.length + 2;
  const done = (progress?.completedLessons.length ?? 0) + (progress?.exercise ? 1 : 0) + ((progress?.bestQuizScore ?? 0) >= module.passScore ? 1 : 0);

  if (!unlocked) {
    return (
      <PageShell internal>
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <GlassCard>
            <Lock className="text-gold" />
            <h1 className="mt-4 font-display text-3xl font-semibold">Modulo bloccato</h1>
            <p className="mt-4 leading-7 text-metal">Questo modulo e ancora bloccato. Completa lo step precedente per sbloccare la prossima orbita.</p>
            <div className="mt-6"><OrbitalButton href="/academy" variant="secondary">Torna all'academy</OrbitalButton></div>
          </GlassCard>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell internal>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Modulo {module.id}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{module.title}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-metal">{module.description}</p>
          <div className="mt-6 max-w-2xl"><CosmicProgressBar value={Math.round((done / unitCount) * 100)} /></div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <GlassCard>
            <h2 className="font-display text-2xl font-semibold">Obiettivi</h2>
            <ul className="mt-5 space-y-3 text-sm text-metal">
              {module.objectives.map((objective) => <li key={objective} className="flex gap-2"><CheckCircle2 size={16} className="mt-1 text-gold" /> {objective}</li>)}
            </ul>
          </GlassCard>
          <div className="grid gap-4">
            {module.lessons.map((lesson) => {
              const completed = progress?.completedLessons.includes(lesson.id);
              return (
                <Link key={lesson.id} href={"/academy/moduli/" + module.id + "/lezioni/" + lesson.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-gold/50">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-metal">Lezione {lesson.id} · {lesson.duration}</p>
                      <h3 className="mt-1 font-display text-xl font-semibold">{lesson.title}</h3>
                    </div>
                    {completed ? <CheckCircle2 className="text-emerald-300" /> : null}
                  </div>
                </Link>
              );
            })}
            <div className="flex flex-wrap gap-3 pt-2">
              <OrbitalButton href={"/academy/moduli/" + module.id + "/esercizio"} variant="secondary">Vai all'esercizio</OrbitalButton>
              <OrbitalButton href={"/academy/moduli/" + module.id + "/quiz"}>Vai al quiz</OrbitalButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
