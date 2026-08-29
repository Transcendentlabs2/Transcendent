import { getPublishedCoas, type CoaRecord } from "@/lib/coa";
import { RESEARCH_ARTICLES, type ResearchArticle } from "@/lib/research";

export type ProductResearchInput = {
  name: string;
  slug: string;
  category: string;
  description: string;
  purity?: string | null;
  sequence?: string | null;
};

const PEPTIDE_RESEARCH_SLUGS = [
  "what-are-research-peptides",
  "hplc-peptide-testing",
  "peptide-mass-spectrometry",
  "peptide-purity-testing",
  "how-to-read-peptide-coa",
  "lyophilized-peptide-stability",
];

const GENERAL_RESEARCH_SLUGS = [
  "hplc-peptide-testing",
  "peptide-mass-spectrometry",
  "peptide-purity-testing",
  "how-to-read-peptide-coa",
];

export function isPeptideCategory(category: string) {
  return category.trim().toLowerCase() === "peptides";
}

export function getRelatedResearchArticles(category: string): ResearchArticle[] {
  const slugs = isPeptideCategory(category)
    ? PEPTIDE_RESEARCH_SLUGS
    : GENERAL_RESEARCH_SLUGS;

  return slugs
    .map((slug) => RESEARCH_ARTICLES.find((article) => article.slug === slug))
    .filter((article): article is ResearchArticle => Boolean(article));
}

export function getProductCoas(product: Pick<ProductResearchInput, "name" | "slug">): CoaRecord[] {
  const normalizedName = product.name.trim().toLowerCase();

  return getPublishedCoas().filter((record) => {
    if (record.productSlug && record.productSlug === product.slug) return true;
    return record.productName.trim().toLowerCase() === normalizedName;
  });
}

export function isResearchProfileIndexable(product: ProductResearchInput) {
  const descriptionLength = product.description.replace(/\s+/g, " ").trim().length;
  const hasStructuredEvidence = Boolean(product.sequence || product.purity);

  // Avoid creating thin programmatic landing pages. A profile is indexable only
  // when the catalog record contains enough original material or supporting data.
  return descriptionLength >= 240 || (descriptionLength >= 140 && hasStructuredEvidence);
}

export function buildResearchProfileDescription(product: ProductResearchInput) {
  const type = isPeptideCategory(product.category) ? "research peptide" : "research compound";
  return `${product.name} ${type} research profile covering the current catalog abstract, analytical documentation, batch traceability, purity context and related laboratory research guides.`;
}
