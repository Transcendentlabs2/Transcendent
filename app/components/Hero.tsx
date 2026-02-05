"use client";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 }},
  };

  const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }},
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 pt-20 overflow-hidden"
    >
      {/* --- FONDO ANIMADO (Traído de la Opción A) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glows Ambientales */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-brand-primary)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-brand-secondary)] rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-float" />
        
        {/* Red Molecular Rotando */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-20 dark:opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
               <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-[var(--text-muted)]"/>
             </pattern>
             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-brand-primary)" />
                <stop offset="100%" stopColor="var(--color-brand-secondary)" />
            </linearGradient>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
           {/* Círculo central giratorio */}
           <motion.circle 
             cx="50" cy="50" r="25" 
             stroke="url(#gradient)" 
             strokeWidth="0.1"
             fill="none"
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="opacity-50"
           />
           <motion.circle 
             cx="50" cy="50" r="15" 
             stroke="url(#gradient)" 
             strokeWidth="0.1"
             strokeDasharray="1 2"
             fill="none"
             animate={{ rotate: -360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="opacity-30"
           />
        </svg>
      </div>

      {/* --- CONTENIDO BRUTALISTA (Traído de la Opción B) --- */}
      <div className="relative z-10 flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-8">
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
          
          <motion.div variants={fadeUp} className="mt-12">
             <button className="px-8 py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Explore Catalog
             </button>
          </motion.div>
      </div>
    </motion.div>
  );
}