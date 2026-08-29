import { prisma } from "@/lib/prisma";
import { Atom } from "lucide-react";

import PremiumBackground from "@/components/landing/PremiumBackground";
import Navbar from "@/components/landing/Navbar";
import HeroModern from "@/components/landing/HeroModern";
import TrustTicker from "@/components/landing/TrustTicker";
import LabGrid from "@/components/landing/LabGrid";
import ProductShowcase from "@/components/landing/ProductShowcase";
import BatchVerifier from "@/components/landing/BatchVerifier";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

// Product admin mutations explicitly revalidate this route. The timed fallback
// keeps the public page fresh while allowing Next.js/Vercel to serve cached HTML.
export const revalidate = 3600;

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    // Preserve missing analytical data as missing. UI surfaces decide how to
    // explain documentation status instead of inventing a purity descriptor.
    purity: product.purity || undefined,
    description: product.description || "",
    isFeatured: Boolean(product.isFeatured),
  }));

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <PremiumBackground />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 pointer-events-none mix-blend-overlay fixed z-0" />

      <section id="hero"><HeroModern /></section>
      <section id="testing" className="scroll-mt-24"><TrustTicker /></section>
      <section id="science" className="scroll-mt-24"><LabGrid /></section>
      <section id="catalog" className="scroll-mt-24">
        <ProductShowcase products={serializedProducts} />
      </section>
      <section id="verification" className="scroll-mt-24"><BatchVerifier /></section>
      <section id="faq" className="scroll-mt-24"><FAQSection /></section>

      <Footer />

      <div className="py-12 w-full px-6 flex justify-center text-[10px] text-[var(--text-muted)] font-mono uppercase border-t border-[var(--glass-border)] relative z-10 bg-[var(--bg-page)]">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 animate-spin-slow text-[var(--color-brand-primary)]" />
          <span>Transcendent Labs © 2026</span>
        </div>
      </div>
    </main>
  );
}
