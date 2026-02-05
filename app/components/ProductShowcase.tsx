"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ShoppingCart } from "lucide-react";

// Datos Actualizados
const PRODUCTS = [
  {
    id: 1,
    name: "TESAMORELIN",
    sub: "Peptide Research Division",
    dose: "10 mg",
    type: "Lyophilized Peptide",
    category: "Growth",
    price: 85.00,
    lot: "A1092",
    tag: "BEST SELLER"
  },
  {
    id: 2,
    name: "BPC-157",
    sub: "Repair Protocol",
    dose: "5 mg",
    type: "Lyophilized Peptide",
    category: "Healing",
    price: 55.00,
    lot: "B2024",
    tag: "HIGH DEMAND"
  },
  {
    id: 3,
    name: "TB-500",
    sub: "Recovery Agent",
    dose: "10 mg",
    type: "Lyophilized Peptide",
    category: "Healing",
    price: 65.00,
    lot: "T3001",
    tag: null
  },
  {
    id: 4,
    name: "SEMAGLUTIDE",
    sub: "Metabolic Research",
    dose: "5 mg",
    type: "Lyophilized Peptide",
    category: "Metabolic",
    price: 120.00,
    lot: "S5050",
    tag: "FAT LOSS"
  },
];

const CATEGORIES = ["All", "Healing", "Metabolic", "Growth"];

// --- SUBCOMPONENTE: EL FRASCO GENERADO POR CÓDIGO ---
// Dibuja un vial estilo 3D idéntico a tu foto usando CSS
const Vial3D = ({ product }: { product: any }) => (
  <div className="relative w-32 h-64 mx-auto flex flex-col items-center justify-center filter drop-shadow-2xl">
    
    {/* 1. TAPA (CAP) */}
    <div className="relative z-20 w-24 h-8 bg-blue-900 rounded-t-sm rounded-b-lg shadow-md border-b border-blue-950">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-700/50 to-transparent rounded-sm" />
    </div>
    
    {/* 2. CUELLO Y SELLO METALICO */}
    <div className="z-10 w-22 h-6 bg-slate-300 border-y border-slate-400 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-sm" />
    <div className="z-10 w-20 h-4 bg-slate-100/50 backdrop-blur-sm border-x border-slate-300" />

    {/* 3. CUERPO DE VIDRIO (GLASS BODY) */}
    <div className="relative z-10 w-28 h-48 bg-slate-200/20 backdrop-blur-md rounded-3xl border border-white/40 shadow-inner overflow-hidden">
        
        {/* Reflejos del vidrio */}
        <div className="absolute top-0 left-2 w-2 h-full bg-white/40 blur-sm" />
        <div className="absolute top-0 right-2 w-1 h-full bg-white/20 blur-sm" />
        
        {/* Contenido (Polvo blanco abajo) - Simula el "Lyophilized" */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white via-slate-100 to-transparent opacity-90 backdrop-blur-xl" />

        {/* 4. LA ETIQUETA (LABEL) */}
        <div className="absolute top-4 left-[2px] right-[2px] bottom-4 bg-white shadow-sm flex flex-col items-center pt-4 px-2 text-center">
            
            {/* Logo Abstracto */}
            <div className="w-6 h-6 mb-1">
                 <svg viewBox="0 0 24 24" className="text-blue-900 fill-current">
                     <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                 </svg>
            </div>
            
            <h4 className="text-[6px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Transcendent Labs</h4>
            <span className="text-[5px] text-slate-400 mb-2">{product.sub}</span>

            {/* Nombre Producto */}
            <h3 className="text-sm font-extrabold text-slate-900 leading-none mb-0.5 font-display tracking-tight">
                {product.name}
            </h3>
            
            <div className="flex items-center gap-1 justify-center mb-2">
                <span className="text-[8px] font-bold text-slate-700">{product.dose}</span>
                <span className="text-[6px] text-slate-400">•</span>
                <span className="text-[6px] text-slate-500">{product.type}</span>
            </div>

            {/* Banner Gris de Advertencia */}
            <div className="w-full bg-slate-200 py-1 mb-2">
                <p className="text-[5px] font-bold text-slate-600 uppercase">For Research Use Only</p>
                <p className="text-[4px] text-slate-500 uppercase">Not for human consumption</p>
            </div>

            {/* Footer de la etiqueta (Barcode y Lote) */}
            <div className="mt-auto w-full flex justify-between items-end px-1 pb-1">
                 {/* Barcode simulado con CSS */}
                 <div className="flex items-end gap-[1px] h-4 opacity-80">
                     {[...Array(15)].map((_,i) => (
                         <div key={i} className={`w-[1px] bg-black ${i % 2 === 0 ? 'h-full' : 'h-3/4'}`} />
                     ))}
                 </div>
                 <div className="text-[4px] text-right text-slate-500 leading-tight">
                     <p>LOT: {product.lot}</p>
                     <p>EXP: 12/2027</p>
                     <p>Storage: 2-8°C</p>
                 </div>
            </div>
        </div>
    </div>
  </div>
);


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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              className="group relative bg-[#E8E8E8] dark:bg-[#121212] rounded-[2rem] p-4 flex flex-col items-center text-center transition-all hover:shadow-[0_0_30px_rgba(0,201,255,0.15)]"
            >
              {/* Tag Flotante */}
              {product.tag && (
                 <span className="absolute top-4 right-4 z-30 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                     {product.tag}
                 </span>
              )}

              {/* FONDO ILUMINADO DETRAS DEL FRASCO (Glow) */}
              <div className="absolute top-10 w-32 h-32 bg-[var(--color-brand-primary)] rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />

              {/* RENDERIZADO DEL FRASCO (Puro CSS) */}
              <div className="relative z-10 transform group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                 <Vial3D product={product} />
              </div>

              {/* INFO DEL PRODUCTO (Fuera del frasco) */}
              <div className="mt-6 w-full px-2 relative z-10">
                 <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-1">
                    {product.name}
                 </h3>
                 <p className="text-xs text-gray-500 font-mono mb-4">{product.dose} • {product.category}</p>
                 
                 <div className="flex items-center justify-between mt-2 border-t border-gray-300 dark:border-gray-800 pt-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                    </span>
                    
                    <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform">
                       Add <ShoppingCart className="w-3 h-3" />
                    </button>
                 </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 text-center">
         <button className="flex items-center gap-2 mx-auto text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-sm font-mono uppercase tracking-widest group">
            View Full Research Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

    </section>
  );
}