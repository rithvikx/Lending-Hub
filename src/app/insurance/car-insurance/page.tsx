import ProductPageLayout from "@/components/ProductPageLayout";
import { Car } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Car Insurance — Lending Hub",
  description:
    "Quick car insurance quotes and easy renewal. Compare plans from partner insurers with Lending Hub.",
};

export default function CarInsurancePage() {
  const data = readProductData("insurance", "car-insurance");
  return (
    <ProductPageLayout
      {...data}
      icon={<Car size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
