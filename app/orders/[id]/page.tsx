import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, Package, ShieldCheck, ArrowRight, MapPin, CreditCard } from "lucide-react";

// Función para formatear dinero
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Obtenemos la orden directamente de la BD
async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return null;
  return order;
}

// --- CORRECCIÓN AQUÍ ---
// 1. Definimos el tipo como una Promesa
type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: Props) {
  // 2. Esperamos (await) a que se resuelvan los params antes de usarlos
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  // Calculamos cantidad total de items para mostrar
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-sans selection:bg-[var(--color-brand-primary)] selection:text-white pb-20">
      
      {/* Navbar Placeholder */}
      <div className="h-20" /> 

      <main className="container mx-auto px-4 max-w-5xl">
        
        {/* ENCABEZADO DE ESTADO */}
        <div className="mb-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full ring-1 ring-emerald-500/20 mb-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Order Generated
          </h1>
          <p className="text-[var(--text-muted)] max-w-md mx-auto">
            Thank you. Your order <span className="font-mono font-bold text-[var(--text-main)]">#{order.id.slice(0, 8)}</span> has been securely recorded in our system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: DETALLES DE PRODUCTOS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Lista de Items */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[var(--glass-border)] flex justify-between items-center">
                <h2 className="font-bold flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--color-brand-primary)]" />
                  Order Items
                </h2>
                <span className="text-xs font-mono bg-[var(--bg-page)] border border-[var(--glass-border)] px-2 py-1 rounded">
                  {totalItems} Units
                </span>
              </div>
              
              <div className="divide-y divide-[var(--glass-border)]">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4 hover:bg-[var(--glass-border)]/30 transition-colors">
                    {/* Imagen del producto */}
                    <div className="relative w-20 h-20 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--glass-border)] shrink-0">
                      {item.product.images ? (
                         <Image 
                           src={item.product.images} 
                           alt={item.product.name} 
                           fill 
                           className="object-contain p-2" 
                         />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                          Img
                        </div>
                      )}
                    </div>

                    {/* Detalles */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm md:text-base truncate pr-4">{item.product.name}</h3>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{item.product.category}</p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="text-xs text-[var(--text-muted)]">
                          Qty: <span className="font-mono font-bold text-[var(--text-main)]">{item.quantity}</span>
                        </div>
                        <div className="font-mono font-bold text-sm">
                          {formatCurrency(Number(item.price))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aviso de Seguridad / Científico */}
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-blue-400">Research Use Only</h4>
                <p className="text-xs text-[var(--text-muted)]">
                  These products are intended for laboratory research purposes only. By proceeding with this order, you confirm compliance with our handling protocols.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN Y PAGO */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            
            {/* Tarjeta de Totales */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6 space-y-6 shadow-xl backdrop-blur-xl">
              <h3 className="font-bold text-lg">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(Number(order.total))}</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-medium">Calculated at payment</span>
                </div>
                <div className="pt-4 border-t border-[var(--glass-border)] flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-mono font-bold text-2xl text-[var(--color-brand-primary)]">
                    {formatCurrency(Number(order.total))}
                  </span>
                </div>
              </div>

              {/* ESTADO DEL PAGO */}
              <div className="bg-[var(--bg-page)] rounded-xl p-4 border border-[var(--glass-border)]">
                 <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Payment Pending</span>
                 </div>
                 <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                   Your order is reserved. Please proceed to payment to initiate the shipping process.
                 </p>
              </div>

              {/* BOTÓN DE ACCIÓN */}
              <button 
                disabled 
                className="w-full bg-[var(--text-main)] text-[var(--bg-page)] py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Payment
              </button>
              <p className="text-[10px] text-center text-[var(--text-muted)]">
                Payment gateway integration coming soon.
              </p>
            </div>

            {/* Botón Volver */}
            <Link href="/" className="block">
              <button className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)] transition-colors flex items-center justify-center gap-2">
                Continue Researching
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}