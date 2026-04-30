import { type NextRequest } from "next/server";
import { readProductData, writeProductData } from "@/lib/cms";
import { isAuthorizedAdmin } from "@/lib/security";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  if (!category || !slug) {
    return Response.json({ error: "category and slug are required" }, { status: 400 });
  }

  // Validate to prevent path traversal even though readProductData also validates
  if (!/^[a-z0-9-]+$/.test(category) || !/^[a-z0-9-]+$/.test(slug)) {
    return Response.json({ error: "Invalid category or slug" }, { status: 400 });
  }

  try {
    const data = readProductData(category, slug);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { category?: unknown; slug?: unknown; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { category, slug, data } = body;

  if (
    typeof category !== "string" ||
    typeof slug !== "string" ||
    !data ||
    typeof data !== "object"
  ) {
    return Response.json(
      { error: "category (string), slug (string), and data (object) are required" },
      { status: 400 }
    );
  }

  // Strict slug/category validation — no path separators or special chars
  if (!/^[a-z0-9-]{1,80}$/.test(slug) || !/^[a-z0-9-]{1,40}$/.test(category)) {
    return Response.json({ error: "Invalid slug or category format" }, { status: 400 });
  }

  // Ping endpoint used by the admin login flow — return ok without writing
  if (category === "_ping" && slug === "_ping") {
    return Response.json({ ok: true });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    writeProductData(category, slug, data as any);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("CMS write error:", err);
    return Response.json({ error: "Failed to write data" }, { status: 500 });
  }
}
