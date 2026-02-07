"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Search, Filter, FlaskConical, Atom, ArrowRight } from "lucide-react";
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

export default function CatalogModal({ products, onClose }: { products: Product[], onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtered, setFiltered] = useState(products);

  // Lógica de filtrado en tiempo real
  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
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
      className="fixed inset-0 z-[9999] bg-[var(--bg-page)]/95 backdrop-blur-3xl overflow-hidden flex flex-col"
    >
        {/* --- BACKGROUND FX --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-brand-primary)]/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* --- HEADER --- */}
        <div className="relative z-10 flex items-center justify-between p-6 md:p-10 border-b border-[var(--glass-border)]">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center">
                    <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-[var(--text-main)]">Full Research Catalog</h2>
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                        {filtered.length} Compounds Available
                    </p>
                </div>
            </div>
            
            <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-all transform hover:rotate-90 duration-300"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* --- CONTROLS (Search & Filter) --- */}
        <div className="relative z-10 px-6 md:px-10 py-8 grid gap-6 md:grid-cols-[1fr_auto]">
            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--color-brand-primary)] transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by compound name, category or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[var(--glass-border)]/30 border border-[var(--glass-border)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-all"
                />
            </div>

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                            selectedCategory === cat 
                            ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)] shadow-lg" 
                            : "bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[var(--text-main)]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* --- GRID SCROLLABLE --- */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-20 relative z-10 custom-scrollbar">
            <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {filtered.map((product) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={product.id}
                        className="group relative bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-4 flex gap-4 hover:bg-[var(--glass-border)]/50 transition-colors cursor-pointer"
                    >
                        {/* Mini Imagen */}
                        <div className="relative w-24 h-24 shrink-0 bg-[var(--bg-page)] rounded-xl border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
                            <Image 
                                src={product.images} 
                                alt={product.name} 
                                fill 
                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-1 justify-center">
                             <div className="flex justify-between items-start">
                                 <h4 className="font-bold text-[var(--text-main)] line-clamp-1">{product.name}</h4>
                                 <ArrowRight className="w-4 h-4 text-[var(--text-muted)] -rotate-45 group-hover:rotate-0 group-hover:text-[var(--color-brand-primary)] transition-all" />
                             </div>
                             
                             <p className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest mb-1">
                                {product.category}
                             </p>
                             
                             <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[var(--glass-border)] text-[var(--text-muted)] text-[9px] px-2 py-0.5 rounded-md font-bold">
                                    {product.purity || "99% Purity"}
                                </span>
                             </div>

                             <div className="mt-auto flex justify-between items-end">
                                 <span className="text-lg font-bold text-[var(--color-brand-primary)] font-mono">
                                     ${Number(product.price).toFixed(2)}
                                 </span>
                                 <span className="text-[10px] text-[var(--text-muted)]">
                                     {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                 </span>
                             </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-[var(--text-muted)]">
                    <Atom className="w-12 h-12 mb-4 opacity-20 animate-spin-slow" />
                    <p className="text-lg">No compounds match your criteria.</p>
                    <button 
                        onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
                        className="mt-4 text-[var(--color-brand-primary)] hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    </motion.div>
  );
}