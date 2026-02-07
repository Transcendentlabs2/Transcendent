"use client";

import { motion } from "framer-motion";

export default function StockMeter({ stock, maxStock = 100 }: { stock: number, maxStock?: number }) {
  const percentage = Math.min(100, Math.max(0, (stock / maxStock) * 100));
  // Dividimos la barra en 20 segmentos
  const segments = Array.from({ length: 20 });
  const activeSegments = Math.ceil((percentage / 100) * 20);
  
  // Color lógico
  const colorClass = percentage < 30 ? "bg-red-500" : "bg-[var(--color-brand-primary)]";

  return (
    <div className="w-full space-y-2 mb-6 font-mono">
      <div className="flex justify-between items-end border-b border-[var(--glass-border)] pb-1 mb-2">
        <span className="text-[9px] uppercase text-[var(--text-muted)] tracking-widest">
            Batch_Availability_Level
        </span>
        <span className={`text-xs font-bold ${percentage < 30 ? "text-red-500 animate-pulse" : "text-[var(--text-main)]"}`}>
            {stock}<span className="text-[var(--text-muted)] text-[9px]">/UNIT</span>
        </span>
      </div>

      {/* Segmented Bar */}
      <div className="flex gap-[2px] h-2 w-full">
        {segments.map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < activeSegments ? 1 : 0.1 }}
                transition={{ delay: i * 0.02 }}
                className={`flex-1 rounded-[1px] ${i < activeSegments ? colorClass : "bg-[var(--text-muted)]"}`}
            />
        ))}
      </div>
      
      {percentage < 30 && (
          <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest">
                  Critical Low Stock Warning
              </p>
          </div>
      )}
    </div>
  );
}