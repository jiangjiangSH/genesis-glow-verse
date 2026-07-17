import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, ImageOff } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { galleryItems, vivoGalleryUrl, type GalleryItem } from "@/data/site";

export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % galleryItems.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  return (
    <section id="gallery" className="relative w-full px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Photography · 光影" title="风景摄影">
          用镜头记录城市、自然与途中光影。
        </SectionHeading>

        <div className="mt-14 grid grid-cols-12 gap-3 sm:mt-20 sm:gap-4">
          {galleryItems.map((p, i) => (
            <PhotoTile key={p.alt} item={p} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={vivoGalleryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-md border border-white/15 px-5 text-sm text-foreground/85 transition-colors duration-200 hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            在 vivo 摄影查看全部作品
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {isOpen ? (
        <Lightbox
          item={galleryItems[openIndex!]}
          onClose={close}
          onPrev={prev}
          onNext={next}
          index={openIndex!}
          total={galleryItems.length}
        />
      ) : null}
    </section>
  );
}

function PhotoTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const spanMap: Record<GalleryItem["span"], string> = {
    full: "col-span-12",
    half: "col-span-12 sm:col-span-6",
    third: "col-span-6 md:col-span-4",
    twoThird: "col-span-12 md:col-span-8",
    fiveTwelfth: "col-span-12 md:col-span-5",
    sevenTwelfth: "col-span-12 md:col-span-7",
  };
  const span = spanMap[item.span] ?? "col-span-12 md:col-span-6";
  const [failed, setFailed] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      aria-label={`查看大图：${item.alt}`}
      className={`group relative block overflow-hidden rounded-[2px] bg-neutral-950 ${item.ratio} ${span} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60`}
    >
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff className="h-5 w-5" />
          <span className="text-xs">图片暂时无法加载</span>
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        <span className="text-xs text-white/90">{item.meta}</span>
      </div>
    </motion.button>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  index,
  total,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
}) {
  const touchStartX = { current: 0 } as { current: number };
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`大图：${item.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-8"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="关闭大图"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/60 text-white/90 transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="上一张"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-black/60 text-white/90 transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="下一张"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-black/60 text-white/90 transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center gap-3"
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[82vh] max-w-full object-contain"
        />
        <figcaption className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
          <span>{item.alt}</span>
          <span className="font-mono-tight text-gold/80">{item.meta}</span>
          <span className="text-white/50">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}