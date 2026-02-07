"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, ShieldCheck, ArrowDownLeft, Truck } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import UrgencyBanner from "./UrgencyBanner";
import StockMeter from "./StockMeter";
import ScientificSpecs from "./ScientificSpecs"; // <--- El nuevo componente

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

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]); // Rotación suave al hacer scroll

  return (
    <>
      <Navbar />
      <div className="pt-20"><UrgencyBanner /></div>

      {/* --- MASTER CONTAINER --- */}
      <div className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-page)] text-[var(--text-main)]">
        
        {/* Decorative Grid Lines (Estilo Plano Técnico) */}
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute left-[5%] h-full w-[1px] bg-[var(--glass-border)] opacity-30" />
            <div className="absolute right-[5%] h-full w-[1px] bg-[var(--glass-border)] opacity-30" />
            <div className="absolute top-[20%] w-full h-[1px] bg-[var(--glass-border)] opacity-30" />
        </div>

        <main className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          
          {/* --- LEFT COLUMN: STICKY VISUAL (La Vitrina) --- */}
          <div className="relative h-[60vh] lg:h-[calc(100vh-100px)] lg:sticky lg:top-[100px] flex items-center justify-center border-r border-[var(--glass-border)]/50 bg-[var(--bg-page)]">
             
             {/* Rotating Ring Back */}
             <motion.div style={{ rotate }} className="absolute w-[80%] aspect-square border border-[var(--glass-border)] rounded-full opacity-20 border-dashed pointer-events-none" />
             <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -90]) }} className="absolute w-[60%] aspect-square border border-[var(--color-brand-primary)]/20 rounded-full opacity-40 pointer-events-none" />

             {/* Product Image */}
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, ease: "circOut" }}
               className="relative w-[60%] h-[60%] z-20"
             >
                <Image 
                  src={product.images} 
                  alt={product.name} 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                  priority
                />
             </motion.div>

             {/* Floating Data Labels */}
             <div className="absolute bottom-10 left-10 hidden lg:block">
                <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Ref. ID</p>
                <p className="font-mono text-xl">{product.slug.slice(0,6).toUpperCase()}</p>
             </div>
          </div>

          {/* --- RIGHT COLUMN: EDITORIAL CONTENT (El Artículo) --- */}
          <div className="relative px-6 py-12 lg:px-20 lg:py-24 flex flex-col justify-center">
             
             {/* Header Editorial */}
             <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1 border border-[var(--text-main)] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors cursor-default">
                      {product.category}
                   </span>
                   {product.stock < 50 && (
                      <span className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
                         <span className="w-2 h-2 bg-red-500 rounded-full" /> Limited Batch
                      </span>
                   )}
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] tracking-tighter mb-6 mix-blend-difference">
                   {product.name}
                </h1>
                
                <div className="flex items-center justify-between border-t border-b border-[var(--glass-border)] py-4">
                   <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Lab Price</p>
                   <p className="text-3xl font-mono font-bold text-[var(--color-brand-primary)]">${product.price.toFixed(2)}</p>
                </div>
             </div>

             {/* Scientific Specs Component */}
             <ScientificSpecs purity={product.purity || "High Purity"} category={product.category} />

             {/* Description (Editorial Style) */}
             <div className="prose prose-invert prose-lg max-w-none mb-12">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                   <ArrowDownLeft className="w-5 h-5 text-[var(--color-brand-primary)]" /> 
                   Compound Profile
                </h3>
                {/* Primer párrafo con letra capital ficticia (drop cap style) */}
                <p className="text-[var(--text-muted)] leading-relaxed text-base md:text-lg first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[var(--text-main)]">
                   {product.description}
                </p>
                
                <div className="mt-6 p-4 bg-[var(--glass-bg)] border-l-4 border-[var(--color-brand-primary)] rounded-r-xl">
                   <p className="text-xs font-mono text-[var(--text-muted)] uppercase">
                      <strong>Storage Protocol:</strong> Store lyophilized at -20°C. Keep away from direct light. Reconstitute with bacteriostatic water only.
                   </p>
                </div>
             </div>

             {/* Purchase Interface (HUD Style) */}
             <div className="sticky bottom-4 z-30 bg-[var(--bg-page)]/80 backdrop-blur-xl border border-[var(--glass-border)] p-5 rounded-3xl shadow-2xl">
                <StockMeter stock={product.stock} />
                
                <div className="flex gap-4 mt-4">
                   <div className="flex items-center bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-xl px-2 hover:text-[var(--color-brand-primary)]">-</button>
                      <span className="font-mono font-bold w-8 text-center">{qty}</span>
                      <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-xl px-2 hover:text-[var(--color-brand-primary)]">+</button>
                   </div>
                   
                   <button className="flex-1 bg-[var(--text-main)] text-[var(--bg-page)] py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.95] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      <ShoppingCart className="w-4 h-4" /> Acquire Protocol
                   </button>
                </div>
                
                <div className="flex justify-center gap-4 mt-3">
                   <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> Quality Verified
                   </div>
                   <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                      <Truck className="w-3 h-3 text-[var(--color-brand-primary)]" /> Priority Ship
                   </div>
                </div>
             </div>

          </div>
        </main>

        {/* Reviews Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-[var(--glass-border)]">
           <h3 className="text-4xl font-display font-bold text-center mb-12">Field Reports</h3>
           <ProductReviews />
        </section>

      </div>
      
      <StickyPurchase product={product} qty={qty} />
      <Footer />
    </>
  );
}