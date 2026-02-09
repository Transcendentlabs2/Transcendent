'use server';

import { prisma } from '@/lib/prisma';

// 1. Estructura de datos para USA
type ShippingData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;      // US State
  postalCode: string; // Zip Code (Obligatorio)
};

type CartItem = {
  productId: string;
  quantity: number;
};

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData) => {
  try {
    // A. Validaciones
    if (cartItems.length === 0) {
      return { ok: false, message: "Cart is empty" };
    }
    
    // Validación estricta de campos para USA
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields (Zip Code/State)" };
    }

    // B. Obtener productos reales
    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      const price = Number(dbProduct.price);
      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price, 
      });
    }

    // C. Crear Orden (Guest Checkout)
    const order = await prisma.$transaction(async (tx) => {
      return await tx.order.create({
        data: {
          userId: null, // Sin usuario registrado
          
          customerName: shippingData.name,
          customerEmail: shippingData.email,
          customerPhone: shippingData.phone,
          
          addressLine1: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          postalCode: shippingData.postalCode, 
          country: "United States",            
          
          total: totalAmount,
          status: 'PENDING',
          isPaid: false,
          
          items: {
            create: orderItemsData,
          },
        },
      });
    });

    return { ok: true, order: order, message: "Order placed successfully" };

  } catch (error: any) {
    console.error("Order Error:", error);
    return { ok: false, message: "Internal server error processing order" };
  }
};