import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
