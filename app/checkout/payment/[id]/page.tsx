"use client";

import { use, useState, useEffect } from "react";
import { confirmZelleReference } from "@/app/actions/place-order";
import { Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image"; 

export default function ZellePaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { clearCart } = useCart();
  
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const zelleEmail = "transcendent.labs2@gmail.com";

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#741bd9]/10 text-[#741bd9] flex items-center justify-center font-bold shrink-0">1</div>
                    <h2 className="font-bold text-lg text-gray-800">Scan or Send Payment</h2>
                </div>
                
                {/* CAJA DEL QR Y CORREO - ARREGLO RESPONSIVE */}
                <div className="ml-0 sm:ml-11 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center space-y-6 shadow-inner w-full">
                    
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                        <Image 
                            src="/zelle-qr.jpeg" 
                            alt="Zelle QR Code" 
                            width={200} 
                            height={200} 
                            className="rounded-xl"
                            priority
                        />
                    </div>

                    <div className="w-full space-y-3 text-center">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Or send directly to:</p>
                        
                        <div className="flex flex-col bg-white p-3 rounded-xl border border-gray-200 w-full shadow-sm gap-3">
                            <span className="font-mono font-bold text-gray-800 text-[15px] sm:text-base text-center break-words w-full">
                                {zelleEmail}
                            </span>
                            <button 
                                onClick={handleCopy}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-[#741bd9] transition-all"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied!" : "Copy Email"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Paso 2: Confirmación */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#741bd9]/10 text-[#741bd9] flex items-center justify-center font-bold shrink-0">2</div>
                    <h2 className="font-bold text-lg text-gray-800">Confirm your transfer</h2>
                </div>
                <p className="text-gray-500 ml-0 sm:ml-11 text-sm">
                    Once sent, paste the Zelle confirmation/reference number here to process your order.
                </p>
                
                <form onSubmit={handleSubmit} className="ml-0 sm:ml-11 space-y-4">
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
  );
}