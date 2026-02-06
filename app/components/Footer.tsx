"use client";
import Image from "next/image";
import { 
  Twitter, 
  Instagram, 
  Github, 
  ShieldCheck, 
  FileText, 
  Box,
  FlaskConical
} from "lucide-react";

import logo from "../assets/logo.webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-page)] border-t border-[var(--glass-border)] pt-20 pb-10 overflow-hidden z-10">
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-chemical {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; will-change: transform; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; will-change: transform; }
        .animate-pulse-chemical { animation: pulse-chemical 4s ease-in-out infinite; }
      `}</style>

      {/* Grid de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-16">
          
          {/* --- BLOQUE DE MARCA --- */}
          <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-start">
             <div className="relative group mb-8">
                <div className="absolute inset-0 bg-[var(--color-brand-primary)] blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-700 rounded-full" />
                <div className="relative bg-[var(--bg-page)]/60 backdrop-blur-xl border border-[var(--glass-border)] p-6 rounded-2xl shadow-2xl flex items-center gap-6 overflow-hidden">
                   <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                      <Image src={logo} alt="Logo" fill className="object-contain" />
                   </div>
                   <div className="w-[1px] h-10 bg-[var(--glass-border)]" />
                   <div className="w-14 h-14 md:w-16 md:h-16 text-[var(--color-brand-primary)] relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                         <g className="animate-spin-slow origin-center">
                            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
                            <path d="M50 2 A48 48 0 0 1 98 50" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
                            <path d="M50 98 A48 48 0 0 1 2 50" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
                         </g>
                         <g className="animate-spin-reverse origin-center">
                            <path d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
                         </g>
                         <g className="animate-pulse-chemical origin-center">
                            <FlaskConical className="w-5 h-5 x-center y-center text-[var(--text-main)]" x="40" y="40" />
                         </g>
                      </svg>
                   </div>
                </div>
             </div>
             <div>
                <h2 className="font-display font-black text-3xl tracking-tighter text-[var(--text-main)] leading-none">TRANSCENDENT</h2>
                <h2 className="font-display font-black text-3xl tracking-tighter text-[var(--text-muted)] leading-none mb-4">LABS</h2>
                <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
                   Next-generation peptide synthesis. Engineered for precision, purity, and bioavailability.
                </p>
             </div>
          </div>

          {/* --- ENLACES CONECTADOS A LAS SECCIONES --- */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 w-full pt-4">
             
             {/* Columna 1: Laboratory */}
             <div className="flex flex-col gap-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] border-b border-[var(--glass-border)] pb-2 w-fit">
                   Laboratory
                </h4>
                {/* Estos llevan al Catálogo y Ciencia */}
                <a href="#catalog" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-2 group w-fit">
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--glass-border)] group-hover:bg-[var(--color-brand-primary)] transition-colors" />
                   Full Catalog
                </a>
                <a href="#catalog" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-2 group w-fit">
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--glass-border)] group-hover:bg-[var(--color-brand-primary)] transition-colors" />
                   New Arrivals
                </a>
                <a href="#science" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-2 group w-fit">
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--glass-border)] group-hover:bg-[var(--color-brand-primary)] transition-colors" />
                   Research Protocols
                </a>
             </div>

             {/* Columna 2: Systems */}
             <div className="flex flex-col gap-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] border-b border-[var(--glass-border)] pb-2 w-fit">
                   Systems
                </h4>
                {/* Estos llevan a Verificación, Calculadora y FAQ */}
                <a href="#verification" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors w-fit">Batch Verifier</a>
                <a href="#calculator" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors w-fit">Peptide Calculator</a>
                <a href="#verification" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors w-fit">COA Database</a>
                <a href="#faq" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors w-fit">Support Center</a>
             </div>

             {/* Columna 3: Legal (Estos usualmente son páginas aparte, los dejo en #) */}
             <div className="flex flex-col gap-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] border-b border-[var(--glass-border)] pb-2 w-fit">
                   Legal
                </h4>
                <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors group w-fit">
                   <Box className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> Shipping Policy
                </a>
                <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors group w-fit">
                   <ShieldCheck className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> Privacy Policy
                </a>
                <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors group w-fit">
                   <FileText className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> Terms & Conditions
                </a>
             </div>

          </div>
        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] text-[var(--text-muted)] opacity-70 text-center md:text-left max-w-lg leading-relaxed font-medium">
              <strong>RESEARCH USE ONLY.</strong> NOT FOR HUMAN CONSUMPTION.
              <br className="hidden md:block"/>
              By accessing this site, you acknowledge that you are a qualified researcher.
           </p>

           <div className="flex flex-col md:flex-row items-center gap-6">
               <div className="flex items-center gap-5">
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] hover:scale-110 transition-all"><Twitter className="w-4.5 h-4.5" /></a>
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] hover:scale-110 transition-all"><Instagram className="w-4.5 h-4.5" /></a>
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] hover:scale-110 transition-all"><Github className="w-4.5 h-4.5" /></a>
               </div>
               <p className="text-xs text-[var(--text-muted)] font-bold">
                  © {currentYear} Transcendent Labs.
               </p>
           </div>
        </div>

      </div>
    </footer>
  );
}