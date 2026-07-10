import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { navSections, contact } from "@/data/site";
import { useContactDialog } from "./ContactDialogContext";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openContact } = useContactDialog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = navSections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const smoothScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollTo(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-2xl italic tracking-tight text-foreground"
          aria-label="Jiang · 回到顶部"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, color-mix(in oklab, var(--gold-soft) 90%, white), var(--gold) 65%, color-mix(in oklab, var(--gold) 55%, black))",
            }}
          >
            Jiang
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navSections.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => handleNavClick(e, l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative inline-flex flex-col items-center text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{l.label}</span>
                  <span
                    className={`mt-1 h-px bg-gold transition-all duration-500 ${
                      isActive ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openContact}
            className="hidden rounded-full border border-white/10 px-4 py-1.5 text-xs text-foreground/80 transition-all hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 md:inline-block"
          >
            联系 {contact.name}
          </button>

          {/* mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="打开导航菜单"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground/80 transition-colors hover:border-gold/50 hover:text-gold md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[82vw] max-w-sm border-white/8 bg-background/95 p-8 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">主导航</SheetTitle>
              <SheetDescription className="sr-only">
                页面锚点导航
              </SheetDescription>

              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-2xl italic text-gold">Jiang</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="关闭菜单"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="flex flex-col gap-6">
                {navSections.map((l) => {
                  const isActive = active === l.id;
                  return (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        onClick={(e) => handleNavClick(e, l.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`font-display text-2xl transition-colors ${
                          isActive ? "text-gold" : "text-foreground/85 hover:text-foreground"
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  // wait for sheet close animation before opening dialog
                  window.setTimeout(openContact, 180);
                }}
                className="mt-12 inline-flex w-full items-center justify-center rounded-full border border-gold/50 px-5 py-3 text-sm text-gold transition-colors hover:bg-gold/10"
              >
                联系 {contact.name}
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
