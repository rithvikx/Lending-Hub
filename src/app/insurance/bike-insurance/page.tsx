import ProductPageLayout from "@/components/ProductPageLayout";
import { Bike } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bike Insurance — Lending Hub",
  description:
    "Affordable two-wheeler insurance for daily riders and long-route commuters. Quick quotes at Lending Hub.",
};

export default function BikeInsurancePage() {
  const data = readProductData("insurance", "bike-insurance");
  return (
    <ProductPageLayout
      {...data}
      icon={<Bike size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
