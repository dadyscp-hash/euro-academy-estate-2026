import { GlassCard } from "@/components/cosmic/GlassCard";
import { PageShell } from "@/components/ui/PageShell";

export default function TermsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Termini</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Condizioni di utilizzo</h1>
          <div className="mt-8 space-y-5 leading-8 text-metal">
            <p>Euro Academy e un percorso di formazione e selezione. Non costituisce promessa di assunzione, collaborazione, stipendio o guadagno garantito. I risultati dipendono da disciplina, capacita, costanza e performance personale.</p>
            <p>Il candidato si impegna a consegnare contenuti personali e originali. L'AI puo essere usata come supporto, ma non puo sostituire ragionamento, analisi e capacita di difendere la tesina davanti al fondatore.</p>
            <p>EuroSirius puo escludere candidati non idonei, inattivi, scorretti o non coerenti con il Metodo Sirius. L'uso della piattaforma implica accettazione di queste condizioni e del regolamento Academy.</p>
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
