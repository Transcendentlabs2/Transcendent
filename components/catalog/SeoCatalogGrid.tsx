import Image from "next/image";
import Link from "next/link";

export type SeoCatalogProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string | null;
  description?: string | null;
};

type Props = {
  products: SeoCatalogProduct[];
  emptyMessage?: string;
};

export default function SeoCatalogGrid({
  products,
  emptyMessage = "No active compounds are currently listed.",
}: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-10 text-center text-[var(--text-muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const isOutOfStock = product.stock <= 0;

        return (
          <article
            key={product.id}
            className="group overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] transition hover:border-[var(--color-brand-primary)]/50"
          >
            <Link
              href={`/product/${product.slug}`}
              className="flex h-full flex-col"
              aria-label={`View ${product.name} research compound`}
            >
              <div className="relative aspect-[4/3] bg-[var(--bg-page)]/70 p-6">
                <Image
                  src={product.images}
                  alt={`${product.name} research compound`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
                    {product.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isOutOfStock ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    {isOutOfStock ? "Out of stock" : "In stock"}
                  </span>
                </div>

                <h2 className="mb-2 text-xl font-display font-bold text-[var(--text-main)]">
                  {product.name}
                </h2>

                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {product.description ||
                    `${product.name} research compound for laboratory research use only.`}
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-[var(--glass-border)] pt-4">
                  <div>
                    <span className="block text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                      Analytical purity
                    </span>
                    <span className="text-sm font-bold text-[var(--text-main)]">
                      {product.purity || "High Purity"}
                    </span>
                  </div>
                  <span className="font-mono text-lg font-bold text-[var(--text-main)]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
