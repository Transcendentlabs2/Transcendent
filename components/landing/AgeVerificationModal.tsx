'use client';
import { useState, useEffect } from 'react';

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificamos si ya existe el permiso en el navegador
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
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Verificación de Edad</h2>
        <p className="mb-6">Debes ser mayor de 18 años para acceder a este sitio de e-commerce.</p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleConfirm}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Soy mayor de 18
          </button>
          <button 
            onClick={handleReject}
            className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}