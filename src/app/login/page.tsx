"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { loginCandidate } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

type LoginValues = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setError("");
    try {
      await loginCandidate(values.email, values.password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login non riuscito.");
    }
  };

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[76vh] max-w-xl items-center px-4 py-14 sm:px-6">
        <GlassCard className="w-full">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Accesso candidato</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Rientra nel corso</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
            {error ? <p className="rounded-md border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
            <label className="grid gap-2 text-sm text-metal">Email<input type="email" {...register("email")} className="input" />{errors.email?.message ? <span className="text-red-200">{errors.email.message}</span> : null}</label>
            <label className="grid gap-2 text-sm text-metal">Password<input type="password" {...register("password")} className="input" />{errors.password?.message ? <span className="text-red-200">{errors.password.message}</span> : null}</label>
            <OrbitalButton disabled={isSubmitting}>{isSubmitting ? "Accesso..." : "Accedi alla dashboard"}</OrbitalButton>
            <div className="flex flex-wrap justify-between gap-3 text-sm text-metal">
              <Link href="/recupero-password" className="hover:text-gold">Password dimenticata?</Link>
              <Link href="/candidatura" className="hover:text-gold">Non hai un account?</Link>
            </div>
          </form>
        </GlassCard>
      </section>
    </PageShell>
  );
}
