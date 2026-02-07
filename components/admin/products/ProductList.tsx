"use client";

import { deleteProduct } from "@/app/actions/products";
import { Trash2, Edit, Package, AlertCircle } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

// Definimos la interfaz del producto
interface Product {
    id: string;
    name: string;
    category: string;
    price: number; // o string, dependiendo de cómo prisma devuelva el Decimal
    stock: number;
    images: string;
    slug: string;
}

export default function ProductList({ products }: { products: any[] }) {
  
  const handleDelete = async (id: string) => {
    // 1. Confirmación con SweetAlert
    const result = await Swal.fire({
        title: 'Are you absolutely sure?',
        text: "This action cannot be undone. The compound will be permanently removed.",
        icon: 'warning',
        showCancelButton: true,
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#404040',
        confirmButtonText: 'Yes, delete it'
    });

    if (result.isConfirmed) {
        // 2. Llamada al server action
        const response = await deleteProduct(id);
        
        if (response.success) {
            Swal.fire({
                title: 'Deleted!',
                text: 'The product has been removed.',
                icon: 'success',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
        } else {
            Swal.fire('Error', 'Could not delete product.', 'error');
        }
    }
  };

  if (products.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-[var(--glass-border)] rounded-2xl text-[var(--text-muted)] mt-8">
              <Package className="w-12 h-12 mb-4 opacity-50" />
              <p>No products found in the database.</p>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
      {products.map((product) => (
        <div key={product.id} className="group bg-[var(--bg-page)]/40 border border-[var(--glass-border)] rounded-2xl overflow-hidden hover:border-[var(--color-brand-primary)]/50 transition-all duration-300 flex flex-col">
            
            {/* Header Imagen */}
            <div className="relative h-48 w-full bg-[var(--bg-page)] border-b border-[var(--glass-border)]">
                <Image 
                    src={product.images} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white uppercase border border-white/10">
                    {product.category}
                </div>
            </div>

            {/* Info Body */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[var(--text-main)] text-lg leading-tight">{product.name}</h4>
                    <span className="text-[var(--color-brand-primary)] font-mono font-bold">${Number(product.price).toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-[var(--text-muted)] font-mono mb-4 truncate">ID: {product.slug}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Package className="w-3.5 h-3.5" />
                        <span className={product.stock < 10 ? "text-red-400 font-bold" : ""}>
                            {product.stock} Units
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)] rounded-lg transition-colors" title="Edit (Coming Soon)">
                            <Edit className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" 
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}