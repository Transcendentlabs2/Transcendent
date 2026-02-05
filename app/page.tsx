'use client';

import { Atom } from "lucide-react";
// Importamos todos los componentes
import PremiumBackground from "./components/PremiumBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; // <--- AHORA SÍ ESTÁ IMPORTADO
import TrustTicker from "./components/TrustTicker";
import LabGrid from "./components/LabGrid";
import ProductShowcase from "./components/ProductShowcase";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden">
      
      {/* Elementos Globales */}
      <Navbar /> 
      <PremiumBackground />

      {/* Capa de ruido (Noise Overlay) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 pointer-events-none mix-blend-overlay fixed z-0"></div>

      {/* --- SECCIONES DE LA PÁGINA --- */}
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Indicators */}
      <TrustTicker />
      
      {/* 3. Features / Lab Grid */}
      <LabGrid />
      
      {/* 4. Product Catalog */}
      <ProductShowcase />
      
      {/* 5. FAQ / Knowledge Base */}
      <FAQSection />
      
      {/* 6. Footer */}
      <Footer />

      {/* Small Bottom Copyright Bar */}
      <div className="py-12 w-full px-6 flex justify-center text-[10px] text-[var(--text-muted)] font-mono uppercase border-t border-[var(--glass-border)] relative z-10 bg-[var(--bg-page)]">
        <div className="flex items-center gap-2">
           <Atom className="w-4 h-4 animate-spin-slow text-[var(--color-brand-primary)]" />
           <span>Transcendent Labs © 2026</span>
        </div>
      </div>

    </main>
  );
}