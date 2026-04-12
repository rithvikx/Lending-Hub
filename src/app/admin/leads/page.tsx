"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Loader2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";

const SESSION_KEY = "lh_admin_auth";

interface Lead {
  name?: string;
  mobile?: string;
  email?: string;
  product?: string;
  source?: string;
  timestamp?: string;
  income?: string;
  city?: string;
  employmentType?: string;
  cibil?: string;
  readiness?: number;
  message?: string;
  ip?: string;
  [key: string]: unknown;
}

const PRIORITY_KEYS = ["timestamp", "name", "mobile", "email", "product", "source", "income", "city", "employmentType", "cibil", "readiness", "message"];

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) !== "true") {
      router.replace("/admin");
      return;
    }
    loadLeads();
  }, [router]);

  async function loadLeads() {
    setLoading(true);
    setError("");
    const pw = sessionStorage.getItem("lh_admin_pw") ?? "";
    try {
      const res = await fetch("/api/cms/leads", {
        headers: { "x-admin-password": pw },
      });
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json() as Lead[];
      setLeads(data);
    } catch {
      setError("Could not load leads. Please check your session.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(ts?: string) {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch { return ts; }
  }

  function sourceColor(source?: string) {
    if (!source) return "var(--color-neutral-400)";
    if (source.includes("hero")) return "var(--color-primary)";
    if (source.includes("apply")) return "#10b981";
    if (source.includes("eligibility")) return "#f59e0b";
    if (source.includes("contact")) return "var(--color-secondary)";
    return "var(--color-neutral-500)";
  }

  const filtered = leads.filter((l) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      l.name?.toLowerCase().includes(q) ||
      l.mobile?.includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.product?.toLowerCase().includes(q) ||
      l.source?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--color-neutral-50)" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b" style={{ background: "#fff", borderColor: "var(--color-neutral-200)", boxShadow: "0 1px 0 0 rgba(0,0,0,0.06)" }}>
        <div className="container-lh flex items-center justify-between py-3.5 gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "var(--color-secondary)" }}>
              <ArrowLeft size={14} /> Admin
            </Link>
            <span style={{ color: "var(--color-neutral-300)" }}>/</span>
            <span className="text-sm font-semibold" style={{ color: "var(--color-neutral-600)" }}>Leads</span>
          </div>
          <button onClick={loadLeads} className="btn btn-secondary text-sm" style={{ padding: "0.4rem 1rem" }}>
            Refresh
          </button>
        </div>
      </div>

      <div className="container-lh py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0090FF, #00297A)" }}>
                <Phone size={18} color="#fff" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>Admin</p>
                <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>Lead Inbox</h1>
              </div>
            </div>
            <p className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
              All form submissions from the website. {leads.length > 0 && `${leads.length} total enquiries.`}
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            className="input-lh max-w-xs"
            placeholder="Search by name, mobile, product…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ minHeight: "40px", fontSize: "0.875rem" }}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin" style={{ color: "var(--color-primary)" }} />
          </div>
        ) : error ? (
          <div className="card p-8 text-center">
            <p className="text-sm font-medium mb-3" style={{ color: "#dc2626" }}>{error}</p>
            <Link href="/admin" className="btn btn-secondary text-sm">Back to Admin</Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--color-neutral-100)" }}>
              <MessageCircle size={24} style={{ color: "var(--color-neutral-400)" }} />
            </div>
            <p className="text-base font-semibold mb-1" style={{ color: "var(--color-neutral-600)" }}>
              {filter ? "No leads match your search." : "No leads yet."}
            </p>
            <p className="text-sm" style={{ color: "var(--color-neutral-400)" }}>
              {filter ? "Try a different search term." : "Leads will appear here as users submit forms on the website."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((lead, i) => (
              <div key={i} className="card overflow-hidden">
                {/* Summary row */}
                <button
                  className="w-full text-left p-5 flex items-center gap-4"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #0090FF, #00297A)" }}>
                    {lead.name ? lead.name.charAt(0).toUpperCase() : "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm" style={{ color: "var(--color-secondary)" }}>{lead.name ?? "Unknown"}</p>
                      {lead.source && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${sourceColor(lead.source)}18`, color: sourceColor(lead.source) }}>
                          {lead.source.replace(/-/g, " ")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-0.5 flex-wrap">
                      {lead.mobile && (
                        <a href={`tel:+91${lead.mobile}`} className="flex items-center gap-1 text-xs font-medium"
                          style={{ color: "var(--color-primary)" }} onClick={(e) => e.stopPropagation()}>
                          <Phone size={11} /> +91 {lead.mobile}
                        </a>
                      )}
                      {lead.product && (
                        <span className="text-xs" style={{ color: "var(--color-neutral-500)" }}>{lead.product}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs" style={{ color: "var(--color-neutral-400)" }}>{formatDate(lead.timestamp)}</p>
                    <div className="flex items-center justify-end gap-1 mt-1" style={{ color: "var(--color-neutral-400)" }}>
                      {expanded === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>
                </button>

                {/* Expanded details */}
                {expanded === i && (
                  <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: "var(--color-neutral-100)", backgroundColor: "var(--color-neutral-50)" }}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                      {PRIORITY_KEYS.filter((k) => lead[k] !== undefined && lead[k] !== "").map((k) => (
                        <div key={k}>
                          <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--color-neutral-400)" }}>{k}</p>
                          <p className="text-sm font-medium" style={{ color: "var(--color-neutral-700)" }}>
                            {k === "timestamp" ? formatDate(String(lead[k])) : String(lead[k])}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-2 mt-4 pt-4 flex-wrap" style={{ borderTop: "1px solid var(--color-neutral-200)" }}>
                      {lead.mobile && (
                        <a href={`tel:+91${lead.mobile}`} className="btn btn-secondary text-xs" style={{ padding: "0.4rem 0.875rem" }}>
                          <Phone size={12} /> Call
                        </a>
                      )}
                      {lead.mobile && (
                        <a
                          href={`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(`Hi ${lead.name ?? ""}, this is Lending Hub. We received your enquiry regarding ${lead.product ?? ""}. How can we help?`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="btn text-xs text-white" style={{ padding: "0.4rem 0.875rem", backgroundColor: "#25d366" }}>
                          <MessageCircle size={12} /> WhatsApp
                        </a>
                      )}
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="btn btn-secondary text-xs" style={{ padding: "0.4rem 0.875rem" }}>
                          <Mail size={12} /> Email
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="compliance-text text-center mt-10">
          Lead data is stored server-side in <code>data/leads.jsonl</code>. Handle with care — contains personal information.
        </p>
      </div>
    </div>
  );
}
