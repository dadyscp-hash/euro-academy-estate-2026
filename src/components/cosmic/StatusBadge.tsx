import type { CandidateStatus, ThesisStatus } from "@/types";

const colorMap: Record<string, string> = {
  "In corso": "border-gravity/50 bg-gravity/15 text-lunar",
  "In attesa tesina": "border-gold/50 bg-gold/15 text-gold",
  "In attesa esame live": "border-accretion/50 bg-accretion/15 text-accretion",
  "Non idoneo": "border-red-500/50 bg-red-500/10 text-red-200",
  "Da rivalutare": "border-yellow-400/50 bg-yellow-400/10 text-yellow-100",
  "Idoneo base": "border-cyan-400/50 bg-cyan-400/10 text-cyan-100",
  "Idoneo buono": "border-emerald-400/50 bg-emerald-400/10 text-emerald-100",
  "Candidato top": "border-gold/70 bg-gold/20 text-gold",
  "Non caricata": "border-white/15 bg-white/5 text-metal",
  "Caricata": "border-gold/50 bg-gold/15 text-gold",
  "In valutazione": "border-accretion/50 bg-accretion/15 text-accretion",
  "Valutata": "border-emerald-400/50 bg-emerald-400/10 text-emerald-100"
};

export function StatusBadge({ status }: { status: CandidateStatus | ThesisStatus | string }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${colorMap[status] ?? colorMap["In corso"]}`}>
      {status}
    </span>
  );
}
