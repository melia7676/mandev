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
           M&D Development gets operations off the ground and keeps them safe. We help growing businesses launch with confidence, specializing in 3PL setup and 5S building safety systems. From warehouse layout and workflow design to safety compliance and operational efficiency, we build the foundation you need to scale. Our team brings years of hands-on experience setting up operations for Amazon, Microsoft, Symbotic, and other large enterprises, now put to work for startups and growing companies. We launch faster, operate safer, and scale smarter, delivering enterprise-grade 3PL and 5S setups built for startups, taking facilities from empty buildings to fully operational environments in record time, and turning new warehouses into safe, high-performing operations with big-company experience and startup-friendly execution.
          </p>

          <blockquote className="mt-10 border-l-2 border-gold pl-6">
            <p className="font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">
              "Precision isn't a department here. It's the operating system of the entire company."
            </p>
            <footer className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="font-display text-lg text-gold">Mia Amin</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Founder & Managing Partner
                </p>
              </div>
              <div>
                <p className="font-display text-lg text-gold">David Stanwood</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Co-Founder & Chief Operating Officer
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
