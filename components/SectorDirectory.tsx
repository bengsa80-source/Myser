"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Landmark, ArrowLeft, ArrowRight } from "lucide-react";
import type { Lang } from "@/lib/content";
import { directories } from "@/lib/platforms";
import PlatformHeader from "./PlatformHeader";
export default function SectorDirectory({ sector }: { sector: string }) {
  const [lang, setLang] = useState<Lang>("ar");
  const ar = lang === "ar";
  const n = ar ? 0 : 1;
  const d = directories[sector];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);
  return (
    <main className="portal">
      <PlatformHeader
        lang={lang}
        onSwitch={() => setLang(ar ? "en" : "ar")}
        back
      />
      <div className="portal-content container">
        <section className="portal-intro">
          <span className="eyebrow">
            {ar
              ? "المنصات الحكومية حسب القطاع"
              : "Official platforms by sector"}
          </span>
          <h1>{d.title[n]}</h1>
          <p>
            {ar
              ? "منصات القطاع في مكان واحد. اختر الجهة للوصول إلى خدماتها الرسمية."
              : "Find this sector’s platforms in one place. Choose an authority to access its official services."}
          </p>
        </section>
        {sector === "business" && (
          <section className="portal-feature directory-journey">
            <div>
              <span className="eyebrow">
                {ar ? "رحلة فتح مشروع" : "Start a business journey"}
              </span>
              <h2>
                {ar
                  ? "تحتاج أكثر من منصة؟ رتّب رحلتك هنا."
                  : "Need several platforms? Organize your journey here."}
              </h2>
              <p>
                {ar
                  ? "اختر نوع نشاطك، وشاهد الخطوات والجهات المطلوبة في مسار واحد."
                  : "Choose your activity and see the relevant steps and authorities in one path."}
              </p>
            </div>
            <Link className="button button-green" href="/business">
              {ar ? "أفتح مشروع" : "Start a business"}
              {ar ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
          </section>
        )}
        <div className="directory-grid">
          {d.platforms.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="directory-card"
            >
              <span className="icon-square">
                <Landmark size={22} />
              </span>
              <h2>{p.name[n]}</h2>
              <p>{p.description[n]}</p>
              <span>
                {new URL(p.url).hostname}
                <ExternalLink size={16} />
              </span>
            </a>
          ))}
        </div>
        <p className="portal-scope">
          {ar
            ? "تفتح الروابط في تبويب جديد على المواقع الرسمية. مُيسّرة دليل مستقل وليست جهة حكومية."
            : "Links open official websites in a new tab. Myser is an independent guide, not a government authority."}
        </p>
      </div>
    </main>
  );
}
