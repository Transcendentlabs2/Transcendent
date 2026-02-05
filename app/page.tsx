'use client';

import { motion, Variants } from "framer-motion"; // Importamos el tipo Variants
import { Beaker, ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import PeptideStructure from "./components/PeptideStructure";

export default function Home() {
  
  // Tipamos explícitamente las variantes
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        // "as const" soluciona el error del array de números
        ease: [0.22, 1, 0.36, 1] as const 
      }, 
    },
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-3xl mx-auto text-center space-y-10"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <Sparkles className="w-4 h-4 text-[rgb(var(--color-primary-glow))]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gradient-premium">
              Coming Soon
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="py-4">
            <PeptideStructure />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest uppercase">
            <span className="block text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 pb-2 glow-effect">
              Transcendent
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[rgb(var(--color-text-muted))] font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            The next evolution in bio-active peptide science. <br className="hidden md:block"/>
            Redefining human potential.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full max-w-md mt-8">
          <form className="relative group" onSubmit={(e) => e.preventDefault()}>
             <div className="absolute -inset-0.5 bg-linear-to-r from-[rgb(var(--color-primary-glow))] to-[rgb(var(--color-secondary-glow))] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[rgb(var(--color-background))]/80 border border-white/10 backdrop-blur-xl p-1.5 rounded-lg">
                <Beaker className="w-5 h-5 text-[rgb(var(--color-text-muted))] ml-3 mr-2" />
                <input
                type="email"
                placeholder="Enter access email..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-[rgb(var(--color-text-muted))] text-sm py-2"
                required
                />
                <button
                type="submit"
                className="group/btn flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[rgb(var(--color-primary-glow))] hover:text-white transition-all duration-300"
                >
                Notify Me
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
             <p className="text-[10px] text-[rgb(var(--color-text-muted))] mt-3 tracking-wider uppercase">
                Exclusive access only. We despise spam.
            </p>
          </form>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 text-[10px] text-[rgb(var(--color-text-muted))] tracking-[0.3em] uppercase"
      >
        © 2024 Transcendent Labs
      </motion.div>
    </main>
  );
}