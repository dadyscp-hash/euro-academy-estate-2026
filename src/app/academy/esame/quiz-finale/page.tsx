"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { QuizCard } from "@/components/quiz/QuizCard";
import { PageShell } from "@/components/ui/PageShell";
import { finalQuiz } from "@/data/finalQuiz";
import { useCandidateGuard } from "@/lib/clientHooks";
import { hasCompletedAllModules } from "@/lib/progress";
import { calculateQuizScore, canTakeFinalQuiz } from "@/lib/scoring";
import { saveCandidate } from "@/lib/storage";

const TOTAL_SECONDS = 30 * 60;

export default function FinalQuizPage() {
  const { candidate, loading, setCandidate } = useCandidateGuard();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [result, setResult] = useState<{ score: number; timeSpent: number } | null>(null);
  const canSubmit = useMemo(() => Boolean(candidate && hasCompletedAllModules(candidate) && canTakeFinalQuiz(candidate)), [candidate]);

  const submit = async () => {
    if (!candidate || result) return;
    const score = calculateQuizScore(finalQuiz, answers);
    const timeSpent = TOTAL_SECONDS - secondsLeft;
    const updated = structuredClone(candidate);
    const attempt = {
      id: "final-" + Date.now(),
      score,
      total: 30 as const,
      answers,
      passed: true,
      createdAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent
    };
    updated.finalExam = {
      attempts: [...(updated.finalExam?.attempts ?? []), attempt],
      bestScore: Math.max(updated.finalExam?.bestScore ?? 0, score),
      completedAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent
    };
    await saveCandidate(updated);
    setCandidate(updated);
    setResult({ score, timeSpent });
  };

  useEffect(() => {
    if (!canSubmit || result) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          void submit();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [canSubmit, result, answers, candidate]);

  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento quiz finale...</p></PageShell>;
  if (!hasCompletedAllModules(candidate)) return <Locked text="Completa tutti i 10 moduli per accedere al quiz finale." />;
  if (!canTakeFinalQuiz(candidate) && !result) return <Locked text="Hai gia utilizzato i 2 tentativi disponibili per il quiz finale." />;

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <PageShell internal>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <GlassCard>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Esame finale</p>
              <h1 className="mt-3 font-display text-4xl font-semibold">Quiz finale da 30 minuti</h1>
              <p className="mt-4 leading-7 text-metal">30 domande, massimo 2 tentativi. Allo scadere del timer il quiz viene inviato automaticamente.</p>
            </div>
            <div className="rounded-lg border border-gold/40 bg-gold/10 px-5 py-3 font-display text-2xl text-gold">{minutes}:{seconds}</div>
          </div>
          <div className="mt-8 grid gap-5">
            {finalQuiz.map((question) => <QuizCard key={question.id} question={question} value={answers[question.id]} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} />)}
          </div>
          <div className="mt-7"><OrbitalButton onClick={submit}>Invia quiz finale</OrbitalButton></div>
          {result ? (
            <div className="mt-8 rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-5 text-emerald-100">
              <h2 className="font-display text-2xl font-semibold">Quiz finale completato. Ora devi dimostrare applicazione pratica attraverso la tesina finale.</h2>
              <p className="mt-2">Punteggio: {result.score}/30 · Tempo impiegato: {Math.round(result.timeSpent / 60)} minuti</p>
              <div className="mt-5"><OrbitalButton href="/academy/esame/tesina">Vai alla tesina finale</OrbitalButton></div>
            </div>
          ) : null}
        </GlassCard>
      </section>
    </PageShell>
  );
}

function Locked({ text }: { text: string }) {
  return <PageShell internal><section className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><GlassCard><h1 className="font-display text-3xl font-semibold">Accesso non disponibile</h1><p className="mt-4 text-metal">{text}</p><div className="mt-6"><OrbitalButton href="/academy" variant="secondary">Torna all'academy</OrbitalButton></div></GlassCard></section></PageShell>;
}
