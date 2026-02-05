'use client';

import { motion, Variants } from "framer-motion";
import { Atom } from "lucide-react";
import PremiumBackground from "./components/PremiumBackground";
import Navbar from "./components/Navbar";     // <--- IMPORTAR
import TrustTicker from "./components/TrustTicker"; // <--- IMPORTAR
import LabGrid from "./components/LabGrid";   // <--- IMPORTAR
import ProductShowcase from "./components/ProductShowcase";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 }},
  };

  const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }},
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <Navbar /> 
      <PremiumBackground />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 pointer-events-none mix-blend-overlay fixed"></div>

      {/* --- HERO SECTION --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 pt-20"
      >
        {/* ... TU CÓDIGO DEL HERO VA AQUÍ ... */}
        {/* (Copia el contenido del Hero que ya tenías dentro de este motion.div) */}
         <motion.div variants={fadeUp} className="mb-8">
             {/* ... Tag System Upgrade ... */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-page)]/30 backdrop-blur-md shadow-lg">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-primary)]"></span>
                </span>
                <span className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">
                System Upgrade In Progress
                </span>
            </div>
         </motion.div>

         <motion.h1 variants={fadeUp} className="relative z-20 select-none text-center">
            <span className="block text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-bold tracking-widest text-[var(--text-main)] font-display opacity-10 dark:opacity-50 mix-blend-overlay dark:mix-blend-normal">
                PEPTIDE
            </span>
            <span className="block text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-bold tracking-widest text-gradient-hero font-display mt-[-2vw] md:-mt-8 filter drop-shadow-2xl">
                SCIENCE
            </span>
         </motion.h1>

         <motion.p variants={fadeUp} className="mt-8 md:mt-12 text-base md:text-lg text-[var(--text-muted)] font-light max-w-xl leading-relaxed tracking-wide text-center">
             Transcendent is engineering the next generation of bio-active compounds. 
             <strong className="text-[var(--text-main)] font-medium"> Beyond evolution.</strong>
         </motion.p>
      </motion.div>

  
      <TrustTicker />
      <LabGrid />
      <ProductShowcase/>
      <FAQSection/>
      <Footer/>

      {/* Footer Stats (lo dejamos al final del todo) */}
      <div className="py-12 w-full px-6 flex justify-center text-[10px] text-[var(--text-muted)] font-mono uppercase border-t border-[var(--glass-border)]">
        <div className="flex items-center gap-2">
           <Atom className="w-4 h-4 animate-spin-slow text-[var(--color-brand-primary)]" />
           <span>Transcendent Labs © 2026</span>
        </div>
      </div>

    </main>
  );
}