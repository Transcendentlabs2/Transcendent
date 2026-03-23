"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. DEFINICIÓN ACTUALIZADA: Ahora incluimos 'stock' y 'shippingPrice'
export interface CartItem {
  id: string;
  name: string;
  price: number;
  shippingPrice: number; // <-- AÑADIDO
  image: string;
  quantity: number;
  slug: string;
  category: string;
  stock: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: any, qty: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartCount: number;
  cartSubtotal: number;  // <-- AÑADIDO: Para mostrar el costo base
  shippingTotal: number; // <-- AÑADIDO: Para mostrar el costo de envío
  cartTotal: number;     // <-- ACTUALIZADO: Subtotal + Envío
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito del LocalStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("transcendent_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar en LocalStorage cada vez que cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transcendent_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Lógica: Agregar Item
  const addItem = (product: any, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Si ya existe, sumamos la cantidad y actualizamos stock
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty, stock: product.stock }
            : item
        );
      }
      
      // Si no existe, lo agregamos normalizado incluyendo stock y shippingPrice
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          shippingPrice: Number(product.shippingPrice || 0), // <-- AÑADIDO
          image: product.images, 
          quantity: qty,
          slug: product.slug,
          category: product.category,
          stock: product.stock,
        },
      ];
    });
    setIsCartOpen(true); 
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
    );
  };

  const clearCart = () => setItems([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Cálculos desglosados
const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const shippingTotal = items.reduce((acc, item) => acc + (item.shippingPrice || 0) * item.quantity, 0);
  const cartTotal = cartSubtotal + shippingTotal;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        cartCount,
        cartSubtotal,   // <-- EXPORTADO
        shippingTotal,  // <-- EXPORTADO
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};