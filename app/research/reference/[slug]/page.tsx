import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { findReferenceGuide, REFERENCE_GUIDES } from "@/lib/research-reference";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return REFERENCE_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = findReferenceGuide(slug);
  if (!guide) return { title: "Research Guide Not Found", robots: { index: false, follow: false } };

  const canonical = `/research/reference/${guide.slug}`;
  return {
    title: { absolute: `${guide.seoTitle} | ${SITE_NAME}` },
    description: guide.description,
    keywords: [guide.primaryKeyword, ...guide.supportingKeywords],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: guide.seoTitle,
      description: guide.description,
      publishedTime: `${guide.publishedAt}T00:00:00.000Z`,
      modifiedTime: `${guide.updatedAt}T00:00:00.000Z`,
    },
    twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description },
    robots: { index: true, follow: true },
  };
}

export default async function ReferenceGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = findReferenceGuide(slug);
  if (!guide) notFound();

  const canonicalUrl = `${SITE_URL}/research/reference/${guide.slug}`;
  const relatedGuides = guide.related.map(findReferenceGuide).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: canonicalUrl,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: [guide.primaryKeyword, ...guide.supportingKeywords],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Research", item: `${SITE_URL}/research` },
      { "@type": "ListItem", position: 3, name: "Reference Guides", item: `${SITE_URL}/research/reference` },
      { "@type": "ListItem", position: 4, name: guide.title, item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <article>
        <header className="border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <Link href="/research/reference" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--color-brand-primary)]">
              <ArrowLeft className="h-3.5 w-3.5" /> Research Reference
            </Link>
            <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">{guide.primaryKeyword}</p>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight md:text-6xl">{guide.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">{guide.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {guide.supportingKeywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-[10px] font-mono text-[var(--text-muted)]">{keyword}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="px-6 py-16">
          <div className="mx-auto max-w-4xl space-y-14">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-bold md:text-3xl">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-[var(--text-muted)]">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets && (
                  <ul className="mt-6 space-y-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
                    {section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-[var(--color-brand-primary)]">•</span><span>{bullet}</span></li>)}
                  </ul>
                )}
              </section>
            ))}

            <section className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
              <h2 className="font-display text-2xl font-bold">Continue the evidence chain</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link href="/quality" className="rounded-xl border border-[var(--glass-border)] p-4 text-sm font-bold hover:border-[var(--color-brand-primary)]">Quality & Documentation</Link>
                <Link href="/coa" className="rounded-xl border border-[var(--glass-border)] p-4 text-sm font-bold hover:border-[var(--color-brand-primary)]">COA Library</Link>
                <Link href="/tools/coa-checklist" className="rounded-xl border border-[var(--glass-border)] p-4 text-sm font-bold hover:border-[var(--color-brand-primary)]">Free COA Checklist</Link>
                <Link href="/tools/peptide-molecular-weight" className="rounded-xl border border-[var(--glass-border)] p-4 text-sm font-bold hover:border-[var(--color-brand-primary)]">Peptide MW Calculator</Link>
              </div>
            </section>

            {relatedGuides.length > 0 && (
              <section>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Related reference guides</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {relatedGuides.map((related) => related && (
                    <Link key={related.slug} href={`/research/reference/${related.slug}`} className="group rounded-2xl border border-[var(--glass-border)] p-5 hover:border-[var(--color-brand-primary)]">
                      <h3 className="font-bold">{related.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{related.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand-primary)]">Read next <ArrowRight className="h-3.5 w-3.5" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> This article discusses laboratory research materials and analytical documentation. It is not medical guidance and does not provide dosing, administration, treatment, diagnosis, or human-use instructions.
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
