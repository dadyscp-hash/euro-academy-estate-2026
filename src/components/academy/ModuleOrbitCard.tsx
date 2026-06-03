import { Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicProgressBar } from "@/components/cosmic/CosmicProgressBar";
import { OrbitalButton } from "@/components/cosmic/OrbitalButton";
import type { Module } from "@/types";

export function ModuleOrbitCard({ module, progress, unlocked }: { module: Module; progress: number; unlocked: boolean }) {
  const completed = progress === 100;
  return (
    <GlassCard className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gold">Modulo {module.id}</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-lunar">{module.title}</h3>
        </div>
        {completed ? <CheckCircle2 className="text-emerald-300" /> : unlocked ? <ArrowRight className="text-gold" /> : <Lock className="text-metal" />}
      </div>
      <p className="text-sm leading-6 text-metal">{module.description}</p>
      <CosmicProgressBar value={progress} />
      <div className="mt-auto">
        <OrbitalButton href={unlocked ? "/academy/moduli/" + module.id : "#"} variant={unlocked ? "primary" : "secondary"} className={!unlocked ? "pointer-events-none opacity-60" : ""}>
          {unlocked ? "Apri modulo" : "Bloccato"}
        </OrbitalButton>
      </div>
    </GlassCard>
  );
}
