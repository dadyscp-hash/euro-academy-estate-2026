import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/cosmic/GlassCard";

export function AdminMetricCard({ label, value, icon: Icon }: { label: string; value: number | string; icon: LucideIcon }) {
  return (
    <GlassCard className="flex items-center gap-4">
      <div className="rounded-md border border-gold/30 bg-gold/10 p-3 text-gold">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-metal">{label}</p>
        <p className="font-display text-2xl font-semibold text-lunar">{value}</p>
      </div>
    </GlassCard>
  );
}
