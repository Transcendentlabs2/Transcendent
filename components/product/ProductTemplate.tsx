"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, ShieldCheck, Zap, Activity, 
  FlaskConical, Truck, ChevronRight 
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

// --- IMPORTACIÓN DE COMPONENTES HIJOS ---
// Asegúrate de que estos archivos estén en la misma carpeta (components/product/)
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import UrgencyBanner from "./UrgencyBanner";
import StockMeter from "./StockMeter";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string;
  description: string;
}

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  
  // Detectar stock bajo para alertas visuales
  const isLowStock = product.stock < 50;

  return (
    <>
      <Navbar />
      
      {/* 1. BARRA DE URGENCIA (Pegada al Navbar) */}
      <div className="pt-20"> 
        <UrgencyBanner />
      </div>

      {/* Background FX (Optimizado para Safari) */}
      <div className="fixed inset-0 pointer-events-none z-0 transform-gpu">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[var(--color-brand-primary)]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* COLUMNA IZQUIERDA: VISUALES */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             {/* Imagen Principal */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative aspect-square w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[2.5rem] overflow-hidden flex items-center justify-center group transform-gpu"
             >
                {/* Grid Científico de Fondo */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                {/* Producto Flotante */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[60%] h-[60%]"
                >
                   <Image src={product.images} alt={product.name} fill className="object-contain drop-shadow-2xl z-10" />
                   {/* Sombra */}
                   <motion.div 
                     animate={{ scale: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/40 blur-xl rounded-full" 
                   />
                </motion.div>

                {/* Badge Flotante */}
                <div className="absolute top-6 left-6 bg-[var(--bg-page)]/90 backdrop-blur-md border border-[var(--color-brand-primary)]/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl z-20">
                   <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" />
                   <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                      {product.purity || "99% HPLC"}
                   </span>
                </div>
             </motion.div>

             {/* Grid de Beneficios (Estilo Bioseta) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[var(--glass-bg)] p-5 rounded-2xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)]/50 transition-colors">
                    <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" /> Fast Action
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)] leading-tight">High bioavailability formulation for rapid uptake.</p>
                </div>
                <div className="bg-[var(--glass-bg)] p-5 rounded-2xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)]/50 transition-colors">
                    <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-400" /> Stable
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)] leading-tight">Lyophilized structure ensures stability during transit.</p>
                </div>
                <div className="bg-[var(--glass-bg)] p-5 rounded-2xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)]/50 transition-colors">
                    <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)] leading-tight">Every batch is third-party tested via HPLC.</p>
                </div>
             </div>
          </div>

          {/* COLUMNA DERECHA: VENTA */}
          <div className="lg:col-span-5 flex flex-col">
             
             {/* Breadcrumbs */}
             <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-6">
                <span>Catalog</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[var(--color-brand-primary)]">{product.category}</span>
             </div>

             <h1 className="text-4xl md:text-5xl font-display font-black text-[var(--text-main)] leading-[0.9] mb-4 tracking-tight">
                {product.name}
             </h1>
             
             {/* Precio */}
             <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-mono font-bold text-[var(--color-brand-primary)]">
                   ${product.price.toFixed(2)}
                </span>
             </div>

             {/* BLOQUE DE COMPRA PRINCIPAL */}
             <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-3xl mb-8 shadow-2xl relative overflow-hidden group">
                
                {/* 2. BARRA DE STOCK (Escasez) */}
                <StockMeter stock={product.stock} />

                <div className="flex flex-col gap-4">
                   {/* Selector Cantidad */}
                   <div className="flex items-center justify-between bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl px-2 py-2">
                      <button 
                        onClick={() => setQty(q => Math.max(1, q - 1))} 
                        className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-[var(--glass-border)] rounded-lg transition-colors"
                      >-</button>
                      <span className="font-mono font-bold text-[var(--text-main)] text-lg w-12 text-center">{qty}</span>
                      <button 
                        onClick={() => setQty(q => Math.min(product.stock, q + 1))} 
                        className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-[var(--glass-border)] rounded-lg transition-colors"
                      >+</button>
                   </div>

                   {/* Botón CTA */}
                   <button className="w-full bg-[var(--text-main)] text-[var(--bg-page)] font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="uppercase tracking-wide">Add to Research Cart</span>
                   </button>
                   
                   {/* Micro-Garantías (Confianza) */}
                   <div className="grid grid-cols-2 gap-2 mt-2">
                       <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] bg-[var(--glass-border)]/30 py-2 rounded-lg border border-[var(--glass-border)]">
                          <Truck className="w-3 h-3 text-[var(--color-brand-primary)]" />
                          <span>Discrete Shipping</span>
                       </div>
                       <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] bg-[var(--glass-border)]/30 py-2 rounded-lg border border-[var(--glass-border)]">
                          <ShieldCheck className="w-3 h-3 text-[var(--color-brand-primary)]" />
                          <span>Quality Guarantee</span>
                       </div>
                   </div>
                </div>
             </div>

             {/* Descripción Científica */}
             <div className="bg-[var(--glass-bg)]/50 border-l-2 border-[var(--color-brand-primary)] pl-4 py-4 mb-8">
                <h3 className="font-bold text-[var(--text-main)] text-sm mb-2 uppercase tracking-wider">Scientific Profile</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                   {product.description}
                </p>
             </div>
             
          </div>
        </div>

        {/* --- SECCIÓN 2: TESTIMONIOS (Social Proof) --- */}
        <div className="mt-24 border-t border-[var(--glass-border)] pt-16">
            <h3 className="text-2xl font-display font-bold text-[var(--text-main)] mb-8 text-center">Verified Research Feedback</h3>
            <ProductReviews />
        </div>

      </div>
      
      {/* --- STICKY MOBILE CTA (Safari Safe) --- */}
      <StickyPurchase product={product} qty={qty} />

      <Footer />
    </>
  );
}