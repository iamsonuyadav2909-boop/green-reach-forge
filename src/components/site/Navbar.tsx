import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/solar", label: "Solar" },
  { to: "/ev-charging", label: "EV Charging" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-xl border-b border-border shadow-[0_4px_24px_-12px_rgba(11,58,102,0.15)]" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-3 h-16 md:h-20 py-2 md:py-3">
        <Link to="/" className="flex items-center gap-2 min-w-0 shrink">
          <Logo className="h-8 md:h-11 w-auto max-w-[180px] sm:max-w-none" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? "text-[var(--brand-blue)] bg-[var(--surface-2)]" : "text-[var(--ink-soft)] hover:text-[var(--brand-blue)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+919999999999" className="hidden md:inline-flex btn-outline">
            <Phone size={16} /> +91 99999 99999
          </a>
          <Link to="/contact" className="hidden md:inline-flex btn-primary">Get Consultation</Link>
          <button
            className="lg:hidden h-11 w-11 rounded-full bg-white border border-border flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="px-3 py-3 rounded-lg text-[var(--ink)] hover:bg-[var(--surface-2)] font-medium">
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary mt-3 w-full">Get Free Consultation</Link>
          </div>
        </div>
      )}
    </header>
  );
}