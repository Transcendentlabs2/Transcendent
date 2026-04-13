"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import Image from "next/image"; 


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
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transform translate-z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA (Texto) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:mx-0"
        >
          <motion.div variants={fadeInUp} className="w-full flex flex-col items-center lg:items-start">
            <span className="block text-lg md:text-2xl text-[var(--text-muted)] font-medium mb-2 tracking-widest uppercase">
              Advanced Research
            </span>
            
            <h1 className="flex flex-col items-center lg:items-start leading-none">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--text-main)] mb-1 transition-colors duration-300">
                TRANSCENDENT
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">
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
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)]">99.8%</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Purity</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)]">50+</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Compounds</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)]">24/7</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA (Frasco Flotante + Animaciones Llamativas) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center pointer-events-none mt-8 lg:mt-0 transform-gpu"
        >
          {/* Glow de fondo pulsante */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-full blur-[80px] opacity-50 translate-z-0" 
          />

          {/* Estructura Orbital */}
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            
            {/* Anillo Externo Llamativo */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-brand-primary)] opacity-30 shadow-[0_0_30px_var(--color-brand-primary)]"
            />
            
            {/* Anillo Intermedio Rápido */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 md:inset-10 rounded-full border border-[var(--color-brand-secondary)] opacity-50"
            >
              {/* Satélites luminosos */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 md:w-4 md:h-4 bg-[var(--color-brand-secondary)] rounded-full shadow-[0_0_20px_currentColor]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-2 h-2 md:w-3 md:h-3 bg-[var(--color-brand-primary)] rounded-full shadow-[0_0_15px_currentColor]" />
            </motion.div>

            {/* Anillo Interno Muy Cercano al Frasco */}
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute inset-16 md:inset-24 rounded-full border-t-2 border-l-2 border-[var(--text-main)] opacity-20"
            />

            {/* NÚCLEO CENTRAL - FRASCO FLOTANTE */}
            <motion.div 
              // Efecto levitación
              animate={{ y: [-15, 15, -15], rotateZ: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-40 h-40 md:w-64 md:h-64 flex items-center justify-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Brillo detrás del frasco */}
              <div className="absolute inset-10 bg-white/20 dark:bg-black/20 rounded-full blur-2xl z-0" />
              
              {/* ✅ IMAGEN CORREGIDA: Apunta directo a la carpeta public ✅ */}
              <Image 
                src="/heroPeptide.webp"
                alt="Premium Peptide Vial" 
                fill
                sizes="(max-width: 768px) 160px, 256px"
                className="object-contain relative z-10 drop-shadow-[0_0_25px_var(--color-brand-primary)]"
                priority
              />
              {/* ❌ ELIMINÉ EL PLACEHOLDER QUE TAPABA LA IMAGEN ❌ */}

            </motion.div>

            {/* Tarjeta Flotante (Bio-Availability) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 right-0 md:bottom-12 md:-right-8 bg-[var(--bg-page)]/90 backdrop-blur-xl p-3 md:p-4 rounded-xl shadow-2xl border border-[var(--color-brand-primary)]/30 z-30 scale-90 md:scale-100"
            >
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-[var(--color-brand-primary)]/20 rounded-lg">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-brand-primary)] animate-pulse" />
                 </div>
                 <div>
                   <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Bio-Availability</p>
                   <p className="text-xs md:text-sm font-bold text-[var(--text-main)]">99% Optimized</p>
                 </div>
               </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}