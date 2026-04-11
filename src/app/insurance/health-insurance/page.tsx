import ProductPageLayout from "@/components/ProductPageLayout";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Health Insurance — Lending Hub",
  description: "Health insurance coverage that protects your savings during medical emergencies. Individual and family floater plans.",
};

export default function HealthInsurancePage() {
  return (
    <ProductPageLayout
      badge="Family Plans"
      title="Health Insurance"
      tagline="Coverage that helps protect savings during medical emergencies."
      description="Medical costs in India can be significant and unexpected. A health insurance plan ensures that a hospitalisation or critical illness doesn't wipe out your savings. Lending Hub helps you compare individual, family floater, and senior citizen health plans from our partner insurers."
      icon={<Heart size={26} style={{ color: "var(--color-primary)" }} />}
      ctaLabel="Get Quote"
      features={[
        "Individual and family floater plans",
        "Coverage from ₹3 lakhs to ₹1 crore+",
        "Pre and post-hospitalisation expenses covered",
        "Cashless treatment at network hospitals",
        "Day-care procedures coverage",
        "Critical illness add-on options",
        "Annual health check-up benefit",
        "Tax benefit under Section 80D",
      ]}
      eligibility={[
        "Age: 18 – 65 years (standard adult); senior citizen plans available",
        "Children can be covered from 6 months (family floater)",
        "Pre-existing diseases covered after waiting period (typically 2–4 years)",
        "Medical examination may be required for higher sums insured",
        "Indian resident with valid KYC documents",
      ]}
      documents={[
        "PAN Card + Aadhaar",
        "Age proof",
        "Passport-size photograph",
        "Medical history declaration form",
        "Previous policy (for portability)",
        "Address proof",
      ]}
      relatedProducts={[
        { label: "Life Insurance", href: "/insurance/life-insurance" },
        { label: "Car Insurance", href: "/insurance/car-insurance" },
        { label: "Personal Loan", href: "/loans/personal-loan" },
      ]}
    />
  );
}
