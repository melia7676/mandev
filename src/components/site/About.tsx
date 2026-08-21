import { ArrowRight } from "lucide-react";
import aboutAsset from "@/assets/about-team.jpg.jpeg";

const aboutImage = aboutAsset;
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <img
            src={aboutImage}
            alt="M&D Development field team performing on-site structural inspection work"
            width={1200}
            height={1400}
            loading="lazy"
            className="h-[420px] w-full object-cover lg:h-[620px]"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">Who We Are</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
            Engineered for Excellence.
            <br />
            Built on Trust.
          </h2>
          <p className="mt-7 max-w-xl leading-relaxed">
            M&D Development is a partner-owned firm founded and led by David Stanwood and Mia Amin.
            Together they built a company that doesn't just manage projects — it orchestrates them.
            From groundbreaking to final inspection, from warehouse to last-mile delivery, and from
            material testing to compliance certification, our integrated approach ensures every phase
            meets the highest standard.
          </p>

          <blockquote className="mt-10 border-l-2 border-gold pl-6">
            <p className="font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">
              "Precision isn't a department here. It's the operating system of the entire company."
            </p>
            <footer className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="font-display text-lg text-gold">Mia Amin</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Founder & Chief Operating Officer
                </p>
              </div>
              <div>
                <p className="font-display text-lg text-gold">David Stanwood</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Co-Founder & Managing Partner
                </p>
              </div>
            </footer>
          </blockquote>

          <a href="#services" className="link-arrow mt-10">
            Learn Our Story <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
