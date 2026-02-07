"use client";

import { useState, useEffect } from "react";
import { Timer, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState("");

  // Configuración: El contador termina cada día a las 5:00 PM (hora de despacho)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(17, 0, 0, 0); // 5:00 PM

      // Si ya pasó la hora, configuramos para mañana
      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diff = cutoff.getTime() - now.getTime();
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}h : ${minutes
          .toString()
          .padStart(2, "0")}m : ${seconds.toString().padStart(2, "0")}s`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Ejecutar inmediatamente

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[var(--glass-bg)] border-y border-[var(--glass-border)] py-3 px-4 flex items-center justify-center gap-3 md:gap-6 overflow-hidden relative">
      {/* Fondo animado sutil */}
      <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
      
      <div className="flex items-center gap-2 relative z-10">
        <div className="p-1.5 bg-red-500/10 rounded-full text-red-500 animate-pulse">
            <Zap className="w-4 h-4 fill-current" />
        </div>
        <span className="text-xs md:text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">
          Same-Day Dispatch Ends In:
        </span>
      </div>

      <motion.div 
        key={timeLeft}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-lg md:text-xl font-bold text-[var(--color-brand-primary)] tabular-nums relative z-10"
      >
        {timeLeft}
      </motion.div>
    </div>
  );
}