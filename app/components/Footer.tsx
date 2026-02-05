"use client";
import { motion } from "framer-motion";
import { Beaker, Mail, ArrowRight, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-page)] border-t border-[var(--glass-border)] pt-20 pb-10 overflow-hidden z-10">
      
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px"}}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded bg-[var(--color-brand-primary)] flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-[var(--bg-page)]" />
               </div>
               <span className="font-display font-bold text-2xl tracking-tight text-[var(--text-main)]">
                 TRANSCENDENT
               </span>
            </div>
            <p className="text-[var(--text-muted)] max-w-sm text-lg leading-relaxed">
              Pioneering the synthesis of bio-active compounds for the advancement of life sciences.
            </p>
          </div>

          <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-2xl">
            <h3 className="text-[var(--text-main)] font-bold mb-2">Join the Research Network</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6">Receive synthesis updates and private catalog access.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="researcher@lab.edu"
                className="flex-1 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors"
              />
              <button className="bg-[var(--text-main)] text-[var(--bg-page)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--color-brand-primary)] hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-[var(--glass-border)] pb-16 mb-12">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Catalog</h4>
            {["Peptides", "Aminos", "Supplies", "New Arrivals"].map(item => (
              <a key={item} href="#" className="text-[var(--text-main)] hover:text-[var(--color-brand-primary)] transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Support</h4>
            {["Track Order", "COA Database", "Shipping Policy", "Returns"].map(item => (
              <a key={item} href="#" className="text-[var(--text-main)] hover:text-[var(--color-brand-primary)] transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Company</h4>
            {["About Us", "Our Lab", "Wholesale", "Contact"].map(item => (
              <a key={item} href="#" className="text-[var(--text-main)] hover:text-[var(--color-brand-primary)] transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>

          {/* Column 4: Socials & Status */}
          <div className="flex flex-col gap-6">
             <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a href="#" className="p-2 border border-[var(--glass-border)] rounded-full hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors text-[var(--text-main)]"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="p-2 border border-[var(--glass-border)] rounded-full hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors text-[var(--text-main)]"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="p-2 border border-[var(--glass-border)] rounded-full hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors text-[var(--text-main)]"><Github className="w-4 h-4" /></a>
                </div>
             </div>
             
             <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-secondary)]">
                <span className="w-2 h-2 bg-[var(--color-brand-secondary)] rounded-full animate-pulse"></span>
                SYSTEM STATUS: OPERATIONAL
             </div>
          </div>
        </div>

        {/* Legal Disclaimer (CRITICAL) */}
        <div className="mb-12 p-6 bg-[var(--glass-bg)]/50 rounded-xl border border-[var(--glass-border)]">
           <p className="text-[10px] md:text-xs text-[var(--text-muted)] leading-relaxed text-justify uppercase font-mono tracking-wide">
             <strong>LEGAL DISCLAIMER:</strong> All products listed on this website are for laboratory research purposes only. They are not intended for human consumption, diagnostic use, or therapeutic use. Transcendent Labs does not endorse the use of these products for bodybuilding, performance enhancement, or any other unauthorized purpose. By purchasing from this site, you agree to our terms of service and confirm that you are a qualified researcher. All customers must be at least 21 years of age.
           </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-muted)] font-mono">
           <p>© {currentYear} Transcendent Research Labs, LLC. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-[var(--text-main)]">Privacy Policy</a>
             <a href="#" className="hover:text-[var(--text-main)]">Terms of Service</a>
             <a href="#" className="hover:text-[var(--text-main)]">Sitemap</a>
           </div>
        </div>

      </div>
    </footer>
  );
}