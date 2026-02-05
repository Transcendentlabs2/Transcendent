"use client";
import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glow principal */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-brand-primary)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-brand-secondary)] rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-float" />
        
        {/* SVG Molecular Grid Animation */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-30 dark:opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
               <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-[var(--text-muted)]"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
           <motion.circle 
             cx="50" cy="50" r="20" 
             stroke="url(#gradient)" 
             strokeWidth="0.2"
             fill="none"
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           />
             <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-brand-primary)" />
                <stop offset="100%" stopColor="var(--color-brand-secondary)" />
            </linearGradient>
            </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider text-[var(--text-muted)] uppercase">
              Lab Grade Purity • 99.8%
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-[var(--text-main)]">
            Unlock Your <br />
            <span className="text-gradient-hero">Biological Potential</span>
          </h1>
          
          <p className="text-lg text-[var(--text-muted)] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Premium bio-active peptides engineered for peak performance and rapid recovery. 
            Third-party tested for rigorous purity standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="group relative px-8 py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold text-sm uppercase tracking-wider overflow-hidden">
              <span className="relative z-10 group-hover:text-[var(--color-brand-primary)] transition-colors">Explore Catalog</span>
              <div className="absolute inset-0 bg-[var(--color-brand-dark)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </button>
            
            <button className="px-8 py-4 border border-[var(--glass-border)] text-[var(--text-main)] font-medium text-sm uppercase tracking-wider hover:bg-[var(--glass-bg)] transition-colors flex items-center justify-center gap-2">
              View Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-[var(--text-muted)]">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" />
                <span className="text-xs font-medium">HPLC Certified</span>
             </div>
             <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--color-brand-secondary)]" />
                <span className="text-xs font-medium">Research Grade</span>
             </div>
          </div>
        </motion.div>

        {/* Right: Visual Element (Glass Card with Data) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          {/* Main Glass Card */}
          <div className="glass-panel p-8 rounded-2xl relative z-10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
             <div className="flex justify-between items-start mb-8">
                <div>
                   <h3 className="text-2xl font-bold text-[var(--text-main)]">BPC-157</h3>
                   <p className="text-sm font-mono text-[var(--color-brand-primary)]">Sequence: Gly-Glu-Pro-Pro-Pro</p>
                </div>
                <div className="px-3 py-1 bg-[var(--color-brand-secondary)]/20 text-[var(--color-brand-secondary)] text-xs font-bold rounded">
                   IN STOCK
                </div>
             </div>
             
             {/* Fake Data Visualization */}
             <div className="space-y-4">
                <div className="h-2 bg-[var(--glass-border)] rounded-full overflow-hidden">
                   <div className="h-full w-[98%] bg-[var(--color-brand-primary)] shadow-[0_0_10px_var(--color-brand-primary)]" />
                </div>
                <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
                   <span>Purity Analysis</span>
                   <span>99.8%</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                   <div className="p-4 bg-[var(--bg-page)]/50 rounded border border-[var(--glass-border)]">
                      <p className="text-[10px] uppercase text-[var(--text-muted)]">Mass</p>
                      <p className="text-xl font-mono text-[var(--text-main)]">1419.5</p>
                   </div>
                   <div className="p-4 bg-[var(--bg-page)]/50 rounded border border-[var(--glass-border)]">
                      <p className="text-[10px] uppercase text-[var(--text-muted)]">Formula</p>
                      <p className="text-xl font-mono text-[var(--text-main)]">C62H98</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Decorative Elements behind card */}
          <div className="absolute top-10 -right-10 w-full h-full border border-[var(--color-brand-primary)]/30 rounded-2xl -z-10" />
          <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-gradient-to-tr from-[var(--color-brand-primary)] to-transparent opacity-20 blur-xl" />
        </motion.div>

      </div>
    </section>
  );
}