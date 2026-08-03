import { X } from "lucide-react";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function ShareCard({ url, title, label }: { url: string; title: string; label: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-card-fg-dim">{label}</p>
      <div className="mt-3 flex items-center gap-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Share on Facebook"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-card-fg-muted hover:text-card-fg hover:border-accent transition-colors"
        >
          <FacebookIcon />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-card-fg-muted hover:text-card-fg hover:border-accent transition-colors"
        >
          <LinkedinIcon />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Share on X"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-card-fg-muted hover:text-card-fg hover:border-accent transition-colors"
        >
          <X size={16} />
        </a>
      </div>
    </div>
  );
}
