import { NextRequest, NextResponse } from "next/server";

// ── Security headers applied to every response ─────────────────────────────
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' required by React in development (reconstructing call stacks).
  // Never included in production builds.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-XSS-Protection": "0",
  "Content-Security-Policy": csp,
};

// ── Paths that must never be publicly accessible ───────────────────────────
const BLOCKED_PATH_PREFIXES = ["/.env", "/data", "/private", "/config"];

// ── In-process rate limiter (best-effort; resets on isolate cold start) ────
interface Bucket {
  count: number;
  resetAt: number;
}
const _buckets = new Map<string, Bucket>();

function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = _buckets.get(key);
  if (!b || now > b.resetAt) {
    _buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}

// ── Proxy (Next.js 16 — replaces middleware.ts) ────────────────────────────
export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  // 1. Block sensitive path prefixes — return 404 (not 403 to not reveal existence)
  for (const prefix of BLOCKED_PATH_PREFIXES) {
    if (pathname.toLowerCase().startsWith(prefix)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  // 2. Rate limiting — apply to API routes most aggressively
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (pathname.startsWith("/api/lead")) {
    // Lead submission: max 5 per minute per IP (form spam protection)
    if (!rateLimit(`lead:${ip}`, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  } else if (pathname.startsWith("/api/admin/session")) {
    // Login attempts: max 5 per 15 minutes per IP (brute-force protection)
    if (!rateLimit(`login:${ip}`, 5, 15 * 60_000)) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again in 15 minutes." },
        { status: 429, headers: { "Retry-After": "900" } }
      );
    }
  } else if (pathname.startsWith("/api/")) {
    // All other API routes: max 60 per minute per IP
    if (!rateLimit(`api:${ip}`, 60, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }

  // 3. Attach security headers to every response
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot)).*)",
  ],
};
