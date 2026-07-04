import { useEffect, useState } from "react";

const LINKS = [
  { href: "#novels", label: "连载宇宙" },
  { href: "#gallery", label: "光影与人间" },
  { href: "#contact", label: "连接与共创" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-5">
        <a
          href="#top"
          className="font-display text-lg tracking-tight text-foreground"
          aria-label="回到顶部"
        >
          <span className="text-gold">MA</span>
          <span className="text-foreground/70">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{l.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 hover:w-full group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-white/10 px-4 py-1.5 text-xs text-foreground/80 transition-all hover:border-gold/60 hover:text-gold md:inline-block"
        >
          合作
        </a>
      </nav>
    </header>
  );
}
