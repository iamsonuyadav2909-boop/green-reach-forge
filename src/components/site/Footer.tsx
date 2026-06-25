import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-blue)] text-white mt-12">
      <div className="container-page py-12 md:py-20 grid grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-2 lg:col-span-5">
          <div className="bg-white inline-block rounded-xl p-3">
            <Logo className="h-10 w-auto" />
          </div>
          <p className="mt-6 text-white/75 max-w-md leading-relaxed">
            SkySolar Private Limited delivers turnkey solar EPC and EV charging infrastructure for homes,
            businesses and industries across India — engineered for performance, built for the long run.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#B7E36A" }}>Solar</h4>
          <ul className="space-y-3 text-white/75 text-sm">
            <li><Link to="/solar" className="hover:text-white">Residential</Link></li>
            <li><Link to="/solar" className="hover:text-white">Commercial</Link></li>
            <li><Link to="/solar" className="hover:text-white">Industrial</Link></li>
            <li><Link to="/solar" className="hover:text-white">EMI Calculator</Link></li>
            <li><Link to="/solar" className="hover:text-white">ROI Calculator</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#B7E36A" }}>EV Charging</h4>
          <ul className="space-y-3 text-white/75 text-sm">
            <li><Link to="/ev-charging" className="hover:text-white">Home Charging</Link></li>
            <li><Link to="/ev-charging" className="hover:text-white">DC Fast Charging</Link></li>
            <li><Link to="/ev-charging" className="hover:text-white">Fleet & Commercial</Link></li>
            <li><Link to="/ev-charging" className="hover:text-white">Consultancy</Link></li>
            <li><Link to="/ev-charging" className="hover:text-white">ROI Calculator</Link></li>
          </ul>
        </div>
        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#B7E36A" }}>Reach Us</h4>
          <ul className="space-y-4 text-white/80 text-sm">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" /><span>SkySolar Private Limited<br/>Bhopal, Madhya Pradesh, India</span></li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5" /><a href="tel:+919999999999">+91 99999 99999</a></li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5" /><a href="mailto:hello@skysolar.in">hello@skysolar.in</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} SkySolar Private Limited. All rights reserved.</p>
          <p>Powering Tomorrow with Clean Energy & Sustainable Mobility.</p>
        </div>
      </div>
    </footer>
  );
}