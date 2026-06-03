"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Download, Search, Star, Users, Clock, Trophy } from "lucide-react";
import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { StatusBadge } from "@/components/cosmic/StatusBadge";
import { PageShell } from "@/components/ui/PageShell";
import { createSeedCandidate } from "@/data/seed";
import { useAdminGuard } from "@/lib/clientHooks";
import { downloadCsv, exportCandidatesCsv } from "@/lib/csvExport";
import { calculateCompletedModules, calculateTotalProgress } from "@/lib/progress";
import { calculateCandidateStatus, calculateFinalScore } from "@/lib/scoring";
import { getCandidates, saveCandidate } from "@/lib/storage";
import type { Candidate, CandidateStatus } from "@/types";

const statuses: Array<CandidateStatus | "Tutti"> = ["Tutti", "In corso", "In attesa tesina", "In attesa esame live", "Non idoneo", "Da rivalutare", "Idoneo base", "Idoneo buono", "Candidato top"];

export default function AdminPage() {
  const { allowed, loading } = useAdminGuard();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CandidateStatus | "Tutti">("Tutti");

  const load = async () => setCandidates(await getCandidates());
  useEffect(() => { if (allowed) void load(); }, [allowed]);

  const filtered = useMemo(() => candidates.filter((candidate) => {
    const text = (candidate.firstName + " " + candidate.lastName + " " + candidate.email).toLowerCase();
    const statusOk = status === "Tutti" || calculateCandidateStatus(candidate) === status;
    return text.includes(query.toLowerCase()) && statusOk;
  }), [candidates, query, status]);

  const addSeed = async () => {
    await saveCandidate(createSeedCandidate());
    await load();
  };

  if (loading || !allowed) return <PageShell internal><p className="p-8 text-metal">Verifica accesso admin...</p></PageShell>;

  const top = candidates.filter((candidate) => calculateCandidateStatus(candidate) === "Candidato top").length;
  const waitingThesis = candidates.filter((candidate) => calculateCandidateStatus(candidate) === "In attesa tesina").length;
  const waitingLive = candidates.filter((candidate) => calculateCandidateStatus(candidate) === "In attesa esame live").length;
  const eligible = candidates.filter((candidate) => ["Idoneo base", "Idoneo buono", "Candidato top"].includes(calculateCandidateStatus(candidate))).length;

  return (
    <PageShell internal>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Dashboard admin</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">Candidati Euro Academy</h1>
            <p className="mt-4 max-w-3xl leading-7 text-metal">Valuta progressi, tesina, esame live e stato finale dei candidati.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <OrbitalButton onClick={() => downloadCsv("candidati-euro-academy.csv", exportCandidatesCsv(candidates))}><Download size={18} /> Esporta CSV</OrbitalButton>
            {candidates.length === 0 ? <OrbitalButton onClick={addSeed} variant="secondary">Carica candidato demo</OrbitalButton> : null}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <AdminMetricCard label="Totali" value={candidates.length} icon={Users} />
          <AdminMetricCard label="In corso" value={candidates.filter((candidate) => calculateCandidateStatus(candidate) === "In corso").length} icon={Clock} />
          <AdminMetricCard label="Attesa tesina" value={waitingThesis} icon={Clock} />
          <AdminMetricCard label="Attesa live" value={waitingLive} icon={Clock} />
          <AdminMetricCard label="Idonei" value={eligible} icon={Trophy} />
          <AdminMetricCard label="Top" value={top} icon={Star} />
        </div>
        <GlassCard className="mt-6">
          <div className="mb-5 grid gap-4 md:grid-cols-[1fr_260px]">
            <label className="relative">
              <Search className="absolute left-3 top-3 text-metal" size={18} />
              <input className="input pl-10" placeholder="Cerca candidato..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <select className="input" value={status} onChange={(event) => setStatus(event.target.value as CandidateStatus | "Tutti")}>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="text-metal">
                <tr className="border-b border-white/10">
                  {["Nome", "Email", "Telefono", "Registrazione", "Progresso", "Moduli", "Quiz finale", "Tesina", "Totale", "Esito", "Azione"].map((head) => <th key={head} className="py-3 pr-4 font-medium">{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((candidate) => (
                  <tr key={candidate.id} className="border-b border-white/10 text-metal">
                    <td className="py-3 pr-4 text-lunar">{candidate.firstName} {candidate.lastName}</td>
                    <td className="py-3 pr-4">{candidate.email}</td>
                    <td className="py-3 pr-4">{candidate.whatsapp}</td>
                    <td className="py-3 pr-4">{new Date(candidate.createdAt).toLocaleDateString("it-IT")}</td>
                    <td className="py-3 pr-4">{calculateTotalProgress(candidate)}%</td>
                    <td className="py-3 pr-4">{calculateCompletedModules(candidate)}/10</td>
                    <td className="py-3 pr-4">{candidate.finalExam?.bestScore ?? 0}/30</td>
                    <td className="py-3 pr-4">{candidate.thesis?.status ?? "Non caricata"}</td>
                    <td className="py-3 pr-4">{calculateFinalScore(candidate)}/100</td>
                    <td className="py-3 pr-4"><StatusBadge status={calculateCandidateStatus(candidate)} /></td>
                    <td className="py-3 pr-4"><Link className="text-gold hover:underline" href={"/admin/candidati/" + candidate.id}>Apri scheda</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 ? <p className="py-8 text-center text-metal">Nessun candidato trovato.</p> : null}
        </GlassCard>
        {candidates.length ? (
          <GlassCard className="mt-6">
            <h2 className="font-display text-2xl font-semibold">Classifica migliori candidati</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[...candidates].sort((a, b) => calculateFinalScore(b) - calculateFinalScore(a)).slice(0, 3).map((candidate) => (
                <div key={candidate.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <p className="font-semibold">{candidate.firstName} {candidate.lastName}</p>
                  <p className="text-sm text-metal">{calculateFinalScore(candidate)}/100 · {calculateCandidateStatus(candidate)}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}
      </section>
    </PageShell>
  );
}
