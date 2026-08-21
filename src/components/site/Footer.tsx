import { Facebook, Instagram, Linkedin } from "lucide-react";

const columns = [
  {
    title: "Services",
    links: ["Construction", "Logistics", "Testing & Compliance", "Real Estate"],
  },
  { title: "Company", links: ["About", "Careers", "News", "Contact"] },
];

export function Footer() {
  return (
    <footer className="bg-background pb-8 pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="font-display text-2xl tracking-[0.14em] text-charcoal">M&D DEVELOPMENT</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Integrated construction, logistics, testing, and real estate development.
          </p>
          <div className="mt-6 flex gap-4">
            {[ Instagram, ].map((Icon, i) => (
              <a
                key={i}
                href="https://www.instagram.com/m_ddevelopment2026?igsh=MTVjOG9pNnA0dzVhaA=="
                aria-label={[ "Instagram",][i]}
                className="border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
              {c.title}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#services" className="transition-colors hover:text-charcoal">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h3>
          <p className="mt-5 text-sm leading-relaxed">
            13317 W Banff Ln
            <br />
            Surprise, AZ 85379-6572
            <br />
            +1 (480) 709-2134
            <br />
            <a href="mailto:MDDevelopment2026@gmail.com" className="hover:text-charcoal">
              MDDevelopment2026@gmail.com
            </a>
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex border border-border"
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-charcoal px-4 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-background"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-3 border-t border-border px-6 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} M&D Development. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#home" className="hover:text-charcoal">
            Privacy Policy
          </a>
          <a href="#home" className="hover:text-charcoal">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
