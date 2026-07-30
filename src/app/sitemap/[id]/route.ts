import { NextRequest, NextResponse } from "next/server";
import { sitemapForId, renderUrlsetXml, SITEMAP_IDS } from "@/lib/sitemapData";

// A plain Route Handler rather than Next's sitemap.ts metadata convention:
// that convention permanently reserves the literal /sitemap.xml path (even
// in multi-sitemap "generateSitemaps" mode), which collides with the
// sitemap *index* served from ../sitemap.xml/route.ts. This is the only way
// to have both a real index at /sitemap.xml and per-source sitemaps here.
export async function generateStaticParams() {
  return Object.values(SITEMAP_IDS).map((id) => ({ id: `${id}.xml` }));
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id.replace(/\.xml$/, ""));

  if (Number.isNaN(numericId)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const entries = await sitemapForId(numericId);
  if (!entries) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(renderUrlsetXml(entries), {
    headers: { "Content-Type": "application/xml" },
  });
}
