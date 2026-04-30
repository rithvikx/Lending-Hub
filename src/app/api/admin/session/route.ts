import { NextRequest } from "next/server";
import {
  validateAdminPassword,
  createAdminToken,
  validateAdminToken,
  extractBearerToken,
} from "@/lib/security";

/**
 * POST /api/admin/session
 * Body: { password: string }
 * Returns: { token: string }  — HMAC-signed, expires in 8 hours
 *
 * The token is stateless (no server-side store needed).
 * Rate limiting is handled upstream in proxy.ts (5 attempts / 15 min / IP).
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("password" in body)) {
    return Response.json({ error: "Password required" }, { status: 400 });
  }

  const { password } = body as { password: unknown };

  // Artificial constant-time delay to slow down brute force even if rate limiter
  // is bypassed due to cold-start resets
  await new Promise((r) => setTimeout(r, 250));

  if (!validateAdminPassword(typeof password === "string" ? password : null)) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createAdminToken();
  return Response.json({ token }, { status: 200 });
}

/**
 * GET /api/admin/session
 * Validates an existing token without issuing a new one.
 * Used by admin pages to verify session on load.
 */
export async function GET(req: NextRequest) {
  const token = extractBearerToken(req.headers.get("authorization"));
  const valid = validateAdminToken(token);
  return Response.json({ valid }, { status: valid ? 200 : 401 });
}
