import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpen,
  FileCheck2,
  FlaskConical,
  Search as SearchIcon,
  Wrench,
} from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma";
import { getPublishedCoas } from "@/lib/coa";
import { RESEARCH_ARTICLES } from "@/lib/research";
import { REFERENCE_GUIDES } from "@/lib/research-reference";

export const metadata: Metadata = {
  title: "Search | Transcendent Labs",
  description:
    "Search Transcendent Labs products, peptide research guides, analytical references, COA resources, and laboratory tools.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

type StaticResource = {
  href: string;
  title: string;
  description: string;
  category: string;
};

const STATIC_RESOURCES: StaticResource[] = [
  {
    href: "/research-peptides",
    title: "Research Peptides",
    description: "Browse active peptide catalog records and their research documentation.",
    category: "Catalog",
  },
  {
    href: "/research-compounds",
    title: "Research Compounds",
    description: "Browse the complete active research-compound catalog.",
    category: "Catalog",
  },
  {
    href: "/research",
    title: "Research Library",
    description: "Laboratory-focused guides covering peptide testing, COA review, stability, and analytical interpretation.",
    category: "Research",
  },
  {
    href: "/research/reference",
    title: "Peptide Reference Guides",
    description: "Reference material on synthesis, purification, analytical methods, storage, and batch traceability.",
    category: "Research",
  },
  {
    href: "/glossary",
    title: "Peptide Research Glossary",
    description: "Definitions for HPLC, chromatograms, m/z, monoisotopic mass, COA, lyophilization, and other research terms.",
    category: "Reference",
  },
  {
    href: "/analytical-methods",
    title: "Analytical Methods",
    description: "Understand what HPLC and mass spectrometry can and cannot establish about research materials.",
    category: "Evidence",
  },
  {
    href: "/quality",
    title: "Quality & Analytical Documentation",
    description: "Evidence-first guidance for purity records, lot traceability, and analytical documentation.",
    category: "Evidence",
  },
  {
    href: "/coa",
    title: "COA Library",
    description: "Search verified public lot-specific analytical records when available.",
    category: "Evidence",
  },
  {
    href: "/tools/coa-checklist",
    title: "Peptide COA Review Checklist",
    description: "Free tool for checking whether a Certificate of Analysis contains core documentation fields.",
    category: "Tool",
  },
  {
    href: "/tools/peptide-molecular-weight",
    title: "Peptide Molecular Weight Calculator",
    description: "Calculate theoretical neutral monoisotopic mass and common protonated m/z values from peptide sequences.",
    category: "Tool",
  },
  {
    href: "/tools/amino-acid-sequence-converter",
    title: "Amino Acid Sequence Converter",
    description: "Convert peptide sequences between standard one-letter and three-letter amino-acid notation.",
    category: "Tool",
  },
  {
    href: "/about",
    title: "About Transcendent Labs",
    description: "How catalog data, research education, analytical documentation, and lot evidence are separated.",
    category: "Trust",
  },
  {
    href: "/editorial-policy",
    title: "Editorial Policy",
    description: "How research content, analytical claims, revisions, and evidence boundaries are handled.",
    category: "Trust",
  },
  {
    href: "/research-use-policy",
    title: "Research Use Policy",
    description: "The intended laboratory and research-only scope of product and educational information.",
    category: "Trust",
  },
];

function normalizeSearchValue(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value || "";
  return raw.trim().slice(0, 80);
}

function includesQuery(values: Array<string | undefined>, query: string) {
  const normalized = query.toLowerCase();
  return values.some((value) => value?.toLowerCase().includes(normalized));
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = normalizeSearchValue(params.q);
  const shouldSearch = query.length >= 2;

  const products = shouldSearch
    ? await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
            { slug: { contains: query } },
          ],
        },
        orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
        take: 12,
        select: {
          name: true,
          slug: true,
          category: true,
          description: true,
          purity: true,
          stock: true,
        },
      })
    : [];

  const researchResults = shouldSearch
    ? RESEARCH_ARTICLES.filter((article) =>
        includesQuery(
          [
            article.title,
            article.description,
            article.cluster,
            article.primaryKeyword,
            ...article.supportingKeywords,
          ],
          query,
        ),
      ).slice(0, 10)
    : [];

  const referenceResults = shouldSearch
    ? REFERENCE_GUIDES.filter((guide) =>
        includesQuery(
          [guide.title, guide.description, guide.primaryKeyword, ...guide.supportingKeywords],
          query,
        ),
      ).slice(0, 10)
    : [];

  const resourceResults = shouldSearch
    ? STATIC_RESOURCES.filter((resource) =>
        includesQuery([resource.title, resource.description, resource.category], query),
      )
    : [];

  const coaResults = shouldSearch
    ? getPublishedCoas()
        .filter((record) =>
          includesQuery(
            [record.lot, record.productName, record.productSlug, record.laboratory, ...record.methods],
            query,
          ),
        )
        .slice(0, 10)
    : [];

  const resultCount =
    products.length +
    researchResults.length +
    referenceResults.length +
    resourceResults.length +
    coaResults.length;

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-12 pt-32 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <SearchIcon className="h-4 w-4" /> Site search
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">
            Search research products, evidence, and laboratory resources.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            Search active catalog records, research guides, analytical references, verified COA records, and free research tools from one place.
          </p>

          <form action="/search" method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="site-search" className="sr-only">Search Transcendent Labs</label>
            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={query}
              maxLength={80}
              autoFocus
              placeholder="Search HPLC, COA, peptide sequence, compound name..."
              className="min-h-12 flex-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-brand-primary)]"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--text-main)] px-6 py-3 text-sm font-bold text-[var(--bg-page)]"
            >
              <SearchIcon className="h-4 w-4" /> Search
            </button>
          </form>

          {query && query.length < 2 && (
            <p className="mt-3 text-xs text-amber-500">Enter at least two characters to search.</p>
          )}

          {shouldSearch && (
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              {resultCount} result{resultCount === 1 ? "" : "s"} for <strong className="text-[var(--text-main)]">“{query}”</strong>
            </p>
          )}
        </div>
      </section>

      {!query && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Popular destinations</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {STATIC_RESOURCES.slice(0, 9).map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50"
                >
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{resource.category}</span>
                  <h2 className="mt-2 font-display text-lg font-bold group-hover:text-[var(--color-brand-primary)]">{resource.title}</h2>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {shouldSearch && resultCount === 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-center">
            <SearchIcon className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
            <h2 className="mt-4 font-display text-2xl font-bold">No matching records found</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Try a compound name, analytical method, COA term, peptide sequence concept, or a broader research topic.
            </p>
            <Link href="/site-index" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)]">
              Browse Site Index <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="border-t border-[var(--glass-border)] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-2xl font-bold">Products</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <Link key={product.slug} href={`/product/${product.slug}`} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{product.category}</span>
                      <h3 className="mt-2 font-display text-xl font-bold">{product.name}</h3>
                    </div>
                    <span className={`text-[9px] font-bold uppercase ${product.stock > 0 ? "text-emerald-500" : "text-amber-500"}`}>
                      {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[var(--text-muted)]">{product.description}</p>
                  {product.purity && <p className="mt-3 text-[10px] font-mono text-[var(--text-muted)]">Catalog purity record: {product.purity}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {researchResults.length > 0 && (
        <section className="border-t border-[var(--glass-border)] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-2xl font-bold">Research Library</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {researchResults.map((article) => (
                <Link key={article.slug} href={`/research/${article.slug}`} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{article.cluster}</span>
                  <h3 className="mt-2 font-display text-lg font-bold">{article.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {referenceResults.length > 0 && (
        <section className="border-t border-[var(--glass-border)] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2">
              <Atom className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-2xl font-bold">Reference Guides</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {referenceResults.map((guide) => (
                <Link key={guide.slug} href={`/research/reference/${guide.slug}`} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Reference</span>
                  <h3 className="mt-2 font-display text-lg font-bold">{guide.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{guide.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {coaResults.length > 0 && (
        <section className="border-t border-[var(--glass-border)] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-2xl font-bold">Verified COA Records</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {coaResults.map((record) => (
                <Link key={record.lot} href={`/coa/${encodeURIComponent(record.lot)}`} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-500">Verified lot</span>
                  <h3 className="mt-2 font-display text-lg font-bold">{record.productName} · Lot {record.lot}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                    {record.purity ? `Purity: ${record.purity}. ` : ""}{record.methods.length ? `Methods: ${record.methods.join(", ")}.` : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {resourceResults.length > 0 && (
        <section className="border-t border-[var(--glass-border)] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-display text-2xl font-bold">Tools & Resources</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {resourceResults.map((resource) => (
                <Link key={resource.href} href={resource.href} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-colors hover:border-[var(--color-brand-primary)]/50">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{resource.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold">{resource.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
