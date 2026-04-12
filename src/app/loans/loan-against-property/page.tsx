import ProductPageLayout from "@/components/ProductPageLayout";
import { Home } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Loan Against Property — Lending Hub",
  description:
    "Unlock the value of your property for bigger financial goals. Secured loans against residential or commercial property.",
};

export default function LAPPage() {
  const data = readProductData("loans", "loan-against-property");
  return (
    <ProductPageLayout
      {...data}
      icon={<Home size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
