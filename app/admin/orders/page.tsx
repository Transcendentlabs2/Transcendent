import { prisma } from "@/lib/prisma";
import OrdersClient from "@/components/admin/orders/OrdersClient"; // Importa el componente que acabamos de crear

// Esto fuerza a que la página NO se guarde en caché (siempre muestra datos frescos)
export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  
  // 1. Fetch de la base de datos
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc' // Las más recientes primero
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        }
      },
      items: true // Traemos los items para contarlos
    }
  });

  // 2. Serialización (Limpieza de datos)
  // Next.js no puede enviar objetos "Decimal" (de la BD) al cliente. 
  // Debemos convertirlos a Numbers o Strings.
  const serializedOrders = orders.map((order) => ({
    id: order.id,
    total: Number(order.total), // Conversión clave: Decimal -> Number
    status: order.status,
    createdAt: order.createdAt,
    user: {
      name: order.user.name,
      email: order.user.email,
    },
    itemsCount: order.items.length
  }));

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] p-4 md:p-8 pb-20">
      
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              Order Management
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Global overview of research transactions.
            </p>
        </div>
        {/* Aquí podrías poner un botón de "Exportar a Excel" en el futuro */}
      </div>

      {/* Renderizamos el Cliente con los datos preparados */}
      <OrdersClient initialOrders={serializedOrders} />
      
    </div>
  );
}