"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CarFront,
  Users,
  Scale,
  Check,
  ExternalLink,
} from "lucide-react";
import PlatformHeader from "./PlatformHeader";
import type { Lang } from "@/lib/content";
export default function PlatformHome() {
  const [lang, setLang] = useState<Lang>("ar");
  const ar = lang === "ar";
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);
  const cards = [
    {
      icon: BriefcaseBusiness,
      title: ar ? "التجارة والأعمال" : "Commerce & business",
      description: ar
        ? "فتح مشروع، تراخيص، والتزامات النشاط."
        : "Start a business, manage licenses and obligations.",
      href: "/sectors/business",
    },
    {
      icon: Users,
      title: ar ? "الأفراد والخدمات العامة" : "People & public services",
      description: ar
        ? "الأحوال المدنية، الصحة، والتعليم."
        : "Civil Affairs, health, and education.",
      href: "/sectors/people",
    },
    {
      icon: CarFront,
      title: ar ? "المرور والمركبات" : "Traffic & vehicles",
      description: ar
        ? "الرخص، المركبات، وخدمات النقل."
        : "Licenses, vehicles, and transport services.",
      href: "/sectors/traffic",
    },
    {
      icon: Scale,
      title: ar ? "العدل والقضاء" : "Justice & legal services",
      description: ar
        ? "القضايا، الوكالات، والتوثيق."
        : "Cases, powers of attorney, and notarization.",
      href: "/sectors/justice",
    },
  ];
  return (
    <main className="portal">
      <PlatformHeader lang={lang} onSwitch={() => setLang(ar ? "en" : "ar")} />
      <div className="portal-content container">
        <section className="portal-intro">
          <span className="eyebrow">
            {ar
              ? "مُيسّرة · وجهتك للمنصات الرسمية"
              : "MYSER · Your guide to official platforms"}
          </span>
          <h1>{ar ? "وش تحتاج تنجز؟" : "What do you need to get done?"}</h1>
          <p>
            {ar
              ? "اختر القطاع. نجمع لك منصاته ونرتّب خطواتك، عشان تبدأ من المكان الصحيح."
              : "Choose your sector. Find its official platforms and a clear path to your next step."}
          </p>
        </section>
        <nav
          className="portal-sectors"
          aria-label={ar ? "قطاعات الخدمات" : "Service sectors"}
        >
          {cards.map(({ icon: Icon, ...card }) => (
            <Link className="portal-sector" href={card.href} key={card.href}>
              <span className="portal-sector-icon">
                <Icon size={25} />
              </span>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="portal-sector-open">
                {ar ? "افتح القطاع" : "Open sector"}
                {ar ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
              </span>
            </Link>
          ))}
        </nav>
        <section className="portal-feature">
          <div>
            <span className="eyebrow">
              {ar
                ? "رحلة واحدة بدل البحث في عدة منصات"
                : "One journey, instead of searching across platforms"}
            </span>
            <h2>
              {ar
                ? "تبي تفتح مشروع؟ ابدأ من هنا."
                : "Starting a business? Start here."}
            </h2>
            <p>
              {ar
                ? "من السجل التجاري إلى الرخصة البلدية والالتزامات الضريبية، مسار منظّم حسب نوع نشاطك."
                : "From Commercial Registration to a Municipal License and tax obligations, follow a path tailored to your activity."}
            </p>
            <div className="portal-feature-points">
              {(ar
                ? ["اختر نشاطك", "اعرف الجهات المطلوبة", "تابع إنجاز خطواتك"]
                : [
                    "Choose your activity",
                    "See the relevant authorities",
                    "Track your progress",
                  ]
              ).map((s) => (
                <span key={s}>
                  <Check size={14} />
                  {s}
                </span>
              ))}
            </div>
          </div>
          <Link className="button button-green" href="/business">
            {ar ? "أفتح مشروع" : "Start a business"}
            {ar ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
          </Link>
        </section>
        <p className="portal-scope">
          <ExternalLink size={14} />
          {ar
            ? "مُيسّرة تنظّم رحلتك. تنفيذ الخدمات وتسجيل الدخول يتمان في المنصات الرسمية."
            : "Myser organizes your journey. Services and sign-in take place on the official platforms."}
        </p>
      </div>
      <footer className="portal-footer container">
        {ar
          ? "مُيسّرة — منصات متعددة، رحلة أوضح."
          : "Myser — Multiple platforms, a clearer journey."}
        <Link href="/showcase">
          {ar ? "عرض التصميم السينمائي" : "Cinematic showcase"}
        </Link>
      </footer>
    </main>
  );
}
