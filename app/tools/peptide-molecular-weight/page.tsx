import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PeptideSequenceAnalyzer from "@/components/tools/PeptideSequenceAnalyzer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Peptide Molecular Weight Calculator & Sequence Analyzer | ${SITE_NAME}`;
const description =
  "Calculate theoretical peptide monoisotopic molecular weight, common protonated m/z values, sequence length and amino-acid composition from a one-letter peptide sequence.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/tools/peptide-molecular-weight" },
  openGraph: {
    type: "website",
    url: "/tools/peptide-molecular-weight",
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/tools/peptide-molecular-weight#application`,
  name: "Peptide Molecular Weight Calculator & Sequence Analyzer",
  description,
  url: `${SITE_URL}/tools/peptide-molecular-weight`,
  applicationCategory: "ScientificApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Peptide Molecular Weight Calculator", item: `${SITE_URL}/tools/peptide-molecular-weight` },
  ],
};

export default function PeptideMolecularWeightPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="relative border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <Atom className="h-3.5 w-3.5" /> Free peptide research calculator
          </div>
          <h1 className="max-w-5xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Peptide Molecular Weight Calculator & Sequence Analyzer
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Enter a standard one-letter amino-acid sequence to calculate its theoretical neutral monoisotopic mass, common protonated m/z values, sequence length and residue composition. The calculation is intended for laboratory research and analytical planning.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <PeptideSequenceAnalyzer />
        </div>
      </section>

      <section className="border-t border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">How the calculation works</p>
            <h2 className="mt-2 text-2xl font-display font-bold">Residue masses plus terminal water</h2>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] md:text-base">
              The neutral monoisotopic mass is calculated by summing the monoisotopic residue mass of each amino acid and adding the mass of water for the free N- and C-termini. Protonated m/z values then add one proton for each charge state before dividing by the charge.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)] md:text-base">
              This gives a theoretical reference value. Experimental spectra may contain different charge states, adducts, isotopic envelopes, modifications, salts or other species depending on the sample and analytical method.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Interpretation</p>
            <h2 className="mt-2 text-2xl font-display font-bold">Use theoretical mass as context—not identity proof.</h2>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] md:text-base">
              A calculated molecular mass is a reference derived from a sequence. Matching a theoretical value to an observed mass-spectrometric signal can support interpretation, but complete analytical identity depends on the experiment, instrument, sample and supporting evidence.
            </p>
            <Link href="/research/peptide-mass-spectrometry" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">
              Read the peptide mass spectrometry guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link href="/tools/coa-checklist" className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Free tool</p>
            <h2 className="mt-3 font-display text-lg font-bold">COA Review Checklist</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Review lot identifiers and analytical-documentation completeness.</p>
          </Link>
          <Link href="/research/hplc-peptide-testing" className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Research guide</p>
            <h2 className="mt-3 font-display text-lg font-bold">HPLC Peptide Testing</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Understand chromatographic purity and method context.</p>
          </Link>
          <Link href="/research/peptide-mass-spectrometry" className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 hover:border-[var(--color-brand-primary)]/50 transition-colors">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Research guide</p>
            <h2 className="mt-3 font-display text-lg font-bold">Peptide Mass Spectrometry</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Learn how molecular-mass evidence supports identity interpretation.</p>
          </Link>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> This calculator provides theoretical sequence-based analytical values. It does not provide medical, dosing, administration, treatment, or human-use guidance.
        </div>
      </section>

      <Footer />
    </main>
  );
}
