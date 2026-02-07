"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- 1. CREAR PRODUCTO ---
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const stock = formData.get("stock") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const purity = formData.get("purity") as string;
    
    // Generar Slug automático
    const slug = name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now().toString().slice(-4);

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        images: imageUrl,
        purity,
        isActive: true,
      },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Product created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error. Could not create product." };
  }
}

// --- 2. ELIMINAR PRODUCTO ---
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted successfully." };
  } catch (error) {
    return { success: false, message: "Error deleting product." };
  }
}

// --- 3. ACTUALIZAR PRODUCTO (Opcional, si expandes a edición) ---
export async function toggleProductStatus(id: string, currentStatus: boolean) {
    try {
        await prisma.product.update({
            where: { id },
            data: { isActive: !currentStatus }
        });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}