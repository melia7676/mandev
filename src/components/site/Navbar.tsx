import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testing & Compliance", href: "#testing" },
  { label: "Real Estate", href: "#real-estate" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background shadow-[0_1px_24px_rgba(0,0,0,0.08)]"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10"
      >
        <a
          href="#home"
          className={cn(
            "whitespace-nowrap font-display text-lg tracking-[0.14em] transition-colors sm:text-xl",
            scrolled ? "text-charcoal" : "text-background",
          )}
        >
          M&D DEVELOPMENT
        </a>

        <ul className="hidden items-center gap-6 xl:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  scrolled
                    ? "text-muted-foreground hover:text-gold"
                    : "text-background/85 hover:text-gold-soft",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden bg-gold px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-charcoal hover:text-background md:inline-block"
          >
            Get a Quote
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn("p-2 xl:hidden", scrolled || open ? "text-charcoal" : "text-background")}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm bg-charcoal px-8 py-8 transition-transform duration-500 xl:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap font-display text-lg tracking-[0.14em] text-background">
            M&D DEVELOPMENT
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-background"
          >
            <X className="size-6" />
          </button>
        </div>
        <ul className="mt-12 space-y-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-background transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-10 inline-block bg-gold px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent-foreground"
        >
          Get a Quote
        </a>
      </div>
    </header>
  );
}


// import { useEffect, useState } from "react";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// const links = [
//   { label: "Home", href: "#home" },
//   { label: "Services", href: "#services" },
//   { label: "Projects", href: "#projects" },
//   { label: "Testing & Compliance", href: "#testing" },
//   { label: "Real Estate", href: "#real-estate" },
//   { label: "About", href: "#about" },
//   { label: "Contact", href: "#contact" },
// ];

// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={cn(
//         "fixed inset-x-0 top-0 z-50 transition-all duration-500",
//         scrolled ? "bg-background/95 shadow-[0_1px_24px_rgba(0,0,0,0.08)] backdrop-blur" : "bg-transparent",
//       )}
//     >
//       <nav
//         aria-label="Primary"
//         className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10"
//       >
//         <a
//           href="#home"
//           className={cn(
//             "whitespace-nowrap font-display text-lg tracking-[0.14em] transition-colors sm:text-xl",
//             scrolled ? "text-charcoal" : "text-background",
//           )}
//         >
//           M&D DEVELOPMENT
//         </a>

//         <ul className="hidden items-center gap-6 xl:flex">
//           {links.map((l) => (
//             <li key={l.href}>
//               <a
//                 href={l.href}
//                 className={cn(
//                   "whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors",
//                   scrolled
//                     ? "text-muted-foreground hover:text-gold"
//                     : "text-background/85 hover:text-gold-soft",
//                 )}
//               >
//                 {l.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div className="flex items-center gap-3">
//           <a
//             href="#contact"
//             className="hidden bg-gold px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-charcoal hover:text-background md:inline-block"
//           >
//             Get a Quote
//           </a>
//           <button
//             type="button"
//             aria-label={open ? "Close menu" : "Open menu"}
//             aria-expanded={open}
//             onClick={() => setOpen((v) => !v)}
//             className={cn("p-2 xl:hidden", scrolled || open ? "text-charcoal" : "text-background")}
//           >
//             {open ? <X className="size-6" /> : <Menu className="size-6" />}
//           </button>
//         </div>
//       </nav>

//       <div
//         className={cn(
//           "fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm bg-charcoal px-8 py-8 transition-transform duration-500 xl:hidden",
//           open ? "translate-x-0" : "translate-x-full",
//         )}
//       >
//         <div className="flex items-center justify-between">
//           <span className="whitespace-nowrap font-display text-lg tracking-[0.14em] text-background">M&D DEVELOPMENT</span>
//           <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-background">
//             <X className="size-6" />
//           </button>
//         </div>
//         <ul className="mt-12 space-y-6">
//           {links.map((l) => (
//             <li key={l.href}>
//               <a
//                 href={l.href}
//                 onClick={() => setOpen(false)}
//                 className="font-display text-2xl text-background transition-colors hover:text-gold"
//               >
//                 {l.label}
//               </a>
//             </li>
//           ))}
//         </ul>
//         <a
//           href="#contact"
//           onClick={() => setOpen(false)}
//           className="mt-10 inline-block bg-gold px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent-foreground"
//         >
//           Get a Quote
//         </a>
//       </div>
//     </header>
//   );
// }
