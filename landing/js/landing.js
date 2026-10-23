/**
 * Kuba Tours - Luxury Landing Page Script
 * Bilingual System (Arabic / English) + Interactive UI
 */

const translations = {
  ar: {
    // Nav
    brandName: "كوبا تورز",
    brandTagline: "ذكريات ذهبية",
    navHome: "الرئيسية",
    navExperiences: "اليخوت والتجارب",
    navStays: "الإقامات الفاخرة",
    navDestinations: "الوجهات",
    navApp: "عن التطبيق",
    navReviews: "آراء النزلاء",
    navFaq: "الأسئلة الشائعة",
    navDownload: "حمّل التطبيق",
    navLangSwitch: "English",

    // Hero
    heroBadge: "المنصة الرائدة لتجارب وسياحة البحر الأحمر ومصر",
    heroTitlePrefix: "عِش سحر مصر بأرقى",
    heroTitleHighlight: "تجارب الفخامة والخصوصية",
    heroDesc: "من مياه سهل حشيش الفيروزية إلى أفخم الفلل الشاطئية ورحلات اليخوت الخاصة، يمنحك تطبيق كوبا رحلات استثنائية مصممة خصيصاً لأصحاب الذوق الرفيع وبأعلى معايير الخصوصية.",
    heroCtaExplore: "استكشف التجارب الحصرية",
    heroCtaDownload: "تحميل التطبيق الآن",
    heroTrustedBy: "اختيار أكثر من 15,000 سائح من جميع أنحاء العالم",

    // Search Widget
    searchDestLabel: "الوجهة السياحية",
    searchDestPlaceholder: "سهل حشيش، الجونة، الغردقة...",
    searchExpLabel: "نوع التجربة",
    searchExpOption1: "يخوت خاصة ورحلات بحرية",
    searchExpOption2: "فلل وشاليهات شاطئية",
    searchExpOption3: "أجنحة ومنتجعات 5 نجوم",
    searchExpOption4: "خدمة كونسيرج وتنقل VIP",
    searchDateLabel: "تاريخ الوصول",
    searchBtn: "بحث واستكشاف",

    // Quick Stats
    stat1Number: "500+",
    stat1Label: "وحدة وفيلا فاخرة",
    stat2Number: "120+",
    stat2Label: "يخت وقارب VIP مرخّص",
    stat3Number: "15,000+",
    stat3Label: "ضيف سعيد ومستمتع",
    stat4Number: "99.8%",
    stat4Label: "تقييم الرضا والأمان",

    // Featured Stories (Images 1-5)
    storiesTag: "ألبوم التجارب الاستثنائية",
    storiesTitle: "لحظات صُنعت لتخلد في الذاكرة",
    storiesSubtitle: "شاهد كيف تبدو الحياة مع كوبا.. من شواطئ سهل حشيش إلى أعالي البحار في اليخوت الخاصة",
    filterAll: "جميع التجارب",
    filterYachts: "رحلات اليخوت",
    filterStays: "الفلل والشاليهات",
    filterSahlHasheesh: "سهل حشيش",
    filterPrivate: "خصوصية VIP",
    zoomImage: "تكبير الصورة",

    // Card 1
    card1Badge: "سهل حشيش • صيف استثنائي",
    card1Title: "كوبا هتخلي صيفك أحلى في سهل حشيش",
    card1Desc: "انتعاش الصيف وأجمل الأوقات العائلية والأصدقاء على شواطئ البحر الأحمر الساحرة مع كافة وسائل الراحة والرفاهية المطلقة.",
    card1Feat1: "شاطئ خاص",
    card1Feat2: "فلل وشاليهات فاخرة",
    card1Feat3: "يخت ورحلات بحرية",
    card1Feat4: "أمان وخصوصية تامة",

    // Card 2
    card2Badge: "غروب ساحر • أمسيات لا تُنسى",
    card2Title: "أمسية من وحي الخيال وسط أمواج البحر الأحمر",
    card2Desc: "استمتع بمشروبك المفضل مع طبق فواكه استوائي على متن يخت فاخر في اللحظة التي تلتقي فيها الشمس بسلاسل جبال البحر الأحمر.",
    card2Feat1: "إطلالة بانورامية للغروب",
    card2Feat2: "أجواء موسيقية هادئة",
    card2Feat3: "ضيافة ومأكولات فاخرة",
    card2Feat4: "طاقم بحري محترف",

    // Card 3
    card3Badge: "شمس الشتاء • دفء البحر الأحمر",
    card3Title: "شتاء أدفأ وأجمل هنا في سهل حشيش",
    card3Desc: "اهرب من برد الشتاء إلى المياه الفيروزية والشمس المشرقة طوال العام، مع أحدث يخوت الميجا يخت والإقامات الساحلية المترفة.",
    card3Feat1: "طقس مشمس على مدار العام",
    card3Feat2: "يخوت بحرية حديثة",
    card3Feat3: "إقامات شاطئية دافئة",
    card3Feat4: "رحلات جزر بحرية وغوص",

    // Card 4
    card4Badge: "إطلالة مباشرة على البحر",
    card4Title: "على ضفاف الفخامة والسكينة المطلقة",
    card4Desc: "استيقظ كل صباح على صوت الأمواج وتأمل مشهد البحر من شرفة فيلتك الخاصة المطلة على المياه الفيروزية واليخوت الراسية.",
    card4Feat1: "واجهة بحرية خاصة",
    card4Feat2: "مسابح خاصة وإنفينيتي",
    card4Feat3: "تصميم معماري راقٍ",
    card4Feat4: "خدمة كونسيرج 24/7",

    // Card 5
    card5Badge: "خصوصية مطلقة • VIP",
    card5Title: "الهروب المثالي.. بخصوصية استثنائية لك وحدك",
    card5Desc: "رحلات بحرية خاصة ومغلقة بالكامل مصممة للعائلات وكبار الشخصيات لضمان أقصى درجات الراحة والانعزال عن صخب العالم.",
    card5Feat1: "يخت خاص بالكامل لك ولعائلتك",
    card5Feat2: "مسارات بحرية مخصصة",
    card5Feat3: "شيف خاص حسب الطلب",
    card5Feat4: "سرية تامة وراحة بال",

    // Pillars / Why Kuba
    whyTag: "لماذا يختارنا السياح؟",
    whyTitle: "معايير عالمية وضيافة مصرية أصيلة",
    whySubtitle: "نهتم بأدق التفاصيل لنضمن لك إجازة لا تشوبها شائبة",
    pillar1Title: "وحدات ويخوت موثقة 100%",
    pillar1Desc: "فريقنا يعاين كل وحدة ويخت شخصياً للتأكد من مطابقتها لأعلى معايير النظافة والرفاهية والسلامة.",
    pillar2Title: "حجز فوري وشفافية كاملة",
    pillar2Desc: "لا رسوم خفية أو مفاجآت. أسعار واضحة بعملات متعددة وحجز مؤكد فوري في ثوانٍ معدودة.",
    pillar3Title: "خدمة كونسيرج ومرافقة VIP",
    pillar3Desc: "فريق مخصص لمساعدتك على مدار الساعة، من استقبال المطار وتأجير سيارات الجولف وحتى ترتيب المفاجآت الخاصة.",
    pillar4Title: "أمان وخصوصية لا مساومة عليها",
    pillar4Desc: "نوفر لك خيارات حصرية تناسب العائلات التي تبحث عن الخصوصية التامة وشواطئ ومسابح غير مكشوفة.",

    // Destinations
    destTag: "أفضل الوجهات",
    destTitle: "استكشف أروع سواحل مصر",
    destSubtitle: "مواقع ساحرة تم انتقاؤها لتوفر لك تجربة لا تُنسى",
    dest1Name: "سهل حشيش",
    dest1Desc: "عاصمة الرفاهية والهدوء وشواطئ الرمال البيضاء",
    dest2Name: "الجونة",
    dest2Desc: "مدينة البحيرات والأنشطة البحرية والحياة العصرية",
    dest3Name: "الساحل الشمالي",
    dest3Desc: "مياه البحر المتوسط التركوازية وأرقى القرى السياحية",
    dest4Name: "شرم الشيخ ودهب",
    dest4Desc: "سحر الغوص والشعاب المرجانية والأجواء الطبيعية الخلابة",

    // App Showcase
    appShowcaseTag: "تطبيق كوبا للهواتف",
    appShowcaseTitle: "عالم من الفخامة بين يديك",
    appShowcaseDesc: "صُمم تطبيق كوبا ليمنحك تجربة حجز سلسة وذكية. تصفح بالصور عالية الدقة، قارن الأسعار، وتواصل مباشرة مع أصحاب الوحدات وقادة اليخوت.",
    appFeat1: "تصفية ذكية حسب الموقع والمميزات والميزانية",
    appFeat2: "تقويم تفاعلي وتأكيد الحجز في ثوانٍ",
    appFeat3: "محادثة فورية مع قبطان اليخت أو المضيف",
    appFeat4: "دفع آمن بالبطاقات الائتمانية والعملات المتعددة",

    // Reviews
    reviewsTag: "تجارب حقيقية",
    reviewsTitle: "ماذا يقول ضيوفنا وسياحنا؟",
    review1Text: "رحلة اليخت في سهل حشيش عبر تطبيق كوبا كانت خيالية! طاقم محترف وخدمة 5 نجوم وخصوصية تامة لعائلتي. بالتأكيد سأكرر التجربة.",
    review1Author: "د. طارق المنصوري",
    review1Location: "الرياض، المملكة العربية السعودية",
    review2Text: "The villa in Sahl Hasheesh was absolutely stunning. Booking through Kuba was seamless and the 24/7 concierge made our vacation unforgettable!",
    review2Author: "Sophie & Liam Miller",
    review2Location: "لندن، المملكة المتحدة",
    review3Text: "من أفضل التطبيقات السياحية في مصر. الوضوح والمصداقية ونظافة الشاليه فاقت توقعاتنا بكثير. شكراً لفريق كوبا على الاهتمام.",
    review3Author: "م. كريم عبد الرحمن",
    review3Location: "القاهرة، مصر",

    // Download Section
    downloadTag: "ابدأ رحلتك الآن",
    downloadTitle: "حمّل تطبيق كوبا واستمتع بأروع إجازة",
    downloadSubtitle: "التطبيق متاح الآن مجاناً على متجري أبل ستور وجوجل بلاي. اختر وجهتك القادمة واحجز يختك أو إقامتك الفاخرة بلمسة واحدة.",
    downloadQrText: "امسح الرمز بكاميرا هاتفك للتحميل الفوري",
    downloadAppleBadgeAlt: "تحميل من متجر آب ستور",
    downloadGoogleBadgeAlt: "تحميل من متجر جوجل بلاي",
    downloadNote: "يدعم نظامي iOS 14+ و Android 8.0+",

    // FAQ
    faqTag: "الأسئلة المتكررة",
    faqTitle: "كل ما تريد معرفته عن كوبا",
    faq1Q: "كيف يمكنني حجز يخت خاص أو فيلا عبر كوبا؟",
    faq1A: "يمكنك ببساطة تحميل التطبيق أو تصفح الوحدات، اختيار التواريخ وعدد الضيوف، وإتمام الحجز في خطوات بسيطة مع تأكيد فوري.",
    faq2Q: "هل الرحلات البحرية تشمل طاقماً مرخصاً وضيافة؟",
    faq2A: "نعم، جميع يخوتنا مجهزة بقباطنة وطواقم بحرية مرخصة مع كافة وسائل الأمان، وتتوفر خيارات المأكولات والمشروبات والأنشطة المائية حسب رغبتك.",
    faq3Q: "هل يوفر كوبا خصوصية للعائلات والمجموعات الخاصة؟",
    faq3A: "بالتأكيد، الخصوصية هي جوهر خدماتنا. الفلل واليخوت الخاصة توفر عزلة تامة وراحة مطلقة دون أي تطفل.",
    faq4Q: "ما هي العملات وطرق الدفع المتاحة؟",
    faq4A: "يدعم التطبيق الدفع بالجنيه المصري والدولار واليورو والريال السعودي، عبر جميع البطاقات الائتمانية وبوابات الدفع الإلكترونية الآمنة.",

    // Footer
    footerDesc: "كوبا تورز — بوابتك السياحية الفاخرة لتجارب لا تُنسى في البحر الأحمر وأرقى سواحل مصر. فلل شاطئية، شاليهات ديلوكس، ويخوت خاصة مصممة لراحتك.",
    footerLinksTitle: "روابط سريعة",
    footerContactTitle: "تواصل معنا",
    footerDestTitle: "الوجهات الشهيرة",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "الشروط والأحكام",
    footerRights: "جميع الحقوق محفوظة © كوبا تورز (Kuba Tours) 2026",
    footerCall: "خدمة العملاء: متاحون 24/7",
    footerLocation: "سهل حشيش • الغردقة • البحر الأحمر، مصر"
  },

  en: {
    // Nav
    brandName: "Kuba Tours",
    brandTagline: "Golden Memories",
    navHome: "Home",
    navExperiences: "Yachts & Experiences",
    navStays: "Luxury Stays",
    navDestinations: "Destinations",
    navApp: "About App",
    navReviews: "Reviews",
    navFaq: "FAQ",
    navDownload: "Download App",
    navLangSwitch: "العربية",

    // Hero
    heroBadge: "The Premier Red Sea & Egypt Luxury Travel Platform",
    heroTitlePrefix: "Experience Egypt Through",
    heroTitleHighlight: "Unrivaled Luxury & Privacy",
    heroDesc: "From the crystal-clear waters of Sahl Hasheesh to bespoke beachfront villas and private yacht charters, the Kuba app curates extraordinary escapes tailored to the most discerning travelers.",
    heroCtaExplore: "Explore Experiences",
    heroCtaDownload: "Download Kuba App",
    heroTrustedBy: "Trusted by over 15,000+ luxury travelers worldwide",

    // Search Widget
    searchDestLabel: "Destination",
    searchDestPlaceholder: "Sahl Hasheesh, El Gouna, Hurghada...",
    searchExpLabel: "Experience Type",
    searchExpOption1: "Private Yacht & Sea Excursions",
    searchExpOption2: "Luxury Beachfront Villas & Chalets",
    searchExpOption3: "5-Star Suites & Coastal Resorts",
    searchExpOption4: "VIP Concierge & Golf Car Rentals",
    searchDateLabel: "Arrival Date",
    searchBtn: "Search & Discover",

    // Quick Stats
    stat1Number: "500+",
    stat1Label: "Luxury Villas & Stays",
    stat2Number: "120+",
    stat2Label: "Licensed VIP Yachts",
    stat3Number: "15,000+",
    stat3Label: "Delighted Guests",
    stat4Number: "99.8%",
    stat4Label: "Guest Satisfaction Rate",

    // Featured Stories (Images 1-5)
    storiesTag: "Exclusive Visual Journal",
    storiesTitle: "Moments Crafted for a Lifetime",
    storiesSubtitle: "Discover the Kuba lifestyle — from sun-drenched private shores in Sahl Hasheesh to majestic sunset yacht voyages.",
    filterAll: "All Escapes",
    filterYachts: "Yacht Cruises",
    filterStays: "Villas & Chalets",
    filterSahlHasheesh: "Sahl Hasheesh",
    filterPrivate: "VIP Privacy",
    zoomImage: "Zoom Image",

    // Card 1
    card1Badge: "Sahl Hasheesh • Endless Summer",
    card1Title: "Make Your Summer Unforgettable in Sahl Hasheesh",
    card1Desc: "Soak in the pure joy of Red Sea summers with your loved ones along private shorelines, luxury seaside chalets, and thrilling maritime adventures.",
    card1Feat1: "Private Beach Access",
    card1Feat2: "Luxury Villas & Chalets",
    card1Feat3: "Yacht & Boat Excursions",
    card1Feat4: "Safety & Utmost Privacy",

    // Card 2
    card2Badge: "Sunset Magic • A Night to Remember",
    card2Title: "A Night to Remember — Sunset Yacht Lounge",
    card2Desc: "Savor crafted sunset refreshments and fresh tropical delicacies on the open deck while the golden sun sets behind the majestic Red Sea mountains.",
    card2Feat1: "Panoramic Sunset Views",
    card2Feat2: "Curated Ambient Chillout",
    card2Feat3: "Gourmet Bites & Hospitality",
    card2Feat4: "Professional Marine Crew",

    // Card 3
    card3Badge: "Winter Escape • Coastal Warmth",
    card3Title: "Winter Looks Better Here — Sahl Hasheesh",
    card3Desc: "Escape chilly climates to sun-kissed turquoise waters and warm breezes year-round, aboard mega yachts and prestigious waterfront retreats.",
    card3Feat1: "Year-Round Sunshine",
    card3Feat2: "Modern Mega Yachts",
    card3Feat3: "Warm Seaside Stays",
    card3Feat4: "Island Trips & Coral Diving",

    // Card 4
    card4Badge: "Prime Waterfront Living",
    card4Title: "Meet Me by the Sea — Serenity & Elegance",
    card4Desc: "Wake up each morning to gentle waves and sweeping maritime horizons from your private villa terrace overlooking crystal waters and anchored yachts.",
    card4Feat1: "Waterfront Sea Frontage",
    card4Feat2: "Private Infinity Pools",
    card4Feat3: "Sophisticated Architecture",
    card4Feat4: "24/7 Dedicated Concierge",

    // Card 5
    card5Badge: "Ultimate Confidentiality • VIP",
    card5Title: "Escape. But Make It Private — Bespoke Charters",
    card5Desc: "Exclusively private yacht voyages meticulously tailored for families and VIPs who demand unmatched intimacy, total seclusion, and five-star luxury.",
    card5Feat1: "Exclusive Private Charter",
    card5Feat2: "Customized Sea Itinerary",
    card5Feat3: "Private On-board Chef",
    card5Feat4: "Strict Confidentiality",

    // Pillars / Why Kuba
    whyTag: "Why Travelers Choose Us",
    whyTitle: "World-Class Standards, Authentic Warmth",
    whySubtitle: "We curate every single detail to ensure your Egyptian holiday is nothing short of perfection.",
    pillar1Title: "100% Verified Properties & Yachts",
    pillar1Desc: "Our team personally inspects every single stay and yacht to guarantee immaculate cleanliness, luxury, and marine safety standards.",
    pillar2Title: "Instant Booking & Price Transparency",
    pillar2Desc: "No hidden fees or unexpected surprises. Clear pricing in your local currency and instantaneous digital confirmations.",
    pillar3Title: "VIP Concierge & Seamless Support",
    pillar3Desc: "Dedicated hospitality specialists at your service 24/7 — from VIP airport greeting to golf cart rentals and romantic surprises.",
    pillar4Title: "Uncompromising Privacy & Peace of Mind",
    pillar4Desc: "Specially selected villas and private boat charters providing full seclusion for families and travelers seeking personal serenity.",

    // Destinations
    destTag: "Iconic Coastlines",
    destTitle: "Explore Egypt's Most Glamorous Shores",
    destSubtitle: "Handpicked seaside gems delivering breathtaking natural beauty and elite leisure.",
    dest1Name: "Sahl Hasheesh",
    dest1Desc: "The pinnacle of peaceful luxury, promenade living & white sand bays",
    dest2Name: "El Gouna",
    dest2Desc: "Venetian lagoons, vibrant marinas, kitesurfing & chic nightlife",
    dest3Name: "North Coast (Sahel)",
    dest3Desc: "Pristine Mediterranean turquoise waters and world-class resort compounds",
    dest4Name: "Sharm El Sheikh & Dahab",
    dest4Desc: "Legendary coral reefs, desert mountain backdrops & bohemian allure",

    // App Showcase
    appShowcaseTag: "Kuba Mobile App",
    appShowcaseTitle: "A World of Luxury at Your Fingertips",
    appShowcaseDesc: "Engineered to deliver an effortless booking journey. Browse ultra-high-definition galleries, compare amenities, and communicate directly with licensed yacht captains and private hosts.",
    appFeat1: "Smart filtering by coastline, amenities, and price",
    appFeat2: "Live calendar availability and 1-tap confirmation",
    appFeat3: "Direct in-app messaging with your captain or host",
    appFeat4: "Secure multi-currency payment checkout",

    // Reviews
    reviewsTag: "Guest Testimonials",
    reviewsTitle: "Loved by Discerning Travelers",
    review1Text: "The yacht charter in Sahl Hasheesh via Kuba was phenomenal! Flawless crew, five-star hospitality, and complete privacy for our family. Will book every year!",
    review1Author: "Dr. Tariq Al-Mansoor",
    review1Location: "Riyadh, Saudi Arabia",
    review2Text: "The waterfront villa in Sahl Hasheesh was breathtaking. Booking through the Kuba app was effortless, and the 24/7 concierge was always on point!",
    review2Author: "Sophie & Liam Miller",
    review2Location: "London, United Kingdom",
    review3Text: "Easily the best luxury travel app in Egypt. Absolute transparency, pristine cleanliness, and prompt customer care. Kudos to Kuba!",
    review3Author: "Eng. Karim Abdel-Rahman",
    review3Location: "Cairo, Egypt",

    // Download Section
    downloadTag: "Get Started Today",
    downloadTitle: "Download the Kuba App & Begin Your Voyage",
    downloadSubtitle: "Available now on the App Store and Google Play. Select your destination, reserve your private yacht or villa, and create golden memories.",
    downloadQrText: "Scan QR code with your camera to download instantly",
    downloadAppleBadgeAlt: "Download on the App Store",
    downloadGoogleBadgeAlt: "Get it on Google Play",
    downloadNote: "Compatible with iOS 14+ and Android 8.0+",

    // FAQ
    faqTag: "Frequently Asked Questions",
    faqTitle: "Everything You Need to Know",
    faq1Q: "How do I book a private yacht or luxury villa on Kuba?",
    faq1A: "Simply download the app or explore listings, pick your preferred dates, select your party size, and complete your booking with instant digital confirmation.",
    faq2Q: "Do yacht charters include a licensed captain and hospitality?",
    faq2A: "Yes, every single yacht includes certified marine captains, qualified crew, safety gear, and customizable gourmet catering and water sports options.",
    faq3Q: "Does Kuba guarantee privacy for families and VIP guests?",
    faq3A: "Privacy is at the core of Kuba. Our private yachts and villas offer secluded settings, private entrances, and discreet hospitality.",
    faq4Q: "Which currencies and payment methods are accepted?",
    faq4A: "Kuba accepts USD, EUR, EGP, and SAR through major credit cards, Apple Pay, and secure payment gateways.",

    // Footer
    footerDesc: "Kuba Tours — Your premier luxury portal to golden memories along the Red Sea and Egypt's most exclusive shores. Private yachts, deluxe chalets, and waterfront villas.",
    footerLinksTitle: "Quick Navigation",
    footerContactTitle: "Contact & Concierge",
    footerDestTitle: "Featured Destinations",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerRights: "All Rights Reserved © Kuba Tours 2026",
    footerCall: "VIP Concierge: Available 24/7",
    footerLocation: "Sahl Hasheesh • Hurghada • Red Sea, Egypt"
  }
};

