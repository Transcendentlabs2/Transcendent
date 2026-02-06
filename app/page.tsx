'use client';

import { Atom } from "lucide-react";

// --- IMPORTACIONES DE COMPONENTES ---
import PremiumBackground from "./components/PremiumBackground";
import Navbar from "./components/Navbar";
import HeroModern from "./components/HeroModern";
import TrustTicker from "./components/TrustTicker";
import LabGrid from "./components/LabGrid";
import ProductShowcase from "./components/ProductShowcase";
import BatchVerifier from "./components/BatchVerifier"; // <--- 1. IMPORTAR NUEVO COMPONENTE
import PeptideCalculator from "./components/PeptideCalculator";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Elementos Globales */}
      <Navbar /> 
      <PremiumBackground />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 pointer-events-none mix-blend-overlay fixed z-0"></div>

      {/* 1. Hero (Impresión Inicial) */}
      <section id="hero">
        <HeroModern />
      </section>

      {/* 2. Trust (Prueba Social Pasiva) */}
      <section id="testing" className="scroll-mt-24">
        <TrustTicker />
      </section>
      
      {/* 3. Science (Autoridad Técnica) */}
      <section id="science" className="scroll-mt-24">
        <LabGrid />
      </section>
      
      {/* 4. Catalog (VENTA) */}
      <section id="catalog" className="scroll-mt-24">
        <ProductShowcase />
      </section>

      {/* 5. VERIFICACIÓN (CONFIANZA ACTIVA - NUEVO) */}
      {/* Colocado estratégicamente después de los productos para cerrar la duda de calidad */}
      <section id="verification" className="scroll-mt-24">
        <BatchVerifier />
      </section>
      
      {/* 6. Calculator (UTILIDAD / ENGAGEMENT) */}
      <section id="calculator" className="scroll-mt-24">
        <PeptideCalculator />
      </section>
      
      {/* 7. FAQ (Manejo de Objeciones) */}
      <section id="faq" className="scroll-mt-24">
        <FAQSection />
      </section>
      
      {/* 8. Footer */}
      <Footer />

      {/* Copyright */}
      <div className="py-12 w-full px-6 flex justify-center text-[10px] text-[var(--text-muted)] font-mono uppercase border-t border-[var(--glass-border)] relative z-10 bg-[var(--bg-page)]">
        <div className="flex items-center gap-2">
           <Atom className="w-4 h-4 animate-spin-slow text-[var(--color-brand-primary)]" />
           <span>Transcendent Labs © 2026</span>
        </div>
      </div>

    </main>
  );
}