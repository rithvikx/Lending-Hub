import ProductPageLayout from "@/components/ProductPageLayout";
import { Heart } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Health Insurance — Lending Hub",
  description:
    "Health insurance coverage that protects your savings during medical emergencies. Individual and family floater plans.",
};

export default function HealthInsurancePage() {
  const data = readProductData("insurance", "health-insurance");
  return (
    <ProductPageLayout
      {...data}
      icon={<Heart size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
