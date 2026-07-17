import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { books } from "@/data/site";

export function NovelShowcase() {
  return (
    <section id="novels" className="relative w-full px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Fiction · 番茄小说 × 七猫小说" title="小说作品">
          两部正在连载的长篇，一部现代都市重生，一部古代乱世和亲。
        </SectionHeading>

        <div className="mt-16 flex flex-col gap-14 sm:mt-20 sm:gap-20">
          {books.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              className="grid gap-8 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-12"
            >
              <div className="mx-auto w-full max-w-[260px] md:mx-0">
                <div className="relative aspect-[2/3] overflow-hidden rounded-sm border border-white/10 bg-neutral-950 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                  <img
                    src={n.cover}
                    alt={n.coverAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono-tight text-muted-foreground">
                  <span className="text-gold/80">{n.index}</span>
                  {n.links.map((l) => (
                    <span
                      key={l.platform}
                      className="rounded-sm border border-white/15 px-2 py-0.5 text-[10px] tracking-wider text-foreground/80"
                    >
                      {l.platform}
                    </span>
                  ))}
                  <span className="text-cyber/80">{n.status}</span>
                </div>

                <h2 className="mt-4 break-words font-display text-2xl leading-snug text-foreground sm:text-3xl">
                  《{n.title}》
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{n.genre}</p>
                <p className="mt-4 text-[15px] italic leading-relaxed text-foreground/85">
                  {n.tagline}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-foreground/75">
                  {n.synopsis}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {n.links.map((l) => {
                    const label = l.platform === "番茄小说" ? "前往番茄阅读" : "前往七猫阅读";
                    if (!l.url) {
                      return (
                        <span
                          key={l.platform}
                          className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-md border border-dashed border-white/15 px-5 text-sm leading-none text-muted-foreground"
                          title="阅读链接待补充"
                        >
                          <BookOpen className="h-4 w-4" />
                          {label}
                          <span className="ml-1 text-xs text-muted-foreground/70">· 链接待补充</span>
                        </span>
                      );
                    }
                    return (
                      <a
                        key={l.platform}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-md border border-gold/50 bg-gold/10 px-5 text-sm leading-none text-gold transition-colors duration-200 hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 motion-reduce:transition-none"
                      >
                        <BookOpen className="h-4 w-4" />
                        {label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}