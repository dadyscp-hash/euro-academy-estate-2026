import { calculateFinalScore, calculateCandidateStatus } from "@/lib/scoring";
import { calculateCompletedModules, calculateTotalProgress } from "@/lib/progress";
import type { Candidate } from "@/types";

function csvCell(value: unknown): string {
  const text = String(value ?? "");
  return '"' + text.replace(/"/g, '""') + '"';
}

export function candidateToCsvRow(candidate: Candidate): string[] {
  return [
    candidate.firstName,
    candidate.lastName,
    candidate.email,
    candidate.whatsapp,
    candidate.createdAt,
    calculateTotalProgress(candidate) + "%",
    calculateCompletedModules(candidate),
    candidate.finalExam?.bestScore ?? "",
    candidate.thesis?.status ?? "Non caricata",
    candidate.adminEvaluation?.thesisScore ?? "",
    candidate.adminEvaluation?.liveScore ?? "",
    calculateFinalScore(candidate),
    calculateCandidateStatus(candidate)
  ].map(String);
}

export function exportCandidatesCsv(candidates: Candidate[]): string {
  const header = [
    "nome",
    "cognome",
    "email",
    "telefono",
    "data_registrazione",
    "progresso",
    "moduli_completati",
    "quiz_finale",
    "stato_tesina",
    "voto_tesina",
    "voto_esame_live",
    "punteggio_totale",
    "esito_finale"
  ];
  return [header, ...candidates.map(candidateToCsvRow)].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function downloadCsv(fileName: string, csv: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
