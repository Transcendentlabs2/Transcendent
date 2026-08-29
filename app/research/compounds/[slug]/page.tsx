import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, FileCheck2, FlaskConical, Microscope } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  buildResearchProfileDescription,
  getProductCoas,
  getRelatedResearchArticles,
  isPeptideCategory,
  isResearchProfileIndexable,
} from "@/lib/product-research";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

async function getProduct(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      description: true,
      purity: true,
      sequence: true,
      updatedAt: true,
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Research Profile Not Found",
      robots: { index: false, follow: false },
    };
  }

  const indexable = isResearchProfileIndexable(product);
  const title = `${product.name} Research Profile | Analytical Reference | ${SITE_NAME}`;
  const description = buildResearchProfileDescription(product);
  const canonicalPath = `/research/compounds/${product.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        "max-snippet": -1,
      },
    },
  };
}

export default async function CompoundResearchProfilePage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const indexable = isResearchProfileIndexable(product);
  const relatedArticles = getRelatedResearchArticles(product.category);
  const coas = getProductCoas(product);
  const isPeptide = isPeptideCategory(product.category);
  const canonicalUrl = `${SITE_URL}/research/compounds/${product.slug}`;
  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const description = buildResearchProfileDescription(product);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    name: `${product.name} Research Profile`,
    description,
    url: canonicalUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${productUrl}#product` },
    dateModified: product.updatedAt.toISOString(),
    mainEntity: {
      "@type": "Thing",
      name: product.name,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Category", value: product.category },
        ...(product.purity ? [{ "@type": "PropertyValue", name: "Catalog purity record", value: product.purity }] : []),
        ...(product.sequence ? [{ "@type": "PropertyValue", name: "Sequence", value: product.sequence }] : []),
      ],
    },
    relatedLink: [
      productUrl,
      ...relatedArticles.map((article) => `${SITE_URL}/research/${article.slug}`),
      ...coas.map((record) => `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`),
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Research", item: `${SITE_URL}/research` },
      { "@type": "ListItem", position: 3, name: "Compound Profiles", item: `${SITE_URL}/research/compounds` },
      { "@type": "ListItem", position: 4, name: product.name, item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <article>
        <header className="relative border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
          <div className="mx-auto max-w-5xl">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
              <span>Compound research profile</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-muted)]">{product.category}</span>
            </div>
            <h1 className="font-display text-4xl font-black tracking-tight md:text-6xl">
              {product.name} Research Profile
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              Laboratory-focused reference connecting the current catalog record for {product.name} with analytical context, public batch evidence and related research documentation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/product/${product.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity">
                View Product Record <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/coa" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)] transition-colors">
                COA Library
              </Link>
            </div>
            {!indexable && (
              <p className="mt-5 text-xs leading-relaxed text-[var(--text-muted)]">
                This profile is available for navigation but is currently excluded from search indexing until the source catalog record contains enough original documentation.
              </p>
            )}
          </div>
        </header>

        <section className="px-6 py-16 border-b border-[var(--glass-border)]">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
              <FlaskConical className="mb-4 h-5 w-5 text-[var(--color-brand-primary)]" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Material class</p>
              <p className="mt-2 font-bold">{isPeptide ? "Research peptide" : product.category}</p>
            </div>
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
              <Microscope className="mb-4 h-5 w-5 text-[var(--color-brand-primary)]" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Purity record</p>
              <p className="mt-2 font-bold">{product.purity || "Not published"}</p>
            </div>
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
              <FileCheck2 className="mb-4 h-5 w-5 text-[var(--color-brand-primary)]" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Verified public lots</p>
              <p className="mt-2 font-bold">{coas.length}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Current catalog abstract</p>
              <h2 className="mt-2 text-2xl font-display font-bold">Documented material overview</h2>
              <p className="mt-6 whitespace-pre-line text-sm leading-7 text-[var(--text-muted)] md:text-base">
                {product.description}
              </p>

              {product.sequence && (
                <div className="mt-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Sequence record</p>
                  <p className="mt-3 break-words font-mono text-sm leading-relaxed text-[var(--text-main)]">{product.sequence}</p>
                </div>
              )}
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
                <h2 className="font-display text-lg font-bold">Interpretation boundaries</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  A catalog purity value should be interpreted together with its method and lot-specific evidence. HPLC composition, molecular identity and complete material characterization are related but distinct analytical questions.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
                <strong className="text-[var(--text-main)]">Research use only.</strong> This page does not provide human-use, dosing, administration, diagnosis or treatment guidance.
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-9">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Evidence chain</p>
              <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">Published batch documentation</h2>
            </div>
            {coas.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {coas.map((record) => (
                  <Link key={record.lot} href={`/coa/${encodeURIComponent(record.lot)}`} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Verified public record</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold">Lot {record.lot}</h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {record.purity ? `Reported purity: ${record.purity}. ` : ""}{record.methods.length ? `Methods: ${record.methods.join(", ")}.` : ""}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-7 text-sm leading-relaxed text-[var(--text-muted)]">
                No verified public lot-specific COA is currently linked to this material. The absence of a public record is shown explicitly rather than replaced with demo or inferred analytical data.
              </div>
            )}
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-9">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Related research</p>
              <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">Understand the analytical context</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/research/${article.slug}`} className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{article.cluster}</span>
                  <h3 className="mt-3 font-display text-lg font-bold group-hover:text-[var(--color-brand-primary)] transition-colors">{article.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{article.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">Read guide <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
