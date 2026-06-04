import type { Candidate } from "@/types";

const DB_NAME = "euro-academy:v1";
const STORE = "kv";
const CANDIDATES_KEY = "candidates";

const memoryStore = new Map<string, unknown>();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_KEY);

type CandidateRow = {
  id?: string;
  created_at?: string;
  email?: string | null;
  raw_data?: Candidate | null;
};

function hasIndexedDb(): boolean {
  return typeof indexedDB !== "undefined";
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function supabaseHeaders(prefer?: string): HeadersInit {
  const headers: HeadersInit = {
    apikey: SUPABASE_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_KEY ?? ""}`,
    "Content-Type": "application/json"
  };
  if (prefer) headers.Prefer = prefer;
  return headers;
}

async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Supabase non configurato.");
  const response = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: { ...supabaseHeaders(), ...(init?.headers ?? {}) }
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || "Errore Supabase.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function candidateToRow(candidate: Candidate) {
  return {
    full_name: `${candidate.firstName} ${candidate.lastName}`.trim(),
    email: candidate.email,
    phone: candidate.whatsapp,
    city: "",
    age: candidate.birthDate,
    experience: candidate.currentWork,
    motivation: candidate.motivation,
    status: candidate.status,
    raw_data: candidate
  };
}

function rowToCandidate(row: CandidateRow): Candidate | null {
  return row.raw_data ?? null;
}

export async function getValue<T>(key: string, fallback: T): Promise<T> {
  if (!hasIndexedDb()) return (memoryStore.get(key) as T) ?? fallback;
  const db = await openDb();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(key);
    request.onsuccess = () => resolve((request.result as T) ?? fallback);
    request.onerror = () => resolve(fallback);
  });
}

export async function setValue<T>(key: string, value: T): Promise<void> {
  if (!hasIndexedDb()) {
    memoryStore.set(key, value);
    return;
  }
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getLocalCandidates(): Promise<Candidate[]> {
  return getValue<Candidate[]>(CANDIDATES_KEY, []);
}

async function saveLocalCandidates(candidates: Candidate[]): Promise<void> {
  await setValue(CANDIDATES_KEY, candidates);
}

async function saveLocalCandidate(candidate: Candidate): Promise<void> {
  const candidates = await getLocalCandidates();
  const index = candidates.findIndex((item) => item.id === candidate.id);
  if (index >= 0) candidates[index] = candidate;
  else candidates.push(candidate);
  await saveLocalCandidates(candidates);
}

export async function getCandidates(): Promise<Candidate[]> {
  if (!USE_SUPABASE) return getLocalCandidates();
  try {
    const rows = await supabaseRequest<CandidateRow[]>("/candidates?select=id,created_at,email,raw_data&order=created_at.desc");
    return rows.map(rowToCandidate).filter(Boolean) as Candidate[];
  } catch (error) {
    console.error("Errore lettura candidati Supabase", error);
    return [];
  }
}

export async function saveCandidates(candidates: Candidate[]): Promise<void> {
  if (!USE_SUPABASE) {
    await saveLocalCandidates(candidates);
    return;
  }
  await Promise.all(candidates.map((candidate) => saveCandidate(candidate)));
}

export async function getCandidateById(id: string): Promise<Candidate | undefined> {
  const candidates = await getCandidates();
  return candidates.find((candidate) => candidate.id === id);
}

export async function getCandidateByEmail(email: string): Promise<Candidate | undefined> {
  if (!USE_SUPABASE) {
    const candidates = await getLocalCandidates();
    return candidates.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
  }
  try {
    const encodedEmail = encodeURIComponent(email.trim().toLowerCase());
    const rows = await supabaseRequest<CandidateRow[]>(`/candidates?select=id,email,raw_data&email=eq.${encodedEmail}&limit=1`);
    return rows[0]?.raw_data ?? undefined;
  } catch (error) {
    console.error("Errore ricerca candidato Supabase", error);
    return undefined;
  }
}

export async function saveCandidate(candidate: Candidate): Promise<void> {
  if (!USE_SUPABASE) {
    await saveLocalCandidate(candidate);
    return;
  }

  const encodedEmail = encodeURIComponent(candidate.email.trim().toLowerCase());
  const existing = await supabaseRequest<CandidateRow[]>(`/candidates?select=id&email=eq.${encodedEmail}&limit=1`);
  const row = candidateToRow(candidate);

  if (existing[0]?.id) {
    await supabaseRequest(`/candidates?id=eq.${existing[0].id}`, {
      method: "PATCH",
      headers: supabaseHeaders("return=minimal"),
      body: JSON.stringify(row)
    });
    return;
  }

  await supabaseRequest("/candidates", {
    method: "POST",
    headers: supabaseHeaders("return=minimal"),
    body: JSON.stringify(row)
  });
}

export async function clearMockStorage(): Promise<void> {
  memoryStore.clear();
  if (hasIndexedDb()) {
    await new Promise<void>((resolve) => {
      const request = indexedDB.deleteDatabase(DB_NAME);
      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
      request.onblocked = () => resolve();
    });
  }
}
