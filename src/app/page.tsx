import Hero from "@/components/home/Hero";
import ProductCategories from "@/components/home/ProductCategories";
import TrustBand from "@/components/home/TrustBand";
import Benefits from "@/components/home/Benefits";
import HowItWorks from "@/components/home/HowItWorks";
import EMICalculatorPreview from "@/components/home/EMICalculatorPreview";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      {/* Hero — above fold quick apply */}
      <Hero />

      {/* Product cards — loans + insurance */}
      <ProductCategories />

      {/* Mid-page loan CTA banner */}
      <CTABanner
        id="cta-loan"
        headline="Need a loan decision faster?"
        subline="Check your eligibility in under 2 minutes — no cost, no commitment."
        primaryLabel="Check Eligibility Free"
        primaryHref="/eligibility-checker"
        secondaryLabel="Apply Now"
        secondaryHref="/apply"
        variant="navy"
      />

      {/* Trust stats band */}
      <TrustBand />

      {/* Benefits — asymmetric 2-col layout */}
      <Benefits />

      {/* How it works — 4-step flow */}
      <HowItWorks />

      {/* EMI Calculator preview */}
      <EMICalculatorPreview />

      {/* Testimonials */}
      <Testimonials />

      {/* Insurance renewal CTA banner */}
      <CTABanner
        id="cta-insurance"
        headline="Renew your vehicle insurance before it expires."
        subline="Get a quick quote for car or bike insurance. Renew in minutes."
        primaryLabel="Get Insurance Quote"
        primaryHref="/insurance/car-insurance"
        secondaryLabel="Bike Insurance"
        secondaryHref="/insurance/bike-insurance"
        variant="blue"
      />
    </>
  );
}
