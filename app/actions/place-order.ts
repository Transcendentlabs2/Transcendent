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
  country: string; // <-- AHORA RECIBE EL PAÍS DESDE EL FORMULARIO
};

type CartItem = {
  productId: string;
  quantity: number;
};

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, paymentToken: string) => {
  try {
    // 1. Validaciones iniciales
    if (cartItems.length === 0) return { ok: false, message: "Cart is empty" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }
    if (!paymentToken) return { ok: false, message: "Payment token is missing" };

    // 2. Buscar productos y calcular total
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
        name: dbProduct.name 
      });
    }

    // --- PASO 1: COBRO CON SQUARE (LIVE/PRODUCCIÓN) ---
    const amountInCents = Math.round(totalAmount * 100);
    try {
        const squareEndpoint = 'https://connect.squareup.com/v2/payments';
        
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
            console.error("Square Production Error:", paymentData.errors);
            // Mensaje más descriptivo para el cliente en caso de rechazo
            return { 
                ok: false, 
                message: "Payment declined. Please ensure the address and zip code match your bank records." 
            };
        }
    } catch (paymentError) {
        console.error("Square Connection Error:", paymentError);
        return { ok: false, message: "Could not connect to payment provider." };
    }

    // --- PASO 2: GUARDAR EN BASE DE DATOS ---
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
          // USAMOS EL PAÍS QUE VIENE DEL FORMULARIO
          country: shippingData.country === "CO" ? "Colombia" : "United States",            
          total: totalAmount,
          status: 'PAID', 
          isPaid: true,   
          items: {
            create: orderItemsData.map(({ name, ...rest }) => rest),
          },
        },
      });
    });

    // --- PASO 3: ENVIAR CORREO (CON EL PAÍS DINÁMICO) ---
    try {
      const apiKey = process.env.RESEND_API_KEY;
      
      if (apiKey) {
        const resend = new Resend(apiKey);
        
        const itemsHtml = orderItemsData.map(item => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">
              ${item.name} <br>
              <small style="color: #6b7280;">Qty: ${item.quantity}</small>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">
              $${(item.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        `).join('');

        await resend.emails.send({
          from: 'Transcendent Labs <orders@transcendent-labs.com>',
          to: shippingData.email,
          subject: `Receipt for Order #${order.id.slice(0, 8)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h1 style="color: #111827; text-align: center; font-size: 24px;">Transcendent Labs</h1>
              <div style="text-align: center; background-color: #ecfdf5; color: #065f46; padding: 8px; border-radius: 6px; font-weight: bold; margin-bottom: 20px;">
                Payment Successful
              </div>
              
              <p>Hi <strong>${shippingData.name}</strong>,</p>
              <p>Thank you for your purchase! We've received your payment and our team is preparing your shipment.</p>
              
              <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; margin-top: 24px;">Order Details (#${order.id.slice(0, 8)})</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td style="padding: 16px 0; text-align: right; font-weight: bold;">Total Paid:</td>
                  <td style="padding: 16px 0; text-align: right; color: #10b981; font-size: 18px; font-weight: bold;">
                    $${totalAmount.toFixed(2)}
                  </td>
                </tr>
              </table>

              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <h4 style="margin: 0 0 8px 0; color: #374151;">Shipping Address</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                  ${shippingData.address}<br>
                  ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br>
                  ${shippingData.country === "CO" ? "Colombia" : "United States"}
                </p>
              </div>

              <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
                <p style="color: #6b7280; font-size: 13px;">
                  If you have any questions, please contact our team directly at:
                </p>
                <a href="mailto:transcendent.labs2@gmail.com" style="color: #3b82f6; font-weight: bold; text-decoration: none;">
                  transcendent.labs2@gmail.com
                </a>
              </div>
            </div>
          `
        });
      }
    } catch (emailError) {
      console.error("Resend Error:", emailError);
    }

    return { ok: true, order: order, message: "Order placed and paid successfully" };

  } catch (error: any) {
    console.error("General Order Error:", error);
    return { ok: false, message: "Internal server error processing order" };
  }
};