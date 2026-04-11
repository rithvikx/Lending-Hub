"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Users, Clock, MessageCircle, ChevronRight } from "lucide-react";

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

export default function Hero() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    product: "",
    income: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.product) return;
    setLoading(true);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "hero-quick-apply" }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 45%, #f8faff 100%)",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
        }}
      />

      <div className="container-lh relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
          {/* Left — headline + trust row */}
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span
                className="chip chip-blue"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem" }}
              >
                ✦ Trusted by thousands across India
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-secondary)",
              }}
            >
              Get the right{" "}
              <span style={{ color: "var(--color-primary)" }}>loan or insurance</span>{" "}
              plan without the confusion.
            </h1>

            <p
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "var(--color-neutral-600)" }}
            >
              Explore personal loans, business loans, and insurance products
              with quick guidance, simple forms, and fast support from Lending Hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/eligibility-checker"
                id="hero-cta-eligibility"
                className="btn btn-primary btn-lg"
              >
                Check Eligibility
                <ChevronRight size={18} />
              </Link>
              <a
                href={`https://wa.me/919885660222?text=${encodeURIComponent("Hi! I'd like to check my loan eligibility.")}`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-whatsapp"
                className="btn btn-lg flex items-center gap-2 text-white"
                style={{ backgroundColor: "#25d366", border: "2px solid #25d366" }}
              >
                <MessageCircle size={18} />
                Talk on WhatsApp
              </a>
            </div>

            {/* Mini trust row */}
            <div className="flex flex-wrap gap-5">
              <div className="trust-badge">
                <Shield size={15} style={{ color: "var(--color-primary)" }} />
                Secure application
              </div>
              <div className="trust-badge">
                <Users size={15} style={{ color: "var(--color-primary)" }} />
                Multiple lending partners
              </div>
              <div className="trust-badge">
                <Clock size={15} style={{ color: "var(--color-primary)" }} />
                Fast callback
              </div>
            </div>
          </div>

          {/* Right — Quick Apply Card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="card w-full max-w-md p-8"
              style={{ boxShadow: "var(--shadow-card-hover)" }}
            >
              {submitted ? (
                <div className="text-center py-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#e6faf0" }}
                  >
                    <Shield size={28} style={{ color: "#0d7a45" }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                  >
                    Thank you, {form.name}!
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
                    A Lending Hub advisor will call you shortly regarding your{" "}
                    <strong>{form.product}</strong> enquiry.
                  </p>
                  <p className="compliance-text mt-4">
                    Submission does not guarantee approval. Terms apply.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2
                      className="text-xl font-bold mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-secondary)",
                      }}
                    >
                      Quick Apply
                    </h2>
                    <p className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
                      Get a callback from our advisor in minutes.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="hero-name" className="label-lh">Full Name *</label>
                      <input
                        id="hero-name"
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
                      <label htmlFor="hero-mobile" className="label-lh">Mobile Number *</label>
                      <input
                        id="hero-mobile"
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
                      <label htmlFor="hero-product" className="label-lh">Product Type *</label>
                      <select
                        id="hero-product"
                        className="input-lh"
                        value={form.product}
                        onChange={(e) => setForm({ ...form, product: e.target.value })}
                        required
                      >
                        <option value="">Select a product</option>
                        {products.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="hero-income" className="label-lh">
                        Monthly Income (₹)
                      </label>
                      <input
                        id="hero-income"
                        type="number"
                        className="input-lh"
                        placeholder="e.g. 50000"
                        min={0}
                        value={form.income}
                        onChange={(e) => setForm({ ...form, income: e.target.value })}
                        autoComplete="off"
                      />
                    </div>

                    <button
                      id="hero-quick-apply-submit"
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary w-full mt-1"
                      style={{ minHeight: "50px" }}
                    >
                      {loading ? "Submitting…" : "Get Free Callback →"}
                    </button>

                    <p className="compliance-text text-center">
                      By submitting, you consent to being contacted. Submission does not
                      guarantee approval.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
