"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { confirmZelleReference } from "@/app/actions/place-order";
import { Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image"; // <--- ¡Importamos Image!

export default function ZellePaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
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
    const res = await confirmZelleReference(resolvedParams.id, reference);
    
    if (res.ok) {
        router.push(`/orders/${resolvedParams.id}`);
    } else {
        alert("Something went wrong. Please try again.");
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

        <div className="p-8 space-y-8">
            
            {/* Paso 1: Instrucciones y QR */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#741bd9]/10 text-[#741bd9] flex items-center justify-center font-bold">1</div>
                    <h2 className="font-bold text-lg text-gray-800">Scan or Send Payment</h2>
                </div>
                
                {/* CAJA DEL QR Y CORREO */}
                <div className="ml-11 bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center space-y-6 shadow-inner">
                    
                    
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

                    <div className="w-full space-y-2 text-center">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Or send directly to:</p>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 w-full justify-between shadow-sm">
                            <span className="font-mono font-bold text-gray-800 break-all text-sm">{zelleEmail}</span>
                            <button 
                                onClick={handleCopy}
                                className="flex shrink-0 items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-[#741bd9] transition-all"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Paso 2: Confirmación */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#741bd9]/10 text-[#741bd9] flex items-center justify-center font-bold">2</div>
                    <h2 className="font-bold text-lg text-gray-800">Confirm your transfer</h2>
                </div>
                <p className="text-gray-500 pl-11 text-sm">
                    Once sent, paste the Zelle confirmation/reference number here to process your order.
                </p>
                
                <form onSubmit={handleSubmit} className="ml-11 space-y-4">
                    <input 
                        type="text" 
                        required
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="e.g. 1A2B3C4D5E" 
                        className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#741bd9] transition-colors uppercase font-mono shadow-sm"
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