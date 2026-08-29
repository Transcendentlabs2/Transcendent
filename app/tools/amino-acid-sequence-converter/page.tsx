import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Atom } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AminoAcidSequenceConverter from "@/components/tools/AminoAcidSequenceConverter";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Amino Acid Sequence Converter | 1-Letter ↔ 3-Letter Codes | ${SITE_NAME}`;
const description =
  "Convert peptide sequences between standard one-letter and three-letter amino-acid notation, review residue names, and copy formatted output for laboratory documentation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/tools/amino-acid-sequence-converter" },
  keywords: [
    "amino acid sequence converter",
    "one letter to three letter amino acid converter",
    "peptide sequence converter",
    "amino acid code converter",
  ],
  openGraph: {
    type: "website",
    url: "/tools/amino-acid-sequence-converter",
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/tools/amino-acid-sequence-converter#app`,
  name: "Amino Acid Sequence Converter",
  url: `${SITE_URL}/tools/amino-acid-sequence-converter`,
  description,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Research Tools", item: `${SITE_URL}/tools` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Amino Acid Sequence Converter",
      item: `${SITE_URL}/tools/amino-acid-sequence-converter`,
    },
  ],
};

export default function AminoAcidSequenceConverterPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <ArrowLeftRight className="h-3.5 w-3.5" /> Free peptide notation tool
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Amino acid sequence converter: one-letter ↔ three-letter notation.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Convert standard peptide sequences between one-letter and three-letter amino-acid codes, inspect residue names, and copy a clean formatted sequence for laboratory records or analytical documentation.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 md:p-8">
          <AminoAcidSequenceConverter />
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <article>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Standard notation</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Why peptide sequences use multiple code systems</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              One-letter codes are compact and convenient for sequence calculation, database records, and computational workflows. Three-letter codes are more readable in reports, teaching materials, and manual documentation because each residue is easier to distinguish visually.
            </p>
          </article>
          <article>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Tool limitation</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Notation conversion is not chemical structure interpretation</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              This converter handles the 20 standard amino acids only. Non-standard residues, ambiguous symbols, terminal modifications, protecting groups, isotope labels, cyclization, and other chemical modifications require separate annotation.
            </p>
          </article>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold">Continue the sequence workflow</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tools/peptide-molecular-weight" className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
              <Atom className="h-4 w-4" /> Peptide Molecular Weight Calculator
            </Link>
            <Link href="/glossary" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">
              Research Glossary <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">All Research Tools</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
