import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What analytical information is available?",
    a: "Use the purity value and any batch-specific analytical documentation presented for the product as the primary reference. Where available, HPLC, mass spectrometry and Certificate of Analysis documentation provide additional batch context.",
  },
  {
    q: "What is the intended use?",
    a: "Transcendent Labs compounds are supplied strictly for laboratory research use only. They are not intended for human consumption, diagnosis, treatment or therapeutic use.",
  },
  {
    q: "How is availability determined?",
    a: "Inventory status is shown from the current product record. Availability can change as research batches are added, depleted or temporarily disabled in the catalog.",
  },
  {
    q: "How should the product be stored?",
    a: "Researchers should follow the compound-specific storage conditions stated in the applicable product documentation or Certificate of Analysis. Batch documentation takes precedence over general handling guidance.",
  },
];

export default function ProtocolFAQ() {
  return (
    <div className="mb-16">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6 flex items-center gap-2">
        <HelpCircle className="w-3 h-3" /> Protocol Database / FAQ
      </h3>

      <div className="grid gap-2">
        {FAQS.map((faq, index) => (
          <details
            key={faq.q}
            open={index === 0}
            className="group border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl overflow-hidden"
          >
            <summary className="list-none cursor-pointer w-full flex items-center justify-between p-4 text-left hover:bg-[var(--glass-border)]/30 transition-colors [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-sm font-bold text-[var(--text-main)]">
                {faq.q}
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--color-brand-primary)] transition-transform group-open:rotate-180" />
            </summary>
            <p className="p-4 pt-3 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--glass-border)]/50">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
