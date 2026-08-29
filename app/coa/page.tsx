import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2, FlaskConical, SearchCheck, ShieldCheck } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CoaLookup from "@/components/coa/CoaLookup";
import { getPublishedCoas } from "@/lib/coa";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = `Certificate of Analysis Library | Peptide COA | ${SITE_NAME}`;
const description =
  "Search Transcendent Labs lot-specific Certificates of Analysis for research compounds. Review published analytical methods, purity information and batch traceability when documentation is available.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/coa" },
  openGraph: {
    type: "website",
    url: "/coa",
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function CoaLibraryPage() {
  const records = getPublishedCoas();
  const pageUrl = `${SITE_URL}/coa`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Certificate of Analysis Library",
    description,
    url: pageUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: records.length,
      itemListElement: records.map((record, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${record.productName} COA ${record.lot}`,
        url: `${SITE_URL}/coa/${encodeURIComponent(record.lot)}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-primary)]">
            Lot-specific analytical documentation
          </p>
          <h1 className="mb-6 text-4xl font-display font-black tracking-tight md:text-6xl">
            Certificate of Analysis Library
          </h1>
          <p className="mb-8 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Search by lot number to locate published analytical documentation. A public COA is listed only when Transcendent Labs has lot-specific documentation available for that record.
          </p>
          <CoaLookup />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { icon: SearchCheck, title: "Lot traceability", text: "Search by the lot identifier printed on the research vial or associated documentation." },
            { icon: FlaskConical, title: "Method context", text: "Published records identify the analytical methods documented for that specific lot." },
            { icon: ShieldCheck, title: "Evidence-first", text: "No demo lots or invented analytical results are presented as verified certificates." },
          ].map(({ icon: Icon, title: cardTitle, text }) => (
            <div key={cardTitle} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
              <Icon className="mb-4 h-6 w-6 text-[var(--color-brand-primary)]" />
              <h2 className="mb-2 font-bold">{cardTitle}</h2>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">Published records</p>
              <h2 className="mt-2 text-2xl font-display font-bold">Verified COAs</h2>
            </div>
            <Link href="/research/how-to-read-peptide-coa" className="text-sm font-bold text-[var(--color-brand-primary)] hover:underline">
              How to read a peptide COA →
            </Link>
          </div>

          {records.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {records.map((record) => (
                <Link
                  key={record.lot}
                  href={`/coa/${encodeURIComponent(record.lot)}`}
                  className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 transition hover:border-[var(--color-brand-primary)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-[var(--text-muted)]">LOT {record.lot}</p>
                      <h3 className="mt-1 text-xl font-bold">{record.productName}</h3>
                    </div>
                    <FileCheck2 className="h-6 w-6 text-[var(--color-brand-primary)]" />
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    {record.purity ? `Reported purity: ${record.purity}. ` : ""}
                    Methods: {record.methods.join(", ")}.
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-center">
              <FileCheck2 className="mx-auto mb-4 h-8 w-8 text-[var(--text-muted)]" />
              <p className="font-bold">No public lot records are currently published.</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
                This library intentionally remains empty until real lot-specific analytical documentation is approved for public display.
              </p>
            </div>
          )}
        </section>
      </section>

      <Footer />
    </main>
  );
}
