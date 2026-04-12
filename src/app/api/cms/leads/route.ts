import { readLeads } from "@/lib/cms";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "lendinhubadmin@2888";

export async function GET(request: Request) {
  const password = request.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = readLeads();
  // Return newest first
  return Response.json(leads.reverse());
}
