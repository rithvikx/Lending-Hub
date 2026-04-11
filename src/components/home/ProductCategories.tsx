import Link from "next/link";
import {
  Wallet,
  Building2,
  Home,
  Car,
  Shield,
  Bike,
  Heart,
  Umbrella,
  ChevronRight,
} from "lucide-react";

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  chip: string;
  href: string;
  ctaLabel: string;
  chipColor?: string;
}

function ProductCard({
  icon,
  title,
  tagline,
  chip,
  href,
  ctaLabel,
  chipColor = "chip-blue",
}: ProductCardProps) {
  return (
    <div className="card p-6 flex flex-col gap-4 group cursor-pointer">
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary-light)" }}
        >
          {icon}
        </div>
        <span className={`chip ${chipColor}`}>{chip}</span>
      </div>

      <div>
        <h3
          className="font-bold text-base mb-1"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-secondary)",
          }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-neutral-500)" }}>
          {tagline}
        </p>
      </div>

      <Link
        href={href}
        className="btn btn-ghost flex items-center gap-1 text-sm mt-auto px-0 group-hover:gap-2 transition-all"
        style={{ color: "var(--color-primary)", justifyContent: "flex-start" }}
      >
        {ctaLabel}
        <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

const loanProducts: ProductCardProps[] = [
  {
    icon: <Wallet size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Personal Loan",
    tagline: "For planned needs and unexpected expenses.",
    chip: "Fast Approval",
    href: "/loans/personal-loan",
    ctaLabel: "View Details",
    chipColor: "chip-green",
  },
  {
    icon: <Building2 size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Business Loan",
    tagline: "Flexible funding for growth, inventory, and working capital.",
    chip: "Low Paperwork",
    href: "/loans/business-loan",
    ctaLabel: "View Details",
    chipColor: "chip-blue",
  },
  {
    icon: <Home size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Loan Against Property",
    tagline: "Unlock the value of your property for bigger financial goals.",
    chip: "Higher Limit",
    href: "/loans/loan-against-property",
    ctaLabel: "View Details",
    chipColor: "chip-navy",
  },
  {
    icon: <Car size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Vehicle Loan",
    tagline: "Finance your next vehicle with a faster, simpler process.",
    chip: "Quick Disbursal",
    href: "/loans/vehicle-loan",
    ctaLabel: "View Details",
    chipColor: "chip-green",
  },
];

const insuranceProducts: ProductCardProps[] = [
  {
    icon: <Car size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Car Insurance",
    tagline: "Quick quotes and easy renewal for your car cover.",
    chip: "Renew in Minutes",
    href: "/insurance/car-insurance",
    ctaLabel: "Get Quote",
    chipColor: "chip-green",
  },
  {
    icon: <Bike size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Bike Insurance",
    tagline: "Affordable protection for daily rides and long routes.",
    chip: "Affordable",
    href: "/insurance/bike-insurance",
    ctaLabel: "Get Quote",
    chipColor: "chip-blue",
  },
  {
    icon: <Heart size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Health Insurance",
    tagline: "Coverage that helps protect savings during medical emergencies.",
    chip: "Family Plans",
    href: "/insurance/health-insurance",
    ctaLabel: "Get Quote",
    chipColor: "chip-navy",
  },
  {
    icon: <Umbrella size={22} style={{ color: "var(--color-primary)" }} />,
    title: "Life Insurance",
    tagline: "Long-term financial protection for the people who matter most.",
    chip: "Long-term Security",
    href: "/insurance/life-insurance",
    ctaLabel: "Get Quote",
    chipColor: "chip-green",
  },
];

export default function ProductCategories() {
  return (
    <section id="products" className="section" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-lh">
        <div className="text-center mb-12">
          <p className="section-label">Our Products</p>
          <h2 className="section-title mx-auto">
            Loans &amp; Insurance All in one place
          </h2>
          <p className="section-subtitle mx-auto mt-3 text-center">
            Simple process. Clear guidance. No unnecessary jargon.
          </p>
        </div>

        {/* Loans block */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <Wallet size={16} color="#ffffff" />
            </div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
            >
              Loans
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loanProducts.map((p) => (
              <ProductCard key={p.href} {...p} />
            ))}
          </div>
        </div>

        {/* Insurance block */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Shield size={16} color="#ffffff" />
            </div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
            >
              Insurance
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {insuranceProducts.map((p) => (
              <ProductCard key={p.href} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
