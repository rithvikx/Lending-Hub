import { type NextRequest } from "next/server";
import { readProductData, writeProductData } from "@/lib/cms";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "lendinghub-admin";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  if (!category || !slug) {
    return Response.json({ error: "category and slug are required" }, { status: 400 });
  }

  try {
    const data = readProductData(category, slug);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  // Check password header
  const password = request.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { category: string; slug: string; data: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { category, slug, data } = body;

  if (!category || !slug || !data) {
    return Response.json({ error: "category, slug, and data are required" }, { status: 400 });
  }

  // Validate slug to prevent path traversal
  if (!/^[a-z0-9-]+$/.test(slug) || !/^[a-z0-9-]+$/.test(category)) {
    return Response.json({ error: "Invalid slug or category" }, { status: 400 });
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
