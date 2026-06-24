import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadFormDialog } from "@/components/site/LeadForm";
import { Building2, CheckCircle2, ClipboardList, Cog, Factory, Home as HomeIcon, MapPinned, ShieldCheck, Wrench, Zap } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
import { SolarEMI } from "@/components/site/calculators/SolarEMI";
import { SolarROI } from "@/components/site/calculators/SolarROI";
import heroSolar from "@/assets/hero-solar.jpg";
import residential from "@/assets/residential-solar.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import industrial from "@/assets/industrial-solar.jpg";

export const Route = createFileRoute("/solar")({
  head: () => ({
    meta: [
      { title: "Solar EPC, Rooftop & Industrial Solar — SkySolar" },
      { name: "description", content: "Residential, commercial and industrial solar EPC, net metering, subsidy support and financing. Tier-1 modules, MNRE-grade BoS." },
      { property: "og:title", content: "Solar EPC & Rooftop Solar — SkySolar" },
      { property: "og:description", content: "Turnkey rooftop, commercial and industrial solar EPC with 25-year monitored returns." },
      { property: "og:image", content: heroSolar },
    ],
  }),
  component: SolarPage,
});

const segments = [
  { icon: HomeIcon, title: "Residential Rooftop", img: residential, points: ["1–10 kW systems", "Net metering & PM Surya Ghar subsidy", "Easy EMI plans"] },
  { icon: Building2, title: "Commercial Solar", img: commercial, points: ["10 kW – 1 MW systems", "Captive consumption & OPEX models", "Higher tax depreciation"] },
  { icon: Factory, title: "Industrial Solar EPC", img: industrial, points: ["Multi-MW rooftop & ground mount", "SCADA, monitoring, MV interface", "Wheeling & open-access"] },
];

const process = [
  { icon: ClipboardList, title: "Consultation", desc: "Load profile and feasibility study." },
  { icon: MapPinned, title: "Site Survey", desc: "Shadow analysis, structural assessment." },
  { icon: Cog, title: "Design & Engineering", desc: "PV layout, electrical SLD, simulations." },
  { icon: ShieldCheck, title: "Approvals", desc: "DISCOM, net metering, subsidy filing." },
  { icon: Wrench, title: "Installation", desc: "Tier-1 modules, BoS, civil & mounting." },
  { icon: Zap, title: "Commissioning", desc: "Testing, synchronisation, handover." },
  { icon: CheckCircle2, title: "Monitoring & O&M", desc: "Live dashboards, AMC, fault response." },
];

function SolarPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Solar EPC"
        title={<>Solar that pays you back, <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#B7E36A,#3AA76D)" }}>every year for 25.</span></>}
        description="From rooftop systems to multi-megawatt industrial plants — SkySolar designs, finances and runs solar projects engineered for 25-year performance."
        image={heroSolar}
      />

      {/* Benefits */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Why go solar"
          title="Lower bills. Higher asset value. Real impact."
          description="Solar isn't an expense — it's an asset class. Capex pays back in 3–5 years and runs for 25, with predictable, inflation-proof returns."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { k: "Up to 90%", v: "Reduction in electricity bills" },
            { k: "3–5 years", v: "Typical payback period" },
            { k: "25 years", v: "Performance warranty" },
            { k: "₹0 down", v: "EMI & financing options" },
          ].map((b) => (
            <div key={b.v} className="card-elevated p-7">
              <div className="text-3xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{b.k}</div>
              <div className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{b.v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Segments */}
      <Section tone="surface">
        <SectionHeader eyebrow="Solutions" title="Built for every scale of solar." />
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {segments.map(({ icon: Icon, title, img, points }) => (
            <div key={title} className="card-elevated p-0 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden"><img src={img} alt={title} className="h-full w-full object-cover" loading="lazy" /></div>
              <div className="p-7">
                <Icon size={22} className="text-[var(--brand-green)]" />
                <h3 className="mt-4 text-xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
                  {points.map((p) => <li key={p} className="flex gap-2"><CheckCircle2 size={16} className="text-[var(--brand-green-2)] mt-0.5 shrink-0" /><span>{p}</span></li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="white">
        <SectionHeader eyebrow="The process" title="A seven-stage path to clean energy." />
        <div className="mt-14 relative">
          <div className="hidden md:block absolute left-0 right-0 top-10 h-px bg-[var(--surface-2)]" />
          <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
            {process.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative text-center">
                <div className="mx-auto h-20 w-20 rounded-2xl bg-white border border-border flex items-center justify-center text-[var(--brand-blue)] shadow-[var(--shadow-card)]">
                  <Icon size={26} />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-widest text-[var(--brand-green)] font-semibold">Step {i + 1}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</div>
                <div className="mt-1 text-xs text-[var(--ink-soft)]">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EMI calc */}
      <Section tone="surface" id="emi">
        <SectionHeader eyebrow="Solar EMI Calculator" title="See what your monthly EMI looks like." description="Configure system size, project cost, down payment and tenure. Numbers update instantly." />
        <div className="mt-10"><SolarEMI /></div>
      </Section>

      {/* ROI calc */}
      <Section tone="white" id="roi">
        <SectionHeader eyebrow="Solar ROI Calculator" title="Project your 25-year savings and payback." description="Inputs are illustrative — for a precise proposal, book a free site survey." />
        <div className="mt-10"><SolarROI /></div>
        <div className="mt-10 flex flex-wrap gap-3">
          <LeadFormDialog
            prefill={{ sourceLabel: "Solar page CTA" }}
            trigger={<button type="button" className="btn-primary">Get Detailed Proposal</button>}
          />
          <Link to="/projects" className="btn-outline">See Live Projects</Link>
        </div>
      </Section>
    </SiteShell>
  );
}