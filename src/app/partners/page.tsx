import Link from "next/link";
import { Shield, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Partner Lenders & Insurers — Lending Hub",
  description: "View Lending Hub's partner lenders and insurer network. Transparent partner disclosures.",
};

export default function PartnersPage() {
  return (
    <main className="section" style={{ backgroundColor: "var(--color-neutral-50)" }}>
      <div className="container-lh max-w-4xl">
        <div className="text-center mb-12">
          <p className="section-label">Transparency</p>
          <h1 className="section-title mx-auto mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Partner Lenders &amp; Insurers
          </h1>
          <p className="section-subtitle mx-auto">
            Lending Hub works with multiple lenders and insurance companies to offer you a
            range of product options. We are committed to transparent disclosure of our partnerships.
          </p>
        </div>

        <div
          className="flex items-start gap-3 p-5 rounded-2xl mb-10"
          style={{ backgroundColor: "var(--color-secondary-light)", border: "1px solid rgba(0,41,122,0.12)" }}
        >
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-secondary)" }} />
          <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
            <strong>Disclosure:</strong> Lending Hub acts as a financial services intermediary connecting
            customers with partner lenders and insurers. We do not directly lend money or issue insurance policies.
            Actual products, rates, terms, and eligibility are determined by the respective lender or insurer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-secondary)" }}>
                <Shield size={18} color="#ffffff" />
              </div>
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                Lending Partners
              </h2>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--color-neutral-500)" }}>
              We work with banks, NBFCs, and digital lending platforms across India to offer
              personal loans, business loans, vehicle loans, and loans against property.
            </p>
            <div
              className="p-4 rounded-xl text-sm"
              style={{ backgroundColor: "var(--color-neutral-50)", color: "var(--color-neutral-600)" }}
            >
              <p className="font-semibold mb-2" style={{ color: "var(--color-secondary)" }}>Note</p>
              <p>Our complete partner lender list is available on request. Please contact us at{" "}
                <a href="mailto:connect.lendinghub@gmail.com" className="font-medium hover:underline" style={{ color: "var(--color-primary)" }}>
                  connect.lendinghub@gmail.com
                </a>{" "}for the most current and verified list.
              </p>
            </div>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-primary)" }}>
                <Shield size={18} color="#ffffff" />
              </div>
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                Insurance Partners
              </h2>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--color-neutral-500)" }}>
              We collaborate with IRDAI-registered insurance companies to offer motor, health,
              and life insurance products to our customers.
            </p>
            <div
              className="p-4 rounded-xl text-sm"
              style={{ backgroundColor: "var(--color-neutral-50)", color: "var(--color-neutral-600)" }}
            >
              <p className="font-semibold mb-2" style={{ color: "var(--color-secondary)" }}>Note</p>
              <p>Our complete insurer partner list is available on request. Please contact us at{" "}
                <a href="mailto:connect.lendinghub@gmail.com" className="font-medium hover:underline" style={{ color: "var(--color-primary)" }}>
                  connect.lendinghub@gmail.com
                </a>{" "}for the most current and verified list.
              </p>
            </div>
          </div>
        </div>

        <div className="card p-7 mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
            Important Disclosures
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Lending Hub does not guarantee loan approval or insurance issuance. Final decisions are made entirely by the respective lender or insurer.",
              "Interest rates, policy premiums, and product terms are subject to change by the partner and are determined at their discretion.",
              "Lending Hub may receive referral fees or commissions from partner lenders and insurers for successfully referred customers.",
              "Customers are encouraged to read all product documents, key fact statements, and policy schedules before signing or purchasing.",
              "For insurance products: All claims, exclusions, and coverage specifics are governed by the insurer's policy terms.",
              "For loan products: Late payment charges, foreclosure terms, and processing fees are defined by the lending partner.",
            ].map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-neutral-600)" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "var(--color-primary)" }} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Link href="/contact" id="partners-contact-cta" className="btn btn-primary btn-lg">
            Contact Us for Partner Details
          </Link>
        </div>
      </div>
    </main>
  );
}
