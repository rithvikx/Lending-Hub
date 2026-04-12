"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Edit3,
  FileText,
  Shield,
  Car,
  Bike,
  Heart,
  Umbrella,
  Wallet,
  Building2,
  Home,
  ChevronRight,
  CheckCircle,
  Plus,
  Landmark,
  Loader2,
} from "lucide-react";

type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  "personal-loan": Wallet,
  "business-loan": Building2,
  "loan-against-property": Home,
  "vehicle-loan": Car,
  "car-insurance": Car,
  "bike-insurance": Bike,
  "health-insurance": Heart,
  "life-insurance": Umbrella,
};

const SESSION_KEY = "lh_admin_auth";

interface ProductItem { category: string; slug: string; title: string }

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  // Load products after auth
  useEffect(() => {
    if (!authed) return;
    setLoadingProducts(true);
    fetch("/api/cms/list")
      .then((r) => r.json())
      .then((data: ProductItem[]) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoadingProducts(false));
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    // Validate by attempting a write to a dummy route (will get 500 if auth passes but invalid slug)
    const ping = await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ category: "_ping", slug: "_ping", data: {} }),
    });
    if (ping.status === 401) {
      setLoginError("Incorrect password. Please try again.");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "true");
    sessionStorage.setItem("lh_admin_pw", password);
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem("lh_admin_pw");
    setAuthed(false);
    setPassword("");
    setProducts([]);
    router.refresh();
  }

  if (checking) return null;

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f8faff 100%)" }}>
        <div className="w-full max-w-md mx-4 rounded-2xl p-8"
          style={{ background: "#fff", boxShadow: "0 8px 40px rgba(0,41,122,0.12)", border: "1px solid var(--color-neutral-200)" }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #0090FF, #00297A)" }}>
              <Shield size={32} color="#fff" />
            </div>
            <h1 className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
              Admin Panel
            </h1>
            <p className="text-sm" style={{ color: "var(--color-neutral-500)" }}>
              Lending Hub Content Management
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="admin-password" className="label-lh">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-neutral-400)" }} />
                <input
                  id="admin-password"
                  type="password"
                  className="input-lh"
                  style={{ paddingLeft: "2.5rem" }}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              {loginError && <p className="text-sm mt-2" style={{ color: "#dc2626" }}>{loginError}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">Sign In</button>
          </form>
          <p className="compliance-text text-center mt-6">
            This admin panel is for authorised Lending Hub staff only.
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  const loans = products.filter((p) => p.category === "loans");
  const insurance = products.filter((p) => p.category === "insurance");

  return (
    <div className="min-h-screen" style={{ background: "var(--color-neutral-50)" }}>
      {/* Admin top bar */}
      <div className="sticky top-0 z-40 border-b"
        style={{ background: "#fff", borderColor: "var(--color-neutral-200)", boxShadow: "0 1px 0 0 rgba(0,0,0,0.06)" }}>
        <div className="container-lh flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0090FF, #00297A)" }}>
              <Shield size={18} color="#fff" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight" style={{ color: "var(--color-secondary)" }}>
                Lending Hub Admin
              </h2>
              <p className="text-xs" style={{ color: "var(--color-neutral-500)" }}>Content Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/leads" className="text-sm font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-neutral-50" style={{ color: "var(--color-secondary)" }}>
              📥 Leads
            </Link>
            <Link href="/" target="_blank" className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              View Site ↗
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-red-50"
              style={{ color: "#dc2626" }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container-lh py-10">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} style={{ color: "var(--color-primary)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>You&apos;re signed in</span>
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}>
              Content Dashboard
            </h1>
            <p className="mt-1" style={{ color: "var(--color-neutral-500)" }}>
              Edit loan and insurance page content. Changes go live immediately.
            </p>
          </div>
          {/* New Product Button */}
          <Link
            href="/admin/new"
            className="btn btn-primary flex items-center gap-2"
            style={{ alignSelf: "flex-start" }}
          >
            <Plus size={16} /> New Product
          </Link>
        </div>

        {loadingProducts ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin" style={{ color: "var(--color-primary)" }} />
          </div>
        ) : (
          <>
            {/* Loans section */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} style={{ color: "var(--color-primary)" }} />
                <h2 className="text-lg font-bold" style={{ color: "var(--color-secondary)" }}>Loans</h2>
                <span className="chip chip-blue" style={{ fontSize: "0.7rem" }}>{loans.length} pages</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {loans.map((p) => <ProductCard key={p.slug} product={p} colorClass="blue" />)}
                {/* Add New Loan shortcut */}
                <Link href="/admin/new" className="card p-5 flex flex-col items-center justify-center gap-2 border-dashed hover:border-blue-300 transition-colors min-h-[140px]"
                  style={{ borderStyle: "dashed", textDecoration: "none" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-primary-light)" }}>
                    <Plus size={20} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <p className="text-sm font-semibold text-center" style={{ color: "var(--color-primary)" }}>Add New Loan</p>
                </Link>
              </div>
            </section>

            {/* Insurance section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} style={{ color: "var(--color-secondary)" }} />
                <h2 className="text-lg font-bold" style={{ color: "var(--color-secondary)" }}>Insurance</h2>
                <span className="chip chip-navy" style={{ fontSize: "0.7rem" }}>{insurance.length} pages</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {insurance.map((p) => <ProductCard key={p.slug} product={p} colorClass="navy" />)}
                {/* Add New Insurance shortcut */}
                <Link href="/admin/new" className="card p-5 flex flex-col items-center justify-center gap-2 border-dashed hover:border-blue-300 transition-colors min-h-[140px]"
                  style={{ borderStyle: "dashed", textDecoration: "none" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-secondary-light)" }}>
                    <Plus size={20} style={{ color: "var(--color-secondary)" }} />
                  </div>
                  <p className="text-sm font-semibold text-center" style={{ color: "var(--color-secondary)" }}>Add New Insurance</p>
                </Link>
              </div>
            </section>
          </>
        )}

        <p className="compliance-text text-center mt-12">
          Changes are saved to the server instantly. No rebuild required.
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product, colorClass }: { product: ProductItem; colorClass: "blue" | "navy" }) {
  const Icon = ICON_MAP[product.slug] ?? Landmark;
  const isBlue = colorClass === "blue";
  return (
    <Link
      href={`/admin/edit/${product.category}/${product.slug}`}
      className="card p-5 flex flex-col gap-3 group cursor-pointer"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: isBlue ? "var(--color-primary-light)" : "var(--color-secondary-light)" }}>
          <Icon size={20} style={{ color: isBlue ? "var(--color-primary)" : "var(--color-secondary)" }} />
        </div>
        <Edit3 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-neutral-400)" }} />
      </div>
      <div>
        <p className="font-semibold text-sm" style={{ color: "var(--color-secondary)" }}>{product.title}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--color-neutral-400)" }}>/{product.category}/{product.slug}</p>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold mt-auto"
        style={{ color: isBlue ? "var(--color-primary)" : "var(--color-secondary)" }}>
        Edit content <ChevronRight size={12} />
      </div>
    </Link>
  );
}
