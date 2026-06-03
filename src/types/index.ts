export type CandidateStatus =
  | "In corso"
  | "In attesa tesina"
  | "In attesa esame live"
  | "Non idoneo"
  | "Da rivalutare"
  | "Idoneo base"
  | "Idoneo buono"
  | "Candidato top";

export type ThesisStatus = "Non caricata" | "Caricata" | "In valutazione" | "Valutata";

export interface User {
  id: string;
  email: string;
  passwordMock: string;
  role: "candidate" | "admin";
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  objective: string;
  content: string;
  keyConcept: string;
  mistakeToAvoid: string;
  microExercise: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
  exercise: {
    title: string;
    prompt: string;
    questions: string[];
  };
  quiz: QuizQuestion[];
  passScore: number;
}

export interface ExerciseSubmission {
  moduleId: number;
  answers: string;
  submittedAt: string;
}

export interface QuizAttempt {
  id: string;
  score: number;
  total: number;
  answers: Record<string, number>;
  passed: boolean;
  createdAt: string;
  timeSpentSeconds?: number;
}

export interface ModuleProgress {
  completedLessons: string[];
  exercise?: ExerciseSubmission;
  quizAttempts: QuizAttempt[];
  bestQuizScore: number;
  completed: boolean;
}

export interface FinalExamAttempt extends QuizAttempt {
  total: 30;
}

export interface FinalExam {
  attempts: FinalExamAttempt[];
  bestScore: number;
  completedAt?: string;
  timeSpentSeconds?: number;
}

export interface ThesisUpload {
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: ThesisStatus;
  dataUrl?: string;
}

export interface AdminEvaluation {
  thesisScore?: number;
  liveScore?: number;
  notes?: string;
  manualStatus?: CandidateStatus;
  updatedAt?: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordMock: string;
  whatsapp: string;
  birthDate: string;
  currentWork: string;
  dream: string;
  expectedIncome: string;
  motivation: string;
  commitment: number;
  privacyAccepted: boolean;
  regulationAccepted: boolean;
  createdAt: string;
  status: CandidateStatus;
  moduleProgress: Record<number, ModuleProgress>;
  finalExam?: FinalExam;
  thesis?: ThesisUpload;
  adminEvaluation?: AdminEvaluation;
}

export interface Session {
  role: "candidate" | "admin";
  candidateId?: string;
  email: string;
  createdAt: string;
}

export interface ApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  whatsapp: string;
  birthDate: string;
  currentWork: string;
  dream: string;
  expectedIncome: string;
  motivation: string;
  commitment: number;
  privacyAccepted: boolean;
  regulationAccepted: boolean;
}
