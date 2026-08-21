import { useState, type FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { supabase } from "@/lib/supabase";

const offices = [
  { name: "Headquarters", address: "13317 W Banff Ln\nSurprise, AZ 85379-6572" },
  { name: "Regional Office", address: "1938 Buckingham Rd\nLos Angeles, CA 90016" },
  {
    name: "Testing Laboratory",
    address: "13317 W Banff Ln\nSurprise, AZ 85379-6572",
  },
];

const fieldClass =
  "w-full border border-background/25 bg-transparent px-4 py-3 text-sm text-background placeholder:text-background/45 focus:border-gold focus:outline-none";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const projectType = String(formData.get("projectType") || "");
    const message = String(formData.get("message") || "");

    let ip = "";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      if (res.ok) {
        const data = await res.json();
        ip = data.ip || "";
      }
    } catch {
      /* ignore */
    }

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        company: company || null,
        project_type: projectType || null,
        message,
        ip_address: ip || null,
        user_agent: navigator.userAgent || null,
      });

      if (error) throw error;

      toast.success("Thank you, our team will respond within one business day.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-charcoal py-24 text-background/75 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal>
          <p className="eyebrow">Get in Touch</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-background sm:text-5xl">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed">
            Let's discuss your next construction, logistics, or development project.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact-form"
              className="bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-gold-soft"
            >
              Schedule a Consultation
            </a>
            <a
              href="tel:+14807092134"
              className="inline-flex items-center gap-2 border border-background/50 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-charcoal"
            >
              <Phone className="size-4" /> +1 (480) 709-2134
            </a>
            <a
              href="mailto:MDDevelopment2026@gmail.com"
              className="inline-flex items-center gap-2 border border-background/50 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-charcoal"
            >
              <Mail className="size-4" /> MDDevelopment2026@gmail.com
            </a>
          </div>

          <dl className="mt-16 grid gap-8 sm:grid-cols-3">
            {offices.map((o) => (
              <div key={o.name}>
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  {o.name}
                </dt>
                <dd className="mt-3 whitespace-pre-line text-sm leading-relaxed">{o.address}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <form id="contact-form" onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input id="name" name="name" required placeholder="Name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={fieldClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="sr-only">Company</label>
              <input id="company" name="company" placeholder="Company" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="projectType" className="sr-only">Project type</label>
              <select id="projectType" name="projectType" defaultValue="" className={fieldClass}>
                <option value="" disabled className="text-charcoal">Project Type</option>
                {["Construction", "Logistics", "Testing", "Real Estate", "Other"].map((o) => (
                  <option key={o} value={o} className="text-charcoal">{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about your project"
                className={fieldClass}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-gold-soft disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Inquiry"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}



// import { useState, type FormEvent } from "react";
// import { Mail, Phone } from "lucide-react";
// import { toast } from "sonner";
// import { Reveal } from "./Reveal";

// const offices = [
//   { name: "Headquarters", address: "13317 W Banff Ln\nSurprise, AZ 85379-6572" },
//   { name: "Regional Office", address: "1938 Buckingham Rd\nLos Angeles, CA 90016" },
//   {
//     name: "Testing Laboratory",
//     address: "3785 Via Nona Marie, Suite 108\nCarmel, CA 93923",
//   },
// ];

// const fieldClass =
//   "w-full border border-background/25 bg-transparent px-4 py-3 text-sm text-background placeholder:text-background/45 focus:border-gold focus:outline-none";

// export function Contact() {
//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setTimeout(() => {
//       setSubmitting(false);
//       (e.target as HTMLFormElement).reset();
//       toast.success("Thank you — our team will respond within one business day.");
//     }, 600);
//   };

//   return (
//     <section id="contact" className="bg-charcoal py-24 text-background/75 lg:py-32">
//       <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
//         <Reveal>
//           <p className="eyebrow">Get in Touch</p>
//           <h2 className="mt-5 font-display text-3xl leading-tight text-background sm:text-5xl">
//             Ready to Build Something Extraordinary?
//           </h2>
//           <p className="mt-6 max-w-lg leading-relaxed">
//             Let's discuss your next construction, logistics, or development project.
//           </p>

//           <div className="mt-10 flex flex-wrap gap-4">
//             <a
//               href="#contact-form"
//               className="bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-gold-soft"
//             >
//               Schedule a Consultation
//             </a>
//             <a
//               href="tel:+15551234567"
//               className="inline-flex items-center gap-2 border border-background/50 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-charcoal"
//             >
//               <Phone className="size-4" /> (555) 123-4567
//             </a>
//             <a
//               href="mailto:MDDevelopment2026@gmail.com"
//               className="inline-flex items-center gap-2 border border-background/50 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-charcoal"
//             >
//               <Mail className="size-4" /> MDDevelopment2026@gmail.com
//             </a>
//           </div>

//           <dl className="mt-16 grid gap-8 sm:grid-cols-3">
//             {offices.map((o) => (
//               <div key={o.name}>
//                 <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
//                   {o.name}
//                 </dt>
//                 <dd className="mt-3 whitespace-pre-line text-sm leading-relaxed">{o.address}</dd>
//               </div>
//             ))}
//           </dl>
//         </Reveal>

//         <Reveal delay={120}>
//           <form id="contact-form" onSubmit={onSubmit} className="space-y-5">
//             <div className="grid gap-5 sm:grid-cols-2">
//               <div>
//                 <label htmlFor="name" className="sr-only">
//                   Name
//                 </label>
//                 <input id="name" name="name" required placeholder="Name" className={fieldClass} />
//               </div>
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="Email"
//                   className={fieldClass}
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="company" className="sr-only">
//                 Company
//               </label>
//               <input id="company" name="company" placeholder="Company" className={fieldClass} />
//             </div>
//             <div>
//               <label htmlFor="projectType" className="sr-only">
//                 Project type
//               </label>
//               <select id="projectType" name="projectType" defaultValue="" className={fieldClass}>
//                 <option value="" disabled className="text-charcoal">
//                   Project Type
//                 </option>
//                 {["Construction", "Logistics", "Testing", "Real Estate", "Other"].map((o) => (
//                   <option key={o} value={o} className="text-charcoal">
//                     {o}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="message" className="sr-only">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={5}
//                 required
//                 placeholder="Tell us about your project"
//                 className={fieldClass}
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-gold-soft disabled:opacity-60"
//             >
//               {submitting ? "Sending…" : "Send Inquiry"}
//             </button>
//           </form>
//         </Reveal>
//       </div>
//     </section>
//   );
// }
