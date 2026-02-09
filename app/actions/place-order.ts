'use server';

import { prisma } from '@/lib/prisma';

// Definimos la estructura básica del item que viene del carrito (frontend)
type CartItem = {
  productId: string;
  quantity: number;
};

export const placeOrder = async (cartItems: CartItem[], userId: number) => {
  try {
    if (!userId) {
      return { ok: false, message: "No hay sesión de usuario activa" };
    }
    
    if (cartItems.length === 0) {
      return { ok: false, message: "El carrito está vacío" };
    }

    // Obtener productos reales de la Base de Datos
    const productIds = cartItems.map((item) => item.productId);
    
    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true 
      },
    });

    let totalAmount = 0;
    
    // CORRECCIÓN AQUÍ: Tipado explícito del array
    const orderItemsData: { productId: string; quantity: number; price: number }[] = [];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);

      if (!dbProduct) {
        throw new Error(`Producto no disponible o inactivo: ${item.productId}`);
      }

      const price = Number(dbProduct.price);
      const subtotal = price * item.quantity;
      
      totalAmount += subtotal;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price, 
      });
    }

    // Transacción
    const order = await prisma.$transaction(async (tx) => {
      
      // Si "tx.order" sigue en rojo, es porque falta el "npx prisma generate"
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          total: totalAmount,
          status: 'PENDING',
          isPaid: false,
          items: {
            create: orderItemsData,
          },
        },
      });

      return newOrder;
    });

    return { 
      ok: true, 
      order: order, 
      message: "Orden generada correctamente" 
    };

  } catch (error: any) {
    console.error("Error al crear orden:", error);
    return { 
      ok: false, 
      message: error.message || "Error interno al procesar la orden" 
    };
  }
};