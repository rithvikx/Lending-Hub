import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { readNavigation } from "@/lib/cms";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lending Hub — Loans & Insurance Made Simple",
  description:
    "Compare personal loans, business loans, LAP, vehicle loans, car insurance, bike insurance, health & life insurance with Lending Hub. Quick eligibility check, EMI calculator, and fast callback support.",
  keywords:
    "personal loan, business loan, loan against property, vehicle loan, car insurance, bike insurance, health insurance, life insurance, EMI calculator, eligibility checker, Hyderabad",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lendinghub.in",
    siteName: "Lending Hub",
    title: "Lending Hub — Loans & Insurance Made Simple",
    description:
      "Get the right loan or insurance plan without the confusion. Compare smarter, apply faster with Lending Hub.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lending Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lending Hub — Loans & Insurance Made Simple",
    description: "Compare smarter. Apply faster. Borrow with confidence.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nav = readNavigation();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      >
        <Header loanLinks={nav.loans} insuranceLinks={nav.insurance} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomBar />
      </body>
    </html>
  );
}
