import { GlassCard } from "@/components/cosmic/GlassCard";
import { PageShell } from "@/components/ui/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Privacy</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Informativa dati Euro Academy</h1>
          <div className="mt-8 space-y-5 leading-8 text-metal">
            <p>Euro Academy raccoglie dati necessari a candidatura, selezione e formazione: nome, cognome, email, numero WhatsApp, data di nascita, informazioni su lavoro o studi, motivazione, aspettative, progressi, punteggi, tesina e valutazioni admin.</p>
            <p>I dati vengono usati per gestire il percorso, contattare il candidato, valutare idoneita e organizzare eventuali fasi successive. Nel MVP senza backend reale i dati possono essere salvati localmente nel browser tramite IndexedDB e localStorage.</p>
            <p>Il candidato puo richiedere accesso, rettifica o cancellazione dei dati contattando EuroSirius. In una versione produttiva collegata a database reale, conservazione, sicurezza e ruoli di accesso saranno gestiti con infrastruttura backend dedicata.</p>
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
