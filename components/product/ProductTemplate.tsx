"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight, Microscope, Info, AlertTriangle, Activity, Database } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

// --- COMPONENTES DEL SISTEMA DE PRODUCTO ---
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import UrgencyBanner from "./UrgencyBanner";
import StockMeter from "./StockMeter";
import ScientificSpecs from "./ScientificSpecs";
import ResearchChallenges from "./ResearchChallenges";
import ProtocolFAQ from "./ProtocolFAQ";
import SecureBadges from "./SecureBadges";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string;
  description: string;
  slug: string;
}

// --- 1. SVGs ANIMADOS DISRUPTIVOS (CUSTOM LAB ASSETS) ---

const RotatingMolecule = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--color-brand-primary)] opacity-20">
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 5" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      <motion.circle cx="100" cy="30" r="5" fill="currentColor" animate={{ r: [5, 8, 5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="100" cy="170" r="5" fill="currentColor" animate={{ r: [5, 8, 5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      <motion.circle cx="30" cy="100" r="5" fill="currentColor" animate={{ r: [5, 8, 5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="170" cy="100" r="5" fill="currentColor" animate={{ r: [5, 8, 5] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
      <line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1" />
    </motion.g>
  </svg>
);

const TechGridBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
       style={{ 
         backgroundImage: 'linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)', 
         backgroundSize: '4rem 4rem' 
       }} 
  />
);

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--text-main)] z-20" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--text-main)] z-20" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--text-main)] z-20" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--text-main)] z-20" />
  </>
);

// --- 2. LOGICA DE FORMATEO ---

const formatDescription = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-[var(--color-brand-primary)] font-bold tracking-tight">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

