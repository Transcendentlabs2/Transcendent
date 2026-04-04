"use client";

import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/app/actions/place-order";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ formData, items, cartSubtotal, clearCart }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.state || !formData.postalCode) {
        alert("Please fill in all shipping information.");
        return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
      billing_details: {
        name: formData.name,
        email: formData.email,
        address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country
        }
      }
    });

    if (error) {
      alert(error.message);
      setIsLoading(false);
      return;
    }

    try {
        const cartPayload = items.map((item: any) => ({ productId: item.id, quantity: item.quantity }));
        const response = await placeOrder(cartPayload, formData, paymentMethod.id);
        
        if (response.ok && response.order) {
            clearCart(); 
            router.push(`/orders/${response.order.id}`); 
        } else {
            alert(response.message || "Error processing order");
            setIsLoading(false);
        }
    } catch (err) {
        alert("Unexpected error.");
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-xl">
        <label className="block text-xs font-bold mb-3 uppercase tracking-widest text-gray-500">
            Credit or Debit Card
        </label>
        <div className="py-2">
            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#111827', // <--- CAMBIADO A NEGRO CHARCOAL
                        fontFamily: 'sans-serif',
                        '::placeholder': { 
                            color: '#9ca3af' // <--- GRIS CLARO PARA EL MM/AA CVC
                        },
                    },
                    invalid: {
                        color: '#ef4444',
                    }
                },
            }} />
        </div>
      </div>

      <button 
        disabled={isLoading || !stripe}
        className="w-full bg-[#111827] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
        ) : (
            <>Pay ${cartSubtotal.toFixed(2)} Now</>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, cartSubtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", postalCode: "", country: "US"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (items.length === 0) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white">
              <p className="text-gray-500">Your cart is empty.</p>
              <Link href="/" className="mt-4 text-cyan-500 hover:underline">Return to catalog</Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <h1 className="text-2xl font-bold">Secure Checkout</h1>
            </div>

            <div className="space-y-8">
                {/* Contact Info */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold">1</div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Contact</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <input required name="name" onChange={handleInputChange} type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required name="email" onChange={handleInputChange} type="email" placeholder="Email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
                            <input required name="phone" onChange={handleInputChange} type="tel" placeholder="Phone" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
                        </div>
                    </div>
                </section>

                {/* Shipping Info */}
                <section className="space-y-4">
                     <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold">2</div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Shipping</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <select name="country" onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 appearance-none cursor-pointer">
                            <option value="US">United States</option>
                            <option value="CO">Colombia</option>
                        </select>
                        <input required name="address" onChange={handleInputChange} type="text" placeholder="Street Address" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
                        <div className="grid grid-cols-3 gap-4">
                            <input required name="city" onChange={handleInputChange} type="text" placeholder="City" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
                            <input required name="state" onChange={handleInputChange} type="text" placeholder="State" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors uppercase" />
                            <input required name="postalCode" onChange={handleInputChange} type="text" placeholder="Zip" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors" />
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4">Summary</h3>
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-500">{item.name} x{item.quantity}</span>
                            <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-100 text-cyan-600">
                        <span>Total</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        formData={formData} 
                        items={items} 
                        cartSubtotal={cartSubtotal} 
                        clearCart={clearCart} 
                    />
                </Elements>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Secure Encrypted Payment via Stripe</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}