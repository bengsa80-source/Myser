"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCheck,
  ExternalLink,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import PlatformHeader from "./PlatformHeader";
import { businessPlatforms } from "@/lib/platforms";
import type { Lang } from "@/lib/content";
type Activity = "shop" | "cafe" | "online";
const key = "myser-business-journey-v1";
export default function BusinessJourney() {
  const [lang, setLang] = useState<Lang>("ar");
  const ar = lang === "ar";
  const n = ar ? 0 : 1;
  const [activity, setActivity] = useState<Activity>("shop");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw);
        if (["shop", "cafe", "online"].includes(saved.activity))
          setActivity(saved.activity);
        if (
          saved.done &&
          typeof saved.done === "object" &&
          !Array.isArray(saved.done)
        ) {
          const clean: Record<string, boolean> = {};
          for (const [id, value] of Object.entries(saved.done)) {
            if (
              /^(shop|cafe|online)-(prepare|registration|license|tax)$/.test(
                id,
              ) &&
              typeof value === "boolean"
            )
              clean[id] = value;
          }
          setDone(clean);
        }
      }
    } catch {
      setStorageUnavailable(true);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify({ activity, done }));
    } catch {
      setStorageUnavailable(true);
    }
  }, [activity, done, loaded]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);
  const choices = [
    {
      id: "shop" as Activity,
      icon: Store,
      label: ar ? "محل تجاري" : "Retail shop",
    },
    {
      id: "cafe" as Activity,
      icon: UtensilsCrossed,
      label: ar ? "مقهى أو مطعم" : "Café or restaurant",
    },
    {
      id: "online" as Activity,
      icon: ShoppingBag,
      label: ar ? "متجر إلكتروني" : "Online store",
    },
  ];
  const steps = [
    {
      id: "prepare",
      title: ar
        ? "حدّد النشاط ومتطلباته"
        : "Define your activity and requirements",
      platform: businessPlatforms[0],
      description: ar
        ? "حدّد نوع النشاط والشكل القانوني، وراجع المتطلبات والتراخيص الخاصة به قبل البدء."
        : "Choose your activity and legal structure. Review activity-specific requirements and permits before you start.",
      requirements: ar
        ? ["نوع النشاط والشكل القانوني", "بيانات مقدم الطلب حسب متطلبات الجهة"]
        : [
            "Activity and legal structure",
            "Applicant details as required by the authority",
          ],
    },
    {
      id: "registration",
      title: ar ? "السجل التجاري" : "Commercial Registration",
      platform: businessPlatforms[0],
      description: ar
        ? "انتقل إلى المركز السعودي للأعمال لمعرفة خدمات تأسيس النشاط والسجل التجاري المناسبة لحالتك."
        : "Visit the Saudi Business Center to find the establishment and Commercial Registration services applicable to you.",
      requirements: ar
        ? [
            "بيانات النشاط والمالك أو الشركاء",
            "مراجعة الاشتراطات والرسوم لدى الجهة",
          ]
        : [
            "Activity and owner or partner details",
            "Confirm requirements and fees with the authority",
          ],
    },
    {
      id: "license",
      title: ar
        ? activity === "online"
          ? "تحقّق من متطلبات الموقع والتراخيص"
          : "الرخصة البلدية"
        : activity === "online"
          ? "Check location and licensing requirements"
          : "Municipal License",
      platform: businessPlatforms[1],
      description: ar
        ? activity === "cafe"
          ? "راجع بلدي لمعرفة اشتراطات الموقع والسلامة والمتطلبات الصحية لنشاط المطعم أو المقهى. قد توجد موافقات إضافية حسب النشاط."
          : activity === "online"
            ? "المتجر الإلكتروني لا يلغي متطلبات الترخيص. إذا كان لديك مقر أو مستودع أو نشاط منظّم، تحقّق من الاشتراطات لدى الجهات المختصة."
            : "راجع بلدي لمعرفة اشتراطات موقع المحل والرخصة البلدية ومتطلبات نشاطك."
        : activity === "cafe"
          ? "Review Balady for location, safety, and health requirements for your café or restaurant. Additional approvals may apply."
          : activity === "online"
            ? "An online store does not remove licensing obligations. For a premises, warehouse, or regulated activity, verify applicable requirements with the relevant authorities."
            : "Review Balady for shop location conditions and Municipal License requirements.",
      requirements: ar
        ? [
            "بيانات الموقع إذا كان مطلوباً",
            "اشتراطات النشاط والتراخيص ذات الصلة",
          ]
        : [
            "Location information if required",
            "Activity conditions and applicable permits",
          ],
    },
    {
      id: "tax",
      title: ar ? "الالتزامات الزكوية والضريبية" : "Zakat and tax obligations",
      platform: businessPlatforms[2],
      description: ar
        ? "راجع هيئة الزكاة والضريبة والجمارك لمعرفة الالتزامات التي تنطبق على نشاطك، بما فيها الرقم الضريبي والفوترة الإلكترونية إذا لزمت. لا تتطلب كل الأنشطة التسجيل نفسه."
        : "Check ZATCA for the obligations that apply to your business, including a Tax Identification Number (TIN) and e-invoicing when required. Registration requirements differ.",
      requirements: ar
        ? [
            "بيانات المنشأة والسجل التجاري",
            "التحقّق من متطلبات التسجيل والفوترة حسب الحالة",
          ]
        : [
            "Business and Commercial Registration details",
            "Verify registration and invoicing obligations for your situation",
          ],
    },
  ];
  const finished = steps.filter((s) => done[`${activity}-${s.id}`]).length;
  const next = steps.find((s) => !done[`${activity}-${s.id}`]);
  return (
    <main className="portal">
      <PlatformHeader
        lang={lang}
        onSwitch={() => setLang(ar ? "en" : "ar")}
        back
      />
      <div className="journey-workspace container">
        <section className="portal-intro">
          <span className="eyebrow">
            {ar
              ? "التجارة والأعمال / فتح مشروع"
              : "Commerce & business / Start a business"}
          </span>
          <h1>
            {ar
              ? "مشروعك يبدأ بخطوات واضحة."
              : "A clear start for your business."}
          </h1>
          <p>
            {ar
              ? "اختر نشاطك، وخلّ مُيسّرة ترتّب لك التنقّل بين المنصات الرسمية."
              : "Choose your activity. Let Myser organize your path across official platforms."}
          </p>
        </section>
        <fieldset className="activity-picker">
          <legend>
            {ar ? "وش نوع مشروعك؟" : "What kind of business are you starting?"}
          </legend>
          <div>
            {choices.map(({ id, icon: Icon, label }) => (
              <label key={id} className={activity === id ? "chosen" : ""}>
                <input
                  type="radio"
                  name="activity"
                  value={id}
                  checked={activity === id}
                  onChange={() => setActivity(id)}
                />
                <Icon size={19} />
                {label}
                {activity === id && <Check size={16} />}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="business-layout">
          <section
            className="business-steps"
            aria-label={ar ? "خطوات فتح المشروع" : "Business setup steps"}
          >
            {steps.map((step, i) => {
              const checked = !!done[`${activity}-${step.id}`];
              return (
                <article
                  key={`${activity}-${step.id}`}
                  className={`business-step ${checked ? "completed" : ""}`}
                >
                  <div className="business-step-heading">
                    <span className="business-step-number">
                      {checked ? <Check size={20} /> : i + 1}
                    </span>
                    <div>
                      <span className="business-authority">
                        {step.platform.name[n]}
                      </span>
                      <h2>{step.title}</h2>
                    </div>
                    {next?.id === step.id && (
                      <span className="status-pill">
                        {ar ? "خطوتك التالية" : "Your next step"}
                      </span>
                    )}
                  </div>
                  <p>{step.description}</p>
                  <details>
                    <summary>
                      {ar ? "وش أجهّز قبل ما أبدأ؟" : "What should I prepare?"}
                    </summary>
                    <ul>
                      {step.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </details>
                  <div className="business-step-actions">
                    <a
                      className="button button-green"
                      href={step.platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ar ? "افتح المنصة الرسمية" : "Open official platform"}
                      <ExternalLink size={15} />
                    </a>
                    <label className="completion-toggle">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setDone((prev) => ({
                            ...prev,
                            [`${activity}-${step.id}`]: e.target.checked,
                          }))
                        }
                      />
                      {ar ? "أنجزت هذه الخطوة" : "I completed this step"}
                    </label>
                  </div>
                </article>
              );
            })}
          </section>
          <aside className="business-summary">
            <div className="summary-progress">
              <span className="icon-square">
                <Building2 size={23} />
              </span>
              <h2>{ar ? "رحلتك في مكان واحد" : "Your journey in one place"}</h2>
              <p>
                {ar
                  ? "التقدّم حسب ما تحدده أنت"
                  : "Progress based on your own updates"}
              </p>
              <div
                className="progress-track"
                role="progressbar"
                aria-label={ar ? "تقدم الرحلة" : "Journey progress"}
                aria-valuenow={finished}
                aria-valuemin={0}
                aria-valuemax={steps.length}
              >
                <i style={{ width: `${(finished / steps.length) * 100}%` }} />
              </div>
              <strong aria-live="polite">
                {ar
                  ? `${finished} من ${steps.length} خطوات مكتملة`
                  : `${finished} of ${steps.length} steps complete`}
              </strong>
              {finished === steps.length && (
                <span className="business-complete">
                  <CheckCheck size={18} />
                  {ar
                    ? "أكملت قائمتك الإرشادية"
                    : "Your guidance checklist is complete"}
                </span>
              )}
            </div>
            <div className="summary-platforms">
              <h3>
                {ar ? "المنصات المرتبطة بالرحلة" : "Platforms in this journey"}
              </h3>
              {businessPlatforms.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {p.name[n]}
                    <small>{new URL(p.url).hostname}</small>
                  </span>
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
            <p className="business-note">
              {ar
                ? "هذا مسار إرشادي، وليس قائمة شاملة أو موافقة رسمية. المتطلبات تختلف حسب النشاط والموقع والشكل القانوني. تسجيل الدخول والطلبات تتم على مواقع الجهات الرسمية."
                : "This is a guide, not an exhaustive checklist or official approval. Requirements vary by activity, location, and legal structure. Sign-in and applications take place on official sites."}
            </p>
            <small className="business-local-note">
              {storageUnavailable
                ? ar
                  ? "الحفظ المحلي غير متاح؛ التقدّم متاح خلال هذه الجلسة فقط."
                  : "Local storage is unavailable; progress lasts for this session only."
                : ar
                  ? "يُحفظ نوع النشاط والتقدّم في هذا المتصفح فقط، دون بيانات شخصية."
                  : "Only activity and progress are saved in this browser, with no personal data."}
            </small>
            <button
              className="reset-journey"
              onClick={() =>
                setDone((prev) =>
                  Object.fromEntries(
                    Object.entries(prev).filter(
                      ([id]) => !id.startsWith(`${activity}-`),
                    ),
                  ),
                )
              }
            >
              <RotateCcw size={13} />
              {ar
                ? "إعادة ضبط تقدّم هذا النشاط"
                : "Reset progress for this activity"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
