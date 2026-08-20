import realEstate from "@/assets/real-estate.jpg";
import { Reveal } from "./Reveal";

const stats = [
  { value: "15", label: "Active Developments" },
  { value: "$200M", label: "Portfolio Value" },
  { value: "3", label: "Cities" },
];

export function RealEstate() {
  return (
    <section id="real-estate" className="bg-background">
      <div className="grid lg:grid-cols-2">
        <img
          src={realEstate}
          alt="Luxury mixed-use residential development illuminated at dusk"
          width={1400}
          height={1000}
          loading="lazy"
          className="h-[380px] w-full object-cover lg:h-full lg:min-h-[680px]"
        />
        <div className="flex items-center px-6 py-20 lg:px-16 lg:py-24">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Real Estate Division</p>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
              Developing Spaces That Inspire
            </h2>
            <p className="mt-7 leading-relaxed">
              Our real estate division transforms undeveloped land into thriving communities and
              premium commercial spaces. From mixed-use developments to luxury residential
              portfolios, we bring the same engineering rigor and logistical precision to every
              square foot.
            </p>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-y border-border py-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl text-charcoal">{s.value}</dt>
                  <dd className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="#contact"
              className="mt-10 inline-block bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-charcoal hover:text-background"
            >
              Explore Developments
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
