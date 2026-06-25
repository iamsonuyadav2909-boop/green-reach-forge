import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, BatteryCharging, BarChart3, CircuitBoard, Cog, FileCheck2, IndianRupee, Leaf, LineChart, Plug, ShieldCheck, Sparkles, Sun, Wrench, Zap, Building2, Factory, Home as HomeIcon } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { Counter } from "@/components/site/Counter";
import heroSolar from "@/assets/hero-solar.jpg";
import heroEv from "@/assets/hero-ev.jpg";
import engineer from "@/assets/engineer.jpg";
import evStation from "@/assets/ev-station.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkySolar — Solar EPC & EV Charging Infrastructure in India" },
      { name: "description", content: "SkySolar Private Limited delivers turnkey rooftop solar, industrial solar EPC and EV charging infrastructure. Bhopal-based, India-wide." },
      { property: "og:title", content: "SkySolar — Clean Energy & EV Infrastructure" },
      { property: "og:description", content: "Turnkey solar EPC and EV charging for homes, businesses and industries across India." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: HomeIcon, title: "Residential Rooftop Solar", desc: "Turnkey rooftop systems with net metering, subsidy and financing assistance." },
  { icon: Building2, title: "Commercial Solar", desc: "Roof and ground mount systems for offices, schools, hospitals and retail." },
  { icon: Factory, title: "Industrial Solar EPC", desc: "Design, supply, install and commission MW-scale captive solar plants." },
  { icon: Plug, title: "EV Charging Solutions", desc: "AC chargers, DC fast chargers and end-to-end charging hub deployment." },
  { icon: Wrench, title: "O&M and AMC", desc: "24×7 monitoring, preventive maintenance and uptime guarantees." },
  { icon: FileCheck2, title: "Net Metering & Subsidy", desc: "Full paperwork and DISCOM coordination for net metering and PM Surya Ghar." },
  { icon: IndianRupee, title: "Solar Financing", desc: "Easy EMI plans and project financing partnerships up to 100% funded." },
  { icon: CircuitBoard, title: "EV Infrastructure Consultancy", desc: "Site assessment, load planning, ROI modelling and OCPP integration." },
];

const whyUs = [
  { icon: ShieldCheck, title: "End-to-End EPC", desc: "One accountable partner from feasibility to commissioning." },
  { icon: BadgeCheck, title: "Certified Installations", desc: "MNRE-empanelled engineers, tier-1 modules and IEC-certified BoS." },
  { icon: LineChart, title: "High ROI Solutions", desc: "Designs optimised for output, uptime and 25-year financial returns." },
  { icon: FileCheck2, title: "Subsidy Assistance", desc: "Full documentation for central and state subsidies." },
  { icon: BarChart3, title: "Smart Monitoring", desc: "Live generation dashboards with per-string fault alerts." },
  { icon: Cog, title: "Dedicated AMC", desc: "Quarterly servicing and SLA-backed response times." },
];

