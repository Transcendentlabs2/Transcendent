"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. DEFINICIÓN ACTUALIZADA: Ahora incluimos 'stock'
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  category: string;
  stock: number; // <-- AÑADIDO: Propiedad necesaria para validaciones
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
  cartTotal: number;
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

  // Lógica: Agregar Item (Actualizada para capturar el stock)
  const addItem = (product: any, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Si ya existe, sumamos la cantidad (pero aseguramos actualizar el stock por si cambió)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty, stock: product.stock }
            : item
        );
      }
      
      // Si no existe, lo agregamos normalizado incluyendo el stock actual
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.images, 
          quantity: qty,
          slug: product.slug,
          category: product.category,
          stock: product.stock, // <-- AÑADIDO: Se guarda el stock del producto
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

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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