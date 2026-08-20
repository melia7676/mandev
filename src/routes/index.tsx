import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Testing } from "@/components/site/Testing";
import { RealEstate } from "@/components/site/RealEstate";
import { SocialProof } from "@/components/site/SocialProof";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import summary_large_imag from "@/assets/summary_large_imag.jpeg"

const title = "M&D Development | Construction, Logistics & Testing Solutions";
const description =
  "M&D Development delivers integrated construction, logistics, materials testing, and real estate development for projects that define skylines and supply chains.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: summary_large_imag },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Projects />
        <Testing />
        <RealEstate />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
