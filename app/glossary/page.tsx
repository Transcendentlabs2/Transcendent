import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Peptide Research & Analytical Testing Glossary | ${SITE_NAME}`;
const description =
  "A laboratory-focused glossary of peptide research, HPLC, mass spectrometry, COA, lot traceability, lyophilization, molecular mass, and analytical-documentation terms.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/glossary" },
  openGraph: {
    type: "website",
    url: "/glossary",
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

type Term = {
  term: string;
  id: string;
  definition: string;
  related?: Array<{ label: string; href: string }>;
};

const TERMS: Term[] = [
  {
    term: "Analytical purity",
    id: "analytical-purity",
    definition:
      "A method-dependent estimate of how much of a detected sample signal is attributed to the main component under a defined analytical procedure. A chromatographic purity percentage does not, by itself, establish complete molecular identity or describe every possible impurity.",
    related: [{ label: "Peptide purity testing guide", href: "/research/peptide-purity-testing" }],
  },
  {
    term: "Batch / lot",
    id: "batch-lot",
    definition:
      "A traceability identifier assigned to a defined production or packaged quantity of material. A useful analytical record should connect the same lot identifier across the vial, Certificate of Analysis, chromatogram, spectrum, and related documentation.",
    related: [{ label: "COA Library", href: "/coa" }],
  },
  {
    term: "Certificate of Analysis (COA)",
    id: "certificate-of-analysis",
    definition:
      "A document summarizing analytical information associated with a material or lot. A useful COA can include the material name, lot identifier, analysis date, reported results, analytical methods, and supporting evidence. The presence of a certificate alone does not prove authenticity or analytical quality.",
    related: [
      { label: "How to read a peptide COA", href: "/research/how-to-read-peptide-coa" },
      { label: "Free COA checklist", href: "/tools/coa-checklist" },
    ],
  },
  {
    term: "Chromatogram",
    id: "chromatogram",
    definition:
      "A plot produced by a chromatographic separation showing detector response as compounds elute over time. Peak position, shape, area, integration, and method conditions all contribute to interpretation.",
    related: [{ label: "HPLC peptide testing guide", href: "/research/hplc-peptide-testing" }],
  },
  {
    term: "HPLC",
    id: "hplc",
    definition:
      "High-performance liquid chromatography, a separation technique commonly used to evaluate sample composition. In peptide analysis, HPLC may support a chromatographic purity estimate when the method, detector response, integration, and sample context are appropriate.",
    related: [{ label: "HPLC peptide testing guide", href: "/research/hplc-peptide-testing" }],
  },
  {
    term: "Peak area percentage",
    id: "peak-area-percentage",
    definition:
      "The integrated area of one chromatographic peak expressed relative to the total integrated area included in a calculation. Area percentage is influenced by the analytical method, detector response, integration rules, and which peaks are included or excluded.",
    related: [{ label: "Peptide purity testing guide", href: "/research/peptide-purity-testing" }],
  },
  {
    term: "Retention time",
    id: "retention-time",
    definition:
      "The elapsed time between sample injection and detection of a chromatographic peak under a specific method. Retention time can help compare chromatographic behavior, but it is method-dependent and should not be treated as standalone proof of molecular identity.",
    related: [{ label: "HPLC peptide testing guide", href: "/research/hplc-peptide-testing" }],
  },
  {
    term: "Mass spectrometry (MS)",
    id: "mass-spectrometry",
    definition:
      "An analytical technique that measures ions according to mass-to-charge ratio. For peptide research, observed mass-related signals can provide evidence consistent with an expected molecular species, while interpretation depends on ionization, charge state, adducts, isotopic patterns, instrument performance, and sample composition.",
    related: [{ label: "Peptide mass spectrometry guide", href: "/research/peptide-mass-spectrometry" }],
  },
  {
    term: "m/z",
    id: "mass-to-charge",
    definition:
      "Mass-to-charge ratio, the quantity measured along the horizontal axis of a typical mass spectrum. A multiply charged peptide ion can appear at an m/z value substantially lower than its neutral molecular mass.",
    related: [
      { label: "Peptide mass spectrometry guide", href: "/research/peptide-mass-spectrometry" },
      { label: "Peptide molecular weight calculator", href: "/tools/peptide-molecular-weight" },
    ],
  },
  {
    term: "Monoisotopic mass",
    id: "monoisotopic-mass",
    definition:
      "The calculated mass of a molecule using the exact mass of the most abundant stable isotope of each element in a defined composition. For an unmodified peptide sequence, a theoretical monoisotopic mass can be calculated from residue masses plus the terminal water molecule.",
    related: [{ label: "Peptide molecular weight calculator", href: "/tools/peptide-molecular-weight" }],
  },
  {
    term: "Lyophilization",
    id: "lyophilization",
    definition:
      "Freeze-drying, a process that removes water from a frozen material under reduced pressure. Lyophilization can support storage and handling of research materials, but stability remains dependent on the compound, formulation, packaging, temperature, moisture exposure, and other conditions.",
    related: [{ label: "Lyophilized peptide stability guide", href: "/research/lyophilized-peptide-stability" }],
  },
  {
    term: "Peptide sequence",
    id: "peptide-sequence",
    definition:
      "The ordered series of amino-acid residues that defines the primary structure of a peptide. Sequence information can be represented using one-letter or three-letter amino-acid codes and can be used to calculate theoretical composition and molecular mass.",
    related: [
      { label: "What are research peptides?", href: "/research/what-are-research-peptides" },
      { label: "Peptide molecular weight calculator", href: "/tools/peptide-molecular-weight" },
    ],
  },
  {
    term: "Traceability",
    id: "traceability",
    definition:
      "The ability to connect a physical research material to its product record, lot identifier, analytical documentation, dates, and supporting evidence without unexplained gaps or mismatched identifiers.",
    related: [
      { label: "Quality & analytical documentation", href: "/quality" },
      { label: "COA Library", href: "/coa" },
    ],
  },
  {
    term: "Research use only (RUO)",
    id: "research-use-only",
    definition:
      "A labeling and communication boundary indicating that a material or information resource is intended for laboratory research contexts rather than human consumption, administration, diagnosis, or treatment.",
    related: [{ label: "Research peptide catalog", href: "/research-peptides" }],
  },
];

const termSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${SITE_URL}/glossary#termset`,
  name: "Peptide Research & Analytical Testing Glossary",
  description,
  url: `${SITE_URL}/glossary`,
  hasDefinedTerm: TERMS.map((item) => ({
    "@type": "DefinedTerm",
    name: item.term,
    termCode: item.id,
    description: item.definition,
    url: `${SITE_URL}/glossary#${item.id}`,
    inDefinedTermSet: `${SITE_URL}/glossary#termset`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Research Glossary", item: `${SITE_URL}/glossary` },
  ],
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termSetSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="relative border-b border-[var(--glass-border)] px-6 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <BookMarked className="h-3.5 w-3.5" /> Laboratory reference
          </div>
          <h1 className="max-w-5xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Peptide Research & Analytical Testing Glossary
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Plain-language definitions for the analytical and documentation terms used across our research library, product records, COA pages, and laboratory tools.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--glass-border)] px-6 py-8">
        <nav aria-label="Glossary index" className="mx-auto flex max-w-6xl flex-wrap gap-2">
          {TERMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:border-[var(--color-brand-primary)] hover:text-[var(--text-main)] transition-colors">
              {item.term}
            </a>
          ))}
        </nav>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl space-y-5">
          {TERMS.map((item) => (
            <article id={item.id} key={item.id} className="scroll-mt-28 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 md:p-7">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Defined term</p>
              <h2 className="mt-2 font-display text-2xl font-bold">{item.term}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)] md:text-base">{item.definition}</p>
              {item.related && item.related.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {item.related.map((link) => (
                    <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">
                      {link.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> This glossary explains laboratory research and analytical-documentation terminology. It does not provide medical, dosing, administration, diagnostic, treatment, or human-use guidance.
        </div>
      </section>

      <Footer />
    </main>
  );
}
