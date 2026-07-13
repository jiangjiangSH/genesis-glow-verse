import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { navSections, contact } from "@/data/site";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const smoothScrollTo = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollTo(id);
    history.replaceState(null, "", id === "top" ? "#" : `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-background/85 py-2 backdrop-blur-xl"
          : "bg-transparent py-3"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "top")}
          className="font-display text-2xl italic text-foreground"
          aria-label={`${contact.name} · 回到顶部`}
        >
          <span className="text-gold-soft">Jiang</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navSections.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => handleNavClick(e, l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative inline-flex flex-col items-center py-1 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  <span>{l.label}</span>
                  <span
                    className={`mt-1 h-px bg-gold transition-all duration-300 ${
                      isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden h-9 items-center rounded-md border border-white/15 px-4 text-xs text-foreground/85 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 md:inline-flex"
          >
            联系我
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="打开导航菜单"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-foreground/85 transition-colors hover:border-gold/50 hover:text-gold md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[82vw] max-w-sm border-white/10 bg-background/95 p-8 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">主导航</SheetTitle>
              <SheetDescription className="sr-only">页面锚点导航</SheetDescription>

              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-2xl italic text-gold-soft">Jiang</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="关闭菜单"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-foreground/85"
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
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}