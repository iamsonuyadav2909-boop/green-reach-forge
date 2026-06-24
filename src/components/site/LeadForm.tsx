import { useEffect, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, BatteryCharging, Building2, Check, CheckCircle2, Factory, Home as HomeIcon, IndianRupee, Plug, Send, Sun, Wrench, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export type LeadService =
  | "residential-solar"
  | "commercial-solar"
  | "industrial-solar"
  | "ev-home"
  | "ev-commercial"
  | "om-amc";

export type LeadPrefill = {
  service?: LeadService;
  // Solar / EMI / ROI
  systemSize?: number;       // kW
  projectCost?: number;      // INR
  monthlyBill?: number;      // INR
  downPayment?: number;
  loanTenure?: number;       // months
  // EV
  chargerType?: "AC" | "DC";
  chargers?: number;
  monthlyRevenue?: number;
  paybackYears?: number;
  // Optional context label
  sourceLabel?: string;
};

const services: { id: LeadService; label: string; icon: typeof HomeIcon; hint: string }[] = [
  { id: "residential-solar", label: "Residential Rooftop Solar", icon: HomeIcon, hint: "1–10 kW · home rooftop" },
  { id: "commercial-solar", label: "Commercial Solar", icon: Building2, hint: "10 kW – 1 MW · offices, retail" },
  { id: "industrial-solar", label: "Industrial Solar EPC", icon: Factory, hint: "MW-scale · captive plants" },
  { id: "ev-home", label: "EV Charging — Home / Society", icon: Plug, hint: "AC 3.3 – 22 kW chargers" },
  { id: "ev-commercial", label: "EV Charging — Commercial / DC Fast", icon: BatteryCharging, hint: "60 – 240 kW DC hubs" },
  { id: "om-amc", label: "O&M / AMC", icon: Wrench, hint: "Maintenance & monitoring" },
];

const isEv = (s?: LeadService) => s === "ev-home" || s === "ev-commercial";
const isSolar = (s?: LeadService) => s === "residential-solar" || s === "commercial-solar" || s === "industrial-solar";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  city: z.string().trim().min(2, "City is required").max(80),
  notes: z.string().max(800).optional().or(z.literal("")),
});

type FormState = {
  service?: LeadService;
  // step 2
  systemSize?: number;
  projectCost?: number;
  monthlyBill?: number;
  roofArea?: number;
  propertyType?: string;
  chargerType?: "AC" | "DC";
  chargers?: number;
  parkingSlots?: number;
  budget?: string;
  timeline?: string;
  financing?: "Cash" | "EMI" | "OPEX/PPA" | "Not sure";
  // step 3
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
  // meta
  source?: string;
};

function init(prefill?: LeadPrefill): FormState {
  return {
    service: prefill?.service,
    systemSize: prefill?.systemSize,
    projectCost: prefill?.projectCost,
    monthlyBill: prefill?.monthlyBill,
    chargerType: prefill?.chargerType,
    chargers: prefill?.chargers,
    name: "",
    phone: "",
    email: "",
    city: "",
    notes: "",
    source: prefill?.sourceLabel,
  };
}

