import { useMemo, useState } from "react";

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

export function EVROI() {
  const [type, setType] = useState<"AC" | "DC">("DC");
  const [chargerCost, setChargerCost] = useState(type === "DC" ? 800000 : 50000);
  const [installCost, setInstallCost] = useState(120000);
  const [elecCost, setElecCost] = useState(8);
  const [sessions, setSessions] = useState(6);
  const [revPerSession, setRevPerSession] = useState(450);
  const [utilization, setUtilization] = useState(60);

  const { monthlyRev, monthlyProfit, annualRev, payback, roi } = useMemo(() => {
    const effSessions = sessions * (utilization / 100);
    const monthlyRev = effSessions * revPerSession * 30;
    const kwhPerSession = type === "DC" ? 25 : 10;
    const monthlyCost = effSessions * 30 * kwhPerSession * elecCost;
    const monthlyProfit = monthlyRev - monthlyCost;
    const annualRev = monthlyRev * 12;
    const totalInvest = chargerCost + installCost;
    const payback = monthlyProfit > 0 ? totalInvest / (monthlyProfit * 12) : Infinity;
    const roi = monthlyProfit > 0 ? ((monthlyProfit * 12 * 5 - totalInvest) / totalInvest) * 100 : 0;
    return { monthlyRev, monthlyProfit, annualRev, payback, roi };
  }, [type, chargerCost, installCost, elecCost, sessions, revPerSession, utilization]);

  const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div className="grid lg:grid-cols-2 gap-8 bg-white border border-border rounded-3xl p-6 md:p-10 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <div className="flex gap-2">
          {(["AC", "DC"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setType(t); setChargerCost(t === "DC" ? 800000 : 50000); }}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${type === t ? "text-white" : "bg-[var(--surface-2)] text-[var(--brand-blue)]"}`}
              style={type === t ? { background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))", fontFamily: "var(--font-display)" } : { fontFamily: "var(--font-display)" }}
            >
              {t === "AC" ? "AC Charger" : "DC Fast Charger"}
            </button>
          ))}
        </div>
        <Field label="Charger Cost" value={chargerCost} setValue={setChargerCost} min={20000} max={5000000} step={10000} />
        <Field label="Installation Cost" value={installCost} setValue={setInstallCost} min={10000} max={1000000} step={5000} />
        <Field label="Electricity Cost / kWh" value={elecCost} setValue={setElecCost} min={3} max={20} step={0.5} suffix=" ₹" />
        <Field label="Charging Sessions / day" value={sessions} setValue={setSessions} min={1} max={30} />
        <Field label="Revenue / session" value={revPerSession} setValue={setRevPerSession} min={50} max={2000} step={10} />
        <Field label="Utilization" value={utilization} setValue={setUtilization} min={10} max={100} suffix="%" />
      </div>
      <div className="grid grid-cols-2 gap-3 content-start">
        <Stat label="Monthly Revenue" value={fmt(monthlyRev)} />
        <Stat label="Monthly Profit" value={fmt(monthlyProfit)} accent />
        <Stat label="Annual Revenue" value={fmt(annualRev)} />
        <Stat label="Payback Period" value={isFinite(payback) ? `${payback.toFixed(1)} yrs` : "—"} />
        <Stat label="5-yr ROI" value={`${roi.toFixed(0)}%`} fill />
        <Stat label="Charger Type" value={type === "DC" ? "DC Fast" : "AC"} />
      </div>
    </div>
  );
}

function Stat({ label, value, accent, fill }: { label: string; value: string; accent?: boolean; fill?: boolean }) {
  return (
    <div className={`rounded-xl p-5 ${fill ? "text-white col-span-2" : "border border-border bg-white"}`} style={fill ? { background: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))" } : undefined}>
      <div className={`text-[11px] uppercase tracking-widest ${fill ? "text-white/80" : "text-[var(--ink-soft)]"}`}>{label}</div>
      <div className={`mt-1 font-semibold ${fill ? "text-3xl" : "text-xl"}`} style={{ fontFamily: "var(--font-display)", color: fill ? "#fff" : accent ? "var(--brand-green)" : "var(--brand-blue)" }}>{value}</div>
    </div>
  );
}