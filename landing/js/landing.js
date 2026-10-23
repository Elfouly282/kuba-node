/**
 * Kuba App - Luxury Portfolio Script
 * Bilingual System (AR / EN) + Portfolio Filter + Lightbox
 */

const content = {
  ar: {
    // Nav
    brandTag: "ذكريات ذهبية",
    navHome: "الرئيسية",
    navServices: "خدماتنا",
    navAbout: "عن التطبيق",
    navPortfolio: "معرض الأعمال",
    navContact: "تواصل معنا",
    navDownload: "تحميل التطبيق",
    langBtn: "English",

    // Hero
    heroBadge: "المنصة الرائدة لعطلات البحر الأحمر وسهل حشيش",
    heroTitle: "بوابتك الحصرية لأرقى عطلات سهل حشيش واليخوت الفاخرة",
    heroSubtitle: "تطبيق كوبا يجمع لك أرقى الفلل والشاليهات الشاطئية، حجز وتأجير اليخوت الخاصة، وسيارات الجولف مع خصوصية وأمان تام.",
    heroCtaPortfolio: "استكشف معرض الأعمال",
    heroCtaDownload: "حمّل التطبيق الآن",

    // Services
    servicesTag: "ماذا يقدم لك كوبا؟",
    servicesTitle: "خدمات استثنائية متكاملة لرحلة لا تُنسى",
    servicesSubtitle: "كل تفاصيل إجازتك تم التخطيط لها بعناية لتستمتع بأرقى مستوى من الراحة والرفاهية.",
    
    srv1Title: "شقق وفنادق فاخرة",
    srv1Desc: "شاليهات وفلل شاطئية مباشرة على البحر مع مسابح خاصة وإطلالات بانورامية خلابة في سهل حشيش وأجمل السواحل.",
    
    srv2Title: "حجز وتأجير يخوت",
    srv2Desc: "يخوت فاخرة خاصة مجهزة بطواقم مرخصة لرحلات الجزر، الغروب الساحر، والغوص، والاحتفالات الخاصة.",
    
    srv3Title: "تأجير سيارات جولف",
    srv3Desc: "تنقل بكل أريحية وسلاسة داخل منتجعات ومارينا سهل حشيش والقرى السياحية الراقية.",
    
    srv4Title: "حجز سهل وفوري",
    srv4Desc: "تأكيد فوري لحجزك بخطوات بسيطة وآمنة عبر هاتفك مع وضوح تام لكافة التفاصيل.",
    
    srv5Title: "أفضل العروض والأسعار",
    srv5Desc: "أسعار تنافسية وعروض حصرية على مدار العام بدون وسطاء، لتجربة استثنائية بقيمة حقيقية.",

    // About Section
    aboutTag: "عن كوبا تورز",
    aboutTitle: "هوية سياحية متكاملة تصنع ذكرياتك الذهبية",
    aboutP1: "انطلق تطبيق كوبا ليكون الوجهة الأولى لكل باحث عن الرفاهية والهدوء في قلب البحر الأحمر. نحن لا نوفر مجرد حجز، بل نصمم لك تجربة إقامة بحرية متكاملة تليق بتطلعاتك.",
    aboutP2: "سواء كنت تخطط لإجازة صيفية عائلية ملؤها الأمان والخصوصية، أو تبحث عن شمس الشتاء الدافئة على متن يخت خاص، كوبا هو رفيقك الموثوق في كل خطوة.",
    aboutStat1Num: "100%",
    aboutStat1Label: "خصوصية وأمان",
    aboutStat2Num: "5 نجوم",
    aboutStat2Label: "معايير الضيافة",
    aboutStat3Num: "24/7",
    aboutStat3Label: "دعم وكونسيرج",

    // Portfolio
    portfolioTag: "معرض الأعمال والتجارب",
    portfolioTitle: "جولة بصرية في عالم كوبا",
    portfolioSubtitle: "تصفح ألبوم البوسترات والتجارب التي يقدمها تطبيق كوبا في سهل حشيش والبحر الأحمر.",
    filterAll: "جميع التجارب",
    filterYachts: "رحلات اليخوت",
    filterStays: "الإقامات والفلل",
    filterAdventures: "المغامرات البحرية",

    // Cards
    card1Title: "صيفك أحلى في سهل حشيش",
    card1Sub: "شاطئ خاص، فلل فاخرة، يخت، وخصوصية تامة",
    
    card2Title: "غروب ساحر وأمسيات لا تُنسى",
    card2Sub: "أمسية من وحي الخيال وسط أمواج البحر الأحمر",
    
    card3Title: "شتاء أدفأ في سهل حشيش",
    card3Sub: "شمس الشتاء واليخوت الفاخرة على مدار العام",
    
    card4Title: "على ضفاف البحر الفيروزي",
    card4Sub: "إقامات شاطئية استثنائية وإطلالة بانورامية",
    
    card5Title: "خصوصية تامة ويخوت خاصة",
    card5Sub: "رحلات بحرية مغلقة ومخصصة للعائلات والـ VIP",
    
    card6Title: "سنة جديدة تبدأ من البحر",
    card6Sub: "حفلات ليلية وأجواء احتفالية راقية على متن اليخت",
    
    card7Title: "مغامرات بحرية في سهل حشيش",
    card7Sub: "أنشطة مائية، سرعة، وانطلاق في المياه الفيروزية",
    
    card8Title: "مغامرتك الفاخرة القادمة",
    card8Sub: "مشهد ساحلي مهيب وإطلالة جوية على خليج سهل حشيش",

    zoomHint: "اضغط لتكبير الصورة",

    // Download Section
    downloadTag: "حمّل التطبيق الآن",
    downloadTitle: "ابدأ رحلتك وصمم إجازتك القادمة بلمسة واحدة",
    downloadSubtitle: "تطبيق كوبا متاح الآن مجاناً على هواتف آبل وأندرويد. تصفح، اختر، واحجز يختك أو شاليهك في ثوانٍ.",
    downloadAppleBadgeAlt: "تحميل من متجر آبل ستور",
    downloadGoogleBadgeAlt: "تحميل من متجر جوجل بلاي",
    downloadNote: "يدعم نظامي iOS و Android",

    // Contact
    contactTag: "تواصل مع فريق كوبا",
    contactTitle: "جاهزون لمساعدتك في أي وقت",
    contactSubtitle: "فريق الكونسيرج وخدمة العملاء في انتظارك لترتيب أدق تفاصيل رحلتك.",
    contactPhone: "هاتف / واتساب:",
    contactEmail: "البريد الإلكتروني:",
    contactLocation: "الموقع: سهل حشيش • الغردقة • البحر الأحمر، مصر",

    // Footer
    copyright: "جميع الحقوق محفوظة © كوبا تورز (Kuba Tours) 2026"
  },

  en: {
    // Nav
    brandTag: "Golden Memories",
    navHome: "Home",
    navServices: "Services",
    navAbout: "About App",
    navPortfolio: "Portfolio",
    navContact: "Contact",
    navDownload: "Download App",
    langBtn: "العربية",

    // Hero
    heroBadge: "The Premier Red Sea & Sahl Hasheesh Travel Platform",
    heroTitle: "Your Exclusive Gateway to Sahl Hasheesh & Luxury Yacht Charters",
    heroSubtitle: "Kuba App brings together luxury beachfront villas, private yacht bookings, and golf cart rentals with unmatched comfort, safety, and total privacy.",
    heroCtaPortfolio: "Explore Portfolio",
    heroCtaDownload: "Download App Now",

    // Services
    servicesTag: "What Kuba Offers",
    servicesTitle: "Integrated Premium Services for an Unmatched Holiday",
    servicesSubtitle: "Every single element of your vacation has been thoughtfully curated for luxury and peace of mind.",
    
    srv1Title: "Apartments & Hotels",
    srv1Desc: "Handpicked beachfront chalets and luxury villas with private pools and breathtaking views across Sahl Hasheesh.",
    
    srv2Title: "Yacht Charter",
    srv2Desc: "Private luxury yachts with certified marine crew for island hopping, sunset cruises, coral reef diving, and private celebrations.",
    
    srv3Title: "Golf Cart Rental",
    srv3Desc: "Effortlessly cruise through Sahl Hasheesh resorts, beaches, and seaside promenades with convenient golf cart rentals.",
    
    srv4Title: "Easy & Instant Booking",
    srv4Desc: "Direct, transparent mobile booking with instant digital confirmation and zero hassle.",
    
    srv5Title: "Best Deals & Pricing",
    srv5Desc: "Direct-from-source pricing with exclusive year-round packages and complete cost transparency.",

    // About Section
    aboutTag: "About Kuba Tours",
    aboutTitle: "A Premier Travel Brand Crafting Golden Memories",
    aboutP1: "Kuba was built to be the first choice for travelers seeking serenity and refined luxury along the Red Sea. We don't just facilitate bookings — we design bespoke seaside escapes tailored to your lifestyle.",
    aboutP2: "Whether you are planning a sun-soaked family summer retreat with complete privacy, or winter sunshine aboard a luxury yacht, Kuba is your trusted companion every step of the way.",
    aboutStat1Num: "100%",
    aboutStat1Label: "Privacy & Safety",
    aboutStat2Num: "5-Star",
    aboutStat2Label: "Hospitality Standard",
    aboutStat3Num: "24/7",
    aboutStat3Label: "Dedicated Concierge",

    // Portfolio
    portfolioTag: "Visual Showcase & Portfolio",
    portfolioTitle: "A Visual Journey into Kuba's World",
    portfolioSubtitle: "Browse the curated portfolio of posters and experiences delivered by Kuba across Sahl Hasheesh and the Red Sea.",
    filterAll: "All Escapes",
    filterYachts: "Yacht Experiences",
    filterStays: "Villas & Stays",
    filterAdventures: "Sea Adventures",

    // Cards
    card1Title: "Make Your Summer Unforgettable",
    card1Sub: "Private beach, luxury chalets, yachts & complete safety",
    
    card2Title: "A Night to Remember — Sunset Lounge",
    card2Sub: "Unforgettable moments sailing through the Red Sea golden hour",
    
    card3Title: "Winter Looks Better Here",
    card3Sub: "Year-round coastal sun aboard luxury mega yachts",
    
    card4Title: "Meet Me by the Sea",
    card4Sub: "Exclusive waterfront villas with panoramic maritime vistas",
    
    card5Title: "Escape, But Make It Private",
    card5Sub: "Private yacht charters tailored for families and VIP guests",
    
    card6Title: "A New Year Begins From The Sea",
    card6Sub: "Night parties and chic celebrations on the open deck",
    
    card7Title: "Escape to Sahl Hasheesh",
    card7Sub: "Speedboat excursions, water sports & azure sea adventures",
    
    card8Title: "Your Next Luxurious Adventure",
    card8Sub: "Magnificent aerial coastline views of Sahl Hasheesh Bay",

    zoomHint: "Click to zoom image",

    // Download Section
    downloadTag: "Download Today",
    downloadTitle: "Begin Your Voyage and Plan Your Escape in Seconds",
    downloadSubtitle: "The Kuba App is available for free on iOS and Android. Discover, select, and confirm your private stay or yacht charter in taps.",
    downloadAppleBadgeAlt: "Download on the App Store",
    downloadGoogleBadgeAlt: "Get it on Google Play",
    downloadNote: "Compatible with iOS and Android devices",

    // Contact
    contactTag: "Get in Touch",
    contactTitle: "We Are Always Here to Assist You",
    contactSubtitle: "Our dedicated concierge and guest care team are ready to arrange every detail of your stay.",
    contactPhone: "Phone / WhatsApp:",
    contactEmail: "Email:",
    contactLocation: "Location: Sahl Hasheesh • Hurghada • Red Sea, Egypt",

    // Footer
    copyright: "All Rights Reserved © Kuba Tours 2026"
  }
};

