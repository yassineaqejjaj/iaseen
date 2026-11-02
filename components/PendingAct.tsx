"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { runPending } from "@/lib/actions";
import { useI18n } from "./LocaleProvider";

/** Runs an assistant action that had to open another page first (a skill, a map node, a product filter). */
export default function PendingAct() {
  const path = usePathname();
  const router = useRouter();
  const { href } = useI18n();
  useEffect(() => { runPending((p) => router.push(href(p))); }, [path]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
