"use client";

import { CheckCircle2, User, Quote, Activity } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    id: "REV-001",
    user: "Dr. A. Miller",
    role: "Senior Researcher",
    rating: 5,
    text: "HPLC analysis confirmed 99.8% purity. Lyophilization integrity exceeds standard market protocols.",
    status: "Verified Lab",
    date: "2025.10.12"
  },
  {
    id: "REV-002",
    user: "BioTech Dept",
    role: "Institutional Buyer",
    rating: 5,
    text: "Instant solubility in bacteriostatic media. Zero turbidity observed. Logistics efficiency: Optimal.",
    status: "Verified Lab",
    date: "2025.11.05"
  },
  {
    id: "REV-003",
    user: "J. Bastidas",
    role: "Clinical Specialist",
    rating: 5,
    text: "Cold-chain packaging maintained thermal stability throughout transit. Essential for peptide viability.",
    status: "Verified Lab",
    date: "2025.12.20"
  },
];

export default function ProductReviews() {
  return (
    <div className="relative w-full">
      
      {/* Scroll Container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
        
        {REVIEWS.map((review, i) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center shrink-0 w-[85vw] md:w-auto relative group"
          >
            {/* --- CARD CONTAINER --- */}
            <div className="h-full bg-[var(--bg-page)]/50 backdrop-blur-md border border-[var(--glass-border)] rounded-xl flex flex-col overflow-hidden transition-all duration-300 group-hover:border-[var(--color-brand-primary)]/40 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]">
              
              {/* Background Noise/Scanline Effect */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              
              {/* --- HEADER TÉCNICO --- */}
              <div className="flex justify-between items-start p-5 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] relative">
                 {/* Decorative Corner */}
                 <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--text-muted)] opacity-20" />
                 
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--glass-border)] flex items-center justify-center border border-[var(--glass-border)] group-hover:bg-[var(--color-brand-primary)]/10 transition-colors">
                        <User className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--color-brand-primary)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[var(--text-main)] uppercase tracking-wider">{review.user}</span>
                        <span className="text-[8px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                           {review.id} <span className="w-1 h-1 rounded-full bg-[var(--glass-border)]" /> {review.date}
                        </span>
                    </div>
                 </div>

                 {/* Barcode Rating System */}
                 <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-[2px]">
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1.5 h-4 rounded-[1px] transition-all duration-500 ${
                                    i < review.rating 
                                    ? "bg-[var(--color-brand-primary)] shadow-[0_0_8px_currentColor]" 
                                    : "bg-[var(--glass-border)] opacity-30"
                                }`} 
                            />
                        ))}
                    </div>
                    <span className="text-[8px] uppercase font-mono text-[var(--text-muted)] tracking-tighter">Rating: {review.rating}.0</span>
                 </div>
              </div>

              {/* --- BODY TEXT --- */}
              <div className="p-6 flex-1 relative">
                 <Quote className="absolute top-4 left-4 w-6 h-6 text-[var(--glass-border)] opacity-50 rotate-180" />
                 <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed pl-4 border-l-2 border-[var(--glass-border)] group-hover:border-[var(--color-brand-primary)] transition-colors">
                    {review.text}
                 </p>
              </div>

              {/* --- FOOTER STATUS --- */}
              <div className="p-3 border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/30 flex justify-between items-center mt-auto">
                 <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-[var(--text-muted)] opacity-50" />
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold">{review.role}</span>
                 </div>
                 
                 <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider shadow-emerald-500/50 drop-shadow-sm">{review.status}</span>
                 </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}