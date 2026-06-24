import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LeadFormDialog } from "@/components/site/LeadForm";

function NumberInput({ label, value, setValue, min, max, step, suffix }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step?: number; suffix?: string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{label}</span>
        <span className="text-[var(--ink-soft)]">{value.toLocaleString("en-IN")}{suffix}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step ?? 1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--brand-green-2)]"
      />
    </label>
  );
}

export function SolarEMI() {
  const [size, setSize] = useState(5);
  const [cost, setCost] = useState(300000);
  const [down, setDown] = useState(60000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(60);

  const { emi, total, interest, principal } = useMemo(() => {
    const p = Math.max(0, cost - down);
    const r = rate / 12 / 100;
    const n = tenure;
    const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi, total, interest: total - p, principal: p };
  }, [cost, down, rate, tenure]);

  const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
  const pct = principal === 0 ? 0 : (interest / total) * 100;

  return (
    <div className="grid lg:grid-cols-2 gap-8 bg-white border border-border rounded-3xl p-6 md:p-10 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <NumberInput label="System Size" value={size} setValue={setSize} min={1} max={500} suffix=" kW" />
        <NumberInput label="Project Cost" value={cost} setValue={setCost} min={50000} max={50000000} step={10000} suffix="" />
        <NumberInput label="Down Payment" value={down} setValue={setDown} min={0} max={Math.max(0, cost)} step={5000} />
        <NumberInput label="Interest Rate" value={rate} setValue={setRate} min={6} max={18} step={0.1} suffix="%" />
        <NumberInput label="Loan Tenure" value={tenure} setValue={setTenure} min={12} max={120} suffix=" months" />
      </div>
      <div className="bg-[var(--surface-2)] rounded-2xl p-6 md:p-8 flex flex-col">
        <div className="text-xs uppercase tracking-widest text-[var(--ink-soft)]">Monthly EMI</div>
        <div className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mt-1" style={{ fontFamily: "var(--font-display)" }}>{fmt(emi)}</div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Stat label="Principal" value={fmt(principal)} />
          <Stat label="Total Interest" value={fmt(interest)} />
          <Stat label="Total Repayment" value={fmt(total)} />
          <Stat label="System Size" value={`${size} kW`} />
        </div>
        <div className="mt-6">
          <div className="text-xs text-[var(--ink-soft)] mb-2">Principal vs Interest</div>
          <div className="h-3 w-full rounded-full overflow-hidden bg-white border border-border flex">
            <div className="h-full" style={{ width: `${100 - pct}%`, background: "var(--brand-blue-2)" }} />
            <div className="h-full" style={{ width: `${pct}%`, background: "var(--brand-green-2)" }} />
          </div>
          <div className="flex justify-between text-xs mt-2 text-[var(--ink-soft)]">
            <span><span className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle" style={{ background: "var(--brand-blue-2)" }} />Principal</span>
            <span><span className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle" style={{ background: "var(--brand-green-2)" }} />Interest</span>
          </div>
        </div>
        <div className="mt-6">
          <LeadFormDialog
            prefill={{
              service: size <= 10 ? "residential-solar" : size <= 100 ? "commercial-solar" : "industrial-solar",
              systemSize: size,
              projectCost: cost,
              downPayment: down,
              loanTenure: tenure,
              sourceLabel: "Solar EMI Calculator",
            }}
            trigger={
              <button type="button" className="btn-primary w-full justify-center">
                Get Custom Quote with these inputs <ArrowRight size={16} />
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className="text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">{label}</div>
      <div className="text-lg font-semibold text-[var(--brand-blue)] mt-1" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </div>
  );
}