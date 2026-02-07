"use client";

import { Star, BadgeCheck } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    user: "Dr. A. Miller",
    lab: "NeuroGen Labs",
    rating: 5,
    text: "HPLC analysis confirmed 99.8% purity. The lyophilization quality is superior to previous vendors. Will restock for Q3 protocols.",
    date: "2 days ago"
  },
  {
    id: 2,
    user: "Research Dept.",
    lab: "Univ. of Caldas",
    rating: 5,
    text: "Solubility in bacteriostatic water was instant. No cloudiness. Delivery to Manizales was surprisingly fast (24h).",
    date: "1 week ago"
  },
  {
    id: 3,
    user: "J. Bastidas",
    lab: "Private Practice",
    rating: 5,
    text: "Excellent packaging. Temperature indicators showed it stayed cool during transit. Crucial for peptide stability.",
    date: "2 weeks ago"
  },
];

export default function ProductReviews() {
  return (
    // CONTENEDOR DESLIZABLE HORIZONTAL
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
      
      {REVIEWS.map((review) => (
        <div 
          key={review.id}
          className="snap-center shrink-0 w-[85vw] md:w-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl flex flex-col gap-4 shadow-sm"
        >
          {/* Header Review */}
          <div className="flex justify-between items-start">
             <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-brand-primary)] to-cyan-600 flex items-center justify-center text-white font-bold text-xs">
                   {review.user.charAt(0)}
                </div>
                <div>
                   <p className="font-bold text-sm text-[var(--text-main)]">{review.user}</p>
                   <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{review.lab}</p>
                </div>
             </div>
             <div className="flex text-amber-400">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
             </div>
          </div>

          {/* Body */}
          <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
             "{review.text}"
          </p>

          {/* Badge */}
          <div className="mt-auto flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
             <BadgeCheck className="w-3.5 h-3.5" />
             <span>Verified Purchase</span>
          </div>
        </div>
      ))}
    </div>
  );
}