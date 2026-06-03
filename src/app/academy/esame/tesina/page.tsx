"use client";

import { useState } from "react";
import { FileUp } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { StatusBadge } from "@/components/cosmic/StatusBadge";
import { PageShell } from "@/components/ui/PageShell";
import { useCandidateGuard } from "@/lib/clientHooks";
import { saveCandidate } from "@/lib/storage";
import { validatePdfUpload } from "@/lib/validation";

const aiRule = "L'utilizzo dell'Intelligenza Artificiale non e vietato. Il candidato puo utilizzare strumenti AI per studiare, organizzare le idee, migliorare la forma del testo o approfondire alcuni concetti. Tuttavia, ogni contenuto consegnato all'interno di Euro Academy deve essere personale, originale e coerente con il Metodo Sirius. Non saranno accettati elaborati generici, copiati, impersonali o costruiti interamente con risposte automatiche.";

export default function ThesisPage() {
  const { candidate, loading, setCandidate } = useCandidateGuard();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento tesina...</p></PageShell>;
  if (!candidate.finalExam?.bestScore) return <Locked text="Completa il quiz finale prima di caricare la tesina." />;

  const handleFile = async (file?: File) => {
    setError("");
    setMessage("");
    if (!file) return;
    const validation = validatePdfUpload(file);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    const updated = structuredClone(candidate);
    updated.thesis = { fileName: file.name, fileSize: file.size, uploadedAt: new Date().toISOString(), status: "Caricata", dataUrl };
    await saveCandidate(updated);
    setCandidate(updated);
    setMessage("Tesina caricata correttamente. Sara discussa nell'esame live davanti al fondatore.");
  };

  return (
    <PageShell internal>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Tesina finale</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Analisi e proposta commerciale per un potenziale cliente reale</h1>
          <p className="mt-5 text-lg leading-8 text-metal">La tesina finale non e un compito scolastico. E la prova che sai osservare un business reale, capire un problema e proporre una soluzione secondo il Metodo Sirius.</p>
          <div className="mt-6"><StatusBadge status={candidate.thesis?.status ?? "Non caricata"} /></div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Struttura obbligatoria</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-metal">
                {["Presentazione del business", "Analisi presenza online", "Almeno 5 problemi individuati", "Almeno 3 opportunita di crescita", "Servizio EuroSirius consigliato", "Primo messaggio commerciale", "Mini proposta commerciale", "Applicazione del Metodo Sirius", "Riflessione personale"].map((item) => <li key={item}>{item}</li>)}
              </ol>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Griglia valutazione · 40 punti</h2>
              <ul className="mt-4 space-y-2 text-metal">
                {["Presentazione business 4", "Analisi presenza online 6", "Problemi individuati 6", "Opportunita di crescita 5", "Servizio consigliato 5", "Primo messaggio 4", "Mini proposta 4", "Metodo Sirius 4", "Riflessione personale 2"].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-white/10 bg-black/20 p-5">
            <h2 className="font-display text-2xl font-semibold">Upload PDF</h2>
            <p className="mt-2 text-sm leading-6 text-metal">Formato PDF, massimo 20MB, consigliato: Nome_Cognome_Tesina_EuroAcademy.pdf. Requisiti: 6-15 pagine, almeno 3 screenshot, contenuto personale e originale.</p>
            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gold/40 bg-gold/10 p-8 text-center text-gold">
              <FileUp />
              <span>Seleziona PDF</span>
              <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(event) => void handleFile(event.target.files?.[0])} />
            </label>
            {candidate.thesis?.fileName ? <p className="mt-4 text-metal">File caricato: {candidate.thesis.fileName}</p> : null}
            {message ? <p className="mt-4 rounded-md border border-emerald-400/40 bg-emerald-400/10 p-3 text-emerald-100">{message}</p> : null}
            {error ? <p className="mt-4 rounded-md border border-red-400/40 bg-red-500/10 p-3 text-red-100">{error}</p> : null}
          </div>
          <p className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-4 leading-7 text-lunar">{aiRule}</p>
          {candidate.thesis ? <div className="mt-7"><OrbitalButton href="/academy/esame/live">Vai all'esame live</OrbitalButton></div> : null}
        </GlassCard>
      </section>
    </PageShell>
  );
}

function Locked({ text }: { text: string }) {
  return <PageShell internal><section className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><GlassCard><h1 className="font-display text-3xl font-semibold">Tesina non disponibile</h1><p className="mt-4 text-metal">{text}</p><div className="mt-6"><OrbitalButton href="/academy" variant="secondary">Torna all'academy</OrbitalButton></div></GlassCard></section></PageShell>;
}
