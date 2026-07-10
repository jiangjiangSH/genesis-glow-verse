import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, AlertCircle, Loader2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { videos, galleryItems, type VideoItem, type GalleryItem } from "@/data/site";

function VideoCard({ v }: { v: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<"poster" | "loading" | "playing" | "error">(
    "poster",
  );
  const [imgOk, setImgOk] = useState(true);

  const handlePlay = () => {
    if (!v.src) {
      setState("error");
      return;
    }
    setState("loading");
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof p.then === "function") {
      p.then(() => setState("playing")).catch(() => setState("error"));
    }
  };

  const showPoster = state === "poster" || state === "loading" || state === "error";

  return (
    <figure className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-white/8 bg-black">
      {v.src ? (
        <video
          ref={videoRef}
          src={v.src}
          poster={imgOk ? v.poster : undefined}
          preload="metadata"
          playsInline
          controls={state === "playing"}
          onLoadedData={() => setState((s) => (s === "loading" ? "playing" : s))}
          onEnded={() => setState("poster")}
          onError={() => setState("error")}
          className={`h-full w-full object-cover ${showPoster ? "opacity-0" : "opacity-100"}`}
          aria-label={`${v.caption} 视频`}
        />
      ) : null}

      {showPoster ? (
        <>
          {imgOk ? (
            <img
              src={v.poster}
              alt={v.caption}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-xs text-muted-foreground">
              封面加载失败
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklab, var(--cyber) 45%, transparent), 0 0 30px color-mix(in oklab, var(--cyber) 20%, transparent)",
            }}
          />

          <button
            type="button"
            onClick={handlePlay}
            aria-label={`播放 ${v.caption}`}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyber/60 bg-black/40 text-cyber backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-cyber group-focus-visible:scale-110">
              {state === "loading" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : state === "error" ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </span>
          </button>

          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-[10px]">
            <span className="font-mono-tight text-white/70">{v.label}</span>
            <span className="text-white/60">{v.caption}</span>
          </figcaption>

          {state === "error" ? (
            <div
              role="status"
              className="pointer-events-none absolute inset-x-3 top-3 rounded-md border border-white/15 bg-black/70 px-3 py-2 text-[11px] text-foreground/85"
            >
              视频暂未接入，配置 <code className="font-mono-tight text-gold">videos[].src</code> 后可播放。
            </div>
          ) : null}
        </>
      ) : null}
    </figure>
  );
}

function PhotoCard({ item, index }: { item: GalleryItem; index: number }) {
  const [ok, setOk] = useState(true);
  const span =
    item.span === "full"
      ? "col-span-12"
      : item.span === "wide"
        ? "col-span-12 md:col-span-8"
        : "col-span-6 md:col-span-4";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      className={`group relative overflow-hidden rounded-xl border border-white/8 bg-neutral-950 ${item.ratio} ${span}`}
    >
      {ok ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onError={() => setOk(false)}
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          图片暂时无法加载
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <span className="max-w-[75%] text-sm text-white/90">{item.alt}</span>
        <span className="font-mono-tight text-gold/80">{item.meta}</span>
      </figcaption>
    </motion.figure>
  );
}

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

        {/* AI Director row */}
        <div className="mt-20">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="font-display text-xl text-foreground">AI 导演</h3>
            <span className="font-mono-tight text-cyber/80">Mecha · Morph</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {videos.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            硬核机甲形变短片，每一帧都由 AI 与手工调度共同雕刻。点击封面开始播放；视频源可在
            <code className="mx-1 font-mono-tight text-gold/90">src/data/site.ts</code>
            中替换。
          </p>
        </div>

        {/* Photography row */}
        <div className="mt-24">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="font-display text-xl text-foreground">镜头切面</h3>
            <span className="font-mono-tight text-gold/80">Photography</span>
          </div>
          <div className="grid grid-cols-12 gap-4 sm:gap-5">
            {galleryItems.map((p, i) => (
              <PhotoCard key={p.alt} item={p} index={i} />
            ))}
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
