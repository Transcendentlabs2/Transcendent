'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';
import EasyPostClient from '@easypost/api';

export async function updateOrderStatus(orderId: string, newStatus: 'PENDING' | 'VERIFYING_PAYMENT' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REJECTED') {
  try {
    // 1. Obtenemos la orden completa para generar la etiqueta y el correo
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!order) {
      return { ok: false, message: "Orden no encontrada" };
    }

    // 2. LA MAGIA: Si apruebas el pago (Zelle confirmado)
    if (newStatus === 'PAID' && !order.isPaid) {
      let trackingUrl = null;
      let labelUrl = null;
      let actualTrackingNumber = null;

      // --- A. COMPRAR ETIQUETA EN EASYPOST ---
      try {
        if (process.env.EASYPOST_API_KEY) {
          const easypost = new EasyPostClient(process.env.EASYPOST_API_KEY);
          
          const shipment = await easypost.Shipment.create({
            to_address: {
              verify: ['delivery'],
              name: order.customerName,
              street1: order.addressLine1,
              city: order.city,
              state: order.state,
              zip: order.postalCode,
              country: order.country === "Colombia" ? "CO" : "US",
              phone: order.customerPhone,
              email: order.customerEmail,
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
            parcel: { length: 6, width: 4, height: 1, weight: 3 }
          });

          const rateToBuy = shipment.lowestRate();
          if (rateToBuy) {
              const boughtShipment = await easypost.Shipment.buy(shipment.id, rateToBuy);
              trackingUrl = boughtShipment.tracker.public_url;
              labelUrl = boughtShipment.postage_label.label_url; 
              actualTrackingNumber = boughtShipment.tracking_code;
              console.log(`Etiqueta comprada exitosamente. Tracking: ${trackingUrl}`);
          }
        }
      } catch (easyPostError) {
        console.error("EasyPost Error durante la creación de la etiqueta:", easyPostError);
      }

      // --- B. ACTUALIZAR BASE DE DATOS ---
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: newStatus,
          isPaid: true,
          paidAt: new Date(),
          trackingNumber: actualTrackingNumber || null
        },
      });

      // --- C. ENVIAR CORREO DE CONFIRMACIÓN AL CLIENTE ---
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        try {
          const resend = new Resend(apiKey);
          const itemsHtml = order.items.map(item => `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${item.product.name} (x${item.quantity})</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">$${(Number(item.price) * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('');

          const trackingHtml = trackingUrl 
            ? `<div style="margin-top: 20px; padding: 16px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe; text-align: center;">
                <p style="margin: 0; color: #1e3a8a; font-weight: bold;">Track your order:</p>
                <a href="${trackingUrl}" style="color: #2563eb; text-decoration: none; word-break: break-all;">${trackingUrl}</a>
               </div>` 
            : '';

          await resend.emails.send({
            from: 'Transcendent Labs <orders@transcendent-labs.com>',
            to: order.customerEmail,
            subject: `Payment Approved! Order #${order.id.slice(0, 8)}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
                <h1 style="color: #111827; text-align: center; font-size: 24px;">Transcendent Labs</h1>
                <div style="text-align: center; background-color: #ecfdf5; color: #065f46; padding: 8px; border-radius: 6px; font-weight: bold; margin-bottom: 20px;">Payment Verified Successfully</div>
                <p>Hi <strong>${order.customerName}</strong>, your Zelle payment has been confirmed and your order is now processing!</p>
                <table style="width: 100%; border-collapse: collapse;">
                  ${itemsHtml}
                  <tr>
                    <td style="padding: 16px 0; text-align: right; font-weight: bold;">Total Paid:</td>
                    <td style="padding: 16px 0; text-align: right; color: #10b981; font-size: 18px; font-weight: bold;">$${Number(order.total).toFixed(2)}</td> 
                  </tr>
                </table>
                ${trackingHtml}
              </div>`
          });
        } catch (emailError) { console.error("Resend Error:", emailError); }
      }

    } else {
      // 3. Si es un cambio de estado rutinario (ej. Rechazar pago, marcar como enviado manual, etc)
      await prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });
    }

    revalidatePath('/admin/orders'); 
    return { ok: true, message: "Estado actualizado" };
  } catch (error) {
    console.error("Critical error updating order:", error);
    return { ok: false, message: "Error al actualizar estado" };
  }
}

export async function deleteOrder(orderId: string) {
  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId }
    });

    await prisma.order.delete({
      where: { id: orderId }
    });
    
    revalidatePath('/admin/orders');
    return { ok: true, message: "Orden eliminada" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al eliminar orden" };
  }
}