import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Windows the page numbers down to first, last, and a couple pages either
// side of the current one (e.g. "1 2 3 … 16"), collapsing the rest behind an
// ellipsis so it stays readable even with dozens of pages.
function getPageWindow(current: number, total: number): (number | "…")[] {
  const delta = 2;
  const middle: (number | "…")[] = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    middle.push(i);
  }

  if (current - delta > 2) middle.unshift("…");
  if (current + delta < total - 1) middle.push("…");

  return [1, ...middle, total];
}

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  const t = useTranslations("general");

  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page <= 1 ? basePath : `${basePath}?page=${page}`);
  const pages = getPageWindow(currentPage, totalPages);

  return (
    <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination">
      <span className="sr-only">{t("pageOf", { current: currentPage, total: totalPages })}</span>

      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage <= 1}
        aria-label="Previous page"
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-fg-muted ${
          currentPage <= 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronLeft size={16} />
      </Link>

      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-fg-dim">
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm transition-colors ${
              page === currentPage ? "bg-accent text-bg" : "text-fg-muted hover:text-fg"
            }`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage >= totalPages}
        aria-label="Next page"
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-fg-muted ${
          currentPage >= totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
