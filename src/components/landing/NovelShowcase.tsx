import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { books, type Book } from "@/data/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function NovelShowcase() {
  const [openBook, setOpenBook] = useState<Book | null>(null);

  return (
    <section id="novels" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Serialized Fiction · 番茄 × 七猫"
          title="番茄与七猫"
        >
          两个正在连载的故事世界，欢迎入座。
        </SectionHeading>

        <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-10">
          {books.map((n, i) => (
            <motion.button
              key={n.title}
              type="button"
              onClick={() => setOpenBook(n)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              aria-label={`查看《${n.title}》详情`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/40 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 focus-visible:-translate-y-1 focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              {/* Cover */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={n.cover}
                  alt={n.coverAlt}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                />
                {/* base darken → deepens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                {/* vignette that intensifies on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 0 -80px 120px -20px rgba(0,0,0,0.85), inset 0 0 120px 20px rgba(0,0,0,0.55)",
                  }}
                />
                {/* soft gold rim on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 100%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 55%)",
                  }}
                />

                <div className="absolute left-5 top-5 flex items-center gap-2 font-mono-tight text-gold/80">
                  <span>{n.index}</span>
                  <span className="h-px w-6 bg-gold/40" />
                  <span className="text-foreground/70">{n.platform}</span>
                </div>

                {/* title-info floats up on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="font-mono-tight text-[10px] text-gold/70">
                    {n.status}
                  </div>
                  <div className="mt-1 font-display text-lg leading-tight text-white sm:text-xl">
                    《{n.title}》
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
                <div className="font-mono-tight text-muted-foreground">{n.genre}</div>
                <h3 className="break-words font-display text-xl font-normal leading-snug text-foreground sm:text-2xl">
                  《{n.title}》
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {n.tagline}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-5">
                  <span className="font-mono-tight text-gold">查看详情</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={openBook !== null} onOpenChange={(o) => !o && setOpenBook(null)}>
        <DialogContent className="w-[min(94vw,44rem)] gap-0 overflow-hidden border-white/10 bg-card/95 p-0 backdrop-blur-xl">
          {openBook ? (
            <div className="grid gap-0 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
              <div className="relative hidden aspect-[3/4] w-full overflow-hidden bg-black sm:block">
                <img
                  src={openBook.cover}
                  alt={openBook.coverAlt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="flex flex-col gap-5 p-7 sm:p-8">
                <DialogHeader className="gap-3 text-left sm:text-left">
                  <div className="flex flex-wrap items-center gap-2 font-mono-tight text-gold/80">
                    <span>{openBook.index}</span>
                    <span className="h-px w-4 bg-gold/40" />
                    <span className="text-foreground/70">{openBook.platform}</span>
                    <span className="h-px w-4 bg-gold/40" />
                    <span className="text-cyber/80">{openBook.status}</span>
                  </div>
                  <DialogTitle className="break-words font-display text-2xl font-normal leading-snug text-foreground sm:text-3xl">
                    《{openBook.title}》
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {openBook.genre}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-sm leading-relaxed text-foreground/85">
                  {openBook.synopsis}
                </p>

                <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-5">
                  <span className="font-mono-tight text-muted-foreground">
                    {openBook.platform} · 阅读
                  </span>
                  <a
                    href={openBook.readUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    前往阅读
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
