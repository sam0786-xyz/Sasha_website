// All public-site copy in English, Arabic and Hinglish.
// Option `value`s stay in English so the operations desk always receives the same text.

export type Lang = "en" | "ar" | "hi";
export const LANGS: Lang[] = ["en", "ar", "hi"];

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "ar" || v === "hi";
}

/** BCP 47 tags: Hinglish is Hindi written in Latin script. */
export const HTML_LANG: Record<Lang, string> = { en: "en", ar: "ar", hi: "hi-Latn" };
export const LANG_NAME: Record<Lang, string> = { en: "English", ar: "العربية", hi: "Hinglish" };
export const LANG_SHORT: Record<Lang, string> = { en: "EN", ar: "عربي", hi: "Hinglish" };

export type Option = { value: string; label: Record<Lang, string> };

const o = (value: string, en: string, ar: string, hi: string = en): Option => ({
  value,
  label: { en, ar, hi },
});

export const OPTIONS = {
  locations: [
    o("Abu Dhabi - Saadiyat & Yas Islands", "Abu Dhabi – Saadiyat & Yas", "أبوظبي – السعديات وياس"),
    o("Abu Dhabi - Mussafah Industrial Area", "Abu Dhabi – Mussafah", "أبوظبي – مصفح"),
    o("Abu Dhabi - City Center / Reem / Maryah", "Abu Dhabi – City, Reem & Maryah", "أبوظبي – المدينة والريم والماريه"),
    o("Abu Dhabi - Al Ain", "Al Ain", "العين"),
    o("Abu Dhabi - Al Dhafra / Western Region", "Al Dhafra (Western Region)", "الظفرة (المنطقة الغربية)"),
    o("Dubai Sites", "Dubai", "دبي"),
    o("Sharjah & Northern Emirates", "Sharjah & Northern Emirates", "الشارقة والإمارات الشمالية"),
  ],
  trades: [
    o("Shuttering Carpenters", "Shuttering carpenters (formwork)", "نجارو القوالب (الشدات)", "Shuttering carpenter (formwork)"),
    o("Structural Steel Fixers", "Steel fixers (rebar)", "حدادو التسليح", "Steel fixer (sariya)"),
    o("Finishing & Block Masons", "Block & finishing masons", "بناؤو الطابوق والتشطيبات", "Block / finishing mason"),
    o("Certified Electricians", "Electricians (MEP)", "كهربائيون (أعمال كهروميكانيكية)", "Electrician (MEP)"),
    o("Plumbers & Pipe Fitters", "Plumbers & pipe fitters", "سباكون وفنيو أنابيب", "Plumber / pipe fitter"),
    o("Certified Scaffolders", "Scaffolders", "فنيو السقالات", "Scaffolder"),
    o("General Site Helpers", "General helpers & riggers", "عمال مساعدون وفنيو رفع", "Helper / rigger"),
    o("Civil Site Foremen / Supervisors", "Foremen & site supervisors", "رؤساء عمال ومشرفو مواقع", "Foreman / supervisor"),
    o("Multi-Trade Mobilization Crew", "Multi-trade crew", "فريق متعدد التخصصات", "Multi-trade crew"),
    o("Other Trade", "Other trade", "تخصص آخر", "Koi aur trade"),
  ],
  workers: [
    o("1 to 5 Workers", "1–5", "١–٥"),
    o("6 to 15 Workers", "6–15", "٦–١٥"),
    o("16 to 30 Workers", "16–30", "١٦–٣٠"),
    o("31 to 50 Workers", "31–50", "٣١–٥٠"),
    o("50 to 100 Workers", "50–100", "٥٠–١٠٠"),
    o("100+ Workers", "100+", "+١٠٠"),
  ],
  employerExperience: [
    o("1-2 Years Site Experience", "1–2 years on site", "١–٢ سنة في المواقع", "1–2 saal site experience"),
    o("2+ Years UAE/GCC Site Experience", "2+ years UAE / GCC", "+٢ سنة في الإمارات أو الخليج", "2+ saal UAE / GCC"),
    o("3-5 Years UAE Commercial Experience", "3–5 years UAE commercial", "٣–٥ سنوات في المشاريع التجارية بالإمارات", "3–5 saal UAE commercial"),
    o("5+ Years Senior / Certified Trade", "5+ years, senior / certified", "+٥ سنوات، فني أول أو معتمد", "5+ saal, senior / certified"),
  ],
  mobilisation: [
    o("Immediate (Within 48h)", "Immediately (within 48 hours)", "فوراً (خلال ٤٨ ساعة)", "Turant (48 ghante mein)"),
    o("Within 7 Days", "Within 7 days", "خلال ٧ أيام", "7 din ke andar"),
    o("Within 15-30 Days", "Within 15–30 days", "خلال ١٥–٣٠ يوماً", "15–30 din ke andar"),
    o("Planning / Future Tender", "Planning / future tender", "مرحلة التخطيط أو مناقصة قادمة", "Planning / aage ka tender"),
  ],
  duration: [
    o("1 to 3 Months", "1–3 months", "١–٣ أشهر", "1–3 mahine"),
    o("3 to 6 Months", "3–6 months", "٣–٦ أشهر", "3–6 mahine"),
    o("6 to 12 Months", "6–12 months", "٦–١٢ شهراً", "6–12 mahine"),
    o("Turnkey / 1+ Year", "1 year or longer", "سنة أو أكثر", "1 saal ya zyada"),
  ],
  workerExperience: [
    o("1 Year Experience", "Up to 1 year", "حتى سنة واحدة", "1 saal tak"),
    o("2-3 Years UAE Experience", "2–3 years in the UAE", "٢–٣ سنوات في الإمارات", "2–3 saal UAE mein"),
    o("4-6 Years Gulf Experience", "4–6 years in the Gulf", "٤–٦ سنوات في الخليج", "4–6 saal Gulf mein"),
    o("7+ Years Senior Tradesman", "7+ years, senior tradesman", "+٧ سنوات، فني أول", "7+ saal, senior karigar"),
  ],
  currentLocation: [
    o("Inside UAE (Abu Dhabi)", "In the UAE – Abu Dhabi", "داخل الإمارات – أبوظبي", "UAE mein – Abu Dhabi"),
    o("Inside UAE (Dubai / Sharjah)", "In the UAE – Dubai / Sharjah", "داخل الإمارات – دبي أو الشارقة", "UAE mein – Dubai / Sharjah"),
    o("Outside UAE (India)", "Outside the UAE – India", "خارج الإمارات – الهند", "UAE ke bahar – India"),
    o("Outside UAE (Pakistan)", "Outside the UAE – Pakistan", "خارج الإمارات – باكستان", "UAE ke bahar – Pakistan"),
    o("Outside UAE (Bangladesh / Nepal / Other)", "Outside the UAE – Bangladesh, Nepal or other", "خارج الإمارات – بنغلاديش أو نيبال أو غيرها", "UAE ke bahar – Bangladesh, Nepal ya aur"),
  ],
  visa: [
    o("Visit Visa / Ready for Transfer", "Visit visa, ready to transfer", "تأشيرة زيارة وجاهز للتحويل", "Visit visa, transfer ke liye ready"),
    o("Cancelled Visa / Grace Period", "Visa cancelled, in grace period", "تأشيرة ملغاة وفي فترة السماح", "Visa cancel, grace period mein"),
    o("Employment Visa with NOC", "Employment visa with NOC", "تأشيرة عمل مع شهادة عدم ممانعة", "Employment visa, NOC ke saath"),
    o("Need New UAE Employment Visa", "Need a new UAE employment visa", "أحتاج تأشيرة عمل جديدة", "Naya UAE employment visa chahiye"),
  ],
};

