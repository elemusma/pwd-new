"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { formatPhoneNumber } from "@/lib/phoneFormatting";
import RecaptchaNotice from "@/components/RecaptchaNotice";

type Status = "idle" | "loading" | "error";

export default function ContactForm({ submitLabel }: { submitLabel?: string } = {}) {
  const t = useTranslations("contact.form");
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [isFocused, setIsFocused] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Bot check: a real visitor focuses a field before submitting. A submit
    // with no prior focus event is scripted, so pretend success silently.
    if (!isFocused) {
      router.push("/thank-you");
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: if the hidden field got filled in, silently treat as success.
    if (typeof data.job_title === "string" && data.job_title.trim() !== "") {
      router.push("/thank-you");
      return;
    }

    setStatus("loading");

    try {
      const token = await getRecaptchaToken("contact_submit");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, embed_url: window.location.href, token }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} onFocus={() => setIsFocused(true)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-card-fg-muted">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            className="w-full rounded-xl border border-card-border bg-card-soft px-4 py-3 text-card-fg outline-none transition-colors focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-card-fg-muted">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            className="w-full rounded-xl border border-card-border bg-card-soft px-4 py-3 text-card-fg outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm text-card-fg-muted">
          {t("phone")} <span className="text-card-fg-dim">{t("optional")}</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={14}
          onChange={formatPhoneNumber}
          className="w-full rounded-xl border border-card-border bg-card-soft px-4 py-3 text-card-fg outline-none transition-colors focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-card-fg-muted">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-card-border bg-card-soft px-4 py-3 text-card-fg outline-none transition-colors focus:border-accent"
        />
      </div>

      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="job_title">Job Title</label>
        <input id="job_title" type="text" name="job_title" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && <p className="text-sm text-accent">{t("genericError")}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-soft disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            {t("sending")} <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            {submitLabel ?? t("send")} <ArrowUpRight size={16} />
          </>
        )}
      </button>

      <RecaptchaNotice />
    </form>
  );
}
