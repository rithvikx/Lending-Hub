import Link from "next/link";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya R.",
    city: "Hyderabad",
    product: "Personal Loan",
    text: "Lending Hub made the whole process so simple. I got a callback within an hour, and my personal loan was processed faster than I expected. The advisor explained everything clearly without any confusing terms.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ramesh T.",
    city: "Secunderabad",
    product: "Business Loan",
    text: "As a small business owner, I was nervous about applying for a loan. The team at Lending Hub guided me through my options and helped me find a business loan that matched my working capital needs perfectly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sunitha M.",
    city: "Uppal",
    product: "Car Insurance",
    text: "My car insurance was about to expire and I had no idea how to compare plans. Lending Hub sent me a reminder and helped me renew in under 15 minutes. Highly recommend for insurance renewals!",
    rating: 5,
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill="#f59e0b"
          style={{ color: "#f59e0b" }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container-lh">
        <div className="text-center mb-12">
          <p className="section-label">What our customers say</p>
          <h2 className="section-title mx-auto">Real experiences, real people</h2>
          <p className="section-subtitle mx-auto mt-3">
            First name and city only shared with permission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="card p-7 flex flex-col gap-4 relative"
            >
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary-light)" }}
              >
                <Quote size={18} style={{ color: "var(--color-primary)" }} />
              </div>

              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--color-neutral-600)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div>
                <StarRow count={t.rating} />
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-neutral-400)" }}>
                      {t.city}
                    </p>
                  </div>
                  <span className="chip chip-blue">{t.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/apply" id="testimonials-cta" className="btn btn-primary btn-lg">
            Apply Now
          </Link>
          <p className="compliance-text mt-3">
            Experiences shared are individual. Results may vary based on eligibility and lender criteria.
          </p>
        </div>
      </div>
    </section>
  );
}
