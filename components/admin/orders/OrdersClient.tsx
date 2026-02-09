"use client";

import { useState } from "react";
// BORRAMOS EL IMPORT DE DATE-FNS PORQUE NO LO NECESITAMOS
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Package, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Truck, 
  MoreHorizontal,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Definimos los tipos que vienen del servidor
type OrderType = {
  id: string;
  total: number; // Ya convertido de Decimal a Number
  status: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  itemsCount: number;
};

export default function OrdersClient({ initialOrders }: { initialOrders: OrderType[] }) {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de Filtrado
  const filteredOrders = initialOrders.filter((order) => {
    const matchesStatus = filter === "ALL" || order.status === filter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  // Estadísticas rápidas
  const totalRevenue = filteredOrders.reduce((acc, curr) => acc + curr.total, 0);
  const pendingCount = initialOrders.filter(o => o.status === "PENDING").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "PAID": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "SHIPPED": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "CANCELLED": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-3 h-3" />;
      case "PAID": return <CheckCircle2 className="w-3 h-3" />;
      case "SHIPPED": return <Truck className="w-3 h-3" />;
      case "CANCELLED": return <XCircle className="w-3 h-3" />;
      default: return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. DASHBOARD STATS (Resumen rápido) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Total Revenue</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-[var(--text-main)] mt-1">
                ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
        </div>
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Orders</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-[var(--text-main)] mt-1">
                {filteredOrders.length} <span className="text-sm text-[var(--text-muted)] font-sans">/ {initialOrders.length}</span>
            </p>
        </div>
         {/* Ocultar en móviles muy pequeños si quieres ahorrar espacio */}
         <div className="hidden md:block bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Pending Action</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-amber-500 mt-1">
                {pendingCount}
            </p>
        </div>
      </div>

      {/* 2. BARRA DE HERRAMIENTAS (Buscador + Filtros) */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--bg-page)]/50 p-1 sticky top-0 z-10 backdrop-blur-md">
        
        {/* Buscador */}
        <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--color-brand-primary)] transition-colors" />
            </div>
            <input 
                type="text" 
                placeholder="Search by Order ID, Email or Name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-sm outline-none focus:border-[var(--color-brand-primary)] transition-all"
            />
        </div>

        {/* Filtros (Tabs) */}
        <div className="flex items-center gap-1 p-1 bg-[var(--glass-border)] rounded-lg overflow-x-auto max-w-full no-scrollbar">
            {["ALL", "PENDING", "PAID", "SHIPPED"].map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                        filter === status 
                        ? "bg-[var(--bg-page)] text-[var(--text-main)] shadow-sm" 
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      {/* 3. VISTA DE DATOS (Móvil vs Desktop) */}
      
      {/* VISTA MÓVIL (Cards) - Visible solo en pantallas pequeñas */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
            {filteredOrders.map((order) => (
                <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 active:scale-[0.99] transition-transform"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                        </div>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    
                    <div className="mb-3">
                        <h4 className="font-bold text-sm text-[var(--text-main)] truncate">
                            {order.user.email}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] font-mono truncate">
                            ID: #{order.id.slice(0, 8)}...
                        </p>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-[var(--glass-border)]">
                        <div className="text-xs text-[var(--text-muted)]">
                            {order.itemsCount} Items
                        </div>
                        <div className="font-mono font-bold text-[var(--color-brand-primary)]">
                            ${order.total.toFixed(2)}
                        </div>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
        {filteredOrders.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)] text-sm">No orders found</div>
        )}
      </div>

      {/* VISTA DESKTOP (Tabla) - Visible solo en md en adelante */}
      <div className="hidden md:block bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
            <thead className="bg-[var(--glass-border)]/50 text-[var(--text-muted)] font-display uppercase text-xs tracking-wider">
                <tr>
                    <th className="px-6 py-4 font-bold">Order ID</th>
                    <th className="px-6 py-4 font-bold">Customer</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Total</th>
                    <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]">
                {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[var(--glass-border)]/30 transition-colors group">
                        <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)]">
                            #{order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4">
                            <div className="font-bold text-[var(--text-main)]">{order.user.name || "Guest"}</div>
                            <div className="text-xs text-[var(--text-muted)]">{order.user.email}</div>
                        </td>
                        <td className="px-6 py-4 text-[var(--text-muted)]">
                            {new Date(order.createdAt).toLocaleDateString()} <br/>
                            <span className="text-[10px] opacity-70">{new Date(order.createdAt).toLocaleTimeString()}</span>
                        </td>
                        <td className="px-6 py-4">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border w-fit ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-[var(--text-main)]">
                            ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                            <button className="p-2 hover:bg-[var(--glass-border)] rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p>No matching orders found</p>
            </div>
        )}
      </div>

    </div>
  );
}