"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  Calculator,
  CheckCircle,
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Top bar — desktop only */}
      <div className="hidden lg:block bg-secondary" style={{ backgroundColor: "var(--color-secondary)" }}>
        <div className="container-lh flex items-center justify-between py-2">
          <p className="text-white/70 text-xs">
            LENDING HUB TECHNOLOGIES PRIVATE LIMITED — Hyderabad, Telangana
          </p>
          <div className="flex items-center gap-5">
            <a
              href="tel:+914040890152"
              className="flex items-center gap-1.5 text-white/85 hover:text-white text-xs font-medium transition-colors"
            >
              <Phone size={12} /> +91 40 40890152
            </a>
            <a
              href="tel:+919885660222"
              className="flex items-center gap-1.5 text-white/85 hover:text-white text-xs font-medium transition-colors"
            >
              <Phone size={12} /> +91 9885660222
            </a>
            <a
              href="mailto:connect.lendinghub@gmail.com"
              className="flex items-center gap-1.5 text-white/85 hover:text-white text-xs font-medium transition-colors"
            >
              <Mail size={12} /> connect.lendinghub@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        id="site-header"
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: scrolled ? "var(--shadow-nav)" : "none",
          borderBottom: scrolled ? "none" : "1px solid var(--color-neutral-100)",
        }}
      >
        <div className="container-lh flex items-center gap-6 py-3.5">
          <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Lending Hub Home">
            <Image
              src="/logo/lending-hub-logo.png"
              alt="Lending Hub"
              width={360}
              height={90}
              className="h-[52px] w-auto md:h-[60px] object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 ml-4" aria-label="Main navigation">
            {/* Loans dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
            >
              <button
                id="nav-loans"
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-neutral-50"
                style={{ color: loansOpen ? "var(--color-primary)" : "var(--color-neutral-700)" }}
                aria-expanded={loansOpen}
                aria-haspopup="true"
              >
                Loans
                <ChevronDown
                  size={14}
                  className="transition-transform"
                  style={{ transform: loansOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {loansOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-lg border py-2"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "var(--color-neutral-200)",
                    boxShadow: "var(--shadow-card-hover)",
                  }}
                  role="menu"
                >
                  {loanLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-blue-50"
                      style={{ color: "var(--color-neutral-700)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Insurance dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setInsuranceOpen(true)}
              onMouseLeave={() => setInsuranceOpen(false)}
            >
              <button
                id="nav-insurance"
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-neutral-50"
                style={{ color: insuranceOpen ? "var(--color-primary)" : "var(--color-neutral-700)" }}
                aria-expanded={insuranceOpen}
                aria-haspopup="true"
              >
                Insurance
                <ChevronDown
                  size={14}
                  className="transition-transform"
                  style={{ transform: insuranceOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {insuranceOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-lg border py-2"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "var(--color-neutral-200)",
                    boxShadow: "var(--shadow-card-hover)",
                  }}
                  role="menu"
                >
                  {insuranceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-blue-50"
                      style={{ color: "var(--color-neutral-700)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/emi-calculator"
              id="nav-emi"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-neutral-50"
              style={{ color: "var(--color-neutral-700)" }}
            >
              <Calculator size={14} /> EMI Calculator
            </Link>

            <Link
              href="/eligibility-checker"
              id="nav-eligibility"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-neutral-50"
              style={{ color: "var(--color-neutral-700)" }}
            >
              <CheckCircle size={14} /> Eligibility
            </Link>

            <Link
              href="/about"
              id="nav-about"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-neutral-50"
              style={{ color: "var(--color-neutral-700)" }}
            >
              About
            </Link>

            <Link
              href="/contact"
              id="nav-contact"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-neutral-50"
              style={{ color: "var(--color-neutral-700)" }}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 ml-auto">
            <a
              href={`https://wa.me/919885660222?text=${encodeURIComponent("Hi! I'd like to enquire about loans / insurance from Lending Hub.")}`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#25d366" }}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link
              href="/eligibility-checker"
              id="header-cta-eligibility"
              className="btn btn-secondary text-sm"
            >
              Check Eligibility
            </Link>
            <Link
              href="/apply"
              id="header-cta-apply"
              className="btn btn-primary text-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden ml-auto p-2 rounded-lg"
            style={{ color: "var(--color-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "var(--color-neutral-100)",
            }}
          >
            <div className="container-lh py-4 flex flex-col gap-1">
              {/* Loans */}
              <button
                id="mobile-loans-toggle"
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold"
                style={{ color: "var(--color-secondary)" }}
                onClick={() => setLoansOpen(!loansOpen)}
              >
                Loans
                <ChevronDown
                  size={16}
                  className="transition-transform"
                  style={{ transform: loansOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {loansOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {loanLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded-lg text-sm font-medium"
                      style={{ color: "var(--color-neutral-600)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Insurance */}
              <button
                id="mobile-insurance-toggle"
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold"
                style={{ color: "var(--color-secondary)" }}
                onClick={() => setInsuranceOpen(!insuranceOpen)}
              >
                Insurance
                <ChevronDown
                  size={16}
                  className="transition-transform"
                  style={{ transform: insuranceOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {insuranceOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {insuranceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded-lg text-sm font-medium"
                      style={{ color: "var(--color-neutral-600)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/emi-calculator" className="px-3 py-2.5 rounded-lg text-sm font-semibold" style={{ color: "var(--color-secondary)" }} onClick={() => setMobileOpen(false)}>EMI Calculator</Link>
              <Link href="/eligibility-checker" className="px-3 py-2.5 rounded-lg text-sm font-semibold" style={{ color: "var(--color-secondary)" }} onClick={() => setMobileOpen(false)}>Eligibility Checker</Link>
              <Link href="/about" className="px-3 py-2.5 rounded-lg text-sm font-semibold" style={{ color: "var(--color-secondary)" }} onClick={() => setMobileOpen(false)}>About Us</Link>
              <Link href="/contact" className="px-3 py-2.5 rounded-lg text-sm font-semibold" style={{ color: "var(--color-secondary)" }} onClick={() => setMobileOpen(false)}>Contact</Link>

              <div className="flex flex-col gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--color-neutral-100)" }}>
                <Link href="/eligibility-checker" className="btn btn-secondary w-full text-center" onClick={() => setMobileOpen(false)}>Check Eligibility</Link>
                <Link href="/apply" className="btn btn-primary w-full text-center" onClick={() => setMobileOpen(false)}>Apply Now</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
