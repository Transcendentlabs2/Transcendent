import Link from "next/link";
import { FileCheck2, Microscope, ShieldCheck } from "lucide-react";
import CoaLookup from "@/components/coa/CoaLookup";

export default function BatchVerifier() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--glass-border)] bg-[var(--bg-page)] px-4 py-24 transition-colors duration-500">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[var(--color-brand-primary)]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[var(--color-brand-secondary)]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-primary)]/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
            <Microscope className="h-3.5 w-3.5" />
            <span>Certificate of Analysis Database</span>
          </div>

          <h2 className="mb-4 text-3xl font-display font-bold text-[var(--text-main)] md:text-5xl">
            Verify Your <span className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] bg-clip-text text-transparent">Research Lot</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            Enter the lot identifier from your vial or documentation to search the public COA library. Only lot-specific records backed by approved analytical documentation are published as verified.
          </p>
        </div>

        <CoaLookup compact />

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
            <div className="mb-2 flex items-center gap-2 font-bold">
              <ShieldCheck className="h-5 w-5 text-[var(--color-brand-primary)]" /> Evidence-first
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">Demo lots and placeholder analytical values are not presented as verified results.</p>
          </div>
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5">
            <div className="mb-2 flex items-center gap-2 font-bold">
              <FileCheck2 className="h-5 w-5 text-[var(--color-brand-primary)]" /> Public traceability
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">Published lot pages connect analytical context, product information and the COA interpretation guide.</p>
          </div>
        </div>

        <Link href="/coa" className="mt-7 inline-block text-sm font-bold text-[var(--color-brand-primary)] hover:underline">
          Browse the Certificate of Analysis Library →
        </Link>
      </div>
    </section>
  );
}
