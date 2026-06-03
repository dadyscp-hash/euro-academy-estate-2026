"use client";

import { useParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { getLesson, getModule } from "@/data/modules";
import { useCandidateGuard } from "@/lib/clientHooks";
import { recalculateModule } from "@/lib/progress";
import { saveCandidate } from "@/lib/storage";

export default function LessonPage() {
  const params = useParams<{ id: string; lessonId: string }>();
  const router = useRouter();
  const moduleId = Number(params.id);
  const lesson = getLesson(moduleId, params.lessonId);
  const module = getModule(moduleId);
  const { candidate, loading, setCandidate } = useCandidateGuard();

  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento lezione...</p></PageShell>;
  if (!lesson || !module) return <PageShell internal><p className="p-8 text-metal">Lezione non trovata.</p></PageShell>;

  const completed = candidate.moduleProgress[moduleId]?.completedLessons.includes(lesson.id);
  const markComplete = async () => {
    const updated = structuredClone(candidate);
    const progress = updated.moduleProgress[moduleId];
    if (!progress.completedLessons.includes(lesson.id)) progress.completedLessons.push(lesson.id);
    const recalculated = recalculateModule(updated, moduleId);
    await saveCandidate(recalculated);
    setCandidate(recalculated);
    router.push("/academy/moduli/" + moduleId);
  };

  return (
    <PageShell internal>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Modulo {module.id} · {lesson.duration}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{lesson.title}</h1>
          <p className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4 text-metal"><strong className="text-lunar">Obiettivo:</strong> {lesson.objective}</p>
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-line leading-8 text-metal">{lesson.content}</div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Info title="Concetto chiave" text={lesson.keyConcept} />
            <Info title="Errore da evitare" text={lesson.mistakeToAvoid} />
            <Info title="Micro-esercizio" text={lesson.microExercise} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <OrbitalButton onClick={markComplete}>{completed ? "Lezione gia completata" : "Segna lezione come completata"} <CheckCircle2 size={18} /></OrbitalButton>
            <OrbitalButton href={"/academy/moduli/" + moduleId} variant="secondary">Torna al modulo</OrbitalButton>
          </div>
        </GlassCard>
      </article>
    </PageShell>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><h2 className="font-display text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-metal">{text}</p></div>;
}
