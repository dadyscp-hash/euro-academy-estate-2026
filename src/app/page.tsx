import { CheckCircle2, Orbit, Sparkles, ShieldAlert } from "lucide-react";
import { BlackHoleHero } from "@/components/cosmic/BlackHoleHero";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";

const sections = [
  {
    title: "Non e un corso. E una selezione.",
    text: "Euro Academy non e un corso per curiosi. E un percorso di formazione e selezione per persone ambiziose, disciplinate e disposte a dimostrare con i fatti di poter rappresentare EuroSirius."
  },
  {
    title: "Il Metodo Sirius",
    text: "Il Metodo Sirius raccoglie anni di esperienza, conversazioni, errori, trattative e confronto con imprenditori e persone di alto livello. Non insegna frasi fatte: insegna a ragionare, capire il cliente, comunicare valore e proporre soluzioni con lucidita."
  },
  {
    title: "10 moduli. Quiz. Tesina. Esame live.",
    text: "Il percorso porta il candidato da mentalita e basi commerciali fino a casi pratici, quiz finale da 30 minuti, tesina in PDF e prova live davanti al fondatore."
  }
];

export default function HomePage() {
  return (
    <PageShell>
      <BlackHoleHero />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        {sections.map((section) => (
          <GlassCard key={section.title}>
            <Sparkles className="mb-4 text-gold" />
            <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
            <p className="mt-4 leading-7 text-metal">{section.text}</p>
          </GlassCard>
        ))}
      </section>
      <section className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <GlassCard>
            <h2 className="font-display text-3xl font-semibold">Per chi e</h2>
            <ul className="mt-6 space-y-3 text-metal">
              {["Persone disciplinate che vogliono imparare a vendere valore.", "Candidati disposti a studiare, consegnare esercizi e ricevere feedback.", "Profili che vogliono rappresentare EuroSirius con serieta e lucidita."].map((item) => (
                <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-gold" size={18} /> {item}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <h2 className="font-display text-3xl font-semibold">Per chi non e</h2>
            <ul className="mt-6 space-y-3 text-metal">
              {["Chi cerca guadagni garantiti o scorciatoie.", "Chi vuole copiare script senza capire il cliente.", "Chi non accetta valutazione, quiz, tesina ed esame live."].map((item) => (
                <li key={item} className="flex gap-3"><ShieldAlert className="mt-1 shrink-0 text-accretion" size={18} /> {item}</li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Come funziona</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Entra nell'orbita EuroSirius</h2>
            <p className="mt-5 leading-8 text-metal">Candidatura, account personale, moduli progressivi, quiz, tesina finale ed esame live. Il valore di questo percorso non e nei file che studi, ma nella persona che diventi se li applichi davvero.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Candidatura e accesso", "10 moduli progressivi", "Quiz finale da 30 minuti", "Tesina ed esame live"].map((step, index) => (
              <GlassCard key={step}>
                <Orbit className="mb-3 text-gold" />
                <p className="text-sm text-metal">Fase {index + 1}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{step}</h3>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-20 text-center sm:px-6">
        <GlassCard>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Regola AI</p>
          <p className="mt-4 text-lg leading-8 text-metal">L'utilizzo dell'Intelligenza Artificiale non e vietato. Ogni contenuto consegnato deve pero essere personale, originale e coerente con il Metodo Sirius. Durante l'esame live il candidato dovra spiegare e difendere ogni scelta.</p>
          <div className="mt-7 flex justify-center">
            <OrbitalButton href="/candidatura">Candidati ora</OrbitalButton>
          </div>
        </GlassCard>
      </section>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-metal">
        EuroSirius · Euro Academy · Candidature Estate 2026 · euroacademy.it
      </footer>
    </PageShell>
  );
}
