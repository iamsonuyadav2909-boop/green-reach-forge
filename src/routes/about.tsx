import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Flag, HeartHandshake, Layers, Target } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
import engineer from "@/assets/engineer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SkySolar — Clean Energy & Sustainability" },
      { name: "description", content: "SkySolar Private Limited is a Bhopal-based clean energy and EV infrastructure company delivering turnkey solar EPC and charging hubs." },
      { property: "og:title", content: "About SkySolar" },
      { property: "og:description", content: "A Bhopal-based clean energy and EV infrastructure company." },
      { property: "og:image", content: engineer },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About SkySolar"
        title={<>A clean energy company built for the <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#B7E36A,#3AA76D)" }}>next 25 years.</span></>}
        description="Headquartered in Bhopal, Madhya Pradesh, SkySolar Private Limited delivers turnkey solar EPC and EV charging infrastructure for homes, businesses and industries across India."
        image={engineer}
      />

      <Section tone="white">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Our story" title="Engineering the shift to clean energy." description="SkySolar was founded with one belief — that India's energy transition needs accountable, high-performance EPC partners, not just installers. Today we deliver solar and EV infrastructure with the same discipline as utility-scale developers, at every project size." />
            <p className="mt-6 text-[var(--ink-soft)] leading-relaxed">
              Our team brings decades of combined experience across solar EPC, electrical engineering, power
              electronics and project management. We obsess over module quality, BoS reliability, monitoring
              and after-sales service — because energy assets must perform for 25 years, not 25 months.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
            <img src={engineer} alt="SkySolar engineer" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Mission", desc: "Accelerate India's transition to clean energy and sustainable mobility through high-performance EPC." },
            { icon: Eye, title: "Vision", desc: "To be the most trusted clean energy and EV infrastructure partner in central India by 2030." },
            { icon: HeartHandshake, title: "Values", desc: "Engineering rigour, transparent pricing, long-term accountability and zero compromise on safety." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-elevated p-8">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" }}>
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-2 text-[var(--ink-soft)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="The way we work" title="A disciplined, end-to-end delivery model." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Compass, title: "Feasibility-first", desc: "We model returns before we design — never the other way around." },
            { icon: Layers, title: "Tier-1 only", desc: "MNRE-empanelled modules, IEC-certified BoS, no shortcuts." },
            { icon: Flag, title: "Single accountability", desc: "One project lead from contract to commissioning to AMC." },
            { icon: HeartHandshake, title: "Long-term partnership", desc: "SLA-backed O&M relationships — measured in decades." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-6 hover:border-[var(--brand-green-2)] transition-colors">
              <Icon size={22} className="text-[var(--brand-green)]" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}