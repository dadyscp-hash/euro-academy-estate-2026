"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Shield } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import { PageShell } from "@/components/ui/PageShell";
import { ADMIN_EMAIL, ADMIN_PASSWORD, loginAdmin } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

type LoginValues = { email: string; password: string };

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD } });

  const onSubmit = (values: LoginValues) => {
    setError("");
    try {
      loginAdmin(values.email, values.password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login admin non riuscito.");
    }
  };

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[76vh] max-w-xl items-center px-4 py-14 sm:px-6">
        <GlassCard className="w-full">
          <Shield className="mb-4 text-gold" />
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Accesso admin</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Console Euro Academy</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
            {error ? <p className="rounded-md border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
            <label className="grid gap-2 text-sm text-metal">Email<input type="email" {...register("email")} className="input" />{errors.email?.message ? <span className="text-red-200">{errors.email.message}</span> : null}</label>
            <label className="grid gap-2 text-sm text-metal">Password<input type="password" {...register("password")} className="input" />{errors.password?.message ? <span className="text-red-200">{errors.password.message}</span> : null}</label>
            <OrbitalButton disabled={isSubmitting}>{isSubmitting ? "Verifica..." : "Accedi come admin"}</OrbitalButton>
          </form>
        </GlassCard>
      </section>
    </PageShell>
  );
}
