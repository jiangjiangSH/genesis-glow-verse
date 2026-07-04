import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import novel1 from "@/assets/novel-1.jpg";
import novel2 from "@/assets/novel-2.jpg";

interface Novel {
  title: string;
  tag: string;
  synopsis: string;
  cover: string;
  href: string;
  index: string;
}

const novels: Novel[] = [
  {
    index: "NO.01",
    tag: "重生 · 权谋 · 暗黑爽文",
    title: "重生后，暴君还在挨鞭",
    synopsis:
      "他曾以血洗天下，如今在鞭影里重来一世。凤袍加身之前，先让所有辜负她的人，付清利息。",
    cover: novel1,
    href: "#",
  },
  {
    index: "NO.02",
    tag: "重生 · 断亲 · 家族逆袭",
    title: "重生断亲后，假千金全家悔疯了",
    synopsis:
      "亲情是账，撕破也是账。她一步一步走出那座金笼，把假意与算计，一件件退还原主。",
    cover: novel2,
    href: "#",
  },
];

export function NovelShowcase() {
  return (
    <section id="novels" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Novel Universe · 连载" title="连载宇宙">
          在番茄阅读连载中的两个世界，欢迎入座。
        </SectionHeading>

        <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-10">
          {novels.map((n, i) => (
            <motion.a
              key={n.title}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
            >
              {/* Cover */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={n.cover}
                  alt={`《${n.title}》封面`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 100%, color-mix(in oklab, var(--gold) 25%, transparent), transparent 55%)",
                  }}
                />
                <div className="absolute left-5 top-5 font-mono-tight text-gold/80">
                  {n.index}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
                <div className="font-mono-tight text-muted-foreground">{n.tag}</div>
                <h3 className="font-display text-2xl font-normal leading-snug text-foreground sm:text-3xl">
                  《{n.title}》
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {n.synopsis}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-5">
                  <span className="font-mono-tight text-gold">前往番茄阅读</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
