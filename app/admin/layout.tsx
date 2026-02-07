import AdminSidebar from "../components/admin/Sidebar"; // Ajusta la ruta

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex">
      {/* Sidebar fijo */}
      <AdminSidebar />

      {/* Contenido Principal */}
      <main className="flex-1 ml-64 min-h-screen relative">
         {/* Fondo decorativo sutil para el área de contenido */}
         <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />
         
         {/* El contenido de las páginas (dashboard, products, etc) se renderiza aquí */}
         <div className="p-8 md:p-12 relative z-10">
            {children}
         </div>
      </main>
    </div>
  );
}