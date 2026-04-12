import ProductPageLayout from "@/components/ProductPageLayout";
import { Umbrella } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Life Insurance — Lending Hub",
  description:
    "Long-term financial protection for the people who matter most. Term and investment-linked life insurance plans.",
};

export default function LifeInsurancePage() {
  const data = readProductData("insurance", "life-insurance");
  return (
    <ProductPageLayout
      {...data}
      icon={<Umbrella size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
