"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, ShieldCheck, Zap, Activity, 
  FlaskConical, Clock, Truck, ChevronRight 
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ProductReviews from "../product/ProductReviews"; // <--- Nuevo Componente
import StickyPurchase from "../product/StickyPurchase"; // <--- Nuevo Componente

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
  const [timeLeft, setTimeLeft] = useState("");

  // Lógica del Contador Regresivo (Shipping Cutoff)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(16, 0, 0, 0); // 4:00 PM Cutoff
      
      if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);
      
      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
    };
    
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  const isLowStock = product.stock < 50;

  return (
    <>
      <Navbar />
      
      {/* Background FX (Optimized for Safari) */}
      <div className="fixed inset-0 pointer-events-none z-0 transform-gpu">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[var(--color-brand-primary)]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 pt-28 md:pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* VISUALES (Izquierda) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative aspect-square w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[2.5rem] overflow-hidden flex items-center justify-center group transform-gpu"
             >
                {/* SVG Grid Animado de Fondo */}
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
                   {/* Sombra Dinámica */}
                   <motion.div 
                     animate={{ scale: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/40 blur-xl rounded-full" 
                   />
                </motion.div>

                {/* Badge Pureza */}
                <div className="absolute top-6 left-6 bg-[var(--bg-page)]/90 backdrop-blur-md border border-[var(--color-brand-primary)]/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl z-20">
                   <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" />
                   <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                      {product.purity}
                   </span>
                </div>
             </motion.div>

             {/* Datos Técnicos (Iconos SVG Animados) */}
             <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  { icon: Zap, label: "Potency", val: "High", color: "text-amber-400" },
                  { icon: Activity, label: "Bioavailability", val: "Optimized", color: "text-purple-400" },
                  { icon: FlaskConical, label: "Grade", val: "Research", color: "text-emerald-400" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-2xl text-center group hover:bg-[var(--glass-border)]/50 transition-colors">
                     <div className={`${item.color} mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                       <item.icon className="w-6 h-6" />
                     </div>
                     <p className="text-[9px] uppercase text-[var(--text-muted)] font-bold tracking-widest">{item.label}</p>
                     <p className="text-sm font-bold text-[var(--text-main)]">{item.val}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* VENTA (Derecha) */}
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
             
             {/* Precio & Stock Alert */}
             <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-mono font-bold text-[var(--color-brand-primary)]">
                   ${product.price.toFixed(2)}
                </span>
                {isLowStock && (
                   <div className="flex items-center gap-1.5 mb-2 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase animate-pulse">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Only {product.stock} units left
                   </div>
                )}
             </div>

             {/* Description Box */}
             <div className="bg-[var(--glass-bg)]/50 border-l-2 border-[var(--color-brand-primary)] pl-4 py-2 mb-8">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                   {product.description}
                </p>
             </div>

             {/* BLOQUE DE COMPRA PRINCIPAL */}
             <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-3xl mb-8 shadow-2xl relative overflow-hidden group">
                
                {/* SVG Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--glass-border)]/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                {/* Urgency Timer */}
                <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] mb-5 pb-4 border-b border-[var(--glass-border)]">
                   <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--color-brand-primary)] animate-pulse" />
                      <span>Order within:</span>
                   </div>
                   <span className="font-mono text-[var(--text-main)] bg-[var(--glass-border)] px-2 py-1 rounded-md">
                      {timeLeft}
                   </span>
                </div>

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

                   {/* Add to Cart CTA */}
                   <button className="w-full bg-[var(--text-main)] text-[var(--bg-page)] font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="uppercase tracking-wide">Add to Research Cart</span>
                   </button>
                   
                   <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-2">
                      <Truck className="w-3 h-3" />
                      <span>Same Day Global Shipping</span>
                   </div>
                </div>
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