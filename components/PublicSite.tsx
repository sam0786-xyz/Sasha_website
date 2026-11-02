"use client";

import { useState, useEffect, useRef } from "react";
import type { Job } from "@/lib/db";

export type Lang = "en" | "ar" | "hi";

const dictionary = {
  en: {
    nav: {
      about: "About Company",
      services: "Contracting Services",
      carousel: "Current Openings",
      opportunities: "All Opportunities",
      leadership: "Leadership",
      contact: "Submit Requirement",
    },
    badge: "Abu Dhabi Licensed • Building Projects Contracting",
    heroTitle: "BUILT FOR PRECISION & SCALE",
    heroSub: "SASHA General Contracting - L.L.C - S.P.C.",
    heroDesc:
      "A trusted Abu Dhabi general contractor delivering structural concrete, masonry, MEP coordination, and site workforce mobilization for premier UAE commercial and residential developments.",
    btnOpportunities: "View Current Opportunities",
    btnEmployer: "Submit Employer Requirement",
    legalNoticeTitle: "UAE Commercial & Employment Notice",
    legalNoticeText:
      "All recruitment and project agreements are executed with official written legal documentation in accordance with UAE Ministry of Human Resources and Emiratisation (MOHRE) regulations.",

    // Top Carousel at start
    carouselBadge: "🔴 ACTIVE RECRUITMENT • LIVE IN ABU DHABI",
    carouselHeading: "Current Site Opportunities",
    carouselSub:
      "Active opportunities currently open for Abu Dhabi building projects. Immediate deployment with official contracts.",
    carouselLiveIndicator: "LIVE DATABASE SYNC",
    carouselNext: "Next Opening",
    carouselPrev: "Previous Opening",

    aboutHeading: "Delivering reliable execution across UAE building sites",
    aboutText1:
      "SASHA General Contracting brings deep on-site coordination to building-project contracting in the Emirate of Abu Dhabi. Our team coordinates experienced tradesmen, site supervisors, and technical workforce to keep projects on schedule and compliant with UAE building codes.",
    aboutText2:
      "From preliminary earthworks and formwork to blockwork, plaster, and MEP installations, we work hand-in-hand with primary developers and Tier-1 main contractors across the UAE.",
    stats: [
      { label: "Operating License", val: "All Kind Building Projects" },
      { label: "Jurisdiction", val: "Abu Dhabi, United Arab Emirates" },
      { label: "Core Focus", val: "Site Execution & Trades Mobilization" },
      { label: "Safety Record", val: "Zero-Compromise Site Standards" },
    ],
    servicesHeading: "Core Contracting Capabilities",
    servicesSub: "Comprehensive site services delivered with rigor and speed",
    servicesList: [
      {
        title: "Structural & Civil Works",
        desc: "Foundations, reinforced concrete frames, blockwork masonry, and structural finishing executed by certified teams.",
      },
      {
        title: "Workforce Mobilization",
        desc: "Experienced site masons, carpenters, steel fixers, electricians, and certified scaffolders ready for site deployment.",
      },
      {
        title: "MEP & Finishing Works",
        desc: "Mechanical, electrical, plumbing routing, plastering, tiling, and turnkey architectural handover support.",
      },
      {
        title: "Subcontract & Site Management",
        desc: "Full on-site supervision, daily progress reporting, safety compliance, and commercial project delivery.",
      },
    ],
    jobsHeading: "All Current Site Opportunities",
    jobsSub:
      "Complete active listings updated in real-time by our Abu Dhabi operations desk. Transparent terms, official MOHRE contracts, and verified safety standards.",
    jobsEmpty: "No notices are active at this moment. New site opportunities are posted weekly.",
    jobAskBtn: "Ask question about this role",
    jobApplyBtn: "Apply / Inquire for this Role →",
    reqTitle: "📋 Requirements & Things Needed:",
    expTitle: "⏱️ Experience Required:",
    salaryTitle: "Monthly Compensation",
    explainerHeading: "Worker Guidance & Terms Explainer",
    explainerSub:
      "Not sure what a job involves? Ask questions in simple English, Arabic, or Hinglish. Our AI assistant explains duties, accommodation norms, and safety requirements plainly.",
    explainerPlaceholder: "Example: What are the daily hours for masons? Is safety equipment provided?",
    explainerBtn: "Explain in Simple Words",
    leadershipHeading: "Key Leadership & Operations Management",
    leadershipSub: "Experienced leadership directing on-site execution and commercial strategy",
    leaders: [
      {
        role: "Managing Director",
        name: "Mohammad Naushad",
        image: "/mohammad-naushad.jpg",
        bio: "Directs executive management, commercial contracting strategy, regulatory compliance, and joint-venture partnerships across the UAE.",
      },
      {
        role: "Director – Indian Operations & Manpower Mobilization",
        name: "Amzad Ali",
        image: "/amzad-ali.jpg",
        bio: "Directs SASHA's Indian operations, international recruitment pipelines, and technical trade testing centers across India. Oversees candidate vetting, document verification, biometric clearances, and end-to-end mobilization to ensure certified, project-ready workforces arrive on schedule at premier UAE construction sites.",
      },
    ],
    contactHeading: "Employer Requirements & Project Enquiries",
    contactSub: "Submit your workforce or subcontract specifications directly to our Abu Dhabi operations desk.",
    callUs: "Call Operations Team",
    emailUs: "Official Email Address",
    location: "Head Office Location",
    locationVal: "Abu Dhabi, United Arab Emirates",

    // Form Redesign Labels
    tabEmployer: "🏢 Submit Employer Requirement",
    tabWorker: "👷 Worker Job Application",
    formEmployerTitle: "Submit Employer Requirement (Manpower & Subcontract)",
    formEmployerSub:
      "Provide your project requirements below. Our operations desk mobilizes certified trades and workforce without unnecessary delays.",
    formWorkerTitle: "Submit Worker Application for Live Site Roles",
    formWorkerSub:
      "Apply directly for current site openings. Official written contracts under UAE MOHRE regulations.",
    secCompany: "1. Company & Contact Details",
    secLocation: "2. Project Location & Deployment",
    secRequirements: "3. Workforce & Manpower Requirements",
    secProvisions: "4. Supply Scope & Site Provisions",
    secRemarks: "5. Remarks & Additional Specifications",
    formCompany: "Company / Contractor Name *",
    formContactPerson: "Contact Person Full Name *",
    formPhone: "Mobile / WhatsApp Number (with country code) *",
    formEmail: "Official Work Email (optional)",
    formSite: "Project Site / Compound Name *",
    formLocationDrop: "Emirate / Project Location *",
    formTrade: "Primary Trade / Position Needed *",
    formWorkersCount: "How Many Workers Needed? *",
    formExperience: "Required Experience Level *",
    formTimeline: "Mobilization Timeline",
    formDuration: "Expected Contract Duration",
    formRemarks: "Remarks & Special Instructions",
    formRemarksPlaceholder:
      "Enter any special site conditions, shift timings, certifications, security clearance, or specific instructions...",
    formSubmitEmployer: "Submit Requirement to Operations Desk →",
    formSubmitWorker: "Submit Job Application →",
    formSuccess: "Thank you! Your requirement has been registered. Our Abu Dhabi operations desk will contact you promptly.",
    footerText:
      "SASHA General Contracting - L.L.C - S.P.C. Commercial license for All Kind Building Projects Contracting. Abu Dhabi, UAE.",
  },

  ar: {
    nav: {
      about: "عن الشركة",
      services: "خدمات المقاولات",
      carousel: "الفرص الحالية",
      opportunities: "كافة الفرص",
      leadership: "الإدارة التنفيذية",
      contact: "تقديم طلب احتياج",
    },
    badge: "مرخصة في أبوظبي • مقاولات مشاريع المباني",
    heroTitle: "بنيت للدقة والتميز في الإنجاز",
    heroSub: "ساشا للمقاولات العامة - ذ.م.م - ش.ش.و",
    heroDesc:
      "شركة مقاولات عامة معتمدة في إمارة أبوظبي متخصصة في تنفيذ الهياكل الخرسانية وأعمال البناء والتنسيق الكهروميكانيكي وتوفير وتنسيق القوى العاملة المؤهلة لأكبر المشاريع الإنشائية.",
    btnOpportunities: "عرض الفرص الحالية",
    btnEmployer: "تقديم طلب للمقاولين وأصحاب العمل",
    legalNoticeTitle: "تنبيه تجاري وقانوني هام",
    legalNoticeText:
      "تتم جميع عقود التوظيف والاتفاقيات التجارية بوثائق رسمية مسجلة وفق قوانين ولوائح وزارة الموارد البشرية والتوطين في دولة الإمارات العربية المتحدة.",

    carouselBadge: "🔴 توظيف نشط • شواغر حالية في أبوظبي",
    carouselHeading: "فرص العمل المتاحة حالياً",
    carouselSub: "شواغر نشطة جاهزة للتنسيق الفوري في مشاريع البناء بأبوظبي بعقود موثقة رسمياً.",
    carouselLiveIndicator: "تحديث مباشر من العمليات",
    carouselNext: "الفرصة التالية",
    carouselPrev: "الفرصة السابقة",

    aboutHeading: "تنفيذ موثوق ومتقن في كافة مواقع البناء في الإمارات",
    aboutText1:
      "تقدم شركة ساشا للمقاولات العامة إدارة ميدانية دقيقة لمشاريع البناء في إمارة أبوظبي. يضم فريقنا كوادر من الفنيين والمشرفين والعمال المهرة الملتزمين بالمواعيد والمعايير الهندسية المعتمدة.",
    aboutText2:
      "من الأعمال الإنشائية والخرسانية إلى أعمال الطابوق والمساح والتشطيبات والتركيبات الكهروميكانيكية، نعمل جنباً إلى جنب مع كبرى شركات التطوير والمقاولين الرئيسيين في الدولة.",
    stats: [
      { label: "النشاط التجاري", val: "مقاولات مشاريع المباني بكافة أنواعها" },
      { label: "الولاية القضائية", val: "أبوظبي، الإمارات العربية المتحدة" },
      { label: "مجال العمل", val: "تنفيذ المشاريع وإدارة العمالة الماهرة" },
      { label: "سجل السلامة", val: "التزام كامل بمعايير السلامة المهنية" },
    ],
    servicesHeading: "مجالات العمل والخدمات",
    servicesSub: "خدمات موقعية متكاملة تقدم بأعلى درجات الدقة والسرعة",
    servicesList: [
      {
        title: "الأعمال الإنشائية والمدنية",
        desc: "تنفيذ القواعد الخرسانية، الهياكل المسلحة، بناء الطابوق وأعمال العزل بواسطة فرق متخصصة.",
      },
      {
        title: "تجهيز وتنسيق فرق العمل",
        desc: "توفير البنائين، النجارين المسلحين، الحدادين، الكهربائيين، وفنيي السقالات المؤهلين للعمل الفوري.",
      },
      {
        title: "التشطيبات والأعمال الكهروميكانيكية",
        desc: "تمديدات الكهرباء والسباكة، البلاط، اللياسة والتشطيبات المعمارية حتى التسليم النهائي.",
      },
      {
        title: "إدارة العقود من الباطن",
        desc: "إشراف هندسي يومي كامل، تقارير تقدم الأعمال، وتطبيق إجراءات السلامة والصحة المهنية.",
      },
    ],
    jobsHeading: "كافة فرص العمل المتاحة في المواقع",
    jobsSub:
      "متطلبات العمل في المشاريع الحالية يتم تحديثها فورياً من غرفة العمليات في أبوظبي. جميع الأجور وبدلات السكن موثقة بعقود رسمية.",
    jobsEmpty: "لا توجد إعلانات نشطة في هذه اللحظة. يتم نشر فرص جديدة أسبوعياً.",
    jobAskBtn: "استفسر عن هذا العمل",
    jobApplyBtn: "التقديم / طلب هذه المهنة ←",
    reqTitle: "📋 المتطلبات والشروط المطلوبة:",
    expTitle: "⏱️ الخبرة المطلوبة:",
    salaryTitle: "الراتب والمخصصات الشهرية",
    explainerHeading: "مساعد التوضيح واستفسارات العمال",
    explainerSub:
      "هل لديك سؤال عن طبيعة العمل؟ يمكنك السؤال باللغة العربية أو الإنجليزية أو الهينجليش. يشرح لك المساعد الذكي المهام وظروف العمل بكل بساطة.",
    explainerPlaceholder: "مثال: كم عدد ساعات العمل اليومية للبنائين؟ هل يتم توفير معدات السلامة؟",
    explainerBtn: "اشرح بكلمات بسيطة",
    leadershipHeading: "الإدارة العليا وفريق العمليات",
    leadershipSub: "قيادة متمرسة تقود التنفيذ الميداني والاستراتيجية التجارية للشركة",
    leaders: [
      {
        role: "المدير العام / المدير التنفيذي",
        name: "محمد نوشاد",
        image: "/mohammad-naushad.jpg",
        bio: "قيادة الاستراتيجية التجارية للشركة، وإبرام العقود والمشاريع الحكومية والخاصة في إمارة أبوظبي.",
      },
      {
        role: "مدير العمليات في الهند وتجهيز الكوادر البشرية",
        name: "أمجد علي",
        image: "/amzad-ali.jpg",
        bio: "يقود العمليات المركزية لشركة ساشا في الهند ومراكز الاختبارات المهنية الميدانية وتجهيز القوى العاملة الماهرة. يتولى إدارة إجراءات الفحص والتدقيق وتسهيل وصول وإرسال وتنسيق فرق العمل المتخصصة لمواقع البناء في دولة الإمارات بأعلى معايير الانضباط والالتزام.",
      },
    ],
    contactHeading: "تقديم طلبات المقاولين والاستفسارات",
    contactSub: "أرسل متطلبات مشروعك والقوى العاملة مباشرة إلى مكتب العمليات في أبوظبي.",
    callUs: "اتصل بفريق العمليات",
    emailUs: "البريد الإلكتروني الرسمي",
    location: "مقر الشركة",
    locationVal: "أبوظبي، الإمارات العربية المتحدة",

    tabEmployer: "🏢 تقديم طلب أصحاب العمل والمقاولين",
    tabWorker: "👷 طلب توظيف للأفراد والعمال",
    formEmployerTitle: "نموذج طلب القوى العاملة والمقاولات من الباطن",
    formEmployerSub: "حدد مواصفات العمالة والمشروع وسيقوم فريق العمليات بمتابعة التنفيذ فوراً.",
    formWorkerTitle: "التقديم المباشر للوظائف الميدانية",
    formWorkerSub: "قدم بياناتك للانضمام إلى مشاريع البناء الحالية في إمارة أبوظبي.",
    secCompany: "1. بيانات الشركة والتواصل",
    secLocation: "2. موقع المشروع والمدينة",
    secRequirements: "3. مواصفات واحتياجات القوى العاملة",
    secProvisions: "4. السكن والمواصلات وتجهيزات الموقع",
    secRemarks: "5. الملاحظات والتعليمات الخاصة",
    formCompany: "اسم الشركة / المقاول *",
    formContactPerson: "الاسم الكامل للمسؤول *",
    formPhone: "رقم الهاتف / واتساب (مع رمز الدولة) *",
    formEmail: "البريد الإلكتروني (اختياري)",
    formSite: "اسم المشروع أو الموقع *",
    formLocationDrop: "موقع المشروع (الإمارة / المنطقة) *",
    formTrade: "المهنة / التخصص المطلوب *",
    formWorkersCount: "كم عدد العمالة المطلوبة؟ *",
    formExperience: "مستوى الخبرة المطلوبة *",
    formTimeline: "موعد بدء وتوريد العمالة",
    formDuration: "مدة العقد المتوقعة",
    formRemarks: "ملاحظات إضافية وتفاصيل خاصة",
    formRemarksPlaceholder: "أي شروط موقعية خاصة، تصاريح أمنية، مواعيد الدوام، أو متطلبات معدات...",
    formSubmitEmployer: "إرسال الطلب إلى مكتب العمليات ←",
    formSubmitWorker: "إرسال طلب التوظيف ←",
    formSuccess: "شكراً لك! تم استلام طلبك وسيتواصل معك فريق العمليات في أقرب وقت.",
    footerText:
      "ساشا للمقاولات العامة - ذ.م.م - ش.ش.و. رخصة تجارية لمقاولات مشاريع المباني بمختلف أنواعها. أبوظبي، الإمارات.",
  },

  hi: {
    nav: {
      about: "Company Profile",
      services: "Contracting Kaam",
      carousel: "Live Kaam",
      opportunities: "Saari Openings",
      leadership: "Management Team",
      contact: "Requirement Bhejein",
    },
    badge: "Abu Dhabi Licensed • Building Projects Contracting",
    heroTitle: "SAHI KAAM, PURI ZIMMEDARI",
    heroSub: "SASHA General Contracting - L.L.C - S.P.C.",
    heroDesc:
      "Abu Dhabi ki trusted general contracting company. Hum concrete structures, masonry, MEP coordination aur skilled site workforce ke saath UAE ke building projects ko waqt par pura karte hain.",
    btnOpportunities: "Abhi ke Kaam Dekhiye",
    btnEmployer: "Company Requirement Bhejein",
    legalNoticeTitle: "Zaroori UAE Kaanooni Suchna",
    legalNoticeText:
      "Company ka saara kaam aur recruitment UAE MOHRE ke niyam aur written legal documentation ke mutabiq hota hai.",

    carouselBadge: "🔴 ACTIVE RECRUITMENT • ABU DHABI SITE VACANCIES",
    carouselHeading: "Abhi Ke Live Kaam Aur Vacancies",
    carouselSub: "Abu Dhabi projects ke liye direct verified trades aur workers ki live recruitment.",
    carouselLiveIndicator: "LIVE DATABASE SE CONNECTED",
    carouselNext: "Agla Kaam",
    carouselPrev: "Pichhla Kaam",

    aboutHeading: "Abu Dhabi aur UAE sites par bharosemand kaam",
    aboutText1:
      "SASHA General Contracting Abu Dhabi mein building projects par clear aur transparent coordination ke saath kaam karti hai. Hamare paas trained masons, carpenters, aur site supervisors hain jo standard safety ke sath kaam karte hain.",
    aboutText2:
      "Excavation aur RCC concrete frame se lekar blockwork, plaster, tiles aur electrical/plumbing tak, hum Tier-1 main contractors ke sath direct partnership karte hain.",
    stats: [
      { label: "Licence Kaam", val: "All Kind Building Projects Contracting" },
      { label: "Sheher", val: "Abu Dhabi, United Arab Emirates" },
      { label: "Asli Focus", val: "Site Execution & Skilled Trades" },
      { label: "Safety Norms", val: "100% UAE Site Safety Standard" },
    ],
    servicesHeading: "Contracting Services & Capabilities",
    servicesSub: "Site par har tarah ke civil aur finishing work ki suvidha",
    servicesList: [
      {
        title: "Civil & RCC Structures",
        desc: "Foundations, columns, slabs, aur heavy masonry work standard engineering plans ke mutabiq.",
      },
      {
        title: "Workforce Mobilization",
        desc: "Trained masons, steel fixers, shuttering carpenters, electricians aur certified scaffolders.",
      },
      {
        title: "MEP & Finishing Works",
        desc: "Electrical conduits, plumbing pipes, plaster, tiles, aur complete architectural finishing.",
      },
      {
        title: "Site Supervision & Safety",
        desc: "Daily reporting, project schedule management, aur safety gears ke sath safe execution.",
      },
    ],
    jobsHeading: "Abhi Ke Available Kaam (Live Notices)",
    jobsSub:
      "Abu Dhabi operations desk se direct live update hoti hai. Har kaam ka salary aur accommodation official written contract mein clear hota hai.",
    jobsEmpty: "Abhi naye vacancy update ho rahe hain. Har hafte naye kaam yahan post hote hain.",
    jobAskBtn: "Is kaam ke baare mein sawaal poochein",
    jobApplyBtn: "Apply / Requirement Bhejein →",
    reqTitle: "📋 Zaroori Shartein & Document:",
    expTitle: "⏱️ Experience Chahiye:",
    salaryTitle: "Mahine Ki Salary",
    explainerHeading: "Worker Helper & Job Explainer",
    explainerSub:
      "Agar kaam ke baare mein koi doubt hai to simple Hinglish ya English mein poochein. AI assistant aapko kaam, ghante, aur safety rule aasaan bhasha mein samjhayega.",
    explainerPlaceholder: "Example: Rozana kitne ghante kaam hoga? Safety shoes aur helmet milte hain?",
    explainerBtn: "Aasaan Shabdon Mein Samjhein",
    leadershipHeading: "Key Leadership & Management",
    leadershipSub: "Tajurbekaar team jo site operations aur commercial agreements sambhalti hai",
    leaders: [
      {
        role: "Managing Director",
        name: "Mohammad Naushad",
        image: "/mohammad-naushad.jpg",
        bio: "Company ki overall strategy, UAE government regulations, client relations aur commercial contracts lead karte hain.",
      },
      {
        role: "Director – Indian Operations & Manpower Mobilization",
        name: "Amzad Ali",
        image: "/amzad-ali.jpg",
        bio: "India operations aur overseas manpower recruitment ke head hain. Pure India mein trade testing centers, worker screening, document verification, aur UAE building sites ke liye trained masons, carpenters aur technicians ki on-time mobilization aur sending lead karte hain.",
      },
    ],
    contactHeading: "Employer Requirement & Project Enquiries",
    contactSub: "Direct operations desk se baat karein ya apna project requirement form mein bhejein.",
    callUs: "Call Operations Team",
    emailUs: "Official Email",
    location: "Office Location",
    locationVal: "Abu Dhabi, United Arab Emirates",

    tabEmployer: "🏢 Company / Employer Requirement",
    tabWorker: "👷 Worker Job Application",
    formEmployerTitle: "Submit Employer Requirement (Manpower & Subcontract)",
    formEmployerSub: "Apna site workforce requirement darj karein. Hamara operations desk foran mobilize karta hai.",
    formWorkerTitle: "Worker Job Application Form",
    formWorkerSub: "Current site openings ke liye seedha apply karein. Official UAE MOHRE agreement.",
    secCompany: "1. Company & Contact Details",
    secLocation: "2. Project Location & City",
    secRequirements: "3. Workforce & Manpower Requirement",
    secProvisions: "4. Accommodation & Transport Scope",
    secRemarks: "5. Remarks & Special Instructions",
    formCompany: "Company / Contractor Name *",
    formContactPerson: "Contact Person Full Name *",
    formPhone: "Mobile / WhatsApp (Country code ke sath) *",
    formEmail: "Official Work Email (optional)",
    formSite: "Project Site / Area Name *",
    formLocationDrop: "Emirate / Location *",
    formTrade: "Kaunsa Trade / Kaam Chahiye *",
    formWorkersCount: "Kitne Workers Chahiye? *",
    formExperience: "Experience Level *",
    formTimeline: "Kab Tak Workers Chahiye?",
    formDuration: "Kaam Ki Duration",
    formRemarks: "Remarks & Special Notes",
    formRemarksPlaceholder: "Site shift timings, safety cards, security pass ya koi khaas baat yahan likhein...",
    formSubmitEmployer: "Requirement Operations Desk Ko Bhejein →",
    formSubmitWorker: "Application Bhejein →",
    formSuccess: "Shukriya! Aapki requirement register ho gayi hai. Hamara operations desk jald contact karega.",
    footerText:
      "SASHA General Contracting - L.L.C - S.P.C. Licensed for All Kind Building Projects Contracting. Abu Dhabi, UAE.",
  },
};

