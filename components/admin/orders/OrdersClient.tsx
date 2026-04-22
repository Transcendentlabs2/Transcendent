"use client";

import { useState, useEffect } from "react";
import { 
  Search, Package, Eye, Trash2, X, MapPin, Phone, Mail, Check, XCircle, Banknote, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateOrderStatus, deleteOrder } from "@/app/actions/admin-orders";
import Image from "next/image";
import Swal from 'sweetalert2';

type OrderType = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  paymentReference?: string | null;
  customer: { 
      name: string; 
      email: string; 
      phone: string;
      address: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
  };
  itemsCount: number;
  items: { 
    id: string;
    quantity: number;
    price: number;
    product: { name: string; images: string; };
  }[];
};

export default function OrdersClient({ initialOrders }: { initialOrders: OrderType[] }) {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("ALL_TIME");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  // --- ARREGLO DEL DOBLE SCROLL ---
  // Congela el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedOrder]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: { popup: 'colored-toast' }
  });

  const filteredOrders = initialOrders.filter((order) => {
    const matchesStatus = filter === "ALL" || order.status === filter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.paymentReference && order.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesDate = true;
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    
    if (dateRange === "LAST_7_DAYS") {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        matchesDate = orderDate >= sevenDaysAgo;
    } else if (dateRange === "THIS_MONTH") {
        matchesDate = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
    } else if (dateRange === "LAST_MONTH") {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        matchesDate = orderDate.getMonth() === lastMonth.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear();
    }

    return matchesStatus && matchesSearch && matchesDate;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsLoading(true);
    const result = await updateOrderStatus(orderId, newStatus as any);
    setIsLoading(false);

    if (result.ok) {
      Toast.fire({ icon: "success", title: `Order updated to ${newStatus}` });
    } else {
      Toast.fire({ icon: "error", title: "Failed to update status" });
    }
  };

  const handleApproveZelle = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Approve Zelle Payment?",
      text: "This will buy the EasyPost shipping label and email the customer. Ensure the money is in your bank account before proceeding!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#741bd9", 
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Yes, money received!",
      background: "#18181b",
      color: "#fff"
    });

    if (result.isConfirmed) {
      await handleStatusChange(orderId, 'PAID');
    }
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#18181b",
      color: "#fff"
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      const deleteResult = await deleteOrder(orderId);
      setIsLoading(false);
      setSelectedOrder(null);

      if (deleteResult.ok) {
        Swal.fire({ title: "Deleted!", icon: "success", background: "#18181b", color: "#fff" });
      } else {
        Swal.fire({ title: "Error!", icon: "error", background: "#18181b", color: "#fff" });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "VERIFYING_PAYMENT": return "text-[#741bd9] bg-[#741bd9]/10 border-[#741bd9]/30";
      case "PAID": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "SHIPPED": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "REJECTED": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "CANCELLED": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand-primary)]"></div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Total Revenue</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-[var(--text-main)] mt-1">
                ${filteredOrders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
        </div>
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Orders</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-[var(--text-main)] mt-1">
                {filteredOrders.length}
            </p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--bg-page)]/50 p-1 sticky top-0 z-10 backdrop-blur-md">
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
                <input 
                    type="text" 
                    placeholder="Search email, ref code or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-sm outline-none focus:border-[var(--color-brand-primary)]"
                />
            </div>

            <div className="relative w-full sm:w-48 group">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-sm outline-none focus:border-[var(--color-brand-primary)] appearance-none cursor-pointer text-[var(--text-main)]"
                >
                    <option value="ALL_TIME">All Time</option>
                    <option value="LAST_7_DAYS">Last 7 Days</option>
                    <option value="THIS_MONTH">This Month</option>
                    <option value="LAST_MONTH">Last Month</option>
                </select>
            </div>
        </div>

        <div className="flex gap-1 overflow-x-auto max-w-full no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {["ALL", "PENDING", "VERIFYING_PAYMENT", "PAID", "SHIPPED", "REJECTED"].map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all shrink-0 ${
                        filter === status 
                        ? "bg-[var(--text-main)] text-[var(--bg-page)] border-transparent" 
                        : "border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--text-main)]"
                    }`}
                >
                    {status === "VERIFYING_PAYMENT" ? "VERIFYING" : status}
                </button>
            ))}
        </div>
      </div>

      {/* LISTA DE ÓRDENES */}
      <div className="space-y-3">
        <AnimatePresence>
            {filteredOrders.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-[var(--text-muted)]">
                    No orders found for the selected filters.
                </motion.div>
            )}

            {filteredOrders.map((order) => (
                <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`bg-[var(--glass-bg)] border rounded-xl p-4 md:p-6 transition-all group ${
                        order.status === 'VERIFYING_PAYMENT' 
                        ? 'border-[#741bd9]/50 shadow-[0_0_15px_rgba(116,27,217,0.1)]' 
                        : 'border-[var(--glass-border)] hover:border-[var(--color-brand-primary)]/30'
                    }`}
                >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs text-[var(--text-muted)]">#{order.id.slice(0, 8)}</span>
                                <span className="text-[var(--text-muted)]">•</span>
                                <span className="text-xs text-[var(--text-muted)]">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="font-bold text-[var(--text-main)] truncate">{order.customer.email}</h4>
                            <p className="text-xs text-[var(--text-muted)] truncate">{order.customer.name}</p>
                            
                            {order.status === 'VERIFYING_PAYMENT' && order.paymentReference && (
                                <div className="mt-2 inline-flex items-center gap-2 bg-[#741bd9]/10 border border-[#741bd9]/20 px-3 py-1 rounded-md">
                                    <Banknote className="w-3 h-3 text-[#741bd9]" />
                                    <span className="text-xs text-[#741bd9] font-mono font-bold">Ref: {order.paymentReference}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end">
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                {order.status === 'VERIFYING_PAYMENT' ? 'VERIFYING' : order.status}
                            </div>
                            <div className="text-right">
                                <p className="font-mono font-bold text-[var(--text-main)]">${order.total.toFixed(2)}</p>
                                <p className="text-[10px] text-[var(--text-muted)]">{order.itemsCount} items</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--glass-border)] w-full md:w-auto">
                            
                            <button 
                                onClick={() => setSelectedOrder(order)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg text-xs font-bold hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors min-w-[100px]"
                            >
                                <Eye className="w-3 h-3" /> Details
                            </button>
                            
                            <div className="flex items-center gap-2 flex-1 justify-end min-w-[180px]">
                                {order.status === 'VERIFYING_PAYMENT' ? (
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button 
                                            onClick={() => handleApproveZelle(order.id)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-[#741bd9] text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#5e16b0] transition-colors"
                                        >
                                            <Check className="w-3 h-3" /> Approve
                                        </button>
                                        <button 
                                            onClick={() => handleStatusChange(order.id, 'REJECTED')}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors"
                                        >
                                            <XCircle className="w-3 h-3" /> Reject
                                        </button>
                                    </div>
                                ) : (
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="flex-1 md:flex-none bg-[var(--bg-page)] border border-[var(--glass-border)] text-xs rounded-lg px-2 py-2 outline-none focus:border-[var(--color-brand-primary)] cursor-pointer"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="VERIFYING_PAYMENT">Verifying</option>
                                        <option value="PAID">Paid</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="REJECTED">Rejected</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                )}

                                <button 
                                    onClick={() => handleDelete(order.id)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                                    title="Delete Order"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* MODAL DE DETALLES - CORRECCIÓN DE SCROLL */}
      <AnimatePresence>
        {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedOrder(null)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-[var(--bg-page)] border border-[var(--glass-border)] w-full max-w-lg max-h-[90dvh] sm:max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--glass-bg)] shrink-0">
                        <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                Order Details
                                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase border ${getStatusColor(selectedOrder.status)}`}>
                                    {selectedOrder.status === 'VERIFYING_PAYMENT' ? 'VERIFYING' : selectedOrder.status}
                                </span>
                            </h3>
                            <p className="font-mono text-xs text-[var(--text-muted)]">#{selectedOrder.id}</p>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
                        
                        {selectedOrder.paymentReference && (
                            <div className="bg-[#741bd9]/5 border border-[#741bd9]/20 p-4 rounded-xl space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#741bd9] flex items-center gap-2">
                                    <Banknote className="w-3 h-3" /> Zelle Payment
                                </h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[var(--text-muted)]">Confirmation:</span>
                                    <span className="font-mono font-bold text-base sm:text-lg text-[#741bd9] uppercase bg-white dark:bg-black px-2 py-1 rounded border border-[#741bd9]/30 break-all ml-2 text-right">
                                        {selectedOrder.paymentReference}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="bg-[var(--glass-border)]/20 p-4 rounded-xl border border-[var(--glass-border)] space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Shipping Info
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs">Customer</p>
                                    <p className="font-bold break-words">{selectedOrder.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs">Phone</p>
                                    <p className="font-mono flex items-center gap-1">
                                        <Phone className="w-3 h-3 opacity-50 shrink-0" /> 
                                        {selectedOrder.customer.phone}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-[var(--text-muted)] text-xs">Address</p>
                                    <p className="break-words">{selectedOrder.customer.address}</p>
                                    <p className="break-words">{selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.postalCode}</p>
                                    <p className="text-[var(--text-muted)] text-xs mt-1">{selectedOrder.customer.country}</p>
                                </div>
                                <div className="sm:col-span-2 pt-2 border-t border-[var(--glass-border)]">
                                     <p className="text-[var(--text-muted)] text-xs">Email</p>
                                     <p className="flex items-center gap-2 text-blue-400 break-words w-full">
                                        <Mail className="w-3 h-3 shrink-0" /> 
                                        <span className="break-all">{selectedOrder.customer.email}</span>
                                     </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                                <Package className="w-3 h-3" /> Products
                            </h4>
                            {selectedOrder.items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-[var(--glass-bg)]/30 rounded-xl border border-[var(--glass-border)]">
                                    <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
                                        {item.product.images ? (
                                            <Image src={item.product.images} alt={item.product.name} fill className="object-contain" />
                                        ) : ( <div className="w-full h-full bg-gray-200" /> )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold leading-tight truncate">{item.product.name}</h4>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xs text-[var(--text-muted)]">Qty: <b className="text-[var(--text-main)]">{item.quantity}</b></span>
                                            <span className="font-mono text-sm font-bold">${item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    
                    <div className="p-4 border-t border-[var(--glass-border)] flex justify-between items-center bg-[var(--glass-bg)] shrink-0">
                        <span className="text-sm text-[var(--text-muted)] font-bold">Total</span>
                        <span className="text-xl font-bold text-[var(--color-brand-primary)] font-mono">${selectedOrder.total.toLocaleString()}</span>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}