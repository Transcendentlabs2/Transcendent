import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FlaskConical,
  Microscope,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Research Peptide Quality & Analytical Documentation | ${SITE_NAME}`;
const description =
  "Learn how Transcendent Labs structures research-compound quality around product records, lot traceability, analytical context, public COA evidence and research-use-only documentation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/quality" },
  openGraph: {
    type: "website",
    url: "/quality",
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

const evidenceLayers = [
  {
    icon: FileCheck2,
    title: "Product-level record",
    body: "The product page should state only the information currently present in the catalog record. Missing analytical fields are shown as unpublished rather than filled with a default claim.",
  },
  {
    icon: ShieldCheck,
    title: "Lot-level traceability",
    body: "A lot number becomes meaningful when it can be connected to the same material, analysis date, methods and supporting certificate. Public COA pages are reserved for verified records.",
  },
  {
    icon: Microscope,
    title: "Method context",
    body: "Chromatographic purity, molecular identity and complete material characterization are different questions. HPLC and mass spectrometry should be interpreted for what each method can actually support.",
  },
  {
    icon: FlaskConical,
    title: "Research-use boundaries",
    body: "Analytical documentation is kept separate from human-use claims. Public research content focuses on laboratory materials, evidence quality, traceability and reproducibility.",
  },
];

const qualitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/quality#webpage`,
  name: "Research Peptide Quality & Analytical Documentation",
  description,
  url: `${SITE_URL}/quality`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: [
    "Research peptide quality",
    "Analytical documentation",
    "Peptide batch traceability",
    "Certificate of Analysis",
    "HPLC interpretation",
    "Mass spectrometry",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Quality & Documentation", item: `${SITE_URL}/quality` },
  ],
};

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qualitySchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="relative border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[size:44px_44px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <ShieldCheck className="h-3.5 w-3.5" /> Quality architecture
          </div>
          <h1 className="max-w-5xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Evidence before adjectives: research quality built around <span className="text-[var(--color-brand-primary)]">traceable documentation.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            A high percentage or a polished certificate is not a complete quality system. This page explains how product records, analytical methods, lot identifiers and public COA evidence fit together when evaluating laboratory research materials.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/coa" className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity">
              Browse COA Library <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools/coa-checklist" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)] transition-colors">
              Use COA Review Checklist
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Evidence chain</p>
            <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">Four layers of useful documentation</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {evidenceLayers.map(({ icon: Icon, title: itemTitle, body }) => (
              <article key={itemTitle} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{itemTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">What a purity value means</p>
            <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">A result needs method context.</h2>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] md:text-base">
              A chromatographic purity percentage is most useful when it can be tied to a readable chromatogram, integration data, method context and the same lot identifier shown on the certificate and vial. The number alone should not be treated as a complete description of material identity or composition.
            </p>
            <Link href="/research/hplc-peptide-testing" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">
              Read the HPLC interpretation guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Identity is a separate question</p>
            <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">Complementary evidence matters.</h2>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] md:text-base">
              Mass spectrometry can provide evidence that an observed molecular species is consistent with an expected mass. It does not turn a purity percentage into an identity result, and HPLC retention behavior does not independently establish molecular identity. Connected evidence is stronger than a single isolated test.
            </p>
            <Link href="/research/peptide-mass-spectrometry" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">
              Read the mass spectrometry guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Publication policy</p>
            <h2 className="mt-2 text-2xl font-display font-bold md:text-3xl">What we publish—and what we deliberately leave blank.</h2>
            <div className="mt-7 space-y-4">
              {[
                "Lot pages are public only when a verified record exists in the COA source.",
                "Missing product purity is displayed as not published instead of receiving a default percentage.",
                "Compound research profiles are excluded from the sitemap when their source material is too thin.",
                "Analytical language is separated from medical, dosing, administration or human-use language.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-primary)]" />
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
            <h2 className="font-display text-xl font-bold">Review a certificate systematically</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Use the free documentation-completeness checklist to review whether a peptide COA contains the identifiers, dates, analytical evidence and traceability fields a researcher would normally want to inspect.
            </p>
            <Link href="/tools/coa-checklist" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
              Open COA Checklist <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> Quality and analytical documentation on this site is presented for laboratory research contexts. It is not medical guidance and does not establish suitability for human consumption or administration.
        </div>
      </section>

      <Footer />
    </main>
  );
}
