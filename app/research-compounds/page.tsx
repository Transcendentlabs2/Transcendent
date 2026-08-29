import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SeoCatalogGrid from "@/components/catalog/SeoCatalogGrid";

export const revalidate = 3600;

const title = `Research Compounds Catalog | ${SITE_NAME}`;
const description =
  "Browse the active Transcendent Labs research compound catalog, including research peptides and other laboratory compounds with purity information when documented and research-use-only positioning.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/research-compounds" },
  openGraph: {
    type: "website",
    url: "/research-compounds",
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

export default async function ResearchCompoundsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
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
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  const pageUrl = `${SITE_URL}/research-compounds`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Research Compounds Catalog",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Research Compounds", item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-40">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-primary)]">
            Laboratory research catalog
          </p>
          <h1 className="mb-6 text-4xl font-display font-black tracking-tight md:text-6xl">
            Research Compounds
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Explore active laboratory research compounds from Transcendent Labs. Product pages include current availability, research-use-only documentation and analytical information when it is documented for the material.
          </p>
        </div>

        <div className="mb-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          All compounds listed here are intended strictly for laboratory research. They are not intended for human consumption, diagnosis, treatment or therapeutic use.
        </div>

        <SeoCatalogGrid products={serializedProducts} />
      </section>

      <Footer />
    </main>
  );
}
