"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const created = searchParams?.get("created");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (created === "1") {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3000);
      // remove query param without reloading (shallow replace)
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.pathname + url.search);
      return () => clearTimeout(t);
    }
  }, [created, router]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 rounded-md bg-emerald-600/95 px-4 py-3 text-sm font-semibold text-white shadow-lg">
      Beat uploaded successfully
    </div>
  );
}
