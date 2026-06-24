import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
import residential from "@/assets/residential-solar.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import industrial from "@/assets/industrial-solar.jpg";
import ev from "@/assets/ev-station.jpg";
import evHome from "@/assets/ev-home.jpg";
import heroSolar from "@/assets/hero-solar.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Solar & EV Deployments — SkySolar" },
      { name: "description", content: "Selected residential, commercial, industrial solar and EV charging projects delivered by SkySolar across India." },
      { property: "og:title", content: "Projects — SkySolar" },
      { property: "og:description", content: "Selected solar EPC and EV charging deployments." },
      { property: "og:image", content: heroSolar },
    ],
  }),
  component: ProjectsPage,
});

type Cat = "All" | "Residential" | "Commercial" | "Industrial" | "EV";
const tabs: Cat[] = ["All", "Residential", "Commercial", "Industrial", "EV"];

const projects = [
  { img: industrial, cat: "Industrial" as const, title: "850 kW Industrial Rooftop", loc: "Indore, MP", metric: "1.2 GWh/yr" },
  { img: commercial, cat: "Commercial" as const, title: "220 kW Commercial Plaza", loc: "Bhopal, MP", metric: "₹18L/yr saved" },
  { img: residential, cat: "Residential" as const, title: "8 kW Residential Rooftop", loc: "Bhopal, MP", metric: "₹72k/yr saved" },
  { img: ev, cat: "EV" as const, title: "12-Gun DC Fast Charging Hub", loc: "NH-46 Corridor", metric: "60 sessions/day" },
  { img: industrial, cat: "Industrial" as const, title: "1.2 MW Manufacturing Plant", loc: "Pithampur, MP", metric: "1.7 GWh/yr" },
  { img: evHome, cat: "EV" as const, title: "Residential Society EV Wallbox", loc: "Bhopal, MP", metric: "40 chargers" },
  { img: commercial, cat: "Commercial" as const, title: "180 kW Office Rooftop", loc: "Jabalpur, MP", metric: "₹14L/yr saved" },
  { img: residential, cat: "Residential" as const, title: "5 kW Villa Rooftop", loc: "Bhopal, MP", metric: "₹48k/yr saved" },
];

function ProjectsPage() {
  const [cat, setCat] = useState<Cat>("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.cat === cat);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Portfolio"
        title={<>Real projects. <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#B7E36A,#3AA76D)" }}>Measurable returns.</span></>}
        description="A selection of solar EPC and EV charging deployments across Madhya Pradesh and beyond."
        image={heroSolar}
      />

      <Section tone="white">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setCat(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${cat === t ? "text-white" : "bg-[var(--surface-2)] text-[var(--brand-blue)] hover:bg-[var(--surface)]"}`}
              style={cat === t ? { background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))", fontFamily: "var(--font-display)" } : { fontFamily: "var(--font-display)" }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <article key={p.title} className="card-elevated overflow-hidden p-0">
              <div className="aspect-[16/11] overflow-hidden"><img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" /></div>
              <div className="p-6">
                <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> {p.cat}</span>
                <h3 className="mt-3 text-lg font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                <div className="mt-2 flex justify-between text-sm text-[var(--ink-soft)]">
                  <span>{p.loc}</span>
                  <span className="font-semibold text-[var(--brand-green)]">{p.metric}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}