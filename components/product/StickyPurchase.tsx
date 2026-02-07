"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export default function StickyPurchase({ product, qty }: { product: any, qty: number }) {
  const [isVisible, setIsVisible] = useState(false);

  // Solo mostrar después de hacer scroll un poco (para no saturar al inicio)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          // CLASE CLAVE: pb-[calc(1rem+env(safe-area-inset-bottom))] para iPhone X+
          className="fixed bottom-0 left-0 right-0 bg-[var(--bg-page)]/80 backdrop-blur-xl border-t border-[var(--glass-border)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-50 lg:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center gap-4">
             <div className="flex-1">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider truncate">{product.name}</p>
                <div className="flex items-baseline gap-2">
                   <span className="font-bold text-[var(--color-brand-primary)] text-lg">${product.price.toFixed(2)}</span>
                   {product.stock < 20 && <span className="text-[9px] text-red-500 font-bold animate-pulse">Low Stock</span>}
                </div>
             </div>

             <button className="bg-[var(--text-main)] text-[var(--bg-page)] px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}