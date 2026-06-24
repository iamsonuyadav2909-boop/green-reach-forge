import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
import { MultiStepLeadForm } from "@/components/site/LeadForm";
import heroEv from "@/assets/hero-ev.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SkySolar — Solar & EV Charging Quotes" },
      { name: "description", content: "Get a free site survey, savings report or EV infrastructure consultation. Bhopal-based, projects across India." },
      { property: "og:title", content: "Contact SkySolar" },
      { property: "og:description", content: "Free site survey, solar quotes and EV charging consultation." },
      { property: "og:image", content: heroEv },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Get in touch"
        title={<>Let's design your <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#B7E36A,#3AA76D)" }}>clean energy future.</span></>}
        description="Tell us about your site and load profile — we'll come back with a transparent ROI report within 48 hours."
        image={heroEv}
      />

      <Section tone="white">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <MultiStepLeadForm prefill={{ sourceLabel: "Contact page" }} />
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <InfoCard icon={<MapPin size={18} />} title="Headquarters" body={<>SkySolar Private Limited<br/>Bhopal, Madhya Pradesh, India</>} />
            <InfoCard icon={<Phone size={18} />} title="Call us" body={<a href="tel:+919999999999" className="hover:text-[var(--brand-green)]">+91 99999 99999</a>} />
            <InfoCard icon={<Mail size={18} />} title="Email" body={<a href="mailto:hello@skysolar.in" className="hover:text-[var(--brand-green)]">hello@skysolar.in</a>} />
            <InfoCard icon={<MessageCircle size={18} />} title="WhatsApp" body={<a href="https://wa.me/919999999999" className="hover:text-[var(--brand-green)]">Chat with our team</a>} />

            <div className="rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <iframe
                title="SkySolar Bhopal"
                src="https://www.google.com/maps?q=Bhopal,Madhya+Pradesh&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-3xl p-6 text-white" style={{ background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" }}>
              <div className="text-xs uppercase tracking-widest text-[#B7E36A] font-semibold">Service Coverage</div>
              <p className="mt-3 text-white/85 leading-relaxed text-sm">
                Headquartered in Bhopal · Delivering projects across Madhya Pradesh, Maharashtra,
                Gujarat, Rajasthan, Chhattisgarh, Uttar Pradesh and beyond.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </SiteShell>
  );
}

function InfoCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface-2)] rounded-2xl p-6 flex gap-4">
      <div className="h-11 w-11 rounded-xl bg-white border border-border flex items-center justify-center text-[var(--brand-blue)] shrink-0">{icon}</div>
      <div>
        <div className="text-sm uppercase tracking-widest text-[var(--brand-green)] font-semibold">{title}</div>
        <div className="mt-1 text-[var(--ink)] leading-relaxed">{body}</div>
      </div>
    </div>
  );
}