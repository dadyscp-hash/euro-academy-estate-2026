import { describe, expect, it, beforeEach } from "vitest";
import { finalQuiz } from "@/data/finalQuiz";
import { modules } from "@/data/modules";
import { createSeedCandidate } from "@/data/seed";
import { loginAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/auth";
import { exportCandidatesCsv } from "@/lib/csvExport";
import { calculateCompletedModules, calculateTotalProgress, isModuleUnlocked } from "@/lib/progress";
import { calculateFinalScore, calculateQuizScore, canTakeFinalQuiz, hasPassedModuleQuiz, statusFromScore } from "@/lib/scoring";
import { clearMockStorage, getCandidateById, saveCandidate } from "@/lib/storage";
import { applicationSchema, validatePassword, validatePdfUpload } from "@/lib/validation";

describe("Euro Academy core", () => {
  beforeEach(async () => {
    await clearMockStorage();
    window.localStorage.clear();
  });

  it("calcola progresso e moduli completati", () => {
    const candidate = createSeedCandidate();
    expect(calculateCompletedModules(candidate)).toBe(10);
    expect(calculateTotalProgress(candidate)).toBeGreaterThan(95);
  });

  it("sblocca il modulo successivo solo dopo completamento", () => {
    const candidate = createSeedCandidate();
    expect(isModuleUnlocked(candidate, 2)).toBe(true);
    candidate.moduleProgress[1].completed = false;
    candidate.moduleProgress[1].bestQuizScore = 0;
    expect(isModuleUnlocked(candidate, 2)).toBe(false);
  });

  it("calcola punteggio quiz modulo e soglia 7/10", () => {
    const module = modules[0];
    const answers = Object.fromEntries(module.quiz.map((question) => [question.id, question.correctIndex]));
    const score = calculateQuizScore(module.quiz, answers);
    expect(score).toBe(10);
    expect(hasPassedModuleQuiz(7)).toBe(true);
    expect(hasPassedModuleQuiz(6)).toBe(false);
  });

  it("calcola punteggio quiz finale e limita a 2 tentativi", () => {
    const answers = Object.fromEntries(finalQuiz.map((question) => [question.id, question.correctIndex]));
    expect(calculateQuizScore(finalQuiz, answers)).toBe(30);
    const candidate = createSeedCandidate();
    candidate.finalExam!.attempts.push({ ...candidate.finalExam!.attempts[0], id: "secondo" });
    expect(canTakeFinalQuiz(candidate)).toBe(false);
  });

  it("valida candidatura e password", () => {
    const result = applicationSchema.safeParse({
      firstName: "Mario",
      lastName: "Rossi",
      email: "mario@example.com",
      password: "Password123",
      confirmPassword: "Password123",
      whatsapp: "+39 333",
      birthDate: "1999-01-01",
      currentWork: "Studente",
      dream: "Costruire competenze commerciali ad alto valore.",
      expectedIncome: "Dipende da performance e disciplina",
      motivation: "Voglio imparare il Metodo Sirius e dimostrare con casi reali di poter vendere servizi marketing con serieta.",
      commitment: 9,
      privacyAccepted: true,
      regulationAccepted: true
    });
    expect(result.success).toBe(true);
    expect(validatePassword("short")).toBe(false);
  });

  it("valida upload PDF", () => {
    expect(validatePdfUpload({ name: "tesina.pdf", size: 1000 }).valid).toBe(true);
    expect(validatePdfUpload({ name: "tesina.docx", size: 1000 }).valid).toBe(false);
    expect(validatePdfUpload({ name: "tesina.pdf", size: 21 * 1024 * 1024 }).valid).toBe(false);
  });

  it("calcola punteggio finale e stato", () => {
    const candidate = createSeedCandidate();
    candidate.finalExam!.bestScore = 26;
    candidate.adminEvaluation = { thesisScore: 37, liveScore: 28 };
    expect(calculateFinalScore(candidate)).toBe(91);
    expect(statusFromScore(91)).toBe("Candidato top");
    expect(statusFromScore(65)).toBe("Da rivalutare");
  });

  it("protegge accesso admin con credenziali corrette", () => {
    expect(() => loginAdmin(ADMIN_EMAIL, ADMIN_PASSWORD)).not.toThrow();
    expect(() => loginAdmin("x@example.com", "errata")).toThrow();
  });

  it("esporta CSV candidati", () => {
    const csv = exportCandidatesCsv([createSeedCandidate()]);
    expect(csv).toContain("candidato.demo@euroacademy.it");
    expect(csv).toContain("punteggio_totale");
  });

  it("salva e recupera progressi mock", async () => {
    const candidate = createSeedCandidate();
    await saveCandidate(candidate);
    const saved = await getCandidateById(candidate.id);
    expect(saved?.moduleProgress[1].bestQuizScore).toBe(8);
  });
});
