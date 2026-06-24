import logo from "@/assets/skylogo.png.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="SkySolar — Clean Energy and Sustainability Solutions"
      className={className}
      width={240}
      height={64}
    />
  );
}