'use server';

import { prisma } from '@/lib/prisma';

// 1. Estructura de datos para USA
type ShippingData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;      
  postalCode: string; 
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
    
    // Validación de campos obligatorios (incluyendo state)
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }

    // B. Obtener productos reales
    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0;
    
    // CORRECCIÓN AQUÍ: Tipado explícito para evitar el error de "implicitly has an 'any[]' type"
    const orderItemsData: { productId: string; quantity: number; price: number }[] = [];

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

    // C. Crear Orden
    const order = await prisma.$transaction(async (tx) => {
      return await tx.order.create({
        data: {
          userId: null, 
          
          customerName: shippingData.name,
          customerEmail: shippingData.email,
          customerPhone: shippingData.phone,
          
          addressLine1: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,      // Ahora sí existe en el schema
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