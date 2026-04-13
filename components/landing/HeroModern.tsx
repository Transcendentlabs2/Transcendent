"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Activity, Microscope } from "lucide-react";
import Image from "next/image"; 

// --- 1. COMPONENTE DECORATIVO: Puntos de Datos Microscópicos (Nuevo) ---
const MicroDataPoints = () => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-full h-full opacity-60"
    style={{ overflow: "visible" }}
  >
    {[...Array(20)].map((_, i) => (
      <motion.circle 
        key={i}
        cx={Math.random() * 160 + 20} 
        cy={Math.random() * 160 + 20} 
        r={Math.random() * 1.5 + 0.5} 
        fill="currentColor"
        animate={{
          opacity: [0.1, 0.6, 0.1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
        className="text-[var(--color-brand-primary)]"
      />
    ))}
  </svg>
);

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
        
        {/* --- COLUMNA IZQUIERDA (Texto - Se mantiene idéntica) --- */}
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

        {/* --- COLUMNA DERECHA (NUEVO DISEÑO PREMIUM LAB) --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center pointer-events-none mt-12 lg:mt-0 transform-gpu"
        >
          {/* 1. Malla Holográfica de Estabilización (Fondo del Mockup) */}
          <div className="absolute w-[90%] h-[90%] md:w-[80%] md:h-[80%] rounded-full border border-[var(--glass-border)] dark:border-[var(--color-brand-secondary)]/10 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)]"></div>
          
          {/* 2. Brillo de Energía Central Más Intenso */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-full blur-[90px] opacity-60 translate-z-0" 
          />

          {/* 3. Estructura de Contención Tecnológica (Reemplaza los círculos) */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            
            {/* 3.1 Cuchilla de Energía Superior (Contención refractiva) */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 md:w-64 h-1.5 rounded-full z-0 overflow-hidden shadow-[0_0_20px_var(--color-brand-primary)]"
            >
              <div className="w-full h-full bg-[var(--color-brand-primary)] opacity-30"></div>
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
              />
            </motion.div>

            {/* 3.2 Haces de Luz de Escaneo Vertical */}
            <motion.div 
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-[35%] w-px h-full bg-[var(--color-brand-secondary)] opacity-10"
            />
            <motion.div 
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute right-[35%] w-px h-full bg-[var(--color-brand-primary)] opacity-10"
            />

            {/* 3.3 Micro-Puntos de Datos Flotantes (Interactivos con el frasco) */}
            <div className="absolute inset-0 z-10 p-20">
               <MicroDataPoints />
            </div>

            {/* --- 4. FRASCO FLOTANTE (Pepito) - MÁS GRANDE Y PROTAGONISTA --- */}
            <motion.div 
              // Efecto levitación: sube y baja de forma suave
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-30 w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] flex items-center justify-center drop-shadow-[0_25px_40px_rgba(0,0,0,0.5)] transform-gpu"
            >
              {/* Brillo focal directamente detrás del frasco */}
              <div className="absolute inset-16 bg-white/25 dark:bg-white/10 rounded-full blur-3xl z-0" />
              
              <Image 
                src="/heroPeptide.webp" // Mantengo tu ruta
                alt="Transcendent Labs Premium Peptide Vial" 
                fill
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 480px" // Ajusto sizes para el nuevo tamaño
                className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,201,255,0.5)]"
                priority
              />
            </motion.div>

            {/* 3.4 Cuchilla de Energía Inferior */}
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-48 md:w-64 h-1 rounded-full z-0 shadow-[0_0_20px_var(--color-brand-secondary)]"
            >
              <div className="w-full h-full bg-[var(--color-brand-secondary)] opacity-30"></div>
            </motion.div>
          </div>

          {/* 5. Tarjeta Flotante de Bio-Availability (Se mantiene, ajustada ligeramente) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 right-[5%] md:bottom-20 md:right-0 bg-[var(--bg-page)]/90 backdrop-blur-xl p-3 md:p-4 rounded-xl shadow-2xl border border-[var(--glass-border)] z-40 scale-90 md:scale-100 origin-bottom-right"
          >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-[var(--color-brand-primary)]/10 rounded-lg">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-brand-primary)] animate-pulse" />
               </div>
               <div>
                 <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Bio-Availability</p>
                 <p className="text-xs md:text-sm font-bold text-[var(--text-main)]">99% Optimized</p>
               </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}