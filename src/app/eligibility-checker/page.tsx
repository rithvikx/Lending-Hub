"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle, Loader2 } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const DEFAULT_PRODUCTS = [
  "Personal Loan",
  "Business Loan",
  "Loan Against Property",
  "Vehicle Loan",
  "Car Insurance",
  "Bike Insurance",
  "Health Insurance",
  "Life Insurance",
];

const employmentTypes = ["Salaried", "Self-Employed", "Business Owner", "Retired", "Other"];

const cities = [
  "Hyderabad", "Secunderabad", "Bengaluru", "Mumbai", "Delhi", "Chennai",
  "Pune", "Ahmedabad", "Kolkata", "Other",
];

const cibilRanges = [
  { label: "750 – 900 (Excellent)", value: "750+" },
  { label: "700 – 749 (Good)", value: "700-749" },
  { label: "650 – 699 (Fair)", value: "650-699" },
  { label: "Below 650 (Needs Improvement)", value: "<650" },
  { label: "I don't know my credit score", value: "unknown" },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
            style={{
              backgroundColor:
                i + 1 < current
                  ? "var(--color-secondary)"
                  : i + 1 === current
                  ? "var(--color-primary)"
                  : "var(--color-neutral-200)",
              color: i + 1 <= current ? "#ffffff" : "var(--color-neutral-500)",
            }}
          >
            {i + 1 < current ? <CheckCircle size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="w-10 h-0.5"
              style={{
                backgroundColor:
                  i + 1 < current ? "var(--color-secondary)" : "var(--color-neutral-200)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function meter(score: number): { label: string; color: string; pct: number } {
  if (score >= 80) return { label: "Excellent", color: "#10b981", pct: score };
  if (score >= 60) return { label: "Good", color: "#f59e0b", pct: score };
  if (score >= 40) return { label: "Fair", color: "#f97316", pct: score };
  return { label: "Needs More Info", color: "#ef4444", pct: score };
}

export default function EligibilityCheckerPage() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    employmentType: "",
    income: "",
    city: "",
    age: "",
    cibil: "",
    product: "",
  });

  // Fetch dynamic product list from CMS
  useEffect(() => {
    fetch("/api/cms/list")
      .then((r) => r.json())
      .then((data: { category: string; slug: string; title: string }[]) => {
        const titles = data.map((p) => p.title).filter(Boolean);
        if (titles.length > 0) setProducts(titles);
      })
      .catch(() => {});
  }, []);

  const readiness = (() => {
    let score = 30;
    if (form.cibil === "750+") score += 30;
    else if (form.cibil === "700-749") score += 20;
    else if (form.cibil === "650-699") score += 10;
    else if (form.cibil === "unknown") score += 5;

    const income = Number(form.income);
    if (income >= 75000) score += 25;
    else if (income >= 35000) score += 18;
    else if (income >= 15000) score += 10;

    if (["Salaried", "Business Owner"].includes(form.employmentType)) score += 15;
    return Math.min(score, 100);
  })();

  const m = meter(readiness);

  const handleNext = () => { if (step < 4) setStep((s) => (s + 1) as Step); };
  const handleBack = () => { if (step > 1) setStep((s) => (s - 1) as Step); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, readiness, source: "eligibility-checker" }),
    });
    setLoading(false);
    setStep(4);
  };

  return (
    <main className="section" style={{ backgroundColor: "var(--color-neutral-50)" }}>
      <div className="container-lh max-w-2xl">
        <div className="text-center mb-10">
          <p className="section-label">Tools</p>
          <h1 className="section-title mx-auto" style={{ fontFamily: "var(--font-display)" }}>
            Eligibility Checker
          </h1>
          <p className="section-subtitle mx-auto mt-3">
            4 quick steps to understand your loan or insurance readiness.
          </p>
        </div>

        <StepIndicator current={step} total={4} />

        <div className="card p-8 md:p-10">
          {/* Step 1 — Employment */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                What best describes you?
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--color-neutral-500)" }}>Select your employment type.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {employmentTypes.map((t) => (
                  <button key={t} id={`emp-${t.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setForm({ ...form, employmentType: t })}
                    className="p-4 rounded-xl border-2 text-sm font-semibold transition-all"
                    style={{
                      borderColor: form.employmentType === t ? "var(--color-primary)" : "var(--color-neutral-200)",
                      backgroundColor: form.employmentType === t ? "var(--color-primary-light)" : "#ffffff",
                      color: form.employmentType === t ? "var(--color-primary)" : "var(--color-neutral-700)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button id="step1-next" className="btn btn-primary w-full mt-6" disabled={!form.employmentType} onClick={handleNext}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2 — Income */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                Tell us about your income
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--color-neutral-500)" }}>Monthly income, city, and age helps us assess eligibility.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="label-lh" htmlFor="eligibility-income">Monthly Income (₹) *</label>
                  <input id="eligibility-income" type="number" className="input-lh" placeholder="e.g. 50000"
                    value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} required />
                </div>
                <div>
                  <label className="label-lh" htmlFor="eligibility-city">City *</label>
                  <select id="eligibility-city" className="input-lh" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required>
                    <option value="">Select your city</option>
                    {cities.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-lh" htmlFor="eligibility-age">Age *</label>
                  <input id="eligibility-age" type="number" className="input-lh" placeholder="e.g. 30" min={21} max={65}
                    value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button id="step2-back" className="btn btn-secondary flex-1" onClick={handleBack}>← Back</button>
                <button id="step2-next" className="btn btn-primary flex-1" disabled={!form.income || !form.city} onClick={handleNext}>
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Credit & product */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                Credit profile &amp; product
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--color-neutral-500)" }}>This helps calculate your eligibility readiness.</p>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="label-lh">Your approximate CIBIL / credit score range</label>
                  <div className="flex flex-col gap-2">
                    {cibilRanges.map((c) => (
                      <label key={c.value} className="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all"
                        style={{
                          borderColor: form.cibil === c.value ? "var(--color-primary)" : "var(--color-neutral-200)",
                          backgroundColor: form.cibil === c.value ? "var(--color-primary-light)" : "#ffffff",
                        }}
                      >
                        <input type="radio" name="cibil" value={c.value} checked={form.cibil === c.value}
                          onChange={() => setForm({ ...form, cibil: c.value })} className="accent-blue-500" id={`cibil-${c.value}`} />
                        <span className="text-sm font-medium" style={{ color: form.cibil === c.value ? "var(--color-primary)" : "var(--color-neutral-700)" }}>
                          {c.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-lh" htmlFor="eligibility-product">Product I&apos;m Interested In</label>
                  <select id="eligibility-product" className="input-lh" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
                    <option value="">Select product</option>
                    {products.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" id="step3-back" className="btn btn-secondary flex-1" onClick={handleBack}>← Back</button>
                <button id="step3-submit" type="submit" className="btn btn-primary flex-1" disabled={!form.cibil || loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Check My Readiness →"}
                </button>
              </div>
              <p className="compliance-text text-center mt-4">Submission does not guarantee approval. For information only.</p>
            </form>
          )}

          {/* Step 4 — Result */}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                Your Eligibility Readiness
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-neutral-500)" }}>Based on the details you provided.</p>
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-40 h-40 mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-neutral-100)" strokeWidth="12" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke={m.color} strokeWidth="12"
                      strokeDasharray={`${(m.pct / 100) * 314} 314`} strokeLinecap="round" className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: m.color }}>{readiness}%</span>
                    <span className="text-xs font-semibold" style={{ color: "var(--color-neutral-500)" }}>{m.label}</span>
                  </div>
                </div>
                <p className="text-sm max-w-xs" style={{ color: "var(--color-neutral-600)" }}>
                  {readiness >= 70
                    ? "You appear to have strong eligibility. Connect with an advisor to explore your options."
                    : readiness >= 50
                    ? "You have fair eligibility. An advisor can help you understand the best options available."
                    : "Our advisors can help you understand how to improve eligibility and explore available options."}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/apply" id="eligibility-result-apply" className="btn btn-primary btn-lg w-full">
                  View Matching Offers → Apply Now
                </Link>
                <Link href="/contact" id="eligibility-result-advisor" className="btn btn-secondary w-full">
                  Talk to an Advisor
                </Link>
              </div>
              <p className="compliance-text text-center mt-4">
                This is an indicative result only. Actual eligibility is assessed by the lending/insurance partner.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
