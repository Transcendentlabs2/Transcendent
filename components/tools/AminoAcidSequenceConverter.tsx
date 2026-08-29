"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Clipboard, RotateCcw } from "lucide-react";

const AMINO_ACIDS = [
  { one: "A", three: "Ala", name: "Alanine" },
  { one: "R", three: "Arg", name: "Arginine" },
  { one: "N", three: "Asn", name: "Asparagine" },
  { one: "D", three: "Asp", name: "Aspartic acid" },
  { one: "C", three: "Cys", name: "Cysteine" },
  { one: "E", three: "Glu", name: "Glutamic acid" },
  { one: "Q", three: "Gln", name: "Glutamine" },
  { one: "G", three: "Gly", name: "Glycine" },
  { one: "H", three: "His", name: "Histidine" },
  { one: "I", three: "Ile", name: "Isoleucine" },
  { one: "L", three: "Leu", name: "Leucine" },
  { one: "K", three: "Lys", name: "Lysine" },
  { one: "M", three: "Met", name: "Methionine" },
  { one: "F", three: "Phe", name: "Phenylalanine" },
  { one: "P", three: "Pro", name: "Proline" },
  { one: "S", three: "Ser", name: "Serine" },
  { one: "T", three: "Thr", name: "Threonine" },
  { one: "W", three: "Trp", name: "Tryptophan" },
  { one: "Y", three: "Tyr", name: "Tyrosine" },
  { one: "V", three: "Val", name: "Valine" },
] as const;

const BY_ONE = Object.fromEntries(AMINO_ACIDS.map((aa) => [aa.one, aa]));
const BY_THREE = Object.fromEntries(AMINO_ACIDS.map((aa) => [aa.three.toUpperCase(), aa]));

type Mode = "one-to-three" | "three-to-one";

function convertOneLetter(raw: string) {
  const sequence = raw.toUpperCase().replace(/[^A-Z]/g, "");
  if (!sequence) return { sequence: "", output: "", names: [], invalid: [] as string[] };

  const invalid = [...new Set(sequence.split("").filter((code) => !BY_ONE[code]))];
  if (invalid.length) return { sequence, output: "", names: [], invalid };

  const residues = sequence.split("").map((code) => BY_ONE[code]);
  return {
    sequence,
    output: residues.map((aa) => aa.three).join("-"),
    names: residues.map((aa) => aa.name),
    invalid: [] as string[],
  };
}

function tokenizeThreeLetter(raw: string) {
  return raw
    .trim()
    .split(/[\s,;\-]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function convertThreeLetter(raw: string) {
  const tokens = tokenizeThreeLetter(raw);
  if (!tokens.length) return { sequence: "", output: "", names: [], invalid: [] as string[] };

  const invalid = [...new Set(tokens.filter((token) => !BY_THREE[token.toUpperCase()]))];
  if (invalid.length) return { sequence: tokens.join("-"), output: "", names: [], invalid };

  const residues = tokens.map((token) => BY_THREE[token.toUpperCase()]);
  return {
    sequence: tokens.join("-"),
    output: residues.map((aa) => aa.one).join(""),
    names: residues.map((aa) => aa.name),
    invalid: [] as string[],
  };
}

export default function AminoAcidSequenceConverter() {
  const [mode, setMode] = useState<Mode>("one-to-three");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (mode === "one-to-three" ? convertOneLetter(input) : convertThreeLetter(input)),
    [input, mode],
  );

  const valid = result.output.length > 0 && result.invalid.length === 0;

  const switchMode = () => {
    if (valid) {
      setInput(result.output);
    } else {
      setInput("");
    }
    setMode((current) => (current === "one-to-three" ? "three-to-one" : "one-to-three"));
    setCopied(false);
  };

  const copyOutput = async () => {
    if (!valid) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setInput("");
    setCopied(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[var(--text-main)]">
              {mode === "one-to-three" ? "One-letter peptide sequence" : "Three-letter peptide sequence"}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
              {mode === "one-to-three"
                ? "Enter standard one-letter amino-acid codes. Spaces, numbers, and punctuation are ignored."
                : "Enter standard three-letter codes separated by spaces, commas, semicolons, or hyphens."}
            </p>
          </div>
          <button
            type="button"
            onClick={switchMode}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-4 py-2.5 text-xs font-bold hover:border-[var(--color-brand-primary)] transition-colors"
          >
            <ArrowLeftRight className="h-4 w-4" /> Switch direction
          </button>
        </div>

        <textarea
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setCopied(false);
          }}
          placeholder={mode === "one-to-three" ? "Example: GHK" : "Example: Gly-His-Lys"}
          rows={8}
          spellCheck={false}
          className="mt-5 w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 font-mono text-sm tracking-wider text-[var(--text-main)] outline-none transition-colors placeholder:text-[var(--text-muted)]/50 focus:border-[var(--color-brand-primary)]"
        />

        {result.invalid.length > 0 && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-500">
            Unsupported code{result.invalid.length > 1 ? "s" : ""}: {result.invalid.join(", ")}. This tool accepts the 20 standard amino acids only.
          </div>
        )}

        {valid && (
          <section className="mt-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">Residue names</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Sequence annotation</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {result.names.map((name, index) => (
                <div key={`${name}-${index}`} className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
                  <span className="text-[10px] font-mono text-[var(--color-brand-primary)]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-sm font-bold">{name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)] p-6 shadow-xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Converted sequence</p>
          {valid ? (
            <>
              <div className="mt-5 break-words rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 font-mono text-sm leading-relaxed">
                {result.output}
              </div>
              <p className="mt-3 text-xs text-[var(--text-muted)]">{result.names.length} standard amino-acid residues</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" onClick={copyOutput} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--text-main)] px-4 py-3 text-xs font-bold text-[var(--bg-page)] hover:opacity-90 transition-opacity">
                  <Clipboard className="h-4 w-4" /> {copied ? "Copied" : "Copy"}
                </button>
                <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] px-4 py-3 text-xs font-bold hover:border-[var(--color-brand-primary)] transition-colors">
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>
            </>
          ) : (
            <div className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 text-sm leading-relaxed text-[var(--text-muted)]">
              Enter a valid standard amino-acid sequence to convert between one-letter and three-letter notation.
            </div>
          )}
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-[var(--text-muted)]">
            <strong className="text-[var(--text-main)]">Scope:</strong> notation conversion only. Ambiguous codes, non-standard residues, terminal modifications, isotope labels, and other chemical modifications are not interpreted.
          </div>
        </div>
      </aside>
    </div>
  );
}
