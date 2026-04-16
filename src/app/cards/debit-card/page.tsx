import ProductPageLayout from "@/components/ProductPageLayout";
import { Wallet } from "lucide-react";

export const metadata = {
  title: "Debit Card — Lending Hub",
  description:
    "Get a debit card that gives you instant access to your savings with added security, cashback offers, and wide acceptance. Compare options with Lending Hub.",
};

const data = {
  badge: "Safe & Instant Access",
  title: "Debit Card",
  tagline: "Your money, your control — anytime, anywhere",
  description:
    "A debit card lets you spend directly from your bank account with the convenience of card payments — online, in-store, and at ATMs. Modern debit cards come with cashback offers, zero annual fees, and robust security features. Lending Hub helps you choose the right debit card for your everyday banking needs.",
  ctaLabel: "Apply Now",
  ctaHref: "/apply",
  features: [
    "Instant access to your savings account balance",
    "Cashback and discount offers at partner merchants",
    "Free ATM withdrawals at home bank ATMs",
    "Contactless payments with tap-to-pay",
    "Online shopping with OTP-based security",
    "International usage on Visa / Mastercard / RuPay networks",
    "Zero annual fee on most accounts",
  ],
  eligibility: [
    "Active savings or current account with the issuing bank",
    "Valid KYC documents (Aadhaar + PAN)",
    "Age 18 years and above (10+ years for minor accounts with guardian)",
    "Indian resident or NRI with NRO/NRE account",
  ],
  documents: [
    "Aadhaar Card",
    "PAN Card",
    "Passport-size photograph",
    "Account opening form (if new account)",
  ],
  relatedProducts: [
    { label: "Credit Card", href: "/cards/credit-card" },
    { label: "Personal Loan", href: "/loans/personal-loan" },
    { label: "EMI Calculator", href: "/emi-calculator" },
  ],
};

export default function DebitCardPage() {
  return (
    <ProductPageLayout
      {...data}
      icon={<Wallet size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