function Home() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroSolar} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(7,23,42,0.92) 0%, rgba(11,58,102,0.78) 45%, rgba(19,94,150,0.35) 100%)" }} />
          <EnergyGrid />
        </div>

        <div className="container-page pt-24 pb-20 md:pt-32 md:pb-40 text-white relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1.5 text-xs font-medium tracking-widest uppercase">
            <Sparkles size={14} className="text-[#B7E36A]" /> Clean Energy · Sustainable Mobility
          </span>
          <h1 className="heading-xl mt-6 max-w-4xl !text-white">
            Powering Tomorrow with <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg, #B7E36A, #3AA76D)" }}>Clean Energy</span> & Sustainable Mobility.
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 text-base md:text-lg leading-relaxed">
            SkySolar delivers turnkey Solar EPC and EV charging infrastructure for homes, businesses
            and industries — engineered for performance, designed for the next 25 years.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">Get Free Consultation <ArrowRight size={16} /></Link>
            <Link to="/solar" className="btn-ghost-light">Calculate Savings</Link>
          </div>

          {/* Floating stats */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
            {[
              { k: "25+ MW", v: "Solar capacity installed" },
              { k: "1,200+", v: "Projects completed" },
              { k: "400+", v: "EV chargers deployed" },
              { k: "98%", v: "Client satisfaction" },
            ].map((s) => (
              <div key={s.v} className="bg-[rgba(11,58,102,0.55)] p-4 md:p-6">
                <div className="text-xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{s.k}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST COUNTERS */}
      <Section tone="white">
        <SectionHeader
          eyebrow="By the numbers"
          title={<>Trusted across <span className="gradient-text">India</span> for clean energy delivery.</>}
          description="Independently verified results across residential, commercial and industrial deployments."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sun, k: 25, suf: "+ MW", l: "Solar Installed" },
            { icon: Zap, k: 1200, suf: "+", l: "Projects Delivered" },
            { icon: BatteryCharging, k: 400, suf: "+", l: "EV Chargers" },
            { icon: Leaf, k: 32000, suf: " T", l: "CO₂ Offset / year" },
          ].map(({ icon: Icon, k, suf, l }) => (
            <div key={l} className="card-elevated p-7">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" }}>
                <Icon size={20} />
              </div>
              <div className="mt-6 text-4xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>
                <Counter to={k} suffix={suf} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[var(--ink-soft)]">{l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="What we do"
            title={<>End-to-end clean energy <br className="hidden md:block" />and EV infrastructure.</>}
            description="A single accountable partner across the full lifecycle — feasibility, EPC, financing, monitoring and maintenance."
          />
          <Link to="/solar" className="btn-outline">Explore Solutions <ArrowUpRight size={16} /></Link>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-elevated p-6 group">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-[var(--brand-blue)] bg-[var(--surface-2)] group-hover:bg-[var(--brand-green-2)] group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SPLIT — SOLAR + EV */}
      <Section tone="white">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-elevated p-0 overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={engineer} alt="Solar EPC" className="h-full w-full object-cover" width={1280} height={896} loading="lazy" />
            </div>
            <div className="p-8">
              <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> Solar EPC</span>
              <h3 className="mt-3 text-2xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>Solar that pays you back, year after year.</h3>
              <p className="mt-3 text-[var(--ink-soft)] leading-relaxed">Tier-1 modules, MNRE-grade BoS and string-level monitoring — engineered for 25 years of dependable generation.</p>
              <Link to="/solar" className="btn-primary mt-6">Explore Solar <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="card-elevated p-0 overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={evStation} alt="EV charging" className="h-full w-full object-cover" width={1280} height={896} loading="lazy" />
            </div>
            <div className="p-8">
              <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> EV Charging</span>
              <h3 className="mt-3 text-2xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>EV infrastructure built for the next decade.</h3>
              <p className="mt-3 text-[var(--ink-soft)] leading-relaxed">AC and DC fast charging hubs with OCPP-compliant hardware, load management and revenue analytics.</p>
              <Link to="/ev-charging" className="btn-primary mt-6">Explore EV <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE */}
      <Section tone="surface-2">
        <SectionHeader
          eyebrow="Why SkySolar"
          title="Engineered to perform. Built to last."
          description="Every project goes through a six-stage quality gate — from feasibility to commissioning — so you get predictable output and uptime."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-7 border border-border hover:border-[var(--brand-green-2)] transition-colors">
              <Icon size={22} className="text-[var(--brand-green)]" />
              <h3 className="mt-5 text-lg font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ECOSYSTEM */}
      <Section tone="white">
        <SectionHeader
          eyebrow="The clean energy loop"
          title={<>One ecosystem. <span className="gradient-text">Sun to wheels.</span></>}
          description="From rooftop generation to EV charging, SkySolar designs every link in the chain so energy flows efficiently end-to-end."
        />
        <EcosystemDiagram />
      </Section>

      {/* HERO EV image strip */}
      <Section tone="dark" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={heroEv} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,23,42,0.96) 0%, rgba(11,58,102,0.6) 100%)" }} />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <SectionHeader
            invert
            eyebrow="Testimonials"
            title="Trusted by businesses delivering real-world impact."
            description="Our clients range from independent homeowners to manufacturing groups and EV fleet operators."
          />
          <div className="grid gap-5">
            {[
              { q: "SkySolar delivered our 850kW industrial rooftop ahead of schedule with zero downtime. The monitoring dashboard is gold.", a: "Plant Head, Manufacturing — Indore" },
              { q: "Their net metering paperwork handling alone saved us months. ROI is tracking exactly to the model.", a: "Director, Commercial Builder — Bhopal" },
              { q: "We deployed 12 DC fast chargers across MP with SkySolar. Uptime has been outstanding.", a: "Fleet Operations Lead — EV Mobility" },
            ].map((t) => (
              <div key={t.a} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                <p className="text-white/90 leading-relaxed">“{t.q}”</p>
                <p className="mt-3 text-sm text-[#B7E36A] font-semibold tracking-wide">{t.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PARTNERS MARQUEE */}
      <Section tone="white" className="!py-16">
        <div className="text-center">
          <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> Trusted Brands</span>
        </div>
        <div className="mt-8 overflow-hidden">
          <div className="flex gap-14 animate-marquee w-max">
            {[...Array(2)].flatMap((_, k) =>
              ["Waaree", "Adani Solar", "Tata Power", "Vikram Solar", "Luminous", "Schneider", "ABB", "Delta", "Havells", "Statcon"].map((brand) => (
                <div key={brand + k} className="text-2xl font-semibold tracking-tight text-[var(--ink-soft)] opacity-60 whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>
                  {brand}
                </div>
              ))
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="surface">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(120deg, var(--brand-blue) 0%, var(--brand-blue-2) 60%, var(--brand-green) 130%)" }}>
          <EnergyGrid faded />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 p-10 md:p-16 items-center">
            <div>
              <span className="eyebrow !text-[#B7E36A]"><span className="h-1.5 w-1.5 rounded-full bg-[#B7E36A]" /> Start saving today</span>
              <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Book a free site survey and savings report.</h3>
              <p className="mt-4 text-white/80 max-w-xl">Our engineers visit, audit your load profile and roof, and prepare a transparent ROI report — no obligation.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" className="btn-primary">Free Site Survey</Link>
              <Link to="/contact" className="btn-ghost-light">Book Consultation</Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function EnergyGrid({ faded = false }: { faded?: boolean }) {
  return (
    <svg className={`absolute inset-0 h-full w-full ${faded ? "opacity-20" : "opacity-30"}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(183,227,106,0.5)" />
          <stop offset="70%" stopColor="rgba(11,58,102,0)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="80%" cy="20%" r="280" fill="url(#glow)" className="animate-float-slow" />
    </svg>
  );
}

function EcosystemDiagram() {
  const items = [
    { icon: Sun, label: "Sunlight" },
    { icon: Zap, label: "Solar Plant" },
    { icon: Building2, label: "Building Load" },
    { icon: Plug, label: "EV Charger" },
    { icon: BatteryCharging, label: "Electric Vehicle" },
  ];
  return (
    <div className="mt-14 relative">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 relative">
        {items.map(({ icon: Icon, label }, i) => (
          <div key={label} className="relative flex flex-col items-center">
            <div className="h-20 w-20 rounded-2xl flex items-center justify-center text-white shadow-[0_18px_40px_-18px_rgba(11,58,102,0.5)]" style={{ background: i % 2 === 0 ? "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" : "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))" }}>
              <Icon size={28} />
            </div>
            <p className="mt-4 text-sm font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{label}</p>
            {i < items.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] right-[-40%] h-px">
                <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--brand-blue-2), var(--brand-green-2))" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
