"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const waUrl = `https://wa.me/919885660222?text=${encodeURIComponent(
    "Hi! I need help with a loan or insurance query from Lending Hub."
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-float"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-40 hidden md:flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25d366" }}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-ring 2.2s ease-out infinite",
          backgroundColor: "#25d366",
        }}
      />
      <MessageCircle size={26} color="#ffffff" className="relative z-10" />
    </a>
  );
}
