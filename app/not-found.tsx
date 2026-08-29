import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-brand-primary)] mb-4">
          404 / Resource unavailable
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight mb-5">
          Compound or page not found
        </h1>
        <p className="text-[var(--text-muted)] leading-relaxed mb-8">
          The requested resource is unavailable or is no longer part of the active research catalog.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[var(--text-main)] text-[var(--bg-page)] px-6 py-3 text-sm font-bold"
        >
          Return to Transcendent Labs
        </Link>
      </div>
    </main>
  );
}
