'use server';

import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import Stripe from 'stripe';
import EasyPostClient from '@easypost/api';

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

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, paymentMethodId: string, promoCode?: string) => {
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

    // Normalizamos el código promocional a mayúsculas para evitar errores de tipeo del cliente
    const upperPromo = promoCode ? promoCode.trim().toUpperCase() : '';
    const discount5Codes = ['UNCDAVE', 'ANT26', 'BIGTEX', 'YANKS26'];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      let price = Number(dbProduct.price);
      
      // INTERVENCIÓN QUIRÚRGICA: Lógica de Promociones
      if (upperPromo === 'TEST1') {
        price = 1; // Modo test
      } else if (discount5Codes.includes(upperPromo)) {
        price = price * 0.95; // Aplica 5% de descuento al precio original
      }

      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name 
      });
      descriptionLines.push(`${dbProduct.name} x${item.quantity}`);
    }

    // El envío se calcula con normalidad, excepto si es TEST1
    let totalShipping = (totalAmount > 0 && totalAmount < 300) ? 9.95 : 0;
    if (upperPromo === 'TEST1') {
      totalShipping = 0;
    }
    
    const finalTotalAmount = totalAmount + totalShipping;

    // --- PASO 1: COBRO CON STRIPE ---
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(finalTotalAmount * 100), 
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            description: `Order: ${descriptionLines.join(', ')}`,
            automatic_payment_methods: { 
                enabled: true,
                allow_redirects: 'never'
            },
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

    // --- PASO 2: GUARDAR EN PRISMA ---
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

    // --- PASO 3: INTEGRACIÓN DE EASYPOST (ACTUALIZADO CON VALIDACIÓN) ---
    let trackingUrl = null;
    let labelUrl = null;

    try {
      if (process.env.EASYPOST_API_KEY) {
        const easypost = new EasyPostClient(process.env.EASYPOST_API_KEY);

        const shipment = await easypost.Shipment.create({
          to_address: {
            verify: ['delivery'], // <--- ESTO ES VITAL: Verifica si la dirección existe
            name: shippingData.name,
            street1: shippingData.address,
            city: shippingData.city,
            state: shippingData.state,
            zip: shippingData.postalCode,
            country: shippingData.country,
            phone: shippingData.phone,
            email: shippingData.email,
          },
          from_address: {
            company: 'Transcendent Labs',
            street1: '107 NEW BRICK CHURCH PIKE',
            street2: 'F',
            city: 'GOODLETTSVILLE',
            state: 'TN',
            zip: '37072-1545',
            country: 'US',
          },
          parcel: {
            length: 6,   
            width: 4,    
            height: 1,   
            weight: 3,   
          }
        });

        // Verificamos el estado de la dirección
        const addressVerification = shipment.to_address.verifications?.delivery;
        
        if (addressVerification?.success === false) {
           console.warn(`EasyPost Warning: La dirección parece ser inválida o no verificable para la orden ${order.id}. Errores:`, addressVerification.errors);
           // Podrías decidir detener el proceso aquí y devolver un error al frontend,
           // pero como el cobro de Stripe ya se hizo en el Paso 1, lo mejor es registrar 
           // el warning y dejar que la compra de la etiqueta intente procesarse de todos modos, 
           // o bien, no comprarla automáticamente y obligar al admin a revisarla manualmente.
           // Por ahora, procedemos intentando comprar la tarifa más baja.
        }

        const rateToBuy = shipment.lowestRate();

        if (rateToBuy) {
            const boughtShipment = await easypost.Shipment.buy(shipment.id, rateToBuy);
            trackingUrl = boughtShipment.tracker.public_url;
            labelUrl = boughtShipment.postage_label.label_url; 
            console.log(`Etiqueta comprada exitosamente. Tracking: ${trackingUrl}`);
        } else {
            console.error(`EasyPost Error: No se encontraron tarifas para la orden ${order.id}`);
        }
      }
    } catch (easyPostError) {
      console.error("EasyPost Error durante la creación de la etiqueta:", easyPostError);
    }

    // --- PASO 4: ENVIAR CORREOS ---
    try {
      if (apiKey) {
        const resend = new Resend(apiKey);
        const itemsHtml = orderItemsData.map(item => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${item.name} (x${item.quantity})</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `).join('');

        const trackingHtml = trackingUrl 
          ? `<div style="margin-top: 20px; padding: 16px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe; text-align: center;">
              <p style="margin: 0; color: #1e3a8a; font-weight: bold;">Track your order:</p>
              <a href="${trackingUrl}" style="color: #2563eb; text-decoration: none; word-break: break-all;">${trackingUrl}</a>
             </div>` 
          : '';

        // 1. Correo para el cliente
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
              ${trackingHtml}
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <h4 style="margin: 0 0 8px 0;">Shipping Address</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br>${shippingData.country === "CO" ? "Colombia" : "United States"}</p>
              </div>
            </div>`
        });

        // 2. Correo interno para el administrador
        await resend.emails.send({
          from: 'Transcendent Labs <orders@transcendent-labs.com>',
          to: 'mjdiamant8@gmail.com',
          subject: `🚨 New Sale! Order #${order.id.slice(0, 8)} - $${finalTotalAmount.toFixed(2)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h1 style="color: #111827; font-size: 20px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">🎉 New Order Received</h1>
              <p><strong>Customer:</strong> ${shippingData.name} (${shippingData.email})</p>
              <p><strong>Phone:</strong> ${shippingData.phone}</p>
              <p><strong>Total Amount:</strong> <span style="color: #10b981; font-weight: bold;">$${finalTotalAmount.toFixed(2)}</span></p>
              
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <h4 style="margin: 0 0 8px 0;">Shipping Destination</h4>
                <p style="margin: 0; color: #374151; font-size: 14px;">
                  ${shippingData.address}<br/>
                  ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br/>
                  ${shippingData.country === "CO" ? "Colombia" : "United States"}
                </p>
              </div>

              <h4 style="margin: 0 0 8px 0;">Order Items</h4>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                ${itemsHtml}
              </table>
              
              <p style="text-align: center; margin-top: 30px;">
                Log in to your dashboard or EasyPost to process the shipment.
                ${labelUrl ? `<br><br><a href="${labelUrl}" style="color: #2563eb; text-decoration: none;">Download Shipping Label PDF</a>` : ''}
              </p>
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