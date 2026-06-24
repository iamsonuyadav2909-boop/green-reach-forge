import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(7,23,42,0.92) 0%, rgba(11,58,102,0.7) 60%, rgba(46,139,87,0.35) 100%)" }} />
      </div>
      <div className="container-page text-white pt-16 pb-24 md:pt-24 md:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1.5 text-xs font-medium tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B7E36A]" /> {eyebrow}
        </span>
        <h1 className="heading-xl mt-5 max-w-4xl !text-white">{title}</h1>
        <p className="mt-5 max-w-2xl text-white/80 text-lg leading-relaxed">{description}</p>
      </div>
    </section>
  );
}