import ProductPageLayout from "@/components/ProductPageLayout";
import { CreditCard } from "lucide-react";

export const metadata = {
  title: "Credit Card — Lending Hub",
  description:
    "Explore credit card options with rewarding benefits, flexible repayment, and easy online application. Compare and apply with Lending Hub.",
};

const data = {
  badge: "Rewards & Benefits",
  title: "Credit Card",
  tagline: "Spend smart, earn more — credit cards tailored for you",
  description:
    "A credit card gives you the power to buy now and pay later, with added perks like cashback, reward points, travel miles, and zero-cost EMIs. Lending Hub helps you compare and apply for the right credit card that matches your spending habits and lifestyle.",
  ctaLabel: "Apply Now",
  ctaHref: "/apply",
  features: [
    "Cashback on every transaction",
    "Reward points redeemable for vouchers, flights & more",
    "Zero-cost EMI on major purchases",
    "Complimentary airport lounge access (premium cards)",
    "Fuel surcharge waiver at petrol pumps",
    "International acceptance across 150+ countries",
    "Contactless tap-to-pay technology",
  ],
  eligibility: [
    "Age: 21–65 years",
    "Minimum monthly income ₹15,000 (salaried) or ₹2 lakh p.a. (self-employed)",
    "Credit score of 700 or above preferred",
    "Indian resident with valid KYC documents",
    "Stable employment or business history of at least 1 year",
  ],
  documents: [
    "PAN Card",
    "Aadhaar Card / Passport / Voter ID (address proof)",
    "Latest 3 months' salary slips or ITR for self-employed",
    "Last 3 months' bank statements",
    "Passport-size photograph",
  ],
  relatedProducts: [
    { label: "Debit Card", href: "/cards/debit-card" },
    { label: "Personal Loan", href: "/loans/personal-loan" },
    { label: "EMI Calculator", href: "/emi-calculator" },
  ],
};

export default function CreditCardPage() {
  return (
    <ProductPageLayout
      {...data}
      icon={<CreditCard size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
