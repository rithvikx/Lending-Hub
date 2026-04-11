import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  FileText,
  AlertCircle,
  Users,
} from "lucide-react";

const loanLinks = [
  { href: "/loans/personal-loan", label: "Personal Loan" },
  { href: "/loans/business-loan", label: "Business Loan" },
  { href: "/loans/loan-against-property", label: "Loan Against Property" },
  { href: "/loans/vehicle-loan", label: "Vehicle Loan" },
];

const insuranceLinks = [
  { href: "/insurance/car-insurance", label: "Car Insurance" },
  { href: "/insurance/bike-insurance", label: "Bike Insurance" },
  { href: "/insurance/health-insurance", label: "Health Insurance" },
  { href: "/insurance/life-insurance", label: "Life Insurance" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/partners", label: "Partner Lenders & Insurers" },
  { href: "/apply", label: "Apply Now" },
  { href: "/emi-calculator", label: "EMI Calculator" },
  { href: "/eligibility-checker", label: "Eligibility Checker" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/grievance", label: "Grievance Redressal" },
  { href: "/partners", label: "Partner Disclosures" },
];

export default function Footer() {
  return (
    <footer aria-label="Site footer">
      {/* Pre-footer CTA strip */}
      <div className="bg-navy-gradient section-sm" style={{ background: "linear-gradient(135deg, var(--color-secondary) 0%, #003a99 100%)" }}>
        <div className="container-lh flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2
              className="text-xl md:text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to take the next step?
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Speak with a Lending Hub advisor for loans, insurance, and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/eligibility-checker" id="footer-cta-eligibility" className="btn btn-primary btn-lg">
              Check Eligibility Free
            </Link>
            <a
              href={`https://wa.me/919885660222?text=${encodeURIComponent("Hi! I need help with a loan or insurance query.")}`}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-cta-whatsapp"
              className="btn btn-lg flex items-center gap-2 text-white"
              style={{ backgroundColor: "#25d366", border: "2px solid #25d366" }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ backgroundColor: "#0f1e3d" }}>
        <div className="container-lh py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center mb-6" aria-label="Lending Hub Home">
                <Image
                  src="/logo/lending-hub-logo.png"
                  alt="Lending Hub"
                  width={420}
                  height={105}
                  className="h-[68px] w-auto sm:h-[80px] object-contain object-left"
                />
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                Lending Hub simplifies loans and insurance for salaried professionals, 
                self-employed users, and first-time borrowers across India.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                  <p className="text-white/60 text-xs leading-relaxed">
                    H.No. 2-4-24, 1st Floor, Gandhi Nagar, Near Veg Market Main Road,
                    Pillar No.10, Uppal, Ranga Reddy - 500 039, Hyderabad, Telangana.
                  </p>
                </div>
                <a href="tel:+914040890152" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-medium transition-colors">
                  <Phone size={13} style={{ color: "var(--color-primary)" }} />
                  +91 40 40890152
                </a>
                <a href="tel:+919885660222" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-medium transition-colors">
                  <Phone size={13} style={{ color: "var(--color-primary)" }} />
                  +91 9885660222
                </a>
                <a href="mailto:connect.lendinghub@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-medium transition-colors">
                  <Mail size={13} style={{ color: "var(--color-primary)" }} />
                  connect.lendinghub@gmail.com
                </a>
                <a
                  href={`https://wa.me/919885660222`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-medium transition-colors"
                >
                  <MessageCircle size={13} style={{ color: "#25d366" }} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Loans */}
            <div>
              <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Loans</h3>
              <ul className="flex flex-col gap-2.5">
                {loanLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-white text-sm font-bold mb-4 mt-7 uppercase tracking-wider">Insurance</h3>
              <ul className="flex flex-col gap-2.5">
                {insuranceLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Company</h3>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="flex flex-col gap-2.5">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Trust icons */}
              <div className="mt-7 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,144,255,0.15)" }}>
                    <Shield size={14} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span className="text-white/50 text-xs">RBI Framework Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,144,255,0.15)" }}>
                    <FileText size={14} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span className="text-white/50 text-xs">Transparent Disclosures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,144,255,0.15)" }}>
                    <AlertCircle size={14} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span className="text-white/50 text-xs">Grievance Redressal Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,144,255,0.15)" }}>
                    <Users size={14} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span className="text-white/50 text-xs">Multiple Lending Partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="container-lh py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs text-center md:text-left">
              © {new Date().getFullYear()} LENDING HUB TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
            </p>
            <p className="text-white/30 text-xs text-center">
              Submission of any form does not guarantee loan approval or insurance issuance.
              Products and rates are subject to lender/insurer terms and eligibility criteria.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
