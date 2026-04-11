export const metadata = {
  title: "Privacy Policy — Lending Hub",
  description: "Privacy Policy of LENDING HUB TECHNOLOGIES PRIVATE LIMITED. How we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="section" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-lh max-w-3xl">
        <h1 className="section-title mb-2" style={{ fontFamily: "var(--font-display)" }}>Privacy Policy</h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-neutral-400)" }}>Last updated: April 2025 | LENDING HUB TECHNOLOGIES PRIVATE LIMITED</p>

        <div className="prose-custom flex flex-col gap-8" style={{ color: "var(--color-neutral-700)", lineHeight: "1.75" }}>
          {[
            {
              h: "1. Information We Collect",
              p: "We collect name, mobile number, email, income details, employment type, city, and product interest when you submit a form on our website. We may also collect device and browser information for analytics purposes.",
            },
            {
              h: "2. How We Use Your Information",
              p: "Your information is used to: assess loan or insurance eligibility, route your enquiry to relevant lending or insurance partners, contact you with product information and offers, and improve our services.",
            },
            {
              h: "3. Sharing of Information",
              p: "Your details may be shared with our partner lenders and insurers solely for the purpose of fulfilling your loan or insurance enquiry. We do not sell your personal data to third parties for marketing purposes.",
            },
            {
              h: "4. Data Security",
              p: "We implement industry-standard security measures to protect your data. However, no transmission over the internet is completely secure. We encourage you to contact us immediately if you suspect unauthorised access.",
            },
            {
              h: "5. Cookies",
              p: "Our website may use cookies for analytics and session purposes. You can disable cookies via your browser settings. Some features may not work optimally with cookies disabled.",
            },
            {
              h: "6. Your Rights",
              p: "You may request access to, correction of, or deletion of your personal data by writing to connect.lendinghub@gmail.com. We will respond within 30 days.",
            },
            {
              h: "7. Contact",
              p: "For privacy-related concerns: LENDING HUB TECHNOLOGIES PRIVATE LIMITED, H.No. 2-4-24, 1st Floor, Gandhi Nagar, Uppal, Hyderabad - 500 039. Email: connect.lendinghub@gmail.com",
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
