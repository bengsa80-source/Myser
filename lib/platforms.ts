export type Platform = {
  name: [string, string];
  description: [string, string];
  url: string;
};
export const businessPlatforms: Platform[] = [
  {
    name: ["المركز السعودي للأعمال", "Saudi Business Center"],
    description: [
      "تأسيس النشاط وخدمات السجل التجاري",
      "Business establishment and Commercial Registration",
    ],
    url: "https://business.sa/",
  },
  {
    name: ["منصة بلدي", "Balady"],
    description: [
      "الرخص البلدية ومتطلبات موقع النشاط",
      "Municipal licenses and business location requirements",
    ],
    url: "https://balady.gov.sa/",
  },
  {
    name: ["هيئة الزكاة والضريبة والجمارك", "ZATCA"],
    description: [
      "الزكاة والضرائب والفوترة الإلكترونية حسب متطلبات النشاط",
      "Zakat, tax, and e-invoicing requirements as applicable",
    ],
    url: "https://zatca.gov.sa/",
  },
];
export const directories: Record<
  string,
  { title: [string, string]; platforms: Platform[] }
> = {
  business: {
    title: ["التجارة والأعمال", "Commerce & business"],
    platforms: [
      ...businessPlatforms,
      {
        name: ["وزارة التجارة", "Ministry of Commerce"],
        description: [
          "الخدمات والمعلومات الرسمية للأنشطة التجارية",
          "Official commercial activity services and information",
        ],
        url: "https://mc.gov.sa/",
      },
      {
        name: ["وزارة الاستثمار", "Ministry of Investment"],
        description: [
          "خدمات الاستثمار ومتطلباته حسب حالة المستثمر",
          "Investment services and requirements as applicable",
        ],
        url: "https://misa.gov.sa/",
      },
    ],
  },
  people: {
    title: ["الأفراد والخدمات العامة", "People & public services"],
    platforms: [
      {
        name: ["أبشر", "Absher"],
        description: [
          "الهوية والإقامة وخدمات الأحوال المدنية",
          "National ID, Iqama, and Civil Affairs services",
        ],
        url: "https://www.absher.sa/",
      },
      {
        name: ["وزارة الصحة", "Ministry of Health"],
        description: [
          "الوصول إلى المعلومات والخدمات الصحية الرسمية",
          "Official health information and services",
        ],
        url: "https://www.moh.gov.sa/",
      },
      {
        name: ["وزارة التعليم", "Ministry of Education"],
        description: [
          "الخدمات والمعلومات التعليمية الرسمية",
          "Official education services and information",
        ],
        url: "https://www.moe.gov.sa/",
      },
    ],
  },
  traffic: {
    title: ["المرور والمركبات", "Traffic & vehicles"],
    platforms: [
      {
        name: ["أبشر", "Absher"],
        description: [
          "خدمات رخص القيادة والمركبات والمخالفات",
          "Driving licenses, vehicles, and traffic violations",
        ],
        url: "https://www.absher.sa/",
      },
      {
        name: ["وزارة الداخلية", "Ministry of Interior"],
        description: [
          "معلومات الإدارة العامة للمرور ومتطلبات الخدمات",
          "Traffic authority information and service requirements",
        ],
        url: "https://www.moi.gov.sa/",
      },
      {
        name: ["الهيئة العامة للنقل", "Transport General Authority"],
        description: [
          "خدمات وتراخيص أنشطة النقل",
          "Transport activity services and permits",
        ],
        url: "https://www.tga.gov.sa/",
      },
    ],
  },
  justice: {
    title: ["العدل والقضاء", "Justice & legal services"],
    platforms: [
      {
        name: ["ناجز", "Najiz"],
        description: [
          "القضايا والوكالات والتوثيق والخدمات العدلية",
          "Cases, powers of attorney, notarization, and judicial services",
        ],
        url: "https://najiz.sa/",
      },
      {
        name: ["وزارة العدل", "Ministry of Justice"],
        description: [
          "الدليل الرسمي للأنظمة والخدمات العدلية",
          "Official justice regulations and services",
        ],
        url: "https://www.moj.gov.sa/",
      },
      {
        name: ["تراضي", "Taradhi"],
        description: [
          "طلبات الصلح وتسوية النزاعات",
          "Mediation and dispute resolution",
        ],
        url: "https://taradhi.moj.gov.sa/",
      },
    ],
  },
};
