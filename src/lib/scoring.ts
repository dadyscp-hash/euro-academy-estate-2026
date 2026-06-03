import type { Candidate, CandidateStatus, QuizQuestion } from "@/types";

export function calculateQuizScore(questions: QuizQuestion[], answers: Record<string, number>): number {
  return questions.reduce((score, question) => score + (answers[question.id] === question.correctIndex ? 1 : 0), 0);
}

export function hasPassedModuleQuiz(score: number, threshold = 7): boolean {
  return score >= threshold;
}

export function getBestModuleQuizScore(candidate: Candidate, moduleId: number): number {
  return candidate.moduleProgress[moduleId]?.bestQuizScore ?? 0;
}

export function getBestFinalQuizScore(candidate: Candidate): number {
  return candidate.finalExam?.bestScore ?? 0;
}

export function canTakeFinalQuiz(candidate: Candidate): boolean {
  return (candidate.finalExam?.attempts.length ?? 0) < 2;
}

export function calculateFinalScore(candidate: Candidate): number {
  const quiz = getBestFinalQuizScore(candidate);
  const thesis = candidate.adminEvaluation?.thesisScore ?? 0;
  const live = candidate.adminEvaluation?.liveScore ?? 0;
  return Math.min(100, quiz + thesis + live);
}

export function statusFromScore(score: number): CandidateStatus {
  if (score >= 90) return "Candidato top";
  if (score >= 80) return "Idoneo buono";
  if (score >= 70) return "Idoneo base";
  if (score >= 60) return "Da rivalutare";
  return "Non idoneo";
}

export function calculateCandidateStatus(candidate: Candidate): CandidateStatus {
  if (candidate.adminEvaluation?.manualStatus) return candidate.adminEvaluation.manualStatus;
  const thesisScore = candidate.adminEvaluation?.thesisScore;
  const liveScore = candidate.adminEvaluation?.liveScore;
  if (typeof thesisScore === "number" && typeof liveScore === "number") {
    return statusFromScore(calculateFinalScore(candidate));
  }
  if (candidate.thesis?.status === "Caricata" || candidate.thesis?.status === "In valutazione") return "In attesa esame live";
  const completedModules = Object.values(candidate.moduleProgress).filter((progress) => progress.completed).length;
  if (completedModules === 10 && candidate.finalExam?.bestScore) return "In attesa tesina";
  return "In corso";
}

export const finalScoreDisclaimer =
  "Il punteggio finale non garantisce automaticamente una collaborazione, ma determina l'accesso alla fase successiva di selezione e puo influenzare le condizioni iniziali proposte.";
