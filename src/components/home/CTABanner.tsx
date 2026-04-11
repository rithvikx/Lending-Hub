import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CTABannerProps {
  id?: string;
  headline: string;
  subline?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "blue" | "navy" | "light";
}

export default function CTABanner({
  id,
  headline,
  subline,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "navy",
}: CTABannerProps) {
  const bg =
    variant === "blue"
      ? "linear-gradient(135deg, var(--color-primary) 0%, #0075d4 100%)"
      : variant === "light"
      ? "var(--color-primary-light)"
      : "linear-gradient(135deg, var(--color-secondary) 0%, #003a99 100%)";

  const isDark = variant !== "light";

  return (
    <section
      id={id}
      className="py-14"
      style={{ background: bg }}
    >
      <div className="container-lh flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2
            className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? "text-white" : ""}`}
            style={{
              fontFamily: "var(--font-display)",
              color: isDark ? "#ffffff" : "var(--color-secondary)",
            }}
          >
            {headline}
          </h2>
          {subline && (
            <p
              className="text-sm"
              style={{ color: isDark ? "rgba(255,255,255,0.7)" : "var(--color-neutral-500)" }}
            >
              {subline}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href={primaryHref}
            id={id ? `${id}-cta-primary` : undefined}
            className="btn btn-lg flex items-center gap-2 text-white"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.15)"
                : "var(--color-primary)",
              border: isDark
                ? "1.5px solid rgba(255,255,255,0.3)"
                : "none",
            }}
          >
            {primaryLabel}
            <ChevronRight size={16} />
          </Link>

          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              id={id ? `${id}-cta-secondary` : undefined}
              className="btn btn-lg"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "var(--color-secondary-light)",
                color: isDark ? "#ffffff" : "var(--color-secondary)",
                border: isDark ? "1.5px solid rgba(255,255,255,0.2)" : "1.5px solid rgba(0,41,122,0.2)",
              }}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
