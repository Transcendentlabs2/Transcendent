import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CoaChecklist from "@/components/tools/CoaChecklist";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Peptide COA Review Checklist | Free Certificate of Analysis Tool | ${SITE_NAME}`;
const description =
  "Use a free peptide COA checklist to review lot identifiers, dates, HPLC evidence, mass-spectrometric context, method information and documentation consistency.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/tools/coa-checklist" },
  openGraph: {
    type: "website",
    url: "/tools/coa-checklist",
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

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/tools/coa-checklist#application`,
  name: "Peptide COA Review Checklist",
  description,
  url: `${SITE_URL}/tools/coa-checklist`,
  applicationCategory: "ScientificApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "COA Review Checklist", item: `${SITE_URL}/tools/coa-checklist` },
  ],
};

export default function CoaChecklistPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="relative border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <ClipboardCheck className="h-3.5 w-3.5" /> Free documentation tool
          </div>
          <h1 className="max-w-5xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Peptide Certificate of Analysis Review Checklist
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Review whether a peptide COA contains the identifiers, dates, analytical context and lot-traceability fields that make a certificate easier to evaluate. The score reflects documentation completeness only—it does not verify authenticity or material quality.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/research/how-to-read-peptide-coa" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)] transition-colors">
              Read COA Guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/coa" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)] transition-colors">
              Search COA Library
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">10-point review</p>
            <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">Mark the fields you can actually confirm.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              Do not infer a missing field from branding, packaging or a headline purity claim. Select an item only when the certificate or attached analytical record visibly supports it.
            </p>
          </div>
          <CoaChecklist />
        </div>
      </section>

      <section className="border-t border-[var(--glass-border)] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link href="/quality" className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Quality architecture</p>
            <h2 className="mt-3 font-display text-lg font-bold">How the evidence chain works</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">See how product records, methods, lots and COAs fit together.</p>
          </Link>
          <Link href="/research/hplc-peptide-testing" className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Analytical testing</p>
            <h2 className="mt-3 font-display text-lg font-bold">Understand HPLC evidence</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Learn what a chromatogram can and cannot support.</p>
          </Link>
          <Link href="/research/peptide-mass-spectrometry" className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Identity evidence</p>
            <h2 className="mt-3 font-display text-lg font-bold">Understand mass spectrometry</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Separate molecular-mass evidence from chromatographic purity.</p>
          </Link>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> This tool evaluates documentation completeness for laboratory research records. It is not a medical, dosing, administration, product-authentication, or human-use assessment.
        </div>
      </section>

      <Footer />
    </main>
  );
}
