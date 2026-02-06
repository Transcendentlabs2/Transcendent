"use client";
import { 
  Beaker, 
  Twitter, 
  Instagram, 
  Github, 
  ArrowUpRight, 
  ShieldCheck, 
  FileText, 
  Box, 
  Zap 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-page)] border-t border-[var(--glass-border)] pt-12 pb-6 overflow-hidden z-10">
      
      {/* --- DECORACIÓN SUPERIOR: LÍNEA DE ESCANEO --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-primary)] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
          
          {/* --- IZQUIERDA: BIO-REACTOR ANIMADO (LOGO) --- */}
          <div className="flex-shrink-0">
             <div className="relative w-24 h-24 flex items-center justify-center">
                {/* SVG REACTOR ANIMADO */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--color-brand-primary)]">
                   {/* Anillo Exterior (Gira lento) */}
                   <g className="animate-[spin_10s_linear_infinite] origin-center" style={{ willChange: 'transform' }}>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.5" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 80" />
                   </g>
                   
                   {/* Anillo Medio (Gira rápido inverso) */}
                   <g className="animate-[spin_5s_linear_infinite_reverse] origin-center" style={{ willChange: 'transform' }}>
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.8" />
                      <path d="M50 20 L50 30 M50 70 L50 80 M20 50 L30 50 M70 50 L80 50" stroke="currentColor" strokeWidth="2" />
                   </g>

                   {/* Núcleo Central (Pulso) */}
                   <circle cx="50" cy="50" r="15" fill="currentColor" className="animate-pulse" opacity="0.2" />
                   <Beaker className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--text-main)]" />
                </svg>
                
                {/* Icono estático centrado sobre el SVG */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <Beaker className="w-8 h-8 text-[var(--text-main)] drop-shadow-lg" />
                </div>
             </div>

             <div className="mt-4">
                <h3 className="font-display font-bold text-lg text-[var(--text-main)] tracking-tight">TRANSCENDENT</h3>
                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   Labs Online
                </p>
             </div>
          </div>


          {/* --- DERECHA: LINKS COMPACTOS --- */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
             
             {/* Columna 1 */}
             <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Catalog</h4>
                {["Peptides", "Supplies", "New Arrivals", "Best Sellers"].map(item => (
                   <a key={item} href="#catalog" className="text-xs text-[var(--text-main)] hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-1 group">
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                   </a>
                ))}
             </div>

             {/* Columna 2: Utility */}
             <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Support</h4>
                {["Track Order", "Batch Verifier", "Calculator", "Contact Us"].map(item => (
                   <a key={item} href="#" className="text-xs text-[var(--text-main)] hover:text-[var(--color-brand-primary)] transition-colors">
                      {item}
                   </a>
                ))}
             </div>

             {/* Columna 3: Legal (Solicitado) */}
             <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Compliance</h4>
                <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors">
                   <Box className="w-3 h-3" /> Shipping Policy
                </a>
                <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors">
                   <ShieldCheck className="w-3 h-3" /> Privacy Policy
                </a>
                <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 transition-colors">
                   <FileText className="w-3 h-3" /> Terms & Conditions
                </a>
             </div>

          </div>
        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="mt-12 pt-6 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4">
           
           {/* Disclaimer Legal (Muy pequeño para no estorbar) */}
           <p className="text-[9px] text-[var(--text-muted)] opacity-60 text-center md:text-left max-w-lg leading-relaxed uppercase font-mono">
              Research Use Only. Not for human consumption. Use implies acceptance of terms. 
           </p>

           {/* Redes Sociales */}
           <div className="flex items-center gap-4">
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors"><Github className="w-4 h-4" /></a>
           </div>

           <p className="text-[10px] text-[var(--text-muted)] font-mono">
              © {currentYear} Transcendent Labs.
           </p>
        </div>

      </div>
    </footer>
  );
}