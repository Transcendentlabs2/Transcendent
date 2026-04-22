"use client";

import { use } from "react";
import Link from "next/link";
import { CheckCircle, Mail, Package, Clock, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
        
        {/* Ícono de Éxito animado */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-50"></div>
            <CheckCircle className="w-20 h-20 text-emerald-500 relative z-10" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          Reference Received!
        </h1>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Order Number</p>
          <p className="font-mono text-lg text-[#741bd9] font-bold">#{resolvedParams.id.slice(0, 8)}</p>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for your purchase. We have received your Zelle confirmation number. 
        </p>

        {/* Timeline de siguientes pasos */}
        <div className="text-left space-y-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0 mt-1">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">1. Payment Verification</h3>
              <p className="text-sm text-gray-500 mt-1">Our team is manually verifying your Zelle transfer. This usually takes a few hours during business days.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0 mt-1">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">2. Order Processing</h3>
              <p className="text-sm text-gray-500 mt-1">Once verified, we will safely pack and prepare your research products for shipping.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-1">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">3. Tracking Email</h3>
              <p className="text-sm text-gray-500 mt-1">You will receive an email with your EasyPost tracking number as soon as the label is created.</p>
            </div>
          </div>
        </div>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 w-full bg-[#111827] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg"
        >
          Return to Store <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}