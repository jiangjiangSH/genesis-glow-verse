import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { NavBar } from "@/components/landing/NavBar";
import { NovelShowcase } from "@/components/landing/NovelShowcase";
import { GallerySection } from "@/components/landing/GallerySection";
import { ContactSection } from "@/components/landing/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground">
      <NavBar />
      <Hero />
      <NovelShowcase />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
