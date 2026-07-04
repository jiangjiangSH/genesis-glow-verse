import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

type Variant = "gold" | "ghost";

interface Props extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  children: ReactNode;
}

export const GlowButton = forwardRef<HTMLAnchorElement, Props>(function GlowButton(
  { variant = "gold", children, className = "", ...rest },
  ref,
) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (variant === "ghost") {
    return (
      <a
        ref={ref}
        className={`${base} border border-white/15 bg-white/[0.02] text-foreground/90 backdrop-blur-md hover:border-cyber/60 hover:text-foreground ${className}`}
        {...rest}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <a
      ref={ref}
      className={`${base} text-primary-foreground gold-glow hover:-translate-y-0.5 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--gold) 92%, white) 0%, var(--gold) 55%, color-mix(in oklab, var(--gold) 70%, black) 100%)",
      }}
      {...rest}
    >
      {/* animated shine */}
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        aria-hidden
      >
        <span className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/30 opacity-0 blur-md transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
      </span>
      {/* outer cyber pulse on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 40px 6px color-mix(in oklab, var(--cyber) 45%, transparent)",
        }}
        aria-hidden
      />
      <span className="relative z-10 tracking-wide">{children}</span>
    </a>
  );
});
