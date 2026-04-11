export const metadata = {
  title: "Terms & Conditions — Lending Hub",
  description: "Terms and Conditions of use for the Lending Hub Technologies website.",
};

export default function TermsPage() {
  return (
    <main className="section" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-lh max-w-3xl">
        <h1 className="section-title mb-2" style={{ fontFamily: "var(--font-display)" }}>Terms &amp; Conditions</h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-neutral-400)" }}>Last updated: April 2025 | LENDING HUB TECHNOLOGIES PRIVATE LIMITED</p>

        <div className="flex flex-col gap-8" style={{ color: "var(--color-neutral-700)", lineHeight: "1.75" }}>
          {[
            {
              h: "1. Acceptance",
              p: "By accessing or using this website, you agree to these Terms and Conditions. If you do not agree, please do not use this site.",
            },
            {
              h: "2. Nature of Services",
              p: "Lending Hub Technologies Private Limited is a financial intermediary. We connect users with partner lenders and insurers. We do not directly provide loans or insurance. Submission of any form does not guarantee approval.",
            },
            {
              h: "3. Accuracy of Information",
              p: "We strive to keep information on this site accurate and up to date. However, product terms, interest rates, and insurance premiums are subject to change by the respective lender or insurer without notice.",
            },
            {
              h: "4. User Obligations",
              p: "You agree to provide accurate, truthful information in all forms. Providing false information may disqualify your application and may be subject to legal action under applicable laws.",
            },
            {
              h: "5. No Guarantee of Approval",
              p: "Submission of an enquiry or application through this website does not guarantee approval, sanction, or issuance of any loan or insurance product. All decisions are at the sole discretion of the partner lender or insurer.",
            },
            {
              h: "6. Intellectual Property",
              p: "All content on this website including text, logos, and design is the property of LENDING HUB TECHNOLOGIES PRIVATE LIMITED or its licensors. Reproduction without written consent is prohibited.",
            },
            {
              h: "7. Limitation of Liability",
              p: "Lending Hub is not liable for any loss, damage, or financial outcome resulting from reliance on information published on this website. Use of this site is at your own risk.",
            },
            {
              h: "8. Governing Law",
              p: "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Hyderabad, Telangana.",
            },
          ].map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>{s.h}</h2>
              <p className="text-sm">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
