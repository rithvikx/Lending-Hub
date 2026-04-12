"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Loader2, CheckCircle } from "lucide-react";

const DEFAULT_PRODUCTS = [
  "Personal Loan", "Business Loan", "Loan Against Property", "Vehicle Loan",
  "Car Insurance", "Bike Insurance", "Health Insurance", "Life Insurance", "Other",
];

export default function ContactPage() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", product: "", message: "", consent: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Fetch dynamic product list from CMS
  useEffect(() => {
    fetch("/api/cms/list")
      .then((r) => r.json())
      .then((data: { category: string; slug: string; title: string }[]) => {
        const titles = [...data.map((p) => p.title).filter(Boolean), "Other"];
        if (titles.length > 1) setProducts(titles);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "contact-page" }),
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="section" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 45%, #f8faff 100%)" }}>
        <div className="container-lh max-w-2xl text-center">
          <p className="section-label">Get in touch</p>
          <h1 className="section-title mx-auto mb-4" style={{ fontFamily: "var(--font-display)" }}>Contact Us</h1>
          <p className="section-subtitle mx-auto">
            Speak with Lending Hub&apos;s team for help with loans, insurance,
            eligibility checks, and application support.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-lh">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                Lending Hub Team
              </h2>
              <p className="text-sm font-bold mb-6" style={{ color: "var(--color-neutral-600)" }}>
                LENDING HUB TECHNOLOGIES PRIVATE LIMITED
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-primary-light)" }}>
                    <MapPin size={18} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-neutral-500)" }}>Visit Us</p>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-neutral-700)" }}>
                      H.No. 2-4-24, 1st Floor, Gandhi Nagar,<br />
                      Near Veg Market Main Road, Pillar No.10,<br />
                      Uppal, Ranga Reddy - 500 039,<br />
                      Hyderabad, Telangana.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-primary-light)" }}>
                    <Phone size={18} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-neutral-500)" }}>Call Us</p>
                    <a href="tel:+914040890152" className="block text-sm font-semibold hover:underline" style={{ color: "var(--color-secondary)" }}>+91 40 40890152</a>
                    <a href="tel:+919885660222" className="block text-sm font-semibold hover:underline" style={{ color: "var(--color-secondary)" }}>+91 9885660222</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-primary-light)" }}>
                    <Mail size={18} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-neutral-500)" }}>Email Us</p>
                    <a href="mailto:connect.lendinghub@gmail.com" className="text-sm font-semibold hover:underline" style={{ color: "var(--color-primary)" }}>
                      connect.lendinghub@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#e6faf0" }}>
                    <MessageCircle size={18} style={{ color: "#0d7a45" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-neutral-500)" }}>WhatsApp</p>
                    <a
                      href={`https://wa.me/919885660222?text=${encodeURIComponent("Hi! I need help from Lending Hub.")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold hover:underline" style={{ color: "#0d7a45" }}
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-secondary-light)" }}>
                    <Clock size={18} style={{ color: "var(--color-secondary)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-neutral-500)" }}>Working Hours</p>
                    <p className="text-sm font-medium" style={{ color: "var(--color-neutral-700)" }}>Monday – Saturday: 9 AM – 7 PM</p>
                    <p className="text-xs" style={{ color: "var(--color-neutral-400)" }}>Closed on Sundays and public holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className="card p-8">
                {done ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#e6faf0" }}>
                      <CheckCircle size={30} style={{ color: "#0d7a45" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                      Message Received!
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
                      Thank you, <strong>{form.name}</strong>. Our team will reach out to you within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
                      Send us a message
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="label-lh" htmlFor="contact-name">Full Name *</label>
                        <input id="contact-name" type="text" className="input-lh" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label-lh" htmlFor="contact-mobile">Mobile *</label>
                          <input id="contact-mobile" type="tel" className="input-lh" placeholder="10-digit number" pattern="[0-9]{10}" maxLength={10} value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
                        </div>
                        <div>
                          <label className="label-lh" htmlFor="contact-email">Email</label>
                          <input id="contact-email" type="email" className="input-lh" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                      </div>
                      <div>
                        <label className="label-lh" htmlFor="contact-product">I need help with</label>
                        <select id="contact-product" className="input-lh" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
                          <option value="">Select a product</option>
                          {products.map((p) => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="label-lh" htmlFor="contact-message">Message</label>
                        <textarea id="contact-message" className="input-lh" rows={3} placeholder="Briefly describe your requirement…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
                      </div>
                      <label className="flex items-start gap-2.5 cursor-pointer" htmlFor="contact-consent">
                        <input id="contact-consent" type="checkbox" className="mt-0.5 w-4 h-4 accent-blue-500" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} required />
                        <span className="text-xs leading-relaxed" style={{ color: "var(--color-neutral-500)" }}>
                          I consent to Lending Hub Technologies Pvt. Ltd. contacting me regarding my query. *
                        </span>
                      </label>
                      <button id="contact-submit" type="submit" className="btn btn-primary w-full" disabled={loading || !form.consent} style={{ minHeight: "50px" }}>
                        {loading ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Sending…</span> : "Send Message →"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
