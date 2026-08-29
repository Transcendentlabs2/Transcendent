import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, BookOpenCheck } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { isResearchProfileIndexable } from "@/lib/product-research";

export const revalidate = 3600;

const title = `Compound Research Profiles | ${SITE_NAME}`;
const description =
  "Browse laboratory-focused research profiles for active Transcendent Labs compounds, including analytical context, batch documentation links and related research guides.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/research/compounds" },
  openGraph: {
    type: "website",
    url: "/research/compounds",
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

export default async function CompoundResearchDirectoryPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      name: true,
      slug: true,
      category: true,
      description: true,
      purity: true,
      sequence: true,
    },
    orderBy: { name: "asc" },
  });

  const profiles = products.filter(isResearchProfileIndexable);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/research/compounds#collection`,
    name: "Compound Research Profiles",
    description,
    url: `${SITE_URL}/research/compounds`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: profiles.length,
      itemListElement: profiles.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${product.name} Research Profile`,
        url: `${SITE_URL}/research/compounds/${product.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <section className="relative border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <BookOpenCheck className="h-3.5 w-3.5" /> Research profiles
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Compound research profiles connected to the evidence chain.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            These informational profiles connect each sufficiently documented catalog record with its analytical context, published lot evidence and related laboratory research guides. Profiles are intentionally not published when the underlying record is too thin to support a useful page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/research" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)] transition-colors">
              Research Library
            </Link>
            <Link href="/research-compounds" className="rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Indexable profiles</p>
              <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">Research reference directory</h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">{profiles.length} profiles</span>
          </div>

          {profiles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((product) => (
                <article key={product.slug} className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 transition-colors hover:border-[var(--color-brand-primary)]/50">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
                      <Atom className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{product.category}</span>
                  </div>
                  <h2 className="text-xl font-display font-bold group-hover:text-[var(--color-brand-primary)] transition-colors">
                    <Link href={`/research/compounds/${product.slug}`}>{product.name} Research Profile</Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    Analytical context, catalog abstract, batch traceability and related research resources for {product.name}.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    {product.purity && <span className="rounded-full border border-[var(--glass-border)] px-2.5 py-1">Purity record</span>}
                    {product.sequence && <span className="rounded-full border border-[var(--glass-border)] px-2.5 py-1">Sequence record</span>}
                  </div>
                  <Link href={`/research/compounds/${product.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">
                    Open profile <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-sm leading-relaxed text-[var(--text-muted)]">
              No compound research profiles currently meet the publication threshold. Profiles appear here only when their source catalog records contain enough original documentation to avoid thin programmatic pages.
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> These profiles describe laboratory research materials and their documentation. They do not provide human-use, dosing, administration, diagnosis or treatment guidance.
        </div>
      </section>

      <Footer />
    </main>
  );
}
