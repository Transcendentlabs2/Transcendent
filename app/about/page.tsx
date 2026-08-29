import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileCheck2, FlaskConical, ShieldCheck } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `About ${SITE_NAME} | Research, Evidence & Traceability`;
const description =
  "Learn how Transcendent Labs organizes research-compound information around laboratory education, analytical documentation, lot traceability, and research-use-only standards.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: "/about", siteName: SITE_NAME, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#page`,
  url: `${SITE_URL}/about`,
  name: `About ${SITE_NAME}`,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
};

const pillars = [
  {
    icon: BookOpenCheck,
    title: "Research education",
    text: "Educational pages focus on laboratory concepts such as peptide identity, chromatographic purity, mass spectrometry, storage, synthesis context, and documentation review.",
  },
  {
    icon: FileCheck2,
    title: "Lot-level evidence",
    text: "Product claims and lot records are treated separately from general educational content. Batch-specific analytical statements should be tied to the corresponding lot documentation rather than inferred from category-level marketing.",
  },
  {
    icon: FlaskConical,
    title: "Analytical context",
    text: "HPLC, mass spectrometry, certificates of analysis, and traceability fields are presented with their limitations so that a single number or graph is not treated as a complete characterization of a research material.",
  },
  {
    icon: ShieldCheck,
    title: "Research-use-only scope",
    text: "The site is structured for laboratory and analytical research contexts. It does not provide dosing, administration, diagnosis, treatment, or human-consumption guidance.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">About Transcendent Labs</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Research information organized around evidence, not unsupported claims.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Transcendent Labs is building a research-compound information system that connects catalog records, laboratory education, analytical documentation, public COA records, and lot traceability while keeping research-only information separate from medical or human-use guidance.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map(({ icon: Icon, title: pillarTitle, text }) => (
              <article key={pillarTitle} className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--color-brand-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-xl font-bold">{pillarTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">How the site is structured</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Four connected evidence layers</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["Catalog & product records", "Research & reference guides", "Quality & analytical methods", "COA & batch verification"].map((item, index) => (
              <div key={item} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-5">
                <span className="text-[10px] font-mono text-[var(--color-brand-primary)]">0{index + 1}</span>
                <p className="mt-3 text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link href="/editorial-policy" className="group rounded-2xl border border-[var(--glass-border)] p-6 hover:border-[var(--color-brand-primary)]/50">
            <p className="text-xs font-bold">Editorial Policy</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">How educational content, claims, revisions, and evidence are handled.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand-primary)]">Read policy <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
          <Link href="/analytical-methods" className="group rounded-2xl border border-[var(--glass-border)] p-6 hover:border-[var(--color-brand-primary)]/50">
            <p className="text-xs font-bold">Analytical Methods</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">What HPLC and mass spectrometry can and cannot establish.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand-primary)]">View methods <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
          <Link href="/research-use-policy" className="group rounded-2xl border border-[var(--glass-border)] p-6 hover:border-[var(--color-brand-primary)]/50">
            <p className="text-xs font-bold">Research Use Policy</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">The intended informational and product-use scope of the site.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand-primary)]">Read scope <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
