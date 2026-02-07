"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct } from "@/app/actions/products";
import { Save, ImagePlus, X, FlaskConical, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2"; // Importamos SweetAlert

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejador del envío
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Validar que haya imagen
    if (!imageUrl) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Image',
            text: 'Please upload a product image before saving.',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0ea5e9'
        });
        setLoading(false);
        return;
    }
    
    formData.append("imageUrl", imageUrl);

    // Llamamos al Server Action
    const result = await createProduct(formData);

    setLoading(false);

    if (result.success) {
        // Alerta de Éxito
        Swal.fire({
            icon: 'success',
            title: 'Protocol Initiated',
            text: 'Product successfully added to the catalog.',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0ea5e9',
            timer: 2000,
            showConfirmButton: false
        });
        // Resetear formulario
        (e.target as HTMLFormElement).reset();
        setImageUrl("");
    } else {
        // Alerta de Error
        Swal.fire({
            icon: 'error',
            title: 'System Error',
            text: result.message,
            background: '#1a1a1a',
            color: '#fff'
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Detalles Principales */}
      <div className="bg-[var(--bg-page)]/60 border border-[var(--glass-border)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decoración CSS */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-primary)]/5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-lg font-display font-bold text-[var(--text-main)] mb-8 flex items-center gap-3 border-b border-[var(--glass-border)] pb-4">
          <FlaskConical className="text-[var(--color-brand-primary)] w-5 h-5" />
          Compound Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombre */}
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 group-focus-within:text-[var(--color-brand-primary)] transition-colors">Product Name</label>
            <input 
              name="name" 
              required 
              placeholder="e.g. BPC-157 Arg-Salt" 
              className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl p-3.5 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/30"
            />
          </div>

          {/* Categoría */}
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 group-focus-within:text-[var(--color-brand-primary)] transition-colors">Category</label>
            <select 
              name="category" 
              className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl p-3.5 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
            >
              <option value="peptides">Research Peptides</option>
              <option value="sarms">SARMs</option>
              <option value="nootropics">Nootropics</option>
              <option value="supplements">Supplements</option>
            </select>
          </div>

          {/* Precio */}
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 group-focus-within:text-[var(--color-brand-primary)] transition-colors">Unit Price (USD)</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">$</span>
                <input 
                name="price" 
                type="number" 
                step="0.01" 
                required 
                placeholder="0.00" 
                className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl p-3.5 pl-8 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/30"
                />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 group-focus-within:text-[var(--color-brand-primary)] transition-colors">Inventory Qty</label>
            <input 
              name="stock" 
              type="number" 
              required 
              placeholder="100" 
              className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl p-3.5 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/30"
            />
          </div>

           {/* Pureza */}
           <div className="space-y-2 group md:col-span-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 group-focus-within:text-[var(--color-brand-primary)] transition-colors">Purity Analysis</label>
            <input 
              name="purity" 
              placeholder="e.g. >99.8% High-Performance Liquid Chromatography (HPLC)" 
              className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl p-3.5 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/30"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2 mt-8 group">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1 group-focus-within:text-[var(--color-brand-primary)] transition-colors">Scientific Description</label>
            <textarea 
              name="description" 
              rows={5}
              required 
              placeholder="Enter detailed compound mechanism, storage instructions, and research notes..." 
              className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl p-3.5 text-[var(--text-main)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/30 resize-none"
            />
        </div>
      </div>

      {/* 2. Sección de Imagen */}
      <div className="bg-[var(--bg-page)]/60 border border-[var(--glass-border)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        <h3 className="text-lg font-display font-bold text-[var(--text-main)] mb-6 flex items-center gap-3">
          <ImagePlus className="text-[var(--color-brand-primary)] w-5 h-5" />
          Visual Documentation
        </h3>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--glass-border)] rounded-2xl p-12 hover:bg-[var(--glass-border)]/30 transition-all group">
          {imageUrl ? (
            <div className="relative w-64 h-64 shadow-2xl rounded-xl overflow-hidden border border-[var(--glass-border)]">
              <Image src={imageUrl} alt="Uploaded" fill className="object-cover" />
              <button 
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg p-1.5 backdrop-blur-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 w-full bg-emerald-500/90 text-white text-[10px] font-bold uppercase py-1 text-center backdrop-blur-sm">
                  Upload Complete
              </div>
            </div>
          ) : (
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result: any) => {
                setImageUrl(result.info.secure_url);
              }}
              options={{
                sources: ['local', 'url'],
                multiple: false,
                styles: {
                    palette: {
                        window: "#1a1a1a",
                        sourceBg: "#1a1a1a",
                        windowBorder: "#404040",
                        tabIcon: "#0ea5e9",
                        inactiveTabIcon: "#a3a3a3",
                        menuIcons: "#0ea5e9",
                        link: "#0ea5e9",
                        action: "#0ea5e9",
                        inProgress: "#0ea5e9",
                        complete: "#10b981",
                        error: "#ef4444",
                        textDark: "#000000",
                        textLight: "#ffffff"
                    },
                }
              }}
            >
              {({ open }) => (
                <button 
                  type="button"
                  onClick={() => open()}
                  className="flex flex-col items-center gap-4 text-[var(--text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors scale-95 group-hover:scale-100 duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-page)] border border-[var(--glass-border)] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_-5px_var(--color-brand-primary)] transition-all">
                    <ImagePlus className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-sm block">Upload Product Image</span>
                    <span className="text-[10px] opacity-60">Supports JPG, PNG, WEBP</span>
                  </div>
                </button>
              )}
            </CldUploadWidget>
          )}
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="flex justify-end pt-4">
        <button 
          type="submit"
          disabled={loading}
          className="bg-[var(--text-main)] text-[var(--bg-page)] font-bold py-4 px-10 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
             <>Processing...</>
          ) : (
             <>
               <CheckCircle2 className="w-5 h-5" />
               Save to Database
             </>
          )}
        </button>
      </div>

    </form>
  );
}