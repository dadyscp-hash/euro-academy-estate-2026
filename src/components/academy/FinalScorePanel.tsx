import { GlassCard } from "@/components/cosmic/GlassCard";
import { StatusBadge } from "@/components/cosmic/StatusBadge";
import { calculateCandidateStatus, calculateFinalScore, finalScoreDisclaimer } from "@/lib/scoring";
import type { Candidate } from "@/types";

export function FinalScorePanel({ candidate }: { candidate: Candidate }) {
  const score = calculateFinalScore(candidate);
  const status = calculateCandidateStatus(candidate);
  return (
    <GlassCard>
      <p className="text-sm uppercase tracking-[0.22em] text-gold">Punteggio finale</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <p className="font-display text-5xl font-bold">{score}/100</p>
        <StatusBadge status={status} />
      </div>
      <p className="mt-4 text-sm leading-6 text-metal">{finalScoreDisclaimer}</p>
    </GlassCard>
  );
}
