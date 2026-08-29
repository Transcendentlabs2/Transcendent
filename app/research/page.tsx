import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, Microscope, FileCheck2 } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { RESEARCH_ARTICLES, RESEARCH_CLUSTERS } from "@/lib/research";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = "Peptide Research Library | Analytical Testing & Laboratory Guides";
const description =
  "Explore laboratory-focused guides on research peptides, HPLC testing, mass spectrometry, peptide purity, certificates of analysis, and sample stability.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${SITE_NAME}` },
  description,
  alternates: { canonical: "/research" },
  openGraph: {
    type: "website",
    url: "/research",
    siteName: SITE_NAME,
    title,
    description,
    images: [{ url: "/heroPeptide.webp", alt: `${SITE_NAME} peptide research library` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/heroPeptide.webp"],
  },
};

const librarySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/research#collection`,
  name: title,
  description,
  url: `${SITE_URL}/research`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: [
    "Research peptides",
    "HPLC peptide testing",
    "Peptide mass spectrometry",
    "Peptide purity testing",
    "Peptide certificates of analysis",
  ],
  mainEntity: {
    "@type": "ItemList",
    itemListElement: RESEARCH_ARTICLES.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/research/${article.slug}`,
      name: article.title,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Research Library", item: `${SITE_URL}/research` },
  ],
};

const iconForCluster = (cluster: string) => {
  if (cluster === "Analytical Testing") return Microscope;
  if (cluster === "Documentation") return FileCheck2;
  if (cluster === "Stability") return FlaskConical;
  return BookOpen;
};

export default function ResearchLibraryPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(librarySchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-[var(--glass-border)]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[size:42px_42px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)] mb-6">
            <BookOpen className="w-3.5 h-3.5" /> Research Library
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight max-w-4xl leading-[1.05]">
            Peptide research guides built around <span className="text-[var(--color-brand-primary)]">analytical evidence.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
            Laboratory-focused educational resources on peptide identity, chromatographic purity, mass spectrometry, lot traceability, certificates of analysis, and research material stability.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/research-peptides"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] px-5 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Browse Research Peptides <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research-compounds"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold text-[var(--text-main)] hover:border-[var(--color-brand-primary)] transition-colors"
            >
              Full Research Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-b border-[var(--glass-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Topical architecture</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Research topics</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESEARCH_CLUSTERS.map((cluster) => {
              const Icon = iconForCluster(cluster.name);
              return (
                <div key={cluster.name} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
                  <div className="w-10 h-10 rounded-xl border border-[var(--glass-border)] flex items-center justify-center mb-4 text-[var(--color-brand-primary)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm">{cluster.name}</h3>
                  <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">{cluster.intent}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Published guides</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Start with the evidence chain</h2>
            </div>
            <p className="max-w-xl text-sm text-[var(--text-muted)] leading-relaxed">
              These resources are written for laboratory research contexts. They do not provide dosing, administration, treatment, diagnosis, or human-use instructions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {RESEARCH_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
                    {article.cluster}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-display font-bold leading-snug group-hover:text-[var(--color-brand-primary)] transition-colors">
                  <Link href={`/research/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">{article.excerpt}</p>
                <div className="mt-5 pt-5 border-t border-[var(--glass-border)] flex items-center justify-between gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Updated {article.updatedAt}
                  </span>
                  <Link
                    href={`/research/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                    className="w-9 h-9 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-main)] group-hover:border-[var(--color-brand-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> This library is educational material for laboratory research contexts. Transcendent Labs products are not intended for human consumption, medical diagnosis, treatment, or administration.
        </div>
      </section>

      <Footer />
    </main>
  );
}
