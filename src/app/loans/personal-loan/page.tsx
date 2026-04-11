import ProductPageLayout from "@/components/ProductPageLayout";
import { Wallet } from "lucide-react";

export const metadata = {
  title: "Personal Loan — Lending Hub",
  description: "Get a personal loan for planned needs and unexpected expenses. Fast approval, minimal paperwork, guided support from Lending Hub.",
};

export default function PersonalLoanPage() {
  return (
    <ProductPageLayout
      badge="Fast Approval"
      title="Personal Loan"
      tagline="For planned needs and unexpected expenses."
      description="Whether it's a medical emergency, a wedding, home renovation, or a long-pending purchase — a personal loan from our partner lenders gives you access to funds quickly with transparent repayment terms. Lending Hub guides you through the process from eligibility check to disbursal."
      icon={<Wallet size={26} style={{ color: "var(--color-primary)" }} />}
      features={[
        "Loan amounts from ₹50,000 to ₹40 lakhs",
        "Flexible tenure: 12 to 60 months",
        "No collateral / unsecured",
        "Quick disbursal — often within 24–72 hours*",
        "Competitive interest rates",
        "Minimal documentation for salaried applicants",
        "Suitable for first-time borrowers",
        "Part-prepayment options available (subject to lender terms)",
      ]}
      eligibility={[
        "Age: 21 – 58 years (salaried) / 21 – 65 years (self-employed)",
        "Minimum monthly income: ₹15,000 (salaried) / ₹20,000 (self-employed)",
        "Employment: Minimum 1 year in current job or 2 years in business",
        "CIBIL score: 700 and above recommended",
        "Indian resident with a valid bank account",
      ]}
      documents={[
        "PAN Card",
        "Aadhaar Card",
        "Latest 3-month salary slips",
        "Last 6-month bank statements",
        "Form 16 / ITR (last 2 years)",
        "Employment letter / ID proof",
      ]}
      relatedProducts={[
        { label: "Business Loan", href: "/loans/business-loan" },
        { label: "Loan Against Property", href: "/loans/loan-against-property" },
        { label: "EMI Calculator", href: "/emi-calculator" },
      ]}
    />
  );
}
