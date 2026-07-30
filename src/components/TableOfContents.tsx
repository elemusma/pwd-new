"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export default function TableOfContents({ items, label }: { items: TocItem[]; label: string }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-28 rounded-2xl border border-card-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-card-fg-dim">{label}</p>
      <ul className="mt-4 space-y-0.5 border-l border-card-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-xs transition-colors ${
                activeId === item.id
                  ? "border-accent font-medium text-card-fg"
                  : "border-transparent text-card-fg-muted hover:text-card-fg"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
