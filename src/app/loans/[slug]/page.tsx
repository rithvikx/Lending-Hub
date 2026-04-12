import { notFound } from "next/navigation";
import ProductPageLayout from "@/components/ProductPageLayout";
import { readProductData } from "@/lib/cms";
import {
  Wallet, Building2, Home, Car, Landmark,
} from "lucide-react";

export const dynamic = "force-dynamic";

const ICON_MAP: Record<string, React.ReactNode> = {
  "personal-loan": <Wallet size={26} style={{ color: "var(--color-primary)" }} />,
  "business-loan": <Building2 size={26} style={{ color: "var(--color-primary)" }} />,
  "loan-against-property": <Home size={26} style={{ color: "var(--color-primary)" }} />,
  "vehicle-loan": <Car size={26} style={{ color: "var(--color-primary)" }} />,
};

export default async function DynamicLoanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data;
  try {
    data = readProductData("loans", slug);
  } catch {
    notFound();
  }

  const icon = ICON_MAP[slug] ?? (
    <Landmark size={26} style={{ color: "var(--color-primary)" }} />
  );

  return (
    <ProductPageLayout
      {...data}
      icon={icon}
    />
  );
}
