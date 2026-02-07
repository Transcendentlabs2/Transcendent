"use client";

import { useState, useEffect } from "react";
import { Timer, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(17, 0, 0, 0); 
      if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);
      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050505] border-b border-[var(--glass-border)] py-2 px-4 flex items-center justify-between md:justify-center gap-4 relative overflow-hidden">
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-500 animate-pulse" />

      <div className="flex items-center gap-2 z-10">
        <AlertCircle className="w-3 h-3 text-red-500" />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] hidden md:inline-block">
          Logistic Cutoff Sequence Initiated
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] md:hidden">
          Dispatch Cutoff
        </span>
      </div>

      <div className="flex items-center gap-2 z-10">
        <span className="text-[10px] font-mono text-red-500 animate-pulse">●</span>
        <motion.div 
          key={timeLeft}
          className="font-mono text-sm font-bold text-[var(--text-main)] tabular-nums tracking-widest"
        >
          {timeLeft}
        </motion.div>
      </div>
    </div>
  );
}