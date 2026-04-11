import ProductPageLayout from "@/components/ProductPageLayout";
import { Car } from "lucide-react";

export const metadata = {
  title: "Vehicle Loan — Lending Hub",
  description: "Finance your next vehicle with a faster, simpler loan process. New and used car and bike loans.",
};

export default function VehicleLoanPage() {
  return (
    <ProductPageLayout
      badge="Quick Disbursal"
      title="Vehicle Loan"
      tagline="Finance your next vehicle with a faster, simpler process."
      description="Whether you're buying a new car, a used vehicle, or a two-wheeler, Lending Hub connects you with partner lenders who offer competitive vehicle loan options with quick processing and flexible repayment. Get on the road without the financial stress."
      icon={<Car size={26} style={{ color: "var(--color-primary)" }} />}
      features={[
        "Finance new and used cars and two-wheelers",
        "Up to 90% on-road price funding*",
        "Tenure: 12 – 84 months",
        "Quick disbursement with minimal documentation",
        "Competitive interest rates from partner lenders",
        "RC book / vehicle documents as collateral",
        "Flexible EMI options",
        "Used car loans also available",
      ]}
      eligibility={[
        "Age: 21 – 60 years",
        "Minimum income: ₹15,000/month (salaried) / ₹2 lakh p.a. (self-employed)",
        "CIBIL score: 650 and above recommended",
        "Valid driving licence",
        "At least 1 year of employment or business continuity",
        "For used vehicles: vehicle age typically up to 7–10 years (lender-specific)",
      ]}
      documents={[
        "PAN Card + Aadhaar",
        "Driving licence",
        "Latest salary slips or ITR",
        "Last 6-month bank statements",
        "Vehicle proforma invoice or RC copy",
        "Address proof",
      ]}
      relatedProducts={[
        { label: "Car Insurance", href: "/insurance/car-insurance" },
        { label: "Bike Insurance", href: "/insurance/bike-insurance" },
        { label: "Personal Loan", href: "/loans/personal-loan" },
      ]}
    />
  );
}
