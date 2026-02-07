"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";
import { 
  LayoutDashboard, 
  FlaskConical, 
  ShoppingBag, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: FlaskConical },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { 
    isSidebarOpen, 
    isSidebarCollapsed, 
    toggleCollapse, 
    closeSidebar 
  } = useAdmin();

  // Clases dinámicas para el ancho
  const sidebarWidth = isSidebarCollapsed ? "w-20" : "w-64";
  const mobileClasses = isSidebarOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* --- MOBILE BACKDROP (Fondo oscuro borroso) --- */}
      <div 
        className={clsx(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* --- SIDEBAR CONTAINER --- */}
      <aside 
        className={clsx(
          "fixed top-0 left-0 h-screen bg-[var(--bg-page)] border-r border-[var(--glass-border)] z-50 transition-all duration-300 ease-in-out flex flex-col",
          // En Desktop usa el ancho variable, en Mobile siempre es w-64 pero se esconde
          `lg:translate-x-0 ${mobileClasses}`,
          `lg:${sidebarWidth} w-64`
        )}
      >
        
        {/* 1. Header & Toggle */}
        <div className={clsx("h-16 flex items-center border-b border-[var(--glass-border)] transition-all", isSidebarCollapsed ? "justify-center px-0" : "justify-between px-6")}>
          
          {/* Logo Area */}
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-brand-primary)]/20 flex items-center justify-center text-[var(--color-brand-primary)]">
                <FlaskConical className="w-5 h-5" />
             </div>
             {/* Texto se oculta si está colapsado */}
             <div className={clsx("transition-opacity duration-300", isSidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                <h2 className="font-display font-bold text-sm leading-none tracking-tight">TRANSCENDENT</h2>
             </div>
          </div>

          {/* Desktop Toggle Button (Flecha) */}
          <button 
            onClick={toggleCollapse}
            className="hidden lg:flex w-6 h-6 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--glass-border)] hover:text-[var(--text-main)] transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button (X) */}
          <button onClick={closeSidebar} className="lg:hidden text-[var(--text-muted)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {!isSidebarCollapsed && (
             <p className="px-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 opacity-50 animate-in fade-in">Main Menu</p>
          )}
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => closeSidebar()} // Cierra sidebar en mobile al hacer click
                title={isSidebarCollapsed ? item.name : ""} // Tooltip nativo simple
                className={clsx(
                  "group flex items-center rounded-xl transition-all duration-300 relative",
                  isSidebarCollapsed ? "justify-center py-3" : "justify-between px-3 py-2.5",
                  isActive 
                    ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] shadow-[0_0_20px_-5px_var(--color-brand-primary)]" 
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={clsx("shrink-0 transition-colors", isSidebarCollapsed ? "w-5 h-5" : "w-4.5 h-4.5")} />
                  
                  {/* Texto con transición de opacidad */}
                  <span className={clsx(
                    "text-sm font-medium whitespace-nowrap transition-all duration-300 origin-left",
                    isSidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"
                  )}>
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* 3. Footer (User) */}
        <div className="p-4 border-t border-[var(--glass-border)] bg-[var(--bg-page)]/50">
          <div className={clsx("flex items-center gap-3 mb-4", isSidebarCollapsed ? "justify-center" : "px-2")}>
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-brand-primary)] to-cyan-400 p-[1px]">
                  <div className="w-full h-full rounded-full bg-[var(--bg-page)] flex items-center justify-center text-[10px] font-bold">
                      AD
                  </div>
              </div>
              <div className={clsx("overflow-hidden transition-all duration-300", isSidebarCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
                  <p className="text-sm font-bold text-[var(--text-main)] truncate">{user?.name || "Admin"}</p>
              </div>
          </div>
          
          <button 
            onClick={logout}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-lg border border-red-900/30 text-red-400 hover:bg-red-900/10 hover:border-red-900/50 transition-all text-xs font-bold uppercase tracking-wider",
              isSidebarCollapsed ? "p-2 aspect-square" : "px-4 py-2"
            )}
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            {!isSidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}