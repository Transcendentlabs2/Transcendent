"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Pipette, Syringe, Info, PlayCircle, ExternalLink } from "lucide-react";

export default function PeptideCalculator() {
  const [vialQty, setVialQty] = useState<number>(5); 
  const [waterVol, setWaterVol] = useState<number>(2); 
  const [dose, setDose] = useState<number>(250); 
  
  const [resultTick, setResultTick] = useState<number>(0);
  const [resultVol, setResultVol] = useState<number>(0); 
  const [concentration, setConcentration] = useState<number>(0); 

  useEffect(() => {
    const conc = vialQty / waterVol;
    setConcentration(conc);
    const doseInMg = dose / 1000;
    const volumeToInject = doseInMg / conc;
    setResultVol(volumeToInject);
    const ticks = volumeToInject * 100;
    setResultTick(ticks);
  }, [vialQty, waterVol, dose]);

  // Altura máxima del líquido dentro de la jeringa SVG
  const MAX_LIQUID_HEIGHT = 300;

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto z-10" id="calculator">
      
      {/* Header Sección */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--glass-border)] pb-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg">
            <Calculator className="w-6 h-6 text-[var(--color-brand-primary)]" />
            </div>
            <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)]">
                Reconstitution <span className="text-[var(--text-muted)]">Protocol</span>
            </h2>
            <p className="text-xs font-mono text-[var(--color-brand-secondary)] mt-1 uppercase tracking-widest">
                // Precision_Dosing_Engine_v2.1
            </p>
            </div>
        </div>

        {/* BOTÓN AL VIDEO DE YOUTUBE */}
        <a 
            href="https://www.youtube.com/watch?v=KARFHZprtbQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-[var(--bg-page)]/50 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer"
        >
            <div className="relative">
                <PlayCircle className="w-5 h-5 text-[var(--text-muted)] group-hover:text-red-500 transition-colors" />
                <span className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity"></span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-main)]">
                    Visual Guide
                </span>
                <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
                    Watch Protocol <ExternalLink className="w-3 h-3 opacity-50" />
                </span>
            </div>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* COLUMNA IZQUIERDA: INPUTS */}
        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-primary)] opacity-5 blur-[50px] rounded-full pointer-events-none" />

          <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
            {/* Inputs (sin cambios) */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
                <span className="flex items-center gap-2"><Pipette className="w-4 h-4 text-[var(--color-brand-primary)]" /> Peptide Vial Quantity</span>
                <span className="text-[var(--color-brand-secondary)] font-mono text-xs">{vialQty} mg</span>
              </label>
              <div className="relative flex items-center">
                 <input type="number" value={vialQty} onChange={(e) => setVialQty(Number(e.target.value))} className="w-full bg-[var(--bg-page)]/50 border border-[var(--glass-border)] text-[var(--text-main)] rounded-lg p-4 pl-4 focus:border-[var(--color-brand-primary)] focus:outline-none font-mono text-lg transition-colors" />
                 <span className="absolute right-4 text-[var(--text-muted)] font-mono text-sm">mg</span>
              </div>
              <input type="range" min="1" max="20" step="1" value={vialQty} onChange={(e) => setVialQty(Number(e.target.value))} className="w-full accent-[var(--color-brand-primary)] h-1 bg-[var(--glass-border)] rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
                <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-[var(--color-brand-secondary)] flex items-center justify-center text-[8px] font-mono">H2O</span> Bacteriostatic Water</span>
                <span className="text-[var(--color-brand-secondary)] font-mono text-xs">{waterVol} ml</span>
              </label>
              <div className="relative flex items-center">
                 <input type="number" value={waterVol} onChange={(e) => setWaterVol(Number(e.target.value))} className="w-full bg-[var(--bg-page)]/50 border border-[var(--glass-border)] text-[var(--text-main)] rounded-lg p-4 pl-4 focus:border-[var(--color-brand-secondary)] focus:outline-none font-mono text-lg transition-colors" />
                 <span className="absolute right-4 text-[var(--text-muted)] font-mono text-sm">ml</span>
              </div>
              <input type="range" min="1" max="10" step="0.5" value={waterVol} onChange={(e) => setWaterVol(Number(e.target.value))} className="w-full accent-[var(--color-brand-secondary)] h-1 bg-[var(--glass-border)] rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
                <span className="flex items-center gap-2"><Syringe className="w-4 h-4 text-rose-500" /> Desired Dosage</span>
                <span className="text-rose-500 font-mono text-xs">{dose} mcg</span>
              </label>
              <div className="relative flex items-center">
                 <input type="number" value={dose} onChange={(e) => setDose(Number(e.target.value))} className="w-full bg-[var(--bg-page)]/50 border border-[var(--glass-border)] text-[var(--text-main)] rounded-lg p-4 pl-4 focus:border-rose-500 focus:outline-none font-mono text-lg transition-colors" />
                 <span className="absolute right-4 text-[var(--text-muted)] font-mono text-sm">mcg</span>
              </div>
              <input type="range" min="50" max="2000" step="50" value={dose} onChange={(e) => setDose(Number(e.target.value))} className="w-full accent-rose-500 h-1 bg-[var(--glass-border)] rounded-lg appearance-none cursor-pointer" />
            </div>
          </form>
        </div>

        {/* COLUMNA DERECHA: JERINGA Y RESULTADOS */}
        <div className="flex flex-col items-center justify-center relative">
           
           {/* Resultados numéricos */}
           <div className="w-full mb-8 glass-panel border border-[var(--color-brand-primary)]/30 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[var(--color-brand-primary)]/5 group-hover:bg-[var(--color-brand-primary)]/10 transition-colors" />
              <div className="relative z-10 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">Draw to Tick Mark</p>
                    <div className="text-5xl font-display font-bold text-[var(--text-main)]">
                      {resultTick.toFixed(1)} <span className="text-lg text-[var(--color-brand-primary)]">IU</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">Volume Equivalent</p>
                    <p className="text-2xl font-mono text-[var(--text-main)]">{resultVol.toFixed(3)} <span className="text-sm">ml</span></p>
                  </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex gap-4 text-[10px] font-mono text-[var(--text-muted)]">
                 <span>CONCENTRATION: {concentration.toFixed(2)} mg/ml</span>
                 <span>SYRINGE TYPE: U-100 (Standard)</span>
              </div>
           </div>

           {/* VISUAL SYRINGE (SVG CON CORRECCIÓN DE DESBORDAMIENTO) */}
           <div className="relative w-full max-w-[200px] h-[400px]">
              <svg viewBox="0 0 100 400" className="w-full h-full drop-shadow-2xl">
                 
                 {/* 1. DEFINICIÓN DE LA MÁSCARA DE RECORTE (CLIP PATH) */}
                 {/* Esta forma define el área "segura" donde se puede dibujar el líquido */}
                 <defs>
                   <clipPath id="syringe-inner-body">
                      {/* Usamos la misma geometría que el cuerpo de la jeringa */}
                      <rect x="30" y="20" width="40" height="300" rx="2" />
                   </clipPath>
                 </defs>

                 {/* 2. CUERPO DE LA JERINGA */}
                 <rect x="30" y="20" width="40" height="300" rx="2" fill="var(--bg-page)" stroke="var(--text-muted)" strokeWidth="2" fillOpacity="0.5" />
                 
                 {/* 3. LÍQUIDO ANIMADO (CON CLIP PATH APLICADO) */}
                 <motion.rect 
                    // APLICAMOS LA MÁSCARA AQUÍ:
                    clipPath="url(#syringe-inner-body)"
                    // Ajustamos X y Width para que llenen mejor el espacio dentro del borde
                    x="30" 
                    width="40"
                    // Cálculo de posición y altura
                    y={320 - (resultTick * 3)} 
                    height={resultTick * 3} 
                    fill="var(--color-brand-primary)" 
                    opacity="0.6"
                    initial={{ height: 0 }}
                    // Aseguramos que la animación no exceda la altura máxima
                    animate={{ height: Math.min(resultTick * 3, MAX_LIQUID_HEIGHT), y: 320 - Math.min(resultTick * 3, MAX_LIQUID_HEIGHT) }}
                    transition={{ type: "spring", stiffness: 50 }}
                 />

                 {/* 4. MARCAS DE GRADUACIÓN */}
                 {[...Array(11)].map((_, i) => (
                    <g key={i} transform={`translate(0, ${320 - (i * 30)})`}>
                       <line x1="30" y1="0" x2="45" y2="0" stroke="var(--text-muted)" strokeWidth="1" />
                       <text x="20" y="4" fontSize="10" fill="var(--text-muted)" textAnchor="end" fontFamily="monospace">{i * 10}</text>
                    </g>
                 ))}

                 {/* 5. ÉMBOLO ANIMADO */}
                 <motion.g 
                    initial={{ y: 0 }}
                    // Aseguramos que el émbolo no baje más allá del tope
                    animate={{ y: -Math.min(resultTick * 3, MAX_LIQUID_HEIGHT) }}
                    transition={{ type: "spring", stiffness: 50 }}
                 >
                    <rect x="32" y="320" width="36" height="10" fill="#333" />
                    <rect x="45" y="330" width="10" height="80" fill="#ccc" opacity="0.5" />
                    <circle cx="50" cy="415" r="15" fill="var(--bg-page)" stroke="#ccc" strokeWidth="2" />
                 </motion.g>

                 {/* Aguja */}
                 <line x1="50" y1="20" x2="50" y2="0" stroke="var(--text-muted)" strokeWidth="1" />
              </svg>
              
              {/* ETIQUETA FLOTANTE */}
              <motion.div 
                 className="absolute left-[180px]"
                 initial={{ top: "80%" }}
                 // Ajustamos el cálculo para que la etiqueta siga el tope del líquido
                 animate={{ top: `${80 - (Math.min(resultTick, 100) * 0.75)}%` }} 
              >
                 <div className="bg-[var(--color-brand-primary)] text-[var(--bg-page)] text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {resultTick.toFixed(0)} IU
                 </div>
              </motion.div>
           </div>

           <div className="mt-4 flex items-start gap-2 max-w-xs text-center">
              <Info className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-[var(--text-muted)]">
                 *Visualization based on a standard 1ml U-100 Insulin Syringe.
              </p>
           </div>

        </div>

      </div>
    </section>
  );
}