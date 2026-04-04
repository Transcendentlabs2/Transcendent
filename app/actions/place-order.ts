'use server';

import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
});

type ShippingData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;      
  postalCode: string; 
  country: string;
};

type CartItem = {
  productId: string;
  quantity: number;
};

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, paymentMethodId: string) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // 1. Validaciones iniciales
    if (cartItems.length === 0) return { ok: false, message: "Cart is empty" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }

    // 2. Buscar productos y calcular totales
    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0; 
    const orderItemsData: any[] = [];
    const descriptionLines: string[] = [];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      const price = Number(dbProduct.price);
      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name 
      });
      descriptionLines.push(`${dbProduct.name} x${item.quantity}`);
    }

    // Lógica de Envío
    const totalShipping = (totalAmount > 0 && totalAmount < 300) ? 9.95 : 0;
    const finalTotalAmount = totalAmount + totalShipping;

    // --- PASO 1: COBRO CON STRIPE ---
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(finalTotalAmount * 100), // En centavos
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            description: `Order: ${descriptionLines.join(', ')}`,
            automatic_payment_methods: { 
                enabled: true,
                allow_redirects: 'never' // Para procesar directamente sin salir de la web
            },
            // CRUCIAL PARA PIRATE SHIP:
            shipping: {
                name: shippingData.name,
                address: {
                    line1: shippingData.address,
                    city: shippingData.city,
                    state: shippingData.state,
                    postal_code: shippingData.postalCode,
                    country: shippingData.country,
                },
                phone: shippingData.phone
            },
            receipt_email: shippingData.email,
            metadata: {
                email: shippingData.email,
                shipping_cost: totalShipping.toString()
            }
        });

        if (paymentIntent.status !== 'succeeded') {
            return { ok: false, message: "Payment status: " + paymentIntent.status };
        }
    } catch (stripeError: any) {
        console.error("Stripe Error:", stripeError.message);
        return { ok: false, message: stripeError.message || "Payment declined." };
    }

    // --- PASO 2: GUARDAR EN TU BASE DE DATOS (PRISMA) ---
    const order = await prisma.$transaction(async (tx) => {
      return await tx.order.create({
        data: {
          customerName: shippingData.name,
          customerEmail: shippingData.email,
          customerPhone: shippingData.phone,
          addressLine1: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          postalCode: shippingData.postalCode, 
          country: shippingData.country === "CO" ? "Colombia" : "United States",            
          total: finalTotalAmount,
          status: 'PAID', 
          isPaid: true,   
          items: {
            create: orderItemsData.map(({ name, ...rest }) => ({
                productId: rest.productId,
                quantity: rest.quantity,
                price: rest.price
            })),
          },
        },
      });
    });

    // --- PASO 3: ENVIAR CORREO (RESEND) ---
    try {
      if (apiKey) {
        const resend = new Resend(apiKey);
        const itemsHtml = orderItemsData.map(item => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${item.name} (x${item.quantity})</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `).join('');

        await resend.emails.send({
          from: 'Transcendent Labs <orders@transcendent-labs.com>',
          to: shippingData.email,
          subject: `Order Confirmed #${order.id.slice(0, 8)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h1 style="color: #111827; text-align: center; font-size: 24px;">Transcendent Labs</h1>
              <div style="text-align: center; background-color: #ecfdf5; color: #065f46; padding: 8px; border-radius: 6px; font-weight: bold; margin-bottom: 20px;">Payment Successful</div>
              <p>Hi <strong>${shippingData.name}</strong>, thank you for your purchase!</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Shipping & Handling</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #6b7280; font-weight: bold;">$${totalShipping.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; text-align: right; font-weight: bold;">Total Paid:</td>
                  <td style="padding: 16px 0; text-align: right; color: #10b981; font-size: 18px; font-weight: bold;">$${finalTotalAmount.toFixed(2)}</td> </tr>
              </table>
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <h4 style="margin: 0 0 8px 0;">Shipping Address</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br>${shippingData.country === "CO" ? "Colombia" : "United States"}</p>
              </div>
            </div>`
        });
      }
    } catch (emailError) { console.error("Resend Error:", emailError); }

    return { ok: true, order: order, message: "Order placed successfully" };

  } catch (error: any) {
    console.error("Critical Error:", error);
    return { ok: false, message: "Internal server error" };
  }
};