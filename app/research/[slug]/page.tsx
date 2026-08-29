import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, FlaskConical } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  RESEARCH_ARTICLES,
  getRelatedResearchArticles,
  getResearchArticle,
} from "@/lib/research";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return RESEARCH_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticle(slug);

  if (!article) {
    return {
      title: "Research Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/research/${article.slug}`;
  const absoluteTitle = `${article.seoTitle} | ${SITE_NAME}`;

  return {
    title: { absolute: absoluteTitle },
    description: article.description,
    keywords: [article.primaryKeyword, ...article.supportingKeywords],
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: SITE_NAME,
      title: absoluteTitle,
      description: article.description,
      publishedTime: `${article.publishedAt}T00:00:00.000Z`,
      modifiedTime: `${article.updatedAt}T00:00:00.000Z`,
      section: article.cluster,
      tags: [article.primaryKeyword, ...article.supportingKeywords],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: article.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ResearchArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getResearchArticle(slug);

  if (!article) notFound();

  const relatedArticles = getRelatedResearchArticles(article.relatedSlugs);
  const canonicalUrl = `${SITE_URL}/research/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: article.title,
    description: article.description,
    url: canonicalUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "en-US",
    articleSection: article.cluster,
    keywords: [article.primaryKeyword, ...article.supportingKeywords].join(", "),
    isPartOf: { "@id": `${SITE_URL}/research#collection` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [article.primaryKeyword, ...article.supportingKeywords],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Research Library",
        item: `${SITE_URL}/research`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <article>
        <header className="relative pt-36 pb-16 px-6 border-b border-[var(--glass-border)] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[size:42px_42px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Research Library
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)] mb-5">
              <span className="text-[var(--color-brand-primary)]">{article.cluster}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3 h-3" /> {article.readTime}</span>
              <span>•</span>
              <span>Updated {article.updatedAt}</span>
            </div>

            <h1 className="font-display font-black text-4xl md:text-6xl leading-[1.05] tracking-tight">
              {article.title}
            </h1>
            <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed max-w-3xl">
              {article.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[article.primaryKeyword, ...article.supportingKeywords].map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono text-[var(--text-muted)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12">
          <div className="max-w-3xl">
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 mb-10 text-sm text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-main)]">Scope:</strong> This article addresses laboratory research materials and analytical interpretation. It does not provide instructions for human use, dosing, administration, diagnosis, or treatment.
            </div>

            <div className="space-y-12">
              {article.sections.map((section, sectionIndex) => (
                <section key={section.heading} id={`section-${sectionIndex + 1}`} className="scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] md:text-base text-[var(--text-muted)] leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
              <div className="flex items-center gap-2 text-[var(--color-brand-primary)] mb-3">
                <FlaskConical className="w-5 h-5" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em]">Research context</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                For product-specific analytical information, review the lot documentation associated with the material used in your experiment. General educational content is not a substitute for a batch-specific analytical record or a validated laboratory method.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/research-peptides"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] px-4 py-2.5 text-xs font-bold"
                >
                  Research Peptides <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/research-compounds"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-4 py-2.5 text-xs font-bold"
                >
                  Full Catalog
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <h2 className="text-xs font-bold uppercase tracking-widest">On this page</h2>
              </div>
              <nav className="flex flex-col gap-3">
                {article.sections.map((section, index) => (
                  <a
                    key={section.heading}
                    href={`#section-${index + 1}`}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] leading-relaxed transition-colors"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl border border-[var(--glass-border)] p-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">Primary topic</p>
              <p className="mt-2 font-bold text-sm">{article.primaryKeyword}</p>
              <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">Content cluster</p>
              <p className="mt-2 font-bold text-sm">{article.cluster}</p>
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <section className="px-6 py-16 border-t border-[var(--glass-border)]">
            <div className="max-w-6xl mx-auto">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Internal research links</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Continue the evidence chain</h2>
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/research/${related.slug}`}
                    className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 hover:border-[var(--color-brand-primary)]/50 transition-colors"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{related.cluster}</span>
                    <h3 className="mt-3 font-bold leading-snug group-hover:text-[var(--color-brand-primary)] transition-colors">{related.title}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
                      Read guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
