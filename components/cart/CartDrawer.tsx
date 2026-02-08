"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Oscuro (Cierra al hacer click fuera) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Panel Lateral Deslizante */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg-page)]/95 backdrop-blur-xl border-l border-[var(--glass-border)] shadow-2xl z-[101] flex flex-col"
          >
            {/* Header del Carrito */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--color-brand-primary)]/10 rounded-lg text-[var(--color-brand-primary)]">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-display font-bold text-[var(--text-main)]">Research Cart</h2>
              </div>
              <button 
                onClick={toggleCart} 
                className="p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag className="w-16 h-16 mb-4 text-[var(--text-muted)]" />
                  <p className="text-sm font-mono uppercase tracking-widest">Cart Empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-[var(--glass-bg)] border border-[var(--glass-border)] p-3 rounded-xl relative group"
                  >
                    {/* Imagen del Producto */}
                    <div className="relative w-20 h-20 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--glass-border)] shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>

                    {/* Información y Controles */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[var(--text-main)] leading-tight mb-1">{item.name}</h4>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{item.category}</p>
                      </div>
                      
                      {/* Control de Cantidad y Precio */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-[var(--bg-page)] rounded-lg border border-[var(--glass-border)] px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono font-bold text-[var(--color-brand-primary)]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Botón Eliminar (Visible en Hover) */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-widest">Total Estimated</span>
                  <span className="text-2xl font-mono font-bold text-[var(--text-main)]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4 text-[10px] text-[var(--text-muted)] bg-emerald-500/5 py-2 rounded border border-emerald-500/10">
                   <ShieldCheck className="w-3 h-3 text-emerald-500" />
                   <span>Secure Encrypted Checkout</span>
                </div>

                <Link href="/checkout" onClick={toggleCart}>
                  <button className="w-full bg-[var(--text-main)] text-[var(--bg-page)] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}