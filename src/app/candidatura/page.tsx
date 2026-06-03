"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { registerCandidate } from "@/lib/auth";
import { applicationSchema } from "@/lib/validation";
import type { ApplicationFormValues } from "@/types";

export default function ApplicationPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { commitment: 8, privacyAccepted: false, regulationAccepted: false }
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    setError("");
    try {
      await registerCandidate(values);
      router.push("/dashboard?welcome=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossibile completare la candidatura.");
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Candidature Estate 2026</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Candidatura Euro Academy</h1>
          <p className="mt-4 max-w-3xl leading-7 text-metal">Compila con serieta. La candidatura crea anche il tuo account candidato e ti porta subito nella dashboard.</p>
        </div>
        <GlassCard>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            {error ? <p className="flex gap-2 rounded-md border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100"><AlertCircle size={18} /> {error}</p> : null}
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nome" error={errors.firstName?.message}><input {...register("firstName")} className="input" /></Field>
              <Field label="Cognome" error={errors.lastName?.message}><input {...register("lastName")} className="input" /></Field>
              <Field label="Email" error={errors.email?.message}><input type="email" {...register("email")} className="input" /></Field>
              <Field label="Numero WhatsApp" error={errors.whatsapp?.message}><input {...register("whatsapp")} className="input" /></Field>
              <Field label="Password" error={errors.password?.message}><input type="password" {...register("password")} className="input" /></Field>
              <Field label="Conferma password" error={errors.confirmPassword?.message}><input type="password" {...register("confirmPassword")} className="input" /></Field>
              <Field label="Data di nascita" error={errors.birthDate?.message}><input type="date" {...register("birthDate")} className="input" /></Field>
              <Field label="Lavoro attuale oppure studi attuali" error={errors.currentWork?.message}><input {...register("currentWork")} className="input" /></Field>
            </div>
            <Field label="Qual e il tuo sogno?" error={errors.dream?.message}><textarea {...register("dream")} className="input min-h-28" /></Field>
            <Field label="Quale guadagno annuale netto ti aspetti dalla collaborazione con EuroSirius?" error={errors.expectedIncome?.message}><input {...register("expectedIncome")} className="input" /></Field>
            <Field label="Perche vuoi entrare in Euro Academy?" error={errors.motivation?.message}><textarea {...register("motivation")} className="input min-h-36" /></Field>
            <Field label="Quanto sei disposto a impegnarti da 1 a 10?" error={errors.commitment?.message}><input type="number" min={1} max={10} {...register("commitment", { valueAsNumber: true })} className="input" /></Field>
            <label className="flex items-start gap-3 text-sm text-metal"><input type="checkbox" {...register("privacyAccepted")} className="mt-1 accent-gold" /> Accetto la Privacy e autorizzo il trattamento dati per candidatura, selezione e formazione.</label>
            {errors.privacyAccepted?.message ? <p className="text-sm text-red-200">{errors.privacyAccepted.message}</p> : null}
            <label className="flex items-start gap-3 text-sm text-metal"><input type="checkbox" {...register("regulationAccepted")} className="mt-1 accent-gold" /> Accetto il Regolamento Academy e la regola AI.</label>
            {errors.regulationAccepted?.message ? <p className="text-sm text-red-200">{errors.regulationAccepted.message}</p> : null}
            <OrbitalButton disabled={isSubmitting}>{isSubmitting ? "Invio candidatura..." : "Invia candidatura e accedi"}</OrbitalButton>
          </form>
        </GlassCard>
      </section>
    </PageShell>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-metal">
      <span>{label}</span>
      {children}
      {error ? <span className="text-red-200">{error}</span> : null}
    </label>
  );
}
