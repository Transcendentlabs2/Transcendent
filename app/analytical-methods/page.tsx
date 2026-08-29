import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Microscope, Waves } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Analytical Methods for Peptide Research | HPLC & Mass Spectrometry | ${SITE_NAME}`;
const description =
  "Understand how Transcendent Labs presents HPLC, mass spectrometry, purity, identity, and lot-specific analytical documentation for laboratory research materials.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/analytical-methods" },
  openGraph: { type: "website", url: "/analytical-methods", siteName: SITE_NAME, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/analytical-methods#page`,
  url: `${SITE_URL}/analytical-methods`,
  name: "Analytical Methods for Peptide Research",
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: ["HPLC peptide testing", "peptide mass spectrometry", "analytical documentation", "batch traceability"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Analytical Methods", item: `${SITE_URL}/analytical-methods` },
  ],
};

export default function AnalyticalMethodsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Analytical framework</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            HPLC and mass spectrometry answer different analytical questions.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Analytical confidence comes from understanding what each method measures, how the result is documented, and whether the record can be traced to the actual lot being evaluated.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 md:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
              <Waves className="h-5 w-5" />
            </div>
            <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Separation & composition</p>
            <h2 className="mt-2 font-display text-2xl font-bold">High-performance liquid chromatography</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              HPLC separates detectable sample components under a defined chromatographic method. A reported area percentage can help describe how dominant a principal peak is relative to other integrated peaks under those conditions.
            </p>
            <div className="mt-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-5 text-sm leading-relaxed text-[var(--text-muted)]">
              <strong className="text-[var(--text-main)]">Important limitation:</strong> chromatographic area percentage is method-dependent and is not automatically equivalent to absolute chemical purity or molecular identity.
            </div>
          </article>

          <article className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 md:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
              <Microscope className="h-5 w-5" />
            </div>
            <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Molecular mass evidence</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Mass spectrometry</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              Mass spectrometry measures mass-to-charge ratios for ionized species. For peptide research, observed signals can be compared with theoretical molecular species to support identity assessment.
            </p>
            <div className="mt-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-5 text-sm leading-relaxed text-[var(--text-muted)]">
              <strong className="text-[var(--text-main)]">Important limitation:</strong> a matching mass signal does not by itself establish chromatographic purity, complete composition, or batch quality.
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-5 w-5 text-[var(--color-brand-primary)]" />
            <h2 className="font-display text-2xl font-bold">What makes analytical documentation useful?</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Lot or sample identifier", "Analysis date", "Method or instrument context", "Readable primary analytical output", "Result consistent with displayed evidence", "Traceable connection to the delivered lot"].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-5 text-sm font-bold">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold">Lot-specific evidence takes precedence over generic claims.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
            A method name on a website does not prove that every product or batch has been analyzed by that method. Where verified lot records are available, the public COA record is the appropriate place to review batch-specific results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/coa" className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
              Browse COA Library <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/research/hplc-peptide-testing" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">HPLC Guide</Link>
            <Link href="/research/peptide-mass-spectrometry" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">Mass Spectrometry Guide</Link>
            <Link href="/tools/coa-checklist" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">COA Checklist</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
