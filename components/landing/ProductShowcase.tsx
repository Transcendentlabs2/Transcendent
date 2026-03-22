"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ScanLine, Info, FlaskConical, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CatalogModal from "./CatalogModal";
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

const LabContainer = ({ image, name }: { image: string, name: string }) => {
  return (
    <div className="relative w-48 h-64 mx-auto flex items-center justify-center transform-gpu">
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-[var(--text-muted)] stroke-[0.5] group-hover:stroke-[1] transition-all">
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" strokeOpacity="0.5" />
          <path d="M100 20 L100 0 M200 100 L180 100 M100 180 L100 200 M20 100 L0 100" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 w-32 h-40 transform-gpu"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain drop-shadow-2xl filter contrast-110 saturate-100"
          priority={true}
        />
        <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent blur-md opacity-30 rounded-full scale-x-75" />
      </motion.div>
    </div>
  );
};

export default function ProductShowcase({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const { addItem } = useCart();

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === CATEGORY_MAP[activeCategory]);

  const displayProducts = filteredProducts.slice(0, 4);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    setParticles((prev) => [...prev, newParticle]);
    setAddingId(product.id);
    addItem(product, 1);

    setTimeout(() => setAddingId(null), 1200);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 850);
  };

  return (
    <>
    {/* PARTICLES OVERLAY - OPTIMIZADO PARA MOBILE */}
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{ 
              x: typeof window !== 'undefined' ? window.innerWidth - 60 : 1000, 
              y: 60, 
              opacity: 0, 
              scale: 0.3,
              rotate: 360 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="absolute will-change-transform"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-brand-primary)] blur-xl w-12 h-12 -translate-x-1/2 -translate-y-1/2 opacity-40" />
              <FlaskConical className="w-6 h-6 text-[var(--color-brand-primary)] drop-shadow-[0_0_12px_var(--color-brand-primary)]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 bg-[var(--bg-page)]" id="catalog">
      
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
              className={`px-4 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 ${
                activeCategory === cat
                  ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]" 
                  : "bg-transparent text-[var(--text-muted)] border-[var(--glass-border)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="flex flex-wrap justify-center gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {displayProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={product.id}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] group relative rounded-[2.5rem] transition-all duration-300 
                         bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-70
                         hover:border-[var(--color-brand-primary)]/50 shadow-sm transform-gpu"
            >
              <Link href={`/product/${product.slug}`} className="flex flex-col items-center text-center p-5 w-full h-full">
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
                      <div className="flex items-center justify-center gap-2 mb-3 opacity-60">
                          <ScanLine className="w-3 h-3 text-[var(--color-brand-primary)]" />
                          <p className="text-[10px] uppercase tracking-widest font-mono text-[var(--text-muted)]">
                              REF: {product.slug.slice(0,8)}
                          </p>
                      </div>
                      
                      <h3 className="text-xl font-bold font-display text-[var(--text-main)] mb-1 leading-tight">{product.name}</h3>
                      <p className="text-xs text-[var(--text-muted)] font-mono mb-6 flex items-center justify-center gap-2">
                          <FlaskConical className="w-3 h-3" /> {product.purity || "Premium Grade"} 
                      </p>
                      
                      <div className="border-t border-[var(--glass-border)] pt-5 w-full">
                          <div className="flex justify-between items-center mb-4">
                              <span className="text-xl font-bold text-[var(--text-main)] font-mono">${Number(product.price).toFixed(2)}</span>
                              <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                  <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">In Stock</span>
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center justify-center gap-1.5 border border-[var(--glass-border)] text-[var(--text-muted)] px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider active:bg-[var(--glass-border)] transition-colors">
                                  <Info className="w-3.5 h-3.5" /> Details
                              </div>
                              
                              <motion.div 
                                  whileTap={{ scale: 0.92 }}
                                  onClick={(e) => handleAddToCart(e, product)}
                                  className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer touch-manipulation ${
                                      addingId === product.id 
                                      ? "bg-emerald-500 text-white" 
                                      : "bg-[var(--text-main)] text-[var(--bg-page)] active:bg-[var(--color-brand-primary)]"
                                  }`}
                              >
                                  <AnimatePresence mode="wait">
                                      {addingId === product.id ? (
                                          <motion.span key="ok" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-1">
                                              Added <Check className="w-3.5 h-3.5" />
                                          </motion.span>
                                      ) : (
                                          <motion.span key="add" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-1">
                                              Add <Plus className="w-3.5 h-3.5" />
                                          </motion.span>
                                      )}
                                  </AnimatePresence>
                              </motion.div>
                          </div>
                      </div>
                  </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 text-center">
         <button onClick={() => setCatalogOpen(true)} className="flex items-center gap-2 mx-auto text-[var(--text-muted)] active:text-[var(--text-main)] transition-colors text-sm font-mono uppercase tracking-widest group border-b border-[var(--glass-border)] pb-1">
           View Full Research Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

    </section>

    <AnimatePresence>
      {isCatalogOpen && <CatalogModal products={products} onClose={() => setCatalogOpen(false)} />}
    </AnimatePresence>
    </>
  );
}