let currentLang = localStorage.getItem('kuba_lang') || 'ar';

// Apply Language
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kuba_lang', lang);

  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';

  const body = document.body;
  body.setAttribute('dir', html.dir);

  // Update text nodes
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Update Lang button text
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langToggleMobile = document.getElementById('lang-toggle-mobile');
  if (langToggleBtn) {
    langToggleBtn.querySelector('.lang-label').textContent = lang === 'ar' ? 'English' : 'العربية';
  }
  if (langToggleMobile) {
    langToggleMobile.querySelector('.lang-label').textContent = lang === 'ar' ? 'English' : 'العربية';
  }
}

// Lightbox Data (from images 1.jpg to 5.jpg)
const galleryItems = [
  {
    id: 1,
    src: '/images/1.jpg',
    category: 'sahl-hasheesh',
    titleKey: 'card1Title',
    descKey: 'card1Desc',
    badgeKey: 'card1Badge'
  },
  {
    id: 2,
    src: '/images/2.jpg',
    category: 'yachts',
    titleKey: 'card2Title',
    descKey: 'card2Desc',
    badgeKey: 'card2Badge'
  },
  {
    id: 3,
    src: '/images/3.jpg',
    category: 'yachts',
    titleKey: 'card3Title',
    descKey: 'card3Desc',
    badgeKey: 'card3Badge'
  },
  {
    id: 4,
    src: '/images/4.jpg',
    category: 'stays',
    titleKey: 'card4Title',
    descKey: 'card4Desc',
    badgeKey: 'card4Badge'
  },
  {
    id: 5,
    src: '/images/5.jpg',
    category: 'private',
    titleKey: 'card5Title',
    descKey: 'card5Desc',
    badgeKey: 'card5Badge'
  }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const badge = document.getElementById('lightbox-badge');

  const item = galleryItems[index];
  const t = translations[currentLang];

  img.src = item.src;
  title.textContent = t[item.titleKey] || '';
  desc.textContent = t[item.descKey] || '';
  badge.textContent = t[item.badgeKey] || '';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
  openLightbox(currentLightboxIndex);
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentLightboxIndex);
}

