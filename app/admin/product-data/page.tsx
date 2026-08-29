import Link from "next/link";
import { AlertTriangle, CheckCircle2, Database, ExternalLink, FileCheck2, FlaskConical } from "lucide-react";

import { updateProductDocumentation } from "@/app/actions/product-documentation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function hasText(value?: string | null) {
  return Boolean(value && value.trim().length > 0);
}

export default async function ProductDataQualityPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      purity: true,
      sequence: true,
      description: true,
      isActive: true,
    },
  });

  const missingPurity = products.filter((product) => !hasText(product.purity)).length;
  const peptideProducts = products.filter((product) => product.category.trim().toLowerCase() === "peptides");
  const missingPeptideSequence = peptideProducts.filter((product) => !hasText(product.sequence)).length;
  const shortDescriptions = products.filter((product) => product.description.replace(/\s+/g, " ").trim().length < 240).length;

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-[var(--glass-border)] pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
              <FileCheck2 className="h-4 w-4" /> Product documentation quality
            </div>
            <h1 className="text-4xl font-display font-black tracking-tight text-[var(--text-main)]">Documentation Completeness</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              Complete only values supported by the product record or real lot-specific analytical documentation. Do not infer purity, sequence, testing methods, or batch evidence from another product.
            </p>
          </div>
          <Link href="/admin/products" className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-4 py-2.5 text-sm font-bold text-[var(--text-main)] hover:border-[var(--color-brand-primary)]">
            Product Manager <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
          <Database className="h-5 w-5 text-[var(--color-brand-primary)]" />
          <p className="mt-4 text-3xl font-display font-black">{products.length}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Total product records</p>
        </div>
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <p className="mt-4 text-3xl font-display font-black">{missingPurity}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Missing catalog purity value</p>
        </div>
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
          <FlaskConical className="h-5 w-5 text-[var(--color-brand-primary)]" />
          <p className="mt-4 text-3xl font-display font-black">{missingPeptideSequence}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Peptides missing sequence</p>
        </div>
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <p className="mt-4 text-3xl font-display font-black">{shortDescriptions}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Records under 240 characters</p>
        </div>
      </section>

      <section className="space-y-5">
        {products.map((product) => {
          const isPeptide = product.category.trim().toLowerCase() === "peptides";
          const purityComplete = hasText(product.purity);
          const sequenceComplete = !isPeptide || hasText(product.sequence);
          const descriptionLength = product.description.replace(/\s+/g, " ").trim().length;
          const descriptionComplete = descriptionLength >= 240;
          const complete = purityComplete && sequenceComplete && descriptionComplete;

          return (
            <article key={product.id} className="rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-6 shadow-sm">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-[var(--text-main)]">{product.name}</h2>
                    <span className="rounded-full border border-[var(--glass-border)] px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{product.category}</span>
                    {!product.isActive && <span className="rounded-full bg-red-500/10 px-2 py-1 text-[9px] font-bold uppercase text-red-400">Inactive</span>}
                    {complete ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-bold uppercase text-emerald-500"><CheckCircle2 className="h-3 w-3" /> Core record complete</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-[9px] font-bold uppercase text-amber-500"><AlertTriangle className="h-3 w-3" /> Review needed</span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider">
                    <span className={purityComplete ? "text-emerald-500" : "text-amber-500"}>Purity: {purityComplete ? "recorded" : "missing"}</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className={sequenceComplete ? "text-emerald-500" : "text-amber-500"}>Sequence: {isPeptide ? (sequenceComplete ? "recorded" : "missing") : "optional"}</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className={descriptionComplete ? "text-emerald-500" : "text-amber-500"}>Abstract: {descriptionLength} chars</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={`/product/${product.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-primary)]">Public product <ExternalLink className="h-3.5 w-3.5" /></Link>
                    <Link href={`/research/compounds/${product.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-primary)]">Research profile <ExternalLink className="h-3.5 w-3.5" /></Link>
                  </div>
                </div>

                <form action={updateProductDocumentation.bind(null, product.id)} className="grid w-full gap-4 xl:max-w-2xl xl:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Catalog purity record</label>
                    <input
                      name="purity"
                      defaultValue={product.purity || ""}
                      placeholder="e.g. 99.4%"
                      className="mt-2 w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-sm text-[var(--text-main)] outline-none focus:border-[var(--color-brand-primary)]"
                    />
                    <p className="mt-1.5 text-[10px] leading-relaxed text-[var(--text-muted)]">Leave blank when no documented product-level purity value exists.</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Peptide sequence</label>
                    <textarea
                      name="sequence"
                      defaultValue={product.sequence || ""}
                      rows={3}
                      placeholder={isPeptide ? "Documented sequence" : "Optional for this material class"}
                      className="mt-2 w-full resize-none rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 font-mono text-xs text-[var(--text-main)] outline-none focus:border-[var(--color-brand-primary)]"
                    />
                    <p className="mt-1.5 text-[10px] leading-relaxed text-[var(--text-muted)]">Preserve source notation for modified or non-standard sequences.</p>
                  </div>
                  <div className="xl:col-span-2 flex justify-end">
                    <button type="submit" className="rounded-xl bg-[var(--text-main)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[var(--bg-page)] hover:opacity-90">Save Documentation</button>
                  </div>
                </form>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
