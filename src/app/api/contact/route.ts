import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";
import { buildLeadEmailHtml } from "@/lib/emailTemplate";

// Same HubSpot portal/form the old precisewolf.com site used for the
// contact form (a different form than the white paper one, same portal).
const HUBSPOT_ENDPOINT =
  "https://api.hsforms.com/submissions/v3/integration/submit/44436548/e010bd69-bab3-418e-8d8e-65b67a2b97ec";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message, job_title, embed_url, token } = body as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    job_title?: string;
    embed_url?: string;
    token?: string;
  };

  // Honeypot: real visitors never see or fill this hidden field. Pretend
  // success so the bot doesn't learn its submission was rejected.
  if (job_title && job_title.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
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
    console.error("Contact form submission received but GMAIL_USER/EMAIL_APP_PASSWORD are not configured.");
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
      from: `"Website Contact Form" <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL || SITE.email,
      replyTo: email.trim(),
      subject: `PWD: Website Form "${name.trim()}"`,
      html: buildLeadEmailHtml({
        introLine: "Someone filled the contact form. See details below:",
        fields: [
          { label: "Name", value: name.trim() },
          { label: "Email", value: email.trim() },
          { label: "Phone", value: phone?.trim() || "Not provided" },
          { label: "Message", value: message.trim() },
        ],
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
            { name: "firstname", value: name.trim() },
            { name: "email", value: email.trim() },
            { name: "phone", value: phone?.trim() || "" },
            { name: "message", value: message.trim() },
            { name: "submission_url", value: embed_url || "" },
          ],
          context: { pageUri: embed_url || "", pageName: "Website Contact Form" },
        }),
      });
    } catch (err) {
      console.error("Failed to sync contact form lead to HubSpot:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact form email:", err);
    return NextResponse.json({ error: "Something went wrong sending your message. Please try again." }, { status: 500 });
  }
}
