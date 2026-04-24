"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, IndianRupee, TrendingDown } from "lucide-react";

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

function pct(val: number, min: number, max: number) {
  return ((val - min) / (max - min)) * 100;
}

export default function EMICalculatorPage() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);
  const [showTable, setShowTable] = useState(false);

  const emi = calcEMI(amount, rate, tenure);
  const total = emi * tenure;
  const interest = total - amount;
  const principalPct = Math.round((amount / total) * 100);
  const interestPct = 100 - principalPct;

  // Build amortization table (yearly summary)
  const amortization = useCallback(() => {
    const rows: { year: number; principal: number; interest: number; balance: number }[] = [];
    let balance = amount;
    const r = rate / 12 / 100;

    for (let month = 1; month <= tenure; month++) {
      const interestPaid = balance * r;
      const principalPaid = emi - interestPaid;
      balance = Math.max(0, balance - principalPaid);

      if (month % 12 === 0 || month === tenure) {
        const year = Math.ceil(month / 12);
        const existing = rows.find((row) => row.year === year);
        if (!existing) {
          rows.push({ year, principal: principalPaid, interest: interestPaid, balance });
        } else {
          existing.principal += principalPaid;
          existing.interest += interestPaid;
          existing.balance = balance;
        }
      } else {
        const year = Math.ceil(month / 12);
        const existing = rows.find((row) => row.year === year);
        if (!existing) {
          rows.push({ year, principal: principalPaid, interest: interestPaid, balance });
        } else {
          existing.principal += principalPaid;
          existing.interest += interestPaid;
          existing.balance = balance;
        }
      }
    }
    return rows;
  }, [amount, rate, tenure, emi]);

  return (
    <main className="section" style={{ backgroundColor: "var(--color-neutral-50)" }}>
      <div className="container-lh max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-label">Tools</p>
          <h1
            className="section-title mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            EMI Calculator
          </h1>
          <p className="section-subtitle mx-auto mt-3">
            Estimate your monthly EMI, total interest, and repayment instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-3 card p-8">
            <div className="flex flex-col gap-7">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="label-lh mb-0" htmlFor="calc-amount">Loan Amount</label>
                  <span className="text-base font-bold" style={{ color: "var(--color-primary)" }}>
                    {formatINR(amount)}
                  </span>
                </div>
                <input
                  id="calc-amount"
                  type="range" min={50000} max={5000000} step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ background: `linear-gradient(to right, var(--color-primary) ${pct(amount, 50000, 5000000)}%, var(--color-neutral-200) ${pct(amount, 50000, 5000000)}%)` }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                  <span>₹50,000</span><span>₹50,00,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="label-lh mb-0" htmlFor="calc-rate">Interest Rate (p.a.)</label>
                  <span className="text-base font-bold" style={{ color: "var(--color-primary)" }}>
                    {rate}%
                  </span>
                </div>
                <input
                  id="calc-rate"
                  type="range" min={7} max={36} step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  style={{ background: `linear-gradient(to right, var(--color-primary) ${pct(rate, 7, 36)}%, var(--color-neutral-200) ${pct(rate, 7, 36)}%)` }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                  <span>7%</span><span>36%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="label-lh mb-0" htmlFor="calc-tenure">Tenure</label>
                  <span className="text-base font-bold" style={{ color: "var(--color-primary)" }}>
                    {tenure} months ({Math.round(tenure / 12 * 10) / 10} yrs)
                  </span>
                </div>
                <input
                  id="calc-tenure"
                  type="range" min={6} max={360} step={6}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  style={{ background: `linear-gradient(to right, var(--color-primary) ${pct(tenure, 6, 360)}%, var(--color-neutral-200) ${pct(tenure, 6, 360)}%)` }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                  <span>6 months</span><span>30 years</span>
                </div>
              </div>

              {/* Manual input row */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="label-lh" htmlFor="calc-amount-input">Amount (₹)</label>
                  <input
                    id="calc-amount-input"
                    type="number"
                    className="input-lh"
                    value={amount}
                    min={50000} max={5000000}
                    onChange={(e) => setAmount(Math.max(50000, Math.min(5000000, Number(e.target.value))))}
                  />
                </div>
                <div>
                  <label className="label-lh" htmlFor="calc-rate-input">Rate (%)</label>
                  <input
                    id="calc-rate-input"
                    type="number"
                    className="input-lh"
                    value={rate}
                    min={7} max={36} step={0.5}
                    onChange={(e) => setRate(Math.max(7, Math.min(36, Number(e.target.value))))}
                  />
                </div>
                <div>
                  <label className="label-lh" htmlFor="calc-tenure-input">Months</label>
                  <input
                    id="calc-tenure-input"
                    type="number"
                    className="input-lh"
                    value={tenure}
                    min={6} max={360} step={6}
                    onChange={(e) => setTenure(Math.max(6, Math.min(360, Number(e.target.value))))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* EMI result */}
            <div
              className="rounded-2xl p-7 text-white"
              style={{ background: "linear-gradient(135deg, var(--color-secondary) 0%, #003a99 100%)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee size={15} color="rgba(255,255,255,0.7)" />
                <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Monthly EMI</span>
              </div>
              <div className="text-4xl font-bold mb-5" style={{ fontFamily: "var(--font-display)" }}>
                {formatINR(Math.round(emi))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-xs mb-0.5">Principal</p>
                  <p className="text-white font-bold">{formatINR(amount)}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-0.5">Total Interest</p>
                  <p className="text-white font-bold">{formatINR(Math.round(interest))}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-0.5">Total Repayment</p>
                  <p className="text-white font-bold">{formatINR(Math.round(total))}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-0.5">Tenure</p>
                  <p className="text-white font-bold">{tenure} months</p>
                </div>
              </div>

              {/* Mini bar */}
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">Principal {principalPct}%</span>
                  <span className="text-white/60">Interest {interestPct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${principalPct}%`, backgroundColor: "var(--color-primary)" }}
                  />
                </div>
              </div>
            </div>

            <Link href="/apply" id="emi-full-apply-cta" className="btn btn-primary w-full text-center">
              Want matching offers? Apply Now
              <ChevronRight size={16} />
            </Link>

            <Link href="/eligibility-checker" id="emi-eligibility-link" className="btn btn-secondary w-full text-center">
              Check My Eligibility First
            </Link>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="mt-8">
          <button
            id="emi-toggle-table"
            className="flex items-center gap-2 text-sm font-semibold mb-4 hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-primary)" }}
            onClick={() => setShowTable(!showTable)}
          >
            <TrendingDown size={16} />
            {showTable ? "Hide" : "Show"} Amortization Schedule (Yearly)
          </button>

          {showTable && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-secondary)", color: "#ffffff" }}>
                      <th className="text-left px-5 py-3 font-semibold">Year</th>
                      <th className="text-right px-5 py-3 font-semibold">Principal Paid</th>
                      <th className="text-right px-5 py-3 font-semibold">Interest Paid</th>
                      <th className="text-right px-5 py-3 font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortization().map((row, i) => (
                      <tr
                        key={row.year}
                        style={{
                          backgroundColor: i % 2 === 0 ? "#ffffff" : "var(--color-neutral-50)",
                        }}
                      >
                        <td className="px-5 py-3 font-medium" style={{ color: "var(--color-secondary)" }}>
                          Year {row.year}
                        </td>
                        <td className="px-5 py-3 text-right" style={{ color: "var(--color-neutral-700)" }}>
                          {formatINR(Math.round(row.principal))}
                        </td>
                        <td className="px-5 py-3 text-right" style={{ color: "var(--color-neutral-700)" }}>
                          {formatINR(Math.round(row.interest))}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold" style={{ color: "var(--color-secondary)" }}>
                          {formatINR(Math.max(0, Math.round(row.balance)))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <p className="compliance-text text-center mt-6">
          EMI figures are indicative. Actual rates and amounts depend on lender terms and eligibility.
        </p>
      </div>
    </main>
  );
}
