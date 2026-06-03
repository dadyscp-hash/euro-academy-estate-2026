"use client";

import { motion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";
import Image from "next/image";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";

export function BlackHoleHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_0.92fr] lg:pt-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="z-10 max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Candidature Estate 2026
          </div>
          <h1 className="font-display text-5xl font-bold leading-none text-lunar sm:text-6xl lg:text-7xl">
            Euro Academy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-metal sm:text-xl">
            Entra nell'orbita EuroSirius. 10 moduli, quiz, tesina finale ed esame live davanti al fondatore. Un percorso selettivo per candidati che vogliono imparare il Metodo Sirius e dimostrare di poter vendere servizi marketing con serieta, lucidita e valore.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OrbitalButton href="/candidatura">
              Candidati ora <ArrowRight size={18} />
            </OrbitalButton>
            <OrbitalButton href="/login" variant="secondary">
              Accedi al corso <LogIn size={18} />
            </OrbitalButton>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex w-full justify-center">
          <div className="founder-coin-orbit" aria-label="Moneta EuroSirius del fondatore con disco di accrescimento cosmico">
            <div className="black-hole coin-disk" aria-hidden="true" />
            <Image
              src="/images/eurosirius-founder-coin.png"
              alt="Moneta EuroSirius con il volto del fondatore"
              width={1024}
              height={1024}
              priority
              className="founder-coin"
            />
            <div className="coin-caption">
              <span>Fondatore EuroSirius</span>
              <strong>Metodo Sirius</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
