"use client";
import Link from "next/link";
import Image from "next/image"; // Importante para el logo
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
  X,
  Home // Icono para la casa
} from "lucide-react";
import clsx from "clsx";

// Importamos el logo como pediste (ajusta la ruta según tu estructura real)
import logo from "../../assets/logo.webp"; 

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

  const sidebarWidth = isSidebarCollapsed ? "w-20" : "w-64";
  const mobileClasses = isSidebarOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={clsx(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <aside 
        className={clsx(
          "fixed top-0 left-0 h-screen bg-[var(--bg-page)] border-r border-[var(--glass-border)] z-50 transition-all duration-300 ease-in-out flex flex-col",
          `lg:translate-x-0 ${mobileClasses}`,
          `lg:${sidebarWidth} w-64`
        )}
      >
        
        {/* 1. Header con Logo e Imagen */}
        <div className={clsx("h-20 flex items-center border-b border-[var(--glass-border)] transition-all relative", isSidebarCollapsed ? "justify-center px-0" : "justify-between px-6")}>
          
          {/* Logo Area - Click lleva a Home */}
          <Link href="/" className="flex items-center gap-3 overflow-hidden group">
             <div className="shrink-0 w-10 h-10 relative flex items-center justify-center">
                {/* Usamos el componente Image de Next.js */}
                <Image 
                  src={logo} 
                  alt="Transcendent Logo" 
                  fill 
                  className="object-contain drop-shadow-[0_0_10px_rgba(var(--color-brand-primary-rgb),0.5)]" 
                />
             </div>
             
             <div className={clsx("transition-opacity duration-300", isSidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                <h2 className="font-display font-bold text-sm leading-none tracking-tight text-[var(--text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                  TRANSCENDENT <br/> <span className="text-[var(--text-muted)]">LABS</span>
                </h2>
             </div>
          </Link>

          {/* Botones de Toggle/Close */}
          <button 
            onClick={toggleCollapse}
            className="hidden lg:flex absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center rounded-full bg-[var(--bg-page)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors z-50 shadow-sm"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>

          <button onClick={closeSidebar} className="lg:hidden text-[var(--text-muted)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Navegación */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hide">
          
          {/* Botón explícito para ir a Home */}
          <Link 
            href="/"
            className={clsx(
                "group flex items-center rounded-xl transition-all duration-300 mb-6 border border-transparent hover:border-[var(--glass-border)] bg-[var(--text-main)]/5",
                isSidebarCollapsed ? "justify-center py-3" : "justify-between px-3 py-2.5"
            )}
            title="Go to Website"
          >
             <div className="flex items-center gap-3">
                <Home className={clsx("shrink-0 text-[var(--color-brand-primary)]", isSidebarCollapsed ? "w-5 h-5" : "w-4.5 h-4.5")} />
                <span className={clsx("text-sm font-bold text-[var(--text-main)] transition-all duration-300", isSidebarCollapsed ? "hidden" : "block")}>
                   Go to Website
                </span>
             </div>
          </Link>

          <div className="w-full h-[1px] bg-[var(--glass-border)] my-4 opacity-50" />

          {!isSidebarCollapsed && (
             <p className="px-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 opacity-50">Admin Menu</p>
          )}
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => closeSidebar()} 
                title={isSidebarCollapsed ? item.name : ""}
                className={clsx(
                  "group flex items-center rounded-xl transition-all duration-300 relative",
                  isSidebarCollapsed ? "justify-center py-3" : "justify-between px-3 py-2.5",
                  isActive 
                    ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]" 
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={clsx("shrink-0 transition-colors", isSidebarCollapsed ? "w-5 h-5" : "w-4.5 h-4.5")} />
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

        {/* 3. Footer (User & Logout) */}
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