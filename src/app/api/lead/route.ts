import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendLead } from "@/lib/cms";

/** Send email notification if SMTP is configured */
async function sendLeadEmail(lead: Record<string, unknown>): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log("[LEAD EMAIL] SMTP not configured — skipping email notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });

  const rows = Object.entries(lead)
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:6px 14px;font-weight:600;color:#00297a;text-transform:capitalize;white-space:nowrap">${k}</td>
          <td style="padding:6px 14px;color:#334155">${String(v)}</td>
        </tr>`
    )
    .join("");

  await transporter.sendMail({
    from: `"Lending Hub Leads" <${user}>`,
    to: process.env.LEAD_NOTIFY_EMAIL ?? "connect.lendinghub@gmail.com",
    subject: `🔔 New Lead: ${lead.name ?? "Unknown"} — ${lead.product ?? lead.source ?? "Website"}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
        <div style="background:linear-gradient(135deg,#0090FF 0%,#00297A 100%);padding:20px 24px">
          <h2 style="color:#fff;margin:0;font-size:18px">🔔 New Lead — Lending Hub</h2>
          <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:13px">A new enquiry was captured from the website.</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#f8fafc">
          ${rows}
        </table>
        <div style="padding:14px 24px;background:#fff;border-top:1px solid #e2e8f0">
          <p style="color:#94a3b8;font-size:11px;margin:0">
            Lending Hub Technologies Pvt. Ltd. · Automatic lead notification.
            Respond within 2 hours for best conversion.
          </p>
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lead = {
      ...body,
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: req.headers.get("user-agent") ?? "unknown",
    };

    // 1. Console log (always)
    console.log("[LEAD CAPTURE]", JSON.stringify(lead, null, 2));

    // 2. Save to data/leads.jsonl (persistent across restarts)
    appendLead(lead);

    // 3. Send email notification (non-blocking, fails silently if SMTP not set)
    sendLeadEmail(lead).catch((err) =>
      console.error("[LEAD EMAIL ERROR]", err)
    );

    return NextResponse.json(
      { success: true, message: "Lead captured" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
