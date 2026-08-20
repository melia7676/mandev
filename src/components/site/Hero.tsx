import { ChevronDown } from "lucide-react";
import heroAsset from "@/assets/hero-construction.jpg.jpeg";

const heroImage = heroAsset;

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden">
      <img
        src={heroImage}
        alt="Night concrete pour on an M&D Development high-rise foundation site"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/35" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 pt-32 lg:px-10 lg:pb-32">
        <p className="eyebrow text-gold-soft">Construction · Logistics · Testing · Real Estate</p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.08] text-background sm:text-6xl lg:text-7xl">
          Building Tomorrow.
          <br />
          Delivering Today.
          <br />
          <span className="text-gold-soft">Certified Always.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
          Integrated construction, logistics, and testing solutions for projects that define skylines
          and supply chains.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#services"
            className="bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-gold-soft"
          >
            Explore Our Services
          </a>
          <a
            href="#projects"
            className="border border-background/60 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-charcoal"
          >
            View Projects
          </a>
        </div>
      </div>

      <a
        href="#stats"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-background/80 lg:block"
      >
        <ChevronDown className="scroll-cue size-7" />
      </a>
    </section>
  );
}
