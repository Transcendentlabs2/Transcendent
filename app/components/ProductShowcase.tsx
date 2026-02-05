"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight, Filter } from "lucide-react";

// Datos de Ejemplo (Simulando una API)
const PRODUCTS = [
  {
    id: 1,
    name: "BPC-157",
    category: "Healing",
    formula: "C62H98N16O22",
    mass: "1419.5 Da",
    purity: "99.8%",
    price: 55.00,
    tag: "BEST SELLER"
  },
  {
    id: 2,
    name: "TB-500",
    category: "Healing",
    formula: "C212H350N56O78S",
    mass: "4963.5 Da",
    purity: "99.9%",
    price: 65.00,
    tag: "HIGH DEMAND"
  },
  {
    id: 3,
    name: "SEMAGLUTIDE",
    category: "Metabolic",
    formula: "C187H291N45O59",
    mass: "4113.6 Da",
    purity: "99.5%",
    price: 120.00,
    tag: null
  },
  {
    id: 4,
    name: "IPAMORELIN",
    category: "Growth",
    formula: "C38H49N9O5",
    mass: "711.85 Da",
    purity: "99.9%",
    price: 45.00,
    tag: "STACKABLE"
  },
];

const CATEGORIES = ["All", "Healing", "Metabolic", "Growth"];

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10" id="catalog">
      
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-main)] mb-4">
            Active <span className="text-[var(--text-muted)]">Compounds</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-md text-lg">
            Research-grade peptides synthesized for maximum bioavailability.
          </p>
        </div>

        {/* Filter Tabs */}
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

      {/* Grid de Productos */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              className="group relative bg-[var(--bg-page)]/40 backdrop-blur-md border border-[var(--glass-border)] rounded-2xl overflow-hidden hover:border-[var(--color-brand-primary)]/50 transition-colors duration-300 flex flex-col"
            >
              {/* Card Header (Tag & Icon) */}
              <div className="p-6 flex justify-between items-start z-10">
                 {product.tag ? (
                   <span className="bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] text-[10px] font-bold px-2 py-1 rounded border border-[var(--color-brand-primary)]/20 uppercase tracking-wide">
                     {product.tag}
                   </span>
                 ) : <span />}
                 
                 <button className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                 </button>
              </div>

              {/* Molecule Visual (Animated SVG) */}
              <div className="relative h-40 w-full flex items-center justify-center my-2 group-hover:scale-110 transition-transform duration-500">
                 {/* Fondo glow */}
                 <div className="absolute inset-0 bg-[var(--color-brand-primary)] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500 rounded-full" />
                 
                 <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-[var(--text-main)] fill-none stroke-[0.5px]">
                    <motion.path
                      d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z"
                      initial={{ pathLength: 0, rotate: 0 }}
                      animate={{ pathLength: 1, rotate: 360 }}
                      transition={{ 
                        pathLength: { duration: 2, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                      className="opacity-80"
                    />
                    <motion.circle 
                       cx="50" cy="50" r="15" 
                       className="stroke-[var(--color-brand-secondary)] opacity-50"
                       animate={{ scale: [1, 1.2, 1] }}
                       transition={{ duration: 4, repeat: Infinity }}
                    />
                    <path d="M50 20 L50 35 M80 35 L65 42 M80 65 L65 58 M50 80 L50 65 M20 65 L35 58 M20 35 L35 42" className="opacity-30" />
                 </svg>
              </div>

              {/* Product Info */}
              <div className="p-6 pt-0 mt-auto z-10 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent">
                 <h3 className="text-2xl font-bold font-display text-[var(--text-main)] mb-1">{product.name}</h3>
                 <p className="font-mono text-xs text-[var(--text-muted)] mb-4">{product.formula}</p>
                 
                 {/* Tech Specs Grid */}
                 <div className="grid grid-cols-2 gap-2 mb-6 border-t border-[var(--glass-border)] pt-4">
                    <div>
                       <span className="block text-[10px] uppercase text-[var(--text-muted)] tracking-wider">Purity</span>
                       <span className="font-mono text-sm text-[var(--color-brand-secondary)]">{product.purity}</span>
                    </div>
                    <div>
                       <span className="block text-[10px] uppercase text-[var(--text-muted)] tracking-wider">Mass</span>
                       <span className="font-mono text-sm text-[var(--text-main)]">{product.mass}</span>
                    </div>
                 </div>

                 {/* Price & Action */}
                 <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[var(--text-main)]">${product.price.toFixed(2)}</span>
                    <button className="flex items-center gap-2 bg-[var(--text-main)] text-[var(--bg-page)] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-brand-primary)] hover:text-white transition-all transform hover:-translate-y-1">
                       <Plus className="w-3 h-3" /> Add
                    </button>
                 </div>
              </div>

              {/* Decorative Background Grid */}
              <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                   style={{backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "10px 10px"}}>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 text-center">
         <button className="border-b border-[var(--text-muted)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] pb-1 text-sm font-mono uppercase tracking-widest transition-all">
            View Full Research Catalog
         </button>
      </div>

    </section>
  );
}