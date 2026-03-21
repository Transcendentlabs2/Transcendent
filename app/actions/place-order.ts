'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';

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

    // --- INTEGRACIÓN SQUARE: Procesar el pago vía REST API (A prueba de Vercel) ---
    // Multiplicamos por 100 porque Square pide el monto en centavos y en número entero
    const amountInCents = Math.round(totalAmount * 100);

    try {
        // NOTA: Cuando pases a producción, quita la palabra "sandbox" de esta URL
        const squareEndpoint = 'https://connect.squareupsandbox.com/v2/payments';

        const squareResponse = await fetch(squareEndpoint, {
            method: 'POST',
            headers: {
                'Square-Version': '2024-01-18', 
                'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source_id: paymentToken,
                idempotency_key: crypto.randomUUID(),
                amount_money: {
                    amount: amountInCents,
                    currency: 'USD'
                },
                location_id: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
            })
        });

        const paymentData = await squareResponse.json();

        // Si la tarjeta es declinada o hay un error de fondos, Square lo reporta en .errors
        if (!squareResponse.ok || paymentData.errors) {
            console.error("Square Payment API Error:", paymentData.errors);
            return { ok: false, message: "Payment declined by provider." };
        }

    } catch (paymentError) {
        console.error("Square Connection Error:", paymentError);
        return { ok: false, message: "Could not connect to payment provider." };
    }
    // -------------------------------------------------------------------

    // Si pasamos el bloque anterior, EL PAGO FUE EXITOSO. Guardamos la orden.
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
          status: 'PAID', 
          isPaid: true,   
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