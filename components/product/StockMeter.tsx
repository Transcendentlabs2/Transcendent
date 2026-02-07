"use client";

import { motion } from "framer-motion";

export default function StockMeter({ stock, maxStock = 100 }: { stock: number, maxStock?: number }) {
  // Calculamos porcentaje (invertido para urgencia)
  const percentage = Math.min(100, Math.max(0, (stock / maxStock) * 100));
  
  // Color dinámico: Rojo si es bajo (<30%), Amarillo si es medio, Verde si es alto
  const color = percentage < 30 ? "bg-red-500" : percentage < 60 ? "bg-amber-400" : "bg-emerald-500";
  const textColor = percentage < 30 ? "text-red-500" : "text-[var(--text-main)]";

  return (
    <div className="w-full space-y-2 mb-6">
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">
            Current Batch Availability
        </span>
        <span className={`text-xs font-bold font-mono ${textColor} animate-pulse`}>
            {stock} Units Left
        </span>
      </div>

      {/* Barra de Progreso */}
      <div className="h-2 w-full bg-[var(--glass-border)] rounded-full overflow-hidden relative">
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full absolute left-0 top-0 rounded-full ${color} shadow-[0_0_10px_currentColor]`}
        />
        {/* Efecto de brillo barriendo la barra */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      
      {percentage < 30 && (
          <p className="text-[10px] text-red-400 mt-1 font-bold italic">
              * High demand detected. Batch likely to sell out today.
          </p>
      )}
    </div>
  );
}