import { modules } from "@/data/modules";
import { createInitialProgress } from "@/lib/progress";
import type { Candidate } from "@/types";

export function createSeedCandidate(): Candidate {
  const progress = createInitialProgress();
  modules.forEach((module) => {
    progress[module.id] = {
      completedLessons: module.lessons.map((lesson) => lesson.id),
      exercise: {
        moduleId: module.id,
        answers: "Esercizio demo completato con analisi concreta e applicazione del Metodo Sirius.",
        submittedAt: new Date().toISOString()
      },
      quizAttempts: [
        {
          id: "seed-" + module.id,
          score: 8,
          total: 10,
          answers: {},
          passed: true,
          createdAt: new Date().toISOString()
        }
      ],
      bestQuizScore: 8,
      completed: true
    };
  });

  return {
    id: "seed-candidato",
    firstName: "Candidato",
    lastName: "Demo",
    email: "candidato.demo@euroacademy.it",
    passwordMock: "Password123!",
    whatsapp: "+39 333 000 0000",
    birthDate: "2000-01-01",
    currentWork: "Studio e prime esperienze commerciali",
    dream: "Diventare un professionista capace di vendere valore con metodo, disciplina e responsabilita personale.",
    expectedIncome: "Un percorso ad alto potenziale, coerente con performance e crescita personale.",
    motivation: "Voglio entrare in Euro Academy per imparare il Metodo Sirius, allenarmi su casi reali e dimostrare con fatti concreti di poter rappresentare EuroSirius.",
    commitment: 9,
    privacyAccepted: true,
    regulationAccepted: true,
    createdAt: new Date().toISOString(),
    status: "In attesa tesina",
    moduleProgress: progress,
    finalExam: {
      attempts: [
        {
          id: "seed-final",
          score: 24,
          total: 30,
          answers: {},
          passed: true,
          createdAt: new Date().toISOString(),
          timeSpentSeconds: 1140
        }
      ],
      bestScore: 24,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: 1140
    }
  };
}
