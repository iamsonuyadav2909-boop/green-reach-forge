import logo from "@/assets/skylogo.png.asset.json";

export function Logo({ className = "h-8 md:h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="SkySolar — Clean Energy and Sustainability Solutions"
      className={className}
      width={320}
      height={88}
      decoding="async"
      loading="eager"
    />
  );
}