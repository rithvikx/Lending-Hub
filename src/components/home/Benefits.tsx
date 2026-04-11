import Link from "next/link";
import {
  Zap,
  FileCheck,
  UserCheck,
  Lock,
  Star,
  Bell,
  ChevronRight,
} from "lucide-react";

const benefits = [
  {
    icon: <Zap size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Fast Comparison",
    desc: "Compare multiple loan and insurance options side by side without visiting multiple offices. Save time and make informed decisions quickly.",
  },
  {
    icon: <FileCheck size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Minimal Paperwork",
    desc: "Upload documents once and let our team coordinate with lenders and insurers on your behalf. No repetitive form-filling.",
  },
  {
    icon: <UserCheck size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Guided Support",
    desc: "A dedicated Lending Hub advisor walks you through every step — from eligibility check to offer acceptance — in plain language.",
  },
  {
    icon: <Lock size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Secure Document Sharing",
    desc: "Your personal and financial documents are handled with strict data security protocols throughout the application journey.",
  },
  {
    icon: <Star size={22} style={{ color: "var(--color-primary)" }} />,
    title: "First-time Borrower Friendly",
    desc: "New to loans? Our advisors explain eligibility, documentation, and next steps in simple terms — no jargon, no confusion.",
  },
  {
    icon: <Bell size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Insurance Renewal Reminders",
    desc: "Never miss a renewal date. Lending Hub sends timely reminders for car, bike, and health insurance renewals.",
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="section"
      style={{ backgroundColor: "var(--color-neutral-50)" }}
    >
      <div className="container-lh">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-28">
            <p className="section-label">Why Lending Hub</p>
            <h2 className="section-title mb-5">
              Every feature built to reduce your anxiety
            </h2>
            <p className="section-subtitle mb-8">
              Multiple product options, explained in a way that&apos;s easy to compare.
              Fast callback support from a real Lending Hub advisor.
            </p>
            <Link
              href="/apply"
              id="benefits-cta"
              className="btn btn-primary btn-lg inline-flex"
            >
              Start in 2 Minutes
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Right — benefits grid */}
          <div className="flex flex-col gap-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="flex gap-5 p-5 rounded-2xl transition-all duration-200 hover:shadow-md group"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--color-neutral-200)",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: "var(--color-primary-light)" }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3
                    className="font-bold text-sm mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-secondary)",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-neutral-500)" }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
