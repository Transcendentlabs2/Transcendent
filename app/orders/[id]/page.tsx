import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, Package, ShieldCheck, CreditCard, AlertCircle, Edit, MapPin } from "lucide-react";

// Función para formatear dinero
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
};

// Obtenemos la orden
async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
  if (!order) return null;
  return order;
}

type Props = { params: Promise<{ id: string }> };

export default async function OrderPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-page)] text-[var(--text-main)] font-sans pb-10 pt-24 md:pt-32">
      <main className="container mx-auto px-4 max-w-5xl">
        
        {/* Progress Bar (Ahora estamos en el paso 2: Payment) */}
        <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                <span className="flex items-center gap-2 text-emerald-500">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-[var(--bg-page)] flex items-center justify-center">1</span>
                    Review
                </span>
                <div className="w-4 md:w-8 h-[1px] bg-[var(--glass-border)]" />
                <span className="flex items-center gap-2 text-[var(--text-main)]">
                    <span className="w-5 h-5 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center animate-pulse">2</span>
                    Payment
                </span>
                <div className="w-4 md:w-8 h-[1px] bg-[var(--glass-border)]" />
                <span className="flex items-center gap-2 opacity-50">
                    <span className="w-5 h-5 rounded-full border border-[var(--glass-border)] flex items-center justify-center">3</span>
                    Shipping
                </span>
            </div>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          
          {/* DETALLES DE LA ORDEN (Lo que compró y a dónde va) */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 w-full">
            
            {/* Productos */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 md:p-6 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--bg-page)]/50">
                <h2 className="font-bold flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider text-[var(--text-muted)]">
                  <Package className="w-4 h-4" />
                  Order #{order.id.slice(0, 8)}
                </h2>
                <span className="text-[10px] bg-[var(--glass-border)] px-2 py-1 rounded-full text-[var(--text-muted)]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="divide-y divide-[var(--glass-border)]">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-3 md:gap-4">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--glass-border)] shrink-0">
                      {item.product.images ? (
                         <Image src={item.product.images} alt={item.product.name} fill className="object-contain p-1" />
                      ) : ( <div className="w-full h-full bg-gray-100" /> )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-bold text-sm truncate">{item.product.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</span>
                            <span className="font-mono text-sm font-bold">{formatCurrency(Number(item.price))}</span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dirección de Envío (Datos que vienen de la orden) */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Shipping Destination
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <p className="text-[var(--text-muted)] text-xs mb-1">Customer</p>
                        <p className="font-bold">{order.customerName}</p>
                        <p>{order.customerEmail}</p>
                        <p className="text-[var(--text-muted)] text-xs mt-1">{order.customerPhone}</p>
                    </div>
                    <div>
                        <p className="text-[var(--text-muted)] text-xs mb-1">Address</p>
                        <p>{order.addressLine1}</p>
                        <p>{order.city}, {order.state} {order.postalCode}</p>
                        <p className="font-bold">{order.country}</p>
                    </div>
                </div>
            </div>
          </div>

          {/* TARJETA DE PAGO */}
          <div className="lg:col-span-1 w-full lg:sticky lg:top-24 space-y-4 md:space-y-6">
            <div className="bg-[var(--bg-page)] border border-amber-500/30 ring-1 ring-amber-500/10 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10" />

              <div className="text-center space-y-2">
                 <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                    <Clock className="w-3 h-3" /> Pending Payment
                 </div>
                 <h1 className="text-xl md:text-2xl font-display font-bold">Total Due</h1>
              </div>

              <div className="flex justify-center items-baseline gap-1 py-2 border-y border-dashed border-[var(--glass-border)]">
                  <span className="text-sm text-[var(--text-muted)] align-top mt-1">$</span>
                  <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--color-brand-primary)]">
                    {Number(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
              </div>

              <button disabled className="w-full bg-[var(--text-main)] text-[var(--bg-page)] py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 opacity-80 cursor-not-allowed text-sm md:text-base">
                <CreditCard className="w-4 h-4" /> Pay Now
              </button>
              
              <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-2 rounded text-[10px] text-center text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-3 h-3 inline mr-1 mb-0.5" /> Stripe Integration Pending
              </div>
            </div>

            <div className="text-center">
                <Link href="/#catalog" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-main)] hover:underline">
                    <Edit className="w-3 h-3" /> Start New Order
                </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}