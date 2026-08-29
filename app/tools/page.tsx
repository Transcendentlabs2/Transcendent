import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, ClipboardCheck, Wrench } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Free Laboratory Research Tools | ${SITE_NAME}`;
const description =
  "Use free Transcendent Labs research tools for peptide molecular-weight calculations, sequence analysis, and Certificate of Analysis documentation review.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/tools" },
  openGraph: { type: "website", url: "/tools", siteName: SITE_NAME, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/tools#collection`,
  name: "Laboratory Research Tools",
  description,
  url: `${SITE_URL}/tools`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Peptide Molecular Weight Calculator & Sequence Analyzer",
        url: `${SITE_URL}/tools/peptide-molecular-weight`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Peptide COA Review Checklist",
        url: `${SITE_URL}/tools/coa-checklist`,
      },
    ],
  },
};

const tools = [
  {
    href: "/tools/peptide-molecular-weight",
    icon: Atom,
    eyebrow: "Sequence analysis",
    title: "Peptide Molecular Weight Calculator",
    description:
      "Calculate theoretical neutral monoisotopic mass, common protonated m/z values, sequence length and amino-acid composition from a one-letter peptide sequence.",
    cta: "Open Calculator",
  },
  {
    href: "/tools/coa-checklist",
    icon: ClipboardCheck,
    eyebrow: "Documentation review",
    title: "Peptide COA Review Checklist",
    description:
      "Review whether a Certificate of Analysis contains core lot identifiers, dates, analytical evidence and traceability fields. The score measures documentation completeness only.",
    cta: "Open Checklist",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Navbar />
      <section className="relative border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <Wrench className="h-3.5 w-3.5" /> Free research utilities
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Laboratory tools designed to make analytical research work easier to review.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Practical, shareable utilities for peptide sequence calculations and analytical-documentation review, with clear assumptions and research-use-only boundaries.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {tools.map(({ href, icon: Icon, eyebrow, title: toolTitle, description: toolDescription, cta }) => (
            <article key={href} className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">{eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">{toolTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{toolDescription}</p>
              <Link href={href} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
                {cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
