"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FlaskConical, Atom, ArrowRight, Plus, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    images: string;
    purity?: string;
    slug: string;
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
  const [addingId, setAddingId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const { addItem } = useCart();

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === CATEGORY_MAP[selectedCategory]);
    }
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(result);
  }, [searchTerm, selectedCategory, products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle = { id: Date.now(), x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    setParticles((prev) => [...prev, newParticle]);
    setAddingId(product.id);
    addItem(product, 1);

    setTimeout(() => setAddingId(null), 1200);
    setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== newParticle.id)), 850);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[var(--bg-page)]/95 backdrop-blur-3xl overflow-hidden flex flex-col h-[100dvh] w-screen transform-gpu"
    >
        {/* ENERGÍA VOLADORA (PARTÍCULAS) */}
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
                animate={{ x: typeof window !== 'undefined' ? window.innerWidth - 60 : 1000, y: 60, opacity: 0, scale: 0.3, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="absolute will-change-transform"
              >
                <FlaskConical className="w-6 h-6 text-[var(--color-brand-primary)] drop-shadow-[0_0_12px_var(--color-brand-primary)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-brand-primary)]/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-5 md:p-10 border-b border-[var(--glass-border)] shrink-0 bg-[var(--bg-page)]/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center shadow-lg"><FlaskConical className="w-5 h-5" /></div>
                <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-[var(--text-main)]">Full Catalog</h2>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{filtered.length} Compounds</p>
                </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-all"><X className="w-5 h-5" /></button>
        </div>

        {/* Controls */}
        <div className="relative z-10 px-5 md:px-10 py-6 grid gap-4 md:grid-cols-[1fr_auto] shrink-0">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input type="text" placeholder="Search compound..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[var(--glass-border)]/30 border border-[var(--glass-border)] rounded-2xl py-3.5 pl-12 pr-4 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] outline-none transition-all" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-all border shrink-0 ${selectedCategory === cat ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)] shadow-lg scale-105" : "text-[var(--text-muted)] border-[var(--glass-border)]"}`}>
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-5 md:px-10 pb-20 relative z-10 custom-scrollbar overscroll-contain">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => (
                    <motion.div layout key={product.id} className="group relative bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl transition-all hover:border-[var(--color-brand-primary)]/30 active:scale-[0.98]">
                        <Link href={`/product/${product.slug}`} className="flex gap-4 p-4 w-full h-full">
                            <div className="relative w-20 h-20 shrink-0 bg-[var(--bg-page)]/50 rounded-xl border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
                                <Image src={product.images} alt={product.name} fill sizes="100px" className="object-contain p-1.5 group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="flex flex-col flex-1 justify-center min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-[var(--text-main)] truncate text-sm pr-2">{product.name}</h4>
                                    <div className="flex items-center gap-1">
                                        <div className={`w-1 h-1 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
                                    </div>
                                </div>
                                <p className="text-[9px] text-[var(--text-muted)] font-mono uppercase tracking-widest mb-2 truncate">{product.category}</p>
                                
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-sm font-bold text-[var(--color-brand-primary)] font-mono">${Number(product.price).toFixed(2)}</span>
                                    
                                    {/* BOTÓN ADD TO CART INTERNO */}
                                    <button 
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                            addingId === product.id ? "bg-emerald-500 text-white" : "bg-[var(--text-main)] text-[var(--bg-page)] hover:bg-[var(--color-brand-primary)] hover:text-white"
                                        }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {addingId === product.id ? (
                                                <motion.div key="ok" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}><Check className="w-4 h-4" /></motion.div>
                                            ) : (
                                                <motion.div key="add" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}><Plus className="w-4 h-4" /></motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-[var(--text-muted)]">
                    <Atom className="w-10 h-10 mb-4 opacity-20 animate-spin-slow" />
                    <p className="text-sm">No compounds found.</p>
                </div>
            )}
        </div>
    </motion.div>
  );
}