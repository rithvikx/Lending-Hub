"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle, Loader2, Phone } from "lucide-react";

const products = [
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

export default function ApplyPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    product: "",
    income: "",
    employmentType: "",
    city: "",
    consent: false,
  });

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.product) return;
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setLoading(true);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "apply-page" }),
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <main
      className="section"
      style={{
        background: "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 45%, #f8faff 100%)",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="container-lh max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="section-label">Apply</p>
          <h1 className="section-title mx-auto" style={{ fontFamily: "var(--font-display)" }}>
            Apply Now
          </h1>
          <p className="section-subtitle mx-auto mt-3">
            Two simple steps we&apos;ll capture your details and have an advisor call you back.
          </p>
        </div>

        {/* Reassurance strip */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl mb-7 text-sm font-medium"
          style={{
            backgroundColor: "var(--color-secondary-light)",
            border: "1px solid rgba(0,41,122,0.12)",
          }}
        >
          <Phone size={16} style={{ color: "var(--color-secondary)" }} className="flex-shrink-0" />
          <span style={{ color: "var(--color-secondary)" }}>
            Need help? Call Lending Hub directly:{" "}
            <a href="tel:+914040890152" className="font-bold hover:underline">+91 40 40890152</a>
            {" "}or{" "}
            <a href="tel:+919885660222" className="font-bold hover:underline">+91 9885660222</a>
          </span>
        </div>

        <div className="card p-8 md:p-10">
          {done ? (
            /* Success state */
            <div className="text-center py-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#e6faf0" }}
              >
                <CheckCircle size={36} style={{ color: "#0d7a45" }} />
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
              >
                Application Received!
              </h2>
              <p className="text-sm mb-2" style={{ color: "var(--color-neutral-500)" }}>
                Thank you, <strong>{form.name}</strong>. A Lending Hub advisor will call{" "}
                <strong>+91 {form.mobile}</strong> shortly regarding your{" "}
                <strong>{form.product}</strong> enquiry.
              </p>
              <p className="compliance-text mb-7">
                Submission does not guarantee approval. Terms and eligibility criteria apply.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/emi-calculator" className="btn btn-secondary">
                  Calculate EMI
                </Link>
                <Link href="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : step === 1 ? (
            /* Step 1 */
            <form onSubmit={handleStep1}>
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="chip chip-navy text-xs"
                  style={{ padding: "0.3rem 0.75rem" }}
                >
                  Step 1 of 2
                </div>
                <span className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
                  Basic details
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="label-lh" htmlFor="apply-name">Full Name *</label>
                  <input
                    id="apply-name"
                    type="text"
                    className="input-lh"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="label-lh" htmlFor="apply-mobile">Mobile Number *</label>
                  <input
                    id="apply-mobile"
                    type="tel"
                    className="input-lh"
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    required
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className="label-lh" htmlFor="apply-product">Product Type *</label>
                  <select
                    id="apply-product"
                    className="input-lh"
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <button
                id="apply-step1-next"
                type="submit"
                className="btn btn-primary w-full mt-6"
                style={{ minHeight: "50px" }}
              >
                Continue to Step 2 →
              </button>
            </form>
          ) : (
            /* Step 2 */
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="chip chip-blue text-xs"
                  style={{ padding: "0.3rem 0.75rem" }}
                >
                  Step 2 of 2
                </div>
                <span className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
                  Qualifying details
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="label-lh">Employment Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {employmentTypes.map((t) => (
                      <button
                        type="button"
                        key={t}
                        id={`apply-emp-${t.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setForm({ ...form, employmentType: t })}
                        className="p-3 rounded-xl border-2 text-sm font-medium transition-all"
                        style={{
                          borderColor: form.employmentType === t ? "var(--color-primary)" : "var(--color-neutral-200)",
                          backgroundColor: form.employmentType === t ? "var(--color-primary-light)" : "#ffffff",
                          color: form.employmentType === t ? "var(--color-primary)" : "var(--color-neutral-600)",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-lh" htmlFor="apply-income">Monthly Income (₹)</label>
                  <input
                    id="apply-income"
                    type="number"
                    className="input-lh"
                    placeholder="e.g. 50000"
                    value={form.income}
                    onChange={(e) => setForm({ ...form, income: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-lh" htmlFor="apply-city">City</label>
                  <input
                    id="apply-city"
                    type="text"
                    className="input-lh"
                    placeholder="Your city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    autoComplete="address-level2"
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer" htmlFor="apply-consent">
                  <input
                    id="apply-consent"
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 accent-blue-500 flex-shrink-0"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    required
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "var(--color-neutral-500)" }}>
                    I consent to Lending Hub Technologies Pvt. Ltd. contacting me via call, SMS, or WhatsApp
                    regarding my loan / insurance application. I understand that submission does not
                    guarantee approval, and my data will be used solely for application processing. *
                  </span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  id="apply-step2-back"
                  className="btn btn-secondary flex-1"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  id="apply-submit"
                  type="submit"
                  className="btn btn-primary flex-2"
                  disabled={loading || !form.consent}
                  style={{ flex: 2 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Submitting…
                    </span>
                  ) : (
                    "Submit Application →"
                  )}
                </button>
              </div>

              <div className="flex items-start gap-2 mt-5 p-4 rounded-xl" style={{ backgroundColor: "var(--color-neutral-50)" }}>
                <Shield size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <p className="compliance-text">
                  Your personal and financial information is handled securely.
                  Submission does not guarantee loan approval or insurance issuance.
                  Actual eligibility is determined by our lending and insurance partners.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
