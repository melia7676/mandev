import { ClipboardCheck, FlaskConical, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const badges = ["ISO 9001", "ASTM", "ACI", "LEED", "OSHA", "AASHTO"];

const pillars = [
  {
    icon: FlaskConical,
    title: "Materials Testing",
    copy: "Concrete, soil, asphalt, and steel analysis performed in accredited laboratories.",
  },
  {
    icon: ClipboardCheck,
    title: "Structural Inspections",
    copy: "Load testing, non-destructive evaluation, and lifecycle integrity monitoring.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    copy: "Permitting, environmental review, and safety audits managed end to end.",
  },
];

export function Testing() {
  return (
    <section id="testing" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Quality Assurance</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
            Certified Quality. Uncompromising Standards.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {badges.map((b) => (
              <li
                key={b}
                className="flex h-24 items-center justify-center bg-background text-sm font-semibold uppercase tracking-[0.18em] text-trust"
              >
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <p.icon className="size-8 text-gold" aria-hidden />
              <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed">{p.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mx-auto mt-20 max-w-3xl border-t border-border pt-10 text-center font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">
            Every project we touch is backed by rigorous testing protocols and industry-leading
            compliance standards.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
