"use client";
import { 
  Beaker, Twitter, Instagram, Github, 
  Box, ShieldCheck, FileText, Scale, 
  ArrowRight, Zap 
} from "lucide-react";

// ENLACES PRINCIPALES (Internos de la App)
const SITE_LINKS = [
  { name: "Catalog Explorer", href: "#catalog", desc: "Browse compounds" },
  { name: "Batch Verifier", href: "#verification", desc: "Check purity COAs" },
  { name: "Peptide Calculator", href: "#calculator", desc: "Reconstitution tools" },
  { name: "Research Protocols", href: "#science", desc: "Methodology" },
  { name: "Knowledge Base", href: "#faq", desc: "FAQ & Support" },
];

// ENLACES LEGALES (Placeholder)
const LEGAL_LINKS = [
  { name: "Shipping Policy", href: "#", icon: Box },
  { name: "Returns & Refunds", href: "#", icon: ArrowRight },
  { name: "Privacy Policy", href: "#", icon: ShieldCheck },
  { name: "Terms of Service", href: "#", icon: FileText },
  { name: "Legal Disclaimer", href: "#", icon: Scale },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Usamos text-[var(--text-muted)] en el contenedor padre para que el SVG herede el color con currentColor
    <footer className="relative bg-[var(--bg-page)] pt-24 pb-12 overflow-hidden z-10 border-t border-[var(--glass-border)] text-[var(--text-muted)]">
      
      {/* --- FONDO SVG ANIMADO "REACTOR CORE" (OPTIMIZADO SAFARI) --- */}
      {/* pointer-events-none para que no bloquee el scroll */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-10 dark:opacity-20">
        <svg 
          viewBox="0 0 800 800" 
          className="w-[150%] h-[150%] md:w-full md:h-full" // Más grande en móvil para efecto inmersivo
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        >
          <defs>
             {/* Degradado sutil para dar profundidad a las líneas */}
             <radialGradient id="reactorGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="var(--text-main)" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0.8"/>
             </radialGradient>
          </defs>
          
          {/* CAPA 1: Anillo Exterior Lento (Gira a la derecha) */}
          {/* will-change-transform fuerza la GPU en Safari */}
          <g className="animate-[spin_120s_linear_infinite]" style={{ willChange: 'transform', transformOrigin: 'center' }}>
            <circle cx="400" cy="400" r="350" strokeDasharray="4 4" />
            <circle cx="400" cy="400" r="380" strokeOpacity="0.3" />
            {/* Decoraciones hexagonales externas */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <g key={angle} transform={`rotate(${angle} 400 400) translate(0 -350)`}>
                 <path d="M0 -20 L17.3 10 H-17.3 Z" transform="rotate(180)" opacity="0.5" />
              </g>
            ))}
          </g>

          {/* CAPA 2: Núcleo Central Rápido (Gira a la izquierda) */}
          <g className="animate-[spin_60s_linear_infinite_reverse]" style={{ willChange: 'transform', transformOrigin: 'center' }}>
            <circle cx="400" cy="400" r="150" stroke="url(#reactorGrad)" strokeWidth="1" />
            <circle cx="400" cy="400" r="100" strokeDasharray="2 2" />
            {/* Estructura molecular central */}
            <path d="M400 250 L530 325 L530 475 L400 550 L270 475 L270 325 Z" strokeOpacity="0.7" />
            <path d="M400 280 L504 340 L504 460 L400 520 L296 460 L296 340 Z" strokeDasharray="10 5" opacity="0.5" />
          </g>

          {/* CAPA 3: Punto Central Pulsante (Estático) */}
          <circle cx="400" cy="400" r="20" fill="var(--color-brand-primary)" opacity="0.2">
             <animate attributeName="r" values="20;25;20" dur="4s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>


      {/* --- CONTENIDO DEL FOOTER --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DEL FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
           <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--text-main)] text-[var(--bg-page)] rounded-xl shadow-lg shadow-[var(--color-brand-primary)]/20">
                 <Beaker className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="font-display font-black text-xl tracking-tight text-[var(--text-main)]">TRANSCENDENT LABS</h3>
                 <p className="text-xs font-mono tracking-widest text-[var(--color-brand-secondary)] flex items-center gap-1">
                    <Zap className="w-3 h-3" /> QUANTUM LINK ESTABLISHED
                 </p>
              </div>
           </div>
           <div className="text-right hidden md:block">
              <p className="text-xs font-mono uppercase text-[var(--text-muted)]">Research Grade Materials</p>
           </div>
        </div>


        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
           
           {/* COLUMNA IZQUIERDA: NAVEGACIÓN PRINCIPAL (Grande) */}
           <div className="lg:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-8 font-mono">
                 // System Navigation
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                 {SITE_LINKS.map((link) => (
                    <li key={link.name}>
                       <a href={link.href} className="group block">
                          <div className="flex items-center gap-2 mb-1">
                             <ArrowRight className="w-4 h-4 text-[var(--color-brand-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                             <span className="text-xl md:text-2xl font-display font-bold text-[var(--text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                                {link.name}
                             </span>
                          </div>
                          <p className="text-xs font-mono text-[var(--text-muted)] pl-6 opacity-60 group-hover:opacity-100 transition-opacity">
                             {link.desc}
                          </p>
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* COLUMNA DERECHA: LEGAL Y SOCIAL (Compacto) */}
           <div className="lg:col-span-5 flex flex-col gap-10 lg:border-l border-[var(--glass-border)] lg:pl-12">
              
              {/* Legal */}
              <div>
                 <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6 font-mono">
                    // Compliance Protocols
                 </h4>
                 <ul className="space-y-3">
                    {LEGAL_LINKS.map((link) => (
                       <li key={link.name}>
                          <a href={link.href} className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors group">
                             <div className="p-1.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] group-hover:border-[var(--text-muted)] transition-colors">
                                <link.icon className="w-3.5 h-3.5" />
                             </div>
                             {link.name}
                          </a>
                       </li>
                    ))}
                 </ul>
              </div>

              {/* Social */}
              <div>
                 <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 font-mono">
                    // Connect
                 </h4>
                 <div className="flex gap-3">
                    {[Twitter, Instagram, Github].map((Icon, i) => (
                       <a 
                         key={i} 
                         href="#" 
                         className="p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] hover:scale-105 transition-all"
                       >
                          <Icon className="w-5 h-5" />
                       </a>
                    ))}
                 </div>
              </div>

           </div>
        </div>


        {/* BOTTOM BAR & DISCLAIMER */}
        <div className="border-t border-[var(--glass-border)] pt-8">
           <div className="p-4 bg-[var(--bg-page)]/50 backdrop-blur-md rounded-2xl border border-[var(--glass-border)] mb-8">
              <p className="text-[10px] leading-relaxed text-justify uppercase font-mono text-[var(--text-muted)] opacity-80">
                 <strong>Research Use Only Disclaimer:</strong> All compounds offered by Transcendent Labs are strictly for in-vitro laboratory research and development purposes. They are NOT intended for human or animal consumption, diagnostic, therapeutic, or any other use. By accessing this site, you verify that you are a qualified researcher and agree to our terms of service.
              </p>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase text-[var(--text-muted)]">
              <p>© {currentYear} Transcendent Labs. All rights reserved.</p>
              <p>Secure Encrypted Connection (SSL)</p>
           </div>
        </div>

      </div>
    </footer>
  );
}