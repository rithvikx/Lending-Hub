import crypto from "crypto";

// ── HTML Escaping (prevents XSS in email templates and rendered output) ────
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Safe string extraction from untrusted input ────────────────────────────
export function sanitizeString(input: unknown, maxLen = 500): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLen);
}

// ── Field validators ───────────────────────────────────────────────────────
export function isValidMobile(mobile: string): boolean {
  // Indian mobile numbers: starts with 6-9, exactly 10 digits
  return /^[6-9]\d{9}$/.test(mobile);
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ── Admin password: timing-safe comparison ─────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "lendinghub-admin";

export function validateAdminPassword(password: string | null | undefined): boolean {
  if (!password || typeof password !== "string") return false;
  // Truncate oversized input to prevent DoS before comparison
  const candidate = password.slice(0, 1000);
  const expected = Buffer.from(ADMIN_PASSWORD, "utf8");
  const provided = Buffer.from(candidate, "utf8");
  // Must be same length before timingSafeEqual (it throws on length mismatch)
  if (expected.length !== provided.length) {
    // Still call something timing-equivalent to prevent oracle
    crypto.timingSafeEqual(expected, expected);
    return false;
  }
  return crypto.timingSafeEqual(expected, provided);
}

// ── HMAC-signed stateless admin session token ──────────────────────────────
// Token format: base64url(payload).base64url(HMAC-SHA256)
// Stateless — works across Vercel serverless cold starts.
// Invalidated automatically when ADMIN_PASSWORD rotates.

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function signingKey(): Buffer {
  // Derive a sub-key so rotating ADMIN_PASSWORD also rotates tokens
  return crypto.createHash("sha256").update(ADMIN_PASSWORD + ":admin-session-v1").digest();
}

export function createAdminToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ iat: Date.now(), exp: Date.now() + TOKEN_TTL_MS })
  ).toString("base64url");

  const sig = crypto
    .createHmac("sha256", signingKey())
    .update(payload)
    .digest("base64url");

  return `${payload}.${sig}`;
}

export function validateAdminToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;

  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expectedSig = crypto
    .createHmac("sha256", signingKey())
    .update(payload)
    .digest("base64url");

  // Pad to equal length before timingSafeEqual (base64url lengths can differ)
  const maxLen = Math.max(sig.length, expectedSig.length);
  const a = Buffer.from(sig.padEnd(maxLen, "\0"));
  const b = Buffer.from(expectedSig.padEnd(maxLen, "\0"));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const { exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp: number };
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

// ── Extract Bearer token from Authorization header ─────────────────────────
export function extractBearerToken(authHeader: string | null | undefined): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const t = authHeader.slice(7).trim();
  return t.length > 0 ? t : null;
}

// ── Require valid admin auth (token or legacy password header fallback) ─────
// Returns true if request carries valid admin credentials.
export function isAuthorizedAdmin(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const token = extractBearerToken(authHeader);
  if (token && validateAdminToken(token)) return true;

  // Legacy header still accepted for one-step backward compat
  // Remove this block once all admin clients migrate to tokens
  const legacyPw = request.headers.get("x-admin-password");
  if (legacyPw && validateAdminPassword(legacyPw)) return true;

  return false;
}

// ── In-process rate limiter (best-effort; resets on cold starts) ───────────
// For production-grade limiting, replace with Vercel KV / Upstash Redis.
interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const _buckets = new Map<string, RateLimitBucket>();
let _lastCleanup = Date.now();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Periodic GC to prevent unbounded Map growth
  if (now - _lastCleanup > 60_000) {
    _lastCleanup = now;
    for (const [k, b] of _buckets) {
      if (now > b.resetAt) _buckets.delete(k);
    }
  }

  const bucket = _buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    _buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count++;
  return true;
}
