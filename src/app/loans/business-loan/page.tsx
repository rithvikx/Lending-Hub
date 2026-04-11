import ProductPageLayout from "@/components/ProductPageLayout";
import { Building2 } from "lucide-react";

export const metadata = {
  title: "Business Loan — Lending Hub",
  description: "Flexible business loan funding for growth, inventory, working capital and more. Quick eligibility check and guided application.",
};

export default function BusinessLoanPage() {
  return (
    <ProductPageLayout
      badge="Low Paperwork"
      title="Business Loan"
      tagline="Flexible funding for growth, inventory, and working capital."
      description="Running a business means managing cash flow, growth opportunities, and unexpected expenses. A business loan from Lending Hub's partner lenders helps you scale operations, manage inventory, or handle working capital needs without disrupting daily operations."
      icon={<Building2 size={26} style={{ color: "var(--color-primary)" }} />}
      features={[
        "Loans from ₹2 lakhs to ₹50 lakhs*",
        "Secured and unsecured options",
        "Flexible tenure: 12 – 60 months",
        "Suitable for proprietors, partnerships, and Pvt. Ltd. companies",
        "Working capital, term loan, and overdraft variants",
        "Balance transfer options available",
        "Doorstep document collection in select cities",
        "EMI-based or flexi repayment structures",
      ]}
      eligibility={[
        "Business vintage: Minimum 2 years in operation",
        "Annual turnover: ₹10 lakhs and above (varies by lender)",
        "Age: 21 – 65 years (proprietor / director)",
        "ITR filing for at least 1 year",
        "Active current account with minimum 6-month statement",
        "CIBIL / credit score: 650 and above recommended",
      ]}
      documents={[
        "PAN Card (Business + Personal)",
        "Aadhaar Card",
        "Business registration / GST certificate",
        "Last 2-year ITR + P&L + Balance Sheet",
        "Last 12-month bank statements",
        "Shop & establishment certificate",
      ]}
      relatedProducts={[
        { label: "Personal Loan", href: "/loans/personal-loan" },
        { label: "Loan Against Property", href: "/loans/loan-against-property" },
        { label: "Eligibility Checker", href: "/eligibility-checker" },
      ]}
    />
  );
}
