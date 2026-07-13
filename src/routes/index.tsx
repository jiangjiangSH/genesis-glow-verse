import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { NavBar } from "@/components/landing/NavBar";
import { NovelShowcase } from "@/components/landing/NovelShowcase";
import { GallerySection } from "@/components/landing/GallerySection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { ContactDialogProvider } from "@/components/landing/ContactDialogContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ContactDialogProvider>
      <main className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground">
        <NavBar />
        <Hero />
        <NovelShowcase />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
    </ContactDialogProvider>
  );
}
