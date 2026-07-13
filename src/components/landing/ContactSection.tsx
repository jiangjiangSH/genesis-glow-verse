import { motion } from "framer-motion";
import { ArrowUp, QrCode } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { contact } from "@/data/site";
import { useContactDialog } from "./ContactDialogContext";

export function ContactSection() {
  const { open: openContact } = useContactDialog();
  const hasSocials = contact.socials.length > 0;

  return (
    <section id="contact" className="relative w-full px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Contact · 联系" title="联系" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-6 text-center"
        >
          <p className="max-w-lg text-[15px] leading-relaxed text-foreground/80">
            如果你对小说改编、摄影使用或单纯想聊聊，欢迎通过下面的方式找到我。
          </p>

          <button
            type="button"
            onClick={openContact}
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-md border border-gold/50 bg-gold/10 px-6 text-sm leading-none text-gold transition-colors duration-200 hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 motion-reduce:transition-none"
          >
            <QrCode className="h-4 w-4" />
            联系我 · 微信二维码
          </button>

          {hasSocials ? (
            <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/80">
              {contact.socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">其他社交平台联系方式待补充。</p>
          )}
        </motion.div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {contact.name} · 小说创作与风景摄影</span>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            回到顶部
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 transition-colors group-hover:border-gold group-hover:text-gold">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}