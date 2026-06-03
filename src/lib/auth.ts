import { createInitialProgress } from "@/lib/progress";
import { getCandidateByEmail, getCandidateById, saveCandidate } from "@/lib/storage";
import type { ApplicationFormValues, Candidate, Session } from "@/types";

const SESSION_KEY = "euro-academy-session";
export const ADMIN_EMAIL = "dadyscp@gmail.com";
export const ADMIN_PASSWORD = "Fortnitegg16!";

function makeId(): string {
  return "ea-" + Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
}

function getLocalStorage(): Storage | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage;
}

export function setSession(session: Session): void {
  getLocalStorage()?.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  const raw = getLocalStorage()?.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function logout(): void {
  getLocalStorage()?.removeItem(SESSION_KEY);
}

export async function registerCandidate(values: ApplicationFormValues): Promise<Candidate> {
  const existing = await getCandidateByEmail(values.email);
  if (existing) throw new Error("Esiste gia una candidatura con questa email.");
  const now = new Date().toISOString();
  const candidate: Candidate = {
    id: makeId(),
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    passwordMock: values.password,
    whatsapp: values.whatsapp.trim(),
    birthDate: values.birthDate,
    currentWork: values.currentWork.trim(),
    dream: values.dream.trim(),
    expectedIncome: values.expectedIncome.trim(),
    motivation: values.motivation.trim(),
    commitment: values.commitment,
    privacyAccepted: values.privacyAccepted,
    regulationAccepted: values.regulationAccepted,
    createdAt: now,
    status: "In corso",
    moduleProgress: createInitialProgress()
  };
  await saveCandidate(candidate);
  setSession({ role: "candidate", candidateId: candidate.id, email: candidate.email, createdAt: now });
  return candidate;
}

export async function loginCandidate(email: string, password: string): Promise<Candidate> {
  const candidate = await getCandidateByEmail(email);
  if (!candidate || candidate.passwordMock !== password) throw new Error("Email o password non corretti.");
  setSession({ role: "candidate", candidateId: candidate.id, email: candidate.email, createdAt: new Date().toISOString() });
  return candidate;
}

export function loginAdmin(email: string, password: string): void {
  if (email.toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    throw new Error("Credenziali admin non corrette.");
  }
  setSession({ role: "admin", email: ADMIN_EMAIL, createdAt: new Date().toISOString() });
}

export async function getCurrentCandidate(): Promise<Candidate | null> {
  const session = getSession();
  if (!session || session.role !== "candidate" || !session.candidateId) return null;
  return (await getCandidateById(session.candidateId)) ?? null;
}

export function isAdminSession(): boolean {
  return getSession()?.role === "admin";
}
