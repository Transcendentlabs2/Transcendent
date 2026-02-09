import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Clock, 
  Package, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  Lock, 
  AlertCircle 
} from "lucide-react";

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

// Corrección de Next.js 15: Params como Promesa
type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-sans pb-20">
      
      <div className="h-20" /> 

      <main className="container mx-auto px-4 max-w-5xl">
        
        {/* 1. BARRA DE PROGRESO (NUEVO) */}
        {/* Esto le dice al cerebro: "No has terminado, falta poco" */}
        <div className="flex justify-center mb-10">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60">
                <span className="flex items-center gap-2 text-emerald-500 opacity-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-[var(--bg-page)] flex items-center justify-center text-[10px]">1</span>
                    Review
                </span>
                <div className="w-8 h-[1px] bg-[var(--glass-border)]" />
                <span className="flex items-center gap-2 text-[var(--text-main)] opacity-100">
                    <span className="w-5 h-5 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center text-[10px]">2</span>
                    Payment
                </span>
                <div className="w-8 h-[1px] bg-[var(--glass-border)]" />
                <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[10px]">3</span>
                    Shipping
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: DETALLES (Visualmente secundario ahora) */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1 opacity-90">
            
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--bg-page)]/50">
                <h2 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-[var(--text-muted)]">
                  <Package className="w-4 h-4" />
                  Order Details #{order.id.slice(0, 8)}
                </h2>
              </div>
              
              <div className="divide-y divide-[var(--glass-border)]">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <div className="relative w-16 h-16 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--glass-border)] shrink-0">
                      {item.product.images ? (
                         <Image src={item.product.images} alt={item.product.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">Img</div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-sm truncate pr-4">{item.product.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</span>
                            <span className="font-mono text-sm">{formatCurrency(Number(item.price))}</span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3 items-center">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-xs text-[var(--text-muted)]">
                <strong className="text-blue-400 block mb-1">Scientific Grade Guarantee</strong>
                Your items are reserved. Purity analysis certificates will be included in the shipment.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: EL FOCO DE ATENCIÓN (Payment) */}
          <div className="lg:col-span-1 space-y-6 sticky top-24 order-1 lg:order-2">
            
            {/* 2. TARJETA DE ACCIÓN PRINCIPAL */}
            <div className="bg-[var(--bg-page)] border border-amber-500/30 ring-4 ring-amber-500/5 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
              
              {/* Fondo decorativo sutil */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10" />

              <div className="space-y-2 text-center">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                    <Clock className="w-3 h-3" />
                    Payment Pending
                 </div>
                 <h1 className="text-2xl font-display font-bold">Finalize Your Order</h1>
                 <p className="text-xs text-[var(--text-muted)]">
                    Complete your payment to initiate the sterile packing process immediately.
                 </p>
              </div>

              <div className="py-4 border-t border-b border-dashed border-[var(--glass-border)] space-y-3">
                <div className="flex justify-between text-sm text-[var(--text-muted)]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(Number(order.total))}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--text-muted)]">
                  <span>Shipping</span>
                  <span className="text-xs bg-[var(--glass-border)] px-1.5 py-0.5 rounded">Calculated next</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold">Total Due</span>
                  <span className="font-mono font-bold text-3xl text-[var(--color-brand-primary)]">
                    {formatCurrency(Number(order.total))}
                  </span>
                </div>
              </div>

              {/* 3. BOTÓN DE PAGO (Call to Action) */}
              <div className="space-y-3">
                  <button 
                    disabled 
                    className="w-full bg-[var(--text-main)] text-[var(--bg-page)] py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 group hover:bg-[var(--color-brand-primary)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Payment
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)]">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span>256-bit SSL Encrypted Transaction</span>
                  </div>
                  
                  {/* Mensaje temporal de desarrollo */}
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded text-[10px] text-center text-amber-600">
                    <AlertCircle className="w-3 h-3 inline mr-1 mb-0.5" />
                    Stripe Integration Pending
                  </div>
              </div>
            </div>

            {/* Link secundario "Volver" (menos peso visual) */}
            <Link href="/" className="block text-center">
              <span className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors border-b border-transparent hover:border-[var(--text-muted)] pb-0.5 cursor-pointer">
                Modify Order
              </span>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}