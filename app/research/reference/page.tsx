import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { REFERENCE_GUIDES } from "@/lib/research-reference";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Peptide Research Reference Guides | ${SITE_NAME}`;
const description = "Laboratory-focused reference guides on peptide synthesis, purification, HPLC, mass spectrometry, batch traceability, and peptide storage.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/research/reference" },
  openGraph: { type: "website", url: "/research/reference", siteName: SITE_NAME, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/research/reference#collection`,
  name: "Peptide Research Reference Guides",
  description,
  url: `${SITE_URL}/research/reference`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: REFERENCE_GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `${SITE_URL}/research/reference/${guide.slug}`,
    })),
  },
};

export default function ResearchReferencePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <BookOpenCheck className="h-3.5 w-3.5" /> Research reference
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Peptide research concepts explained through the analytical evidence chain.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Deeper laboratory guides covering how peptide materials are synthesized, purified, characterized, documented, stored, and traced from vial to analytical record.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {REFERENCE_GUIDES.map((guide) => (
            <article key={guide.slug} className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 transition-colors hover:border-[var(--color-brand-primary)]/50">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">{guide.primaryKeyword}</p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug">
                <Link href={`/research/reference/${guide.slug}`}>{guide.title}</Link>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{guide.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--glass-border)] pt-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Laboratory reference</span>
                <Link href={`/research/reference/${guide.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand-primary)]">
                  Read guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> These guides address laboratory research materials, analytical documentation, and research workflows. They do not provide medical, dosing, administration, treatment, or human-use guidance.
        </div>
      </section>

      <Footer />
    </main>
  );
}
