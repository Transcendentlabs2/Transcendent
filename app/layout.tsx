import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import ThemeProvider from "@/components/landing/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import AgeVerificationModal from "../components/landing/AgeVerificationModal";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Research Peptides & Laboratory Compounds | Transcendent Labs",
    template: "%s | Transcendent Labs",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "research peptides",
    "research grade peptides",
    "laboratory peptides",
    "HPLC tested peptides",
    "high purity research peptides",
    "peptide research compounds",
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: "Research Peptides & Laboratory Compounds | Transcendent Labs",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/heroPeptide.webp",
        width: 1200,
        height: 630,
        alt: "Transcendent Labs research-grade peptides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Peptides & Laboratory Compounds | Transcendent Labs",
    description: SITE_DESCRIPTION,
    images: ["/heroPeptide.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: `${SITE_URL}/heroPeptide.webp`,
  description: SITE_DESCRIPTION,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/) && document.cookie.includes('/es')) {
                document.documentElement.classList.add('translating');
              }
            `,
          }}
        />

        <style>{`
          .goog-te-banner-frame { display: none !important; }
          body { top: 0 !important; }
          .skiptranslate iframe { display: none !important; }
          #google_translate_element { display: none !important; }
          .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
          }
          html.translating body { opacity: 0; }
          html.translated-ltr body {
            opacity: 1 !important;
            transition: opacity 0.4s ease-in-out;
          }
        `}</style>
      </head>

      <body
        suppressHydrationWarning
        className="antialiased bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-200"
      >
        <div id="google_translate_element" className="hidden"></div>

        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,es',
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
