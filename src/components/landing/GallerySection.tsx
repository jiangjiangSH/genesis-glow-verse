import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { galleryItems, type GalleryItem } from "@/data/site";

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
          背包与相机走过的地方，安静地留在画面里。
        </SectionHeading>

        <div className="mt-16 grid grid-cols-12 gap-3 sm:mt-20 sm:gap-4">
          {galleryItems.map((p, i) => (
            <PhotoTile key={p.alt} item={p} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
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
  const span =
    item.span === "full"
      ? "col-span-12"
      : item.span === "wide"
        ? "col-span-12 md:col-span-8"
        : "col-span-6 md:col-span-4";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      aria-label={`查看大图：${item.alt}`}
      className={`group relative block overflow-hidden bg-neutral-950 ${item.ratio} ${span} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        <span className="text-sm text-white/90">{item.alt}</span>
        <span className="font-mono-tight text-gold/90">{item.meta}</span>
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
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`大图：${item.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-8"
      onClick={onClose}
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