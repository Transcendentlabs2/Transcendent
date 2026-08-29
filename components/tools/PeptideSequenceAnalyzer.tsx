"use client";

import { useMemo, useState } from "react";
import { Calculator, Clipboard, RotateCcw } from "lucide-react";

const MONOISOTOPIC_RESIDUE_MASS: Record<string, number> = {
  A: 71.037114,
  R: 156.101111,
  N: 114.042927,
  D: 115.026943,
  C: 103.009185,
  E: 129.042593,
  Q: 128.058578,
  G: 57.021464,
  H: 137.058912,
  I: 113.084064,
  L: 113.084064,
  K: 128.094963,
  M: 131.040485,
  F: 147.068414,
  P: 97.052764,
  S: 87.032028,
  T: 101.047679,
  W: 186.079313,
  Y: 163.063329,
  V: 99.068414,
};

const WATER_MONOISOTOPIC_MASS = 18.010565;
const PROTON_MASS = 1.007276466621;
const VALID_CODES = Object.keys(MONOISOTOPIC_RESIDUE_MASS);

type CalculationResult =
  | {
      ok: false;
      invalid: string[];
    }
  | {
      ok: true;
      length: number;
      neutralMass: number;
      counts: Record<string, number>;
      mz: Array<{ charge: number; value: number }>;
    };

function normalizeSequence(value: string) {
  return value.toUpperCase().replace(/[^A-Z]/g, "");
}

function calculate(sequence: string): CalculationResult | null {
  if (!sequence) return null;

  const invalid = [...new Set(sequence.split("").filter((code) => !MONOISOTOPIC_RESIDUE_MASS[code]))];
  if (invalid.length > 0) {
    return { ok: false, invalid };
  }

  const neutralMass = sequence
    .split("")
    .reduce((total, code) => total + MONOISOTOPIC_RESIDUE_MASS[code], WATER_MONOISOTOPIC_MASS);

  const counts = VALID_CODES.reduce<Record<string, number>>((acc, code) => {
    acc[code] = 0;
    return acc;
  }, {});

  sequence.split("").forEach((code) => {
    counts[code] += 1;
  });

  const mz = [1, 2, 3, 4].map((charge) => ({
    charge,
    value: (neutralMass + charge * PROTON_MASS) / charge,
  }));

  return {
    ok: true,
    length: sequence.length,
    neutralMass,
    counts,
    mz,
  };
}

export default function PeptideSequenceAnalyzer() {
  const [rawSequence, setRawSequence] = useState("");
  const [copied, setCopied] = useState(false);

  const sequence = useMemo(() => normalizeSequence(rawSequence), [rawSequence]);
  const result = useMemo(() => calculate(sequence), [sequence]);

  const copySummary = async () => {
    if (!result || !result.ok) return;

    const text = [
      "Peptide Sequence Analysis",
      `Sequence: ${sequence}`,
      `Length: ${result.length} residues`,
      `Neutral monoisotopic mass: ${result.neutralMass.toFixed(4)} Da`,
      ...result.mz.map((item) => `[M+${item.charge}H]${item.charge === 1 ? "+" : `${item.charge}+`} m/z: ${item.value.toFixed(4)}`),
      "",
      "Assumptions: unmodified linear peptide, free N- and C-termini, no salts/adduct corrections beyond protonated m/z estimates.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setRawSequence("");
    setCopied(false);
  };

  const populatedCounts = result?.ok
    ? Object.entries(result.counts).filter(([, count]) => count > 0)
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <label htmlFor="peptide-sequence" className="text-sm font-bold text-[var(--text-main)]">
          Amino-acid sequence
        </label>
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
          Enter standard one-letter amino-acid codes. Spaces, line breaks, numbers and punctuation are ignored.
        </p>
        <textarea
          id="peptide-sequence"
          value={rawSequence}
          onChange={(event) => {
            setRawSequence(event.target.value);
            setCopied(false);
          }}
          placeholder="Example: GHK"
          rows={8}
          spellCheck={false}
          className="mt-4 w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 font-mono text-sm uppercase tracking-wider text-[var(--text-main)] outline-none transition-colors placeholder:text-[var(--text-muted)]/50 focus:border-[var(--color-brand-primary)]"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>{sequence.length} recognized characters</span>
          <span>Supported: {VALID_CODES.join(" ")}</span>
        </div>

        {result && !result.ok && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-500">
            Unsupported amino-acid code{result.invalid.length > 1 ? "s" : ""}: {result.invalid.join(", ")}. Use the 20 standard one-letter residue codes shown above.
          </div>
        )}

        {result?.ok && (
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Sequence composition</p>
              <h2 className="mt-2 font-display text-2xl font-bold">Residue counts</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {populatedCounts.map(([code, count]) => (
                <div key={code} className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
                  <div className="font-mono text-lg font-bold text-[var(--color-brand-primary)]">{code}</div>
                  <div className="mt-1 text-xs text-[var(--text-muted)]">{count} · {((count / result.length) * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-6 shadow-xl">
          <div className="flex items-center gap-2 text-[var(--color-brand-primary)]">
            <Calculator className="h-4 w-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]">Theoretical mass</span>
          </div>

          {result?.ok ? (
            <>
              <p className="mt-5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Neutral monoisotopic mass</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-4xl font-black tracking-tight">{result.neutralMass.toFixed(4)}</span>
                <span className="pb-1 text-sm text-[var(--text-muted)]">Da</span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">{result.length} amino-acid residues</p>

              <div className="mt-7 border-t border-[var(--glass-border)] pt-6">
                <h2 className="text-sm font-bold">Protonated theoretical m/z</h2>
                <div className="mt-4 space-y-3">
                  {result.mz.map((item) => (
                    <div key={item.charge} className="flex items-center justify-between rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3">
                      <span className="text-xs font-mono text-[var(--text-muted)]">z = +{item.charge}</span>
                      <span className="font-mono text-sm font-bold">{item.value.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" onClick={copySummary} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--text-main)] px-4 py-3 text-xs font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity">
                  <Clipboard className="h-4 w-4" /> {copied ? "Copied" : "Copy"}
                </button>
                <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] px-4 py-3 text-xs font-bold hover:border-[var(--color-brand-primary)] transition-colors">
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]">
              Enter a valid peptide sequence to calculate its theoretical neutral monoisotopic mass and common protonated m/z values.
            </div>
          )}

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-[var(--text-muted)]">
            <strong className="text-[var(--text-main)]">Calculation scope:</strong> assumes an unmodified linear peptide with free N- and C-termini. It does not account for terminal modifications, disulfides, isotope labels, cyclization, counterions, salts, adducts, or other chemical modifications.
          </div>
        </div>
      </aside>
    </div>
  );
}
