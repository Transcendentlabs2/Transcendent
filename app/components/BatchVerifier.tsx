"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, FileBarChart, Microscope, AlertCircle, ScanLine } from "lucide-react";

// Definimos la estructura de los datos
interface BatchData {
  product: string;
  purity: string;
  date: string;
  status: string;
}

// Datos simulados
const BATCH_DB: Record<string, BatchData> = {
  "A1092": { product: "TESAMORELIN", purity: "99.8%", date: "2024-01-15", status: "PASSED" },
  "B2024": { product: "BPC-157", purity: "99.9%", date: "2024-02-10", status: "PASSED" },
  "S5050": { product: "SEMAGLUTIDE", purity: "99.5%", date: "2024-03-01", status: "PASSED" },
  "T3001": { product: "TB-500", purity: "99.7%", date: "2024-03-10", status: "PASSED" },
};

export default function BatchVerifier() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<BatchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResult(null);
    setError(false);

    // Simular delay de red
    setTimeout(() => {
      const data = BATCH_DB[query.toUpperCase().trim()];
      if (data) {
        setResult(data);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (error) setError(false); // Limpia el error apenas el usuario escribe (Mejor UX)
  };

  return (
    // USAMOS var(--bg-page) PARA QUE EL CAMBIO DE TEMA SEA INSTANTÁNEO Y PERFECTO
    <section className="py-24 px-4 border-y border-[var(--glass-border)] bg-[var(--bg-page)] transition-colors duration-500 relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-brand-primary)]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-brand-secondary)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="mb-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-[var(--color-brand-primary)]/20">
              <Microscope className="w-3.5 h-3.5" />
              <span>Quality Assurance Database</span>
           </div>
           
           <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-main)] mb-4">
             Verify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">Research</span>
           </h2>
           <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
             Transparency is our core protocol. Enter the lot number found on your vial to view the HPLC purity report and mass spectrometry analysis.
           </p>
        </div>

        {/* Search Box Container */}
        <div className="relative max-w-md mx-auto mb-12">
           <form onSubmit={handleSearch} className="relative flex items-center group">
              {/* Icono de escaneo decorativo */}
              <div className="absolute left-4 text-[var(--text-muted)]">
                 <ScanLine className="w-5 h-5 opacity-50" />
              </div>

              <input 
                type="text" 
                placeholder="ENTER LOT # (E.G., A1092)"
                value={query}
                onChange={handleInputChange}
                // OPTIMIZACIÓN SAFARI: text-base (16px) evita que el iPhone haga zoom al hacer focus
                className="w-full bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-14 text-base font-mono font-bold text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all uppercase shadow-lg shadow-black/5"
              />
              
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 p-2.5 bg-[var(--text-main)] text-[var(--bg-page)] rounded-xl hover:scale-105 hover:bg-[var(--color-brand-primary)] hover:text-white disabled:opacity-50 disabled:scale-100 transition-all shadow-md"
              >
                 {loading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                 ) : (
                    <Search className="w-5 h-5" />
                 )}
              </button>
           </form>
           
           <p className="mt-3 text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest opacity-70">
              Try searching: <span className="text-[var(--text-main)] font-bold">A1092</span>, <span className="text-[var(--text-main)] font-bold">B2024</span>
           </p>
        </div>

        {/* Results Area */}
        {/* min-h fijado para evitar saltos de layout */}
        <div className="min-h-[200px] relative flex justify-center items-start">
           <AnimatePresence mode="wait">
             
             {/* SUCCESS STATE */}
             {result && (
               <motion.div
                 key="result"
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 // OPTIMIZACIÓN SAFARI: transform-gpu
                 className="w-full max-w-lg bg-white dark:bg-[#111] border border-green-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden transform-gpu"
               >
                  {/* Barra superior de éxito */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 to-emerald-600" />
                  
                  <div className="flex justify-between items-start mb-6 mt-2">
                     <div className="text-left">
                        <h3 className="text-xl font-display font-bold text-[var(--text-main)] tracking-tight">{result.product}</h3>
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                           <CheckCircle className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-bold uppercase tracking-wider">Analysis Verified</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold mb-1">Purity Score</p>
                        <p className="text-4xl font-mono font-bold text-[var(--text-main)] tracking-tighter">{result.purity}</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-left border-t border-dashed border-gray-200 dark:border-white/10 pt-5">
                     <div>
                        <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Analysis Date</p>
                        <p className="text-sm font-mono font-medium text-[var(--text-main)]">{result.date}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Method</p>
                        <p className="text-sm font-mono font-medium text-[var(--text-main)]">HPLC / MS</p>
                     </div>
                  </div>

                  <button className="mt-6 w-full py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[var(--text-main)] rounded-xl transition-colors border border-gray-200 dark:border-white/5">
                     <FileBarChart className="w-4 h-4" /> Download Full COA (PDF)
                  </button>
               </motion.div>
             )}

             {/* ERROR STATE */}
             {error && (
               <motion.div
                 key="error"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ 
                   opacity: 1, 
                   scale: 1,
                   x: [0, -10, 10, -5, 5, 0] // Shake effect
                 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4 }}
                 className="w-full max-w-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-5 flex items-center gap-5 shadow-lg transform-gpu"
               >
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                     <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-left">
                     <h4 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide">Batch Not Found</h4>
                     <p className="text-xs text-red-600/80 dark:text-red-300/70 mt-1 leading-relaxed">
                        The lot number <span className="font-mono font-bold text-red-700 dark:text-red-300">"{query}"</span> does not exist in our database. Please check the label again.
                     </p>
                  </div>
               </motion.div>
             )}

           </AnimatePresence>
        </div>

      </div>
    </section>
  );
}