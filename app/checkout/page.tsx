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

// Modificamos el prop para recibir promoCode también
function CheckoutForm({ formData, items, finalTotal, clearCart, promoCode }: any) {
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
        
        // --- INTERVENCIÓN QUIRÚRGICA: Pasamos el promoCode al backend ---
        const response = await placeOrder(cartPayload, formData, paymentMethod.id, promoCode);
        
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
                        color: '#111827',
                        fontFamily: 'sans-serif',
                        '::placeholder': { 
                            color: '#9ca3af' 
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
            <>Pay ${finalTotal.toFixed(2)} Now</>
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

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- MATEMÁTICA VISUAL REFLEJANDO EL BACKEND ---
  const discount5Codes = ['UNCDAVE', 'ANT26', 'BIGTEX', 'YANKS26'];
  let calculatedSubtotal = cartSubtotal;

  if (appliedPromo === "TEST1") {
    calculatedSubtotal = items.reduce((acc: number, item: any) => acc + (1 * item.quantity), 0);
  } else if (discount5Codes.includes(appliedPromo)) {
    calculatedSubtotal = items.reduce((acc: number, item: any) => acc + (item.price * 0.95 * item.quantity), 0);
  }

  let shippingCost = (calculatedSubtotal > 0 && calculatedSubtotal < 300) ? 9.95 : 0;
  if (appliedPromo === "TEST1") {
    shippingCost = 0;
  }

  const finalTotal = calculatedSubtotal + shippingCost;

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
                    {items.map((item) => {
                        let itemFinalPrice = item.price;
                        if (appliedPromo === "TEST1") {
                            itemFinalPrice = 1;
                        } else if (discount5Codes.includes(appliedPromo)) {
                            itemFinalPrice = item.price * 0.95;
                        }
                        
                        const isDiscounted = appliedPromo === "TEST1" || discount5Codes.includes(appliedPromo);

                        return (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-500">{item.name} x{item.quantity}</span>
                                <span className="font-mono">
                                    {isDiscounted && <span className="line-through text-gray-300 mr-2">${(item.price * item.quantity).toFixed(2)}</span>}
                                    ${(itemFinalPrice * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Campo de Promo Code */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value)}
                            placeholder="Enter code"
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-cyan-500 transition-colors uppercase"
                        />
                        <button
                            type="button"
                            onClick={() => setAppliedPromo(promoCodeInput.trim().toUpperCase())}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                    {appliedPromo === 'TEST1' && (
                        <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Test mode active: items are $1, shipping is free.
                        </p>
                    )}
                    {discount5Codes.includes(appliedPromo) && (
                        <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> 5% Discount applied successfully!
                        </p>
                    )}
                </div>

                {/* Desglose de Subtotal, Envío y Total */}
                <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>${calculatedSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Shipping</span>
                        <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-100 text-cyan-600">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        formData={formData} 
                        items={items} 
                        finalTotal={finalTotal} 
                        clearCart={clearCart} 
                        promoCode={appliedPromo} 
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