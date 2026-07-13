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
    "group relative inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-sm font-medium leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

  if (variant === "ghost") {
    return (
      <a
        ref={ref}
        className={`${base} border border-white/20 bg-white/[0.03] text-foreground hover:border-white/40 hover:bg-white/[0.06] ${className}`}
        {...rest}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <a
      ref={ref}
      className={`${base} bg-gold text-primary-foreground hover:brightness-110 ${className}`}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
});
