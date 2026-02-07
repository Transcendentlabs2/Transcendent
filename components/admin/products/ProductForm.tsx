"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Save, ImagePlus, X, FlaskConical } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

interface ProductFormProps {
  onClose: () => void;
  initialData?: any;
}

export default function ProductForm({ onClose, initialData }: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData?.images) {
      setImageUrl(initialData.images);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    if (!imageUrl) {
        Swal.fire({ 
            icon: 'warning', 
            title: 'Missing Image', 
            background: 'var(--bg-page)', // Adaptable
            color: 'var(--text-main)'      // Adaptable
        });
        setLoading(false);
        return;
    }
    formData.append("imageUrl", imageUrl);

    let result;
    if (initialData) {
      result = await updateProduct(initialData.id, formData);
    } else {
      result = await createProduct(formData);
    }

    setLoading(false);

    if (result.success) {
        Swal.fire({
            icon: 'success',
            title: initialData ? 'Database Updated' : 'Protocol Initiated',
            background: 'var(--bg-page)', 
            color: 'var(--text-main)', 
            confirmButtonColor: 'var(--color-brand-primary)',
            timer: 1500, 
            showConfirmButton: false
        });
        onClose();
    } else {
        Swal.fire({ 
            icon: 'error', 
            title: 'Error', 
            text: result.message, 
            background: 'var(--bg-page)', 
            color: 'var(--text-main)' 
        });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh]">
      
      {/* Header Fijo */}
      <div className="flex items-center justify-between p-5 border-b border-[var(--glass-border)] bg-[var(--bg-page)] sticky top-0 z-20 rounded-t-2xl">
        <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-main)] flex items-center gap-3">
          <FlaskConical className="text-[var(--color-brand-primary)]" />
          {initialData ? "Edit Compound Protocol" : "New Compound Protocol"}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-[var(--text-muted)]">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body con Scroll */}
      <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[var(--bg-page)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Product Name</label>
              <input name="name" defaultValue={initialData?.name} required className="input-scientific" placeholder="e.g. BPC-157" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Category</label>
              <select name="category" defaultValue={initialData?.category} className="input-scientific">
                <option value="peptides">Research Peptides</option>
                <option value="sarms">SARMs</option>
                <option value="nootropics">Nootropics</option>
                <option value="supplements">Supplements</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Price (USD)</label>
              <input name="price" type="number" step="0.01" defaultValue={Number(initialData?.price || 0)} required className="input-scientific" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Stock</label>
              <input name="stock" type="number" defaultValue={initialData?.stock} required className="input-scientific" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Purity Analysis</label>
              <input name="purity" defaultValue={initialData?.purity} className="input-scientific" placeholder=">99% HPLC" />
            </div>
          </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Scientific Description</label>
                <textarea name="description" defaultValue={initialData?.description} rows={4} required className="input-scientific resize-none" />
            </div>

            {/* Imagen Cloudinary - CORREGIDO: Fondo sutil */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Visual Documentation</label>
                
                <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-4 flex justify-center bg-[var(--text-muted)]/5 hover:bg-[var(--text-muted)]/10 transition-colors">
                    {imageUrl ? (
                        <div className="relative w-full h-48 md:w-64 md:h-64">
                            <Image src={imageUrl} alt="Product" fill className="object-contain rounded-lg" />
                            <button type="button" onClick={() => setImageUrl("")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"><X className="w-4 h-4"/></button>
                        </div>
                    ) : (
                        <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
                            onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
                            options={{
                                styles: {
                                    palette: {
                                        window: "#ffffff",
                                        sourceBg: "#f4f4f5",
                                        windowBorder: "#90a0b3",
                                        tabIcon: "#0078ff",
                                        inactiveTabIcon: "#69778a",
                                        menuIcons: "#0078ff",
                                        link: "#0078ff",
                                        action: "#339933",
                                        inProgress: "#0078ff",
                                        complete: "#339933",
                                        error: "#cc0000",
                                        textDark: "#000000",
                                        textLight: "#ffffff"
                                    },
                                }
                            }}
                        >
                            {({ open }) => (
                                <button type="button" onClick={() => open()} className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] py-8 transition-colors">
                                    <ImagePlus className="w-8 h-8 opacity-50" /> 
                                    <span className="text-sm font-bold">Upload Image</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                </div>
            </div>
        </form>
      </div>

      {/* Footer Botones Fijo */}
      <div className="flex justify-end gap-3 p-5 border-t border-[var(--glass-border)] bg-[var(--bg-page)] rounded-b-2xl sticky bottom-0 z-20">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-sm text-[var(--text-muted)] hover:bg-[var(--glass-border)] transition-colors">Cancel</button>
            <button 
                onClick={(e) => {
                    const form = e.currentTarget.closest('.relative')?.querySelector('form');
                    form?.requestSubmit();
                }}
                disabled={loading} 
                className="bg-[var(--text-main)] text-[var(--bg-page)] px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-[var(--glass-border)]"
            >
                {loading ? "Processing..." : <><Save className="w-4 h-4" /> {initialData ? "Save Changes" : "Create Product"}</>}
            </button>
      </div>

      <style jsx global>{`
        .input-scientific {
            width: 100%;
            background-color: var(--bg-page);
            border: 1px solid var(--glass-border);
            border-radius: 0.75rem;
            padding: 0.75rem 1rem;
            color: var(--text-main);
            outline: none;
            font-size: 0.875rem;
            transition: all 0.2s;
        }
        .input-scientific:focus {
            border-color: var(--color-brand-primary);
            box-shadow: 0 0 0 1px var(--color-brand-primary);
        }
        /* Ajuste para que el input disabled (si hubiera) se vea bien */
        .input-scientific:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}