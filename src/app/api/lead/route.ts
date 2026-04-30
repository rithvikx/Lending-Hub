import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendLead } from "@/lib/cms";
import {
  sanitizeString,
  isValidMobile,
  isValidEmail,
  escapeHtml,
} from "@/lib/security";

// Allowed sources — anything else is rejected
const ALLOWED_SOURCES = new Set([
  "apply-page",
  "contact-page",
  "eligibility-checker",
  "hero-quick-apply",
]);

// Validated, sanitized lead shape
interface LeadPayload {
  name: string;
  mobile: string;
  email?: string;
  product?: string;
  source: string;
  employmentType?: string;
  income?: string;
  city?: string;
  cibil?: string;
  readiness?: number;
  message?: string;
  consent: boolean;
}

function validateAndSanitize(raw: unknown): LeadPayload | { error: string } {
  if (!raw || typeof raw !== "object") return { error: "Invalid payload" };
  const b = raw as Record<string, unknown>;

  const name = sanitizeString(b.name, 100);
  if (!name) return { error: "Name is required" };
  if (name.length < 2) return { error: "Name too short" };

  const mobile = sanitizeString(b.mobile, 10);
  if (!mobile) return { error: "Mobile number is required" };
  if (!isValidMobile(mobile))
    return { error: "Invalid mobile number (must be a 10-digit Indian number starting with 6-9)" };

  const source = sanitizeString(b.source, 50);
  if (!ALLOWED_SOURCES.has(source)) return { error: "Invalid source" };

  const email = b.email ? sanitizeString(b.email as string, 254) : undefined;
  if (email && !isValidEmail(email)) return { error: "Invalid email address" };

  const product = b.product ? sanitizeString(b.product as string, 100) : undefined;
  const employmentType = b.employmentType ? sanitizeString(b.employmentType as string, 50) : undefined;
  const city = b.city ? sanitizeString(b.city as string, 100) : undefined;
  const cibil = b.cibil ? sanitizeString(b.cibil as string, 20) : undefined;
  const message = b.message ? sanitizeString(b.message as string, 1000) : undefined;

  // Readiness must be numeric 0-100 if present
  let readiness: number | undefined;
  if (b.readiness !== undefined) {
    const r = Number(b.readiness);
    if (!isNaN(r) && r >= 0 && r <= 100) readiness = Math.round(r);
  }

  // Income: numeric string only
  let income: string | undefined;
  if (b.income !== undefined) {
    const i = Number(String(b.income).trim());
    if (!isNaN(i) && i >= 0) income = String(Math.round(i));
  }

  const consent = b.consent === true || b.consent === "true";

  return {
    name,
    mobile,
    ...(email && { email }),
    ...(product && { product }),
    source,
    ...(employmentType && { employmentType }),
    ...(income && { income }),
    ...(city && { city }),
    ...(cibil && { cibil }),
    ...(readiness !== undefined && { readiness }),
    ...(message && { message }),
    consent,
  };
}

async function sendLeadEmail(lead: Record<string, unknown>): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });

  // HTML-escape ALL values to prevent XSS in email clients
  const rows = Object.entries(lead)
    .map(([k, v]) => {
      const safeKey = escapeHtml(String(k));
      const safeVal = escapeHtml(String(v ?? ""));
      return `<tr>
        <td style="padding:6px 14px;font-weight:600;color:#00297a;text-transform:capitalize;white-space:nowrap">${safeKey}</td>
        <td style="padding:6px 14px;color:#334155">${safeVal}</td>
      </tr>`;
    })
    .join("");

  const safeName = escapeHtml(String(lead.name ?? "Unknown"));
  const safeProduct = escapeHtml(String(lead.product ?? lead.source ?? "Website"));

  await transporter.sendMail({
    from: `"Lending Hub Leads" <${user}>`,
    to: process.env.LEAD_NOTIFY_EMAIL ?? "connect.lendinghub@gmail.com",
    subject: `New Lead: ${String(lead.name ?? "Unknown")} — ${String(lead.product ?? lead.source ?? "Website")}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
        <div style="background:linear-gradient(135deg,#0090FF 0%,#00297A 100%);padding:20px 24px">
          <h2 style="color:#fff;margin:0;font-size:18px">New Lead — Lending Hub</h2>
          <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:13px">${safeName} enquired about ${safeProduct}.</p>
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
  // Reject oversized payloads (prevent DoS via body inflation)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10_000) {
    return NextResponse.json({ success: false, message: "Payload too large" }, { status: 413 });
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }

  const result = validateAndSanitize(rawBody);
  if ("error" in result) {
    return NextResponse.json({ success: false, message: result.error }, { status: 422 });
  }

  const lead = {
    ...result,
    timestamp: new Date().toISOString(),
    // Store only the first IP from the forwarded chain (direct client)
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown",
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? "unknown",
  };

  appendLead(lead as Record<string, unknown>);

  sendLeadEmail(lead as Record<string, unknown>).catch((err) =>
    console.error("[LEAD EMAIL ERROR]", err)
  );

  return NextResponse.json({ success: true, message: "Lead captured" }, { status: 200 });
}
