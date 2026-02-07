export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text-main)]">Dashboard</h1>
        <p className="text-[var(--text-muted)] text-sm">Resumen de actividad del laboratorio.</p>
      </div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tarjeta 1 */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Ingresos Totales</h3>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">$0.00</p>
             <div className="mt-4 text-[10px] text-emerald-400 flex items-center gap-1">
                <span>+0%</span> <span className="text-[var(--text-muted)]">vs mes anterior</span>
             </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Pedidos Activos</h3>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">0</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Usuarios</h3>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">1</p>
        </div>

        {/* Tarjeta 4 - Estado del Sistema */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Estado del Sistema</h3>
             <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Operativo</span>
             </div>
        </div>

      </div>

      {/* Área de contenido secundario (ej. Gráficos o Tablas vacías) */}
      <div className="border border-[var(--glass-border)] rounded-2xl p-8 bg-[var(--bg-page)]/20 min-h-[300px] flex items-center justify-center text-[var(--text-muted)] border-dashed">
         Aquí irán los gráficos de rendimiento o lista de pedidos recientes.
      </div>

    </div>
  );
}