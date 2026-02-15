import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/landing/ThemeProvider"; 
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext"; 
import CartDrawer from "@/components/cart/CartDrawer"; 
// ✅ NUEVA IMPORTACIÓN
import AgeVerificationModal from "../components/landing/AgeVerificationModal"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Transcendent | Future of Peptides",
  description: "Advanced bio-active peptide science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-200">
        <ThemeProvider>
          {/* ✅ EL MODAL DEBE ESTAR AQUÍ: Bloquea todo desde el nivel más alto */}
          <AgeVerificationModal />

          <AuthProvider>
            <CartProvider>
              <CartDrawer />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}