import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, FileCheck2, FlaskConical } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CoaLookup from "@/components/coa/CoaLookup";
import { COA_RECORDS, findCoaByLot } from "@/lib/coa";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ lot: string }> };

export function generateStaticParams() {
  return COA_RECORDS.filter((record) => record.status === "VERIFIED").map((record) => ({ lot: record.lot }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lot } = await params;
  const record = findCoaByLot(decodeURIComponent(lot));

  if (!record || record.status !== "VERIFIED") {
    return {
      title: "COA Not Found",
      robots: { index: false, follow: true },
    };
  }

  const title = `${record.productName} COA | Lot ${record.lot} | ${SITE_NAME}`;
  const description = `Lot-specific Certificate of Analysis record for ${record.productName}, lot ${record.lot}. Review published analytical methods${record.purity ? ` and reported purity ${record.purity}` : ""}.`;
  const canonicalPath = `/coa/${encodeURIComponent(record.lot)}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CoaRecordPage({ params }: Props) {
  const { lot } = await params;
  const record = findCoaByLot(decodeURIComponent(lot));

  if (!record || record.status !== "VERIFIED") notFound();

  const canonicalUrl = `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    name: `${record.productName} Certificate of Analysis — Lot ${record.lot}`,
    url: canonicalUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "Dataset",
      "@id": `${canonicalUrl}#dataset`,
      name: `${record.productName} analytical record — lot ${record.lot}`,
      description: `Lot-specific analytical record published by ${SITE_NAME}.`,
      identifier: record.lot,
      creator: { "@id": `${SITE_URL}/#organization` },
      ...(record.analysisDate ? { dateModified: record.analysisDate } : {}),
      variableMeasured: [
        ...(record.purity ? [{ "@type": "PropertyValue", name: "Purity", value: record.purity }] : []),
        { "@type": "PropertyValue", name: "Methods", value: record.methods.join(", ") },
        { "@type": "PropertyValue", name: "Status", value: record.status },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "COA Library", item: `${SITE_URL}/coa` },
      { "@type": "ListItem", position: 3, name: `${record.productName} Lot ${record.lot}`, item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-36 md:pt-40">
        <Link href="/coa" className="text-sm font-bold text-[var(--color-brand-primary)] hover:underline">← COA Library</Link>

        <div className="mt-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-7 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-500">
                <CheckCircle2 className="h-4 w-4" /> Verified public record
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Lot {record.lot}</p>
              <h1 className="mt-3 text-4xl font-display font-black tracking-tight md:text-6xl">{record.productName}</h1>
            </div>
            <FileCheck2 className="h-12 w-12 text-[var(--color-brand-primary)]" />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DataCell label="Lot" value={record.lot} />
            <DataCell label="Purity" value={record.purity || "See certificate"} />
            <DataCell label="Analysis date" value={record.analysisDate || "See certificate"} />
            <DataCell label="Status" value={record.status} />
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 p-6">
            <div className="mb-3 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h2 className="font-bold">Documented analytical methods</h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{record.methods.join(" · ")}</p>
            {record.laboratory && <p className="mt-3 text-sm text-[var(--text-muted)]">Laboratory: {record.laboratory}</p>}
            {record.notes && <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{record.notes}</p>}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {record.coaUrl && (
              <a href={record.coaUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[var(--text-main)] px-5 py-3 text-sm font-bold text-[var(--bg-page)]">
                View certificate
              </a>
            )}
            {record.productSlug && (
              <Link href={`/product/${record.productSlug}`} className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)]">
                View research product
              </Link>
            )}
            <Link href="/research/how-to-read-peptide-coa" className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold hover:border-[var(--color-brand-primary)]">
              COA interpretation guide
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <CoaLookup compact />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DataCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 p-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-mono text-sm font-bold">{value}</p>
    </div>
  );
}
