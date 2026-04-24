"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import type { NavLink } from "@/lib/cms";

interface HeaderProps {
  loanLinks: NavLink[];
  insuranceLinks: NavLink[];
  cardLinks: NavLink[];
}

export default function Header({ loanLinks, insuranceLinks, cardLinks }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [cardsOpen, setCardsOpen] = useState(false);

  // Active section detection
  const isLoanActive = pathname.startsWith("/loans");
  const isInsuranceActive = pathname.startsWith("/insurance");
  const isCardsActive = pathname.startsWith("/cards");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /** Styles for a desktop dropdown trigger button */
  function triggerStyle(isOpen: boolean, isActive: boolean) {
    const active = isOpen || isActive;
    return {
      color: active ? "var(--color-primary)" : "var(--color-neutral-700)",
      backgroundColor: active ? "var(--color-primary-light, #eff6ff)" : "transparent",
    };
  }

  /** Styles for a plain desktop nav link */
  function linkStyle(href: string) {
    const active = pathname === href;
    return {
      color: active ? "var(--color-primary)" : "var(--color-neutral-700)",
      backgroundColor: active ? "var(--color-primary-light, #eff6ff)" : "transparent",
    };
  }

  return (
    <>
      {/* Top bar — desktop only */}
      <div className="hidden xl:block" style={{ backgroundColor: "var(--color-secondary)" }}>
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
        {/* Three-column grid: logo | centered-nav | CTAs */}
        <div className="container-lh py-3.5 xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center flex items-center">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center z-10" aria-label="Lending Hub Home">
            <Image
              src="/logo/logo.svg"
              alt="Lending Hub"
              width={861}
              height={250}
              className="h-[52px] w-auto md:h-[60px] object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center justify-center gap-1" aria-label="Main navigation">

            {/* Home */}
            <Link
              href="/"
              id="nav-home"
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
              style={linkStyle("/")}
            >
              Home
            </Link>

            {/* Loans dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
            >
              <button
                id="nav-loans"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
                style={triggerStyle(loansOpen, isLoanActive)}
                aria-expanded={loansOpen}
                aria-haspopup="true"
              >
                Loans
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: loansOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {loansOpen && (
                <div className="absolute top-full left-0 pt-1 w-60 z-50">
                  <div
                    className="rounded-xl border py-2"
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
                        style={{
                          color: pathname === link.href ? "var(--color-primary)" : "var(--color-neutral-700)",
                          fontWeight: pathname === link.href ? 600 : 500,
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
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
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
                style={triggerStyle(insuranceOpen, isInsuranceActive)}
                aria-expanded={insuranceOpen}
                aria-haspopup="true"
              >
                Insurance
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: insuranceOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {insuranceOpen && (
                <div className="absolute top-full left-0 pt-1 w-60 z-50">
                  <div
                    className="rounded-xl border py-2"
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
                        style={{
                          color: pathname === link.href ? "var(--color-primary)" : "var(--color-neutral-700)",
                          fontWeight: pathname === link.href ? 600 : 500,
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cards dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCardsOpen(true)}
              onMouseLeave={() => setCardsOpen(false)}
            >
              <button
                id="nav-cards"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
                style={triggerStyle(cardsOpen, isCardsActive)}
                aria-expanded={cardsOpen}
                aria-haspopup="true"
              >
                Cards
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: cardsOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {cardsOpen && (
                <div className="absolute top-full left-0 pt-1 w-48 z-50">
                  <div
                    className="rounded-xl border py-2"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "var(--color-neutral-200)",
                      boxShadow: "var(--shadow-card-hover)",
                    }}
                    role="menu"
                  >
                    {cardLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-blue-50"
                        style={{
                          color: pathname === link.href ? "var(--color-primary)" : "var(--color-neutral-700)",
                          fontWeight: pathname === link.href ? 600 : 500,
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/emi-calculator"
              id="nav-emi"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
              style={linkStyle("/emi-calculator")}
            >
              EMI Calculator
            </Link>

            <Link
              href="/about"
              id="nav-about"
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
              style={linkStyle("/about")}
            >
              About
            </Link>

            <Link
              href="/contact"
              id="nav-contact"
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap hover:bg-blue-50"
              style={linkStyle("/contact")}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs — right column */}
          <div className="hidden xl:flex items-center gap-2 justify-end flex-shrink-0">
            <a
              href={`https://wa.me/919885660222?text=${encodeURIComponent("Hi! I'd like to enquire about loans / insurance from Lending Hub.")}`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "#25d366" }}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link
              href="/apply"
              id="header-cta-apply"
              className="btn btn-primary text-sm whitespace-nowrap"
              style={{ padding: "0.5rem 1.25rem" }}
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="xl:hidden ml-auto p-2 rounded-lg"
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
            className="xl:hidden border-t"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "var(--color-neutral-100)",
            }}
          >
            <div className="container-lh py-4 flex flex-col gap-1">

              {/* Home */}
              <Link
                href="/"
                className="px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  color: pathname === "/" ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: pathname === "/" ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {/* Loans */}
              <button
                id="mobile-loans-toggle"
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors"
                style={{
                  color: isLoanActive || loansOpen ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: isLoanActive ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setLoansOpen(!loansOpen)}
              >
                Loans
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200"
                  style={{ transform: loansOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {loansOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {loanLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        color: pathname === link.href ? "var(--color-primary)" : "var(--color-neutral-600)",
                        fontWeight: pathname === link.href ? 600 : 500,
                        backgroundColor: pathname === link.href ? "var(--color-primary-light, #eff6ff)" : "transparent",
                      }}
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
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors"
                style={{
                  color: isInsuranceActive || insuranceOpen ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: isInsuranceActive ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setInsuranceOpen(!insuranceOpen)}
              >
                Insurance
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200"
                  style={{ transform: insuranceOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {insuranceOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {insuranceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        color: pathname === link.href ? "var(--color-primary)" : "var(--color-neutral-600)",
                        fontWeight: pathname === link.href ? 600 : 500,
                        backgroundColor: pathname === link.href ? "var(--color-primary-light, #eff6ff)" : "transparent",
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Cards */}
              <button
                id="mobile-cards-toggle"
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors"
                style={{
                  color: isCardsActive || cardsOpen ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: isCardsActive ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setCardsOpen(!cardsOpen)}
              >
                Cards
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200"
                  style={{ transform: cardsOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              {cardsOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {cardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        color: pathname === link.href ? "var(--color-primary)" : "var(--color-neutral-600)",
                        fontWeight: pathname === link.href ? 600 : 500,
                        backgroundColor: pathname === link.href ? "var(--color-primary-light, #eff6ff)" : "transparent",
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/emi-calculator" className="px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  color: pathname === "/emi-calculator" ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: pathname === "/emi-calculator" ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setMobileOpen(false)}>
                EMI Calculator
              </Link>
              <Link href="/about" className="px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  color: pathname === "/about" ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: pathname === "/about" ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setMobileOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  color: pathname === "/contact" ? "var(--color-primary)" : "var(--color-secondary)",
                  backgroundColor: pathname === "/contact" ? "var(--color-primary-light, #eff6ff)" : "transparent",
                }}
                onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

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
