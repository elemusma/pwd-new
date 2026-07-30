declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Returns undefined (rather than throwing) when reCAPTCHA isn't configured or
// hasn't loaded yet, so the white paper form can still submit without it.
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
    return undefined;
  }

  const grecaptcha = window.grecaptcha;
  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject);
    });
  });
}
