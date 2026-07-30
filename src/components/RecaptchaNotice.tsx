// Required by Google's reCAPTCHA terms whenever the floating badge is
// hidden via CSS (see .grecaptcha-badge in globals.css) — the attribution
// has to appear somewhere on any page using reCAPTCHA protection.
export default function RecaptchaNotice() {
  return (
    <p className="text-xs text-card-fg-dim">
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-card-fg-muted"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-card-fg-muted"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
