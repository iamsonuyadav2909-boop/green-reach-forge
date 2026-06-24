import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Section, SectionHeader } from "@/components/site/Section";
import { PageHero } from "@/components/site/PageHero";
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
  const [sent, setSent] = useState(false);
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
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="bg-white border border-border rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] grid gap-5"
            >
              <h3 className="text-2xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>Request a free consultation</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full name" required />
                <Input label="Phone" type="tel" required />
                <Input label="Email" type="email" />
                <Input label="City / Site location" required />
              </div>
              <label className="block">
                <span className="text-sm font-medium text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>I am interested in</span>
                <select className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-[var(--brand-green-2)]">
                  <option>Residential Rooftop Solar</option>
                  <option>Commercial Solar</option>
                  <option>Industrial Solar EPC</option>
                  <option>EV Charging — Home / Society</option>
                  <option>EV Charging — Commercial / DC Fast</option>
                  <option>O&M / AMC</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>Tell us about your project</span>
                <textarea rows={4} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-[var(--brand-green-2)]" placeholder="Monthly bill, roof area, timelines…" />
              </label>
              <button type="submit" className="btn-primary justify-self-start">
                {sent ? "Thanks — we'll be in touch" : (<>Send Enquiry <Send size={16} /></>)}
              </button>
            </form>
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

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{label}{required && <span className="text-[var(--brand-green)]"> *</span>}</span>
      <input type={type} required={required} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-[var(--brand-green-2)]" />
    </label>
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