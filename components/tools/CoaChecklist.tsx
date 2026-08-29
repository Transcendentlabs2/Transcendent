"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, RotateCcw } from "lucide-react";

const CHECKS = [
  {
    id: "compound",
    label: "Compound or product name is clearly identified",
    detail: "The certificate names the material being analyzed rather than using only a generic sample label.",
  },
  {
    id: "lot",
    label: "Lot or batch number is present",
    detail: "The identifier should be capable of matching the certificate to the physical research material.",
  },
  {
    id: "sample",
    label: "Analytical sample identifier is traceable to the lot",
    detail: "The chromatogram or spectrum should not display an unrelated sample name or ambiguous identifier.",
  },
  {
    id: "date",
    label: "Analysis date or certificate issue date is visible",
    detail: "A dated record is easier to trace and distinguish from reusable or generic documentation.",
  },
  {
    id: "laboratory",
    label: "Testing organization or laboratory is identified",
    detail: "The record discloses who performed or issued the analytical work when that information is available.",
  },
  {
    id: "hplc-trace",
    label: "HPLC chromatogram or equivalent separation trace is included",
    detail: "A headline purity percentage is more useful when the underlying chromatographic evidence can be reviewed.",
  },
  {
    id: "hplc-table",
    label: "Peak table, integration data, or purity calculation context is visible",
    detail: "The reported chromatographic result should be consistent with the displayed integration data.",
  },
  {
    id: "method",
    label: "Analytical method or instrument context is stated",
    detail: "Method identifiers, instrument context, or relevant conditions make the result easier to interpret and reproduce.",
  },
  {
    id: "identity",
    label: "Molecular identity evidence is included when relevant",
    detail: "For peptide identity, mass-spectrometric or other appropriate identity evidence can complement chromatographic data.",
  },
  {
    id: "consistency",
    label: "Product, lot, dates, results, and attachments are internally consistent",
    detail: "The evidence chain should refer to the same material without conflicting identifiers or unexplained mismatches.",
  },
] as const;

function interpretation(score: number) {
  if (score >= 9) {
    return {
      label: "High documentation completeness",
      text: "Most core traceability and analytical-context fields are present. This does not prove authenticity, method suitability, or material quality; review the underlying evidence critically.",
    };
  }

  if (score >= 6) {
    return {
      label: "Moderate documentation completeness",
      text: "Several useful fields are present, but important context may still be missing. Review the unchecked items before relying on the certificate as a complete lot record.",
    };
  }

  return {
    label: "Limited documentation completeness",
    text: "Multiple core identifiers or evidence fields are absent. Consider requesting clearer lot-specific documentation before treating the certificate as a complete analytical record.",
  };
}

export default function CoaChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const score = useMemo(
    () => CHECKS.reduce((total, item) => total + (checked[item.id] ? 1 : 0), 0),
    [checked]
  );
  const result = interpretation(score);
  const progress = (score / CHECKS.length) * 100;

  const toggle = (id: string) => {
    setChecked((current) => ({ ...current, [id]: !current[id] }));
    setCopied(false);
  };

  const reset = () => {
    setChecked({});
    setCopied(false);
  };

  const copySummary = async () => {
    const present = CHECKS.filter((item) => checked[item.id]).map((item) => `✓ ${item.label}`);
    const missing = CHECKS.filter((item) => !checked[item.id]).map((item) => `○ ${item.label}`);
    const text = [
      "Peptide COA Documentation Review",
      `Completeness: ${score}/${CHECKS.length} — ${result.label}`,
      "",
      "Present:",
      ...(present.length ? present : ["None selected"]),
      "",
      "Not confirmed:",
      ...(missing.length ? missing : ["None"]),
      "",
      "This checklist reviews documentation completeness only. It does not verify authenticity, purity, method suitability, or product quality.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {CHECKS.map((item, index) => {
          const selected = Boolean(checked[item.id]);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={selected}
              className={`w-full rounded-2xl border p-5 text-left transition-all ${
                selected
                  ? "border-[var(--color-brand-primary)]/60 bg-[var(--color-brand-primary)]/5"
                  : "border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--color-brand-primary)]/35"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold ${
                    selected
                      ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white"
                      : "border-[var(--glass-border)] text-[var(--text-muted)]"
                  }`}
                >
                  {selected ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-snug text-[var(--text-main)]">{item.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-6 shadow-xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Documentation completeness</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-display text-5xl font-black tracking-tight">{score}</span>
            <span className="pb-1 text-sm font-mono text-[var(--text-muted)]">/ {CHECKS.length}</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--glass-border)]">
            <div
              className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="mt-6 font-display text-xl font-bold">{result.label}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{result.text}</p>

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-[var(--text-muted)]">
            <strong className="text-[var(--text-main)]">Important:</strong> this tool evaluates whether documentation fields are present. It does not authenticate a certificate, validate a laboratory, confirm the reported purity, or determine suitability for any experiment or human use.
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <button
              type="button"
              onClick={copySummary}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--text-main)] px-4 py-3 text-xs font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity"
            >
              <Clipboard className="h-4 w-4" /> {copied ? "Copied" : "Copy Summary"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] px-4 py-3 text-xs font-bold hover:border-[var(--color-brand-primary)] transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