// --- 3. COMPONENTE PRINCIPAL ---

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-main)] min-h-screen selection:bg-[var(--color-brand-primary)] selection:text-white">
      <Navbar />
      
      <div className="pt-24 lg:pt-28">
        <UrgencyBanner />
      </div>

      <main className="relative max-w-[1800px] mx-auto border-x border-[var(--glass-border)] bg-[var(--bg-page)] shadow-2xl overflow-hidden">
        
        {/* Fondo Global */}
        <TechGridBackground />

        {/* --- GRID MAESTRA (Layout Brutalista) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          {/* === SECCIÓN IZQUIERDA: VISUALIZADOR DE MUESTRA (7 cols) === */}
          <section className="relative lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[var(--glass-border)] h-[60vh] lg:h-auto lg:min-h-screen flex flex-col justify-between p-6 lg:p-12 overflow-hidden group">
            
            {/* Elementos Decorativos de Fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
               <RotatingMolecule />
            </div>

            {/* Header del Visualizador */}
            <div className="relative z-20 flex justify-between items-start font-mono text-xs tracking-widest uppercase opacity-70">
              <div className="flex flex-col gap-1">
                 <span className="bg-[var(--text-main)] text-[var(--bg-page)] px-2 py-0.5 font-bold">Fig. 01</span>
                 <span>Visual_Reference</span>
              </div>
              <div className="text-right">
                <span className="block text-[var(--color-brand-primary)]">Scanner: Active</span>
                <span className="block">{product.slug.toUpperCase()}</span>
              </div>
            </div>

            {/* IMAGEN PRINCIPAL */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-10">
              <motion.div 
                style={{ y: yParallax, rotate: rotateParallax }}
                className="relative w-[80%] lg:w-[65%] aspect-square"
              >
                <div className="absolute inset-0 bg-[var(--color-brand-primary)] rounded-full blur-[100px] opacity-20 animate-pulse" />
                <Image 
                  src={product.images} 
                  alt={product.name} 
                  fill 
                  className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] z-20 relative" 
                  priority 
                />
                
                {/* Scanner Overlay Line */}
                <motion.div 
                   className="absolute left-0 right-0 h-[2px] bg-[var(--color-brand-primary)] shadow-[0_0_15px_var(--color-brand-primary)] z-30 opacity-70"
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Data HUD Footer */}
            <div className="relative z-20 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] p-4 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-4">
                <Microscope className="w-5 h-5 text-[var(--color-brand-primary)]" />
                <div>
                  <p className="text-[var(--text-muted)]">MAGNIFICATION</p>
                  <p className="font-bold">2000x ELECTRON</p>
                </div>
              </div>
              <div className="h-8 w-px bg-[var(--glass-border)]" />
              <div className="flex items-center gap-4">
                <Activity className="w-5 h-5 text-[var(--color-brand-primary)]" />
                <div>
                  <p className="text-[var(--text-muted)]">STATUS</p>
                  <p className="font-bold">STABLE</p>
                </div>
              </div>
            </div>

            <CornerBrackets />
          </section>

          {/* === SECCIÓN DERECHA: DATOS DEL PROTOCOLO (5 cols) === */}
          <section className="relative lg:col-span-5 flex flex-col bg-[var(--bg-page)]">
            
            {/* Scroll Container Interior */}
            <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
              
              {/* Breadcrumbs & ID */}
              <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                 <span>Catalog</span> <ArrowRight className="w-3 h-3" /> <span>{product.category}</span>
              </div>

              {/* TITULO MASIVO */}
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 uppercase break-words hyphens-auto">
                {product.name}
              </h1>

              {/* Precio y Stock */}
              <div className="flex items-end justify-between border-b-2 border-[var(--text-main)] pb-6 mb-8">
                 <div className="flex flex-col">
                    <span className="text-sm font-mono text-[var(--text-muted)] mb-1">UNIT COST (USD)</span>
                    <span className="text-4xl font-bold font-mono tracking-tight">${product.price.toFixed(2)}</span>
                 </div>
                 <div className="text-right">
                    {product.stock < 50 && (
                      <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase animate-pulse mb-1">
                        <AlertTriangle className="w-3 h-3" /> Critical Stock
                      </div>
                    )}
                    <span className="text-sm font-mono">{product.stock} Units Available</span>
                 </div>
              </div>

              {/* Descripción Técnica (JUSTIFICACIÓN CORREGIDA) */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  <h3 className="font-bold uppercase tracking-widest text-sm">Technical Abstract</h3>
                </div>
                
                {/* AQUÍ ESTÁ LA CORRECCIÓN CLAVE:
                   text-justify + hyphens-auto + leading-relaxed + tracking-wide
                   Esto evita los "rios" de espacio blanco en columnas estrechas.
                */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm lg:text-base text-justify hyphens-auto leading-relaxed tracking-wide text-[var(--text-muted)]">
                    {formatDescription(product.description)}
                  </p>
                </div>
              </div>

              {/* Especificaciones */}
              <div className="mb-12 p-4 border border-[var(--glass-border)] bg-[var(--bg-page)] relative">
                <div className="absolute top-0 left-0 bg-[var(--text-main)] text-[var(--bg-page)] text-[10px] font-bold px-2 py-0.5">SPECS_SHEET</div>
                <div className="mt-4">
                  <ScientificSpecs purity={product.purity || "99.9%"} category={product.category} />
                </div>
              </div>

              {/* Challenges & FAQ */}
              <div className="space-y-8">
                <ResearchChallenges />
                <ProtocolFAQ />
              </div>
            </div>

            {/* PANEL DE COMPRA FLOTANTE/ESTÁTICO AL PIE DE LA COLUMNA */}
            <div className="sticky bottom-0 z-30 p-6 lg:p-8 bg-[var(--bg-page)] border-t-2 border-[var(--text-main)]">
              
              <StockMeter stock={product.stock} />
              
              <div className="flex flex-col gap-4 mt-6">
                 {/* Controles de Cantidad Brutalistas */}
                 <div className="flex h-14 w-full">
                    <button 
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-14 bg-[var(--glass-bg)] border border-[var(--text-main)] flex items-center justify-center hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors text-xl font-mono"
                    >-</button>
                    <div className="flex-1 border-y border-[var(--text-main)] flex items-center justify-center font-mono font-bold text-xl bg-[var(--bg-page)]">
                      {qty}
                    </div>
                    <button 
                      onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                      className="w-14 bg-[var(--glass-bg)] border border-[var(--text-main)] flex items-center justify-center hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors text-xl font-mono"
                    >+</button>
                 </div>

                 {/* Botón de Acción Principal */}
                 <button className="relative w-full h-16 bg-[var(--color-brand-primary)] text-white font-bold uppercase tracking-[0.2em] text-sm overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-[var(--text-main)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <ShoppingCart className="w-5 h-5" />
                      Initiate Acquisition
                    </span>
                 </button>
                 
                 <div className="pt-2">
                   <SecureBadges />
                 </div>
              </div>
            </div>

          </section>
        </div>

        {/* --- SECCION DE REVIEWS (FUERA DE LA GRID PRINCIPAL) --- */}
        <section className="border-t border-[var(--glass-border)] bg-[var(--glass-bg)] py-20 px-6 relative overflow-hidden">
           <div className="max-w-7xl mx-auto">
             <div className="flex items-center gap-4 mb-12">
               <div className="w-4 h-4 bg-[var(--color-brand-primary)] animate-pulse" />
               <h3 className="text-2xl font-mono font-bold uppercase tracking-widest">Field Data / Peer Reviews</h3>
               <div className="h-px flex-1 bg-[var(--text-main)] opacity-20" />
             </div>
             <ProductReviews />
           </div>
        </section>

      </main>

      <StickyPurchase product={product} qty={qty} />
      <Footer />
    </div>
  );
}