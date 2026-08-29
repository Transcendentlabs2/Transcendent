import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";
import ProductTemplate from "@/components/product/ProductTemplate";

type Props = {
  params: Promise<{ slug: string }>;
};

function productTypeLabel(category: string) {
  return category.toLowerCase() === "peptides" ? "research peptide" : "research compound";
}

function getProductDescription(product: {
  name: string;
  purity: string | null;
  stock: number;
  category: string;
}) {
  const purity = product.purity || "high-purity";
  const type = productTypeLabel(product.category);
  return `${product.name} ${type} for laboratory research use only. ${purity} analytical standard with HPLC-focused quality verification. ${product.stock > 0 ? "In stock." : "Currently out of stock."}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    select: {
      name: true,
      slug: true,
      images: true,
      purity: true,
      stock: true,
      category: true,
    },
  });

  if (!product) {
    return {
      title: "Compound Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/product/${product.slug}`;
  const isPeptide = product.category.toLowerCase() === "peptides";
  const title = `${product.name} ${isPeptide ? "Research Peptide" : "Research Compound"} | HPLC Tested | ${SITE_NAME}`;
  const description = getProductDescription(product);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: product.images,
          alt: `${product.name} ${isPeptide ? "research peptide" : "research compound"}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },
  });

  if (!product) {
    notFound();
  }

  const price = Number(product.price);
  const description =
    product.description ||
    "Research grade compound validated for laboratory use.";
  const canonicalUrl = `${SITE_URL}/product/${product.slug}`;
  const isPeptide = product.category.toLowerCase() === "peptides";
  const categoryUrl = isPeptide
    ? `${SITE_URL}/research-peptides`
    : `${SITE_URL}/research-compounds`;
  const categoryName = isPeptide ? "Research Peptides" : "Research Compounds";

  const serializedProduct = {
    ...product,
    price,
    purity: product.purity || "99% HPLC",
    description,
  };

  const additionalProperties = [
    {
      "@type": "PropertyValue",
      name: "Purity",
      value: product.purity || "High Purity",
    },
    {
      "@type": "PropertyValue",
      name: "Intended Use",
      value: "Laboratory Research Use Only",
    },
    ...(product.sequence
      ? [
          {
            "@type": "PropertyValue",
            name: "Sequence",
            value: product.sequence,
          },
        ]
      : []),
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: product.name,
    description,
    image: [product.images],
    sku: product.id,
    category: product.category,
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    additionalProperty: additionalProperties,
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "USD",
      price: price.toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] selection:bg-[var(--color-brand-primary)] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ProductTemplate product={serializedProduct} />
    </main>
  );
}
