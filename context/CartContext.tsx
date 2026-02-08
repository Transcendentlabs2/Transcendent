"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Definimos la estructura del producto en el carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  category: string;
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

  // 1. Cargar carrito del LocalStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("transcendent_cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // 2. Guardar en LocalStorage cada vez que cambie
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
        // Si ya existe, sumamos la cantidad
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      // Si no existe, lo agregamos normalizado
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.images, // Asegúrate de que tu DB mande 'images' string
          quantity: qty,
          slug: product.slug,
          category: product.category,
        },
      ];
    });
    setIsCartOpen(true); // Abrir carrito automáticamente al agregar
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