import ProductPageLayout from "@/components/ProductPageLayout";
import { Building2 } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Business Loan — Lending Hub",
  description:
    "Flexible business loan funding for growth, inventory, working capital and more. Quick eligibility check and guided application.",
};

export default function BusinessLoanPage() {
  const data = readProductData("loans", "business-loan");
  return (
    <ProductPageLayout
      {...data}
      icon={<Building2 size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
