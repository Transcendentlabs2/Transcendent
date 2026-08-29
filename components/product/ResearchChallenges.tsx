"use client";
import { AlertOctagon, CheckCircle2, SearchCheck } from "lucide-react";

export default function ResearchChallenges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <AlertOctagon className="w-12 h-12 text-amber-500" />
        </div>
        <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <SearchCheck className="w-4 h-4" /> What to Verify
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
            <span className="text-amber-500 font-mono">01.</span>
            <span>A purity number should be interpreted with its analytical method and the specific material or lot it describes.</span>
          </li>
          <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
            <span className="text-amber-500 font-mono">02.</span>
            <span>Chromatographic composition and molecular identity are related analytical questions, but they are not interchangeable.</span>
          </li>
          <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
            <span className="text-amber-500 font-mono">03.</span>
            <span>Storage and handling requirements can vary by compound and batch, so applicable documentation should take precedence over general guidance.</span>
          </li>
        </ul>
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Evidence Path
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
            <span className="text-emerald-500 font-mono">01.</span>
            <span className="text-[var(--text-main)]">Product-level purity is displayed only when a documented catalog value exists.</span>
          </li>
          <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
            <span className="text-emerald-500 font-mono">02.</span>
            <span className="text-[var(--text-main)]">Lot pages are published as verified only when backed by approved lot-specific analytical documentation.</span>
          </li>
          <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
            <span className="text-emerald-500 font-mono">03.</span>
            <span className="text-[var(--text-main)]">Research guides explain HPLC, mass spectrometry, COA interpretation, stability, and traceability without substituting for batch evidence.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}