// Gallery Filter
function setupGalleryFilter() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const cards = document.querySelectorAll('.story-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Mobile Menu
function setupMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const overlay = document.getElementById('mobile-menu-overlay');

  function toggle(open) {
    if (open) {
      drawer.classList.remove('translate-x-full', '-translate-x-full');
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      const isRtl = document.documentElement.dir === 'rtl';
      if (isRtl) {
        drawer.classList.add('translate-x-full');
      } else {
        drawer.classList.add('-translate-x-full');
      }
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (openBtn) openBtn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
  if (overlay) overlay.addEventListener('click', () => toggle(false));

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });
}

// FAQ Accordion
function setupFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    questionBtn.addEventListener('click', () => {
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

      // Close all others
      document.querySelectorAll('.faq-answer').forEach((a) => (a.style.maxHeight = '0px'));
      document.querySelectorAll('.faq-icon').forEach((i) => i.classList.remove('rotate-180'));

      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        icon.classList.add('rotate-180');
      }
    });
  });
}

// Destination Search Feedback
function setupSearchWidget() {
  const searchBtn = document.getElementById('hero-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const downloadSec = document.getElementById('download');
      if (downloadSec) {
        downloadSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Navbar scroll blur
function setupNavbarScroll() {
  const nav = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('shadow-xl', 'bg-[#0F241A]/95');
    } else {
      nav.classList.remove('shadow-xl');
    }
  });
}

// Lightbox keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightbox-modal');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') (document.documentElement.dir === 'rtl' ? prevLightbox() : nextLightbox());
    if (e.key === 'ArrowLeft') (document.documentElement.dir === 'rtl' ? nextLightbox() : prevLightbox());
  }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  // Toggle buttons
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langToggleMobile = document.getElementById('lang-toggle-mobile');

  function handleLangSwitch() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  }

  if (langToggleBtn) langToggleBtn.addEventListener('click', handleLangSwitch);
  if (langToggleMobile) langToggleMobile.addEventListener('click', handleLangSwitch);

  setupGalleryFilter();
  setupMobileMenu();
  setupFaq();
  setupSearchWidget();
  setupNavbarScroll();
});
