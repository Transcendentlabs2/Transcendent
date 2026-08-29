import type { Metadata } from "next";
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

      <Footer />
    </main>
  );
}
