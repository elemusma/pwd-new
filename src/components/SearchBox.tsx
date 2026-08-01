import { Search } from "lucide-react";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

// Plain GET form — works without client JS, submits to /search?q=...
export default function SearchBox({
  locale,
  defaultValue,
  placeholder,
  submitLabel,
  className = "",
}: {
  locale: Locale;
  defaultValue?: string;
  placeholder: string;
  submitLabel: string;
  className?: string;
}) {
  const action = getPathname({ href: "/search", locale });

  return (
    <form action={action} method="GET" className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-dim" size={18} />
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-full border border-border bg-bg-elevated py-3.5 pl-12 pr-28 text-fg outline-none transition-colors focus:border-accent"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
      >
        {submitLabel}
      </button>
    </form>
  );
}
