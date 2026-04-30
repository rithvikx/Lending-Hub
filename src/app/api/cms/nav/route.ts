import { type NextRequest } from "next/server";
import { readNavigation, writeNavigation, type NavLink } from "@/lib/cms";
import { isAuthorizedAdmin, sanitizeString } from "@/lib/security";

export async function GET() {
  const nav = readNavigation();
  return Response.json(nav);
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "loans and insurance arrays required" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  if (!Array.isArray(raw.loans) || !Array.isArray(raw.insurance)) {
    return Response.json({ error: "loans and insurance must be arrays" }, { status: 400 });
  }

  // Validate and sanitize each nav link to prevent open redirects / injection
  function sanitizeNavLinks(arr: unknown[]): NavLink[] {
    return arr
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item) => ({
        href: sanitizeString(item.href, 200).replace(/[^a-zA-Z0-9/_-]/g, ""),
        label: sanitizeString(item.label, 60),
      }))
      .filter((link) => link.href.startsWith("/") && link.label.length > 0)
      .slice(0, 20); // max 20 nav items per category
  }

  const navData = {
    loans: sanitizeNavLinks(raw.loans),
    insurance: sanitizeNavLinks(raw.insurance),
    ...(Array.isArray(raw.cards) && { cards: sanitizeNavLinks(raw.cards) }),
  };

  try {
    writeNavigation(navData);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Nav write error:", err);
    return Response.json({ error: "Failed to write navigation" }, { status: 500 });
  }
}
