import { modules } from "@/data/modules";
import type { Candidate, ModuleProgress } from "@/types";

export function emptyModuleProgress(): ModuleProgress {
  return {
    completedLessons: [],
    quizAttempts: [],
    bestQuizScore: 0,
    completed: false
  };
}

export function createInitialProgress(): Record<number, ModuleProgress> {
  return modules.reduce<Record<number, ModuleProgress>>((acc, module) => {
    acc[module.id] = emptyModuleProgress();
    return acc;
  }, {});
}

export function isModuleCompleted(candidate: Candidate, moduleId: number): boolean {
  const module = modules.find((item) => item.id === moduleId);
  const progress = candidate.moduleProgress[moduleId];
  if (!module || !progress) return false;
  return (
    progress.completedLessons.length >= module.lessons.length &&
    Boolean(progress.exercise) &&
    progress.bestQuizScore >= module.passScore
  );
}

export function isModuleUnlocked(candidate: Candidate, moduleId: number): boolean {
  if (moduleId === 1) return true;
  return isModuleCompleted(candidate, moduleId - 1);
}

export function recalculateModule(candidate: Candidate, moduleId: number): Candidate {
  const updated = structuredClone(candidate) as Candidate;
  const progress = updated.moduleProgress[moduleId] ?? emptyModuleProgress();
  progress.completed = isModuleCompleted({ ...updated, moduleProgress: { ...updated.moduleProgress, [moduleId]: progress } }, moduleId);
  updated.moduleProgress[moduleId] = progress;
  return updated;
}

export function calculateCompletedModules(candidate: Candidate): number {
  return modules.filter((module) => isModuleCompleted(candidate, module.id)).length;
}

export function calculateTotalProgress(candidate: Candidate): number {
  const lessonUnits = modules.reduce((total, module) => total + module.lessons.length, 0);
  const exerciseUnits = modules.length;
  const quizUnits = modules.length;
  const finalUnits = 3;
  const totalUnits = lessonUnits + exerciseUnits + quizUnits + finalUnits;

  const lessonsDone = modules.reduce((total, module) => total + (candidate.moduleProgress[module.id]?.completedLessons.length ?? 0), 0);
  const exercisesDone = modules.filter((module) => candidate.moduleProgress[module.id]?.exercise).length;
  const quizzesDone = modules.filter((module) => (candidate.moduleProgress[module.id]?.bestQuizScore ?? 0) >= module.passScore).length;
  const finalDone = (candidate.finalExam?.bestScore ? 1 : 0) + (candidate.thesis ? 1 : 0) + (candidate.adminEvaluation?.liveScore !== undefined ? 1 : 0);

  return Math.round(((lessonsDone + exercisesDone + quizzesDone + finalDone) / totalUnits) * 100);
}

export function getNextModuleId(candidate: Candidate): number | null {
  const next = modules.find((module) => !isModuleCompleted(candidate, module.id) && isModuleUnlocked(candidate, module.id));
  return next?.id ?? null;
}

export function hasCompletedAllModules(candidate: Candidate): boolean {
  return calculateCompletedModules(candidate) === modules.length;
}
