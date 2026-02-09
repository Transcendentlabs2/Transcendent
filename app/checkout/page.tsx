"use client";

import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/app/actions/place-order";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Lock, Loader2, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const cartPayload = items.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const response = await placeOrder(cartPayload, formData);

        if (response.ok && response.order) {
            clearCart(); 
            router.push(`/orders/${response.order.id}`); // AQUÍ nos vamos al paso final
        } else {
            alert(response.message || "Error processing order");
        }
    } catch (error) {
        console.error(error);
        alert("Unexpected error. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  if (items.length === 0) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-page)] text-[var(--text-muted)]">
              <p>Your cart is empty.</p>
              <Link href="/" className="mt-4 text-[var(--color-brand-primary)] hover:underline">Return to catalog</Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-sans pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* FORMULARIO */}
        <div className="space-y-8">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/" className="p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[var(--text-muted)]" />
                </Link>
                <h1 className="text-2xl font-display font-bold">Secure Checkout</h1>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Contact Info */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-[var(--glass-border)] pb-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-brand-primary)] text-white flex items-center justify-center text-xs font-bold">1</div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Contact Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">Full Name</label>
                            <input required name="name" onChange={handleInputChange} type="text" placeholder="John Doe" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">Email</label>
                                <input required name="email" onChange={handleInputChange} type="email" placeholder="john@university.edu" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">Phone (Mobile)</label>
                                <input required name="phone" onChange={handleInputChange} type="tel" placeholder="(555) 123-4567" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shipping Info - US FORMAT */}
                <section className="space-y-4">
                     <div className="flex items-center gap-2 border-b border-[var(--glass-border)] pb-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-brand-primary)] text-white flex items-center justify-center text-xs font-bold">2</div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Shipping Address</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">Country</label>
                            <div className="w-full bg-[var(--glass-border)]/30 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-muted)] flex items-center gap-2 cursor-not-allowed">
                                <MapPin className="w-4 h-4" />
                                United States
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">Street Address</label>
                            <input required name="address" onChange={handleInputChange} type="text" placeholder="123 Science Dr" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors" />
                        </div>

                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">City</label>
                                <input required name="city" onChange={handleInputChange} type="text" placeholder="Boston" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors" />
                            </div>
                            <div className="col-span-3 md:col-span-2">
                                <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">State</label>
                                <input required name="state" onChange={handleInputChange} type="text" placeholder="MA" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors uppercase" maxLength={2} />
                            </div>
                            <div className="col-span-3 md:col-span-1">
                                <label className="block text-xs font-bold mb-1 ml-1 text-[var(--text-muted)]">Zip Code</label>
                                <input required name="postalCode" onChange={handleInputChange} type="text" placeholder="02115" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-primary)] transition-colors" />
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>

        {/* RESUMEN */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0 border border-[var(--glass-border)]">
                                <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{item.name}</p>
                                <div className="flex justify-between text-xs text-[var(--text-muted)]">
                                    <span>Qty: {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[var(--glass-border)] mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-xl font-bold pt-2 text-[var(--color-brand-primary)]">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>

                <button 
                    type="submit" 
                    form="checkout-form"
                    disabled={isLoading}
                    className="w-full mt-6 bg-[var(--text-main)] text-[var(--bg-page)] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[var(--color-brand-primary)] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    {isLoading ? "Processing..." : "Confirm & Pay"}
                </button>

                <div className="mt-4 flex flex-col items-center justify-center gap-1 text-center">
                   <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                       <ShieldCheck className="w-3 h-3 text-emerald-500" />
                       <span>SSL Secure Encrypted Payment</span>
                   </div>
                   <p className="text-[10px] text-[var(--text-muted)] opacity-70">
                       Research Use Only. Not for human consumption.
                   </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}