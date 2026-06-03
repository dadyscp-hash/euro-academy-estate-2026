"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { getModule } from "@/data/modules";
import { useCandidateGuard } from "@/lib/clientHooks";
import { recalculateModule } from "@/lib/progress";
import { saveCandidate } from "@/lib/storage";

export default function ExercisePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const moduleId = Number(params.id);
  const module = getModule(moduleId);
  const { candidate, loading, setCandidate } = useCandidateGuard();
  const [answers, setAnswers] = useState("");
  const [error, setError] = useState("");

  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento esercizio...</p></PageShell>;
  if (!module) return <PageShell internal><p className="p-8 text-metal">Esercizio non trovato.</p></PageShell>;

  const submit = async () => {
    if (answers.trim().length < 80) {
      setError("Consegna un esercizio piu completo: almeno 80 caratteri.");
      return;
    }
    const updated = structuredClone(candidate);
    updated.moduleProgress[moduleId].exercise = { moduleId, answers: answers.trim(), submittedAt: new Date().toISOString() };
    const recalculated = recalculateModule(updated, moduleId);
    await saveCandidate(recalculated);
    setCandidate(recalculated);
    router.push("/academy/moduli/" + moduleId + "/quiz");
  };

  return (
    <PageShell internal>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Esercizio modulo {module.id}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{module.exercise.title}</h1>
          <p className="mt-4 leading-7 text-metal">{module.exercise.prompt}</p>
          <ol className="mt-6 list-decimal space-y-2 pl-5 text-metal">
            {module.exercise.questions.map((question) => <li key={question}>{question}</li>)}
          </ol>
          {error ? <p className="mt-5 rounded-md border border-red-400/40 bg-red-500/10 p-3 text-red-100">{error}</p> : null}
          <textarea className="input mt-6 min-h-64" value={answers} onChange={(event) => setAnswers(event.target.value)} placeholder="Scrivi qui la tua consegna personale..." />
          <div className="mt-6 flex flex-wrap gap-3">
            <OrbitalButton onClick={submit}>Consegna esercizio</OrbitalButton>
            <OrbitalButton href={"/academy/moduli/" + module.id} variant="secondary">Torna al modulo</OrbitalButton>
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
