import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { GlowButton } from "./GlowButton";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex items-center gap-3 text-gold/80"
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono-tight">Xiao Ma · Since 2020</span>
          <span className="h-px w-8 bg-gold/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display text-[clamp(3.5rem,10vw,7.5rem)] font-light leading-[0.95] tracking-tight text-foreground"
        >
          <span className="block">白给的</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, color-mix(in oklab, var(--gold-soft) 95%, white) 0%, var(--gold) 50%, color-mix(in oklab, var(--cyber) 70%, var(--gold)) 100%)",
            }}
          >
            艺术
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          以文字构建重生宇宙，以 AI 撕裂视觉边界。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <GlowButton href="#novels">
            进入网文宇宙
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </GlowButton>
          <GlowButton href="#gallery" variant="ghost">
            浏览视觉沙盒
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#novels"
        aria-label="向下滚动"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground/70 hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.6 }, y: { duration: 2.4, repeat: Infinity } }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
