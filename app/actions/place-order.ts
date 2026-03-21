'use server';

'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';

// Usamos require para saltarnos el bloqueo estricto de TypeScript
const { Client } = require('square');

// Inicializamos el cliente de Square para el Backend
const square = new Client({
  environment: 'sandbox', // Cambia a 'production' cuando lances en vivo
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});
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

// AÑADIMOS paymentToken a los parámetros
export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, paymentToken: string) => {
  try {
    if (cartItems.length === 0) {
      return { ok: false, message: "Cart is empty" };
    }
    
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }

    if (!paymentToken) {
        return { ok: false, message: "Payment token is missing" };
    }

    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0;
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

    // --- INTEGRACIÓN SQUARE: Procesar el pago antes de guardar en DB ---
    // Square requiere el monto en centavos (ej: $15.50 = 1550)
    const amountInCents = BigInt(Math.round(totalAmount * 100));

    try {
        await square.paymentsApi.createPayment({
            sourceId: paymentToken,
            idempotencyKey: crypto.randomUUID(), // Evita cobros dobles por error de red
            amountMoney: {
                amount: amountInCents,
                currency: 'USD',
            },
            locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string,
        });
    } catch (paymentError) {
        console.error("Square Payment Error:", paymentError);
        return { ok: false, message: "Payment declined by provider." };
    }
    // -------------------------------------------------------------------

    // Si el código llega aquí, EL PAGO FUE EXITOSO. Guardamos la orden.
    const order = await prisma.$transaction(async (tx) => {
      return await tx.order.create({
        data: {
          userId: null, 
          customerName: shippingData.name,
          customerEmail: shippingData.email,
          customerPhone: shippingData.phone,
          addressLine1: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          postalCode: shippingData.postalCode, 
          country: "United States",            
          total: totalAmount,
          status: 'PAID', // Cambiamos a PAID porque ya se cobró
          isPaid: true,   // Marcamos como pagado
          items: {
            create: orderItemsData,
          },
        },
      });
    });

    return { ok: true, order: order, message: "Order placed and paid successfully" };

  } catch (error: any) {
    console.error("Order Error:", error);
    return { ok: false, message: "Internal server error processing order" };
  }
};