import type { ReactNode } from "react";

export function Section({
  children,
  tone = "white",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: "white" | "surface" | "surface-2" | "dark";
  id?: string;
  className?: string;
}) {
  const bg =
    tone === "white"
      ? "bg-white"
      : tone === "surface"
        ? "bg-[var(--surface)]"
        : tone === "surface-2"
          ? "bg-[var(--surface-2)]"
          : "bg-[var(--brand-blue)] text-white";
  return (
    <section id={id} className={`section-pad ${bg} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow" style={invert ? { color: "#B7E36A" } : undefined}>
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: invert ? "#B7E36A" : "var(--brand-green)" }} />
          {eyebrow}
        </span>
      )}
      <h2 className={`heading-lg mt-4 ${invert ? "!text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-[1.05rem] leading-relaxed ${invert ? "text-white/75" : "text-[var(--ink-soft)]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}