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
      {/* --- FONDO ANIMADO --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glows Ambientales */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-brand-primary)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-brand-secondary)] rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-float" />
        
        {/* Red Molecular - Opacidad ajustada para limpieza visual */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-10 dark:opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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

      {/* --- CONTENIDO --- */}
      <div className="relative z-10 flex flex-col items-center">
          
          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-md shadow-lg hover:border-[var(--color-brand-primary)]/30 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-primary)]"></span>
              </span>
              <span className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[var(--text-main)]">
                System Upgrade In Progress
              </span>
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="relative z-20 select-none text-center">
            {/* Texto de fondo: Ahora usa transparencia pura en lugar de blend-mode para consistencia */}
            <span className="block text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-bold tracking-widest text-black/5 dark:text-white/5 font-display scale-105 origin-bottom">
              PEPTIDE
            </span>
            {/* Texto Principal: Sombra sutil añadida para contraste */}
            <span className="block text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-bold tracking-widest text-gradient-hero font-display mt-[-2vw] md:-mt-8 drop-shadow-sm filter">
              SCIENCE
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 md:mt-12 text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-xl leading-relaxed tracking-wide text-center px-4">
            Transcendent is engineering the next generation of bio-active compounds. 
            <strong className="text-[var(--text-main)] font-semibold"> Beyond evolution.</strong>
          </motion.p>
          
          <motion.div variants={fadeUp} className="mt-12">
             <button className="px-8 py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl hover:shadow-[var(--color-brand-primary)]/20">
                Explore Catalog
             </button>
          </motion.div>
      </div>
    </motion.div>
  );
}