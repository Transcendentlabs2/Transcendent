import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getPublishedCoas } from "@/lib/coa";
import { isResearchProfileIndexable } from "@/lib/product-research";
import { RESEARCH_ARTICLES } from "@/lib/research";
import { REFERENCE_GUIDES } from "@/lib/research-reference";
import { SITE_URL } from "@/lib/seo";

const SEO_RELEASE_DATE = new Date("2026-08-29T00:00:00.000Z");

function contentDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function latestDate(dates: Date[], fallback = SEO_RELEASE_DATE) {
  if (dates.length === 0) return fallback;
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

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

  const publishedCoas = getPublishedCoas();
  const latestProductModified = products[0]?.updatedAt || SEO_RELEASE_DATE;
  const latestResearchModified = latestDate(
    RESEARCH_ARTICLES.map((article) => contentDate(article.updatedAt)),
  );
  const latestReferenceModified = latestDate(
    REFERENCE_GUIDES.map((guide) => contentDate(guide.updatedAt)),
  );
  const latestCoaModified = latestDate(
    publishedCoas
      .filter((record) => Boolean(record.analysisDate))
      .map((record) => contentDate(record.analysisDate as string)),
  );
  const latestSiteModified = latestDate([
    SEO_RELEASE_DATE,
    latestProductModified,
    latestResearchModified,
    latestReferenceModified,
    latestCoaModified,
  ]);

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
    lastModified: contentDate(article.updatedAt),
    changeFrequency: "monthly",
    priority: article.slug === "what-are-research-peptides" ? 0.9 : 0.82,
  }));

  const referenceEntries: MetadataRoute.Sitemap = REFERENCE_GUIDES.map((guide) => ({
    url: `${SITE_URL}/research/reference/${guide.slug}`,
    lastModified: contentDate(guide.updatedAt),
    changeFrequency: "monthly",
    priority: 0.81,
  }));

  const coaEntries: MetadataRoute.Sitemap = publishedCoas.map((record) => ({
    url: `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`,
    lastModified: record.analysisDate ? contentDate(record.analysisDate) : SEO_RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0.78,
  }));

  return [
    { url: SITE_URL, lastModified: latestSiteModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/research-peptides`, lastModified: latestProductModified, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/research-compounds`, lastModified: latestProductModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/research`, lastModified: latestResearchModified, changeFrequency: "weekly", priority: 0.92 },
    { url: `${SITE_URL}/research/compounds`, lastModified: latestProductModified, changeFrequency: "weekly", priority: 0.86 },
    { url: `${SITE_URL}/research/reference`, lastModified: latestReferenceModified, changeFrequency: "weekly", priority: 0.87 },
    { url: `${SITE_URL}/glossary`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/quality`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/about`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.82 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/analytical-methods`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/research-use-policy`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.72 },
    { url: `${SITE_URL}/site-index`, lastModified: latestSiteModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/tools`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/coa-checklist`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/tools/peptide-molecular-weight`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.87 },
    { url: `${SITE_URL}/tools/amino-acid-sequence-converter`, lastModified: SEO_RELEASE_DATE, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/coa`, lastModified: latestCoaModified, changeFrequency: "weekly", priority: 0.9 },
    ...researchEntries,
    ...referenceEntries,
    ...researchProfileEntries,
    ...coaEntries,
    ...productEntries,
  ];
}
