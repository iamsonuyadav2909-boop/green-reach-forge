import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LeadFormDialog } from "@/components/site/LeadForm";

function Field({ label, value, setValue, min, max, step, suffix }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step?: number; suffix?: string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{label}</span>
        <span className="text-[var(--ink-soft)]">{value.toLocaleString("en-IN")}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step ?? 1} value={value} onChange={(e) => setValue(Number(e.target.value))} className="mt-2 w-full accent-[var(--brand-green-2)]" />
    </label>
  );
}

export function SolarROI() {
  const [bill, setBill] = useState(8000);
  const [size, setSize] = useState(5);
  const [cost, setCost] = useState(280000);
  const [subsidy, setSubsidy] = useState(78000);
  const [tariffGrowth, setTariffGrowth] = useState(5);

  const { monthly, annual, payback, total25, roi, years } = useMemo(() => {
    const monthlySavings = Math.min(bill, size * 130 * 4); // 4 units/kW/day, ~130/month/kW capacity factor approximation
    const annualSavings = monthlySavings * 12;
    const net = Math.max(1, cost - subsidy);
    const payback = net / annualSavings;
    let cumulative = 0;
    const years: { year: number; savings: number; cumulative: number }[] = [];
    for (let y = 1; y <= 25; y++) {
      const s = annualSavings * Math.pow(1 + tariffGrowth / 100, y - 1);
      cumulative += s;
      years.push({ year: y, savings: s, cumulative });
    }
    const total25 = cumulative;
    const roi = ((total25 - net) / net) * 100;
    return { monthly: monthlySavings, annual: annualSavings, payback, total25, roi, years };
  }, [bill, size, cost, subsidy, tariffGrowth]);

  const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
  const maxC = years[years.length - 1].cumulative;

  return (
    <div className="grid lg:grid-cols-2 gap-8 bg-white border border-border rounded-3xl p-6 md:p-10 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <Field label="Monthly Electricity Bill" value={bill} setValue={setBill} min={500} max={500000} step={500} suffix="" />
        <Field label="System Size" value={size} setValue={setSize} min={1} max={500} suffix=" kW" />
        <Field label="Project Cost" value={cost} setValue={setCost} min={50000} max={50000000} step={10000} />
        <Field label="Subsidy Amount" value={subsidy} setValue={setSubsidy} min={0} max={300000} step={1000} />
        <Field label="Annual Tariff Increase" value={tariffGrowth} setValue={setTariffGrowth} min={0} max={12} step={0.5} suffix="%" />
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Monthly Savings" value={fmt(monthly)} accent />
          <Stat label="Annual Savings" value={fmt(annual)} />
          <Stat label="Payback Period" value={`${payback.toFixed(1)} yrs`} />
          <Stat label="ROI (25 yr)" value={`${roi.toFixed(0)}%`} accent />
          <Stat label="25-yr Savings" value={fmt(total25)} fill />
        </div>
        <div className="bg-[var(--surface-2)] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-[var(--ink-soft)] mb-3">25-year cumulative savings</div>
          <svg viewBox="0 0 300 120" className="w-full h-32">
            <defs>
              <linearGradient id="savings" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3AA76D" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3AA76D" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const pts = years.map((y, i) => `${(i / 24) * 300},${120 - (y.cumulative / maxC) * 110}`).join(" ");
              return (
                <>
                  <polyline points={`0,120 ${pts} 300,120`} fill="url(#savings)" />
                  <polyline points={pts} fill="none" stroke="#2E8B57" strokeWidth="2" />
                </>
              );
            })()}
          </svg>
          <div className="flex justify-between text-[11px] text-[var(--ink-soft)] mt-1"><span>Yr 1</span><span>Yr 25</span></div>
        </div>
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" }}>
          <div className="text-xs uppercase tracking-widest opacity-80">Environmental Impact</div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div><div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{(size * 1.4 * 25).toFixed(0)} T</div><div className="text-xs opacity-80">CO₂ offset · 25 yr</div></div>
            <div><div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{Math.round(size * 60)}</div><div className="text-xs opacity-80">Trees equivalent</div></div>
          </div>
        </div>
        <LeadFormDialog
          prefill={{
            service: size <= 10 ? "residential-solar" : size <= 100 ? "commercial-solar" : "industrial-solar",
            systemSize: size,
            projectCost: cost,
            monthlyBill: bill,
            sourceLabel: "Solar ROI Calculator",
          }}
          trigger={
            <button type="button" className="btn-primary w-full justify-center">
              Get a personalised proposal <ArrowRight size={16} />
            </button>
          }
        />
      </div>
    </div>
  );
}

function Stat({ label, value, accent, fill }: { label: string; value: string; accent?: boolean; fill?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${fill ? "text-white" : "border border-border bg-white"}`} style={fill ? { background: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))" } : undefined}>
      <div className={`text-[11px] uppercase tracking-widest ${fill ? "text-white/80" : "text-[var(--ink-soft)]"}`}>{label}</div>
      <div className="text-lg font-semibold mt-1" style={{ fontFamily: "var(--font-display)", color: fill ? "#fff" : accent ? "var(--brand-green)" : "var(--brand-blue)" }}>{value}</div>
    </div>
  );
}