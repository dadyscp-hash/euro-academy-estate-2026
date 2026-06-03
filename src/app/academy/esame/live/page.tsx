"use client";

import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { useCandidateGuard } from "@/lib/clientHooks";

export default function LiveExamPage() {
  const { candidate, loading } = useCandidateGuard();
  if (loading || !candidate) return <PageShell internal><p className="p-8 text-metal">Caricamento esame live...</p></PageShell>;
  if (!candidate.thesis) return <PageShell internal><section className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><GlassCard><h1 className="font-display text-3xl font-semibold">Esame live non disponibile</h1><p className="mt-4 text-metal">Carica la tesina finale prima di accedere a questa pagina.</p><div className="mt-6"><OrbitalButton href="/academy/esame/tesina" variant="secondary">Vai alla tesina</OrbitalButton></div></GlassCard></section></PageShell>;

  return (
    <PageShell internal>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Esame finale live davanti al fondatore</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Davanti al fondatore non dovrai recitare. Dovrai dimostrare di aver capito.</h1>
          <p className="mt-5 text-lg leading-8 text-metal">Durata prevista: 20-30 minuti. Presenterai te stesso, spiegherai la tesina, risponderai a domande e affronterai una mini simulazione commerciale. Il fondatore assegnera un voto da 0 a 30.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Struttura esame</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-metal">
                {["Presentazione personale", "Spiegazione tesina", "Domande sulla tesina", "Domande sul Metodo Sirius", "Mini roleplay commerciale"].map((item) => <li key={item}>{item}</li>)}
              </ol>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Griglia live · 30 punti</h2>
              <ul className="mt-4 space-y-2 text-metal">
                {["Presentazione personale 4", "Chiarezza spiegazione tesina 6", "Comprensione Metodo Sirius 5", "Risposte alle domande 5", "Mini roleplay commerciale 7", "Energia, serieta e potenziale 3"].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-white/10 bg-black/20 p-5">
            <h2 className="font-display text-2xl font-semibold">Domande esempio</h2>
            <ul className="mt-4 grid gap-2 text-metal md:grid-cols-2">
              {["Perche hai scelto proprio quel business?", "Qual e il problema piu grave che hai trovato?", "Quale servizio venderesti per primo?", "Se il cliente dicesse non ho budget, cosa risponderesti?", "Dove pensi che la tua analisi sia debole?", "Come hai applicato il Metodo Sirius?", "Cosa hai imparato davvero da Euro Academy?"].map((item) => <li key={item}>· {item}</li>)}
            </ul>
          </div>
          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-5">
            <h2 className="font-display text-2xl font-semibold">Scenario roleplay</h2>
            <p className="mt-3 leading-7 text-lunar">Io sono il titolare dell'attivita che hai analizzato. Non ti conosco, sono scettico e penso che il marketing sia una spesa inutile. Convincimi almeno a fare una call di approfondimento.</p>
          </div>
          <p className="mt-6 text-sm leading-6 text-metal">Regola AI: durante l'esame potrai essere chiamato a spiegare, difendere e approfondire ogni parte della tesina. Se non saprai motivare le scelte, la candidatura potra essere considerata non idonea.</p>
        </GlassCard>
      </section>
    </PageShell>
  );
}
