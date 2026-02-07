"use client";

import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { Plus } from "lucide-react";

export default function ProductManager({ products }: { products: any[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const handleCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
            Database Entries
            <span className="text-xs font-normal text-[var(--text-muted)] bg-[var(--glass-border)] px-2 py-1 rounded-full">{products.length}</span>
         </h2>
         
         <button 
            onClick={handleCreate}
            className="bg-[var(--color-brand-primary)] text-[var(--bg-page)] font-bold py-3 px-6 rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_-5px_var(--color-brand-primary)]"
         >
            <Plus className="w-5 h-5" />
            Add New Product
         </button>
      </div>

      <ProductList products={products} onEdit={handleEdit} />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-4xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
             <ProductForm 
                onClose={() => setModalOpen(false)} 
                initialData={editingProduct} 
             />
          </div>
        </div>
      )}
    </>
  );
}