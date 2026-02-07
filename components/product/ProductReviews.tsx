"use client";

import { Star, CheckCircle2, User } from "lucide-react";

const REVIEWS = [
  {
    id: "REV-001",
    user: "Dr. A. Miller",
    role: "Senior Researcher",
    rating: 5,
    text: "HPLC analysis confirmed 99.8% purity. Lyophilization integrity exceeds standard market protocols.",
    status: "Verified Lab"
  },
  {
    id: "REV-002",
    user: "BioTech Dept",
    role: "Institutional Buyer",
    rating: 5,
    text: "Instant solubility in bacteriostatic media. Zero turbidity observed. Logistics efficiency: Optimal.",
    status: "Verified Lab"
  },
  {
    id: "REV-003",
    user: "J. Bastidas",
    role: "Clinical Specialist",
    rating: 5,
    text: "Cold-chain packaging maintained thermal stability throughout transit. Essential for peptide viability.",
    status: "Verified Lab"
  },
];

export default function ProductReviews() {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
      
      {REVIEWS.map((review) => (
        <div 
          key={review.id}
          className="snap-center shrink-0 w-[85vw] md:w-auto bg-[var(--bg-page)] border border-[var(--glass-border)] p-0 rounded-xl flex flex-col group hover:border-[var(--color-brand-primary)]/30 transition-colors"
        >
          {/* Header Técnico */}
          <div className="flex justify-between items-center p-4 border-b border-[var(--glass-border)] bg-[var(--glass-bg)]">
             <div className="flex items-center gap-2">
                <div className="p-1.5 border border-[var(--glass-border)] rounded-md">
                    <User className="w-3 h-3 text-[var(--text-muted)]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[var(--text-main)] uppercase">{review.user}</span>
                    <span className="text-[8px] font-mono text-[var(--text-muted)]">{review.id}</span>
                </div>
             </div>
             <div className="flex gap-[1px]">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 ${i < review.rating ? "bg-[var(--color-brand-primary)]" : "bg-[var(--glass-border)]"}`} />
                ))}
             </div>
          </div>

          {/* Body Texto Maquina de Escribir */}
          <div className="p-4 flex-1">
             <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed opacity-80">
                &quot;{review.text}&quot;
             </p>
          </div>

          {/* Footer Status */}
          <div className="p-3 border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/50 flex justify-between items-center">
             <span className="text-[8px] uppercase tracking-widest text-[var(--text-muted)]">{review.role}</span>
             <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                <span>{review.status}</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}