"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Save, ImagePlus, X, FlaskConical, Info } from "lucide-react";
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
    setImageUrl(initialData?.images || "");
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    if (!imageUrl) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Image",
        text: "Upload a product image before saving the record.",
        background: "var(--bg-page)",
        color: "var(--text-main)",
      });
      setLoading(false);
      return;
    }

    formData.append("imageUrl", imageUrl);

    const result = initialData
      ? await updateProduct(initialData.id, formData)
      : await createProduct(formData);

    setLoading(false);

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: initialData ? "Database Updated" : "Product Created",
        background: "var(--bg-page)",
        color: "var(--text-main)",
        confirmButtonColor: "var(--color-brand-primary)",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
      return;
    }

    await Swal.fire({
      icon: "error",
      title: "Error",
      text: result.message,
      background: "var(--bg-page)",
      color: "var(--text-main)",
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-none border-0 bg-[var(--bg-page)] shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl sm:border sm:border-[var(--glass-border)]">
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--glass-border)] bg-[var(--bg-page)] p-5">
        <h3 className="flex items-center gap-3 font-display text-lg font-bold text-[var(--text-main)] md:text-xl">
          <FlaskConical className="text-[var(--color-brand-primary)]" />
          {initialData ? "Edit Compound" : "New Compound"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 rounded-full p-3 text-[var(--text-muted)] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-90"
          aria-label="Close product form"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto bg-[var(--bg-page)] p-6">
        <form id="product-form" onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Product Name</label>
              <input name="name" defaultValue={initialData?.name || ""} required className="input-scientific" placeholder="e.g. BPC-157" />
              <div className="ml-1 mt-1 flex items-center gap-1.5 text-[10px] italic text-[var(--text-muted)]">
                <Info className="h-3 w-3 text-amber-500" />
                <span>Do not add stock status to the name; inventory controls availability.</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Category</label>
              <select name="category" defaultValue={initialData?.category || "peptides"} className="input-scientific">
                <option value="peptides">Research Peptides</option>
                <option value="sarms">SARMs</option>
                <option value="nootropics">Nootropics</option>
                <option value="supplements">Supplements</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Price (USD)</label>
              <input name="price" type="number" step="0.01" min="0" defaultValue={Number(initialData?.price || 0)} required className="input-scientific" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Current Stock</label>
              <input name="stock" type="number" min="0" defaultValue={initialData?.stock ?? 0} required className="input-scientific" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Catalog Purity Record</label>
              <input name="purity" defaultValue={initialData?.purity || ""} className="input-scientific" placeholder="e.g. 99.4%" />
              <div className="ml-1 mt-1 flex items-start gap-1.5 text-[10px] leading-relaxed text-[var(--text-muted)]">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                <span>Enter only a documented product-level value. Leave blank when the available evidence is lot-specific or unavailable.</span>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Peptide Sequence / Molecular Notation</label>
              <textarea
                name="sequence"
                defaultValue={initialData?.sequence || ""}
                rows={3}
                className="input-scientific resize-none font-mono text-sm"
                placeholder="Optional: enter the documented sequence exactly as supplied"
              />
              <div className="ml-1 mt-1 flex items-start gap-1.5 text-[10px] leading-relaxed text-[var(--text-muted)]">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-brand-primary)]" />
                <span>Preserve source notation for modified residues, terminal groups, or non-standard sequences. Do not infer a sequence from the product name.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--text-muted)]/5 p-4 transition-colors hover:bg-[var(--text-muted)]/10 md:col-span-2">
              <input
                type="checkbox"
                name="isFeatured"
                id="isFeatured"
                defaultChecked={Boolean(initialData?.isFeatured)}
                value="true"
                className="h-5 w-5 cursor-pointer rounded border-[var(--glass-border)] accent-[var(--color-brand-primary)]"
              />
              <label htmlFor="isFeatured" className="cursor-pointer select-none text-sm font-bold text-[var(--text-main)]">
                Highlight Compound (Show first in Product Showcase)
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Scientific Description</label>
            <textarea name="description" defaultValue={initialData?.description || ""} rows={7} required className="input-scientific resize-none" />
            <p className="ml-1 text-[10px] leading-relaxed text-[var(--text-muted)]">
              Use original laboratory-focused material. Avoid dosing, administration, treatment, or unsupported analytical claims.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Visual Documentation</label>
            <div className="flex justify-center rounded-xl border-2 border-dashed border-[var(--glass-border)] bg-[var(--text-muted)]/5 p-4 transition-colors hover:bg-[var(--text-muted)]/10">
              {imageUrl ? (
                <div className="relative h-56 w-full md:h-64 md:w-64">
                  <Image src={imageUrl} alt={initialData?.name ? `${initialData.name} product image` : "Product image"} fill className="rounded-lg object-contain" />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white shadow-md transition-transform hover:scale-110"
                    aria-label="Remove product image"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={(result: any) => {
                    const secureUrl = result?.info?.secure_url;
                    if (secureUrl) setImageUrl(secureUrl);
                  }}
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
                        textLight: "#ffffff",
                      },
                    },
                  }}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="flex w-full flex-col items-center gap-2 py-8 text-[var(--text-muted)] transition-colors hover:text-[var(--color-brand-primary)]">
                      <ImagePlus className="h-10 w-10 opacity-50" />
                      <span className="text-sm font-bold">Tap to Upload Image</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="flex shrink-0 justify-between gap-3 border-t border-[var(--glass-border)] bg-[var(--bg-page)] p-5 sm:justify-end">
        <button type="button" onClick={onClose} className="w-full rounded-xl bg-[var(--glass-border)]/50 px-6 py-3 text-sm font-bold text-[var(--text-muted)] transition-colors hover:bg-[var(--glass-border)] sm:w-auto sm:bg-transparent">
          Cancel
        </button>
        <button
          type="submit"
          form="product-form"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--text-main)] px-8 py-3 text-sm font-bold text-[var(--bg-page)] shadow-lg shadow-[var(--glass-border)] transition-all hover:scale-105 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Processing..." : <><Save className="h-4 w-4" /> {initialData ? "Save" : "Create"}</>}
        </button>
      </div>

      <style jsx global>{`
        .input-scientific {
          width: 100%;
          background-color: var(--bg-page);
          border: 1px solid var(--glass-border);
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          color: var(--text-main);
          outline: none;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .input-scientific:focus {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 1px var(--color-brand-primary);
        }
      `}</style>
    </div>
  );
}
