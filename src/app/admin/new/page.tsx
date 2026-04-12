"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface RelatedProduct { label: string; href: string }

const EMPTY: {
  badge: string; title: string; tagline: string; description: string;
  ctaLabel: string; ctaHref: string; features: string[]; eligibility: string[];
  documents: string[]; relatedProducts: RelatedProduct[];
} = {
  badge: "",
  title: "",
  tagline: "",
  description: "",
  ctaLabel: "Apply Now",
  ctaHref: "/apply",
  features: [""],
  eligibility: [""],
  documents: [""],
  relatedProducts: [],
};

const SESSION_KEY = "lh_admin_auth";

export default function NewProductPage() {
  const router = useRouter();
  const [category, setCategory] = useState<"loans" | "insurance">("loans");
  const [slug, setSlug] = useState("");
  const [addToNav, setAddToNav] = useState(true);
  const [data, setData] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugError, setSlugError] = useState("");

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) !== "true") {
      router.replace("/admin");
    }
  }, [router]);

  function validateSlug(val: string) {
    if (!/^[a-z0-9-]+$/.test(val)) {
      setSlugError("Only lowercase letters, numbers, and hyphens allowed.");
    } else {
      setSlugError("");
    }
    setSlug(val);
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSave() {
    if (!slug) { setSlugError("Slug is required."); return; }
    if (slugError) return;
    if (!data.title) { setError("Page title is required."); return; }
    setError("");
    setSaving(true);

    const pw = sessionStorage.getItem("lh_admin_pw") ?? "";

    try {
      // 1. Create the product JSON
      const productRes = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": pw },
        body: JSON.stringify({ category, slug, data }),
      });
      if (!productRes.ok) {
        const err = await productRes.json();
        throw new Error(err.error ?? "Failed to create product");
      }

      // 2. Optionally add to nav
      if (addToNav) {
        const navRes = await fetch("/api/cms/nav");
        if (navRes.ok) {
          const nav = await navRes.json() as { loans: {href:string;label:string}[]; insurance: {href:string;label:string}[] };
          const newLink = { href: `/${category}/${slug}`, label: data.title };
          const updated = {
            ...nav,
            [category]: [...nav[category], newLink],
          };
          await fetch("/api/cms/nav", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-admin-password": pw },
            body: JSON.stringify(updated),
          });
        }
      }

      // 3. Redirect to edit page
      router.push(`/admin/edit/${category}/${slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product.");
      setSaving(false);
    }
  }

  // Array helpers
  type ArrField = "features" | "eligibility" | "documents";
  function updateArr(field: ArrField, i: number, v: string) {
    const arr = [...data[field]]; arr[i] = v; setData({ ...data, [field]: arr });
  }
  function addArr(field: ArrField) { setData({ ...data, [field]: [...data[field], ""] }); }
  function removeArr(field: ArrField, i: number) { setData({ ...data, [field]: data[field].filter((_, idx) => idx !== i) }); }
  function updateRelated(i: number, key: "label" | "href", v: string) {
    const arr = [...data.relatedProducts]; arr[i] = { ...arr[i], [key]: v }; setData({ ...data, relatedProducts: arr });
  }

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
            <span className="text-sm font-semibold" style={{ color: "var(--color-neutral-600)" }}>New Product</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary text-sm flex items-center gap-2"
            style={{ padding: "0.5rem 1.25rem" }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Creating…" : "Create Product"}
          </button>
        </div>
        {error && (
          <div className="py-2 px-4 flex items-center gap-2 text-sm font-medium" style={{ background: "#fef2f2", color: "#991b1b", borderTop: "1px solid #fecaca" }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
      </div>

      <div className="container-lh max-w-3xl py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0090FF, #00297A)" }}>
            <Shield size={18} color="#fff" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>Admin</p>
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>Create New Product</h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Category & Slug */}
          <div className="card p-6">
            <h2 className="text-base font-bold mb-5" style={{ color: "var(--color-secondary)" }}>Product Identity</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-lh" htmlFor="new-category">Category</label>
                <select
                  id="new-category"
                  className="input-lh"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as "loans" | "insurance")}
                >
                  <option value="loans">Loans</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>
              <div>
                <label className="label-lh" htmlFor="new-slug">URL Slug</label>
                <input
                  id="new-slug"
                  type="text"
                  className="input-lh"
                  placeholder="e.g. home-loan"
                  value={slug}
                  onChange={(e) => validateSlug(e.target.value)}
                />
                {slugError && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{slugError}</p>}
                {slug && !slugError && (
                  <p className="text-xs mt-1" style={{ color: "var(--color-neutral-400)" }}>
                    URL: /{category}/{slug}
                  </p>
                )}
              </div>
            </div>

            {/* Nav toggle */}
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <div
                onClick={() => setAddToNav(!addToNav)}
                className="w-10 h-6 rounded-full relative transition-colors cursor-pointer flex-shrink-0"
                style={{ backgroundColor: addToNav ? "var(--color-primary)" : "var(--color-neutral-300)" }}
              >
                <div
                  className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                  style={{ left: addToNav ? "calc(100% - 1.25rem)" : "0.25rem" }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-neutral-700)" }}>Add to Navigation Menu</p>
                <p className="text-xs" style={{ color: "var(--color-neutral-400)" }}>Automatically add this to the Loans/Insurance dropdown in the header.</p>
              </div>
            </label>
          </div>

          {/* Basic Info */}
          <div className="card p-6">
            <h2 className="text-base font-bold mb-5" style={{ color: "var(--color-secondary)" }}>Basic Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-lh" htmlFor="new-badge">Badge Text</label>
                <input id="new-badge" type="text" className="input-lh" placeholder="e.g. Fast Approval" value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} />
              </div>
              <div>
                <label className="label-lh" htmlFor="new-title">Page Title *</label>
                <input
                  id="new-title"
                  type="text"
                  className="input-lh"
                  placeholder="e.g. Home Loan"
                  value={data.title}
                  onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                    if (!slug) setSlug(autoSlug(e.target.value));
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label-lh" htmlFor="new-tagline">Tagline</label>
                <input id="new-tagline" type="text" className="input-lh" placeholder="Short catchy line under the title" value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label-lh" htmlFor="new-description">Description</label>
                <textarea id="new-description" className="input-lh" style={{ minHeight: "100px", resize: "vertical" }} placeholder="Full paragraph shown on the product page" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
              </div>
              <div>
                <label className="label-lh" htmlFor="new-cta-label">CTA Button Text</label>
                <input id="new-cta-label" type="text" className="input-lh" value={data.ctaLabel} onChange={(e) => setData({ ...data, ctaLabel: e.target.value })} />
              </div>
              <div>
                <label className="label-lh" htmlFor="new-cta-href">CTA Button Link</label>
                <input id="new-cta-href" type="text" className="input-lh" value={data.ctaHref} onChange={(e) => setData({ ...data, ctaHref: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Features */}
          <ArraySection title="Key Features" items={data.features} placeholder="Enter a feature"
            onUpdate={(i, v) => updateArr("features", i, v)} onAdd={() => addArr("features")} onRemove={(i) => removeArr("features", i)} />

          {/* Eligibility */}
          <ArraySection title="Eligibility Criteria" items={data.eligibility} placeholder="Enter an eligibility criterion"
            onUpdate={(i, v) => updateArr("eligibility", i, v)} onAdd={() => addArr("eligibility")} onRemove={(i) => removeArr("eligibility", i)} />

          {/* Documents */}
          <ArraySection title="Documents Required" items={data.documents} placeholder="Enter a document"
            onUpdate={(i, v) => updateArr("documents", i, v)} onAdd={() => addArr("documents")} onRemove={(i) => removeArr("documents", i)} />

          {/* Related Products */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold" style={{ color: "var(--color-secondary)" }}>Related Products</h2>
              <button onClick={() => setData({ ...data, relatedProducts: [...data.relatedProducts, { label: "", href: "" }] })}
                className="flex items-center gap-1.5 text-sm font-semibold btn btn-secondary" style={{ padding: "0.4rem 0.875rem" }}>
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {data.relatedProducts.map((rp, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" className="input-lh flex-1" placeholder="Label" value={rp.label} onChange={(e) => updateRelated(i, "label", e.target.value)} />
                  <input type="text" className="input-lh flex-1" placeholder="Link (e.g. /loans/business-loan)" value={rp.href} onChange={(e) => updateRelated(i, "href", e.target.value)} />
                  <button onClick={() => setData({ ...data, relatedProducts: data.relatedProducts.filter((_, idx) => idx !== i) })}
                    className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-red-50" style={{ color: "#dc2626" }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {data.relatedProducts.length === 0 && (
                <p className="text-sm" style={{ color: "var(--color-neutral-400)" }}>No related products. Click Add to add one.</p>
              )}
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
            {saving ? "Creating product…" : "Create Product & Save"}
          </button>
          <p className="compliance-text text-center">The product page will be live immediately at /{category}/{slug}</p>
        </div>
      </div>
    </div>
  );
}

function ArraySection({ title, items, placeholder, onUpdate, onAdd, onRemove }: {
  title: string; items: string[]; placeholder: string;
  onUpdate: (i: number, v: string) => void; onAdd: () => void; onRemove: (i: number) => void;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold" style={{ color: "var(--color-secondary)" }}>{title}</h2>
        <button onClick={onAdd} className="flex items-center gap-1.5 text-sm font-semibold btn btn-secondary" style={{ padding: "0.4rem 0.875rem" }}>
          <Plus size={14} /> Add
        </button>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--color-primary)", minWidth: "1.5rem" }}>{i + 1}</div>
            <input type="text" className="input-lh flex-1" placeholder={placeholder} value={item} onChange={(e) => onUpdate(i, e.target.value)} />
            <button onClick={() => onRemove(i)} className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-red-50" style={{ color: "#dc2626" }}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm" style={{ color: "var(--color-neutral-400)" }}>No items. Click Add to add one.</p>}
      </div>
    </div>
  );
}
