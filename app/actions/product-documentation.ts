"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateProductDocumentation(id: string, formData: FormData) {
  const purity = String(formData.get("purity") || "").trim();
  const sequence = String(formData.get("sequence") || "").trim();

  const product = await prisma.product.update({
    where: { id },
    data: {
      purity: purity || null,
      sequence: sequence || null,
    },
    select: { slug: true },
  });

  revalidatePath("/admin/product-data");
  revalidatePath("/admin/products");
  revalidatePath(`/product/${product.slug}`);
  revalidatePath(`/research/compounds/${product.slug}`);
  revalidatePath("/research/compounds");
  revalidatePath("/research-peptides");
  revalidatePath("/research-compounds");
  revalidatePath("/site-index");
  revalidatePath("/sitemap.xml");
}
