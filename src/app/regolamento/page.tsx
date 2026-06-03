import { GlassCard } from "@/components/cosmic/GlassCard";
import { PageShell } from "@/components/ui/PageShell";

const aiRule = "L'utilizzo dell'Intelligenza Artificiale non e vietato. Il candidato puo utilizzare strumenti AI per studiare, organizzare le idee, migliorare la forma del testo o approfondire alcuni concetti. Tuttavia, ogni contenuto consegnato all'interno di Euro Academy deve essere personale, originale e coerente con il Metodo Sirius. Non saranno accettati elaborati generici, copiati, impersonali o costruiti interamente con risposte automatiche. La tesina finale dovra dimostrare ragionamento reale, analisi concreta, spirito critico e capacita di applicare il Metodo Sirius a un caso pratico. Durante l'esame finale live, il candidato potra essere chiamato a spiegare, difendere e approfondire ogni parte della tesina consegnata. Se non sara in grado di motivare le proprie scelte o dimostrare reale comprensione del lavoro svolto, la candidatura potra essere considerata non idonea.";

export default function RegulationPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Regolamento Academy</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Percorso selettivo Euro Academy</h1>
          <div className="mt-8 space-y-6 leading-8 text-metal">
            <p>Euro Academy e un percorso di formazione e selezione. L'accesso ai moduli non garantisce automaticamente una collaborazione con EuroSirius. Ogni candidato deve completare lezioni, esercizi, quiz, quiz finale, tesina e prova live.</p>
            <p>Il candidato deve mantenere comportamento professionale, consegnare contenuti personali, rispettare scadenze operative e non utilizzare promesse di guadagno garantito nelle simulazioni commerciali.</p>
            <p>La valutazione finale considera quiz finale, tesina ed esame live. EuroSirius puo considerare non idoneo un candidato anche in presenza di punteggi parziali positivi se emergono mancanza di serieta, contenuti copiati o incapacita di difendere il lavoro svolto.</p>
            <p className="rounded-lg border border-gold/30 bg-gold/10 p-4 text-lunar">{aiRule}</p>
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
