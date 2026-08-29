import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, RefreshCw, Scale, ShieldCheck } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Editorial Policy | ${SITE_NAME}`;
const description =
  "Read the Transcendent Labs editorial policy for laboratory research content, evidence handling, claim separation, updates, corrections, and research-use-only boundaries.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: { type: "website", url: "/editorial-policy", siteName: SITE_NAME, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/editorial-policy#page`,
  url: `${SITE_URL}/editorial-policy`,
  name: "Editorial Policy",
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  dateModified: "2026-08-29",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Editorial Policy", item: `${SITE_URL}/editorial-policy` },
  ],
};

const sections = [
  {
    icon: BookOpenCheck,
    title: "Educational content and product evidence are different things",
    body: "Research guides explain general laboratory concepts. Product pages describe catalog records. Lot-specific analytical claims belong with the corresponding batch documentation. General educational statements are not used as substitutes for a real COA or lot record.",
  },
  {
    icon: Scale,
    title: "Evidence hierarchy",
    body: "Where a statement depends on a specific batch, the strongest source is the batch-specific analytical record. Method documentation and primary analytical outputs are preferred over unsupported marketing summaries. A purity percentage without traceable method context is treated as incomplete evidence rather than a complete characterization.",
  },
  {
    icon: ShieldCheck,
    title: "Research-use-only boundaries",
    body: "Editorial content is limited to laboratory, analytical, documentation, and research-material topics. The site does not publish dosing, administration, treatment, diagnosis, performance, or human-consumption instructions for research compounds.",
  },
  {
    icon: RefreshCw,
    title: "Updates and corrections",
    body: "Content should be revised when analytical terminology, product records, internal links, or supporting documentation materially change. If an unsupported claim is identified, the preferred response is to remove or qualify the claim rather than preserve it for marketing consistency.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Transparency standard</p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight md:text-6xl">Editorial Policy</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            This policy describes how Transcendent Labs separates educational material from commercial claims, how evidence is prioritized, and how unsupported or outdated statements should be handled.
          </p>
          <p className="mt-4 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Last reviewed: August 29, 2026</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-6">
          {sections.map(({ icon: Icon, title: sectionTitle, body }) => (
            <article key={sectionTitle} className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 md:p-8">
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">{sectionTitle}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold">What we deliberately avoid</h2>
          <ul className="mt-6 grid gap-3 text-sm text-[var(--text-muted)] md:grid-cols-2">
            <li className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4">Fabricated reviews, laboratories, lots, or analytical percentages.</li>
            <li className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4">Presenting a method name as proof that every product or batch was tested by that method.</li>
            <li className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4">Using educational articles as evidence for a specific lot claim.</li>
            <li className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4">Medical or human-use instructions for research-only materials.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-3">
          <Link href="/analytical-methods" className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
            Analytical Methods <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/coa" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">
            COA Library
          </Link>
          <Link href="/research-use-policy" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold">
            Research Use Policy
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
