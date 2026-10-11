"use client";
import Link from "next/link";
import { Globe2, ArrowRight, ArrowLeft } from "lucide-react";
import Brand from "./Brand";
import type { Lang } from "@/lib/content";
export default function PlatformHeader({
  lang,
  onSwitch,
  back = false,
}: {
  lang: Lang;
  onSwitch: () => void;
  back?: boolean;
}) {
  const ar = lang === "ar";
  return (
    <header className="portal-header container">
      <Brand href="/" />
      <div>
        {back && (
          <Link href="/" className="portal-back">
            {ar ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}{" "}
            {ar ? "الرئيسية" : "Home"}
          </Link>
        )}
        <button
          onClick={onSwitch}
          aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
        >
          <Globe2 size={16} />
          {ar ? "English" : "العربية"}
        </button>
      </div>
    </header>
  );
}
