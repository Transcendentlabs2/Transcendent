"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ShoppingCart, ScanLine } from "lucide-react";

// --- 1. IMPORTACIÓN MANUAL DE IMÁGENES ---
// Asegúrate de tener estos archivos en tu carpeta pública o assets
import imggh from '../img/gh.webp';
import imgnad from '../img/nad.webp';

// Datos Actualizados con referencia a la imagen importada
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

// --- SUBCOMPONENTE: CONTENEDOR TIPO LABORATORIO (ANIMACIÓN PREMIUM) ---
const LabContainer = ({ image, name }: { image: any, name: string }) => {
  return (
    <div className="relative w-48 h-64 mx-auto flex items-center justify-center">
      
      {/* 1. FONDO HUD ROTATORIO (SVG ANIMADO) */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-[var(--text-muted)] stroke-[0.5]">
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" strokeOpacity="0.5" />
          <path d="M100 20 L100 0 M200 100 L180 100 M100 180 L100 200 M20 100 L0 100" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 2. IMAGEN WEBP (FLOTANDO) */}
      <motion.div
        className="relative z-10 w-32 h-auto"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src={image.src} // Next.js importa imagenes como objeto, usa .src
          alt={name} 
          className="w-full h-full object-contain drop-shadow-2xl filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-500"
        />
        
        {/* Reflejo inferior estilo suelo pulido */}
        <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-white/20 to-transparent blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full scale-x-75" />
      </motion.div>

      {/* 3. EFECTO SCANNER (HAZ DE LUZ VERTICAL) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
        <motion.div
          className="w-full h-[2px] bg-[var(--color-brand-primary)] shadow-[0_0_15px_var(--color-brand-primary)] opacity-0 group-hover:opacity-100"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 4. MARCOS TECNOLÓGICOS (CORNERS) */}
      <div className="absolute inset-0 z-20 pointer-events-none p-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
         <svg className="w-full h-full fill-none stroke-[var(--text-main)] stroke-1" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Esquinas animadas que se cierran al hacer hover (usando CSS transition en el path si fuera posible, aqui simple) */}
            <path d="M10,0 L0,0 L0,10" vectorEffect="non-scaling-stroke" />
            <path d="M90,0 L100,0 L100,10" vectorEffect="non-scaling-stroke" />
            <path d="M100,90 L100,100 L90,100" vectorEffect="non-scaling-stroke" />
            <path d="M0,90 L0,100 L10,100" vectorEffect="non-scaling-stroke" />
         </svg>
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
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              className="group relative bg-[#E8E8E8] dark:bg-[#121212] rounded-[2rem] p-4 flex flex-col items-center text-center transition-all hover:shadow-[0_0_30px_rgba(0,201,255,0.1)] border border-transparent hover:border-[var(--glass-border)]"
            >
              {/* Tag Flotante */}
              {product.tag && (
                 <span className="absolute top-4 right-4 z-30 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">
                     {product.tag}
                 </span>
              )}

              {/* FONDO ILUMINADO (Glow) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-brand-primary)] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />

              {/* RENDERIZADO DEL NUEVO COMPONENTE DE IMAGEN */}
              <div className="relative z-10 w-full mb-4">
                 <LabContainer image={product.image} name={product.name} />
              </div>

              {/* INFO DEL PRODUCTO */}
              <div className="w-full px-2 relative z-10 mt-auto">
                 <div className="flex items-center justify-center gap-2 mb-2 opacity-60">
                    <ScanLine className="w-3 h-3 text-[var(--color-brand-primary)]" />
                    <p className="text-[10px] uppercase tracking-widest">{product.lot}</p>
                 </div>
                 
                 <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-1">
                    {product.name}
                 </h3>
                 <p className="text-xs text-gray-500 font-mono mb-4">{product.dose} • {product.category}</p>
                 
                 <div className="flex items-center justify-between mt-2 border-t border-gray-300 dark:border-gray-800 pt-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                        ${product.price.toFixed(2)}
                    </span>
                    
                    <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:scale-105 hover:bg-[var(--color-brand-primary)] hover:text-white transition-all">
                        Add <Plus className="w-3 h-3" />
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