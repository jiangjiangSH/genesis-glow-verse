import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { about } from "@/data/site";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={about.eyebrow} title={about.heading} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 flex flex-col gap-5 text-[15px] leading-[1.95] text-foreground/80 sm:text-base"
        >
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}