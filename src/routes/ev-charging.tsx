import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadFormDialog } from "@/components/site/LeadForm";
import { BatteryCharging, Building2, CheckCircle2, ClipboardList, Cog, Home as HomeIcon, MapPinned, Plug, Route as RouteIcon, ShieldCheck, Wrench, Zap } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
import { EVROI } from "@/components/site/calculators/EVROI";
import heroEv from "@/assets/hero-ev.jpg";
import evHome from "@/assets/ev-home.jpg";
import evStation from "@/assets/ev-station.jpg";

export const Route = createFileRoute("/ev-charging")({
  head: () => ({
    meta: [
      { title: "EV Charging Infrastructure — AC, DC Fast Charging — SkySolar" },
      { name: "description", content: "Turnkey EV charging infrastructure — AC home chargers, DC fast charging hubs, OCPP-compliant hardware, O&M and consultancy." },
      { property: "og:title", content: "EV Charging Infrastructure — SkySolar" },
      { property: "og:description", content: "AC, DC fast charging, OCPP hardware, hub deployment and O&M." },
      { property: "og:image", content: heroEv },
    ],
  }),
  component: EVPage,
});

const solutions = [
  { icon: HomeIcon, title: "Home Charging", img: evHome, points: ["3.3 – 7.4 kW AC chargers", "Smart scheduling & app control", "Safe load management"] },
  { icon: Building2, title: "Commercial Charging", img: evStation, points: ["Office, mall & hotel parking", "Tariff-based billing & analytics", "OCPP 1.6/2.0 compliant"] },
  { icon: RouteIcon, title: "Public DC Fast Charging", img: heroEv, points: ["60 – 240 kW chargers", "Highway and city corridors", "Revenue dashboards"] },
];

const process = [
  { icon: ClipboardList, title: "Site Assessment", desc: "Footfall, EV mix and viability." },
  { icon: MapPinned, title: "Load Planning", desc: "Transformer sizing & power upgrade." },
  { icon: Cog, title: "Design & Permits", desc: "Civil, electrical & DISCOM approvals." },
  { icon: ShieldCheck, title: "Supply", desc: "OCPP hardware, cabling, switchgear." },
  { icon: Wrench, title: "Installation", desc: "Foundation, MV/LV, charger commissioning." },
  { icon: Zap, title: "Go-live & O&M", desc: "Live monitoring, SLA-backed uptime." },
];

function EVPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="EV Infrastructure"
        title={<>The charging backbone for <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#B7E36A,#3AA76D)" }}>India's electric future.</span></>}
        description="AC and DC fast chargers, hub deployment, OCPP integration and revenue analytics — engineered for uptime, billing accuracy and 24×7 user experience."
        image={heroEv}
      />

      <Section tone="white">
        <SectionHeader eyebrow="EV Solutions" title="One partner. Every charging use case." />
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {solutions.map(({ icon: Icon, title, img, points }) => (
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

      <Section tone="surface">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader eyebrow="AC Chargers" title="Reliable everyday charging." description="From 3.3 kW residential wall-boxes to 22 kW workplace chargers — smart, safe and OCPP-compatible." />
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {["RFID & app authentication", "Earth leakage & surge protection", "Smart load balancing", "Multi-tariff billing"].map((p) => (
                <li key={p} className="flex gap-2 text-sm text-[var(--ink-soft)]"><CheckCircle2 size={16} className="text-[var(--brand-green-2)] mt-0.5 shrink-0" /><span>{p}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
            <img src={evHome} alt="AC charger" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)] order-2 lg:order-1">
            <img src={evStation} alt="DC fast charger" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader eyebrow="DC Fast Charging" title="High-power. High-throughput." description="60 kW – 240 kW DC fast chargers for highway corridors, fleet depots and urban hubs." />
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {["CCS2 + CHAdeMO connectors", "Power sharing across guns", "Remote diagnostics", "Payment gateway integration"].map((p) => (
                <li key={p} className="flex gap-2 text-sm text-[var(--ink-soft)]"><CheckCircle2 size={16} className="text-[var(--brand-green-2)] mt-0.5 shrink-0" /><span>{p}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Deployment Process" title="From feasibility to first kilowatt." />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-6">
          {process.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="text-center">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-white border border-border flex items-center justify-center text-[var(--brand-blue)] shadow-[var(--shadow-card)]">
                <Icon size={26} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-widest text-[var(--brand-green)] font-semibold">Step {i + 1}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</div>
              <div className="mt-1 text-xs text-[var(--ink-soft)]">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" id="roi">
        <SectionHeader eyebrow="EV Charger ROI Calculator" title="Model your charging station economics." description="Plug in your hardware cost, utilization and revenue per session to project payback and 5-year ROI." />
        <div className="mt-10"><EVROI /></div>
        <div className="mt-10 flex flex-wrap gap-3">
          <LeadFormDialog
            prefill={{ service: "ev-commercial", sourceLabel: "EV page CTA" }}
            trigger={<button type="button" className="btn-primary">Get EV Site Survey <BatteryCharging size={16} /></button>}
          />
          <Link to="/projects" className="btn-outline">View EV Projects <Plug size={16} /></Link>
        </div>
      </Section>
    </SiteShell>
  );
}