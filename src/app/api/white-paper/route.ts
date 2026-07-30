import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";
import { buildLeadEmailHtml } from "@/lib/emailTemplate";

// Same HubSpot portal/form the old precisewolf.com site used for this lead
// magnet. Not a secret (it's a public form-submission endpoint), so it's
// safe to hardcode rather than wire up new env vars for it.
const HUBSPOT_ENDPOINT =
  "https://api.hsforms.com/submissions/v3/integration/submit/44436548/8625caef-c830-46e9-a9c4-1c004aeb8b24";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, job_title, embed_url, token } = body as {
    email?: string;
    job_title?: string;
    embed_url?: string;
    token?: string;
  };

  // Honeypot: real visitors never see or fill this hidden field. Pretend
  // success so the bot doesn't learn its submission was rejected.
  if (job_title && job_title.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // Same var name the old precisewolf.com site used for its reCAPTCHA secret.
  const RECAPTCHA_SECRET_KEY = process.env.PWD_RECAPTCHA_SECRET_KEY;
  if (RECAPTCHA_SECRET_KEY) {
    if (!token) {
      return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
    }

    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: token }),
    });
    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
    }
  }

  // Same Gmail app-password setup the old precisewolf.com site used
  // (nodemailer's "gmail" service, not a generic SMTP host/port).
  const { GMAIL_USER, EMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env;

  if (!GMAIL_USER || !EMAIL_APP_PASSWORD) {
    console.error("White paper submission received but GMAIL_USER/EMAIL_APP_PASSWORD are not configured.");
    return NextResponse.json(
      { error: "Email sending isn't configured yet. Please email us directly for now." },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: EMAIL_APP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Website White Paper Form" <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL || SITE.email,
      replyTo: email.trim(),
      subject: "White Paper Download Request",
      html: buildLeadEmailHtml({
        introLine: "New user downloading the white paper. See details below:",
        fields: [{ label: "Email", value: email.trim() }],
        embedUrl: embed_url || SITE.url,
      }),
    });

    // Best-effort HubSpot sync. A failure here shouldn't block the email above.
    try {
      await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "email", value: email.trim() },
            { name: "submission_url", value: embed_url || "" },
          ],
          context: { pageUri: embed_url || "", pageName: "White Paper Download" },
        }),
      });
    } catch (err) {
      console.error("Failed to sync white paper lead to HubSpot:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send white paper email:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
