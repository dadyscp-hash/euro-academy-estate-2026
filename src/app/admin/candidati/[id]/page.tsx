"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Save } from "lucide-react";
import { FinalScorePanel } from "@/components/academy/FinalScorePanel";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { StatusBadge } from "@/components/cosmic/StatusBadge";
import { PageShell } from "@/components/ui/PageShell";
import { modules } from "@/data/modules";
import { useAdminGuard } from "@/lib/clientHooks";
import { downloadCsv, exportCandidatesCsv } from "@/lib/csvExport";
import { calculateCompletedModules, calculateTotalProgress } from "@/lib/progress";
import { calculateCandidateStatus, calculateFinalScore } from "@/lib/scoring";
import { getCandidateById, saveCandidate } from "@/lib/storage";
import type { Candidate, CandidateStatus } from "@/types";

const statuses: CandidateStatus[] = ["In corso", "In attesa tesina", "In attesa esame live", "Non idoneo", "Da rivalutare", "Idoneo base", "Idoneo buono", "Candidato top"];

export default function CandidateDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { allowed, loading } = useAdminGuard();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [thesisScore, setThesisScore] = useState("");
  const [liveScore, setLiveScore] = useState("");
  const [notes, setNotes] = useState("");
  const [manualStatus, setManualStatus] = useState<CandidateStatus | "">("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!allowed) return;
    void getCandidateById(params.id).then((item) => {
      if (!item) {
        router.push("/admin");
        return;
      }
      setCandidate(item);
      setThesisScore(item.adminEvaluation?.thesisScore?.toString() ?? "");
      setLiveScore(item.adminEvaluation?.liveScore?.toString() ?? "");
      setNotes(item.adminEvaluation?.notes ?? "");
      setManualStatus(item.adminEvaluation?.manualStatus ?? "");
    });
  }, [allowed, params.id, router]);

  const save = async () => {
    if (!candidate) return;
    const updated = structuredClone(candidate);
    const parsedThesis = thesisScore === "" ? undefined : Math.max(0, Math.min(40, Number(thesisScore)));
    const parsedLive = liveScore === "" ? undefined : Math.max(0, Math.min(30, Number(liveScore)));
    updated.adminEvaluation = {
      thesisScore: parsedThesis,
      liveScore: parsedLive,
      notes,
      manualStatus: manualStatus || undefined,
      updatedAt: new Date().toISOString()
    };
    updated.status = calculateCandidateStatus(updated);
    if (updated.thesis && parsedThesis !== undefined) updated.thesis.status = "Valutata";
    await saveCandidate(updated);
    setCandidate(updated);
    setMessage("Valutazione salvata. Punteggio finale ricalcolato.");
  };

  if (loading || !allowed || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento scheda candidato...</p></PageShell>;

  return (
    <PageShell internal>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Scheda candidato</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">{candidate.firstName} {candidate.lastName}</h1>
            <div className="mt-4 flex flex-wrap gap-3"><StatusBadge status={calculateCandidateStatus(candidate)} /><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-metal">{calculateFinalScore(candidate)}/100</span></div>
          </div>
          <OrbitalButton onClick={() => downloadCsv(candidate.lastName + "-euro-academy.csv", exportCandidatesCsv([candidate]))}><Download size={18} /> Esporta candidato</OrbitalButton>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-6">
            <GlassCard>
              <h2 className="font-display text-2xl font-semibold">Dati candidatura</h2>
              <dl className="mt-5 grid gap-3 text-sm text-metal">
                <Row label="Email" value={candidate.email} />
                <Row label="Telefono" value={candidate.whatsapp} />
                <Row label="Data nascita" value={candidate.birthDate} />
                <Row label="Lavoro/studi" value={candidate.currentWork} />
                <Row label="Sogno" value={candidate.dream} />
                <Row label="Guadagno atteso" value={candidate.expectedIncome} />
                <Row label="Motivazione" value={candidate.motivation} />
                <Row label="Impegno" value={candidate.commitment + "/10"} />
              </dl>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display text-2xl font-semibold">Progressi</h2>
              <p className="mt-3 text-metal">Progresso corso: {calculateTotalProgress(candidate)}% · Moduli completati: {calculateCompletedModules(candidate)}/10</p>
              <div className="mt-5 grid gap-2">
                {modules.map((module) => {
                  const progress = candidate.moduleProgress[module.id];
                  return <p key={module.id} className="rounded border border-white/10 p-3 text-sm text-metal">M{module.id} · lezioni {progress.completedLessons.length}/8 · esercizio {progress.exercise ? "consegnato" : "mancante"} · quiz {progress.bestQuizScore}/10 · tentativi {progress.quizAttempts.length}</p>;
                })}
              </div>
            </GlassCard>
          </div>
          <div className="grid gap-6">
            <GlassCard>
              <h2 className="font-display text-2xl font-semibold">Esame finale</h2>
              <div className="mt-4 grid gap-3 text-sm text-metal">
                <Row label="Quiz finale" value={(candidate.finalExam?.bestScore ?? 0) + "/30"} />
                <Row label="Tempo quiz finale" value={candidate.finalExam?.timeSpentSeconds ? Math.round(candidate.finalExam.timeSpentSeconds / 60) + " minuti" : "Non completato"} />
                <Row label="Tesina caricata" value={candidate.thesis ? "Si" : "No"} />
                <Row label="File tesina" value={candidate.thesis?.fileName ?? "Non caricato"} />
              </div>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display text-2xl font-semibold">Valutazione admin</h2>
              <div className="mt-5 grid gap-4">
                <label className="grid gap-2 text-sm text-metal">Voto tesina da 0 a 40<input className="input" type="number" min={0} max={40} value={thesisScore} onChange={(event) => setThesisScore(event.target.value)} /></label>
                <label className="grid gap-2 text-sm text-metal">Voto esame live da 0 a 30<input className="input" type="number" min={0} max={30} value={liveScore} onChange={(event) => setLiveScore(event.target.value)} /></label>
                <label className="grid gap-2 text-sm text-metal">Note private<textarea className="input min-h-32" value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
                <label className="grid gap-2 text-sm text-metal">Stato manuale<select className="input" value={manualStatus} onChange={(event) => setManualStatus(event.target.value as CandidateStatus | "")}>
                  <option value="">Automatico</option>
                  {statuses.map((item) => <option key={item}>{item}</option>)}
                </select></label>
                <OrbitalButton onClick={save}><Save size={18} /> Salva valutazione</OrbitalButton>
                {message ? <p className="rounded-md border border-emerald-400/40 bg-emerald-400/10 p-3 text-emerald-100">{message}</p> : null}
              </div>
            </GlassCard>
            <FinalScorePanel candidate={candidate} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-1 border-b border-white/10 pb-2"><dt className="text-xs uppercase tracking-[0.18em] text-gold">{label}</dt><dd>{value}</dd></div>;
}
