'use client';
import { useState, useEffect } from 'react';

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificamos si ya existe la validación en el almacenamiento local
    const isVerified = localStorage.getItem('isAdult');
    if (!isVerified) {
      setShowModal(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('isAdult', 'true');
    setShowModal(false);
  };

  const handleReject = () => {
    // Redirección externa si no cumple la edad
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="bg-[#0a0a0a] border border-cyan-900/50 p-10 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] text-center max-w-md mx-4">
        
        <h2 className="text-3xl font-bold mb-4 text-white tracking-tighter">
          AGE VERIFICATION
        </h2>
        
        <p className="mb-8 text-gray-400 text-sm sm:text-base leading-relaxed">
          The products on this website are intended for adults only. 
          <span className="block mt-2 font-semibold text-cyan-500">
            By entering, you confirm you are 18+ years of age.
          </span>
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleConfirm}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-cyan-900/20"
          >
            I AM 18 OR OLDER
          </button>
          
          <button 
            onClick={handleReject}
            className="w-full bg-transparent text-gray-500 hover:text-white py-2 text-sm transition-colors"
          >
            I am under 18 (Exit)
          </button>
        </div>

        <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-widest">
          Transcendent &copy; 2026 | Future of Peptides
        </p>
      </div>
    </div>
  );
}