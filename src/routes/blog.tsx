import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
import heroSolar from "@/assets/hero-solar.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import industrial from "@/assets/industrial-solar.jpg";
import residential from "@/assets/residential-solar.jpg";
import ev from "@/assets/ev-station.jpg";
import evHome from "@/assets/ev-home.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Solar, EV & Energy — SkySolar" },
      { name: "description", content: "Articles on solar EPC, subsidies, net metering, EV charging infrastructure, energy savings and clean technology in India." },
      { property: "og:title", content: "SkySolar Insights" },
      { property: "og:description", content: "Solar, EV and clean energy insights for India." },
      { property: "og:image", content: heroSolar },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { img: residential, cat: "Subsidies", title: "PM Surya Ghar: Free electricity scheme — what you actually get", read: "6 min" },
  { img: commercial, cat: "Solar", title: "OPEX vs CAPEX solar for commercial buildings: the real economics", read: "8 min" },
  { img: industrial, cat: "Industrial", title: "Open access solar in MP: a step-by-step guide for industries", read: "11 min" },
  { img: ev, cat: "EV", title: "DC fast charging hubs: site selection that actually pays back", read: "9 min" },
  { img: evHome, cat: "EV", title: "Choosing the right home EV charger: AC, smart and OCPP", read: "5 min" },
  { img: heroSolar, cat: "Energy Savings", title: "How to read your electricity bill like an energy auditor", read: "7 min" },
];

function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Insights"
        title={<>Clean energy, <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#B7E36A,#3AA76D)" }}>clearly explained.</span></>}
        description="Practical guides on solar, EV charging, subsidies, net metering, financing and the technology behind India's energy transition."
        image={heroSolar}
      />
      <Section tone="white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.title} className="card-elevated p-0 overflow-hidden group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden"><img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--brand-blue)] font-semibold tracking-wide uppercase">{p.cat}</span>
                  <span className="text-[var(--ink-soft)]">{p.read} read</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--brand-blue)] leading-snug" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-green)]">Read article <ArrowRight size={14} /></span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}