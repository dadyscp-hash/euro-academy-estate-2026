import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary: "border-gold/70 bg-gold text-void shadow-orbit hover:bg-accretion",
  secondary: "border-white/15 bg-white/10 text-lunar hover:border-gold/60 hover:text-gold",
  ghost: "border-transparent bg-transparent text-metal hover:text-gold"
};

export function OrbitalButton({ href, children, variant = "primary", className = "", ...props }: Props) {
  const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold transition duration-200";
  if (href) {
    return (
      <Link className={`${base} ${styles[variant]} ${className}`} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
