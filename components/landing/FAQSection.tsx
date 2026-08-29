import { ChevronDown, ShieldAlert, Terminal } from "lucide-react";

const FAQS = [
  {
    question: "WHAT ANALYTICAL PURITY INFORMATION IS PROVIDED?",
    answer:
      "Product pages display the analytical purity information currently associated with each compound. Where batch-specific HPLC, mass spectrometry or Certificate of Analysis documentation is available, that documentation should be treated as the authoritative source for the batch.",
  },
  {
    question: "HOW SHOULD RESEARCH COMPOUNDS BE STORED?",
    answer:
      "Storage requirements can vary by compound and batch. Researchers should follow the storage conditions stated in the applicable product documentation or Certificate of Analysis and protect laboratory materials from conditions that may compromise analytical integrity.",
  },
  {
    question: "HOW ARE ORDERS SHIPPED?",
    answer:
      "Orders are prepared for laboratory customers and shipment tracking is provided when a parcel is dispatched. Packaging and logistics information shown during checkout should be treated as the current operational policy.",
  },
  {
    question: "ARE THESE PRODUCTS FOR HUMAN CONSUMPTION?",
    answer:
      "No. Transcendent Labs products are strictly for laboratory research use only and are not intended for human consumption, medical diagnosis, treatment or therapeutic use.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative py-24 px-4 md:px-8 max-w-4xl mx-auto z-10" id="faq">
      <div className="flex items-center gap-4 mb-12 border-b border-[var(--glass-border)] pb-6">
        <div className="p-3 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg">
          <Terminal className="w-6 h-6 text-[var(--color-brand-primary)]" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)]">
            Research <span className="text-[var(--text-muted)]">Protocols</span>
          </h2>
          <p className="text-xs font-mono text-[var(--color-brand-secondary)] mt-1 uppercase tracking-widest">
            // Knowledge_Base
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {FAQS.map((faq, index) => (
          <details
            key={faq.question}
            open={index === 0}
            className="group border border-[var(--glass-border)] rounded-xl overflow-hidden bg-[var(--bg-page)]/40 open:border-[var(--color-brand-primary)] open:bg-[var(--bg-page)]/80"
          >
            <summary className="list-none cursor-pointer w-full flex items-center justify-between p-6 text-left [&::-webkit-details-marker]:hidden">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pr-4">
                <span className="text-[var(--text-muted)] font-mono text-xs opacity-50">
                  0{index + 1}.
                </span>
                <span className="font-mono text-sm md:text-base uppercase tracking-wider font-bold text-[var(--text-main)] group-open:text-[var(--color-brand-primary)]">
                  {faq.question}
                </span>
              </div>
              <span className="p-2 rounded-full bg-[var(--glass-border)] text-[var(--text-muted)] group-open:bg-[var(--color-brand-primary)] group-open:text-[var(--bg-page)] shrink-0">
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="px-6 pb-6">
              <div className="h-px w-full bg-gradient-to-r from-[var(--color-brand-primary)]/50 to-transparent mb-4" />
              {index === 3 && (
                <span className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase mb-3 tracking-widest bg-amber-500/10 p-2 rounded w-fit border border-amber-500/20">
                  <ShieldAlert className="w-4 h-4" /> Research-use-only policy
                </span>
              )}
              <p className="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
