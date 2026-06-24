import { MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="h-14 w-14 rounded-full flex items-center justify-center text-white shadow-[0_12px_30px_-8px_rgba(46,139,87,0.55)]"
        style={{ background: "linear-gradient(135deg, #2E8B57, #3AA76D)" }}
      >
        <MessageCircle size={22} />
      </a>
      <a
        href="tel:+919999999999"
        aria-label="Call"
        className="h-14 w-14 rounded-full bg-white text-[var(--brand-blue)] border border-border flex items-center justify-center shadow-[0_12px_30px_-12px_rgba(11,58,102,0.35)]"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}