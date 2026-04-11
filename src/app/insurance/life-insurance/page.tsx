import ProductPageLayout from "@/components/ProductPageLayout";
import { Umbrella } from "lucide-react";

export const metadata = {
  title: "Life Insurance — Lending Hub",
  description: "Long-term financial protection for the people who matter most. Term and investment-linked life insurance plans.",
};

export default function LifeInsurancePage() {
  return (
    <ProductPageLayout
      badge="Long-term Security"
      title="Life Insurance"
      tagline="Long-term financial protection for the people who matter most."
      description="Life insurance ensures that your family is financially secure even in your absence. Whether you're looking for a simple term plan with high coverage, or an investment-linked plan with maturity benefits, Lending Hub connects you with the right option from partner insurers."
      icon={<Umbrella size={26} style={{ color: "var(--color-primary)" }} />}
      ctaLabel="Get Quote"
      features={[
        "Pure term insurance with high sum assured",
        "Return of premium (TROP) plans available",
        "ULIPs for investment + insurance combo",
        "Critical illness and disability riders",
        "Accidental death benefit rider",
        "Income replacement benefit options",
        "Tax benefits under Section 80C and 10(10D)",
        "Online policy issuance through partner insurers",
      ]}
      eligibility={[
        "Age: 18 – 65 years (term plans); limits vary by product",
        "Indian resident with valid KYC",
        "Medical examination required for higher sum assured or age groups",
        "Salaried or self-employed individuals, business owners",
        "Non-smoker rates available for better premiums",
      ]}
      documents={[
        "PAN Card + Aadhaar",
        "Income proof (salary slip / ITR)",
        "Medical reports (if required)",
        "Passport-size photo",
        "Bank details for premium payment",
        "Nominee proof of identity",
      ]}
      relatedProducts={[
        { label: "Health Insurance", href: "/insurance/health-insurance" },
        { label: "Car Insurance", href: "/insurance/car-insurance" },
        { label: "Personal Loan", href: "/loans/personal-loan" },
      ]}
    />
  );
}
