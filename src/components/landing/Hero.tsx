import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Camera } from "lucide-react";
import heroPhoto from "@/assets/photo-4.jpg";
import { GlowButton } from "./GlowButton";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[78svh] w-full items-end overflow-hidden pt-24 sm:min-h-[82svh] sm:items-center"
    >
      {/* Real photograph as full-bleed hero */}
      <img
        src={heroPhoto}
        alt="Jiang 拍摄的江南水乡与远山天际线"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Legibility overlays — keep photo detail visible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-background/25"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-mono-tight text-gold/90">Jiang · Personal Portfolio</p>

          <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            Jiang 的
            <span className="block">创作世界</span>
          </h1>

          <p className="mt-6 text-lg text-foreground/85 sm:text-xl">
            小说创作与风景摄影。
          </p>
          <p className="mt-2 max-w-lg text-base leading-relaxed text-foreground/70">
            在文字中构建世界，在光影里记录远方。目前有两部小说分别在番茄小说与七猫小说连载。
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <GlowButton href="#novels" aria-label="阅读 Jiang 的小说">
              <BookOpen className="h-4 w-4" />
              <span>阅读小说</span>
              <ArrowRight className="h-4 w-4" />
            </GlowButton>
            <GlowButton href="#gallery" variant="ghost" aria-label="浏览 Jiang 的摄影作品">
              <Camera className="h-4 w-4" />
              <span>浏览摄影</span>
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
