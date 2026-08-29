import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Beaker, BookOpenCheck, ShieldCheck } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Research Use Policy | ${SITE_NAME}`;
const description =
  "Read the Transcendent Labs research-use-only policy covering informational scope, product positioning, prohibited human-use guidance, and laboratory research boundaries.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/research-use-policy" },
  openGraph: { type: "website", url: "/research-use-policy", siteName: SITE_NAME, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/research-use-policy#page`,
  url: `${SITE_URL}/research-use-policy`,
  name: "Research Use Policy",
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Research Use Policy", item: `${SITE_URL}/research-use-policy` },
  ],
};

export default function ResearchUsePolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Research-use-only standard</p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight md:text-6xl">Research Use Policy</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Transcendent Labs product and educational information is presented for laboratory research, analytical review, documentation, and research-material traceability contexts. It is not intended as medical guidance or human-use instruction.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
            <Beaker className="h-6 w-6 text-[var(--color-brand-primary)]" />
            <h2 className="mt-5 font-display text-xl font-bold">Laboratory scope</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">Product information is framed around research identity, composition, documentation, storage context, and lot traceability rather than consumer-health outcomes.</p>
          </article>
          <article className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
            <BookOpenCheck className="h-6 w-6 text-[var(--color-brand-primary)]" />
            <h2 className="mt-5 font-display text-xl font-bold">Educational scope</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">Research guides explain analytical and laboratory concepts. They do not convert research compounds into medical products or provide therapeutic recommendations.</p>
          </article>
          <article className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
            <ShieldCheck className="h-6 w-6 text-[var(--color-brand-primary)]" />
            <h2 className="mt-5 font-display text-xl font-bold">Human-use boundary</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">The site does not provide dosing, injection, administration, treatment, diagnosis, performance, or human-consumption instructions for research-only compounds.</p>
          </article>
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold">How this affects site content</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Allowed focus", "Analytical methods, peptide chemistry concepts, documentation review, lot traceability, laboratory handling context, research tools, and research-use-only product records."],
              ["Excluded focus", "Dosing protocols, routes of administration, treatment plans, diagnosis, therapeutic efficacy instructions, bodybuilding protocols, weight-loss instructions, or other human-use directions."],
              ["Product evidence", "Specific analytical claims should be supported by the corresponding product or lot record rather than inferred from general research articles."],
              ["Educational content", "General scientific explanations are informational and should not be interpreted as proof that a specific commercial lot has a particular analytical result."],
            ].map(([heading, text]) => (
              <div key={heading} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-6">
                <h3 className="text-sm font-bold">{heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-7 text-sm leading-relaxed text-[var(--text-muted)]">
            <strong className="text-[var(--text-main)]">Research-use-only notice:</strong> Products and information on this site are not intended for human consumption, medical diagnosis, treatment, or administration. Researchers are responsible for evaluating applicable institutional, legal, and laboratory requirements for their work.
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/editorial-policy" className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
              Editorial Policy <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/quality" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">Quality & Documentation</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
