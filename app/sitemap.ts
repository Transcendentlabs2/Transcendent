import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getPublishedCoas } from "@/lib/coa";
import { RESEARCH_ARTICLES } from "@/lib/research";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const researchEntries: MetadataRoute.Sitemap = RESEARCH_ARTICLES.map((article) => ({
    url: `${SITE_URL}/research/${article.slug}`,
    lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: article.slug === "what-are-research-peptides" ? 0.9 : 0.82,
  }));

  const coaEntries: MetadataRoute.Sitemap = getPublishedCoas().map((record) => ({
    url: `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`,
    lastModified: record.analysisDate ? new Date(`${record.analysisDate}T00:00:00.000Z`) : new Date(),
    changeFrequency: "yearly",
    priority: 0.78,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/research-peptides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/research-compounds`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/research`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/coa`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...researchEntries,
    ...coaEntries,
    ...productEntries,
  ];
}
