import type { Candidate } from "@/types";

const DB_NAME = "euro-academy:v1";
const STORE = "kv";
const CANDIDATES_KEY = "candidates";

const memoryStore = new Map<string, unknown>();

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

export async function getCandidates(): Promise<Candidate[]> {
  return getValue<Candidate[]>(CANDIDATES_KEY, []);
}

export async function saveCandidates(candidates: Candidate[]): Promise<void> {
  await setValue(CANDIDATES_KEY, candidates);
}

export async function getCandidateById(id: string): Promise<Candidate | undefined> {
  const candidates = await getCandidates();
  return candidates.find((candidate) => candidate.id === id);
}

export async function getCandidateByEmail(email: string): Promise<Candidate | undefined> {
  const candidates = await getCandidates();
  return candidates.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
}

export async function saveCandidate(candidate: Candidate): Promise<void> {
  const candidates = await getCandidates();
  const index = candidates.findIndex((item) => item.id === candidate.id);
  if (index >= 0) candidates[index] = candidate;
  else candidates.push(candidate);
  await saveCandidates(candidates);
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
