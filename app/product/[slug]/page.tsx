import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductTemplate from "@/components/product/ProductTemplate";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findFirst({ where: { slug: params.slug } });
  if (!product) return { title: "Compound Not Found" };
  return {
    title: `Buy ${product.name} | Research Grade | Transcendent Labs`,
    description: `High purity ${product.name} for laboratory research. HPLC verified. ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}.`,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findFirst({
    where: { slug: params.slug, isActive: true },
  });

  if (!product) notFound();

  // Serializamos datos para evitar errores de Decimal
  const serializedProduct = {
    ...product,
    price: Number(product.price),
    purity: product.purity || "99% HPLC",
    description: product.description || "Research grade compound validated for laboratory use."
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] selection:bg-[var(--color-brand-primary)] selection:text-white">
       <ProductTemplate product={serializedProduct} />
    </main>
  );
}