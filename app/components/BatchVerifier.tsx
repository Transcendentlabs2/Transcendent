"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, FileBarChart, Microscope, AlertCircle } from "lucide-react";

// Definimos la estructura de los datos para evitar errores de tipo
interface BatchData {
  product: string;
  purity: string;
  date: string;
  status: string;
}

// Datos simulados de lotes
const BATCH_DB: Record<string, BatchData> = {
  "A1092": { product: "TESAMORELIN", purity: "99.8%", date: "2024-01-15", status: "PASSED" },
  "B2024": { product: "BPC-157", purity: "99.9%", date: "2024-02-10", status: "PASSED" },
  "S5050": { product: "SEMAGLUTIDE", purity: "99.5%", date: "2024-03-01", status: "PASSED" },
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

    // Simular delay de red "buscando en base de datos"
    setTimeout(() => {
      const data = BATCH_DB[query.toUpperCase().trim()];
      if (data) {
        setResult(data);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-24 px-4 border-y border-[var(--glass-border)] bg-[#F5F5F5] dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="mb-8">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-mono uppercase tracking-widest mb-4">
              <Microscope className="w-3 h-3" />
              <span>Quality Assurance Database</span>
           </div>
           <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-main)] mb-4">
             Verify Your <span className="text-[var(--color-brand-primary)]">Research</span>
           </h2>
           <p className="text-[var(--text-muted)] max-w-xl mx-auto">
             Transparency is our core protocol. Enter the lot number found on your vial to view the HPLC purity report and mass spectrometry analysis.
           </p>
        </div>

        {/* Search Box Container */}
        <div className="relative max-w-md mx-auto mb-12 z-10">
           <form onSubmit={handleSearch} className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Enter Lot # (e.g., A1092)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white dark:bg-black/50 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-full py-4 pl-6 pr-14 text-sm font-mono focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all uppercase"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 p-2 bg-[var(--text-main)] text-[var(--bg-page)] rounded-full hover:scale-105 disabled:opacity-50 transition-all"
              >
                 {loading ? <div className="w-5 h-5 border-2 border-t-transparent border-[var(--bg-page)] rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
           </form>
           
           {/* Sugerencia visual */}
           <p className="mt-2 text-[10px] text-gray-400 font-mono">Try: A1092, B2024</p>
        </div>

        {/* Results Area */}
        <div className="h-48 relative flex justify-center items-start">
           <AnimatePresence mode="wait">
             
             {/* SUCCESS STATE */}
             {result && (
               <motion.div
                 key="result"
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-lg bg-white dark:bg-[#111] border border-green-500/30 rounded-xl p-6 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
                  <div className="flex justify-between items-start mb-6">
                     <div className="text-left">
                        <h3 className="text-lg font-bold text-[var(--text-main)]">{result.product}</h3>
                        <p className="text-xs text-green-600 dark:text-green-400 font-mono flex items-center gap-1 mt-1">
                           <CheckCircle className="w-3 h-3" /> ANALYSIS VERIFIED
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Purity Score</p>
                        <p className="text-3xl font-bold text-[var(--text-main)] font-mono">{result.purity}</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-left border-t border-dashed border-gray-200 dark:border-gray-800 pt-4">
                     <div>
                        <p className="text-[10px] text-[var(--text-muted)]">Analysis Date</p>
                        <p className="text-sm font-medium">{result.date}</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-[var(--text-muted)]">Method</p>
                        <p className="text-sm font-medium">HPLC / MS</p>
                     </div>
                  </div>

                  <button className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                     <FileBarChart className="w-3 h-3" /> Download Full COA (PDF)
                  </button>
               </motion.div>
             )}

             {/* ERROR STATE CORREGIDO */}
             {error && (
               <motion.div
                 key="error"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, -10, 10, -5, 5, 0] // Keyframes para el efecto shake
                 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4, ease: "easeInOut" }}
                 className="w-full max-w-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-xl p-4 flex items-center gap-4"
               >
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <div className="text-left">
                     <h4 className="text-sm font-bold text-red-700 dark:text-red-400">Batch Not Found</h4>
                     <p className="text-xs text-red-600 dark:text-red-300/80">
                        Please check the number and try again or contact support.
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