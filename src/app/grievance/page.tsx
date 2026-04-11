import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Grievance Redressal — Lending Hub",
  description: "Grievance Redressal Policy for LENDING HUB TECHNOLOGIES PRIVATE LIMITED. How to file complaints.",
};

export default function GrievancePage() {
  return (
    <main className="section" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-lh max-w-3xl">
        <h1 className="section-title mb-2" style={{ fontFamily: "var(--font-display)" }}>Grievance Redressal</h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-neutral-400)" }}>
          LENDING HUB TECHNOLOGIES PRIVATE LIMITED
        </p>

        <div
          className="p-6 rounded-2xl mb-10"
          style={{ backgroundColor: "var(--color-primary-light)", border: "1px solid rgba(0,144,255,0.15)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
            We are committed to resolving all customer concerns promptly and transparently.
            If you have a complaint about our services, a partner lender, or an insurer we work with,
            please follow the escalation process below.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {[
            {
              step: "Level 1",
              title: "Contact Our Customer Support Team",
              desc: "Reach out to us directly through any of the following channels. We aim to resolve Level 1 complaints within 3 business days.",
              contact: true,
            },
            {
              step: "Level 2",
              title: "Escalate to Our Grievance Officer",
              desc: "If your complaint is not resolved at Level 1 within 3 business days, please escalate in writing to our Grievance Officer at connect.lendinghub@gmail.com with subject line: GRIEVANCE — [Your Name] — [Date]. We will respond within 7 business days.",
            },
            {
              step: "Level 3",
              title: "Regulatory Escalation",
              desc: "If your complaint relates to a specific lender or insurer product and is not resolved by us, you may approach: (a) RBI Integrated Ombudsman (for banking/NBFC products): cms.rbi.org.in; (b) IRDAI's Bima Bharosa portal (for insurance): bimabharosa.irdai.gov.in",
            },
          ].map((s, i) => (
            <div key={i} className="flex gap-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: "var(--color-primary)", minWidth: "2.5rem" }}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-primary)" }}>{s.step}</p>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>{s.title}</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-neutral-600)" }}>{s.desc}</p>
                {s.contact && (
                  <div className="flex flex-col gap-2">
                    <a href="tel:+914040890152" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      <Phone size={14} /> +91 40 40890152
                    </a>
                    <a href="tel:+919885660222" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      <Phone size={14} /> +91 9885660222
                    </a>
                    <a href="mailto:connect.lendinghub@gmail.com" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      <Mail size={14} /> connect.lendinghub@gmail.com
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact" id="grievance-contact-cta" className="btn btn-primary">
            File a Complaint
          </Link>
        </div>
      </div>
    </main>
  );
}
