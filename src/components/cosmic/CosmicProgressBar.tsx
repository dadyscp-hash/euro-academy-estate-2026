export function CosmicProgressBar({ value, label }: { value: number; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-metal">
        <span>{label ?? "Progresso"}</span>
        <span>{safe}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gravity via-gold to-accretion shadow-orbit transition-all duration-500"
          style={{ width: safe + "%" }}
        />
      </div>
    </div>
  );
}
