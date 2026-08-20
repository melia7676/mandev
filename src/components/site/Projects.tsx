import { MapPin } from "lucide-react";
import { Reveal } from "./Reveal";

const projects = [
  {
    name: "Metro Tower Complex",
    location: "Surprise, AZ",
    tags: ["Construction", "Testing"],
    metric: "142,000 Sq.Ft.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70",
    alt: "Modern glass office tower",
  },
  {
    name: "Portside Logistics Hub",
    location: "Long Beach, CA",
    tags: ["Logistics", "Construction"],
    metric: "$45M Value",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=70",
    alt: "Distribution warehouse with loading bays",
  },
  {
    name: "Northgate Residences",
    location: "Los Angeles, CA",
    tags: ["Real Estate", "Construction"],
    metric: "218 Units",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70",
    alt: "Contemporary residential development",
  },
  {
    name: "Vertex Materials Lab",
    location: "Carmel, CA",
    tags: ["Testing"],
    metric: "18,400 Tests / Yr",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=70",
    alt: "Technician working in a materials testing laboratory",
  },
  {
    name: "Harbor Bridge Retrofit",
    location: "Seattle, WA",
    tags: ["Construction", "Testing"],
    metric: "12-Month Timeline",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
    alt: "Steel bridge infrastructure under maintenance",
  },
  {
    name: "Crescent Mixed-Use District",
    location: "Nashville, TN",
    tags: ["Real Estate", "Logistics"],
    metric: "$88M Portfolio",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70",
    alt: "Mixed-use urban development at dusk",
  },
];

export function Projects() {
  return (
    <section id="projects" className="bg-background pb-28 pt-4 lg:pb-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Portfolio</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">Signature Projects</h2>
          <p className="mt-4 text-lg">Where vision meets execution.</p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 120} as="article">
              <div className="group h-full border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.45)]">
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-60 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl">{p.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-gold" aria-hidden />
                    {p.location}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="border border-border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-border pt-5 font-display text-lg text-gold">
                    {p.metric}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-block border border-charcoal px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-charcoal hover:text-background"
          >
            View All Projects
          </a>
        </Reveal>
      </div>
    </section>
  );
}
