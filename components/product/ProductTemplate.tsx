"use client";

import { useState, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, ArrowRight, Minus, Plus, Activity, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext";

// --- SECCIONES SECUNDARIAS (Mantenemos tu lógica existente) ---
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import ResearchChallenges from "./ResearchChallenges";
import ProtocolFAQ from "./ProtocolFAQ";

// --- CONFIGURACIÓN VISUAL ---
const getAccentColor = (category: string) => {
  // Ajusta estos colores a tu marca Transcendent Labs
  switch (category?.toLowerCase()) {
    case "peptides": return "#3b82f6"; // Azul científico
    case "nootropics": return "#8b5cf6"; // Violeta mente
    case "metabolic": return "#f97316"; // Naranja energía
    case "longevity": return "#10b981"; // Verde vida
    default: return "#ffffff";
  }
};

// --- TEXTURA STATIC NOISE (Del diseño de referencia) ---
const StaticNoise = memo(() => (
  <div 
    className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundSize: '100px 100px'
    }}
  />
));
StaticNoise.displayName = "StaticNoise";

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
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Color dinámico basado en categoría
  const accentColor = getAccentColor(product.category);

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[var(--color-brand-primary)] selection:text-white overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION (Estilo Bioseta) --- */}
      <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 pb-12 md:py-0 overflow-hidden">
        
        {/* 1. FONDO AMBIENTAL */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
        />
        <StaticNoise />
        
        {/* 2. TEXTO GIGANTE DE FONDO (Parallax) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
          <motion.h2
            style={{ 
                y: textParallax,
                opacity: opacityFade,
                WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            }}
            className="text-[18vw] md:text-[22vw] font-sans font-black uppercase text-transparent leading-none whitespace-nowrap select-none"
          >
            {product.slug?.split("-")[0] || product.name?.split(" ")[0]}
          </motion.h2>
        </div>

        {/* 3. CONTENIDO PRINCIPAL (Grid 3 Columnas) */}
        <div className="relative w-full max-w-[1800px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">

          {/* COLUMNA IZQUIERDA: Info & Compra (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6 order-2 md:order-1">
            
            {/* Header Pequeño */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/30">ID_{product.id.slice(-4).toUpperCase()}</span>
              <span className="h-[1px] w-8 bg-white/10" />
              <span 
                className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded-sm"
                style={{ color: accentColor, borderColor: `${accentColor}30` }}
              >
                {product.category}
              </span>
            </div>

            {/* Título Principal */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black text-white leading-[0.9] tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-sm md:text-base text-stone-400 font-mono leading-relaxed max-w-sm">
                {product.description}
              </p>
            </div>

            {/* Precio */}
            <div className="flex items-baseline gap-3 py-4">
               <span className="text-4xl font-sans font-black text-white tracking-tighter">
                 ${product.price.toLocaleString()}
               </span>
               <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                 USD / Vial
               </span>
            </div>

            {/* Controles de Compra */}
            <div className="flex flex-col gap-4 max-w-sm">
              {/* Selector Cantidad */}
              <div className="flex items-center justify-between border border-white/10 bg-white/5 px-4 h-12 rounded-sm backdrop-blur-sm">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-white/50 hover:text-white transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="font-mono font-bold">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-white/50 hover:text-white transition-colors">
                    <Plus size={14} />
                  </button>
              </div>

              {/* Botón Principal */}
              <button
                onClick={() => addItem(product, qty)}
                className="group relative overflow-hidden w-full bg-white text-black h-14 rounded-sm transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <div className="flex items-center justify-between px-6 relative z-10 h-full">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Add to Research Cart</span>
                  <ShoppingCart className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>

          {/* COLUMNA CENTRAL: Imagen & Anillos (4 cols) */}
          <div className="md:col-span-4 h-[50vh] md:h-[70vh] flex items-center justify-center relative order-1 md:order-2">
            
            {/* ANILLOS ANIMADOS (Estilo Referencia) */}
            <div 
              className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite]"
              style={{ borderTopColor: accentColor }} // Solo un borde de color sutil
            />
            <div className="absolute w-[220px] h-[220px] md:w-[350px] md:h-[350px] border border-dashed border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            
            {/* Imagen del Producto */}
            <motion.div 
              style={{ scale: imageScale }}
              className="relative w-[80%] h-[80%] flex items-center justify-center z-20"
            >
              <Image
                src={product.images}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                priority
              />
            </motion.div>

            {/* Indicador Flotante Pequeño */}
            <div className="absolute bottom-10 flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 rounded-full backdrop-blur-md">
                <Activity size={12} color={accentColor} />
                <span className="text-[9px] uppercase tracking-widest text-white/70">HPLC Verified</span>
            </div>
          </div>

          {/* COLUMNA DERECHA: Specs Técnicas (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-8 order-3 opacity-80 md:text-right">
            
            {/* Pureza */}
            <div className="flex flex-col md:items-end gap-1">
              <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Purity Grade</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-sans font-bold text-white">{product.purity || "99.8%"}</span>
                <CheckCircle2 size={16} color={accentColor} />
              </div>
            </div>

            {/* Stock */}
            <div className="flex flex-col md:items-end gap-2">
               <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Batch Status</span>
               <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/5">
                 <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                 <span className="text-xs font-mono text-white/80">
                   {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                 </span>
               </div>
            </div>

            {/* Features / Benefits List (Como en la referencia) */}
            <div className="flex flex-col md:items-end gap-3 pt-6 border-t border-white/5 w-full md:w-auto">
               <span 
                 className="text-[9px] uppercase tracking-widest font-mono pb-1 mb-2"
                 style={{ color: accentColor }}
               >
                 Active Principles
               </span>
               {["Lyophilized Powder", "Sterile Vial", "Lab Research Only"].map((feat, i) => (
                 <span key={i} className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                   {feat}
                 </span>
               ))}
            </div>

          </div>
        </div>

        {/* Scroll Indicator / Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* --- SECCIÓN DE DETALLES (Contenido adicional fuera del Hero) --- */}
      <section className="relative z-10 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
            
            {/* abstract y challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                <div>
                   <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
                     <ArrowRight size={14} color={accentColor} /> Technical Abstract
                   </h3>
                   <div className="prose prose-invert prose-p:text-stone-400 prose-strong:text-white prose-sm max-w-none">
                     <p>{product.description}</p>
                     {/* Aquí podrías poner texto largo si lo tienes */}
                   </div>
                </div>
                <div>
                   <ResearchChallenges />
                </div>
            </div>

            {/* FAQ */}
            <div className="mb-24">
                <ProtocolFAQ />
            </div>

            {/* Reviews */}
            <div className="pt-12 border-t border-white/5">
                <h3 className="text-center text-2xl font-display font-bold mb-12">Protocol Feedback</h3>
                <ProductReviews />
            </div>
        </div>
      </section>

      <StickyPurchase product={product} qty={qty} />
      <Footer />
    </div>
  );
}