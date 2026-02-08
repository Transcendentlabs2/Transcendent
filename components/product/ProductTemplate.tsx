"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, ArrowRight, Microscope, Info } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext"; 

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

// --- SVG ANIMADO: QUANTUM FIELD HUD (Más Disruptivo) ---
const BioScannerRing = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none text-[var(--color-brand-primary)] overflow-visible" viewBox="0 0 600 600">
    <defs>
      <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <linearGradient id="beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* 1. EJE Z (Profundidad) - Elipse Rotando Lento */}
    <motion.ellipse 
        cx="300" cy="300" rx="280" ry="100" 
        stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.2" 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
    />
    
    {/* 2. EJE Y - Elipse Inversa */}
    <motion.ellipse 
        cx="300" cy="300" rx="100" ry="280" 
        stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.2" 
        animate={{ rotate: -360 }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
    />

    {/* 3. NÚCLEO PULSANTE (Target Lock) */}
    <motion.circle 
        cx="300" cy="300" r="180" 
        stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.1" strokeDasharray="20 10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3], rotate: 180 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* 4. MARCADORES DE ESQUINA (HUD Táctico) */}
    <motion.path 
        d="M 100 100 L 150 100 L 100 150 M 500 100 L 450 100 L 500 150 M 100 500 L 150 500 L 100 450 M 500 500 L 450 500 L 500 450"
        stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.5" filter="url(#glow-intense)"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
    />

    {/* 5. ESCÁNER DE BARRIDO (Luz Vertical Rápida) */}
    <motion.rect
      x="0" y="280" width="600" height="40"
      fill="url(#beam-grad)"
      initial={{ opacity: 0 }}
      animate={{ y: [-300, 300], opacity: [0, 0.8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    />
  </svg>
);

// FUNCIÓN TEXTO: Solo Negritas, sin lógica rara
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
                {/* SVG DISRUPTIVO */}
                <div className="absolute w-[100%] h-[100%] opacity-40 pointer-events-none flex items-center justify-center">
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

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight tracking-tighter mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[var(--text-main)] to-[var(--text-muted)] pb-2">
                   {product.name}
                </h1>
                
                <div className="flex items-baseline gap-4 mb-8 border-b border-[var(--glass-border)] pb-6">
                   <span className="text-3xl lg:text-4xl font-mono font-bold text-[var(--color-brand-primary)]">${product.price.toFixed(2)}</span>
                   <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide">USD / Lyophilized Vial</span>
                </div>

                <div className="mb-10">
                   <ScientificSpecs purity={product.purity || "99% HPLC"} category={product.category} />
                </div>

                <div className="mb-12">
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 flex items-center gap-2">
                      <Info className="w-3 h-3" /> Technical Abstract
                   </h3>
                   
                   {/* CORRECCIÓN DE TEXTO: text-left y hyphens-none */}
                   <div className="prose prose-sm prose-invert max-w-none text-[var(--text-muted)] leading-relaxed columns-1 md:columns-2 gap-8 [column-rule:1px_solid_var(--glass-border)] mb-8 text-left hyphens-none break-words">
                      <p>
                         {formatDescription(product.description)}
                      </p>
                   </div>

                   <ResearchChallenges />
                </div>

                <div className="mb-8">
                    <ProtocolFAQ />
                </div>

                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl shadow-xl lg:sticky lg:bottom-10 z-30 backdrop-blur-md">
                   <StockMeter stock={product.stock} />
                   <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <div className="flex items-center justify-between sm:justify-start bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg px-4 h-14 sm:w-40">
                         <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-xl text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">-</button>
                         <span className="font-mono font-bold text-lg">{qty}</span>
                         <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-xl text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">+</button>
                      </div>
                      <button 
                        onClick={() => addItem(product, qty)} 
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