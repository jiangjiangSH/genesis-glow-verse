import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import mecha1 from "@/assets/mecha-1.jpg";
import mecha2 from "@/assets/mecha-2.jpg";
import mecha3 from "@/assets/mecha-3.jpg";

const mechas = [
  { poster: mecha1, label: "MECHA MORPH / 01", caption: "重工·苏醒" },
  { poster: mecha2, label: "MECHA MORPH / 02", caption: "核心·点亮" },
  { poster: mecha3, label: "MECHA MORPH / 03", caption: "跪拜·圣所" },
];

const photos = [
  { src: photo1, alt: "矿坑水幕巨龙", meta: "MINE · 2025", ratio: "aspect-[4/3]" },
  { src: photo2, alt: "夜色暖光小舟", meta: "JIANGNAN · 2024", ratio: "aspect-[3/4]" },
  { src: photo3, alt: "水乡雨巷红灯笼", meta: "WUZHEN · 2024", ratio: "aspect-[3/4]" },
  { src: photo4, alt: "古建屋檐与现代玻璃", meta: "SHANGHAI · 2025", ratio: "aspect-[4/3]" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative w-full px-6 py-32 sm:py-40">
      {/* faint background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, color-mix(in oklab, var(--cyber) 8%, transparent), transparent 55%), radial-gradient(ellipse at 80% 70%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Visual Sandbox · 沙盒" title="光影与人间">
          左侧是 AI 撕裂的机甲宇宙，右侧是镜头下的江南与钢铁。
        </SectionHeading>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* AI Director column */}
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="font-display text-xl text-foreground">AI 导演</h3>
              <span className="font-mono-tight text-cyber/80">Mecha · Morph</span>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-5">
              {mechas.map((m, i) => (
                <motion.figure
                  key={m.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-white/8 bg-black"
                >
                  <img
                    src={m.poster}
                    alt={m.caption}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px color-mix(in oklab, var(--cyber) 50%, transparent), 0 0 30px color-mix(in oklab, var(--cyber) 25%, transparent)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyber/60 bg-black/40 text-cyber backdrop-blur">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-[10px]">
                    <span className="font-mono-tight text-white/70">{m.label}</span>
                    <span className="text-white/60">{m.caption}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              硬核机甲形变短片，每一帧都由 AI 与手工调度共同雕刻。
              点击图像位待接入真实竖屏视频。
            </p>
          </div>

          {/* Lens column */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="font-display text-xl text-foreground">镜头切面</h3>
              <span className="font-mono-tight text-gold/80">Photography</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {photos.map((p, i) => (
                <motion.figure
                  key={p.alt}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`group relative overflow-hidden rounded-xl border border-white/8 ${p.ratio} ${
                    i === 0 ? "col-span-2" : i === 3 ? "col-span-2" : ""
                  }`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <span className="max-w-[70%] text-sm text-white/85">{p.alt}</span>
                    <span className="font-mono-tight text-gold/80">{p.meta}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-24 max-w-3xl text-center font-display text-2xl italic text-muted-foreground sm:text-3xl"
        >
          “在钢铁的褶皱里，打捞一盏灯。”
        </motion.blockquote>
      </div>
    </section>
  );
}
