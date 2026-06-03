# Euro Academy Estate 2026

Euro Academy e il primo percorso ufficiale creato per formare e selezionare candidati capaci di rappresentare EuroSirius nella vendita di servizi marketing. Non e una landing statica: e un MVP navigabile con candidatura, account candidato, dashboard, 10 moduli, quiz, tesina, esame live, area admin, valutazioni e CSV.

## Stack usato

- Next.js App Router, TypeScript, React
- Tailwind CSS, Framer Motion, Lucide React
- Zod e React Hook Form
- IndexedDB per persistenza mock e localStorage per sessione attiva
- Vitest per test unitari
- Playwright per test end-to-end
- Configurazione Netlify con `@netlify/plugin-nextjs`

## Requisiti

- Node.js 20 o superiore
- npm

## Installazione

```bash
npm install
```

## Avvio locale

```bash
npm run dev
```

Apri `http://localhost:3000`.

## Build

```bash
npm run build
```

## Test unitari

```bash
npm run test
```

I test coprono progressi, sblocco moduli, punteggi quiz, limite quiz finale, validazioni, PDF, punteggio finale, accesso admin, CSV e persistenza mock.

## Test E2E

```bash
npm run test:e2e
```

Playwright avvia il server locale, registra un candidato, verifica login/logout, dashboard, lezione, admin e valutazione demo.

## Credenziali admin

Email: `dadyscp@gmail.com`

Password: `Fortnitegg16!`

Queste credenziali sono intenzionalmente visibili per il solo MVP frontend. In produzione vanno sostituite con autenticazione backend reale.

## Flusso candidato

1. Vai su `/candidatura`.
2. Compila tutti i campi e accetta Privacy e Regolamento.
3. Dopo l'invio vieni portato a `/dashboard`.
4. Apri `/academy`, completa lezioni, esercizi e quiz dei moduli.
5. Dopo 10 moduli accedi a `/academy/esame/quiz-finale`.
6. Dopo il quiz finale carica la tesina PDF in `/academy/esame/tesina`.
7. Dopo upload vedi la preparazione all'esame live in `/academy/esame/live`.

## Flusso admin

1. Vai su `/admin/login`.
2. Accedi con le credenziali admin.
3. In `/admin` vedi candidati, metriche, ricerca, filtri e classifica.
4. Apri una scheda candidato.
5. Inserisci voto tesina da 0 a 40, voto esame live da 0 a 30 e note private.
6. Salva valutazione: punteggio totale ed esito vengono calcolati automaticamente.
7. Usa `Esporta CSV` per esportare tutti i candidati o il singolo candidato.

## Deploy su Netlify

1. Carica il repository su GitHub o importa il progetto ZIP in un repository.
2. Crea un nuovo sito Netlify dal repository.
3. Usa questi valori:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Netlify usera `@netlify/plugin-nextjs` definito in `netlify.toml`.
5. Imposta eventuali variabili da `.env.example`, se vuoi personalizzare nome, edizione o dominio futuro.
6. Deploy iniziale consigliato su sottodominio temporaneo Netlify.

## Struttura dati

La persistenza MVP usa IndexedDB con database `euro-academy:v1`.

Persistono:

- utenti candidati e dati candidatura
- sessione attiva tramite localStorage
- progressi lezioni
- esercizi
- quiz modulo e tentativi
- quiz finale e limite tentativi
- upload PDF mock
- voti admin, note private, stato finale

Tipi e logiche principali sono in:

- `src/types/index.ts`
- `src/lib/auth.ts`
- `src/lib/storage.ts`
- `src/lib/progress.ts`
- `src/lib/scoring.ts`
- `src/lib/validation.ts`
- `src/lib/csvExport.ts`

## Personalizzazione moduli

I 10 moduli sono definiti in `src/data/modules.ts`. Ogni modulo contiene titolo, descrizione, obiettivi, 8 lezioni, esercizio e quiz da 10 domande. Il quiz finale da 30 domande e in `src/data/finalQuiz.ts`.

## Migrazione futura a Supabase, Firebase o PostgreSQL

Per passare da mock locale a backend reale:

1. Mantieni i tipi TypeScript in `src/types/index.ts`.
2. Sostituisci `src/lib/storage.ts` con repository asincroni verso database reale.
3. Sostituisci `passwordMock` con hash server-side e sessioni sicure.
4. Sposta upload PDF su storage dedicato, per esempio Supabase Storage, Firebase Storage, S3 o R2.
5. Proteggi route admin lato server e registra audit log sulle valutazioni.
6. Mantieni `scoring.ts`, `progress.ts` e `csvExport.ts` come logiche pure riutilizzabili.

## Note MVP

- I dati sono salvati nel browser: cambiare dispositivo o cancellare dati sito elimina lo stato.
- L'upload PDF salva metadati e data URL in IndexedDB, sufficiente per demo e test locali.
- Nessuna promessa di guadagno o collaborazione automatica e presente nel prodotto.

## Troubleshooting

- Se `npm install` fallisce, verifica Node.js 20+.
- Se Playwright non trova i browser, esegui `npx playwright install`.
- Se non vedi candidati in admin, registra un candidato oppure usa il pulsante `Carica candidato demo`.
- Se vuoi azzerare il browser, cancella dati sito per `localhost:3000`.
