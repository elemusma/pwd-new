"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { getRecaptchaToken } from "@/lib/recaptcha";
import RecaptchaNotice from "@/components/RecaptchaNotice";

type Status = "idle" | "loading" | "error";

export default function WhitePaperForm() {
  const t = useTranslations("whitePaper.form");
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [isFocused, setIsFocused] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Bot check: a real visitor focuses a field before submitting. A submit
    // with no prior focus event is scripted, so pretend success silently.
    if (!isFocused) {
      router.push("/white-paper/thank-you");
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: if the hidden field got filled in, silently treat as success.
    if (typeof data.job_title === "string" && data.job_title.trim() !== "") {
      router.push("/white-paper/thank-you");
      return;
    }

    setStatus("loading");

    try {
      const token = await getRecaptchaToken("white_paper_submit");

      const res = await fetch("/api/white-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          job_title: data.job_title,
          embed_url: window.location.href,
          token,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      router.push("/white-paper/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} onFocus={() => setIsFocused(true)} className="space-y-4">
      <div>
        <label htmlFor="wp-email" className="sr-only">
          {t("email")}
        </label>
        <input
          id="wp-email"
          name="email"
          type="email"
          required
          placeholder={t("email")}
          className="w-full rounded-xl border border-card-border bg-card-soft px-4 py-3 text-card-fg outline-none transition-colors focus:border-accent"
        />
      </div>

      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="wp-job-title">Job Title</label>
        <input id="wp-job-title" type="text" name="job_title" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && <p className="text-sm text-accent">{t("genericError")}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-soft disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            {t("submitting")} <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            {t("submit")} <ArrowUpRight size={16} />
          </>
        )}
      </button>

      <RecaptchaNotice />
    </form>
  );
}
