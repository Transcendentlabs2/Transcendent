import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Wrench } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Free Laboratory Research Tools | ${SITE_NAME}`;
const description =
  "Use free Transcendent Labs research tools for analytical-documentation review, beginning with a peptide Certificate of Analysis completeness checklist.";

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
    numberOfItems: 1,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Peptide COA Review Checklist",
        url: `${SITE_URL}/tools/coa-checklist`,
      },
    ],
  },
};

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
            Laboratory tools designed to make research documentation easier to review.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Practical, shareable utilities for evaluating analytical documentation and research-material records without converting documentation checks into medical or human-use guidance.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <article className="max-w-2xl rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Documentation tool</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Peptide COA Review Checklist</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              Review whether a Certificate of Analysis contains core lot identifiers, dates, HPLC evidence, mass-spectrometric context and traceability fields. The tool scores documentation completeness—not authenticity, purity or product quality.
            </p>
            <Link href="/tools/coa-checklist" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
              Open Free Checklist <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
