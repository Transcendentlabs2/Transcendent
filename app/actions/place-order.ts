'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';
import { Resend } from 'resend';

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
  // Inicializamos Resend AQUÍ ADENTRO para asegurar que lea la variable de entorno de Vercel
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    if (cartItems.length === 0) return { ok: false, message: "Cart is empty" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }
    if (!paymentToken) return { ok: false, message: "Payment token is missing" };

    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0;
    const orderItemsData: { productId: string; quantity: number; price: number; name: string }[] = [];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      const price = Number(dbProduct.price);
      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name // Guardamos el nombre temporalmente para el correo
      });
    }

    // --- 1. COBRO CON SQUARE ---
    const amountInCents = Math.round(totalAmount * 100);

    try {
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
                amount_money: { amount: amountInCents, currency: 'USD' },
                location_id: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
            })
        });

        const paymentData = await squareResponse.json();

        if (!squareResponse.ok || paymentData.errors) {
            console.error("Square Payment API Error:", paymentData.errors);
            return { ok: false, message: "Payment declined by provider." };
        }
    } catch (paymentError) {
        console.error("Square Connection Error:", paymentError);
        return { ok: false, message: "Could not connect to payment provider." };
    }

    // --- 2. GUARDAR EN BASE DE DATOS ---
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
            // Removemos el 'name' porque Prisma solo espera productId, quantity y price
            create: orderItemsData.map(({ name, ...rest }) => rest),
          },
        },
      });
    });

    // --- 3. ENVIAR RECIBO POR CORREO CON RESEND ---
    try {
      // Generamos la lista de productos en HTML para el correo
      const itemsHtml = orderItemsData.map(item => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${item.name} <br><small style="color: #6b7280;">Qty: ${item.quantity}</small></td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      await resend.emails.send({
        from: 'Transcendent Labs <orders@transcendent-labs.com>', // Usa tu dominio verificado
        to: shippingData.email,
        subject: `Receipt for Order #${order.id.slice(0, 8)}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #111827; margin-bottom: 8px;">Transcendent Labs</h1>
              <p style="color: #10b981; font-weight: 600; margin: 0;">Payment Successful</p>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">Hi <strong>${shippingData.name}</strong>,</p>
            <p style="color: #374151; line-height: 1.6;">Thank you for your purchase. We have received your payment and are currently processing your order.</p>
            
            <h3 style="color: #111827; margin-top: 32px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Order Details (#${order.id.slice(0, 8)})</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              ${itemsHtml}
              <tr>
                <td style="padding: 16px 0 0 0; text-align: right; color: #6b7280;">Total Paid:</td>
                <td style="padding: 16px 0 0 0; text-align: right; color: #10b981; font-size: 18px; font-weight: bold;">$${totalAmount.toFixed(2)}</td>
              </tr>
            </table>

            <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #374151;">Shipping Address</h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                ${shippingData.address}<br>
                ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br>
                United States
              </p>
            </div>

            <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
              If you have any questions about your order, please contact us at <br>
              <a href="mailto:transcendent.labs2@gmail.com" style="color: #3b82f6; font-weight: bold;">transcendent.labs2@gmail.com</a>
            </p>
          </div>
        `
      });
    } catch (emailError) {
      // Usamos un try-catch independiente. Si Resend falla, la orden igual se guarda.
      console.error("Failed to send receipt email:", emailError);
    }

    return { ok: true, order: order, message: "Order placed and paid successfully" };

  } catch (error: any) {
    console.error("Order Error:", error);
    return { ok: false, message: "Internal server error processing order" };
  }
};