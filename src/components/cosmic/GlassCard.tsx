import type { HTMLAttributes } from "react";

export function GlassCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-cosmic backdrop-blur-xl " +
        className
      }
      {...props}
    />
  );
}
