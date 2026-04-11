import Link from "next/link";
import { Shield, Users, Target, Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us — Lending Hub",
  description: "Learn about LENDING HUB TECHNOLOGIES PRIVATE LIMITED — our mission, values, and commitment to transparent, guided financial services.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="section"
        style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 45%, #f8faff 100%)" }}
      >
        <div className="container-lh max-w-3xl text-center">
          <p className="section-label">Who we are</p>
          <h1
            className="section-title mx-auto mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About Lending Hub
          </h1>
          <p className="section-subtitle mx-auto">
            LENDING HUB TECHNOLOGIES PRIVATE LIMITED is a Hyderabad-based financial services
            company helping individuals and businesses navigate loans and insurance with clarity,
            transparency, and guided support.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-lh max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={24} style={{ color: "var(--color-primary)" }} />,
                title: "Our Mission",
                desc: "To make loans and insurance accessible, understandable, and transparent for every Indian — salaried, self-employed, or first-time borrower.",
              },
              {
                icon: <Shield size={24} style={{ color: "var(--color-primary)" }} />,
                title: "Our Values",
                desc: "Transparency in every disclosure. No hidden fees, no misleading promises. We guide users toward the right product with honest information.",
              },
              {
                icon: <Users size={24} style={{ color: "var(--color-primary)" }} />,
                title: "Who we serve",
                desc: "Salaried professionals, self-employed individuals, first-time borrowers, small business owners, and vehicle owners across Hyderabad and beyond.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card p-7 flex flex-col gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary-light)" }}
                >
                  {item.icon}
                </div>
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                >
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-neutral-500)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company details */}
      <section className="section" style={{ backgroundColor: "var(--color-neutral-50)" }}>
        <div className="container-lh max-w-3xl">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
          >
            Company Information
          </h2>
          <div className="card p-8">
            <p
              className="text-lg font-bold mb-6"
              style={{ color: "var(--color-secondary)", fontFamily: "var(--font-display)" }}
            >
              LENDING HUB TECHNOLOGIES PRIVATE LIMITED
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-neutral-500)" }}>Registered Address</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-neutral-700)" }}>
                    H.No. 2-4-24, 1st Floor, Gandhi Nagar, Near Veg Market Main Road,
                    Pillar No.10, Uppal, Ranga Reddy - 500 039, Hyderabad, Telangana.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-neutral-500)" }}>Phone</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-neutral-700)" }}>
                    <a href="tel:+914040890152" className="hover:underline">+91 40 40890152</a>
                    {" / "}
                    <a href="tel:+919885660222" className="hover:underline">+91 9885660222</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-neutral-500)" }}>Email</p>
                  <a
                    href="mailto:connect.lendinghub@gmail.com"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "var(--color-primary)" }}
                  >
                    connect.lendinghub@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm text-center" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-lh">
          <Link href="/contact" id="about-cta" className="btn btn-primary btn-lg">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
