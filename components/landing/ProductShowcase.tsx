"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ScanLine, Info } from "lucide-react";

// --- IMPORTACIÓN DE IMÁGENES ---
// Asegúrate de que las rutas sean correctas
import imggh from '../../app/img/gh.webp'; 
import imgnad from '../../app/img/nad.webp';

// Datos de Productos
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
    tag: "BEST SELLER",
    image: imgnad
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
    tag: "HIGH DEMAND",
    image: imggh
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
    tag: null,
    image: imgnad
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
    tag: "FAT LOSS",
    image: imggh
  },
];

const CATEGORIES = ["All", "Healing", "Metabolic", "Growth"];

// --- 1. LAB CONTAINER (SVG GEOMÉTRICO) ---
// Usa 'stroke-text-muted' para que el color reaccione automáticamente al tema
const LabContainer = ({ image, name }: { image: any, name: string }) => {
  return (
    <div className="relative w-48 h-64 mx-auto flex items-center justify-center transform-gpu">
      
      {/* Fondo HUD Rotatorio */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {/* USAMOS 'stroke-text-muted' definido en tu CSS global */}
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-text-muted stroke-[0.5] group-hover:stroke-[1] transition-all">
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" strokeOpacity="0.5" />
          <path d="M100 20 L100 0 M200 100 L180 100 M100 180 L100 200 M20 100 L0 100" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Imagen del Producto */}
      <motion.div
        className="relative z-10 w-32 h-auto"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <img 
          src={image.src} 
          alt={name} 
          className="w-full h-full object-contain drop-shadow-2xl filter contrast-110 saturate-100 transition-all duration-500"
        />
        {/* Reflejo (Sombra) */}
        <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent blur-md opacity-30 rounded-full scale-x-75" />
      </motion.div>

      {/* Efecto Scanner Vertical */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
        <motion.div
          className="w-full h-[2px] bg-[var(--color-brand-primary)] shadow-[0_0_15px_var(--color-brand-primary)] opacity-0 group-hover:opacity-40"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "top" }}
        />
      </div>
    </div>
  );
};

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    // USAMOS bg-page (variable global) para el fondo de la sección
    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 bg-page transition-colors duration-300" id="catalog">
      
      {/* --- HEADER & FILTROS --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text-main mb-4">
            Active <span className="text-text-muted">Compounds</span>
          </h2>
          <p className="text-text-muted max-w-md text-lg font-sans">
            Research-grade peptides synthesized for maximum bioavailability.
          </p>
        </div>

        {/* Tabs de Filtro */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              // USAMOS glass-panel O text-muted/text-main PARA ADAPTARSE
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase border transition-all ${
                activeCategory === cat
                  ? "bg-text-main text-page border-text-main" // Invertido para contraste
                  : "bg-transparent text-text-muted border-glass-border hover:border-[var(--color-brand-primary)] hover:text-text-main"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID DE PRODUCTOS --- */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              // --- CLASES MÁGICAS ---
              // Usamos 'glass-panel' que definiste en CSS global. 
              // Esto aplica automáticamente el fondo correcto (blanco o negro transparente) según el tema.
              // Agregamos bg-page/50 para asegurar un fondo base si el glass es muy transparente.
              className="group relative rounded-[2.5rem] p-5 flex flex-col items-center text-center transition-all duration-300 
                         glass-panel hover:border-[var(--color-brand-primary)]/50 hover:shadow-[0_0_30px_rgba(0,201,255,0.15)]"
            >
              
              {/* Tag Flotante */}
              {product.tag && (
                 <span className="absolute top-5 right-5 z-30 bg-text-main text-page text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                     {product.tag}
                 </span>
              )}

              {/* Glow de Fondo (Usa variable global accent-glow) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-glow rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Imagen Componente */}
              <div className="relative z-10 w-full mb-2">
                 <LabContainer image={product.image} name={product.name} />
              </div>

              {/* Info Producto */}
              <div className="w-full px-1 relative z-10 mt-auto">
                 {/* Lote */}
                 <div className="flex items-center justify-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <ScanLine className="w-3 h-3 text-[var(--color-brand-primary)]" />
                    <p className="text-[10px] uppercase tracking-widest font-mono text-text-muted">{product.lot}</p>
                 </div>
                 
                 <h3 className="text-xl font-bold font-display text-text-main mb-1">
                    {product.name}
                 </h3>
                 <p className="text-xs text-text-muted font-mono mb-6">{product.dose} • {product.category}</p>
                 
                 {/* Footer de Tarjeta */}
                 <div className="border-t border-glass-border pt-5 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-text-main font-mono">
                           ${product.price.toFixed(2)}
                        </span>
                        
                        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">In Stock</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-1.5 border border-glass-border text-text-muted px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-glass-border hover:text-text-main transition-colors">
                           <Info className="w-3.5 h-3.5" /> Info
                        </button>
                        
                        <button className="flex items-center justify-center gap-1.5 bg-text-main text-page px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-lg active:scale-95">
                           Add <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>
                 </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer Link */}
      <div className="mt-16 text-center">
         <button className="flex items-center gap-2 mx-auto text-text-muted hover:text-text-main transition-colors text-sm font-mono uppercase tracking-widest group">
           View Full Research Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

    </section>
  );
}