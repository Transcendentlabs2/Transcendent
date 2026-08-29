import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getPublishedCoas } from "@/lib/coa";
import { isResearchProfileIndexable } from "@/lib/product-research";
import { RESEARCH_ARTICLES } from "@/lib/research";
import { REFERENCE_GUIDES } from "@/lib/research-reference";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      name: true,
      slug: true,
      category: true,
      description: true,
      purity: true,
      sequence: true,
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

  const researchProfileEntries: MetadataRoute.Sitemap = products
    .filter(isResearchProfileIndexable)
    .map((product) => ({
      url: `${SITE_URL}/research/compounds/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: "monthly",
      priority: 0.79,
    }));

  const researchEntries: MetadataRoute.Sitemap = RESEARCH_ARTICLES.map((article) => ({
    url: `${SITE_URL}/research/${article.slug}`,
    lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: article.slug === "what-are-research-peptides" ? 0.9 : 0.82,
  }));

  const referenceEntries: MetadataRoute.Sitemap = REFERENCE_GUIDES.map((guide) => ({
    url: `${SITE_URL}/research/reference/${guide.slug}`,
    lastModified: new Date(`${guide.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.81,
  }));

  const coaEntries: MetadataRoute.Sitemap = getPublishedCoas().map((record) => ({
    url: `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`,
    lastModified: record.analysisDate ? new Date(`${record.analysisDate}T00:00:00.000Z`) : new Date(),
    changeFrequency: "yearly",
    priority: 0.78,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/research-peptides`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/research-compounds`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/research`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.92 },
    { url: `${SITE_URL}/research/compounds`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.86 },
    { url: `${SITE_URL}/research/reference`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.87 },
    { url: `${SITE_URL}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/quality`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.82 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/analytical-methods`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/research-use-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.72 },
    { url: `${SITE_URL}/site-index`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/coa-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/tools/peptide-molecular-weight`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.87 },
    { url: `${SITE_URL}/tools/amino-acid-sequence-converter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/coa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...researchEntries,
    ...referenceEntries,
    ...researchProfileEntries,
    ...coaEntries,
    ...productEntries,
  ];
}
