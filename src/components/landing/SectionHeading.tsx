import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, children, align = "center" }: Props) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3 text-gold/80"
      >
        <span className="h-px w-8 bg-gold/50" />
        <span className="font-mono-tight">{eyebrow}</span>
        <span className="h-px w-8 bg-gold/50" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        className="font-display text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {children ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="max-w-xl text-base text-muted-foreground"
        >
          {children}
        </motion.p>
      ) : null}
    </div>
  );
}
