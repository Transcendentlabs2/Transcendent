import { prisma } from "@/lib/prisma";
import { Atom } from "lucide-react";

// --- IMPORTACIONES DE COMPONENTES ---
import PremiumBackground from "@/components/landing/PremiumBackground";
import Navbar from "@/components/landing/Navbar";
import HeroModern from "@/components/landing/HeroModern";
import TrustTicker from "@/components/landing/TrustTicker";
import LabGrid from "@/components/landing/LabGrid";
import ProductShowcase from "@/components/landing/ProductShowcase";
import BatchVerifier from "@/components/landing/BatchVerifier";
import PeptideCalculator from "@/components/landing/PeptideCalculator";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default async function Home() {
  
  // 1. OBTENER DATOS REALES DE LA BASE DE DATOS
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 8 
  });

  // 2. SERIALIZAR DATOS
  // CORRECCIÓN: Usamos 'any' aquí para eliminar el error de tipado inmediatamente
  // sin depender de que la generación de Prisma se haya sincronizado.
  const serializedProducts = products.map((product: any) => ({
    ...product,
    price: Number(product.price), // Convertimos Decimal a Number
    purity: product.purity || "High Purity", 
    description: product.description || "" 
  }));

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Elementos Globales */}
      <Navbar /> 
      <PremiumBackground />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 pointer-events-none mix-blend-overlay fixed z-0"></div>

      {/* 1. Hero */}
      <section id="hero">
        <HeroModern />
      </section>

      {/* 2. Trust */}
      <section id="testing" className="scroll-mt-24">
        <TrustTicker />
      </section>
      
      {/* 3. Science */}
      <section id="science" className="scroll-mt-24">
        <LabGrid />
      </section>
      
      {/* 4. Catalog (CONECTADO) */}
      <section id="catalog" className="scroll-mt-24">
        <ProductShowcase products={serializedProducts} />
      </section>

      {/* 5. Verification */}
      <section id="verification" className="scroll-mt-24">
        <BatchVerifier />
      </section>
      
      {/* 6. Calculator */}
      <section id="calculator" className="scroll-mt-24">
        <PeptideCalculator />
      </section>
      
      {/* 7. FAQ */}
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