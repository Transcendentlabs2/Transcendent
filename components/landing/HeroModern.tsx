"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Activity, Microscope, Hexagon, Plus } from "lucide-react";
import Image from "next/image"; 

// --- 1. COMPONENTE DECORATIVO: Puntos de Datos Microscópicos (Mejorado) ---
const MicroDataPoints = () => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-full h-full opacity-60"
    style={{ overflow: "visible" }}
  >
    {/* Aumentamos a 40 partículas para más volumen */}
    {[...Array(40)].map((_, i) => (
      <motion.circle 
        key={i}
        cx={Math.random() * 180 + 10} 
        cy={Math.random() * 180 + 10} 
        r={Math.random() * 2 + 0.5} 
        fill="currentColor"
        animate={{
          opacity: [0.1, 0.8, 0.1],
          y: [0, Math.random() * -30 - 10, 0],
          x: [0, Math.random() * 20 - 10, 0],
          scale: [1, Math.random() * 1.5 + 1, 1]
        }}
        transition={{
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3,
        }}
        className={i % 3 === 0 ? "text-[var(--color-brand-secondary)]" : "text-[var(--color-brand-primary)]"}
      />
    ))}
  </svg>
);

// --- 2. COMPONENTE: Elementos Flotantes de Laboratorio ---
const FloatingLabElements = () => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] text-[var(--color-brand-secondary)]/20 blur-sm"
      >
        <Hexagon size={64} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[25%] left-[20%] text-[var(--color-brand-primary)]/30"
      >
        <Hexagon size={32} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[20%] text-[var(--text-muted)]"
      >
        <Plus size={16} />
      </motion.div>
      
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[40%] right-[10%] text-[var(--text-muted)]"
      >
        <Plus size={24} />
      </motion.div>
    </div>
  );
};

export default function HeroModern() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-x-hidden bg-[var(--bg-page)] transition-colors duration-500 pt-32 pb-12 lg:pt-40 lg:pb-12 will-change-contents">
      
      {/* --- FONDO DECORATIVO GENERAL --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transform translate-z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* --- COLUMNA IZQUIERDA (Texto) --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:mx-0"
        >
          <motion.div variants={fadeInUp} className="w-full flex flex-col items-center lg:items-start">
            <span className="block text-lg md:text-2xl text-[var(--text-muted)] font-medium mb-2 tracking-widest uppercase flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[var(--color-brand-primary)]" />
              Advanced Research
            </span>
            
            <h1 className="flex flex-col items-center lg:items-start leading-none">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--text-main)] mb-1 transition-colors duration-300">
                TRANSCENDENT
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] drop-shadow-sm">
                LABS &reg;
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeInUp} className="w-full text-base md:text-lg text-[var(--text-muted)] leading-relaxed px-2 lg:px-0">
            Pioneering the next evolution of bio-active compounds. We engineer 
            peptides that push the boundaries of human potential. 
            <span className="block mt-2 font-semibold text-[var(--text-main)]">
              Pure. Tested. Beyond Evolution.
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center lg:justify-start">
            <button 
                onClick={scrollToCatalog}
                className="group relative px-8 py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-brand-primary)]/20 active:scale-95 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="pt-4 md:pt-8 flex gap-8 border-t border-[var(--glass-border)] w-full lg:w-auto justify-center lg:justify-start">
            <div className="text-center lg:text-left group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">99.8%</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Purity</p>
            </div>
            <div className="text-center lg:text-left group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">50+</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Compounds</p>
            </div>
            <div className="text-center lg:text-left group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">24/7</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* --- COLUMNA DERECHA (DISEÑO PREMIUM DISRUPTIVO - EFECTO STACKED) --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center pointer-events-none mt-12 lg:mt-0 transform-gpu"
        >
          
          {/* Brillo de Energía Central */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[450px] h-[450px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-full blur-[140px] translate-z-0" 
          />

          <div className="relative w-full h-full flex flex-col items-center justify-center perspective-1000">
            
            {/* Cuchillas de energía */}
            <motion.div 
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3], scaleX: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-40 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-brand-primary)] to-transparent z-0 shadow-[0_0_20px_var(--color-brand-primary)]"
            />
            
            <motion.div 
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3], scaleX: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-40 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-brand-secondary)] to-transparent z-0 shadow-[0_0_20px_var(--color-brand-secondary)]"
            />

            {/* Elementos y Partículas */}
            <FloatingLabElements />
            <div className="absolute inset-0 z-10 p-10 md:p-20">
               <MicroDataPoints />
            </div>

            {/* ========================================================
                GRUPO DE FRASCOS APILADOS (STACKED PEPTIDES)
                ======================================================== */}
            <div className="relative flex items-center justify-center w-full h-full">
              
              {/* VIAL 1: FONDO IZQUIERDA (Pequeño, desenfocado, profundo) */}
              <motion.div 
                animate={{ y: [-5, 10, -5], rotate: [-8, -4, -8], scale: [0.85, 0.88, 0.85] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute z-20 w-48 h-48 md:w-64 md:h-64 lg:w-[320px] lg:h-[320px] opacity-40 blur-[4px] -translate-x-20 -translate-y-16 md:-translate-x-32 md:-translate-y-24"
              >
                <Image src="/heroPeptide.webp" alt="Background Vial Left" fill sizes="320px" className="object-contain drop-shadow-2xl" />
              </motion.div>

              {/* VIAL 2: FONDO DERECHA (Mediano, semi-desenfocado) */}
              <motion.div 
                animate={{ y: [10, -8, 10], rotate: [6, 2, 6], scale: [0.9, 0.93, 0.9] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute z-20 w-56 h-56 md:w-72 md:h-72 lg:w-[380px] lg:h-[380px] opacity-60 blur-[2px] translate-x-24 translate-y-12 md:translate-x-36 md:translate-y-20"
              >
                <Image src="/heroPeptide.webp" alt="Background Vial Right" fill sizes="380px" className="object-contain drop-shadow-2xl" />
              </motion.div>

              {/* VIAL 3: PRINCIPAL (Al frente, nítido, imponente) */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-40 w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] flex items-center justify-center drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
              >
                {/* Aura exclusiva del frasco principal */}
                <motion.div 
                  animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.05, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-10 bg-white/10 dark:bg-white/5 rounded-full blur-3xl z-0" 
                />
                
                <Image 
                  src="/heroPeptide.webp" 
                  alt="Transcendent Labs Premium Peptide Vial" 
                  fill
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 500px" 
                  className="object-contain relative z-10 filter contrast-105"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Tarjeta Flotante de Bio-Availability */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-4 right-[5%] md:bottom-16 md:right-[5%] lg:right-0 bg-[var(--bg-page)]/80 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-[var(--glass-border)] z-50 scale-90 md:scale-100"
          >
             <div className="flex items-center gap-4">
               <div className="p-3 bg-gradient-to-br from-[var(--color-brand-primary)]/20 to-[var(--color-brand-secondary)]/20 rounded-xl border border-[var(--color-brand-primary)]/30">
                  <Activity className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-brand-primary)] animate-pulse" />
               </div>
               <div>
                 <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Bio-Availability</p>
                 <p className="text-sm md:text-base font-extrabold text-[var(--text-main)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--color-brand-primary)]">99.9% Optimized</p>
               </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}