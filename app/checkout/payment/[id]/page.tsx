"use client";

import { use, useState, useEffect } from "react";
import { confirmZelleReference } from "@/app/actions/place-order";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image"; 

export default function ZellePaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { clearCart } = useCart();
  
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return alert("Please enter the Zelle confirmation number.");
    
    setIsLoading(true);
    
    try {
        const res = await confirmZelleReference(resolvedParams.id, reference);
        
        if (res?.ok) {
            window.location.href = `/checkout/success/${resolvedParams.id}`;
        } else {
            alert(res?.message || "Something went wrong saving the reference. Please try again.");
            setIsLoading(false);
        }
    } catch (error: any) {
        console.error("Server Action Crash:", error);
        alert(`A critical server error occurred: ${error?.message || "Unknown error"}. Check Vercel/Hostinger logs.`);
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Cabecera Zelle */}
        <div className="bg-[#741bd9] text-white p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-3xl font-black tracking-tight mb-2">Pay with Zelle</h1>
                <p className="text-purple-200 text-sm font-medium">Complete your secure checkout via your banking app.</p>
            </div>
            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
            
            {/* Paso 1: Instrucciones y QR */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#741bd9]/10 text-[#741bd9] flex items-center justify-center font-bold shrink-0">1</div>
                    <h2 className="font-bold text-lg text-gray-800">Scan Payment QR</h2>
                </div>
                
                {/* CAJA DEL QR - ENVOLTORIO RESPONSIVE (Evita desbordamiento) */}
                <div className="pl-0 sm:pl-11">
                    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 flex flex-col items-center justify-center shadow-inner">
                        
                        {/* El contenedor del QR crecerá en desktop y se ajustará en mobile */}
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center aspect-square w-48 sm:w-64">
                            <Image 
                                src="/zelle-qr.jpeg" 
                                alt="Zelle QR Code" 
                                width={300} 
                                height={300} 
                                className="rounded-2xl w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        <p className="text-sm text-gray-500 mt-5 text-center font-medium">
                            Scan this code using your banking app
                        </p>

                    </div>
                </div>
            </div>

            {/* Paso 2: Confirmación */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#741bd9]/10 text-[#741bd9] flex items-center justify-center font-bold shrink-0">2</div>
                    <h2 className="font-bold text-lg text-gray-800">Confirm your transfer</h2>
                </div>
                
                <div className="pl-0 sm:pl-11 space-y-4">
                    <p className="text-gray-500 text-sm">
                        Once sent, paste the Zelle confirmation/reference number here to process your order.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                            type="text" 
                            required
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            placeholder="e.g. 1A2B3C4D5E" 
                            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#741bd9] transition-colors uppercase font-mono shadow-sm text-center sm:text-left"
                        />
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#741bd9] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#5b15ab] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:shadow-none"
                        >
                            {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : "Submit Confirmation"}
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}