"use client";
import { useAdmin } from "../../context/AdminContext";
import { Menu, FlaskConical } from "lucide-react";

export default function MobileHeader() {
  const { toggleSidebar } = useAdmin();

  return (
    <header className="lg:hidden h-16 border-b border-[var(--glass-border)] bg-[var(--bg-page)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-primary)]/20 flex items-center justify-center text-[var(--color-brand-primary)]">
                <FlaskConical className="w-5 h-5" />
             </div>
             <span className="font-display font-bold text-sm tracking-tight">TRANSCENDENT</span>
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-transform"
        >
            <Menu className="w-6 h-6" />
        </button>
    </header>
  );
}