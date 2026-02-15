'use client';
import { useState } from 'react';

export default function AgeVerificationModal() {
  // El modal se muestra por defecto siempre que el componente se monta
  const [showModal, setShowModal] = useState(true);

  const handleConfirm = () => {
    // Simplemente cerramos el estado local
    setShowModal(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-[#050505] border border-cyan-500/20 p-10 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.15)] text-center max-w-md mx-4">
        
        <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 rounded-full text-[10px] text-cyan-400 tracking-[0.2em] uppercase">
          Security Protocol
        </div>

        <h2 className="text-3xl font-bold mb-4 text-white tracking-tighter uppercase italic">
          Age Verification
        </h2>
        
        <p className="mb-8 text-gray-400 text-sm leading-relaxed">
          Access to <span className="text-white font-medium">Transcendent Labs</span> is restricted to individuals of legal age.
          <span className="block mt-2 text-cyan-500/80">
            Confirm you are 18 or older to proceed.
          </span>
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleConfirm}
            className="w-full bg-cyan-600 hover:bg-cyan-400 text-white font-bold py-4 rounded-lg transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(8,145,178,0.3)]"
          >
            I AM 18+ | ENTER
          </button>
          
          <button 
            onClick={handleReject}
            className="w-full text-gray-600 hover:text-red-400 py-2 text-xs transition-colors uppercase tracking-widest"
          >
            Exit Site
          </button>
        </div>

        <p className="mt-8 text-[9px] text-gray-700 uppercase tracking-[0.3em]">
          Bio-Active Research | 2026
        </p>
      </div>
    </div>
  );
}