"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function slugifyProductName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "research-compound";
}

async function createUniqueSlug(name: string) {
  const baseSlug = slugifyProductName(name);
  let slug = baseSlug;
  let suffix = 2;

  while (await prisma.product.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function revalidateProductSurfaces(slug?: string) {
  revalidatePath("/");
  revalidatePath("/research-compounds");
  revalidatePath("/research-peptides");
  revalidatePath("/research");
  revalidatePath("/research/compounds");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/products");

  if (slug) {
    revalidatePath(`/product/${slug}`);
    revalidatePath(`/research/compounds/${slug}`);
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = String(formData.get("name") || "").trim();
    const price = String(formData.get("price") || "0");
    const description = String(formData.get("description") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const stock = String(formData.get("stock") || "0");
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const purity = String(formData.get("purity") || "").trim();
    const isFeatured = formData.get("isFeatured") === "true";
    const slug = await createUniqueSlug(name);

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        images: imageUrl,
        purity,
        isActive: true,
        isFeatured,
      },
    });

    revalidateProductSurfaces(slug);
    return { success: true, message: "Product created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error. Could not create product." };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.product.delete({ where: { id } });
    revalidateProductSurfaces(product?.slug);

    return { success: true, message: "Product deleted successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting product." };
  }
}

export async function toggleProductStatus(id: string, currentStatus: boolean) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { isActive: !currentStatus },
      select: { slug: true },
    });

    revalidateProductSurfaces(product.slug);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const isFeatured = formData.get("isFeatured") === "true";

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: String(formData.get("name") || "").trim(),
        description: String(formData.get("description") || "").trim(),
        category: String(formData.get("category") || "").trim(),
        price: parseFloat(String(formData.get("price") || "0")),
        stock: parseInt(String(formData.get("stock") || "0"), 10),
        purity: String(formData.get("purity") || "").trim(),
        images: String(formData.get("imageUrl") || "").trim(),
        isFeatured,
      },
      select: { slug: true },
    });

    // Existing slugs intentionally remain stable when a product name changes.
    revalidateProductSurfaces(product.slug);
    return { success: true, message: "Product updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating product." };
  }
}
