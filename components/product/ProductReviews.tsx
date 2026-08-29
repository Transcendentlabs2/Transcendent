import { CheckCircle2, FileSearch, FlaskConical, PackageCheck } from "lucide-react";

const QUALITY_SIGNALS = [
  {
    title: "Product-Level Documentation",
    description:
      "When a documented catalog purity value exists, the product record displays it. Missing analytical data remains explicit rather than being replaced with a generic purity claim.",
    icon: FlaskConical,
  },
  {
    title: "Batch Verification",
    description:
      "The site includes a batch verification workflow designed to connect research inventory with batch-specific documentation when that information is available.",
    icon: FileSearch,
  },
  {
    title: "Research-Use-Only Policy",
    description:
      "Product positioning, checkout language and catalog documentation consistently identify Transcendent Labs compounds as laboratory research materials only.",
    icon: CheckCircle2,
  },
  {
    title: "Live Inventory Status",
    description:
      "Availability is driven by the current product inventory record, helping the public catalog reflect whether a research compound is presently in stock.",
    icon: PackageCheck,
  },
];

export default function ProductReviews() {
  return (
    <section className="w-full relative py-8" aria-labelledby="quality-signals-title">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand-primary)] mb-2">
          Research quality framework
        </p>
        <h3 id="quality-signals-title" className="text-2xl font-display font-bold text-[var(--text-main)]">
          Verifiable Product Signals
        </h3>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {QUALITY_SIGNALS.map((signal) => {
          const Icon = signal.icon;

          return (
            <article
              key={signal.title}
              className="bg-[var(--bg-page)]/60 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-6 flex gap-4"
            >
              <div className="w-11 h-11 shrink-0 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--color-brand-primary)]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-main)] mb-2">
                  {signal.title}
                </h4>
                <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                  {signal.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
