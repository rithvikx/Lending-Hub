import { type NextRequest } from "next/server";
import { readNavigation, writeNavigation } from "@/lib/cms";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "lendinghub-admin";

export async function GET() {
  const nav = readNavigation();
  return Response.json(nav);
}

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { loans: unknown; insurance: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.loans || !body.insurance) {
    return Response.json({ error: "loans and insurance arrays required" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    writeNavigation(body as any);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Nav write error:", err);
    return Response.json({ error: "Failed to write navigation" }, { status: 500 });
  }
}
