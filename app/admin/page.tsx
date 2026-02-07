export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text-main)]">Dashboard</h1>
        <p className="text-[var(--text-muted)] text-sm">Laboratory activity overview.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Total Revenue</h3>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">$0.00</p>
             <div className="mt-4 text-[10px] text-emerald-400 flex items-center gap-1">
                <span>+0%</span> <span className="text-[var(--text-muted)]">vs last month</span>
             </div>
        </div>

        {/* Card 2: Orders */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Active Orders</h3>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">0</p>
        </div>

        {/* Card 3: Researchers (Renamed from Users to fit context) */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Researchers</h3>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">1</p>
        </div>

        {/* Card 4: System Status */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">System Status</h3>
             <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Operational</span>
             </div>
        </div>

      </div>

      {/* Secondary Content Area */}
      <div className="border border-[var(--glass-border)] rounded-2xl p-8 bg-[var(--bg-page)]/20 min-h-[300px] flex items-center justify-center text-[var(--text-muted)] border-dashed">
         Performance charts or recent activity logs will appear here.
      </div>

    </div>
  );
}