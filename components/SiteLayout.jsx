"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}