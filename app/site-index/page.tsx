import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileCheck2, FlaskConical, Map, Microscope, PackageSearch, ShieldCheck, Wrench } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma";
import { getPublishedCoas } from "@/lib/coa";
import { isResearchProfileIndexable } from "@/lib/product-research";
import { RESEARCH_ARTICLES } from "@/lib/research";
import { REFERENCE_GUIDES } from "@/lib/research-reference";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Site Index | Research, Products, COA & Tools | ${SITE_NAME}`;
const description =
  "Browse the complete Transcendent Labs site index for research compounds, peptide guides, reference content, analytical methods, COA records, laboratory tools, and trust pages.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/site-index" },
  openGraph: {
    type: "website",
    url: "/site-index",
    siteName: SITE_NAME,
    title,
    description,
    images: [{ url: "/heroPeptide.webp", alt: `${SITE_NAME} site index` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/heroPeptide.webp"] },
};

const staticResources = [
  { href: "/research-peptides", label: "Research Peptides" },
  { href: "/research-compounds", label: "Research Compounds" },
  { href: "/research", label: "Research Library" },
  { href: "/research/reference", label: "Reference Guides" },
  { href: "/research/compounds", label: "Compound Research Profiles" },
  { href: "/glossary", label: "Research Glossary" },
  { href: "/quality", label: "Quality & Documentation" },
  { href: "/analytical-methods", label: "Analytical Methods" },
  { href: "/coa", label: "COA Library" },
  { href: "/tools", label: "Research Tools" },
  { href: "/tools/coa-checklist", label: "Peptide COA Review Checklist" },
  { href: "/tools/peptide-molecular-weight", label: "Peptide Molecular Weight Calculator" },
  { href: "/tools/amino-acid-sequence-converter", label: "Amino Acid Sequence Converter" },
  { href: "/about", label: "About Transcendent Labs" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/research-use-policy", label: "Research Use Policy" },
];

export default async function SiteIndexPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      name: true,
      slug: true,
      category: true,
      description: true,
      purity: true,
      sequence: true,
    },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const researchProfiles = products.filter(isResearchProfileIndexable);
  const coas = getPublishedCoas();

  const itemUrls = [
    ...staticResources.map((item) => `${SITE_URL}${item.href}`),
    ...RESEARCH_ARTICLES.map((article) => `${SITE_URL}/research/${article.slug}`),
    ...REFERENCE_GUIDES.map((guide) => `${SITE_URL}/research/reference/${guide.slug}`),
    ...products.map((product) => `${SITE_URL}/product/${product.slug}`),
    ...researchProfiles.map((product) => `${SITE_URL}/research/compounds/${product.slug}`),
    ...coas.map((record) => `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/site-index#collection`,
    url: `${SITE_URL}/site-index`,
    name: "Transcendent Labs Site Index",
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemUrls.length,
      itemListElement: itemUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Site Index", item: `${SITE_URL}/site-index` },
    ],
  };

  const groups = [
    {
      icon: BookOpen,
      title: "Research Library",
      links: RESEARCH_ARTICLES.map((article) => ({ href: `/research/${article.slug}`, label: article.title })),
    },
    {
      icon: FlaskConical,
      title: "Reference Guides",
      links: REFERENCE_GUIDES.map((guide) => ({ href: `/research/reference/${guide.slug}`, label: guide.title })),
    },
    {
      icon: Wrench,
      title: "Research Tools",
      links: [
        { href: "/tools/peptide-molecular-weight", label: "Peptide Molecular Weight Calculator" },
        { href: "/tools/amino-acid-sequence-converter", label: "Amino Acid Sequence Converter" },
        { href: "/tools/coa-checklist", label: "Peptide COA Review Checklist" },
      ],
    },
    {
      icon: ShieldCheck,
      title: "Trust & Standards",
      links: [
        { href: "/about", label: "About Transcendent Labs" },
        { href: "/quality", label: "Quality & Documentation" },
        { href: "/analytical-methods", label: "Analytical Methods" },
        { href: "/editorial-policy", label: "Editorial Policy" },
        { href: "/research-use-policy", label: "Research Use Policy" },
        { href: "/glossary", label: "Research Glossary" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <Map className="h-3.5 w-3.5" /> HTML site index
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight md:text-6xl">
            Explore every public research, evidence, product, and tool surface.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            A crawlable human-readable index of Transcendent Labs public content, organized to make deeper research and documentation pages easier to discover.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-6 md:grid-cols-2">
            {groups.map(({ icon: Icon, title: groupTitle, links }) => (
              <section key={groupTitle} className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[var(--color-brand-primary)]" />
                  <h2 className="font-display text-xl font-bold">{groupTitle}</h2>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
            <div className="flex items-center gap-3">
              <PackageSearch className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-xl font-bold">Active Products</h2>
            </div>
            {products.length > 0 ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Link key={product.slug} href={`/product/${product.slug}`} className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                    <p className="text-sm font-bold">{product.name}</p>
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{product.category}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-[var(--text-muted)]">No active products are currently published.</p>
            )}
          </section>

          {researchProfiles.length > 0 && (
            <section className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
              <div className="flex items-center gap-3">
                <Microscope className="h-5 w-5 text-[var(--color-brand-primary)]" />
                <h2 className="font-display text-xl font-bold">Compound Research Profiles</h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Only profiles with enough original catalog documentation or structured evidence to meet the public indexing threshold are listed here.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {researchProfiles.map((product) => (
                  <Link key={product.slug} href={`/research/compounds/${product.slug}`} className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                    <p className="text-sm font-bold">{product.name} Research Profile</p>
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Analytical reference</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-xl font-bold">Published COA Records</h2>
            </div>
            {coas.length > 0 ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {coas.map((record) => (
                  <Link key={record.lot} href={`/coa/${encodeURIComponent(record.lot)}`} className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-4 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                    <p className="text-sm font-bold">{record.productName}</p>
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Lot {record.lot}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-[var(--text-muted)]">No verified public COA records are currently published.</p>
            )}
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
