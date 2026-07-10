import { motion } from "framer-motion";
import { Github, ArrowUp, QrCode } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { contact } from "@/data/site";
import { useContactDialog } from "./ContactDialogContext";

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.5 7.6a6.5 6.5 0 0 1-4.2-1.5v8.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.1a2.9 2.9 0 1 0 2 2.7V2h3a3.6 3.6 0 0 0 3.6 3.6c.2 0 .4 0 .6-.1v2.1Z" />
    </svg>
  );
}

function RedbookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13Zm4.2 5.3v4.9h1.4v-2.1h.8l1.2 2.1h1.6l-1.4-2.3c.6-.2 1-.7 1-1.4 0-.9-.7-1.5-1.9-1.5H8.2Zm1.4 1.1h.9c.4 0 .7.2.7.6 0 .3-.3.6-.7.6h-.9v-1.2Zm4.3-1.1v4.9h3.6v-1.1H15.3v-.9h2v-1.1h-2v-.8h2.2v-1H13.9Z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  douyin: TiktokIcon,
  xiaohongshu: RedbookIcon,
  github: Github,
};

export function ContactSection() {
  const { open: openContact } = useContactDialog();
  return (
    <section id="contact" className="relative w-full px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Contact · 共创" title="连接与共创" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-16 overflow-hidden rounded-3xl border border-white/8 bg-card/40 p-10 backdrop-blur-xl sm:p-14"
        >
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-60"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--gold) 22%, transparent), transparent 40%, color-mix(in oklab, var(--cyber) 18%, transparent))",
              maskImage:
                "linear-gradient(black, black) content-box, linear-gradient(black, black)",
              WebkitMask:
                "linear-gradient(black,black) content-box, linear-gradient(black,black)",
              WebkitMaskComposite: "xor",
              padding: 1,
            }}
          />
          <div className="relative flex flex-col items-center gap-8 text-center">
            <span className="font-mono-tight text-gold">Brand · IP · Adaptation</span>
            <p className="max-w-xl font-display text-2xl leading-relaxed text-foreground sm:text-3xl">
              商业合作与版权对接
              <span className="mx-2 text-gold">·</span>
              请联系
              <span
                className="ml-3 bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--gold-soft), var(--gold), var(--cyber))",
                }}
              >
                {contact.name}
              </span>
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              网文改编 / 视频代言 / AI 视觉委托 / 品牌联名，欢迎在以下平台私信。
            </p>

            <button
              type="button"
              onClick={openContact}
              className="group inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-6 py-3 text-sm text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              <QrCode className="h-4 w-4" />
              联系 {contact.name} · 微信二维码
            </button>

            <div className="mt-2 flex items-center gap-4">
              {contact.socials.map((s) => {
                const Icon = socialIconMap[s.key] ?? Github;
                return (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-cyber/60 hover:text-cyber"
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 30px color-mix(in oklab, var(--cyber) 40%, transparent)",
                    }}
                  />
                  <Icon className="relative h-5 w-5" />
                </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} 白给的艺术 · {contact.name} · All rights reserved.</span>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            回到顶部
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-gold group-hover:text-gold">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
