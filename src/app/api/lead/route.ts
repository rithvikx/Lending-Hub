import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lead = {
      ...body,
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: req.headers.get("user-agent") ?? "unknown",
    };

    // Log lead — ready for CRM/Zoho/LeadSquared integration
    console.log("[LEAD CAPTURE]", JSON.stringify(lead, null, 2));

    // TODO: Forward to CRM
    // await zoho.createLead(lead);
    // await sendSMS(lead.mobile, "Thank you for contacting Lending Hub. Our advisor will call you shortly.");

    return NextResponse.json({ success: true, message: "Lead captured" }, { status: 200 });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
