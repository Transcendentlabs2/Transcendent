import { RESEARCH_ARTICLES } from "@/lib/research";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = RESEARCH_ARTICLES.map((article) => {
    const url = `${SITE_URL}/research/${article.slug}`;
    const publishedAt = new Date(`${article.publishedAt}T00:00:00.000Z`).toUTCString();

    return `
      <item>
        <title>${escapeXml(article.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <description>${escapeXml(article.excerpt)}</description>
        <category>${escapeXml(article.cluster)}</category>
        <pubDate>${publishedAt}</pubDate>
      </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Research Library`)}</title>
    <link>${escapeXml(`${SITE_URL}/research`)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(`${SITE_URL}/research/feed.xml`)}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
