"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** After a page change without a #hash, always start at the top of the new page (instant, never a glide that can stop half way). */
export default function RouteTop() {
  const path = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);
  return null;
}