export function PublicSite({
  jobs: initialJobs,
  phone: envPhone,
  initialLang,
}: {
  jobs: Job[];
  phone: string;
  initialLang: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang || "en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showLangModal, setShowLangModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(initialJobs || []);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explaining, setExplaining] = useState(false);

  // Top Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  // Employer & Worker Form State
  const [formMode, setFormMode] = useState<"employer" | "worker">("employer");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectSite, setProjectSite] = useState("");
  const [projectLocation, setProjectLocation] = useState("Abu Dhabi - Saadiyat / Mussafah");
  const [tradePosition, setTradePosition] = useState("Shuttering Carpenters");
  const [customTrade, setCustomTrade] = useState("");
  const [workersCount, setWorkersCount] = useState("10 Workers");
  const [experienceLevel, setExperienceLevel] = useState("2+ Years UAE/GCC Site Experience");
  const [mobilization, setMobilization] = useState("Immediate (Within 48h)");
  const [duration, setDuration] = useState("3 to 6 Months");
  const [remarks, setRemarks] = useState("");
  const [provAccom, setProvAccom] = useState(true);
  const [provTransport, setProvTransport] = useState(true);
  const [provPPE, setProvPPE] = useState(true);
  const [provOvertime, setProvOvertime] = useState(false);

  // Worker application specifics
  const [workerCurrentLoc, setWorkerCurrentLoc] = useState("Inside UAE (Abu Dhabi)");
  const [workerVisaStatus, setWorkerVisaStatus] = useState("Visit Visa / Ready for Transfer");

  const [formSending, setFormSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const t = dictionary[lang] || dictionary.en;
  const isRtl = lang === "ar";
  const displayPhone = envPhone || "+971 56 237 1853";

  // Check saved theme and prompt initial language selection modal
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("sasha_theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);

      const langChosen = localStorage.getItem("sasha_lang_chosen");
      const savedLang = localStorage.getItem("sasha_lang") as Lang | null;
      if (!langChosen) {
        setShowLangModal(true);
      } else if (savedLang && (savedLang === "en" || savedLang === "ar" || savedLang === "hi")) {
        setLang(savedLang);
        document.documentElement.lang = savedLang === "hi" ? "en" : savedLang;
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      }
    } catch {}
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("sasha_theme", nextTheme);
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.setAttribute("content", nextTheme);
    } catch {}
  }

  function selectInitialLang(selected: Lang) {
    handleLanguageChange(selected);
    try {
      localStorage.setItem("sasha_lang_chosen", "true");
      localStorage.setItem("sasha_lang", selected);
    } catch {}
    setShowLangModal(false);
  }

  function closeLangModal() {
    try {
      localStorage.setItem("sasha_lang_chosen", "true");
    } catch {}
    setShowLangModal(false);
  }

  // Live polling for jobs every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/jobs")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (Array.isArray(data)) setJobs(data);
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance Top Carousel every 5 seconds (paused on hover)
  useEffect(() => {
    if (carouselPaused || jobs.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % jobs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselPaused, jobs.length]);

  function handleLanguageChange(newLang: Lang) {
    setLang(newLang);
    document.documentElement.lang = newLang === "hi" ? "en" : newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("sasha_lang", newLang);
    } catch {}
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLang);
      window.history.replaceState({}, "", url.toString());
    }
  }

  function nextSlide() {
    if (jobs.length <= 1) return;
    setActiveSlide((prev) => (prev + 1) % jobs.length);
  }

  // In-Place Job Application Modal (Worker applies right there without page scrolling down)
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [workerPhone, setWorkerPhone] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [workerExp, setWorkerExp] = useState("2+ Years UAE/GCC Experience");
  const [workerLoc, setWorkerLoc] = useState("Inside UAE (Abu Dhabi)");
  const [workerVisa, setWorkerVisa] = useState("Visit Visa / Ready for Transfer");
  const [workerRemarks, setWorkerRemarks] = useState("");
  const [workerSubmitting, setWorkerSubmitting] = useState(false);
  const [workerSuccess, setWorkerSuccess] = useState(false);

  function prevSlide() {
    if (jobs.length <= 1) return;
    setActiveSlide((prev) => (prev - 1 + jobs.length) % jobs.length);
  }

  function handleApplyClick(job: Job) {
    // Open in-place application form right where the worker is — website does NOT scroll down!
    setModalJob(job);
    setWorkerSuccess(false);
  }

  async function handleWorkerModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!modalJob || !workerName || !workerPhone) return;
    setWorkerSubmitting(true);

    const formattedMessage = [
      `=== IN-PLACE DIRECT WORKER APPLICATION ===`,
      `APPLIED POSITION: ${modalJob.title}`,
      `HIRING COMPANY: ${modalJob.companyName || "SASHA General Contracting"}`,
      `MONTHLY SALARY: ${modalJob.salaryText || "Standard UAE Site Wages"}`,
      `PROJECT LOCATION: ${modalJob.location || "Abu Dhabi"}`,
      `APPLICANT NAME: ${workerName}`,
      `MOBILE / WHATSAPP: ${workerPhone}`,
      workerEmail ? `EMAIL: ${workerEmail}` : null,
      `EXPERIENCE: ${workerExp}`,
      `CURRENT LOCATION: ${workerLoc}`,
      `VISA STATUS: ${workerVisa}`,
      workerRemarks ? `REMARKS: ${workerRemarks}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: workerName,
          phone: workerPhone,
          email: workerEmail || undefined,
          kind: "Worker Direct Job Application",
          companyName: modalJob.companyName || "SASHA General Contracting",
          projectLocation: modalJob.location || "Abu Dhabi",
          tradePosition: modalJob.title,
          experience: workerExp,
          remarks: workerRemarks,
          message: formattedMessage,
        }),
      });

      if (res.ok) {
        setWorkerSuccess(true);
        setWorkerName("");
        setWorkerPhone("");
        setWorkerEmail("");
        setWorkerRemarks("");
      } else {
        alert("Could not submit application. Please try again or call us.");
      }
    } catch {
      alert("Submission error. Please check your network connection.");
    } finally {
      setWorkerSubmitting(false);
    }
  }

  function handleEmployerRequestClick(job: Job) {
    setFormMode("employer");
    setTradePosition(job.title);
    setRemarks(`Requirement based on live opening: ${job.title} (${job.location})`);
    const el = document.getElementById("employer-requirement");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  function handleAskJobClick(job: Job) {
    setQuestion(`Explain what a ${job.title} does, what experience is needed, and what the terms mean.`);
    const el = document.getElementById("explainer");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleExplainSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setExplaining(true);
    setAnswer("");
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), lang }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || "No response received.");
    } catch {
      setAnswer("Could not reach worker assistant. Please check your connection.");
    } finally {
      setExplaining(false);
    }
  }

  async function handleRequirementSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contactPerson || !phone) return;

    setFormSending(true);

    const activeTrade = customTrade.trim() ? customTrade.trim() : tradePosition;

    let formattedMessage = "";
    if (formMode === "employer") {
      const provisions = [
        provAccom ? "Accommodation by SASHA" : "Accommodation by Client",
        provTransport ? "Transport by SASHA" : "Transport by Client",
        provPPE ? "Standard PPE Required" : "",
        provOvertime ? "Overtime Required" : "",
      ]
        .filter(Boolean)
        .join(", ");

      formattedMessage = [
        `=== EMPLOYER MANPOWER REQUIREMENT ===`,
        `COMPANY: ${companyName || "Not specified"}`,
        `CONTACT PERSON: ${contactPerson}`,
        `PHONE: ${phone}`,
        email ? `EMAIL: ${email}` : null,
        `PROJECT SITE: ${projectSite || "Abu Dhabi Project"}`,
        `LOCATION: ${projectLocation}`,
        `TRADE NEEDED: ${activeTrade}`,
        `WORKERS COUNT: ${workersCount}`,
        `REQUIRED EXPERIENCE: ${experienceLevel}`,
        `MOBILIZATION: ${mobilization}`,
        `DURATION: ${duration}`,
        provisions ? `PROVISIONS: ${provisions}` : null,
        remarks ? `REMARKS: ${remarks}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    } else {
      formattedMessage = [
        `=== WORKER / CANDIDATE APPLICATION ===`,
        `APPLICANT NAME: ${contactPerson}`,
        `PHONE: ${phone}`,
        email ? `EMAIL: ${email}` : null,
        `APPLIED TRADE: ${activeTrade}`,
        `EXPERIENCE: ${experienceLevel}`,
        `CURRENT LOCATION: ${workerCurrentLoc}`,
        `VISA STATUS: ${workerVisaStatus}`,
        remarks ? `REMARKS: ${remarks}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactPerson,
          phone,
          email: email || undefined,
          kind:
            formMode === "employer"
              ? "Employer Project Requirement"
              : "Worker Job Application",
          companyName: formMode === "employer" ? companyName : undefined,
          projectLocation,
          workersCount: formMode === "employer" ? workersCount : undefined,
          tradePosition: activeTrade,
          experience: experienceLevel,
          remarks,
          message: formattedMessage,
        }),
      });

      if (res.ok) {
        setFormSuccess(true);
        setCompanyName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setProjectSite("");
        setRemarks("");
      } else {
        alert("Could not submit requirement. Please check information or call us directly.");
      }
    } catch {
      alert("Submission error. Please check your network connection or call us.");
    } finally {
      setFormSending(false);
    }
  }

  return (
    <div className="site-wrapper" dir={isRtl ? "rtl" : "ltr"}>
      {/* Top Header Navigation */}
      <header className="main-header">
        <div className="header-container">
          <a href="#top" className="site-brand">
            <img src="/sasha-mark.svg" alt="SASHA GC Logo" width="34" height="34" className="brand-mark-img" />
            <span className="brand-text">
              SASHA <span className="brand-accent">GC</span>
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="#top-carousel">{t.nav.carousel}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#opportunities">{t.nav.opportunities}</a>
            <a href="#leadership">{t.nav.leadership}</a>
            <a href="#employer-requirement">{t.nav.contact}</a>
          </nav>

          <div className="header-right">
            {/* Language Switcher */}
            <div className="language-pills" aria-label="Language Selector">
              <button
                type="button"
                className={`lang-pill ${lang === "en" ? "active" : ""}`}
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "ar" ? "active" : ""}`}
                onClick={() => handleLanguageChange("ar")}
              >
                العربية
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "hi" ? "active" : ""}`}
                onClick={() => handleLanguageChange("hi")}
              >
                Hinglish
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <>
                  <span className="theme-toggle-icon">☀️</span>
                  <span className="theme-toggle-label">Light</span>
                </>
              ) : (
                <>
                  <span className="theme-toggle-icon">🌙</span>
                  <span className="theme-toggle-label">Dark</span>
                </>
              )}
            </button>

            <a href="#employer-requirement" className="btn-cta-nav">
              {t.btnEmployer}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="hero-section">
        <div className="hero-backdrop" />
        <div className="hero-content-container">
          <div className="hero-badge-tag">{t.badge}</div>
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-company-name">{t.heroSub}</p>
          <p className="hero-description">{t.heroDesc}</p>

          <div className="hero-button-row">
            <a href="#top-carousel" className="btn-primary-signal">
              {t.btnOpportunities} ↓
            </a>
            <a href="#employer-requirement" className="btn-secondary-ghost">
              {t.btnEmployer} →
            </a>
          </div>

          <div className="hero-legal-callout">
            <strong>🛡️ {t.legalNoticeTitle}:</strong> {t.legalNoticeText}
          </div>
        </div>
      </section>

      {/* 1. CURRENT OPPORTUNITIES CAROUSEL AT THE START */}
      <section
        id="top-carousel"
        className="hero-carousel-section"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
      >
        <div className="section-container">
          <div className="carousel-header-bar">
            <div className="carousel-title-group">
              <div className="live-alert-tag">
                <span className="live-pulse-dot" />
                <span>{t.carouselBadge}</span>
              </div>
              <h2 className="carousel-main-heading">{t.carouselHeading}</h2>
              <p className="carousel-subtext">{t.carouselSub}</p>
            </div>

            <div className="carousel-controls-top">
              <div className="carousel-counter-tag">
                {jobs.length > 0 ? (
                  <>
                    Role <strong>{activeSlide + 1}</strong> of <strong>{jobs.length}</strong>
                  </>
                ) : (
                  "0 Openings"
                )}
              </div>
              <div className="carousel-arrow-buttons">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="btn-carousel-nav prev"
                  aria-label={t.carouselPrev}
                  disabled={jobs.length <= 1}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="btn-carousel-nav next"
                  aria-label={t.carouselNext}
                  disabled={jobs.length <= 1}
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Viewport */}
          {jobs.length === 0 ? (
            <div className="empty-carousel-banner">
              <p>{t.jobsEmpty}</p>
              <a href="#employer-requirement" className="btn-empty-inquire">
                Submit an Employer Requirement →
              </a>
            </div>
          ) : (
            <div className="carousel-slider-track">
              {jobs.map((job, idx) => {
                const isActive = idx === activeSlide;
                const reqItems = (job.requirements || "")
                  .split(/[\n•;]+/)
                  .map((s) => s.trim())
                  .filter(Boolean);

                return (
                  <div
                    key={job.id}
                    className={`carousel-slide-item ${isActive ? "active" : ""}`}
                    style={{ display: isActive ? "block" : "none" }}
                  >
                    <div className="job-spotlight-card">
                      {/* Top Header: Company Name & Company Logo */}
                      <div className="spotlight-top-header">
                        <div className="spotlight-company-info">
                          <div className="company-logo-avatar">
                            <img
                              src={job.companyLogo || "/sasha-mark.svg"}
                              alt={job.companyName || "SASHA GC"}
                              width="48"
                              height="48"
                              className="company-logo-img"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/sasha-mark.svg";
                              }}
                            />
                          </div>
                          <div>
                            <span className="hiring-entity-sub">Hiring Contractor</span>
                            <h4 className="spotlight-company-name">
                              {job.companyName || "SASHA General Contracting"}
                              <span className="verified-check" title="Verified Contractor">✓</span>
                            </h4>
                          </div>
                        </div>

                        <div className="spotlight-badges">
                          <span className="live-status-pill">
                            <span className="live-pulse-dot" /> LIVE NOW
                          </span>
                          <span className="trade-pill">{job.workType || "Site Contracting"}</span>
                        </div>
                      </div>

                      {/* Main Position & Location */}
                      <div className="spotlight-position-row">
                        <div className="position-title-box">
                          <span className="location-badge">📍 {job.location || "Abu Dhabi"}</span>
                          <h3 className="spotlight-position-title">{job.title}</h3>
                          {job.description && (
                            <p className="spotlight-description">{job.description}</p>
                          )}
                        </div>

                        {/* Salary Block */}
                        <div className="spotlight-salary-box">
                          <span className="salary-box-label">{t.salaryTitle}</span>
                          <div className="salary-box-value">
                            💰 {job.salaryText || "Standard UAE Site Wages"}
                          </div>
                          <small className="salary-contract-note">Official MOHRE Contract</small>
                        </div>
                      </div>

                      {/* Requirement & Experience Section */}
                      <div className="spotlight-details-grid">
                        {/* Requirement (where we can put things that are needed) */}
                        <div className="spotlight-req-block">
                          <h5 className="block-title">{t.reqTitle}</h5>
                          <ul className="req-checklist">
                            {reqItems.length > 0 ? (
                              reqItems.map((item, rIdx) => (
                                <li key={rIdx} className="req-check-row">
                                  <span className="check-bullet">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))
                            ) : (
                              <li className="req-check-row">
                                <span className="check-bullet">✓</span>
                                <span>Valid passport and verified site experience.</span>
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Experience Section Under That */}
                        <div className="spotlight-exp-block">
                          <h5 className="block-title">{t.expTitle}</h5>
                          <div className="exp-highlight-box">
                            <span className="exp-icon">⏱️</span>
                            <div className="exp-text-wrap">
                              <strong>Minimum Experience:</strong>
                              <p>{job.experience || "1-2 Years UAE / Gulf Site Experience"}</p>
                            </div>
                          </div>

                          <div className="spotlight-cta-buttons">
                            <button
                              type="button"
                              onClick={() => handleApplyClick(job)}
                              className="btn-spotlight-apply"
                            >
                              Apply for this Role →
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEmployerRequestClick(job)}
                              className="btn-spotlight-employer"
                            >
                              Request this Crew for Project
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAskJobClick(job)}
                              className="btn-spotlight-ask"
                            >
                              💬 {t.jobAskBtn}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dots indicator */}
              {jobs.length > 1 && (
                <div className="carousel-dots-row">
                  {jobs.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      className={`carousel-dot ${dotIdx === activeSlide ? "active" : ""}`}
                      onClick={() => setActiveSlide(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About & Stats Grid */}
      <section id="about" className="content-section about-section">
        <div className="section-container">
          <div className="two-col-layout">
            <div className="col-text">
              <span className="section-label">01 / OVERVIEW</span>
              <h2 className="section-headline">{t.aboutHeading}</h2>
              <p className="lead-paragraph">{t.aboutText1}</p>
              <p className="body-paragraph">{t.aboutText2}</p>
            </div>

            <div className="col-stats-grid">
              {t.stats.map((stat, i) => (
                <div key={i} className="stat-box">
                  <span className="stat-box-title">{stat.label}</span>
                  <p className="stat-box-value">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="content-section services-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-label">02 / CAPABILITIES</span>
            <h2 className="section-headline">{t.servicesHeading}</h2>
            <p className="sub-paragraph">{t.servicesSub}</p>
          </div>

          <div className="services-cards-grid">
            {t.servicesList.map((srv, idx) => (
              <div key={idx} className="service-card">
                <span className="srv-number">0{idx + 1}</span>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. REDESIGNED ALL OPPORTUNITIES LISTING */}
      <section id="opportunities" className="content-section opportunities-section">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <span className="section-label">03 / LIVE SITE NOTICES</span>
              <h2 className="section-headline">{t.jobsHeading}</h2>
              <p className="sub-paragraph">{t.jobsSub}</p>
            </div>
            <div className="live-status-pill">
              <span className="live-pulse-dot" /> LIVE DATABASE SYNC
            </div>
          </div>

          <div className="jobs-display-grid">
            {jobs.length === 0 ? (
              <div className="empty-jobs-banner">{t.jobsEmpty}</div>
            ) : (
              jobs.map((job) => {
                const reqItems = (job.requirements || "")
                  .split(/[\n•;]+/)
                  .map((s) => s.trim())
                  .filter(Boolean);

                return (
                  <article key={job.id} className="job-opportunity-redesigned">
                    {/* Header: Company Name & Company Logo */}
                    <div className="job-card-top-row">
                      <div className="company-badge-left">
                        <img
                          src={job.companyLogo || "/sasha-mark.svg"}
                          alt={job.companyName || "SASHA GC"}
                          width="38"
                          height="38"
                          className="job-logo-thumb"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/sasha-mark.svg";
                          }}
                        />
                        <div>
                          <span className="company-tiny-label">Contractor</span>
                          <h4 className="job-company-name">
                            {job.companyName || "SASHA General Contracting"}
                            <span className="verified-check" title="Verified UAE Contractor">✓</span>
                          </h4>
                        </div>
                      </div>

                      <div className="job-card-pills">
                        <span className="live-indicator-pill">● LIVE</span>
                        <span className="job-tag trade">{job.workType}</span>
                      </div>
                    </div>

                    {/* Position */}
                    <div className="job-position-block">
                      <span className="job-tag location">📍 {job.location}</span>
                      <h3 className="job-card-title">{job.title}</h3>
                      {job.description && <p className="job-card-desc">{job.description}</p>}
                    </div>

                    {/* Salary */}
                    <div className="job-salary-block">
                      <span className="salary-label">{t.salaryTitle}</span>
                      <div className="salary-value">💰 {job.salaryText || "Standard UAE Site Wages"}</div>
                    </div>

                    {/* Requirement (where we can put things that are needed) */}
                    <div className="job-requirements-block">
                      <h5 className="requirements-title">{t.reqTitle}</h5>
                      <ul className="req-bullet-list">
                        {reqItems.map((req, rI) => (
                          <li key={rI} className="req-bullet-item">
                            <span className="check-bullet">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Experience Section Under That */}
                    <div className="job-experience-block">
                      <span className="exp-icon">⏱️</span>
                      <div className="exp-content">
                        <strong>{t.expTitle}</strong>
                        <span>{job.experience || "1-2 Years UAE Site Experience"}</span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="job-card-footer">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(job)}
                        className="btn-apply-job"
                      >
                        {t.jobApplyBtn}
                      </button>
                      <button
                        type="button"
                        className="btn-ask-job"
                        onClick={() => handleAskJobClick(job)}
                      >
                        {t.jobAskBtn} →
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Worker Helper / NVIDIA Nemotron Plain-Language Explainer */}
      <section id="explainer" className="content-section explainer-section">
        <div className="section-container">
          <div className="explainer-card-wrapper">
            <div className="explainer-header">
              <span className="section-label">04 / WORKER SUPPORT</span>
              <h2 className="section-headline">{t.explainerHeading}</h2>
              <p className="sub-paragraph">{t.explainerSub}</p>
            </div>

            <form onSubmit={handleExplainSubmit} className="explainer-form">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t.explainerPlaceholder}
                rows={3}
                required
              />
              <button type="submit" disabled={explaining} className="btn-primary-signal">
                {explaining ? "Consulting Assistant..." : t.explainerBtn}
              </button>
            </form>

            {answer && (
              <div className="explainer-answer-box">
                <div className="answer-badge">💡 ASSISTANT EXPLANATION</div>
                <p>{answer}</p>
                <small>
                  Note: Official employment terms, salary details, and visa conditions are only final when signed on official company contracts.
                </small>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="content-section leadership-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-label">05 / LEADERSHIP</span>
            <h2 className="section-headline">{t.leadershipHeading}</h2>
            <p className="sub-paragraph">{t.leadershipSub}</p>
          </div>

          <div className="leaders-grid">
            {t.leaders.map((leader, i) => (
              <div key={i} className={`leader-card ${leader.image ? "has-image" : ""}`}>
                {leader.image ? (
                  <div className="leader-photo-frame">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="leader-portrait-img"
                    />
                  </div>
                ) : (
                  <div className="leader-avatar-frame">
                    <div className="avatar-initials">AA</div>
                  </div>
                )}
                <div className="leader-text-content">
                  <span className="leader-role-tag">{leader.role}</span>
                  <h3 className="leader-name">{leader.name}</h3>
                  <p className="leader-bio">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REDESIGNED STRAIGHT EMPLOYER REQUIREMENT & CONTACT FORM */}
      <section id="employer-requirement" className="content-section contact-section">
        <div className="section-container">
          <div className="contact-section-intro">
            <span className="section-label">06 / SUBMIT REQUIREMENTS</span>
            <h2 className="section-headline">{t.contactHeading}</h2>
            <p className="lead-paragraph">{t.contactSub}</p>
          </div>

          {/* Contact summary bar */}
          <div className="contact-quick-strip">
            <div className="quick-channel-item">
              <span className="quick-icon">📞</span>
              <div>
                <small>{t.callUs}</small>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`}>{displayPhone}</a>
              </div>
            </div>
            <div className="quick-channel-item">
              <span className="quick-icon">✉️</span>
              <div>
                <small>{t.emailUs}</small>
                <a href="mailto:info@sashagc.com">info@sashagc.com</a>
              </div>
            </div>
            <div className="quick-channel-item">
              <span className="quick-icon">📍</span>
              <div>
                <small>{t.location}</small>
                <span>{t.locationVal}</span>
              </div>
            </div>
          </div>

          {/* Form Switcher Tabs */}
          <div className="form-mode-tabs" role="tablist">
            <button
              type="button"
              className={`mode-tab-btn ${formMode === "employer" ? "active" : ""}`}
              onClick={() => setFormMode("employer")}
            >
              {t.tabEmployer}
            </button>
            <button
              type="button"
              className={`mode-tab-btn ${formMode === "worker" ? "active" : ""}`}
              onClick={() => setFormMode("worker")}
            >
              {t.tabWorker}
            </button>
          </div>

          {/* The Redesigned Straight Form Card */}
          <div className="straight-requirement-card">
            <div className="card-form-title-group">
              <h3>
                {formMode === "employer" ? t.formEmployerTitle : t.formWorkerTitle}
              </h3>
              <p>
                {formMode === "employer" ? t.formEmployerSub : t.formWorkerSub}
              </p>
            </div>

            {formSuccess ? (
              <div className="enquiry-success-message">
                <div className="success-icon">✓</div>
                <h4>{t.formSuccess}</h4>
                <p>
                  Our Abu Dhabi operations desk has logged this requirement. We will contact you at {phone}.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSuccess(false)}
                  className="btn-reset-form"
                >
                  Submit Another Requirement / Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequirementSubmit} className="straight-formatted-form">
                {formMode === "employer" ? (
                  <>
                    {/* SECTION 1: Company & Contact Details */}
                    <div className="form-section-block">
                      <div className="section-block-title">{t.secCompany}</div>
                      <div className="straight-grid-2">
                        <div className="form-field">
                          <label>{t.formCompany}</label>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Trojan General Contracting / Aldar Partner"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>{t.formContactPerson}</label>
                          <input
                            type="text"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            placeholder="e.g. Eng. Tariq Mansoor / Project Manager"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>{t.formPhone}</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+971 50 ... or +971 56 ..."
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>{t.formEmail}</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contracts@yourcompany.ae"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Project Location & Deployment */}
                    <div className="form-section-block">
                      <div className="section-block-title">{t.secLocation}</div>
                      <div className="straight-grid-2">
                        <div className="form-field">
                          <label>{t.formSite}</label>
                          <input
                            type="text"
                            value={projectSite}
                            onChange={(e) => setProjectSite(e.target.value)}
                            placeholder="e.g. Saadiyat Cultural District / Al Reem Island Tower"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>{t.formLocationDrop}</label>
                          <select
                            value={projectLocation}
                            onChange={(e) => setProjectLocation(e.target.value)}
                          >
                            <option value="Abu Dhabi - Saadiyat & Yas Islands">Abu Dhabi - Saadiyat & Yas Islands</option>
                            <option value="Abu Dhabi - Mussafah Industrial Area">Abu Dhabi - Mussafah Industrial Area</option>
                            <option value="Abu Dhabi - City Center / Reem / Maryah">Abu Dhabi - City Center / Reem / Maryah</option>
                            <option value="Abu Dhabi - Al Ain">Abu Dhabi - Al Ain</option>
                            <option value="Abu Dhabi - Al Dhafra / Western Region">Abu Dhabi - Al Dhafra / Western Region</option>
                            <option value="Dubai Sites">Dubai Sites</option>
                            <option value="Sharjah & Northern Emirates">Sharjah & Northern Emirates</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Massive Workforce Requirement Formatted Cleanly */}
                    <div className="form-section-block">
                      <div className="section-block-title">{t.secRequirements}</div>
                      <div className="straight-grid-3">
                        <div className="form-field">
                          <label>{t.formTrade}</label>
                          <select
                            value={tradePosition}
                            onChange={(e) => setTradePosition(e.target.value)}
                          >
                            <option value="Shuttering Carpenters">Shuttering Carpenters (Formwork)</option>
                            <option value="Structural Steel Fixers">Structural Steel Fixers (Rebar)</option>
                            <option value="Finishing & Block Masons">Finishing & Block Masons</option>
                            <option value="Certified Electricians">Certified Electricians (MEP)</option>
                            <option value="Plumbers & Pipe Fitters">Plumbers & Pipe Fitters</option>
                            <option value="Certified Scaffolders">Certified Scaffolders</option>
                            <option value="General Site Helpers">General Site Helpers / Riggers</option>
                            <option value="Civil Site Foremen / Supervisors">Civil Site Foremen / Supervisors</option>
                            <option value="Multi-Trade Mobilization Crew">Multi-Trade Mobilization Crew</option>
                            <option value="Other Trade">Other Specialized Trade...</option>
                          </select>
                        </div>

                        <div className="form-field">
                          <label>{t.formWorkersCount}</label>
                          <select
                            value={workersCount}
                            onChange={(e) => setWorkersCount(e.target.value)}
                          >
                            <option value="1 to 5 Workers">1 to 5 Workers</option>
                            <option value="6 to 15 Workers">6 to 15 Workers</option>
                            <option value="16 to 30 Workers">16 to 30 Workers</option>
                            <option value="31 to 50 Workers">31 to 50 Workers</option>
                            <option value="50 to 100 Workers">50 to 100 Workers</option>
                            <option value="100+ Workers">100+ Workers (Turnkey Crew)</option>
                          </select>
                        </div>

                        <div className="form-field">
                          <label>{t.formExperience}</label>
                          <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                          >
                            <option value="1-2 Years Site Experience">1-2 Years Site Experience</option>
                            <option value="2+ Years UAE/GCC Site Experience">2+ Years UAE/GCC Site Experience</option>
                            <option value="3-5 Years UAE Commercial Experience">3-5 Years UAE Commercial Experience</option>
                            <option value="5+ Years Senior / Certified Trade">5+ Years Senior / Certified Trade</option>
                          </select>
                        </div>
                      </div>

                      {tradePosition === "Other Trade" && (
                        <div className="form-field mt-12">
                          <label>Specify Custom Trade / Skillset *</label>
                          <input
                            type="text"
                            value={customTrade}
                            onChange={(e) => setCustomTrade(e.target.value)}
                            placeholder="e.g. 6G Welders / Tower Crane Operators / Marble Polishers"
                            required
                          />
                        </div>
                      )}

                      <div className="straight-grid-2 mt-16">
                        <div className="form-field">
                          <label>{t.formTimeline}</label>
                          <select
                            value={mobilization}
                            onChange={(e) => setMobilization(e.target.value)}
                          >
                            <option value="Immediate (Within 48h)">Immediate (Within 48 Hours)</option>
                            <option value="Within 7 Days">Within 7 Days</option>
                            <option value="Within 15-30 Days">Within 15-30 Days</option>
                            <option value="Planning / Future Tender">Planning / Future Tender Phase</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>{t.formDuration}</label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          >
                            <option value="1 to 3 Months">Short-term (1 to 3 Months)</option>
                            <option value="3 to 6 Months">Medium-term (3 to 6 Months)</option>
                            <option value="6 to 12 Months">Long-term (6 to 12 Months)</option>
                            <option value="Turnkey / 1+ Year">Turnkey Project (1+ Year)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: Supply Scope Checkboxes */}
                    <div className="form-section-block">
                      <div className="section-block-title">{t.secProvisions}</div>
                      <div className="scope-checkboxes-grid">
                        <label className="checkbox-custom-label">
                          <input
                            type="checkbox"
                            checked={provAccom}
                            onChange={(e) => setProvAccom(e.target.checked)}
                          />
                          <span>Accommodation provided by SASHA GC</span>
                        </label>
                        <label className="checkbox-custom-label">
                          <input
                            type="checkbox"
                            checked={provTransport}
                            onChange={(e) => setProvTransport(e.target.checked)}
                          />
                          <span>Site Transportation provided by SASHA GC</span>
                        </label>
                        <label className="checkbox-custom-label">
                          <input
                            type="checkbox"
                            checked={provPPE}
                            onChange={(e) => setProvPPE(e.target.checked)}
                          />
                          <span>Standard PPE & Safety Gears required</span>
                        </label>
                        <label className="checkbox-custom-label">
                          <input
                            type="checkbox"
                            checked={provOvertime}
                            onChange={(e) => setProvOvertime(e.target.checked)}
                          />
                          <span>Overtime / Night Shift rotation needed</span>
                        </label>
                      </div>
                    </div>

                    {/* SECTION 5: Remarks Section */}
                    <div className="form-section-block">
                      <div className="section-block-title">{t.secRemarks}</div>
                      <div className="form-field">
                        <label>{t.formRemarks}</label>
                        <textarea
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder={t.formRemarksPlaceholder}
                          rows={3}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formSending}
                      className="btn-submit-straight-form"
                    >
                      {formSending ? "Submitting Requirement..." : t.formSubmitEmployer}
                    </button>
                  </>
                ) : (
                  /* WORKER CANDIDATE APPLICATION FORM */
                  <>
                    <div className="form-section-block">
                      <div className="section-block-title">Candidate Details</div>
                      <div className="straight-grid-2">
                        <div className="form-field">
                          <label>Full Name *</label>
                          <input
                            type="text"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            placeholder="e.g. Ramesh Kumar / Mohammad Bilal"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Phone / WhatsApp Number *</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+971 50 ... or +91 ..."
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Email Address (optional)</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div className="form-field">
                          <label>Applying Trade / Position *</label>
                          <input
                            type="text"
                            value={tradePosition}
                            onChange={(e) => setTradePosition(e.target.value)}
                            placeholder="e.g. Shuttering Carpenter / Mason / Helper"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section-block">
                      <div className="section-block-title">Experience & Availability</div>
                      <div className="straight-grid-3">
                        <div className="form-field">
                          <label>Years of Site Experience</label>
                          <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                          >
                            <option value="1 Year Experience">1 Year Experience</option>
                            <option value="2-3 Years UAE Experience">2-3 Years UAE Experience</option>
                            <option value="4-6 Years Gulf Experience">4-6 Years Gulf Experience</option>
                            <option value="7+ Years Senior Tradesman">7+ Years Senior Tradesman</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>Current Location</label>
                          <select
                            value={workerCurrentLoc}
                            onChange={(e) => setWorkerCurrentLoc(e.target.value)}
                          >
                            <option value="Inside UAE (Abu Dhabi)">Inside UAE (Abu Dhabi)</option>
                            <option value="Inside UAE (Dubai / Sharjah)">Inside UAE (Dubai / Sharjah)</option>
                            <option value="Outside UAE (India)">Outside UAE (India)</option>
                            <option value="Outside UAE (Pakistan)">Outside UAE (Pakistan)</option>
                            <option value="Outside UAE (Bangladesh / Nepal / Other)">Outside UAE (Bangladesh / Nepal / Other)</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label>Visa Status</label>
                          <select
                            value={workerVisaStatus}
                            onChange={(e) => setWorkerVisaStatus(e.target.value)}
                          >
                            <option value="Visit Visa / Ready for Transfer">Visit Visa / Ready for Transfer</option>
                            <option value="Cancelled Visa / Grace Period">Cancelled Visa / Grace Period</option>
                            <option value="Employment Visa with NOC">Employment Visa with NOC</option>
                            <option value="Need New UAE Employment Visa">Need New UAE Employment Visa</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-section-block">
                      <div className="section-block-title">Remarks & Previous Projects</div>
                      <div className="form-field">
                        <label>Additional Information</label>
                        <textarea
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="Tell us about previous companies worked with, specific skills, or immediate joining date..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formSending}
                      className="btn-submit-straight-form"
                    >
                      {formSending ? "Submitting Application..." : t.formSubmitWorker}
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* IN-PLACE WORKER APPLICATION MODAL (Does not scroll down) */}
      {modalJob && (
        <div
          className="worker-apply-modal-backdrop"
          onClick={() => setModalJob(null)}
          aria-hidden={!modalJob}
        >
          <div
            className="worker-apply-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-role-title"
          >
            <button
              type="button"
              className="btn-modal-close"
              onClick={() => setModalJob(null)}
              aria-label="Close application form"
            >
              ✕
            </button>

            <div className="modal-header-section">
              <div className="modal-company-lockup">
                <img
                  src={modalJob.companyLogo || "/sasha-mark.svg"}
                  alt={modalJob.companyName || "Company"}
                  width="40"
                  height="40"
                  className="modal-logo-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/sasha-mark.svg";
                  }}
                />
                <div>
                  <span className="modal-sub-label">Direct Job Application</span>
                  <h4 className="modal-company-title">
                    {modalJob.companyName || "SASHA General Contracting"}
                    <span className="verified-check" title="Verified UAE Contractor">✓</span>
                  </h4>
                </div>
              </div>

              <div className="modal-job-summary">
                <span className="modal-loc-badge">📍 {modalJob.location || "Abu Dhabi"}</span>
                <h3 id="modal-role-title" className="modal-job-title">{modalJob.title}</h3>
                <div className="modal-salary-tag">
                  💰 {modalJob.salaryText || "Standard UAE Site Wages"}
                </div>
              </div>
            </div>

            {workerSuccess ? (
              <div className="modal-success-box">
                <div className="success-icon-big">✓</div>
                <h4>Application Successfully Registered!</h4>
                <p>
                  Your direct application for <strong>{modalJob.title}</strong> has been received by SASHA General Contracting operations desk.
                </p>
                <p className="success-contact-note">
                  Our recruitment team will contact you via Phone / WhatsApp for immediate interview and verification.
                </p>
                <button
                  type="button"
                  className="btn-modal-done"
                  onClick={() => setModalJob(null)}
                >
                  Close & Continue
                </button>
              </div>
            ) : (
              <form onSubmit={handleWorkerModalSubmit} className="modal-actual-form">
                <div className="modal-form-grid-2">
                  <div className="form-field">
                    <label>Your Full Name *</label>
                    <input
                      type="text"
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar / Mohammad Bilal"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-field">
                    <label>WhatsApp / Mobile Number *</label>
                    <input
                      type="tel"
                      value={workerPhone}
                      onChange={(e) => setWorkerPhone(e.target.value)}
                      placeholder="+971 50 ... or +91 ..."
                      required
                    />
                  </div>
                </div>

                <div className="modal-form-grid-3">
                  <div className="form-field">
                    <label>Trade Experience</label>
                    <select
                      value={workerExp}
                      onChange={(e) => setWorkerExp(e.target.value)}
                    >
                      <option value="1 Year Experience">1 Year Experience</option>
                      <option value="2-3 Years UAE Experience">2-3 Years UAE Experience</option>
                      <option value="4-6 Years Gulf Experience">4-6 Years Gulf Experience</option>
                      <option value="7+ Years Senior Tradesman">7+ Years Senior Tradesman</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Current Location</label>
                    <select
                      value={workerLoc}
                      onChange={(e) => setWorkerLoc(e.target.value)}
                    >
                      <option value="Inside UAE (Abu Dhabi)">Inside UAE (Abu Dhabi)</option>
                      <option value="Inside UAE (Dubai / Sharjah)">Inside UAE (Dubai / Sharjah)</option>
                      <option value="Outside UAE (India)">Outside UAE (India)</option>
                      <option value="Outside UAE (Pakistan)">Outside UAE (Pakistan)</option>
                      <option value="Outside UAE (Other)">Outside UAE (Other)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Visa Status</label>
                    <select
                      value={workerVisa}
                      onChange={(e) => setWorkerVisa(e.target.value)}
                    >
                      <option value="Visit Visa / Ready for Transfer">Visit Visa / Ready for Transfer</option>
                      <option value="Cancelled Visa / Grace Period">Cancelled Visa / Grace Period</option>
                      <option value="Employment Visa with NOC">Employment Visa with NOC</option>
                      <option value="Need New UAE Employment Visa">Need New UAE Employment Visa</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Additional Notes / Previous Experience (Optional)</label>
                  <textarea
                    value={workerRemarks}
                    onChange={(e) => setWorkerRemarks(e.target.value)}
                    placeholder="Mention previous companies worked with, tools you know, or immediate joining date..."
                    rows={2}
                  />
                </div>

                <div className="modal-footer-actions">
                  <button
                    type="submit"
                    disabled={workerSubmitting}
                    className="btn-modal-submit"
                  >
                    {workerSubmitting ? "Submitting Application..." : "Submit Direct Application →"}
                  </button>
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={() => setModalJob(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* First-visit Language Welcome Dialog */}
      {showLangModal && (
        <div
          className="lang-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lang-modal-heading"
          onClick={closeLangModal}
        >
          <div
            className="lang-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lang-modal-close"
              onClick={closeLangModal}
              aria-label="Close language selector"
            >
              ✕
            </button>

            <div className="lang-modal-header">
              <div className="lang-modal-badge">
                <span className="lang-uae-flag">🇦🇪</span>
                <span>ABU DHABI • UAE LICENSED GENERAL CONTRACTING</span>
              </div>
              <img
                src="/sasha-mark.svg"
                alt="SASHA General Contracting"
                width="48"
                height="48"
                className="lang-modal-logo"
              />
              <h2 id="lang-modal-heading" className="lang-modal-title">
                Welcome to SASHA General Contracting
              </h2>
              <div className="lang-modal-multi-headings">
                <span className="lang-h-ar">مرحباً بكم في ساشا للمقاولات العامة</span>
                <span className="lang-h-hi">साशा जनरल कॉन्ट्रैक्टिंग में आपका स्वागत है</span>
              </div>
              <p className="lang-modal-desc">
                Please select your preferred language to view UAE project services, open site recruitment, and operations contact.
              </p>
            </div>

            <div className="lang-modal-options">
              <button
                type="button"
                className={`lang-option-card ${lang === "en" ? "selected" : ""}`}
                onClick={() => selectInitialLang("en")}
              >
                <div className="lang-option-icon">🌐</div>
                <div className="lang-option-content">
                  <div className="lang-option-top">
                    <span className="lang-option-name">English</span>
                    <span className="lang-option-pill">Primary</span>
                  </div>
                  <p className="lang-option-sub">
                    UAE Commercial Building Contracting, Engineering & Operations
                  </p>
                </div>
                <span className="lang-option-arrow">→</span>
              </button>

              <button
                type="button"
                className={`lang-option-card ${lang === "ar" ? "selected" : ""}`}
                onClick={() => selectInitialLang("ar")}
              >
                <div className="lang-option-icon">🇦🇪</div>
                <div className="lang-option-content" dir="rtl">
                  <div className="lang-option-top">
                    <span className="lang-option-name">العربية (Arabic)</span>
                    <span className="lang-option-pill">الرسمية</span>
                  </div>
                  <p className="lang-option-sub">
                    مقاولات مشاريع المباني في أبوظبي، متطلبات الشركات والتوظيف
                  </p>
                </div>
                <span className="lang-option-arrow">←</span>
              </button>

              <button
                type="button"
                className={`lang-option-card ${lang === "hi" ? "selected" : ""}`}
                onClick={() => selectInitialLang("hi")}
              >
                <div className="lang-option-icon">👷</div>
                <div className="lang-option-content">
                  <div className="lang-option-top">
                    <span className="lang-option-name">हिंदी / Hinglish</span>
                    <span className="lang-option-pill">Workforce</span>
                  </div>
                  <p className="lang-option-sub">
                    Abu Dhabi site kaam, direct bharti, salary aur project assistance
                  </p>
                </div>
                <span className="lang-option-arrow">→</span>
              </button>
            </div>

            <div className="lang-modal-footer">
              <button
                type="button"
                className="btn-lang-continue"
                onClick={() => selectInitialLang(lang || "en")}
              >
                Continue in English →
              </button>
              <span className="lang-modal-legal-note">
                Abu Dhabi Department of Economic Development Licensed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-brand-lockup">
              <img src="/sasha-mark.svg" alt="SASHA GC" width="30" height="30" />
              <span className="footer-brand">
                SASHA <span>GC</span>
              </span>
            </div>
            <p className="footer-legal">{t.footerText}</p>
          </div>
          <div className="footer-right">
            <span className="footer-copyright">
              © {new Date().getFullYear()} SASHA General Contracting. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
