import ProductPageLayout from "@/components/ProductPageLayout";
import { Car } from "lucide-react";
import { readProductData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehicle Loan — Lending Hub",
  description:
    "Finance your next vehicle with a faster, simpler loan process. New and used car and bike loans.",
};

export default function VehicleLoanPage() {
  const data = readProductData("loans", "vehicle-loan");
  return (
    <ProductPageLayout
      {...data}
      icon={<Car size={26} style={{ color: "var(--color-primary)" }} />}
    />
  );
}
