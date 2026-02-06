"use client";
import { motion } from "framer-motion";
import { 
  Beaker, 
  Twitter, 
  Instagram, 
  Github, 
  ArrowUpRight, 
  Cpu, 
  Box, 
  FileText, 
  ShieldCheck 
} from "lucide-react";

// ENLACES PRINCIPALES (Los mismos del Navbar + Contexto)
const MAIN_LINKS = [
  { name: "Catalog", href: "#catalog" },
  { name: "Verify Batch", href: "#verification" },
  { name: "Peptide Calculator", href: "#calculator" },
  { name: "Science & Research", href: "#science" },
  { name: "FAQ / Support", href: "#faq" },
];

// ENLACES LEGALES & POLÍTICAS (Solicitados)
const LEGAL_LINKS = [
  { name: "Shipping Policies", href: "#", icon: Box },
  { name: "Return Policy", href: "#", icon: ArrowUpRight },
  { name: "Privacy Policy", href: "#", icon: ShieldCheck },
  { name: "Terms & Conditions", href: "#", icon: FileText },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-page)] pt-32 pb-10 overflow-hidden z-10 border-t border-[var(--glass-border)]">
      
      {/* --- 1. FONDO "HORIZON GRID" (ANIMACIÓN CSS PURA PARA SAFARI) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.05]">
        {/* El contenedor tiene perspectiva para dar efecto 3D */}
        <div 
            className="absolute inset-0 w-full h-[200%] -top-[50%] bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom animate-grid-flow will-change-transform"
        />
        {/* Máscara para suavizar los bordes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* --- COLUMNA 1: IDENTIDAD & MISIÓN (4 cols) --- */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center shadow-lg shadow-[var(--color-brand-primary)]/20">
                    <Beaker className="w-6 h-6" />
                 </div>
                 <span className="font-display font-black text-2xl tracking-tighter text-[var(--text-main)]">
                   TRANSCENDENT
                 </span>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-sm font-mono">
                Advancing the frontier of bio-active compound synthesis. Engineered for precision, purity, and research integrity.
              </p>
            </div>

            {/* Status Indicator */}
            <div className="mt-8 lg:mt-auto pt-6 border-t border-[var(--glass-border)] flex items-center gap-3">
               <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
               </span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-main)]">
                 System Operational
               </span>
            </div>
          </div>

          {/* --- COLUMNA 2: NAVEGACIÓN PRINCIPAL (4 cols) --- */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6 flex items-center gap-2">
               <Cpu className="w-3 h-3" /> Main Modules
            </h4>
            <ul className="space-y-4">
              {MAIN_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-[var(--text-main)] hover:text-[var(--color-brand-primary)] transition-colors"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-6 transition-all duration-300 opacity-0 group-hover:opacity-100 text-[var(--color-brand-primary)]">
                       <ArrowUpRight className="w-6 h-6" />
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMNA 3: LEGAL & SOCIAL (4 cols) --- */}
          <div className="lg:col-span-4 flex flex-col gap-10">
             
             {/* Legal Links */}
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
                   Compliance & Policies
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {LEGAL_LINKS.map((link) => (
                      <li key={link.name}>
                         <a href={link.href} className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-2 rounded-lg hover:bg-[var(--glass-bg)] border border-transparent hover:border-[var(--glass-border)]">
                            <link.icon className="w-3 h-3" />
                            {link.name}
                         </a>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Socials */}
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">
                   Connect
                </h4>
                <div className="flex gap-4">
                   {[Twitter, Instagram, Github].map((Icon, i) => (
                      <a 
                        key={i} 
                        href="#" 
                        className="w-10 h-10 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] hover:scale-110 transition-all duration-300"
                      >
                         <Icon className="w-4 h-4" />
                      </a>
                   ))}
                </div>
             </div>
          </div>

        </div>

        {/* --- DISCLAIMER & COPYRIGHT --- */}
        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           
           <div className="max-w-2xl">
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed text-justify uppercase font-mono tracking-tight opacity-70 hover:opacity-100 transition-opacity">
                 <strong>Research Use Only:</strong> Products provided by Transcendent Labs are strictly for in-vitro laboratory research. Not approved for human consumption, medical, or therapeutic use. Bodily introduction of any kind into humans or animals is strictly forbidden by law.
              </p>
           </div>

           <div className="text-right">
              <p className="text-[10px] font-mono text-[var(--text-muted)]">
                 © {currentYear} Transcendent Labs.
              </p>
              <p className="text-[10px] font-mono text-[var(--color-brand-primary)] opacity-50">
                 All Systems Nominal
              </p>
           </div>

        </div>

      </div>

      {/* --- ESTILOS GLOBALES PARA LA ANIMACIÓN (Agregar en tu CSS global o aquí) --- */}
      <style jsx global>{`
        @keyframes grid-flow {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }
        .animate-grid-flow {
          animation: grid-flow 2s linear infinite;
        }
      `}</style>
    </footer>
  );
}