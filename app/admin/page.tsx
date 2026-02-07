export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] p-10 pt-32">
        <h1 className="text-4xl font-display font-bold mb-4">Panel de Control</h1>
        <p className="text-[var(--text-muted)]">Bienvenido al sistema seguro de Transcendent Labs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* Tarjeta de Ejemplo */}
            <div className="p-6 border border-[var(--glass-border)] rounded-xl bg-[var(--bg-page)]/50">
                <h3 className="text-xl font-bold mb-2">Usuarios</h3>
                <p className="text-3xl font-mono text-[var(--color-brand-primary)]">1</p>
            </div>
        </div>
    </div>
  )
}