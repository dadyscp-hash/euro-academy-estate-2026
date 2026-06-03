"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, FileText, Trophy, Video } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicProgressBar } from "@/components/cosmic/CosmicProgressBar";
import { StatusBadge } from "@/components/cosmic/StatusBadge";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { modules } from "@/data/modules";
import { useCandidateGuard } from "@/lib/clientHooks";
import { calculateCompletedModules, calculateTotalProgress, getNextModuleId } from "@/lib/progress";
import { calculateCandidateStatus } from "@/lib/scoring";
import { FinalScorePanel } from "@/components/academy/FinalScorePanel";

export default function DashboardPage() {
  const { candidate, loading } = useCandidateGuard();
  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    setWelcome(new URLSearchParams(window.location.search).get("welcome") === "1");
  }, []);
  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento dashboard...</p></PageShell>;

  const progress = calculateTotalProgress(candidate);
  const completed = calculateCompletedModules(candidate);
  const nextModuleId = getNextModuleId(candidate);
  const status = calculateCandidateStatus(candidate);

  return (
    <PageShell internal>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {welcome ? <p className="mb-6 rounded-md border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-100">Candidatura ricevuta. Benvenuto in Euro Academy.</p> : null}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Dashboard candidato</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">Ciao {candidate.firstName}</h1>
            <p className="mt-4 max-w-3xl leading-8 text-metal">Il percorso e iniziato. Completa i moduli, supera i quiz e dimostra di poter accedere alla fase finale.</p>
            <div className="mt-6"><CosmicProgressBar value={progress} label="Progresso totale" /></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <StatusBadge status={status} />
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-metal">{completed}/10 moduli completati</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-metal">Quiz finale: {candidate.finalExam?.bestScore ?? 0}/30</span>
            </div>
            <div className="mt-8"><OrbitalButton href="/academy">Continua il percorso</OrbitalButton></div>
          </GlassCard>
          <GlassCard>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Prossima orbita</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">{nextModuleId ? modules[nextModuleId - 1].title : "Fase finale"}</h2>
            <p className="mt-4 leading-7 text-metal">{nextModuleId ? "Completa lezioni, esercizio e quiz per sbloccare lo step successivo." : "Hai completato i moduli. Procedi con quiz finale, tesina ed esame live."}</p>
          </GlassCard>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          <Metric icon={<BookOpen />} label="Moduli" value={`${completed}/10`} />
          <Metric icon={<Trophy />} label="Quiz moduli" value={modules.reduce((total, module) => total + (candidate.moduleProgress[module.id]?.bestQuizScore ?? 0), 0) + "/100"} />
          <Metric icon={<FileText />} label="Tesina" value={candidate.thesis?.status ?? "Non caricata"} />
          <Metric icon={<Video />} label="Esame live" value={candidate.adminEvaluation?.liveScore !== undefined ? candidate.adminEvaluation.liveScore + "/30" : "Da sostenere"} />
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <GlassCard><h3 className="font-display text-xl font-semibold">Regola AI</h3><p className="mt-3 text-sm leading-6 text-metal">Puoi usare strumenti AI per studiare e organizzare idee, ma ogni consegna deve essere personale, originale e difendibile.</p></GlassCard>
          <GlassCard><h3 className="font-display text-xl font-semibold">Candidature Estate 2026</h3><p className="mt-3 text-sm leading-6 text-metal">La finestra selettiva valuta disciplina, progressi, tesina e prova live davanti al fondatore.</p></GlassCard>
          <GlassCard><h3 className="font-display text-xl font-semibold">Punteggi quiz moduli</h3><div className="mt-3 grid grid-cols-5 gap-2 text-xs text-metal">{modules.map((module) => <Link key={module.id} href={"/academy/moduli/" + module.id} className="rounded border border-white/10 p-2 text-center hover:border-gold/50">M{module.id}<br />{candidate.moduleProgress[module.id]?.bestQuizScore ?? 0}/10</Link>)}</div></GlassCard>
        </div>
        {candidate.adminEvaluation?.thesisScore !== undefined && candidate.adminEvaluation?.liveScore !== undefined ? <div className="mt-6"><FinalScorePanel candidate={candidate} /></div> : null}
      </section>
    </PageShell>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <GlassCard><div className="text-gold">{icon}</div><p className="mt-3 text-sm text-metal">{label}</p><p className="mt-1 font-display text-2xl font-semibold">{value}</p></GlassCard>;
}
