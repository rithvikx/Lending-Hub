"use client";
import Link from "next/link";
import { CheckCircle, MessageCircle, Phone } from "lucide-react";

export default function MobileBottomBar() {
  return (
    <div
      className="mobile-sticky-bar fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid var(--color-neutral-200)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="grid grid-cols-3 gap-0.5 p-2">
        <Link
          href="/eligibility-checker"
          id="mobile-bar-eligibility"
          className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl font-semibold text-xs transition-all active:scale-95"
          style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
        >
          <CheckCircle size={18} />
          <span>Eligibility</span>
        </Link>

        <a
          href={`https://wa.me/919885660222?text=${encodeURIComponent("Hi! I need help with loans or insurance from Lending Hub.")}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bar-whatsapp"
          className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl font-semibold text-xs transition-all active:scale-95 text-white"
          style={{ backgroundColor: "#25d366" }}
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

        <a
          href="tel:+919885660222"
          id="mobile-bar-call"
          className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl font-semibold text-xs transition-all active:scale-95"
          style={{
            backgroundColor: "var(--color-secondary-light)",
            color: "var(--color-secondary)",
          }}
        >
          <Phone size={18} />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
}
