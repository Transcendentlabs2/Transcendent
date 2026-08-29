"use client";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Activity, Database, FlaskConical, FileCheck2 } from "lucide-react";

const ITEMS = [
  { icon: FileCheck2, text: "PUBLIC COA LIBRARY" },
  { icon: Database, text: "LOT TRACEABILITY" },
  { icon: Activity, text: "HPLC METHOD GUIDES" },
  { icon: FlaskConical, text: "MASS SPECTROMETRY GUIDES" },
  { icon: CheckCircle, text: "VERIFIED RECORDS ONLY" },
  { icon: Shield, text: "PRODUCT DOCUMENTATION" },
];

export default function TrustTicker() {
  return (
    <div className="w-full bg-[var(--bg-page)] border-b border-[var(--glass-border)] py-3 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="hidden md:flex items-center gap-2 pr-6 border-r border-[var(--glass-border)] shrink-0 z-20 bg-[var(--bg-page)]">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">
                Research Use Only
            </span>
        </div>

        <div className="md:hidden flex items-center pr-4 border-r border-[var(--glass-border)] shrink-0 z-20 bg-[var(--bg-page)] pl-4">
             <FlaskConical className="w-4 h-4 text-red-500" />
        </div>

        <div className="relative flex-1 overflow-hidden mask-linear-gradient">
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10" />

            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                className="flex gap-4 md:gap-8 whitespace-nowrap px-4"
            >
                {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
                    <div 
                        key={i} 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white/5 border border-transparent dark:border-white/5 shadow-sm min-w-fit"
                    >
                        <item.icon className="w-3.5 h-3.5 text-[var(--color-brand-secondary)] shrink-0" />
                        <span className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-white dark:text-[var(--text-main)] uppercase">
                            {item.text}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
}