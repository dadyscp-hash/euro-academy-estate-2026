"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { QuizCard } from "@/components/quiz/QuizCard";
import { PageShell } from "@/components/ui/PageShell";
import { getModule } from "@/data/modules";
import { useCandidateGuard } from "@/lib/clientHooks";
import { recalculateModule } from "@/lib/progress";
import { calculateQuizScore, hasPassedModuleQuiz } from "@/lib/scoring";
import { saveCandidate } from "@/lib/storage";

export default function ModuleQuizPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const moduleId = Number(params.id);
  const module = getModule(moduleId);
  const { candidate, loading, setCandidate } = useCandidateGuard();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);

  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento quiz...</p></PageShell>;
  if (!module) return <PageShell internal><p className="p-8 text-metal">Quiz non trovato.</p></PageShell>;

  const submit = async () => {
    const score = calculateQuizScore(module.quiz, answers);
    const passed = hasPassedModuleQuiz(score, module.passScore);
    const updated = structuredClone(candidate);
    const progress = updated.moduleProgress[moduleId];
    progress.quizAttempts.push({ id: "quiz-" + Date.now(), score, total: module.quiz.length, answers, passed, createdAt: new Date().toISOString() });
    progress.bestQuizScore = Math.max(progress.bestQuizScore, score);
    const recalculated = recalculateModule(updated, moduleId);
    await saveCandidate(recalculated);
    setCandidate(recalculated);
    setResult({ score, passed });
  };

  return (
    <PageShell internal>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Quiz modulo {module.id}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{module.title}</h1>
          <p className="mt-4 text-metal">Soglia superamento: 7/10. Puoi riprovare; viene salvato il miglior punteggio.</p>
          <div className="mt-8 grid gap-5">
            {module.quiz.map((question) => <QuizCard key={question.id} question={question} value={answers[question.id]} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} />)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <OrbitalButton onClick={submit}>Invia quiz</OrbitalButton>
            <OrbitalButton href={"/academy/moduli/" + module.id} variant="secondary">Torna al modulo</OrbitalButton>
          </div>
          {result ? (
            <div className="mt-8 rounded-lg border border-white/10 bg-black/30 p-5">
              <h2 className="font-display text-2xl font-semibold">{result.passed ? "Modulo superato. Hai sbloccato il prossimo livello." : "Non hai ancora superato il quiz. Rivedi il modulo e riprova con piu attenzione."}</h2>
              <p className="mt-2 text-metal">Punteggio: {result.score}/10</p>
              <div className="mt-5 grid gap-3 text-sm text-metal">
                {module.quiz.map((question) => <p key={question.id}><strong className="text-lunar">{question.question}</strong><br />{question.explanation}</p>)}
              </div>
              {result.passed ? <div className="mt-6"><OrbitalButton onClick={() => router.push("/academy")}>Torna all'academy</OrbitalButton></div> : null}
            </div>
          ) : null}
        </GlassCard>
      </section>
    </PageShell>
  );
}
