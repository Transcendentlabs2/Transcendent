"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Beaker, FileText, Activity } from "lucide-react";

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

  return (
    // CAMBIO: 'min-h-screen' permite crecer si falta espacio. 'overflow-x-hidden' evita scroll lateral.
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-x-hidden bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500 pt-24 pb-12 lg:py-0">
      
      {/* --- FONDO DINÁMICO --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Grid Sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glows: Ajustados para no quemar la pantalla en móvil */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-400/20 dark:bg-cyan-500/10 blur-[80px] md:blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-400/20 dark:bg-blue-600/10 blur-[80px] md:blur-[120px]" />
      </div>

      {/* --- CONTENEDOR PRINCIPAL --- */}
      <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA (Texto) */}
        {/* order-2 lg:order-1 asegura que en desktop vaya primero, pero en móvil dejamos que fluya natural */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-300 uppercase">
              System Online v2.4
            </span>
          </motion.div>

          {/* Títulos Responsive */}
          <motion.div variants={fadeInUp} className="w-full">
            <span className="block text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium mb-2 tracking-widest uppercase">
              Advanced Research
            </span>
            {/* Títulos ajustados: text-4xl en móvil, sube hasta 8xl en desktop */}
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white mb-0 md:mb-2 transition-colors duration-300">
              TRANSCENDENT
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-cyan-400 dark:to-blue-500">
              LABS &reg;
            </span>
          </motion.div>

          <motion.p variants={fadeInUp} className="max-w-xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-2 lg:px-0">
            Pioneering the next evolution of bio-active compounds. We engineer 
            peptides that push the boundaries of human potential. 
            <span className="block mt-2 font-semibold text-slate-900 dark:text-white">
              Pure. Tested. Beyond Evolution.
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-8 py-4 rounded-lg border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-2 justify-center">
              <FileText className="w-4 h-4" />
              Documentation
            </button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="pt-4 md:pt-8 flex gap-8 border-t border-slate-200 dark:border-white/10 w-full lg:w-auto justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">99.8%</h3>
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Purity</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">50+</h3>
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Compounds</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">24/7</h3>
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA (Molécula) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center pointer-events-none mt-8 lg:mt-0"
        >
          {/* Círculo decorativo de fondo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-[60px] opacity-60" />

          {/* Contenedor de la molécula escalable */}
          <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px]">
            {/* Anillos */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-slate-300 dark:border-white/10"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 md:inset-12 rounded-full border border-slate-200 dark:border-white/20"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 md:w-4 md:h-4 bg-slate-900 dark:bg-cyan-400 rounded-full shadow-[0_0_15px_currentColor]" />
            </motion.div>

            {/* Núcleo Central */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-black rounded-full border border-slate-100 dark:border-white/10 shadow-2xl flex items-center justify-center z-20">
                  <Beaker className="w-8 h-8 md:w-12 md:h-12 text-blue-600 dark:text-cyan-400 animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                  >
                    <div className="absolute top-2 left-1/2 w-2 h-2 bg-purple-500 rounded-full" />
                  </motion.div>
               </div>
            </div>

            {/* Tarjetas Flotantes (Ocultas en móviles muy pequeños o ajustadas) */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-0 md:top-10 md:right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 z-30 scale-90 md:scale-100 origin-bottom-left"
            >
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Bio-Availability</p>
                   <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Optimized</p>
                 </div>
               </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}