function fmtINR(n?: number) {
  if (!n && n !== 0) return "—";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function MultiStepLeadForm({
  prefill,
  onClose,
  compact,
}: {
  prefill?: LeadPrefill;
  onClose?: () => void;
  compact?: boolean;
}) {
  const [step, setStep] = useState(prefill?.service ? 1 : 0);
  const [data, setData] = useState<FormState>(() => init(prefill));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setData(init(prefill));
    setStep(prefill?.service ? 1 : 0);
    setSubmitted(false);
    setErrors({});
  }, [prefill?.service, prefill?.sourceLabel]);

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const canNext = useMemo(() => {
    if (step === 0) return !!data.service;
    if (step === 1) {
      if (isSolar(data.service)) return !!data.systemSize || !!data.monthlyBill;
      if (isEv(data.service)) return !!data.chargerType && (data.chargers ?? 0) > 0;
      return !!data.timeline;
    }
    if (step === 2) {
      const r = contactSchema.safeParse({
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: data.city,
        notes: data.notes,
      });
      return r.success;
    }
    return true;
  }, [step, data]);

  function validateContact(): boolean {
    const r = contactSchema.safeParse({
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.city,
      notes: data.notes,
    });
    if (r.success) {
      setErrors({});
      return true;
    }
    const e: Partial<Record<keyof FormState, string>> = {};
    r.error.issues.forEach((i) => {
      const k = i.path[0] as keyof FormState;
      if (!e[k]) e[k] = i.message;
    });
    setErrors(e);
    return false;
  }

  function next() {
    if (step === 2 && !validateContact()) return;
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submit() {
    // No backend wired — surface as success state. Payload kept ready for future server fn.
    // eslint-disable-next-line no-console
    console.info("[LeadForm] submission payload", { ...data, _source: data.source });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`text-center ${compact ? "p-2" : "p-4"}`}>
        <div className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))" }}>
          <Check size={28} />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>
          Thanks, {data.name.split(" ")[0] || "there"} — we've got your details.
        </h3>
        <p className="mt-2 text-[var(--ink-soft)]">
          A SkySolar specialist will call you on <strong>{data.phone}</strong> within 24 hours with a tailored proposal.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="btn-primary">Chat on WhatsApp</a>
          {onClose && <button onClick={onClose} className="btn-outline">Close</button>}
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "bg-white border border-border rounded-3xl shadow-[var(--shadow-card)]"}>
      <div className={`${compact ? "" : "p-6 md:p-10"}`}>
        {/* Progress */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-[var(--ink-soft)] mb-2">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{["Service", "Project", "Contact", "Review"][step]}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--surface-2)] overflow-hidden">
              <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--brand-blue-2), var(--brand-green-2))" }} />
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} aria-label="Close" className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--brand-blue)]">
              <X size={16} />
            </button>
          )}
        </div>

        {data.source && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-xs text-[var(--brand-blue)]">
            <Sun size={12} className="text-[var(--brand-green)]" />
            Prefilled from <strong className="ml-1">{data.source}</strong>
          </div>
        )}

        {/* STEP 0 — Service */}
        {step === 0 && (
          <div>
            <StepTitle title="What can we help you with?" subtitle="Pick the service closest to your need — we'll tailor the next steps." />
            <div className="grid sm:grid-cols-2 gap-3">
              {services.map(({ id, label, icon: Icon, hint }) => {
                const active = data.service === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { set("service", id); setStep(1); }}
                    className={`text-left rounded-2xl p-4 border transition-all flex gap-3 items-start ${active ? "border-[var(--brand-green-2)] bg-[color-mix(in_srgb,var(--brand-green-2)_8%,white)]" : "border-border bg-white hover:border-[var(--brand-blue-2)]"}`}
                  >
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: active ? "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))" : "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{label}</div>
                      <div className="text-xs text-[var(--ink-soft)] mt-1">{hint}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 1 — Project details */}
        {step === 1 && (
          <div>
            <StepTitle title="Tell us about your project" subtitle="These help us qualify load, sizing and ROI before the site survey." />
            {isSolar(data.service) && (
              <div className="grid sm:grid-cols-2 gap-5">
                <RangeInput label="Desired System Size" min={1} max={500} value={data.systemSize ?? 5} onChange={(v) => set("systemSize", v)} suffix=" kW" />
                <RangeInput label="Average Monthly Bill" min={500} max={500000} step={500} value={data.monthlyBill ?? 8000} onChange={(v) => set("monthlyBill", v)} suffix="" prefix="₹" />
                <RangeInput label="Approx. Project Cost" min={50000} max={50000000} step={10000} value={data.projectCost ?? 300000} onChange={(v) => set("projectCost", v)} prefix="₹" />
                <RangeInput label="Available Roof Area" min={100} max={100000} step={50} value={data.roofArea ?? 500} onChange={(v) => set("roofArea", v)} suffix=" sq ft" />
                <SelectInput label="Property Type" value={data.propertyType ?? ""} onChange={(v) => set("propertyType", v)} options={["Independent home", "Apartment / Society", "Office / Retail", "Warehouse / Factory", "Institution", "Other"]} />
                <SelectInput label="Financing Preference" value={data.financing ?? ""} onChange={(v) => set("financing", v as FormState["financing"])} options={["Cash", "EMI", "OPEX/PPA", "Not sure"]} />
                <SelectInput label="Timeline" value={data.timeline ?? ""} onChange={(v) => set("timeline", v)} options={["Immediate (< 1 month)", "1 – 3 months", "3 – 6 months", "Just exploring"]} />
              </div>
            )}

            {isEv(data.service) && (
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Label>Charger Type</Label>
                  <div className="mt-2 flex gap-2">
                    {(["AC", "DC"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("chargerType", t)}
                        className={`flex-1 rounded-xl py-3 text-sm font-semibold border ${data.chargerType === t ? "text-white border-transparent" : "border-border bg-white text-[var(--brand-blue)]"}`}
                        style={data.chargerType === t ? { background: "linear-gradient(135deg, var(--brand-blue), var(--brand-blue-2))" } : undefined}
                      >
                        {t === "AC" ? "AC (3.3 – 22 kW)" : "DC Fast (60 – 240 kW)"}
                      </button>
                    ))}
                  </div>
                </div>
                <RangeInput label="Number of Chargers" min={1} max={50} value={data.chargers ?? 2} onChange={(v) => set("chargers", v)} />
                <RangeInput label="Parking Slots Available" min={1} max={500} value={data.parkingSlots ?? 4} onChange={(v) => set("parkingSlots", v)} />
                <SelectInput label="Site Type" value={data.propertyType ?? ""} onChange={(v) => set("propertyType", v)} options={["Home / Society", "Office / Mall", "Hotel / Resort", "Highway / Public", "Fleet Depot", "Other"]} />
                <SelectInput label="Timeline" value={data.timeline ?? ""} onChange={(v) => set("timeline", v)} options={["Immediate (< 1 month)", "1 – 3 months", "3 – 6 months", "Just exploring"]} />
              </div>
            )}

            {data.service === "om-amc" && (
              <div className="grid sm:grid-cols-2 gap-5">
                <RangeInput label="Existing System Size" min={1} max={5000} value={data.systemSize ?? 25} onChange={(v) => set("systemSize", v)} suffix=" kW" />
                <SelectInput label="System Age" value={data.propertyType ?? ""} onChange={(v) => set("propertyType", v)} options={["< 1 year", "1 – 3 years", "3 – 5 years", "5+ years"]} />
                <SelectInput label="Service Needed" value={data.budget ?? ""} onChange={(v) => set("budget", v)} options={["One-time inspection", "Annual AMC", "Repair / Fault diagnosis", "Performance audit"]} />
                <SelectInput label="Timeline" value={data.timeline ?? ""} onChange={(v) => set("timeline", v)} options={["Immediate", "Within a month", "Just exploring"]} />
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Contact */}
        {step === 2 && (
          <div>
            <StepTitle title="How should we reach you?" subtitle="A specialist will call within 24 hours. No spam — ever." />
            <div className="grid sm:grid-cols-2 gap-5">
              <TextInput label="Full name" value={data.name} onChange={(v) => set("name", v)} error={errors.name} required />
              <TextInput label="Phone" type="tel" value={data.phone} onChange={(v) => set("phone", v)} error={errors.phone} required placeholder="+91…" />
              <TextInput label="Email" type="email" value={data.email} onChange={(v) => set("email", v)} error={errors.email} />
              <TextInput label="City / Site location" value={data.city} onChange={(v) => set("city", v)} error={errors.city} required />
              <div className="sm:col-span-2">
                <Label>Anything else we should know?</Label>
                <textarea
                  rows={3}
                  value={data.notes}
                  maxLength={800}
                  onChange={(e) => set("notes", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-[var(--brand-green-2)]"
                  placeholder="Roof orientation, load profile, deadlines…"
                />
                {errors.notes && <p className="mt-1 text-xs text-red-600">{errors.notes}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Review */}
        {step === 3 && (
          <div>
            <StepTitle title="Review and submit" subtitle="Confirm your details — we'll get back within 24 hours." />
            <div className="rounded-2xl border border-border bg-[var(--surface-2)] p-6 grid sm:grid-cols-2 gap-4 text-sm">
              <ReviewItem label="Service" value={services.find((s) => s.id === data.service)?.label ?? "—"} />
              {isSolar(data.service) && (
                <>
                  <ReviewItem label="System Size" value={data.systemSize ? `${data.systemSize} kW` : "—"} />
                  <ReviewItem label="Monthly Bill" value={fmtINR(data.monthlyBill)} />
                  <ReviewItem label="Project Cost" value={fmtINR(data.projectCost)} />
                  <ReviewItem label="Roof Area" value={data.roofArea ? `${data.roofArea} sq ft` : "—"} />
                  <ReviewItem label="Property" value={data.propertyType || "—"} />
                  <ReviewItem label="Financing" value={data.financing || "—"} />
                </>
              )}
              {isEv(data.service) && (
                <>
                  <ReviewItem label="Charger Type" value={data.chargerType ?? "—"} />
                  <ReviewItem label="Chargers" value={String(data.chargers ?? "—")} />
                  <ReviewItem label="Parking Slots" value={String(data.parkingSlots ?? "—")} />
                  <ReviewItem label="Site Type" value={data.propertyType || "—"} />
                </>
              )}
              {data.service === "om-amc" && (
                <>
                  <ReviewItem label="System Size" value={data.systemSize ? `${data.systemSize} kW` : "—"} />
                  <ReviewItem label="System Age" value={data.propertyType || "—"} />
                  <ReviewItem label="Service" value={data.budget || "—"} />
                </>
              )}
              <ReviewItem label="Timeline" value={data.timeline || "—"} />
              <ReviewItem label="Name" value={data.name} />
              <ReviewItem label="Phone" value={data.phone} />
              {data.email && <ReviewItem label="Email" value={data.email} />}
              <ReviewItem label="City" value={data.city} />
              {data.notes && <ReviewItem label="Notes" value={data.notes} full />}
            </div>
            <p className="mt-4 text-xs text-[var(--ink-soft)] flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[var(--brand-green)] mt-0.5 shrink-0" />
              By submitting you agree to be contacted by SkySolar about your enquiry. We never share your details.
            </p>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="text-xs text-[var(--ink-soft)] flex items-center gap-2">
            <IndianRupee size={12} /> Free, no-obligation quote
          </div>
          {step < totalSteps - 1 ? (
            <button type="button" onClick={next} disabled={!canNext} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button type="button" onClick={submit} className="btn-primary">
              Submit Enquiry <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-[var(--ink-soft)]">{subtitle}</p>}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="text-sm font-medium text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{children}</span>;
}

function TextInput({ label, value, onChange, type = "text", required, placeholder, error }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; error?: string }) {
  return (
    <label className="block">
      <Label>{label}{required && <span className="text-[var(--brand-green)]"> *</span>}</Label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={type === "email" ? 160 : 100}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-[var(--brand-green-2)] ${error ? "border-red-400" : "border-border"}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-[var(--brand-green-2)]"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function RangeInput({ label, value, onChange, min, max, step, suffix, prefix }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; suffix?: string; prefix?: string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm">
        <Label>{label}</Label>
        <span className="text-[var(--ink-soft)]">{prefix}{value.toLocaleString("en-IN")}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--brand-green-2)]"
      />
    </label>
  );
}

function ReviewItem({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <div className="text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">{label}</div>
      <div className="mt-1 font-semibold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </div>
  );
}

/* -------- Dialog launcher -------- */

export function LeadFormDialog({
  trigger,
  prefill,
  open,
  onOpenChange,
}: {
  trigger?: ReactNode;
  prefill?: LeadPrefill;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;
  const setOpen = (o: boolean) => {
    if (!isControlled) setInternalOpen(o);
    onOpenChange?.(o);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Get a tailored SkySolar quote</DialogTitle>
          <DialogDescription>Multi-step lead form to qualify your solar or EV charging project.</DialogDescription>
        </DialogHeader>
        <MultiStepLeadForm prefill={prefill} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}