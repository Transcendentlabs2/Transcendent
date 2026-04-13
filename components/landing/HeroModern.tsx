"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Activity, Microscope, Hexagon, Fingerprint, Cpu, ScanLine } from "lucide-react";
import Image from "next/image"; 

// --- 1. COMPONENTE: Partículas de Flujo de Datos (Estilo Matrix/Tech) ---
const DataStreamParticles = () => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="absolute inset-0 w-full h-full opacity-40 z-0"
    style={{ overflow: "visible" }}
  >
    {[...Array(30)].map((_, i) => (
      <motion.rect 
        key={i}
        x={Math.random() * 200} 
        y={Math.random() * 200} 
        width={Math.random() * 2 + 1} 
        height={Math.random() * 6 + 2} 
        fill="currentColor"
        animate={{
          opacity: [0, 0.8, 0],
          y: [0, -40],
        }}
        transition={{
          duration: Math.random() * 2 + 2,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
        className={i % 2 === 0 ? "text-[var(--color-brand-secondary)]" : "text-[var(--color-brand-primary)]"}
      />
    ))}
  </svg>
);

// --- 2. COMPONENTE: Retícula HUD Holográfica ---
const HolographicHUD = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-60">
    {/* Anillo de datos exterior */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-dashed border-[var(--color-brand-primary)]/30 rounded-full"
    />
    
    {/* Anillo interior invertido */}
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute w-[240px] h-[240px] md:w-[350px] md:h-[350px] border-2 border-dotted border-[var(--color-brand-secondary)]/40 rounded-full"
    />

    {/* Cruces de calibración */}
    <div className="absolute top-[10%] left-[10%] text-[var(--color-brand-primary)]/50"><Hexagon size={20} /></div>
    <div className="absolute bottom-[10%] right-[10%] text-[var(--color-brand-secondary)]/50"><ScanLine size={24} /></div>
  </div>
);

// --- 3. COMPONENTE: Tarjeta de Datos Tecnológica ---
const TechDataCard = ({ icon: Icon, title, value, delay, positionClass }: { icon: any, title: string, value: string, delay: number, positionClass: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay }}
    className={`absolute z-50 ${positionClass} bg-[var(--bg-page)]/80 backdrop-blur-xl p-3 md:p-4 rounded-xl border border-[var(--glass-border)] shadow-[0_0_30px_rgba(0,0,0,0.3)] min-w-[140px]`}
  >
    {/* Línea de conexión visual */}
    <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-brand-primary)] hidden md:block" />
    
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-[var(--color-brand-primary)]" />
      <div>
        <p className="text-[9px] md:text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest">{title}</p>
        <p className="text-sm md:text-md font-bold text-[var(--text-main)] font-mono">{value}</p>
      </div>
    </div>
  </motion.div>
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
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[var(--bg-page)] transition-colors duration-500 pt-32 pb-12 lg:pt-40 lg:pb-12">
      
      {/* --- FONDO DECORATIVO GRID TECH --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none transform translate-z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-brand-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-primary)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 text-xs md:text-sm text-[var(--color-brand-primary)] font-mono mb-4 tracking-widest uppercase shadow-[0_0_15px_var(--color-brand-primary)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] animate-pulse" />
              Synthesis Online
            </span>
            
            <h1 className="flex flex-col items-center lg:items-start leading-none">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[var(--text-main)] mb-1">
                TRANSCENDENT
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-primary)] bg-[length:200%_auto] animate-gradient">
                LABS &reg;
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeInUp} className="w-full text-base md:text-lg text-[var(--text-muted)] leading-relaxed px-2 lg:px-0">
            Pioneering the next evolution of bio-active compounds. We engineer 
            peptides that push the boundaries of human potential at a molecular level.
            <span className="block mt-2 font-mono text-[var(--color-brand-secondary)] text-sm">
              &gt; INITIALIZING SYNTHESIS PROTOCOL...
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center lg:justify-start">
            <button 
                onClick={scrollToCatalog}
                className="group relative px-8 py-4 bg-transparent border border-[var(--color-brand-primary)] text-[var(--text-main)] font-mono font-bold rounded-none overflow-hidden transition-all hover:bg-[var(--color-brand-primary)]/10 hover:shadow-[0_0_25px_var(--color-brand-primary)]/30 active:scale-95 cursor-pointer"
            >
              {/* Esquinas tipo Sci-Fi */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-brand-primary)]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-brand-primary)]" />
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                RUN SEQUENCE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* --- COLUMNA DERECHA (LABORATORIO TECH / CÁMARA DE CONTENCIÓN) --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center pointer-events-none mt-8 lg:mt-0"
        >
          {/* Brillo del núcleo del reactor */}
          <div className="absolute w-[300px] h-[300px] bg-[var(--color-brand-primary)]/20 rounded-full blur-[100px]" />
          
          <DataStreamParticles />
          <HolographicHUD />

          {/* Tarjetas de Datos Flotantes */}
          <TechDataCard 
            icon={Fingerprint} 
            title="Seq. Analysis" 
            value="100% MATCH" 
            delay={0} 
            positionClass="top-[15%] right-[5%] md:-right-[10%]" 
          />
          <TechDataCard 
            icon={Cpu} 
            title="Structure" 
            value="ALPHA HELIX" 
            delay={1.5} 
            positionClass="bottom-[20%] left-[5%] md:-left-[5%]" 
          />

          {/* ========================================================
              FRASCO CENTRAL CON EFECTO DE ESCANEO LÁSER
              ======================================================== */}
          <div className="relative z-30 flex items-center justify-center w-full h-full perspective-1000">
            
            {/* Anillos 3D rodeando el frasco */}
            <motion.div 
              animate={{ rotateX: [60, 60], rotateZ: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 md:w-80 md:h-80 border-[3px] border-transparent border-t-[var(--color-brand-primary)] border-b-[var(--color-brand-primary)] rounded-full opacity-60"
            />
             <motion.div 
              animate={{ rotateY: [60, 60], rotateZ: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 md:w-96 md:h-96 border-[2px] border-transparent border-l-[var(--color-brand-secondary)] border-r-[var(--color-brand-secondary)] rounded-full opacity-40"
            />

            {/* Frasco Principal */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] flex items-center justify-center drop-shadow-[0_0_40px_var(--color-brand-primary)]/50"
            >
              <Image 
                src="/heroPeptide.webp" 
                alt="Peptide Formulation" 
                fill
                sizes="(max-width: 768px) 256px, 450px" 
                className="object-contain relative z-10"
                priority
              />

              {/* Láser de Escaneo (Barrido vertical) */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 left-[10%] right-[10%] h-[2px] bg-[var(--color-brand-secondary)] shadow-[0_0_15px_2px_var(--color-brand-secondary)]"
              />
              
              {/* Overlay de retícula sobre el frasco */}
              <div className="absolute inset-0 z-15 bg-[linear-gradient(rgba(0,255,100,0.05)_1px,transparent_1px)] bg-[size:100%_4px] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}