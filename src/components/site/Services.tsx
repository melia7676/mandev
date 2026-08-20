import { ArrowRight } from "lucide-react";
import constructionAsset from "@/assets/service-construction.jpg.jpeg";
import logisticsAsset from "@/assets/service-logistics.jpg.jpeg";
import testingAsset from "@/assets/service-testing.jpg.jpeg";

const construction = constructionAsset;
const logistics = logisticsAsset;
const testing = testingAsset;
import { Reveal } from "./Reveal";

const services = [
  {
    title: "Construction",
    image: construction,
    alt: "Workstation and staging area inside an active build-out project",
    copy: "Commercial, residential, and infrastructure construction with precision engineering and on-time delivery.",
  },
  {
    title: "Logistics",
    image: logistics,
    alt: "Operating area route map used for logistics planning",
    copy: "End-to-end supply chain management, warehousing, and transportation solutions that keep your project moving.",
  },
  {
    title: "Testing & Compliance",
    image: testing,
    alt: "Technician inspecting electrical junction box wiring during compliance testing",
    copy: "Materials testing, structural integrity assessments, and full regulatory compliance certification.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
            Integrated Solutions for Complex Projects
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} as="article">
              <a
                href="#contact"
                className="group block h-full bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.45)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-4 leading-relaxed">{s.copy}</p>
                  <span className="link-arrow mt-7 text-gold">
                    Learn More <ArrowRight className="size-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
