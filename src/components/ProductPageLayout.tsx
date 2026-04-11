import Link from "next/link";
import { ChevronRight, CheckCircle } from "lucide-react";

interface ProductPageLayoutProps {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  eligibility: string[];
  documents: string[];
  ctaHref?: string;
  ctaLabel?: string;
  relatedProducts: { label: string; href: string }[];
}

export default function ProductPageLayout({
  badge,
  title,
  tagline,
  description,
  icon,
  features,
  eligibility,
  documents,
  ctaHref = "/apply",
  ctaLabel = "Apply Now",
  relatedProducts,
}: ProductPageLayoutProps) {
  return (
    <main>
      {/* Hero */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 45%, #f8faff 100%)",
        }}
      >
        <div className="container-lh">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-white, #ffffff)", boxShadow: "var(--shadow-card)" }}
              >
                {icon}
              </div>
              <span className="chip chip-blue">{badge}</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
            >
              {title}
            </h1>
            <p
              className="text-xl mb-3 font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {tagline}
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-neutral-600)" }}>
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={ctaHref} id="product-cta-primary" className="btn btn-primary btn-lg">
                {ctaLabel} <ChevronRight size={18} />
              </Link>
              <Link href="/eligibility-checker" id="product-cta-eligibility" className="btn btn-secondary btn-lg">
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-lh">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Features */}
              <div>
                <h2
                  className="text-2xl font-bold mb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                >
                  Key Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((f) => (
                    <div
                      key={f}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: "var(--color-neutral-50)", border: "1px solid var(--color-neutral-200)" }}
                    >
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--color-neutral-700)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h2
                  className="text-2xl font-bold mb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                >
                  Eligibility Criteria
                </h2>
                <ul className="flex flex-col gap-3">
                  {eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-neutral-600)" }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "var(--color-primary)" }} />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h2
                  className="text-2xl font-bold mb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                >
                  Documents Required
                </h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {documents.map((d) => (
                    <div
                      key={d}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: "var(--color-secondary-light)",
                        color: "var(--color-secondary)",
                      }}
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: "var(--color-secondary)", minWidth: "1.25rem" }}>✓</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Apply card */}
              <div
                className="card p-6 sticky top-28"
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                >
                  Ready to proceed?
                </h3>
                <p className="text-sm mb-5" style={{ color: "var(--color-neutral-500)" }}>
                  Get a free callback from a Lending Hub advisor.
                </p>
                <Link href={ctaHref} id="product-sidebar-cta" className="btn btn-primary w-full text-center mb-3">
                  {ctaLabel}
                </Link>
                <Link href="/eligibility-checker" className="btn btn-secondary w-full text-center mb-5">
                  Check Eligibility
                </Link>
                <div style={{ borderTop: "1px solid var(--color-neutral-100)" }} className="pt-4">
                  <p className="compliance-text">
                    Submission does not guarantee approval. Actual eligibility determined by lender/insurer.
                  </p>
                </div>
              </div>

              {/* Related products */}
              {relatedProducts.length > 0 && (
                <div className="card p-6">
                  <h3
                    className="text-sm font-bold mb-3"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Related Products
                  </h3>
                  <div className="flex flex-col gap-2">
                    {relatedProducts.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center justify-between text-sm font-medium py-2 px-3 rounded-lg transition-colors hover:bg-neutral-50"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {p.label}
                        <ChevronRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
