"use client";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Activity, Globe, Zap, Database } from "lucide-react";

// Datos de la marquesina
const ITEMS = [
  { icon: Shield, text: "THIRD-PARTY TESTED" },
  { icon: Activity, text: "HPLC PURITY > 99.8%" },
  { icon: Globe, text: "USA MANUFACTURED" },
  { icon: Database, text: "BATCH TRACKING ENABLED" },
  { icon: CheckCircle, text: "ISO 9001 CERTIFIED" },
  { icon: Zap, text: "LYOPHILIZED STABILITY" },
];

export default function TrustTicker() {
  return (
    <div className="w-full bg-[var(--bg-page)] border-b border-[var(--glass-border)] py-4 overflow-hidden relative z-20">
      
      {/* Máscaras de gradiente para suavizar los bordes */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10" />

      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30, // Velocidad del loop
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 whitespace-nowrap px-8"
        >
          {/* Duplicamos la lista varias veces para asegurar el loop infinito sin cortes */}
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-default group">
              <item.icon className="w-4 h-4 text-[var(--color-brand-primary)] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold tracking-widest text-[var(--text-main)] uppercase">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}