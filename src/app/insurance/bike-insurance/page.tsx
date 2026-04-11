import ProductPageLayout from "@/components/ProductPageLayout";
import { Bike } from "lucide-react";

export const metadata = {
  title: "Bike Insurance — Lending Hub",
  description: "Affordable two-wheeler insurance for daily riders and long-route commuters. Quick quotes at Lending Hub.",
};

export default function BikeInsurancePage() {
  return (
    <ProductPageLayout
      badge="Affordable"
      title="Bike Insurance"
      tagline="Affordable protection for daily rides and long routes."
      description="Two-wheeler insurance is legally mandatory for all registered bikes and scooters in India. Lending Hub connects you with partner insurers to get you the best rate for third-party liability or comprehensive cover with a quick, paperless process."
      icon={<Bike size={26} style={{ color: "var(--color-primary)" }} />}
      ctaLabel="Get Quote"
      features={[
        "Third-party and comprehensive two-wheeler plans",
        "Own damage protection for your bike/scooter",
        "Zero depreciation add-on",
        "Engine protection cover",
        "Roadside assistance",
        "Overnight accommodation cover for breakdowns",
        "Personal accident cover for owner-driver",
        "No-claim bonus transfer from previous policy",
      ]}
      eligibility={[
        "Valid vehicle RC for the two-wheeler",
        "Previous insurance policy copy (for renewals)",
        "Owner driving licence",
        "Bike should not be under court case / seized",
      ]}
      documents={[
        "Vehicle RC copy",
        "Previous policy copy (renewal)",
        "PAN Card + Aadhaar",
        "Driving Licence",
      ]}
      relatedProducts={[
        { label: "Car Insurance", href: "/insurance/car-insurance" },
        { label: "Health Insurance", href: "/insurance/health-insurance" },
        { label: "Vehicle Loan", href: "/loans/vehicle-loan" },
      ]}
    />
  );
}
