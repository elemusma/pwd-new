export interface TocItem {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// WordPress heading blocks don't carry ids, so anchors/scrollspy have nothing
// to target. This walks the rendered HTML once, assigns a unique slug id to
// each <h2>, and returns the same content plus the extracted TOC entries.
export function addHeadingIdsAndExtractToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  const withIds = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;

    toc.push({ id, text });

    const hasId = /\sid=/.test(attrs);
    const newAttrs = hasId ? attrs : `${attrs} id="${id}"`;
    return `<h2${newAttrs}>${inner}</h2>`;
  });

  return { html: withIds, toc };
}
