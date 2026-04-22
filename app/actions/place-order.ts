'use server';

import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

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

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, promoCode?: string) => {
  try {
    if (cartItems.length === 0) return { ok: false, message: "Cart is empty" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }

    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0; 
    const orderItemsData: any[] = [];
    const upperPromo = promoCode ? promoCode.trim().toUpperCase() : '';
    const discount5Codes = ['UNCDAVE', 'ANT26', 'BIGTEX', 'YANKS26'];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      let price = Number(dbProduct.price);
      
      if (upperPromo === 'TEST1') {
        price = 1;
      } else if (discount5Codes.includes(upperPromo)) {
        price = price * 0.95;
      }

      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name 
      });
    }

    let totalShipping = (totalAmount > 0 && totalAmount < 300) ? 9.95 : 0;
    if (upperPromo === 'TEST1') {
      totalShipping = 0;
    }
    
    const finalTotalAmount = totalAmount + totalShipping;

    // GUARDAR EN PRISMA ESTADO PENDING (Sin Stripe)
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
          status: 'PENDING', // <--- Inicia pendiente
          isPaid: false,   
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

    return { ok: true, order: order, message: "Order placed successfully" };

  } catch (error: any) {
    console.error("Critical Error:", error);
    return { ok: false, message: "Internal server error" };
  }
};

// NUEVA FUNCIÓN: El cliente envía el código de Zelle
export const confirmZelleReference = async (orderId: string, reference: string) => {
    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'VERIFYING_PAYMENT',
                paymentReference: reference
            }
        });

        // Enviamos un correo al ADMIN para que sepa que debe ir a revisar el banco
        const apiKey = process.env.RESEND_API_KEY;
        if (apiKey) {
            const resend = new Resend(apiKey);
            await resend.emails.send({
                from: 'Transcendent Labs <orders@transcendent-labs.com>',
                to: 'mjdiamant8@gmail.com', // Tu correo de administrador
                subject: `🚨 Payment Verification Required - Order #${order.id.slice(0, 8)}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px;">
                    <h2>New Zelle Payment Received</h2>
                    <p>Customer: <strong>${order.customerName}</strong></p>
                    <p>Amount to verify: <strong>$${Number(order.total).toFixed(2)}</strong></p>
                    <p>Zelle Reference Number: <strong style="color: #2563eb; font-size: 18px;">${reference}</strong></p>
                    <p>Please check your bank account. If the money is there, approve the order in your admin dashboard to generate the shipping label.</p>
                  </div>`
              });
        }

        return { ok: true };
    } catch (error) {
        console.error(error);
        return { ok: false, message: "Error updating order" };
    }
}