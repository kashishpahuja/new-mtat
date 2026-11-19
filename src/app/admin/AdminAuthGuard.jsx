
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAdminToken } from "../lib/adminApi";

export default function AdminAuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Allow the login page without authentication
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    const token = getAdminToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) {
    return null;
  }

  return children;
}