let currentLang = localStorage.getItem('kuba_portfolio_lang') || 'ar';

// Change Language
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kuba_portfolio_lang', lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  const t = content[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.textContent = t.langBtn;
  }
}

// Portfolio Filtering
function setupPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox for 8 Posters
const posters = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg'
];

let activeLightboxIndex = 0;

function openLightbox(index) {
  activeLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  if (modal && img) {
    img.src = posters[index];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function nextLightbox() {
  activeLightboxIndex = (activeLightboxIndex + 1) % posters.length;
  openLightbox(activeLightboxIndex);
}

function prevLightbox() {
  activeLightboxIndex = (activeLightboxIndex - 1 + posters.length) % posters.length;
  openLightbox(activeLightboxIndex);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  setupPortfolioFilter();

  // Lightbox triggers
  document.querySelectorAll('[data-lightbox-index]').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-lightbox-index'), 10);
      openLightbox(idx);
    });
  });

  const modalClose = document.getElementById('lightbox-close');
  if (modalClose) modalClose.addEventListener('click', closeLightbox);

  const nextBtn = document.getElementById('lightbox-next');
  const prevBtn = document.getElementById('lightbox-prev');
  if (nextBtn) nextBtn.addEventListener('click', nextLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevLightbox);

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });

  // Close modal when clicking outside image
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }
});
