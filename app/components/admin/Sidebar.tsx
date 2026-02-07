"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, 
  FlaskConical, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import clsx from "clsx"; // Si no tienes clsx, usa template strings normales, pero clsx ayuda mucho.

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Productos", href: "/admin/products", icon: FlaskConical },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingBag },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 h-screen bg-[var(--bg-page)] border-r border-[var(--glass-border)] flex flex-col fixed left-0 top-0 z-50">
      
      {/* 1. Logo / Header del Sidebar */}
      <div className="h-20 flex items-center px-6 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-primary)]/20 flex items-center justify-center text-[var(--color-brand-primary)]">
                <FlaskConical className="w-5 h-5" />
            </div>
            <div>
                <h2 className="font-display font-bold text-sm leading-none tracking-tight">TRANSCENDENT</h2>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Admin Panel</span>
            </div>
        </div>
      </div>

      {/* 2. Menú de Navegación */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <p className="px-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 opacity-50">Menu</p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={clsx(
                "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] shadow-[0_0_20px_-5px_var(--color-brand-primary)]" 
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={clsx("w-4.5 h-4.5 transition-colors", isActive ? "text-[var(--color-brand-primary)]" : "opacity-70 group-hover:opacity-100")} />
                {item.name}
              </div>
              {isActive && <ChevronRight className="w-3 h-3 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer del Sidebar (Perfil + Logout) */}
      <div className="p-4 border-t border-[var(--glass-border)] bg-[var(--bg-page)]/50">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-brand-primary)] to-cyan-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-[var(--bg-page)] flex items-center justify-center text-[10px] font-bold">
                    AD
                </div>
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-bold text-[var(--text-main)] truncate">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">{user?.email || "Cargando..."}</p>
            </div>
        </div>
        
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-900/30 text-red-400 hover:bg-red-900/10 hover:border-red-900/50 transition-all text-xs font-bold uppercase tracking-wider"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}