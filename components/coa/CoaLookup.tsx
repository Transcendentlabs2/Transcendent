"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine } from "lucide-react";

export default function CoaLookup({ compact = false }: { compact?: boolean }) {
  const [lot, setLot] = useState("");
  const router = useRouter();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = lot.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
    if (!normalized) return;
    router.push(`/coa/${encodeURIComponent(normalized)}`);
  };

  return (
    <form onSubmit={submit} className={`mx-auto w-full ${compact ? "max-w-md" : "max-w-2xl"}`}>
      <label htmlFor="coa-lot" className="sr-only">Lot number</label>
      <div className="relative flex items-center">
        <ScanLine className="pointer-events-none absolute left-4 z-10 h-5 w-5 text-[var(--text-muted)]" />
        <input
          id="coa-lot"
          value={lot}
          onChange={(event) => setLot(event.target.value.slice(0, 32).toUpperCase())}
          placeholder="ENTER LOT NUMBER"
          autoComplete="off"
          className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] py-4 pl-12 pr-14 font-mono text-sm font-bold uppercase text-[var(--text-main)] outline-none transition focus:border-[var(--color-brand-primary)]"
        />
        <button
          type="submit"
          aria-label="Search certificate of analysis"
          className="absolute right-2 rounded-xl bg-[var(--text-main)] p-2.5 text-[var(--bg-page)] transition hover:bg-[var(--color-brand-primary)] hover:text-white"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
