import { readLeads } from "@/lib/cms";
import { isAuthorizedAdmin } from "@/lib/security";

export async function GET(request: Request) {
  if (!isAuthorizedAdmin(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = readLeads();
  return Response.json(leads.slice().reverse());
}
