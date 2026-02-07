import ProductForm from "@/components/admin/products/ProductForm";
import ProductList from "@/components/admin/products/ProductList";
import { prisma } from "@/lib/prisma";

// Esta página es Server Component, así que podemos pedir datos a la DB directamente
export default async function ProductsPage() {
  // Obtenemos los productos ordenados por fecha
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[var(--glass-border)] pb-6">
        <div>
            <h1 className="text-4xl font-display font-black text-[var(--text-main)] tracking-tight">Product Management</h1>
            <p className="text-[var(--text-muted)] mt-2 max-w-xl">
                Create, monitor, and manage the laboratory's compound inventory. 
                Ensure all scientific data is accurate before publishing.
            </p>
        </div>
        <div className="text-right hidden md:block">
            <p className="text-3xl font-mono text-[var(--color-brand-primary)] font-bold">{products.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Total SKUs</p>
        </div>
      </div>

      {/* Formulario de Creación */}
      <ProductForm />

      {/* Listado de Productos Existentes */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 flex items-center gap-2">
            Database Entries
            <span className="text-xs font-normal text-[var(--text-muted)] bg-[var(--glass-border)] px-2 py-1 rounded-full">{products.length}</span>
        </h2>
        <ProductList products={products} />
      </div>
    </div>
  );
}