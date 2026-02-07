"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ScanLine, Info, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // <--- IMPORTADO
import CatalogModal from "./CatalogModal";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string;
  slug: string; // <--- CORRECCIÓN: AGREGADO SLUG AL TIPO
  description?: string;
}

const CATEGORIES = ["All", "Research Peptides", "Nootropics", "Supplements", "SARMs"];

const CATEGORY_MAP: Record<string, string> = {
  "Research Peptides": "peptides",
  "Nootropics": "nootropics",
  "Supplements": "supplements",
  "SARMs": "sarms"
};

const LabContainer = ({ image, name }: { image: string, name: string }) => {
  return (
    <div className="relative w-48 h-64 mx-auto flex items-center justify-center transform-gpu">
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-[var(--text-muted)] stroke-[0.5] group-hover:stroke-[1] transition-all">
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" strokeOpacity="0.5" />
          <path d="M100 20 L100 0 M200 100 L180 100 M100 180 L100 200 M20 100 L0 100" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 w-32 h-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain drop-shadow-2xl filter contrast-110 saturate-100 transition-all duration-500"
        />
        <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent blur-md opacity-30 rounded-full scale-x-75" />
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
        <motion.div
          className="w-full h-[2px] bg-[var(--color-brand-primary)] shadow-[0_0_15px_var(--color-brand-primary)] opacity-0 group-hover:opacity-40"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default function ProductShowcase({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCatalogOpen, setCatalogOpen] = useState(false);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === CATEGORY_MAP[activeCategory]);

  const displayProducts = filteredProducts.slice(0, 4);

  return (
    <>
    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 bg-[var(--bg-page)] transition-colors duration-300" id="catalog">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-main)] mb-4">
            Active <span className="text-[var(--text-muted)]">Compounds</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-md text-lg font-sans">
            Research-grade peptides synthesized for maximum bioavailability.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase border transition-all ${
                activeCategory === cat
                  ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]" 
                  : "bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[var(--color-brand-primary)] hover:text-[var(--text-main)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="flex flex-wrap justify-center gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                // NOTA: Movimos las clases de layout internas al componente LINK
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] group relative rounded-[2.5rem] transition-all duration-300 
                           bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl shadow-sm
                           hover:border-[var(--color-brand-primary)]/50 hover:shadow-[0_0_30px_var(--accent-glow)]"
              >
                {/* ENLACE CLICABLE COMPLETO */}
                <Link 
                    href={`/product/${product.slug}`}
                    className="flex flex-col items-center text-center p-5 w-full h-full"
                >
                    {product.stock < 50 && (
                    <span className="absolute top-5 right-5 z-30 bg-[var(--text-main)] text-[var(--bg-page)] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        HIGH DEMAND
                    </span>
                    )}

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--accent-glow)] rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 w-full mb-2">
                        <LabContainer image={product.images} name={product.name} />
                    </div>

                    <div className="w-full px-1 relative z-10 mt-auto">
                        <div className="flex items-center justify-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                            <ScanLine className="w-3 h-3 text-[var(--color-brand-primary)]" />
                            <p className="text-[10px] uppercase tracking-widest font-mono text-[var(--text-muted)] truncate max-w-[100px]">
                                REF: {product.slug.slice(0,8)}
                            </p>
                        </div>
                        
                        <h3 className="text-xl font-bold font-display text-[var(--text-main)] mb-1 leading-tight">
                            {product.name}
                        </h3>
                        
                        <p className="text-xs text-[var(--text-muted)] font-mono mb-6 flex items-center justify-center gap-2">
                            <FlaskConical className="w-3 h-3" />
                            {product.purity || "Premium Grade"} 
                        </p>
                        
                        <div className="border-t border-[var(--glass-border)] pt-5 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold text-[var(--text-main)] font-mono">
                                    ${Number(product.price).toFixed(2)}
                                </span>
                                
                                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">In Stock</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center justify-center gap-1.5 border border-[var(--glass-border)] text-[var(--text-muted)] px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[var(--glass-border)] hover:text-[var(--text-main)] transition-colors">
                                    <Info className="w-3.5 h-3.5" /> Details
                                </div>
                                
                                <div className="flex items-center justify-center gap-1.5 bg-[var(--text-main)] text-[var(--bg-page)] px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-lg active:scale-95">
                                    Add <Plus className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
              </motion.div>
            ))
          ) : (
             <div className="w-full py-20 text-center text-[var(--text-muted)]">
                <p>No active compounds found in this category.</p>
             </div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 text-center">
         <button 
           onClick={() => setCatalogOpen(true)}
           className="flex items-center gap-2 mx-auto text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm font-mono uppercase tracking-widest group border-b border-transparent hover:border-[var(--text-main)] pb-1"
         >
           View Full Research Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

    </section>

    <AnimatePresence>
      {isCatalogOpen && (
        <CatalogModal products={products} onClose={() => setCatalogOpen(false)} />
      )}
    </AnimatePresence>
    </>
  );
}