const en = {
  meta: {
    title: "SASHA General Contracting | Building Contractor & Site Crews in Abu Dhabi",
    description:
      "Licensed Abu Dhabi building contractor: structural, civil, MEP and finishing works, plus skilled site crews for contractors and developers across the UAE.",
  },
  skip: "Skip to content",
  nav: {
    services: "Services",
    process: "How we work",
    roles: "Open roles",
    company: "Company",
    faq: "FAQ",
    contact: "Contact",
  },
  ui: {
    menu: "Menu",
    close: "Close",
    language: "Language",
    themeDark: "Dark theme",
    themeLight: "Light theme",
    requestCrew: "Request a crew",
    seeRoles: "See open roles",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  hero: {
    eyebrow: "Abu Dhabi · Building contracting",
    title: "Building works and skilled site crews for Abu Dhabi projects.",
    lead:
      "SASHA General Contracting delivers structural, civil, MEP and finishing works, and supplies supervised tradespeople to contractors and developers across the UAE. Every engagement is agreed in writing.",
    recordTitle: "Company record",
    record: [
      { k: "Licensed activity", v: "All Kind Building Projects Contracting" },
      { k: "Registered in", v: "Abu Dhabi, United Arab Emirates" },
      { k: "Legal form", v: "L.L.C – S.P.C" },
      { k: "Languages", v: "English · العربية · Hindi" },
    ],
    tradesLabel: "Trades we supply",
    trades: [
      "Shuttering carpenters",
      "Steel fixers",
      "Block masons",
      "Electricians",
      "Plumbers",
      "Scaffolders",
      "Foremen",
    ],
  },
  paths: {
    eyebrow: "Work with us",
    title: "Two ways in. One accountable team.",
    contractor: {
      label: "For contractors & developers",
      title: "Need a crew or a subcontractor?",
      points: [
        "Trades from formwork to finishing, sized to your programme",
        "Accommodation, transport and PPE arranged on request",
        "Foremen on site for daily progress and safety",
      ],
      cta: "Send a requirement",
    },
    worker: {
      label: "For site workers",
      title: "Looking for construction work in Abu Dhabi?",
      points: [
        "Current roles with salary shown up front",
        "Written contract before you start, under UAE MOHRE rules",
        "No recruitment fees — ever",
      ],
      cta: "See open roles",
    },
  },
  services: {
    eyebrow: "Services",
    title: "What we build and supply",
    lead: "Four lines of work, delivered by our own supervisors and tradespeople.",
    items: [
      {
        title: "Structural & civil works",
        desc: "Foundations, reinforced concrete frames, blockwork and structural finishing.",
        tags: ["Formwork", "Rebar", "Concrete", "Blockwork"],
      },
      {
        title: "MEP & finishing",
        desc: "Electrical and plumbing routes, plaster, tiling and architectural finishing through to handover.",
        tags: ["Electrical", "Plumbing", "Plaster", "Tiling"],
      },
      {
        title: "Workforce mobilisation",
        desc: "Skilled and semi-skilled trades supplied for short programmes or long-running projects.",
        tags: ["Carpenters", "Steel fixers", "Masons", "Scaffolders"],
      },
      {
        title: "Subcontract & site management",
        desc: "On-site supervision, daily progress reporting and safety compliance on packages we take on.",
        tags: ["Supervision", "Reporting", "HSE"],
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "From requirement to people on site",
    steps: [
      { title: "Share the requirement", desc: "Trade, headcount, site location and start date — by form, phone or WhatsApp." },
      { title: "Confirm in writing", desc: "We confirm the crew, rates, provisions and duration before anything starts." },
      { title: "Mobilise", desc: "Documentation, transport, accommodation and PPE are arranged as agreed." },
      { title: "Supervise on site", desc: "Our foremen manage daily progress and safety, and report back to you." },
    ],
  },
  roles: {
    eyebrow: "Open roles",
    title: "Current site openings",
    lead: "Roles posted by our Abu Dhabi operations desk. Salary and terms are confirmed in your written contract.",
    empty: "There are no open roles right now. New openings are posted here as projects start — please check again soon.",
    salary: "Salary",
    experience: "Experience",
    location: "Location",
    type: "Trade",
    requirements: "Requirements",
    apply: "Apply now",
    askWhatsApp: "Ask on WhatsApp",
    details: "Role details",
    allTrades: "All trades",
    filterLabel: "Filter roles by trade",
    emptyFilterTitle: "No roles in this trade right now",
    emptyFilterText: "Choose another trade, or send your details and we will contact you.",
    openApp: "Don’t see your trade? Send your details and we will contact you when a suitable role opens.",
    openAppLink: "Send your details",
    count: (n: number) => (n === 1 ? "1 open role" : `${n} open roles`),
    back: "All open roles",
    closed: "This role is no longer open. See the current openings instead.",
    posted: "Posted",
    askText: (title: string) => `Hello SASHA GC, I have a question about the ${title} role.`,
  },
  protect: {
    title: "Never pay for a job offer.",
    text:
      "SASHA General Contracting does not charge workers recruitment or visa fees, and UAE law does not allow it. If anyone asks you for money in our name, do not pay — call or WhatsApp us to check.",
  },
  company: {
    eyebrow: "Company",
    title: "An Abu Dhabi contractor built around site execution",
    p1:
      "SASHA General Contracting coordinates experienced tradespeople, site supervisors and technical staff on building projects in the Emirate of Abu Dhabi, keeping work on programme and in line with UAE building codes.",
    p2:
      "We work alongside developers and main contractors, from earthworks and formwork through blockwork, plaster and MEP installation.",
    noticeTitle: "Contracts and compliance",
    notice:
      "All recruitment and project agreements are made with written documentation in line with UAE Ministry of Human Resources and Emiratisation (MOHRE) regulations.",
    leadersTitle: "Leadership",
    leaders: [
      {
        name: "Mohammad Naushad",
        role: "Managing Director",
        image: "/mohammad-naushad.jpg",
        bio: "Leads the company’s management, commercial contracting, regulatory compliance and partnerships across the UAE.",
      },
      {
        name: "Amzad Ali",
        role: "Director – Indian Operations & Manpower Mobilization",
        image: "/amzad-ali.jpg",
        bio: "Runs SASHA’s operations in India: trade testing, candidate screening, document checks and mobilising project-ready crews to UAE sites on schedule.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions we are often asked",
    groups: [
      { title: "Working with SASHA", desc: "For contractors, developers and anyone checking who we are.", items: [0, 1, 2, 3, 4] },
      { title: "For site workers", desc: "Applying for a role, and staying safe from fake job offers.", items: [5, 6] },
    ],
    items: [
      {
        q: "What does SASHA General Contracting do?",
        a: "SASHA General Contracting is an Abu Dhabi building contractor licensed for All Kind Building Projects Contracting. It delivers structural and civil works, MEP and finishing works, and supplies supervised site crews to contractors and developers.",
      },
      {
        q: "Where does SASHA General Contracting work?",
        a: "The company is registered in Abu Dhabi and works mainly across the Emirate of Abu Dhabi, including Saadiyat, Yas, Reem, Mussafah, Al Ain and Al Dhafra. Requirements in Dubai, Sharjah and the Northern Emirates are also considered.",
      },
      {
        q: "Which trades can you supply?",
        a: "Shuttering carpenters, steel fixers, block and finishing masons, electricians, plumbers and pipe fitters, scaffolders, general helpers and riggers, and foremen or site supervisors. Multi-trade crews can be put together for a package.",
      },
      {
        q: "How do I request workers for my project?",
        a: "Send the trade, headcount, site location and start date using the requirement form on this page, or call or WhatsApp the operations desk. The crew, rates and terms are confirmed in writing before mobilisation.",
      },
      {
        q: "Can you provide accommodation, transport and PPE?",
        a: "Yes, on request. Accommodation, site transport and standard PPE can be included, and are confirmed as part of the written agreement for each requirement.",
      },
      {
        q: "How do I apply for a construction job with SASHA?",
        a: "Choose a role under Open roles and press Apply, or send your details using the worker form. The team contacts you by phone or WhatsApp. Salary and terms are confirmed in a written contract under UAE MOHRE rules.",
      },
      {
        q: "Do I have to pay a fee to get a job?",
        a: "No. SASHA General Contracting does not charge workers recruitment or visa fees. If anyone asks for money in the company’s name, do not pay and contact the company directly.",
      },
    ],
  },
  cta: {
    eyebrow: "Start a project",
    title: "Have a project starting in Abu Dhabi?",
    desc: "Tell us the trades, headcount and start date. We confirm the crew and terms in writing before anyone mobilises.",
    primary: "Request a crew",
    secondary: "WhatsApp us",
  },
  contact: {
    eyebrow: "Contact",
    title: "Talk to the operations desk",
    lead: "Send a requirement or an application below, or reach us directly.",
    callLabel: "Call",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    officeLabel: "Office",
    office: "Abu Dhabi, United Arab Emirates",
  },
  form: {
    tabsLabel: "Choose a form",
    tabEmployer: "I need workers",
    tabWorker: "I want a job",
    employerTitle: "Manpower & subcontract requirement",
    employerLead: "The more detail you share, the faster we can confirm a crew.",
    workerTitle: "Job application",
    workerLead: "We will contact you by phone or WhatsApp about suitable roles.",
    sec: {
      contact: "Your details",
      site: "Project & site",
      crew: "Crew needed",
      provisions: "Provisions",
      notes: "Anything else",
      candidate: "Your details",
      availability: "Experience & availability",
    },
    company: "Company name",
    contactPerson: "Contact person",
    fullName: "Full name",
    phone: "Mobile / WhatsApp (with country code)",
    email: "Email",
    optional: "optional",
    projectSite: "Project or site name",
    location: "Location",
    trade: "Trade",
    otherTrade: "Specify the trade",
    workersCount: "Number of workers",
    experience: "Experience level",
    mobilisation: "Start",
    duration: "Duration",
    applyingFor: "Trade or position",
    yearsExperience: "Site experience",
    currentLocation: "Where are you now?",
    visa: "Visa status",
    provAccom: "Accommodation provided by SASHA",
    provTransport: "Site transport provided by SASHA",
    provPPE: "Standard PPE required",
    provOvertime: "Overtime or night shifts",
    remarks: "Notes",
    remarksEmployer: "Shift timings, certifications, site access or anything else we should know",
    remarksWorker: "Previous companies, special skills or when you can join",
    submitEmployer: "Send requirement",
    submitWorker: "Send application",
    sending: "Sending…",
    successTitle: "Received — thank you.",
    successEmployer: "The operations desk will contact you to confirm the crew and terms.",
    successWorker: "The team will contact you by phone or WhatsApp.",
    again: "Send another",
    error: "This could not be sent. Please check the details, or call or WhatsApp us.",
    required: "required",
    ph: {
      company: "e.g. Al Noor Contracting",
      contactPerson: "Full name",
      phone: "+971 5X XXX XXXX",
      email: "name@company.ae",
      projectSite: "e.g. Reem Island tower, Plot 12",
      otherTrade: "e.g. 6G welders",
      fullName: "Your full name",
      workerPhone: "+971… or +91…",
      applyingFor: "e.g. Shuttering carpenter",
    },
  },
  apply: {
    title: "Apply for this role",
    lead: "Share your details and the team will contact you by phone or WhatsApp.",
    submit: "Send application",
  },
  footer: {
    about:
      "Abu Dhabi building contractor licensed for All Kind Building Projects Contracting. Structural, civil, MEP and finishing works, and supervised site crews.",
    explore: "Explore",
    contact: "Contact",
    languages: "Languages",
    rights: "All rights reserved.",
  },
  suggest: {
    text: "This site is available in English.",
    action: "View in English",
    dismiss: "Dismiss",
  },
  mobileBar: { call: "Call", whatsapp: "WhatsApp", request: "Request crew" },
};

export type Copy = typeof en;

const ar: Copy = {
  meta: {
    title: "ساشا للمقاولات العامة | مقاول بناء وفرق عمل ماهرة في أبوظبي",
    description:
      "مقاول عام في أبوظبي مرخّص لمقاولات مشاريع المباني بجميع أنواعها. أعمال إنشائية ومدنية، وأعمال كهروميكانيكية وتشطيبات، وفرق عمل ماهرة للمقاولين والمطورين في الإمارات.",
  },
  skip: "انتقل إلى المحتوى",
  nav: {
    services: "الخدمات",
    process: "طريقة عملنا",
    roles: "الوظائف المتاحة",
    company: "الشركة",
    faq: "الأسئلة الشائعة",
    contact: "تواصل معنا",
  },
  ui: {
    menu: "القائمة",
    close: "إغلاق",
    language: "اللغة",
    themeDark: "الوضع الداكن",
    themeLight: "الوضع الفاتح",
    requestCrew: "اطلب فريق عمل",
    seeRoles: "الوظائف المتاحة",
    call: "اتصال",
    whatsapp: "واتساب",
    email: "البريد",
  },
  hero: {
    eyebrow: "أبوظبي · مقاولات المباني",
    title: "أعمال بناء وفرق عمل ماهرة لمشاريع أبوظبي.",
    lead:
      "تنفّذ ساشا للمقاولات العامة الأعمال الإنشائية والمدنية والكهروميكانيكية والتشطيبات، وتوفّر فنيين تحت إشراف ميداني للمقاولين والمطورين في الإمارات. كل اتفاق يُوثّق كتابياً.",
    recordTitle: "بيانات الشركة",
    record: [
      { k: "النشاط المرخّص", v: "مقاولات مشاريع المباني بجميع أنواعها" },
      { k: "مكان التسجيل", v: "أبوظبي، الإمارات العربية المتحدة" },
      { k: "الشكل القانوني", v: "ذ.م.م – ش.ش.و" },
      { k: "اللغات", v: "العربية · English · Hindi" },
    ],
    tradesLabel: "التخصصات التي نوفّرها",
    trades: ["نجارو القوالب", "حدادو التسليح", "بناؤو الطابوق", "كهربائيون", "سباكون", "فنيو السقالات", "رؤساء عمال"],
  },
  paths: {
    eyebrow: "اعمل معنا",
    title: "طريقان للتعاون، وفريق واحد مسؤول.",
    contractor: {
      label: "للمقاولين والمطورين",
      title: "تحتاج فريق عمل أو مقاولاً من الباطن؟",
      points: [
        "تخصصات من أعمال القوالب حتى التشطيبات، بحجم يناسب جدول مشروعك",
        "السكن والمواصلات ومعدات السلامة عند الطلب",
        "رؤساء عمال في الموقع لمتابعة التقدّم والسلامة يومياً",
      ],
      cta: "أرسل طلبك",
    },
    worker: {
      label: "لعمال المواقع",
      title: "تبحث عن عمل في البناء في أبوظبي؟",
      points: [
        "وظائف حالية مع ذكر الراتب بوضوح",
        "عقد مكتوب قبل البدء وفق أنظمة وزارة الموارد البشرية والتوطين",
        "لا رسوم توظيف إطلاقاً",
      ],
      cta: "الوظائف المتاحة",
    },
  },
  services: {
    eyebrow: "الخدمات",
    title: "ما نبنيه وما نوفّره",
    lead: "أربعة مجالات عمل ينفّذها مشرفونا وفنيونا مباشرة.",
    items: [
      {
        title: "الأعمال الإنشائية والمدنية",
        desc: "الأساسات والهياكل الخرسانية المسلّحة وأعمال الطابوق والتشطيبات الإنشائية.",
        tags: ["القوالب", "التسليح", "الخرسانة", "الطابوق"],
      },
      {
        title: "الأعمال الكهروميكانيكية والتشطيبات",
        desc: "تمديدات الكهرباء والسباكة واللياسة والبلاط والتشطيبات المعمارية حتى التسليم.",
        tags: ["الكهرباء", "السباكة", "اللياسة", "البلاط"],
      },
      {
        title: "توفير القوى العاملة",
        desc: "فنيون مهرة وشبه مهرة لمشاريع قصيرة أو طويلة المدى.",
        tags: ["نجارون", "حدادون", "بناؤون", "فنيو سقالات"],
      },
      {
        title: "المقاولات من الباطن وإدارة المواقع",
        desc: "إشراف ميداني وتقارير تقدّم يومية والتزام بمعايير السلامة في الأعمال التي نتولاها.",
        tags: ["الإشراف", "التقارير", "الصحة والسلامة"],
      },
    ],
  },
  process: {
    eyebrow: "طريقة عملنا",
    title: "من الطلب إلى فريق في الموقع",
    steps: [
      { title: "أرسل المتطلبات", desc: "التخصص والعدد وموقع المشروع وتاريخ البدء — عبر النموذج أو الهاتف أو واتساب." },
      { title: "نؤكّد كتابياً", desc: "نؤكّد الفريق والأسعار والتجهيزات والمدة قبل بدء أي عمل." },
      { title: "التجهيز والانتقال", desc: "تُرتّب الوثائق والمواصلات والسكن ومعدات السلامة كما اتُّفق." },
      { title: "الإشراف في الموقع", desc: "يتابع رؤساء العمال لدينا التقدّم والسلامة يومياً ويرفعون التقارير إليك." },
    ],
  },
  roles: {
    eyebrow: "الوظائف المتاحة",
    title: "الوظائف الحالية في المواقع",
    lead: "وظائف ينشرها مكتب العمليات في أبوظبي. يُؤكَّد الراتب والشروط في عقدك المكتوب.",
    empty: "لا توجد وظائف متاحة حالياً. تُنشر الوظائف الجديدة هنا مع بدء المشاريع — يُرجى المتابعة لاحقاً.",
    salary: "الراتب",
    experience: "الخبرة",
    location: "الموقع",
    type: "التخصص",
    requirements: "المتطلبات",
    apply: "قدّم الآن",
    askWhatsApp: "اسأل عبر واتساب",
    details: "تفاصيل الوظيفة",
    allTrades: "كل التخصصات",
    filterLabel: "تصفية الوظائف حسب التخصص",
    emptyFilterTitle: "لا توجد وظائف في هذا التخصص حالياً",
    emptyFilterText: "اختر تخصصاً آخر، أو أرسل بياناتك وسنتواصل معك.",
    openApp: "لم تجد تخصصك؟ أرسل بياناتك وسنتواصل معك عند توفّر وظيفة مناسبة.",
    openAppLink: "أرسل بياناتك",
    count: (n: number) => (n === 1 ? "وظيفة واحدة متاحة" : n === 2 ? "وظيفتان متاحتان" : `${n} وظائف متاحة`),
    back: "كل الوظائف المتاحة",
    closed: "هذه الوظيفة لم تعد متاحة. اطّلع على الوظائف الحالية.",
    posted: "تاريخ النشر",
    askText: (title: string) => `مرحباً ساشا، لدي سؤال عن وظيفة ${title}.`,
  },
  protect: {
    title: "لا تدفع مقابل عرض عمل.",
    text:
      "لا تتقاضى ساشا للمقاولات العامة أي رسوم توظيف أو تأشيرة من العمال، والقانون الإماراتي يمنع ذلك. إذا طلب منك أحد مالاً باسمنا فلا تدفع، واتصل بنا أو راسلنا عبر واتساب للتحقق.",
  },
  company: {
    eyebrow: "الشركة",
    title: "مقاول في أبوظبي يقوم على التنفيذ الميداني",
    p1:
      "تنسّق ساشا للمقاولات العامة فرقاً من الفنيين ذوي الخبرة ومشرفي المواقع والكوادر الفنية في مشاريع البناء بإمارة أبوظبي، للحفاظ على الجداول الزمنية والالتزام بكودات البناء الإماراتية.",
    p2:
      "نعمل إلى جانب المطورين والمقاولين الرئيسيين، من أعمال الحفر والقوالب إلى الطابوق واللياسة والتركيبات الكهروميكانيكية.",
    noticeTitle: "العقود والالتزام",
    notice:
      "تتم جميع اتفاقيات التوظيف والمشاريع بوثائق مكتوبة وفق أنظمة وزارة الموارد البشرية والتوطين في دولة الإمارات.",
    leadersTitle: "الإدارة",
    leaders: [
      {
        name: "محمد نوشاد",
        role: "المدير العام",
        image: "/mohammad-naushad.jpg",
        bio: "يقود إدارة الشركة والتعاقدات التجارية والالتزام التنظيمي والشراكات في دولة الإمارات.",
      },
      {
        name: "أمجد علي",
        role: "مدير العمليات في الهند وتجهيز القوى العاملة",
        image: "/amzad-ali.jpg",
        bio: "يدير عمليات ساشا في الهند: الاختبارات المهنية وفرز المرشحين والتحقق من الوثائق وإرسال فرق جاهزة إلى مواقع الإمارات في مواعيدها.",
      },
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "أسئلة تصلنا كثيراً",
    groups: [
      { title: "التعامل مع ساشا", desc: "للمقاولين والمطورين ولكل من يريد التعرّف علينا.", items: [0, 1, 2, 3, 4] },
      { title: "لعمال المواقع", desc: "التقديم على الوظائف والحماية من عروض العمل المزيفة.", items: [5, 6] },
    ],
    items: [
      {
        q: "ما الذي تقدّمه ساشا للمقاولات العامة؟",
        a: "ساشا للمقاولات العامة مقاول بناء في أبوظبي مرخّص لمقاولات مشاريع المباني بجميع أنواعها. تنفّذ الأعمال الإنشائية والمدنية والكهروميكانيكية والتشطيبات، وتوفّر فرق عمل تحت إشراف ميداني للمقاولين والمطورين.",
      },
      {
        q: "أين تعمل ساشا للمقاولات العامة؟",
        a: "الشركة مسجّلة في أبوظبي وتعمل أساساً في إمارة أبوظبي، بما في ذلك السعديات وياس والريم ومصفح والعين والظفرة. ويمكن دراسة الطلبات في دبي والشارقة والإمارات الشمالية.",
      },
      {
        q: "ما التخصصات التي يمكنكم توفيرها؟",
        a: "نجارو القوالب، وحدادو التسليح، وبناؤو الطابوق والتشطيبات، والكهربائيون، والسباكون وفنيو الأنابيب، وفنيو السقالات، والعمال المساعدون وفنيو الرفع، ورؤساء العمال ومشرفو المواقع. ويمكن تشكيل فرق متعددة التخصصات.",
      },
      {
        q: "كيف أطلب عمالاً لمشروعي؟",
        a: "أرسل التخصص والعدد وموقع المشروع وتاريخ البدء عبر نموذج الطلب في هذه الصفحة، أو اتصل بمكتب العمليات أو راسله عبر واتساب. يُؤكَّد الفريق والأسعار والشروط كتابياً قبل الانتقال إلى الموقع.",
      },
      {
        q: "هل توفّرون السكن والمواصلات ومعدات السلامة؟",
        a: "نعم، عند الطلب. يمكن تضمين السكن والمواصلات إلى الموقع ومعدات السلامة القياسية، وتُثبَّت ضمن الاتفاق المكتوب لكل طلب.",
      },
      {
        q: "كيف أتقدّم لوظيفة في البناء لدى ساشا؟",
        a: "اختر وظيفة من قسم الوظائف المتاحة واضغط «قدّم الآن»، أو أرسل بياناتك عبر نموذج العمال. سيتواصل معك الفريق هاتفياً أو عبر واتساب، ويُؤكَّد الراتب والشروط في عقد مكتوب وفق أنظمة وزارة الموارد البشرية والتوطين.",
      },
      {
        q: "هل يجب أن أدفع رسوماً للحصول على عمل؟",
        a: "لا. لا تتقاضى ساشا للمقاولات العامة أي رسوم توظيف أو تأشيرة من العمال. إذا طلب منك أحد مالاً باسم الشركة فلا تدفع وتواصل مع الشركة مباشرة.",
      },
    ],
  },
  cta: {
    eyebrow: "ابدأ مشروعك",
    title: "لديك مشروع يبدأ قريباً في أبوظبي؟",
    desc: "أخبرنا بالتخصصات والعدد وتاريخ البدء. نؤكّد الفريق والشروط كتابياً قبل أي انتقال إلى الموقع.",
    primary: "اطلب فريق عمل",
    secondary: "راسلنا عبر واتساب",
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "تحدّث مع مكتب العمليات",
    lead: "أرسل طلبك أو طلب التوظيف أدناه، أو تواصل معنا مباشرة.",
    callLabel: "اتصال",
    whatsappLabel: "واتساب",
    emailLabel: "البريد الإلكتروني",
    officeLabel: "المكتب",
    office: "أبوظبي، الإمارات العربية المتحدة",
  },
  form: {
    tabsLabel: "اختر النموذج",
    tabEmployer: "أحتاج عمالاً",
    tabWorker: "أبحث عن عمل",
    employerTitle: "طلب قوى عاملة أو مقاولة من الباطن",
    employerLead: "كلما زادت التفاصيل، أسرعنا في تأكيد الفريق.",
    workerTitle: "طلب توظيف",
    workerLead: "سنتواصل معك هاتفياً أو عبر واتساب بشأن الوظائف المناسبة.",
    sec: {
      contact: "بياناتك",
      site: "المشروع والموقع",
      crew: "الفريق المطلوب",
      provisions: "التجهيزات",
      notes: "ملاحظات أخرى",
      candidate: "بياناتك",
      availability: "الخبرة والجاهزية",
    },
    company: "اسم الشركة",
    contactPerson: "الشخص المسؤول",
    fullName: "الاسم الكامل",
    phone: "الجوال / واتساب (مع رمز الدولة)",
    email: "البريد الإلكتروني",
    optional: "اختياري",
    projectSite: "اسم المشروع أو الموقع",
    location: "الموقع",
    trade: "التخصص",
    otherTrade: "حدّد التخصص",
    workersCount: "عدد العمال",
    experience: "مستوى الخبرة",
    mobilisation: "موعد البدء",
    duration: "المدة",
    applyingFor: "التخصص أو الوظيفة",
    yearsExperience: "الخبرة في المواقع",
    currentLocation: "أين أنت الآن؟",
    visa: "حالة التأشيرة",
    provAccom: "السكن على ساشا",
    provTransport: "المواصلات إلى الموقع على ساشا",
    provPPE: "معدات السلامة القياسية مطلوبة",
    provOvertime: "عمل إضافي أو مناوبات ليلية",
    remarks: "ملاحظات",
    remarksEmployer: "مواعيد الدوام أو الشهادات أو تصاريح الدخول أو أي تفاصيل أخرى",
    remarksWorker: "الشركات السابقة أو المهارات الخاصة أو موعد الالتحاق",
    submitEmployer: "إرسال الطلب",
    submitWorker: "إرسال طلب التوظيف",
    sending: "جارٍ الإرسال…",
    successTitle: "تم الاستلام — شكراً لك.",
    successEmployer: "سيتواصل معك مكتب العمليات لتأكيد الفريق والشروط.",
    successWorker: "سيتواصل معك الفريق هاتفياً أو عبر واتساب.",
    again: "إرسال طلب آخر",
    error: "تعذّر الإرسال. يُرجى مراجعة البيانات أو الاتصال بنا أو مراسلتنا عبر واتساب.",
    required: "مطلوب",
    ph: {
      company: "مثال: النور للمقاولات",
      contactPerson: "الاسم الكامل",
      phone: "+971 5X XXX XXXX",
      email: "name@company.ae",
      projectSite: "مثال: برج في جزيرة الريم، قطعة ١٢",
      otherTrade: "مثال: لحّامون 6G",
      fullName: "اسمك الكامل",
      workerPhone: "+971… أو +91…",
      applyingFor: "مثال: نجار قوالب",
    },
  },
  apply: {
    title: "التقديم على هذه الوظيفة",
    lead: "أرسل بياناتك وسيتواصل معك الفريق هاتفياً أو عبر واتساب.",
    submit: "إرسال طلب التوظيف",
  },
  footer: {
    about:
      "مقاول بناء في أبوظبي مرخّص لمقاولات مشاريع المباني بجميع أنواعها. أعمال إنشائية ومدنية وكهروميكانيكية وتشطيبات، وفرق عمل تحت إشراف ميداني.",
    explore: "روابط",
    contact: "التواصل",
    languages: "اللغات",
    rights: "جميع الحقوق محفوظة.",
  },
  suggest: {
    text: "هذا الموقع متوفّر باللغة العربية.",
    action: "عرض بالعربية",
    dismiss: "إغلاق",
  },
  mobileBar: { call: "اتصال", whatsapp: "واتساب", request: "اطلب فريقاً" },
};

const hi: Copy = {
  meta: {
    title: "SASHA General Contracting | Abu Dhabi mein construction kaam aur site jobs",
    description:
      "Abu Dhabi ki licensed building contracting company. Structural, MEP aur finishing kaam, skilled site crew, aur workers ke liye jobs — bina kisi fees ke.",
  },
  skip: "Content par jaayein",
  nav: {
    services: "Services",
    process: "Kaam ka tareeka",
    roles: "Open jobs",
    company: "Company",
    faq: "Sawaal-Jawab",
    contact: "Contact",
  },
  ui: {
    menu: "Menu",
    close: "Band karein",
    language: "Bhasha",
    themeDark: "Dark theme",
    themeLight: "Light theme",
    requestCrew: "Crew mangwayein",
    seeRoles: "Open jobs dekhein",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  hero: {
    eyebrow: "Abu Dhabi · Building contracting",
    title: "Abu Dhabi projects ke liye building kaam aur skilled site crew.",
    lead:
      "SASHA General Contracting structural, civil, MEP aur finishing ka kaam karti hai, aur UAE ke contractors aur developers ko supervisor ke saath trained karigar deti hai. Har kaam written agreement par hota hai.",
    recordTitle: "Company details",
    record: [
      { k: "Licence ka kaam", v: "All Kind Building Projects Contracting" },
      { k: "Registered", v: "Abu Dhabi, United Arab Emirates" },
      { k: "Legal form", v: "L.L.C – S.P.C" },
      { k: "Bhasha", v: "Hindi · English · العربية" },
    ],
    tradesLabel: "Hum ye trades dete hain",
    trades: ["Shuttering carpenter", "Steel fixer", "Block mason", "Electrician", "Plumber", "Scaffolder", "Foreman"],
  },
  paths: {
    eyebrow: "Hamare saath kaam",
    title: "Do raaste. Ek zimmedaar team.",
    contractor: {
      label: "Contractors aur developers ke liye",
      title: "Crew ya subcontractor chahiye?",
      points: [
        "Formwork se finishing tak ke trades, aapke programme ke hisaab se",
        "Request par accommodation, transport aur PPE",
        "Site par foreman — roz ka progress aur safety",
      ],
      cta: "Requirement bhejein",
    },
    worker: {
      label: "Site workers ke liye",
      title: "Abu Dhabi mein construction ka kaam dhoondh rahe hain?",
      points: [
        "Abhi ki jobs, salary pehle se saaf likhi hui",
        "Kaam shuru hone se pehle written contract, UAE MOHRE niyam ke hisaab se",
        "Koi recruitment fees nahi — kabhi bhi nahi",
      ],
      cta: "Open jobs dekhein",
    },
  },
  services: {
    eyebrow: "Services",
    title: "Hum kya banate aur dete hain",
    lead: "Chaar tarah ka kaam, hamare apne supervisors aur karigaron dwara.",
    items: [
      {
        title: "Structural & civil kaam",
        desc: "Foundation, RCC concrete frame, blockwork aur structural finishing.",
        tags: ["Formwork", "Sariya", "Concrete", "Blockwork"],
      },
      {
        title: "MEP & finishing",
        desc: "Electrical aur plumbing lines, plaster, tiles aur handover tak ki finishing.",
        tags: ["Electrical", "Plumbing", "Plaster", "Tiles"],
      },
      {
        title: "Workforce mobilisation",
        desc: "Chhote ya lambe projects ke liye skilled aur semi-skilled karigar.",
        tags: ["Carpenter", "Steel fixer", "Mason", "Scaffolder"],
      },
      {
        title: "Subcontract & site management",
        desc: "Site supervision, roz ki progress report aur safety ka poora dhyaan.",
        tags: ["Supervision", "Reporting", "HSE"],
      },
    ],
  },
  process: {
    eyebrow: "Kaam ka tareeka",
    title: "Requirement se site tak",
    steps: [
      { title: "Requirement bhejein", desc: "Trade, kitne log, site location aur start date — form, call ya WhatsApp se." },
      { title: "Written confirmation", desc: "Kaam shuru hone se pehle crew, rate, provisions aur duration likhit mein." },
      { title: "Mobilisation", desc: "Documents, transport, accommodation aur PPE — jaisa tay hua." },
      { title: "Site supervision", desc: "Hamare foreman roz progress aur safety sambhalte hain aur report dete hain." },
    ],
  },
  roles: {
    eyebrow: "Open jobs",
    title: "Abhi ki site jobs",
    lead: "Abu Dhabi operations desk dwara post ki gayi jobs. Salary aur shartein aapke written contract mein confirm hoti hain.",
    empty: "Abhi koi job open nahi hai. Naye projects ke saath nayi jobs yahan post hoti hain — thodi der baad dobara dekhein.",
    salary: "Salary",
    experience: "Experience",
    location: "Location",
    type: "Trade",
    requirements: "Zaroori baatein",
    apply: "Apply karein",
    askWhatsApp: "WhatsApp par poochein",
    details: "Job details",
    allTrades: "Saare trades",
    filterLabel: "Trade ke hisaab se jobs dekhein",
    emptyFilterTitle: "Is trade mein abhi koi job nahi",
    emptyFilterText: "Doosra trade chunein, ya apni details bhejein — hum sampark karenge.",
    openApp: "Apna trade nahi dikha? Details bhejein, sahi job aate hi hum aapko contact karenge.",
    openAppLink: "Details bhejein",
    count: (n: number) => (n === 1 ? "1 job open hai" : `${n} jobs open hain`),
    back: "Saari open jobs",
    closed: "Ye job ab band ho chuki hai. Abhi ki open jobs dekhein.",
    posted: "Post ki gayi",
    askText: (title: string) => `Namaste SASHA GC, mujhe ${title} job ke baare mein poochna hai.`,
  },
  protect: {
    title: "Job ke liye kabhi paise na dein.",
    text:
      "SASHA General Contracting workers se koi recruitment ya visa fees nahi leti, aur UAE kanoon bhi iski ijazat nahi deta. Agar koi hamare naam par paise maange to bilkul na dein — hamein call ya WhatsApp karke check karein.",
  },
  company: {
    eyebrow: "Company",
    title: "Abu Dhabi ki contracting company, site ke kaam par focus",
    p1:
      "SASHA General Contracting Abu Dhabi ke building projects par tajurbekaar karigar, site supervisors aur technical staff ko coordinate karti hai, taaki kaam time par aur UAE building codes ke hisaab se ho.",
    p2:
      "Hum developers aur main contractors ke saath kaam karte hain — excavation aur formwork se lekar blockwork, plaster aur MEP installation tak.",
    noticeTitle: "Contract aur niyam",
    notice:
      "Saari recruitment aur project agreements UAE Ministry of Human Resources and Emiratisation (MOHRE) ke niyam ke hisaab se likhit documents par hoti hain.",
    leadersTitle: "Leadership",
    leaders: [
      {
        name: "Mohammad Naushad",
        role: "Managing Director",
        image: "/mohammad-naushad.jpg",
        bio: "Company ka management, commercial contracts, UAE regulations aur partnerships sambhalte hain.",
      },
      {
        name: "Amzad Ali",
        role: "Director – Indian Operations & Manpower Mobilization",
        image: "/amzad-ali.jpg",
        bio: "India operations ke head: trade test, worker screening, document verification aur UAE sites par time se trained crew bhejna.",
      },
    ],
  },
  faq: {
    eyebrow: "Sawaal-Jawab",
    title: "Aksar puchhe jaane wale sawaal",
    groups: [
      { title: "SASHA ke saath kaam", desc: "Contractors, developers aur company ke baare mein jaanne walon ke liye.", items: [0, 1, 2, 3, 4] },
      { title: "Site workers ke liye", desc: "Job ke liye apply karna, aur fake job offers se bachna.", items: [5, 6] },
    ],
    items: [
      {
        q: "SASHA General Contracting kya kaam karti hai?",
        a: "SASHA General Contracting Abu Dhabi ki building contracting company hai, jiske paas All Kind Building Projects Contracting ka licence hai. Ye structural, civil, MEP aur finishing ka kaam karti hai, aur contractors ko supervisor ke saath site crew deti hai.",
      },
      {
        q: "Company kahan kaam karti hai?",
        a: "Company Abu Dhabi mein registered hai aur zyada tar Abu Dhabi Emirate mein kaam karti hai — Saadiyat, Yas, Reem, Mussafah, Al Ain aur Al Dhafra. Dubai, Sharjah aur Northern Emirates ki requirement bhi dekhi jaati hai.",
      },
      {
        q: "Kaun kaun se trades milte hain?",
        a: "Shuttering carpenter, steel fixer, block aur finishing mason, electrician, plumber aur pipe fitter, scaffolder, helper aur rigger, aur foreman ya site supervisor. Zaroorat ho to multi-trade crew bhi banti hai.",
      },
      {
        q: "Apne project ke liye workers kaise mangwayein?",
        a: "Is page ke requirement form mein trade, kitne log, site location aur start date bhejein, ya operations desk ko call ya WhatsApp karein. Crew, rate aur shartein mobilisation se pehle likhit mein confirm hoti hain.",
      },
      {
        q: "Kya accommodation, transport aur PPE milta hai?",
        a: "Haan, request par. Accommodation, site transport aur standard PPE shamil kiye ja sakte hain, aur har requirement ke written agreement mein likhe jaate hain.",
      },
      {
        q: "SASHA mein construction job ke liye apply kaise karein?",
        a: "Open jobs mein se koi job chunein aur Apply dabayein, ya worker form se apni details bhejein. Team aapko call ya WhatsApp karegi. Salary aur shartein UAE MOHRE niyam ke hisaab se written contract mein confirm hoti hain.",
      },
      {
        q: "Kya job ke liye koi fees deni padti hai?",
        a: "Nahi. SASHA General Contracting workers se koi recruitment ya visa fees nahi leti. Agar koi company ke naam par paise maange to na dein aur seedha company se baat karein.",
      },
    ],
  },
  cta: {
    eyebrow: "Project shuru karein",
    title: "Abu Dhabi mein project shuru ho raha hai?",
    desc: "Trade, kitne log aur start date batayein. Mobilisation se pehle crew aur shartein likhit mein confirm hoti hain.",
    primary: "Crew mangwayein",
    secondary: "WhatsApp karein",
  },
  contact: {
    eyebrow: "Contact",
    title: "Operations desk se baat karein",
    lead: "Neeche requirement ya application bhejein, ya seedha humse sampark karein.",
    callLabel: "Call",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    officeLabel: "Office",
    office: "Abu Dhabi, United Arab Emirates",
  },
  form: {
    tabsLabel: "Form chunein",
    tabEmployer: "Mujhe workers chahiye",
    tabWorker: "Mujhe job chahiye",
    employerTitle: "Manpower aur subcontract requirement",
    employerLead: "Jitni zyada details denge, utni jaldi crew confirm hogi.",
    workerTitle: "Job application",
    workerLead: "Sahi job ke liye team aapko call ya WhatsApp karegi.",
    sec: {
      contact: "Aapki details",
      site: "Project aur site",
      crew: "Kaisi crew chahiye",
      provisions: "Suvidhayein",
      notes: "Aur kuch",
      candidate: "Aapki details",
      availability: "Experience aur availability",
    },
    company: "Company ka naam",
    contactPerson: "Contact person",
    fullName: "Poora naam",
    phone: "Mobile / WhatsApp (country code ke saath)",
    email: "Email",
    optional: "optional",
    projectSite: "Project ya site ka naam",
    location: "Location",
    trade: "Trade",
    otherTrade: "Trade likhein",
    workersCount: "Kitne workers",
    experience: "Experience level",
    mobilisation: "Kab chahiye",
    duration: "Kitne samay ke liye",
    applyingFor: "Trade ya position",
    yearsExperience: "Site experience",
    currentLocation: "Abhi aap kahan hain?",
    visa: "Visa status",
    provAccom: "Accommodation SASHA dega",
    provTransport: "Site transport SASHA dega",
    provPPE: "Standard PPE chahiye",
    provOvertime: "Overtime ya night shift",
    remarks: "Notes",
    remarksEmployer: "Shift timing, certificates, site pass ya koi aur zaroori baat",
    remarksWorker: "Pichhli company, khaas skill ya kab join kar sakte hain",
    submitEmployer: "Requirement bhejein",
    submitWorker: "Application bhejein",
    sending: "Bhej rahe hain…",
    successTitle: "Mil gaya — shukriya.",
    successEmployer: "Operations desk crew aur shartein confirm karne ke liye aapse sampark karega.",
    successWorker: "Team aapko call ya WhatsApp karegi.",
    again: "Ek aur bhejein",
    error: "Bheja nahi ja saka. Details check karein, ya hamein call ya WhatsApp karein.",
    required: "zaroori",
    ph: {
      company: "jaise: Al Noor Contracting",
      contactPerson: "Poora naam",
      phone: "+971 5X XXX XXXX",
      email: "name@company.ae",
      projectSite: "jaise: Reem Island tower, Plot 12",
      otherTrade: "jaise: 6G welder",
      fullName: "Aapka poora naam",
      workerPhone: "+971… ya +91…",
      applyingFor: "jaise: Shuttering carpenter",
    },
  },
  apply: {
    title: "Is job ke liye apply karein",
    lead: "Apni details bhejein, team aapko call ya WhatsApp karegi.",
    submit: "Application bhejein",
  },
  footer: {
    about:
      "Abu Dhabi ki building contracting company — All Kind Building Projects Contracting licence. Structural, civil, MEP aur finishing kaam, aur supervisor ke saath site crew.",
    explore: "Links",
    contact: "Contact",
    languages: "Bhasha",
    rights: "All rights reserved.",
  },
  suggest: {
    text: "Ye website Hinglish mein bhi hai.",
    action: "Hinglish mein dekhein",
    dismiss: "Band karein",
  },
  mobileBar: { call: "Call", whatsapp: "WhatsApp", request: "Crew mangwayein" },
};

export const COPY: Record<Lang, Copy> = { en, ar, hi };

export function langHref(path: string, lang: Lang): string {
  return `${path}?lang=${lang}`;
}

/** Canonical URL path for a language: English lives at the bare path. */
export function canonicalPath(path: string, lang: Lang): string {
  return lang === "en" ? path : `${path}?lang=${lang}`;
}
