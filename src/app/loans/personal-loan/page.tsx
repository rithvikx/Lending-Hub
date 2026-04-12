import ProductPageLayout from "@/components/ProductPageLayout";
import { Wallet } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Personal Loan — Lending Hub",
  description:
    "Get a personal loan for planned needs and unexpected expenses. Fast approval, minimal paperwork, guided support from Lending Hub.",
};

export default function PersonalLoanPage() {
  const data = readProductData("loans", "personal-loan");
  return (
    <ProductPageLayout
      {...data}
      icon={<Wallet size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
