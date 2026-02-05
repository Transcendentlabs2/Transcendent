import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Usamos Inter como fuente estándar limpia
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcendent | Coming Soon",
  description: "Exclusive e-commerce coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}