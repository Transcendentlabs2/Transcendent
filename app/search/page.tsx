import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, BookOpen, FileCheck2, Search as SearchIcon, Wrench } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma";
import { RESEARCH_ARTICLES } from "@/lib/research";

export const metadata: Metadata = {
  title: "Search | Transcendent Labs",
  description: "Search Transcendent Labs research compounds, analytical guides, COA resources, and laboratory research tools.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

const STATIC_RESOURCES = [
  {
    href: "/research-peptides",
    title: "Research Peptides",
    description: "Browse the active peptide catalog and laboratory-focused product records.",
    keywords: "research peptides peptide catalog laboratory compounds",
    type: "Catalog",
  },
  {
    href: "/research-compounds",
    title: "Research Compounds",
    description: "Browse all active research compounds in a crawlable catalog.",
    keywords: "research compounds catalog laboratory",
    type: "Catalog",
  },
  {
    href: "/coa",
    title: "Certificate of Analysis Library",
    description: "Search verified public lot-specific analytical records when available.",
    keywords: "coa certificate of analysis lot batch verification purity hplc mass spectrometry",
    type: "Evidence",
  },
  {
    href: "/quality",
    title: "Quality & Analytical Documentation",
    description: "Understand how product records, analytical methods, lot identifiers, and COAs form an evidence chain.",
    keywords: "quality analytical documentation hplc mass spectrometry coa evidence traceability",
    type: "Evidence",
  },
  {
    href: "/tools/coa-checklist",
    title: "Peptide COA Review Checklist",
    description: "Free tool for reviewing analytical-documentation completeness on a peptide COA.",
    keywords: "coa checklist certificate analysis review documentation tool",
    type: "Tool",
  },
  {
    href: "/tools/peptide-molecular-weight",
    title: "Peptide Molecular Weight Calculator",
    description: "Calculate theoretical peptide monoisotopic mass, m/z values, sequence length, and residue composition.",
    keywords: "peptide molecular weight calculator mass sequence analyzer mz amino acid",
    type: "Tool",
  },
];

function includesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (rawQuery || "").trim().slice(0, 80);
  const canSearch = query.length >= 2;

  const products = canSearch
    ? await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
            { purity: { contains: query } },
          ],
        },
        select: {
          name: true,
          slug: true,
          category: true,
          description: true,
          purity: true,
          stock: true,
        },
        orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
        take: 24,
      })
    : [];

  const researchResults = canSearch
    ? RESEARCH_ARTICLES.filter((article) =>
        [article.title, article.excerpt, article.cluster, article.primaryKeyword, ...article.secondaryKeywords]
          .some((value) => includesQuery(value, query))
      )
    : [];

  const resourceResults = canSearch
    ? STATIC_RESOURCES.filter((resource) =>
        [resource.title, resource.description, resource.keywords, resource.type]
          .some((value) => includesQuery(value, query))
      )
    : [];

  const totalResults = products.length + researchResults.length + resourceResults.length;

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <Navbar />

      <section className="border-b border-[var(--glass-border)] px-6 pb-12 pt-36 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Site search</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Search Transcendent Labs</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            Find research compounds, peptide guides, analytical-documentation resources, COA information, and free laboratory research tools.
          </p>

          <form action="/search" method="get" className="mt-8 flex max-w-3xl gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="search"
                name="q"
                defaultValue={query}
                minLength={2}
                maxLength={80}
                autoFocus
                placeholder="Search BPC-157, HPLC, COA, molecular weight..."
                className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] py-4 pl-12 pr-4 text-sm text-[var(--text-main)] outline-none transition-colors placeholder:text-[var(--text-muted)]/60 focus:border-[var(--color-brand-primary)]"
              />
            </div>
            <button type="submit" className="rounded-2xl bg-[var(--text-main)] px-6 py-4 text-sm font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          {!query ? (
            <div>
              <h2 className="font-display text-2xl font-bold">Popular destinations</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {STATIC_RESOURCES.map((resource) => (
                  <Link key={resource.href} href={resource.href} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{resource.type}</span>
                    <h3 className="mt-2 font-display text-lg font-bold">{resource.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{resource.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : !canSearch ? (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 text-sm text-[var(--text-muted)]">
              Enter at least two characters to search the catalog and research library.
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">Search results</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Results for “{query}”</h2>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">{totalResults} result{totalResults === 1 ? "" : "s"}</span>
              </div>

              {totalResults === 0 && (
                <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7">
                  <h3 className="font-display text-lg font-bold">No matches found</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    Try a compound name, analytical method such as HPLC or mass spectrometry, or a documentation term such as COA or lot verification.
                  </p>
                </div>
              )}

              {products.length > 0 && (
                <section className="mb-12">
                  <div className="mb-5 flex items-center gap-2">
                    <Atom className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <h3 className="font-display text-xl font-bold">Products & compounds</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {products.map((product) => (
                      <Link key={product.slug} href={`/product/${product.slug}`} className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{product.category}</span>
                            <h4 className="mt-2 font-display text-lg font-bold group-hover:text-[var(--color-brand-primary)] transition-colors">{product.name}</h4>
                          </div>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--color-brand-primary)]" />
                        </div>
                        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">{product.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2 text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                          {product.purity && <span className="rounded-full border border-[var(--glass-border)] px-2.5 py-1">Purity: {product.purity}</span>}
                          <span className="rounded-full border border-[var(--glass-border)] px-2.5 py-1">{product.stock > 0 ? "In stock" : "Out of stock"}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {researchResults.length > 0 && (
                <section className="mb-12">
                  <div className="mb-5 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <h3 className="font-display text-xl font-bold">Research guides</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {researchResults.map((article) => (
                      <Link key={article.slug} href={`/research/${article.slug}`} className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{article.cluster}</span>
                        <h4 className="mt-2 font-display text-lg font-bold group-hover:text-[var(--color-brand-primary)] transition-colors">{article.title}</h4>
                        <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{article.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {resourceResults.length > 0 && (
                <section>
                  <div className="mb-5 flex items-center gap-2">
                    {resourceResults.some((item) => item.type === "Tool") ? <Wrench className="h-4 w-4 text-[var(--color-brand-primary)]" /> : <FileCheck2 className="h-4 w-4 text-[var(--color-brand-primary)]" />}
                    <h3 className="font-display text-xl font-bold">Resources & tools</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {resourceResults.map((resource) => (
                      <Link key={resource.href} href={resource.href} className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 hover:border-[var(--color-brand-primary)]/50 transition-colors">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-brand-primary)]">{resource.type}</span>
                        <h4 className="mt-2 font-display text-lg font-bold group-hover:text-[var(--color-brand-primary)] transition-colors">{resource.title}</h4>
                        <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{resource.description}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
