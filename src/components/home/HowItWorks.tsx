import Link from "next/link";
import { Search, ClipboardCheck, Upload, BadgeCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Search size={26} style={{ color: "var(--color-primary)" }} />,
    title: "Choose your product",
    desc: "Browse loans and insurance options, or use our Guided Product Finder to get a recommendation in 4 questions.",
  },
  {
    num: "02",
    icon: <ClipboardCheck size={26} style={{ color: "var(--color-primary)" }} />,
    title: "Check eligibility or estimate",
    desc: "Use the EMI Calculator or Eligibility Checker to understand what you qualify for before filling any form.",
  },
  {
    num: "03",
    icon: <Upload size={26} style={{ color: "var(--color-primary)" }} />,
    title: "Upload documents",
    desc: "Share PAN, Aadhaar, income proof, and product-specific documents securely — once, with no repetition.",
  },
  {
    num: "04",
    icon: <BadgeCheck size={26} style={{ color: "var(--color-primary)" }} />,
    title: "Receive offers & complete",
    desc: "Get matched offers from our partner lenders or insurers. Compare and complete your application with advisor support.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-lh">
        <div className="text-center mb-14">
          <p className="section-label">The Process</p>
          <h2 className="section-title mx-auto">How it works</h2>
          <p className="section-subtitle mx-auto mt-3">
            4 simple steps from enquiry to offer — designed for first-time borrowers
            and experienced applicants alike.
          </p>
        </div>

        {/* Steps — desktop horizontal, mobile vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Horizontal connecting line — desktop */}
          <div
            className="hidden md:block absolute top-11 left-[12.5%] right-[12.5%] h-0.5"
            style={{
              background: "linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center px-5 pb-6 md:pb-0"
            >
              {/* Mobile connecting line */}
              {i < steps.length - 1 && (
                <div
                  className="md:hidden absolute left-1/2 -translate-x-px top-24 bottom-0 w-0.5"
                  style={{ backgroundColor: "var(--color-primary-light)" }}
                />
              )}

              {/* Step circle */}
              <div className="relative z-10 mb-5">
                <div
                  className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-md"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid var(--color-primary-light)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {step.icon}
                  <span
                    className="text-xs font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Step {step.num}
                  </span>
                </div>
              </div>

              <h3
                className="font-bold text-sm mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-secondary)",
                }}
              >
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-neutral-500)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/apply" id="hiw-cta" className="btn btn-primary btn-lg">
            Begin Application
          </Link>
        </div>
      </div>
    </section>
  );
}
