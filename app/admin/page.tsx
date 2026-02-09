import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Package, Activity } from "lucide-react";

// Forzamos que esta página siempre busque datos frescos (no caché estático)
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  
  // 1. OBTENCIÓN DE DATOS PARALELA (Para máxima velocidad)
  const [revenueData, activeOrdersCount, researchersCount] = await Promise.all([
    
    // A. Revenue: Suma del total de órdenes (excluyendo canceladas)
    prisma.order.aggregate({
      _sum: { total: true },
      where: {
        status: { not: 'CANCELLED' } 
      }
    }),

    // B. Active Orders: Pendientes, Pagadas o Enviadas (no entregadas/canceladas)
    prisma.order.count({
      where: {
        status: { in: ['PENDING', 'PAID', 'SHIPPED'] }
      }
    }),

    // C. Researchers: Total de usuarios
    prisma.user.count(),
  ]);

  // Manejo de valores nulos (si no hay ventas aún)
  const totalRevenue = Number(revenueData._sum.total || 0);

  // Formateador de moneda
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-display font-bold text-[var(--text-main)]">Dashboard</h1>
            <p className="text-[var(--text-muted)] text-sm">Laboratory activity overview.</p>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--glass-bg)] px-3 py-1 rounded-full border border-[var(--glass-border)]">
            v1.0.0 Stable
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</h3>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
             </div>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">
                {formatCurrency(totalRevenue)}
             </p>
             <div className="mt-4 text-[10px] text-emerald-400 flex items-center gap-1">
                <span>All time</span> <span className="text-[var(--text-muted)]">gross volume</span>
             </div>
        </div>

        {/* Card 2: Orders */}
        <Link href="/admin/orders" className="block">
            <div className="h-full p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-[var(--color-brand-primary)]/30 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Orders</h3>
                    <Package className="w-4 h-4 text-[var(--color-brand-primary)]" />
                </div>
                <p className="text-3xl font-mono font-medium text-[var(--text-main)]">
                    {activeOrdersCount}
                </p>
                <div className="mt-4 text-[10px] text-[var(--text-muted)] flex items-center gap-1 group-hover:text-[var(--color-brand-primary)] transition-colors">
                    <span>Manage orders</span> <ArrowRight className="w-3 h-3" />
                </div>
            </div>
        </Link>

        {/* Card 3: Researchers */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Researchers</h3>
                <Users className="w-4 h-4 text-blue-500" />
             </div>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">
                {researchersCount}
             </p>
        </div>

        {/* Card 4: System Status */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">System Status</h3>
                 <Activity className="w-4 h-4 text-emerald-500" />
             </div>
             <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                </span>
                <span className="text-sm font-medium text-emerald-400">Operational</span>
             </div>
             <p className="mt-2 text-[10px] text-[var(--text-muted)]">Database connected</p>
        </div>

      </div>

      {/* Secondary Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border border-[var(--glass-border)] rounded-2xl p-8 bg-[var(--bg-page)]/20 min-h-[300px] flex flex-col items-center justify-center text-[var(--text-muted)] border-dashed">
           <Activity className="w-10 h-10 mb-4 opacity-20" />
           <p>Performance charts module coming soon.</p>
        </div>
        
        {/* Quick Actions (Nuevo detalle pro) */}
        <div className="border border-[var(--glass-border)] rounded-2xl p-6 bg-[var(--bg-page)]/20">
            <h3 className="font-bold text-sm mb-4 text-[var(--text-main)]">Quick Actions</h3>
            <div className="space-y-2">
                <Link href="/admin/products/new">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-border)] transition-colors text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-between group">
                        Add New Product
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </Link>
                <Link href="/admin/orders">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-border)] transition-colors text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-between group">
                        View All Orders
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </Link>
            </div>
        </div>
      </div>

    </div>
  );
}