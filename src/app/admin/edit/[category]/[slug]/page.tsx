"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface RelatedProduct {
  label: string;
  href: string;
}

interface ProductData {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
  eligibility: string[];
  documents: string[];
  relatedProducts: RelatedProduct[];
}

const SESSION_KEY = "lh_admin_auth";

export default function EditProductPage() {
  const params = useParams<{ category: string; slug: string }>();
  const router = useRouter();
  const { category, slug } = params;

  const [data, setData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const password =
    typeof window !== "undefined"
      ? sessionStorage.getItem("lh_admin_pw") ?? ""
      : "";

  // Auth guard
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem(SESSION_KEY) !== "true") {
        router.replace("/admin");
      }
    }
  }, [router]);

  // Load product data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms?category=${category}&slug=${slug}`);
      if (!res.ok) throw new Error("Not found");
      const json = await res.json();
      setData(json as ProductData);
    } catch {
      setErrorMsg("Failed to load product data.");
    } finally {
      setLoading(false);
    }
  }, [category, slug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaveStatus("idle");
    try {
      const pw = sessionStorage.getItem("lh_admin_pw") ?? password;
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": pw,
        },
        body: JSON.stringify({ category, slug, data }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Save failed");
      }
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      setSaveStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  // Array field helpers
  function updateArrayItem(
    field: "features" | "eligibility" | "documents",
    index: number,
    value: string
  ) {
    if (!data) return;
    const arr = [...data[field]];
    arr[index] = value;
    setData({ ...data, [field]: arr });
  }

  function addArrayItem(field: "features" | "eligibility" | "documents") {
    if (!data) return;
    setData({ ...data, [field]: [...data[field], ""] });
  }

  function removeArrayItem(
    field: "features" | "eligibility" | "documents",
    index: number
  ) {
    if (!data) return;
    setData({ ...data, [field]: data[field].filter((_, i) => i !== index) });
  }

  // Related products helpers
  function updateRelated(index: number, key: "label" | "href", value: string) {
    if (!data) return;
    const arr = [...data.relatedProducts];
    arr[index] = { ...arr[index], [key]: value };
    setData({ ...data, relatedProducts: arr });
  }

  function addRelated() {
    if (!data) return;
    setData({
      ...data,
      relatedProducts: [...data.relatedProducts, { label: "", href: "" }],
    });
  }

  function removeRelated(index: number) {
    if (!data) return;
    setData({
      ...data,
      relatedProducts: data.relatedProducts.filter((_, i) => i !== index),
    });
  }

  const pageHref =
    category === "loans" ? `/loans/${slug}` : `/insurance/${slug}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-neutral-50)" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-neutral-50)" }}>
        <div className="text-center">
          <AlertCircle size={40} className="mx-auto mb-3" style={{ color: "#dc2626" }} />
          <p style={{ color: "var(--color-neutral-700)" }}>{errorMsg || "Product not found."}</p>
          <Link href="/admin" className="btn btn-secondary mt-4">← Back to Admin</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-neutral-50)" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{
          background: "#fff",
          borderColor: "var(--color-neutral-200)",
          boxShadow: "0 1px 0 0 rgba(0,0,0,0.06)",
        }}
      >
        <div className="container-lh flex items-center justify-between py-3.5 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm font-semibold flex-shrink-0 hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-secondary)" }}
            >
              <ArrowLeft size={14} /> Admin
            </Link>
            <span style={{ color: "var(--color-neutral-300)" }}>/</span>
            <span className="text-sm font-semibold truncate" style={{ color: "var(--color-neutral-600)" }}>
              {data.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a
              href={pageHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              <ExternalLink size={13} /> View Page
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary text-sm flex items-center gap-2"
              style={{ padding: "0.5rem 1.25rem" }}
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Save status bar */}
        {saveStatus !== "idle" && (
          <div
            className="py-2 px-4 flex items-center gap-2 text-sm font-medium"
            style={{
              background:
                saveStatus === "success" ? "#ecfdf5" : "#fef2f2",
              color: saveStatus === "success" ? "#065f46" : "#991b1b",
              borderTop:
                saveStatus === "success"
                  ? "1px solid #a7f3d0"
                  : "1px solid #fecaca",
            }}
          >
            {saveStatus === "success" ? (
              <>
                <CheckCircle size={14} /> Changes saved successfully! The page is updated.
              </>
            ) : (
              <>
                <AlertCircle size={14} /> {errorMsg || "Failed to save. Check your password or try again."}
              </>
            )}
          </div>
        )}
      </div>

      <div className="container-lh max-w-3xl py-10">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0090FF, #00297A)" }}
          >
            <Shield size={18} color="#fff" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
              {category}
            </p>
            <h1
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
            >
              {data.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Basic fields */}
          <div className="card p-6">
            <h2
              className="text-base font-bold mb-5"
              style={{ color: "var(--color-secondary)" }}
            >
              Basic Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-lh" htmlFor="f-badge">Badge Text</label>
                <input
                  id="f-badge"
                  type="text"
                  className="input-lh"
                  value={data.badge}
                  onChange={(e) => setData({ ...data, badge: e.target.value })}
                  placeholder="e.g. Fast Approval"
                />
              </div>
              <div>
                <label className="label-lh" htmlFor="f-title">Page Title</label>
                <input
                  id="f-title"
                  type="text"
                  className="input-lh"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="e.g. Personal Loan"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label-lh" htmlFor="f-tagline">Tagline</label>
                <input
                  id="f-tagline"
                  type="text"
                  className="input-lh"
                  value={data.tagline}
                  onChange={(e) => setData({ ...data, tagline: e.target.value })}
                  placeholder="Short catchy line under the title"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label-lh" htmlFor="f-description">Description</label>
                <textarea
                  id="f-description"
                  className="input-lh"
                  style={{ minHeight: "100px", resize: "vertical" }}
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Full paragraph shown on the product page"
                />
              </div>
              <div>
                <label className="label-lh" htmlFor="f-cta-label">CTA Button Text</label>
                <input
                  id="f-cta-label"
                  type="text"
                  className="input-lh"
                  value={data.ctaLabel}
                  onChange={(e) => setData({ ...data, ctaLabel: e.target.value })}
                  placeholder="e.g. Apply Now"
                />
              </div>
              <div>
                <label className="label-lh" htmlFor="f-cta-href">CTA Button Link</label>
                <input
                  id="f-cta-href"
                  type="text"
                  className="input-lh"
                  value={data.ctaHref}
                  onChange={(e) => setData({ ...data, ctaHref: e.target.value })}
                  placeholder="/apply"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <ArrayEditor
            title="Key Features"
            items={data.features}
            placeholder="Enter a feature"
            onUpdate={(i, v) => updateArrayItem("features", i, v)}
            onAdd={() => addArrayItem("features")}
            onRemove={(i) => removeArrayItem("features", i)}
          />

          {/* Eligibility */}
          <ArrayEditor
            title="Eligibility Criteria"
            items={data.eligibility}
            placeholder="Enter an eligibility criterion"
            onUpdate={(i, v) => updateArrayItem("eligibility", i, v)}
            onAdd={() => addArrayItem("eligibility")}
            onRemove={(i) => removeArrayItem("eligibility", i)}
          />

          {/* Documents */}
          <ArrayEditor
            title="Documents Required"
            items={data.documents}
            placeholder="Enter a document"
            onUpdate={(i, v) => updateArrayItem("documents", i, v)}
            onAdd={() => addArrayItem("documents")}
            onRemove={(i) => removeArrayItem("documents", i)}
          />

          {/* Related Products */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold" style={{ color: "var(--color-secondary)" }}>
                Related Products
              </h2>
              <button
                onClick={addRelated}
                className="flex items-center gap-1.5 text-sm font-semibold btn btn-secondary"
                style={{ padding: "0.4rem 0.875rem" }}
              >
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {data.relatedProducts.map((rp, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="input-lh flex-1"
                    placeholder="Label (e.g. Business Loan)"
                    value={rp.label}
                    onChange={(e) => updateRelated(i, "label", e.target.value)}
                  />
                  <input
                    type="text"
                    className="input-lh flex-1"
                    placeholder="Link (e.g. /loans/business-loan)"
                    value={rp.href}
                    onChange={(e) => updateRelated(i, "href", e.target.value)}
                  />
                  <button
                    onClick={() => removeRelated(i)}
                    className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-red-50"
                    style={{ color: "#dc2626" }}
                    aria-label="Remove related product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {data.relatedProducts.length === 0 && (
                <p className="text-sm" style={{ color: "var(--color-neutral-400)" }}>
                  No related products. Click Add to add one.
                </p>
              )}
            </div>
          </div>

          {/* Save button (bottom) */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Saving changes…" : "Save All Changes"}
          </button>

          <p className="compliance-text text-center">
            Changes are written to the server immediately and reflected on the public page.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Reusable array field editor ──────────────────────────────────────────────

function ArrayEditor({
  title,
  items,
  placeholder,
  onUpdate,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  placeholder: string;
  onUpdate: (i: number, v: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold" style={{ color: "var(--color-secondary)" }}>
          {title}
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-sm font-semibold btn btn-secondary"
          style={{ padding: "0.4rem 0.875rem" }}
        >
          <Plus size={14} /> Add
        </button>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--color-primary)", minWidth: "1.5rem" }}
            >
              {i + 1}
            </div>
            <input
              type="text"
              className="input-lh flex-1"
              placeholder={placeholder}
              value={item}
              onChange={(e) => onUpdate(i, e.target.value)}
            />
            <button
              onClick={() => onRemove(i)}
              className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-red-50"
              style={{ color: "#dc2626" }}
              aria-label={`Remove item ${i + 1}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm" style={{ color: "var(--color-neutral-400)" }}>
            No items yet. Click Add to add one.
          </p>
        )}
      </div>
    </div>
  );
}
