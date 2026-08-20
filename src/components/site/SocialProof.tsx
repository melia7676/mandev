import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

const clients = ["MERIDIAN", "NORTHPORT", "ALTIVA", "CIVITAS", "HALLMARK", "STRATOS"];

const quotes = [
  {
    quote:
      "Their integrated logistics and construction management saved us four months on a critical infrastructure project.",
    name: "Dana Whitfield",
    title: "VP of Infrastructure",
    company: "Meridian Transit Authority",
  },
  {
    quote:
      "The testing and compliance team ensured we passed every inspection on the first attempt.",
    name: "Peter Nakamura",
    title: "Director of Facilities",
    company: "Northport Industrial",
  },
  {
    quote:
      "From land acquisition to final delivery, they handled every detail of our real estate development.",
    name: "Elena Cruz",
    title: "Managing Partner",
    company: "Altiva Capital Group",
  },
];

export function SocialProof() {
  const [index, setIndex] = useState(0);
  const active = quotes[index]!;

  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow">Brand Authority</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed">
            We've partnered with government agencies, Fortune 500 companies, and leading developers
            across the nation.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((c) => (
              <li
                key={c}
                className="text-sm font-bold tracking-[0.28em] text-muted-foreground/70 transition-colors hover:text-charcoal"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <figure className="mx-auto mt-20 max-w-3xl">
            <blockquote className="font-display text-2xl italic leading-relaxed text-charcoal sm:text-3xl">
              "{active.quote}"
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-display text-lg text-gold">{active.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {active.title}, {active.company}
              </p>
            </figcaption>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => setIndex((i) => (i - 1 + quotes.length) % quotes.length)}
                className="border border-border p-3 transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex gap-2">
                {quotes.map((q, i) => (
                  <button
                    key={q.name}
                    type="button"
                    aria-label={`Testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 w-8 transition-colors ${i === index ? "bg-gold" : "bg-border"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setIndex((i) => (i + 1) % quotes.length)}
                className="border border-border p-3 transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
