"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Search, FlaskConical, Atom, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    images: string;
    purity?: string;
    description?: string;
}

const CATEGORIES = ["All", "Research Peptides", "Nootropics", "Supplements", "SARMs"];

const CATEGORY_MAP: Record<string, string> = {
  "Research Peptides": "peptides",
  "Nootropics": "nootropics",
  "Supplements": "supplements",
  "SARMs": "sarms"
};

export default function CatalogModal({ products, onClose }: { products: Product[], onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
      const dbValue = CATEGORY_MAP[selectedCategory];
      result = result.filter(p => p.category === dbValue);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(result);
  }, [searchTerm, selectedCategory, products]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // SAFARI FIX 1: h-[100dvh] evita que la barra de direcciones tape el contenido
      // SAFARI FIX 2: transform-gpu acelera el renderizado del blur
      className="fixed inset-0 z-[9999] bg-[var(--bg-page)]/95 backdrop-blur-3xl overflow-hidden flex flex-col h-[100dvh] w-screen transform-gpu"
    >
        {/* Background FX (Con will-change para avisar al navegador) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-brand-primary)]/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Header (Sticky para que no se pierda al hacer scroll) */}
        <div className="relative z-10 flex items-center justify-between p-5 md:p-10 border-b border-[var(--glass-border)] shrink-0 bg-[var(--bg-page)]/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center shrink-0 shadow-lg">
                    <FlaskConical className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-[var(--text-main)] leading-tight">Full Catalog</h2>
                    <p className="text-[10px] md:text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                        {filtered.length} Compounds
                    </p>
                </div>
            </div>
            
            <button 
                onClick={onClose}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-all active:scale-90"
            >
                <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
        </div>

        {/* Controls */}
        <div className="relative z-10 px-5 md:px-10 py-6 grid gap-4 md:gap-6 md:grid-cols-[1fr_auto] shrink-0">
            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--color-brand-primary)] transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search compound..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // SAFARI FIX 3: text-[16px] evita que el iPhone haga zoom in al escribir
                    className="w-full bg-[var(--glass-border)]/30 border border-[var(--glass-border)] rounded-2xl py-3.5 pl-12 pr-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-all text-[16px] md:text-sm"
                />
            </div>

            {/* Chips (Scroll horizontal suave) */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border shrink-0 ${
                            selectedCategory === cat 
                            ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)] shadow-lg scale-105" 
                            : "bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[var(--text-main)]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Scrollable Grid */}
        {/* SAFARI FIX 4: overscroll-contain evita que 'rebote' la página de atrás */}
        <div className="flex-1 overflow-y-auto px-5 md:px-10 pb-32 md:pb-20 relative z-10 custom-scrollbar overscroll-contain">
            <motion.div 
                layout 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {filtered.map((product) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={product.id}
                        className="group relative bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-4 flex gap-4 hover:bg-[var(--glass-border)]/50 transition-colors cursor-pointer active:scale-[0.98]"
                    >
                        {/* Mini Imagen */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 bg-[var(--bg-page)]/50 rounded-xl border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
                            <Image 
                                src={product.images} 
                                alt={product.name} 
                                fill 
                                sizes="(max-width: 768px) 100px, 200px"
                                className="object-contain p-1.5 group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-1 justify-center min-w-0">
                             <div className="flex justify-between items-start">
                                 <h4 className="font-bold text-[var(--text-main)] truncate text-sm md:text-base pr-2">{product.name}</h4>
                                 <ArrowRight className="w-4 h-4 text-[var(--text-muted)] -rotate-45 group-hover:rotate-0 group-hover:text-[var(--color-brand-primary)] transition-all shrink-0" />
                             </div>
                             
                             <p className="text-[9px] text-[var(--text-muted)] font-mono uppercase tracking-widest mb-1 truncate">
                                {product.category}
                             </p>
                             
                             <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[var(--glass-border)] text-[var(--text-muted)] text-[9px] px-1.5 py-0.5 rounded-md font-bold truncate max-w-[120px]">
                                    {product.purity || "99% Purity"}
                                </span>
                             </div>

                             <div className="mt-auto flex justify-between items-end">
                                 <span className="text-base md:text-lg font-bold text-[var(--color-brand-primary)] font-mono">
                                     ${Number(product.price).toFixed(2)}
                                 </span>
                                 <div className="flex items-center gap-1">
                                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                                    <span className="text-[9px] text-[var(--text-muted)]">
                                        {product.stock > 0 ? "In Stock" : "Sold Out"}
                                    </span>
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-[var(--text-muted)]">
                    <Atom className="w-10 h-10 mb-4 opacity-20 animate-spin-slow" />
                    <p className="text-sm">No compounds found.</p>
                    <button 
                        onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
                        className="mt-4 text-[var(--color-brand-primary)] text-sm hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    </motion.div>
  );
}