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
    price: number;
    stock: number;
    images: string;
    slug: string;
}

interface ProductListProps {
    products: any[];
    onEdit: (product: any) => void; // Tipado correcto para la función
}

export default function ProductList({ products, onEdit }: ProductListProps) {
  
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
        title: 'Are you absolutely sure?',
        text: "This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#404040',
        confirmButtonText: 'Yes, delete it'
    });

    if (result.isConfirmed) {
        const response = await deleteProduct(id);
        if (response.success) {
            Swal.fire({
                title: 'Deleted!',
                text: 'Product removed.',
                icon: 'success',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#0ea5e9',
                timer: 1500,
                showConfirmButton: false
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-20">
      {products.map((product) => (
        <div key={product.id} className="group bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-2xl overflow-hidden hover:border-[var(--color-brand-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-brand-primary)]/5 transition-all duration-300 flex flex-col">
            
            {/* Header Imagen - Ajustado para que se vea completa */}
            <div className="relative h-52 w-full bg-[#111] border-b border-[var(--glass-border)] p-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image 
                        src={product.images} 
                        alt={product.name} 
                        fill 
                        className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="absolute top-3 right-3 bg-[var(--bg-page)]/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-[var(--text-muted)] uppercase border border-[var(--glass-border)] shadow-sm">
                    {product.category}
                </div>
            </div>

            {/* Info Body */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <h4 className="font-bold text-[var(--text-main)] text-base leading-tight line-clamp-2">{product.name}</h4>
                    <span className="text-[var(--color-brand-primary)] font-mono font-bold whitespace-nowrap">${Number(product.price).toFixed(2)}</span>
                </div>
                
                <p className="text-[10px] text-[var(--text-muted)] font-mono mb-4 truncate opacity-60">ID: {product.slug}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Package className="w-3.5 h-3.5" />
                        <span className={product.stock < 10 ? "text-red-400 font-bold" : ""}>
                            {product.stock} Units
                        </span>
                    </div>

                    <div className="flex gap-2">
                        {/* Botón Editar corregido */}
                        <button 
                            onClick={() => onEdit(product)}
                            className="p-2 text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--glass-border)] rounded-lg transition-colors" 
                            title="Edit Protocol"
                        >
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