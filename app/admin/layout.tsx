import type { Metadata } from "next";
import { AdminProvider } from "../../context/AdminContext";
import AdminLayoutWrapper from "../../components/admin/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </AdminProvider>
  );
}
