"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Calculator, ChevronRight, IndianRupee } from "lucide-react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function calcEMI(principal: number, annualRate: number, tenureMonths: number) {
  if (annualRate === 0) return principal / tenureMonths;
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function EMICalculatorPreview() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);

  const emi = calcEMI(amount, rate, tenure);
  const total = emi * tenure;
  const interest = total - amount;

  const pct = useCallback(
    (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100,
    []
  );

  return (
    <section
      id="emi-preview"
      className="section"
      style={{ backgroundColor: "var(--color-primary-light)" }}
    >
      <div className="container-lh">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — heading */}
          <div>
            <p className="section-label">EMI Calculator</p>
            <h2 className="section-title mb-4">
              Know your monthly EMI before you apply
            </h2>
            <p className="section-subtitle mb-8">
              Use our quick EMI calculator to estimate your monthly repayment.
              After you see your result, we can match you with real offers.
            </p>
            <Link
              href="/emi-calculator"
              id="emi-preview-full-calc"
              className="btn btn-secondary inline-flex gap-2"
            >
              <Calculator size={16} />
              Open Full Calculator
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* Right — interactive card */}
          <div
            className="card p-8"
            style={{ boxShadow: "var(--shadow-card-hover)" }}
          >
            <h3
              className="text-lg font-bold mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-secondary)",
              }}
            >
              Quick EMI Estimate
            </h3>

            <div className="flex flex-col gap-6">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="label-lh mb-0" htmlFor="emi-amount">
                    Loan Amount
                  </label>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {formatINR(amount)}
                  </span>
                </div>
                <input
                  id="emi-amount"
                  type="range"
                  min={50000}
                  max={5000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) ${pct(amount, 50000, 5000000)}%, var(--color-neutral-200) ${pct(amount, 50000, 5000000)}%)`,
                  }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                  <span>₹50K</span><span>₹50L</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="label-lh mb-0" htmlFor="emi-rate">
                    Interest Rate (p.a.)
                  </label>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {rate}%
                  </span>
                </div>
                <input
                  id="emi-rate"
                  type="range"
                  min={7}
                  max={36}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) ${pct(rate, 7, 36)}%, var(--color-neutral-200) ${pct(rate, 7, 36)}%)`,
                  }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                  <span>7%</span><span>36%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="label-lh mb-0" htmlFor="emi-tenure">
                    Tenure
                  </label>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {tenure} months
                  </span>
                </div>
                <input
                  id="emi-tenure"
                  type="range"
                  min={6}
                  max={360}
                  step={6}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) ${pct(tenure, 6, 360)}%, var(--color-neutral-200) ${pct(tenure, 6, 360)}%)`,
                  }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                  <span>6 mo</span><span>360 mo</span>
                </div>
              </div>

              {/* Result */}
              <div
                className="rounded-2xl p-5 mt-1"
                style={{
                  background: "linear-gradient(135deg, var(--color-secondary) 0%, #003a99 100%)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <IndianRupee size={14} color="rgba(255,255,255,0.7)" />
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                    Monthly EMI
                  </span>
                </div>
                <div
                  className="text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {formatINR(Math.round(emi))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-white/50 text-xs">Total Interest</p>
                    <p className="text-white font-bold text-sm">{formatINR(Math.round(interest))}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Total Repayment</p>
                    <p className="text-white font-bold text-sm">{formatINR(Math.round(total))}</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/apply?amount=${amount}&rate=${rate}&tenure=${tenure}`}
                id="emi-preview-apply"
                className="btn btn-primary w-full text-center"
              >
                Want matching offers? Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
