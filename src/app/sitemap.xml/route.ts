import { SITE } from "@/lib/site";
import { SITEMAP_IDS } from "@/lib/sitemapData";

// A literal /sitemap.xml that crawlers (and humans) instinctively check.
// The real per-content-source sitemaps live at /sitemap/<id>.xml (see
// ../sitemap/[id]/route.ts); this is just the standard sitemap-index format
// pointing at each of them so there's one canonical URL to submit/visit.
export async function GET() {
  const entries = Object.values(SITEMAP_IDS)
    .map((id) => `  <sitemap><loc>${SITE.url}/sitemap/${id}.xml</loc></sitemap>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemapindex.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
