import Link from "next/link";
import { Users, Building2, Clock, HeadphonesIcon, PhoneCall } from "lucide-react";

const stats = [
  {
    icon: <Users size={24} style={{ color: "var(--color-primary)" }} />,
    value: "10,000+",
    label: "Customer Enquiries Served",
    sub: "Since our founding",
  },
  {
    icon: <Building2 size={24} style={{ color: "var(--color-primary)" }} />,
    value: "25+",
    label: "Lending & Insurer Partners",
    sub: "Multiple options to compare",
  },
  {
    icon: <Clock size={24} style={{ color: "var(--color-primary)" }} />,
    value: "< 2 hrs",
    label: "Average Callback Time",
    sub: "On business days",
  },
  {
    icon: <HeadphonesIcon size={24} style={{ color: "var(--color-primary)" }} />,
    value: "Mon–Sat",
    label: "Support Availability",
    sub: "9 AM – 7 PM",
  },
];

export default function TrustBand() {
  return (
    <section
      id="trust"
      className="section-sm"
      style={{
        background: "linear-gradient(135deg, var(--color-secondary) 0%, #003a99 100%)",
      }}
    >
      <div className="container-lh">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-5 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                {stat.icon}
              </div>
              <div
                className="text-2xl font-bold text-white mb-0.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-white/80 text-sm font-semibold">{stat.label}</div>
              <div className="text-white/50 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <div>
            <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>
              Simple process. Clear guidance. No unnecessary jargon.
            </p>
            <p className="text-white/60 text-sm mt-1">
              Your details stay secure throughout the application journey.
            </p>
          </div>
          <Link
            href="/contact"
            id="trust-cta-advisor"
            className="btn btn-lg flex items-center gap-2 flex-shrink-0 text-white"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.25)",
            }}
          >
            <PhoneCall size={18} />
            Talk to an Advisor
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="compliance-text text-white/30 text-center mt-6">
          * Figures are indicative placeholders. Actual numbers to be verified before going live.
        </p>
      </div>
    </section>
  );
}
