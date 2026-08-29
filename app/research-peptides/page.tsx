import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SeoCatalogGrid from "@/components/catalog/SeoCatalogGrid";

export const revalidate = 3600;

const title = `Research Peptides | HPLC-Focused Laboratory Compounds | ${SITE_NAME}`;
const description =
  "Browse Transcendent Labs research peptides for laboratory research use only, with analytical purity information, product-specific documentation and HPLC-focused quality verification.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/research-peptides" },
  openGraph: {
    type: "website",
    url: "/research-peptides",
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const researchGuides = [
  {
    href: "/research/what-are-research-peptides",
    title: "What Are Research Peptides?",
    description: "Understand research-grade terminology, identity, purity, and laboratory-only positioning.",
  },
  {
    href: "/research/hplc-peptide-testing",
    title: "HPLC Peptide Testing",
    description: "Learn what chromatographic purity means and how to review a peptide HPLC record.",
  },
  {
    href: "/research/peptide-mass-spectrometry",
    title: "Peptide Mass Spectrometry",
    description: "See how molecular-mass evidence complements chromatographic purity testing.",
  },
  {
    href: "/research/how-to-read-peptide-coa",
    title: "How to Read a Peptide COA",
    description: "Review lot numbers, HPLC results, mass spectrometry, dates, and batch traceability.",
  },
];

export default async function ResearchPeptidesPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: "peptides",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      price: true,
      stock: true,
      images: true,
      purity: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  const pageUrl = `${SITE_URL}/research-peptides`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Research Peptides",
    description,
    url: pageUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: serializedProducts.length,
      itemListElement: serializedProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/product/${product.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-40">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-primary)]">
            Research peptide catalog
          </p>
          <h1 className="mb-6 text-4xl font-display font-black tracking-tight md:text-6xl">
            Research Peptides
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Transcendent Labs provides research peptides intended strictly for laboratory research. Each active product page presents its available analytical purity information, current inventory status and research-focused documentation.
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {["Research-use only", "Analytical purity data", "Product-level documentation"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 text-sm font-bold text-[var(--text-main)]"
            >
              {item}
            </div>
          ))}
        </div>

        <SeoCatalogGrid
          products={serializedProducts}
          emptyMessage="No active research peptides are currently listed."
        />
      </section>

      <section className="border-t border-[var(--glass-border)] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-brand-primary)]">
              Research Library
            </p>
            <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">
              Learn how to evaluate research peptide quality
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Use these laboratory-focused guides to understand the analytical evidence behind identity, purity, and batch documentation before reviewing individual product records.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {researchGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50"
              >
                <h3 className="font-bold leading-snug transition-colors group-hover:text-[var(--color-brand-primary)]">
                  {guide.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
                  Read guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/research"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]"
          >
            Explore the full Research Library <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
