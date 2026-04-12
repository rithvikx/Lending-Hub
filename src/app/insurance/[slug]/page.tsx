import { notFound } from "next/navigation";
import ProductPageLayout from "@/components/ProductPageLayout";
import { readProductData } from "@/lib/cms";
import {
  Car, Bike, Heart, Umbrella, Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

const ICON_MAP: Record<string, React.ReactNode> = {
  "car-insurance": <Car size={26} style={{ color: "var(--color-primary)" }} />,
  "bike-insurance": <Bike size={26} style={{ color: "var(--color-primary)" }} />,
  "health-insurance": <Heart size={26} style={{ color: "var(--color-primary)" }} />,
  "life-insurance": <Umbrella size={26} style={{ color: "var(--color-primary)" }} />,
};

export default async function DynamicInsurancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data;
  try {
    data = readProductData("insurance", slug);
  } catch {
    notFound();
  }

  const icon = ICON_MAP[slug] ?? (
    <Shield size={26} style={{ color: "var(--color-primary)" }} />
  );

  return (
    <ProductPageLayout
      {...data}
      icon={icon}
    />
  );
}
