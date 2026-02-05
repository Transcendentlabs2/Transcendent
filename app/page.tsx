'use client';

import { motion, Variants } from "framer-motion";
import { Atom } from "lucide-react";
import PremiumBackground from "./components/PremiumBackground";

export default function Home() {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        // IMPORTANTE: 'as const' soluciona el error rojo de TypeScript
        ease: [0.22, 1, 0.36, 1] as const 
      }, 
    },
  };

  return (
    // CORREGIDO: Usamos 'min-h-dvh' en lugar de la clase arbitraria
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 md:px-8">
      <PremiumBackground />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto text-center"
      >
        {/* Top Tag */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-cyan-100/80 font-display">
              System Upgrade In Progress
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 variants={fadeUp} className="relative z-20">
          <span className="block text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-bold tracking-widest text-white mix-blend-overlay font-display select-none opacity-50">
            PEPTIDE
          </span>
          <span className="block text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-bold tracking-widest text-gradient-hero font-display mt-[-2vw] md:-mt-8">
            SCIENCE
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={fadeUp} 
          className="mt-8 md:mt-12 text-base md:text-lg text-gray-400 font-light max-w-xl leading-relaxed tracking-wide"
        >
          Transcendent is engineering the next generation of bio-active compounds. 
          <span className="text-gray-200"> Beyond evolution.</span>
        </motion.p>

        {/* Availability Info */}
        <motion.div variants={fadeUp} className="w-full max-w-md mt-10 md:mt-14">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            Limited Availability • Q3 2026
          </p>
        </motion.div>

      </motion.div>

      {/* Footer Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 w-full px-6 flex justify-between items-end text-[10px] text-gray-600 font-mono uppercase"
      >
        <div className="flex flex-col gap-1">
          <span>Lat: 34.0522° N</span>
          <span>Lon: 118.2437° W</span>
        </div>
        <div className="flex items-center gap-2">
           <Atom className="w-4 h-4 animate-spin-slow text-cyan-900" />
           <span>Transcendent Labs © 2026</span>
        </div>
      </motion.div>
    </main>
  );
}