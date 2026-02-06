"use client";
import { 
  Twitter, 
  Instagram, 
  Github, 
  ArrowUpRight, 
  ShieldCheck, 
  FileText, 
  Box 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-page)] border-t border-[var(--glass-border)] pt-14 pb-8 overflow-hidden z-10">
      
      {/* INYECCIÓN DE ESTILOS CSS PARA LA NUEVA ANIMACIÓN */}
      <style jsx global>{`
        @keyframes ascend {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          60% { transform: translateY(-30px) scale(0.5); opacity: 0.5; }
          100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }
        .animate-ascend {
          animation: ascend 3s ease-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Línea superior decorativa sutil */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--text-muted)]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-12">
          
          {/* --- IZQUIERDA: NUEVO ICONO "TRANSCENDENT CORE" --- */}
          <div className="flex-shrink-0 flex flex-col items-start">
             <div className="relative w-20 h-20 mb-4 text-[var(--color-brand-primary)]">
                {/* SVG PERSONALIZADO: El Núcleo Trascendente */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                   <defs>
                      {/* Gradiente para darle profundidad al núcleo */}
                      <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                         <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
                         <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
                      </radialGradient>
                   </defs>

                   {/* 1. Anillos Orbitales (Investigación Continua) */}
                   {/* Gira lento a la derecha */}
                   <g className="animate-[spin_12s_linear_infinite] origin-center opacity-40" style={{ willChange: 'transform' }}>
                      <ellipse cx="50" cy="50" rx="45" ry="20" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(45 50 50)" />
                   </g>
                   {/* Gira medio a la izquierda */}
                   <g className="animate-[spin_8s_linear_infinite_reverse] origin-center opacity-60" style={{ willChange: 'transform' }}>
                      <ellipse cx="50" cy="50" rx="45" ry="20" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(-45 50 50)" />
                   </g>

                   {/* 2. Núcleo Central Estable */}
                   <circle cx="50" cy="50" r="8" fill="url(#coreGrad)" className="animate-pulse" />
                   <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />

                   {/* 3. Partícula Ascendente ("Transcendent") - Usa la animación CSS personalizada */}
                   <circle cx="50" cy="50" r="3" fill="currentColor" className="animate-ascend" />
                </svg>
             </div>

             <div>
                <h3 className="font-display font-black text-xl tracking-tight text-[var(--text-main)]">TRANSCENDENT</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">Advanced Peptide Research</p>
             </div>
          </div>


          {/* --- DERECHA: LINKS (TIPOGRAFÍA MEJORADA) --- */}
          {/* Se eliminó font-mono de los enlaces para una estética más limpia */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 w-full">
             
             {/* Columna 1 */}
             <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] opacity-60">Explore</h4>
                {["Catalog", "New Arrivals", "Best Sellers", "Research Protocols"].map(item => (
                   <a key={item} href="#catalog" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-1 group">
                      <ArrowUpRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                   </a>
                ))}
             </div>

             {/* Columna 2 */}
             <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] opacity-60">Tools & Help</h4>
                {["Batch Verifier", "Peptide Calculator", "COA Database", "Support Center"].map(item => (
                   <a key={item} href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors">
                      {item}
                   </a>
                ))}
             </div>

             {/* Columna 3: Legal */}
             <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] opacity-60">Legal</h4>
                <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors group">
                   <Box className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> Shipping Policy
                </a>
                <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors group">
                   <ShieldCheck className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> Privacy Policy
                </a>
                <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors group">
                   <FileText className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> Terms & Conditions
                </a>
             </div>

          </div>
        </div>

        {/* --- BARRA INFERIOR (TIPOGRAFÍA LIMPIA) --- */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-6">
           
           {/* Disclaimer Legal - Ahora en fuente sans normal, más fácil de leer */}
           <p className="text-xs text-[var(--text-muted)] opacity-70 text-center md:text-left max-w-md leading-relaxed">
              <strong>Research Use Only.</strong> Not for human consumption, diagnostic, or therapeutic use. By using this site, you agree to our terms of service.
           </p>

           <div className="flex flex-col md:flex-row items-center gap-6">
               {/* Redes Sociales */}
               <div className="flex items-center gap-5">
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><Twitter className="w-4.5 h-4.5" /></a>
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><Instagram className="w-4.5 h-4.5" /></a>
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><Github className="w-4.5 h-4.5" /></a>
               </div>
               
               {/* Copyright - Mantenemos un toque sutil de mono aquí para el año */}
               <p className="text-xs text-[var(--text-muted)]">
                  © <span className="font-mono">{currentYear}</span> Transcendent Labs.
               </p>
           </div>
        </div>

      </div>
    </footer>
  );
}