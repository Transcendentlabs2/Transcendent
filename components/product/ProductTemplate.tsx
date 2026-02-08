"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, ArrowRight, Microscope, Info } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext"; // <--- 1. IMPORTAR HOOK CARRITO

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

// --- SVG ANIMADO MEJORADO: REACTOR CORE HUD ---
// Mas complejo, con filtros de brillo y múltiples capas de rotación
const BioScannerRing = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none text-[var(--color-brand-primary)] overflow-visible" viewBox="0 0 600 600">
    <defs>
      {/* Filtro de Resplandor (Glow) */}
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      
      {/* Gradiente del Escáner */}
      <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* 1. ESTRUCTURA ESTÁTICA (Miras y Guías) */}
    <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.1" strokeDasharray="4 4" />
    <line x1="300" y1="20" x2="300" y2="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <line x1="300" y1="550" x2="300" y2="580" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <line x1="20" y1="300" x2="50" y2="300" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <line x1="550" y1="300" x2="580" y2="300" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />

    {/* 2. ANILLO EXTERNO LENTO (Contención) */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ originX: "300px", originY: "300px" }}>
      <circle cx="300" cy="300" r="260" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.2" strokeDasharray="40 140" strokeLinecap="round" />
    </motion.g>

    {/* 3. ANILLO INTERNO RÁPIDO (Giroscopio) */}
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ originX: "300px", originY: "300px" }}>
      <circle cx="300" cy="300" r="230" stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.3" strokeDasharray="10 30 50 30" />
    </motion.g>

    {/* 4. SOPORTES CENTRALES (Pulsan y Brillan) */}
    <motion.g 
        animate={{ scale: [1, 1.02, 1], opacity: [0.6, 1, 0.6] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
        style={{ originX: "300px", originY: "300px" }}
    >
        {/* Esquinas con Glow */}
        <path d="M 200 200 L 180 200 L 180 180" stroke="currentColor" strokeWidth="3" fill="none" filter="url(#glow)" />
        <path d="M 400 200 L 420 200 L 420 180" stroke="currentColor" strokeWidth="3" fill="none" filter="url(#glow)" />
        <path d="M 200 400 L 180 400 L 180 420" stroke="currentColor" strokeWidth="3" fill="none" filter="url(#glow)" />
        <path d="M 400 400 L 420 400 L 420 420" stroke="currentColor" strokeWidth="3" fill="none" filter="url(#glow)" />
        
        {/* Arcos internos */}
        <path d="M 300 100 A 200 200 0 0 1 500 300" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.3" strokeDasharray="5 5" />
        <path d="M 300 500 A 200 200 0 0 1 100 300" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.3" strokeDasharray="5 5" />
    </motion.g>

    {/* 5. ESCÁNER LÁSER VERTICAL (Barrido) */}
    <motion.rect
      x="0" y="0" width="600" height="60"
      fill="url(#scanGradient)"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: [0, 540, 0], opacity: [0, 0.6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

// FUNCIÓN CORRECTORA DE TEXTO
const formatDescription = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-[var(--text-main)] font-bold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  // 2. USAR HOOK CARRITO
  const { addItem } = useCart();

  return (
    <>
      <Navbar />
      <div className="pt-20"><UrgencyBanner /></div>

      <div className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-page)] text-[var(--text-main)]">
        
        {/* Fondo Sutil */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <main className="relative z-10 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
             
             {/* --- COLUMNA VISUAL --- */}
             <div className="relative h-[50vh] lg:h-[calc(100vh-120px)] lg:sticky lg:top-[120px] w-full flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-sm group">
                <div className="absolute w-[95%] lg:w-[80%] aspect-square opacity-60 pointer-events-none">
                    <BioScannerRing />
                </div>
                <motion.div style={{ y: yImage }} initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: "easeOut" }} className="relative w-[55%] lg:w-[55%] h-[55%] lg:h-[55%] z-20">
                   <Image src={product.images} alt={product.name} fill className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]" priority />
                </motion.div>
                <div className="absolute top-6 left-6 flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">Compound_ID</span>
                    <span className="font-mono text-sm font-bold text-[var(--color-brand-primary)] tracking-widest">{product.slug.slice(0,8).toUpperCase()}</span>
                </div>
                <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex items-center gap-2 bg-[var(--bg-page)]/80 backdrop-blur border border-[var(--glass-border)] px-3 py-1.5 rounded-full shadow-lg">
                    <Microscope className="w-3 h-3 text-[var(--color-brand-primary)]" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Research Only</span>
                </div>
             </div>

             {/* --- COLUMNA CONTENIDO --- */}
             <div className="relative px-6 py-10 lg:px-24 lg:py-24">
                
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-6 lg:mb-8">
                   <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                      <span>Catalog</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-[var(--color-brand-primary)]">{product.category}</span>
                   </div>
                   <div className="h-px w-8 bg-[var(--glass-border)] hidden sm:block" />
                   {product.stock < 50 && (
                      <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest border border-red-500/20 px-2 py-0.5 rounded bg-red-500/5 animate-pulse">Low Batch Vol.</span>
                   )}
                </div>

                {/* Título Corregido */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight tracking-tighter mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[var(--text-main)] to-[var(--text-muted)] pb-2">
                   {product.name}
                </h1>
                
                <div className="flex items-baseline gap-4 mb-8 border-b border-[var(--glass-border)] pb-6">
                   <span className="text-3xl lg:text-4xl font-mono font-bold text-[var(--color-brand-primary)]">${product.price.toFixed(2)}</span>
                   <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide">USD / Lyophilized Vial</span>
                </div>

                {/* Specs */}
                <div className="mb-10">
                   <ScientificSpecs purity={product.purity || "99% HPLC"} category={product.category} />
                </div>

                {/* Descripción */}
                <div className="mb-12">
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 flex items-center gap-2">
                      <Info className="w-3 h-3" /> Technical Abstract
                   </h3>
                   
                   <div className="prose prose-sm prose-invert max-w-none text-[var(--text-muted)] leading-relaxed columns-1 md:columns-2 gap-8 [column-rule:1px_solid_var(--glass-border)] mb-8 text-justify hyphens-auto break-words">
                      <p>
                         {formatDescription(product.description)}
                      </p>
                   </div>

                   <ResearchChallenges />
                </div>

                {/* FAQ */}
                <div className="mb-8">
                    <ProtocolFAQ />
                </div>

                {/* Panel de Compra */}
                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl shadow-xl lg:sticky lg:bottom-10 z-30 backdrop-blur-md">
                   <StockMeter stock={product.stock} />
                   <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <div className="flex items-center justify-between sm:justify-start bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg px-4 h-14 sm:w-40">
                         <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-xl text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">-</button>
                         <span className="font-mono font-bold text-lg">{qty}</span>
                         <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-xl text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">+</button>
                      </div>
                      
                      {/* BOTÓN CONECTADO A addItem */}
                      <button 
                        onClick={() => addItem(product, qty)} // <--- 3. FUNCIÓN DE AGREGAR
                        className="flex-1 bg-[var(--text-main)] text-[var(--bg-page)] h-14 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-lg flex items-center justify-center gap-3 group"
                      >
                         <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                         <span>Acquire Sample</span>
                      </button>
                   </div>
                   <SecureBadges />
                </div>
             </div>
          </div>
        </main>

        {/* Reviews */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-[var(--glass-border)] bg-[var(--bg-page)]">
           <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-10 bg-[var(--glass-border)]" />
              <h3 className="text-2xl md:text-3xl font-display font-bold text-center">Protocol Feedback</h3>
              <div className="h-px w-10 bg-[var(--glass-border)]" />
           </div>
           <ProductReviews />
        </section>

      </div>
      
      <StickyPurchase product={product} qty={qty} />
      <Footer />
    </>
  );
}