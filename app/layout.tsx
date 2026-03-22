import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script"; // ✅ IMPORTAMOS SCRIPT DE NEXT
import "./globals.css";

import ThemeProvider from "@/components/landing/ThemeProvider"; 
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext"; 
import CartDrawer from "@/components/cart/CartDrawer"; 
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
      <head>
        {/* ✅ CSS PARA LIMPIAR EL DISEÑO DEL WIDGET DE GOOGLE */}
        <style>{`
          .goog-te-banner-frame { display: none !important; }
          body { top: 0 !important; }
          .skiptranslate iframe { display: none !important; }
          #google_translate_element select {
            background-color: transparent;
            color: var(--text-main);
            border: 1px solid #4b5563;
            border-radius: 0.375rem;
            padding: 0.25rem;
            font-size: 0.875rem;
          }
        `}</style>
      </head>
      <body className="antialiased bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-200">
        
        {/* ✅ CONTENEDOR DONDE APARECERÁ EL SELECTOR DE GOOGLE */}
        <div id="google_translate_element" className="absolute top-4 right-4 z-50"></div>

        {/* ✅ SCRIPTS DE GOOGLE TRANSLATE */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,es', // Limitamos a Inglés y Español
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          id="google-translate-script"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />

        <ThemeProvider>
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