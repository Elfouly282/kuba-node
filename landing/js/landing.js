/**
 * Kuba Tours - Luxury Green & White Portfolio Theme Script
 * Bilingual (AR/EN) + Horizontal Gallery Scroll + Lightbox
 */

const content = {
  ar: {
    // Header
    brandTitle: "KUBA TOURS",
    brandTag: "ذكريات ذهبية",
    navHome: "الرئيسية",
    navServices: "خدماتنا",
    navAbout: "عن كوبا",
    navGallery: "معرض التجارب",
    navDownload: "تحميل التطبيق",
    navContact: "تواصل معنا",
    langBtn: "English",

    // Hero Text
    heroBadge: "المنصة الرائدة لعطلات البحر الأحمر وسهل حشيش",
    heroTitle: "بوابتك لعالم الرفاهية واليخوت الفاخرة",
    heroSubtitle: "تطبيق كوبا يجمع لك أرقى الفلل والشاليهات الشاطئية، حجز وتأجير اليخوت الخاصة، وسيارات الجولف مع خصوصية وأمان تام.",
    heroCtaGallery: "استكشف البوسترات",
    heroCtaDownload: "حمّل التطبيق",

    // Horizontal Gallery
    galleryTag: "ألبوم البوسترات والتجارب الحصرية",
    galleryTitle: "اسحب وشاهد روعة عطلات كوبا",
    gallerySubtitle: "تصفح ألبوم البوسترات الإعلانية لتطبيق كوبا في سهل حشيش.. اسحب يميناً ويساراً واستمتع بالتفاصيل.",
    galleryHint: "اسحب أفقياً لتصفح جميع البوسترات",
    zoomHint: "اضغط لتكبير الصورة",

    // Card Captions (1 to 8)
    card1Title: "صيفك أحلى في سهل حشيش",
    card1Sub: "شاطئ خاص، فلل فاخرة، يخت، وخصوصية تامة",

    card2Title: "أمسية لا تُنسى وغروب ساحر",
    card2Sub: "أجواء شاعرية ومشروبات منعشة على متن اليخت",

    card3Title: "شتاء أدفأ في سهل حشيش",
    card3Sub: "شمس الشتاء والميجا يخت في المياه الفيروزية",

    card4Title: "على ضفاف البحر الفيروزي",
    card4Sub: "فلل شاطئية استثنائية بإطلالة بانورامية",

    card5Title: "الهروب بخصوصية تامة",
    card5Sub: "رحلات بحرية مغلقة ومخصصة للعائلات والـ VIP",

    card6Title: "سنة جديدة تبدأ من البحر",
    card6Sub: "حفلات ليلية وأجواء احتفالية راقية على متن اليخت",

    card7Title: "مغامرات بحرية وانطلاق",
    card7Sub: "أنشطة مائية، سرعة، وسياحة في سهل حشيش",

    card8Title: "مغامرتك الفاخرة القادمة",
    card8Sub: "إطلالة جوية ساحرة لخليج سهل حشيش",

    // Services
    servicesTag: "ماذا يقدم لك تطبيق كوبا؟",
    servicesTitle: "خدمات حصرية متكاملة لعطلة لا مثيل لها",
    servicesSubtitle: "كل ما تحتاجه لإجازة استثنائية في سهل حشيش متاح بين يديك في تطبيق واحد.",
    srv1Title: "شقق وفنادق فاخرة",
    srv1Desc: "شاليهات وفلل شاطئية راقية بمواقع استثنائية ومسابح خاصة مع أعلى معايير النظافة والخصوصية.",
    srv2Title: "حجز وتأجير يخوت",
    srv2Desc: "يخوت خاصة حديثة مع طواقم مرخصة لرحلات الجزر والغطس والغروب والحفلات الخاصة.",
    srv3Title: "تأجير سيارات جولف",
    srv3Desc: "تنقل بحرية داخل منتجعات وممشى سهل حشيش السياحي بكل سهولة وأناقة.",
    srv4Title: "حجز فوري وموثوق",
    srv4Desc: "تأكيد فوري لحجزك عبر التطبيق بخطوات سلسة وشفافة ودفع آمن متعدد العملات.",
    srv5Title: "أفضل العروض والأسعار",
    srv5Desc: "باقات موسمية حصرية وأسعار مباشرة تضمن لك أعلى قيمة لإجازتك.",

    // About & Logo
    aboutTag: "عن كوبا تورز",
    aboutTitle: "شعارنا: ذكريات ذهبية تصنع الفارق",
    aboutP1: "كوبا هو التطبيق السياحي الرائد المصمم خصيصاً ليمنح السياح والعائلات أرقى تجربة إقامة وبحر في سهل حشيش والبحر الأحمر.",
    aboutP2: "نجمع بين كرم الضيافة وأعلى معايير الخصوصية والأمان لنضمن لك ولأحبابك لحظات لا تُنسى.",
    stat1Num: "100%",
    stat1Label: "خصوصية وأمان",
    stat2Num: "5 نجوم",
    stat2Label: "معايير الضيافة",
    stat3Num: "24/7",
    stat3Label: "خدمة كونسيرج",

    // Download Section
    downloadTag: "حمّل التطبيق الآن",
    downloadTitle: "ابدأ رحلتك وصمم إجازتك القادمة بلمسة واحدة",
    downloadSubtitle: "تطبيق كوبا متاح الآن مجاناً على هواتف آبل وأندرويد. تصفح، اختر، واحجز يختك أو شاليهك في ثوانٍ.",
    downloadAppleBadgeAlt: "تحميل من متجر آبل ستور",
    downloadGoogleBadgeAlt: "تحميل من متجر جوجل بلاي",
    downloadNote: "متوافق مع أجهزة iPhone و Android",

    // Contact
    contactTag: "تواصل مع فريق كوبا",
    contactTitle: "فريق الكونسيرج جاهز لخدمتك 24/7",
    contactPhone: "هاتف / واتساب:",
    contactEmail: "البريد الإلكتروني:",
    contactLocation: "الموقع: سهل حشيش • الغردقة • البحر الأحمر، مصر",
    contactBtn: "محادثة واتساب مباشرة",

    // Footer
    copyright: "جميع الحقوق محفوظة © كوبا تورز (Kuba Tours) 2026"
  },

  en: {
    // Header
    brandTitle: "KUBA TOURS",
    brandTag: "Golden Memories",
    navHome: "Home",
    navServices: "Services",
    navAbout: "About",
    navGallery: "Showcase",
    navDownload: "Download App",
    navContact: "Contact",
    langBtn: "العربية",

    // Hero Text
    heroBadge: "The Premier Red Sea & Sahl Hasheesh Platform",
    heroTitle: "Your Gateway to Sahl Hasheesh & Luxury Yacht Escapes",
    heroSubtitle: "Kuba App brings together luxury beachfront villas, private yacht charters, and golf cart rentals with unmatched comfort, safety, and total privacy.",
    heroCtaGallery: "Explore Showcase",
    heroCtaDownload: "Download App",

    // Horizontal Gallery
    galleryTag: "Exclusive Visual Journal & Posters",
    galleryTitle: "Swipe Through the Beauty of Kuba",
    gallerySubtitle: "Browse our curated collection of promotional posters across Sahl Hasheesh. Scroll horizontally to explore every detail.",
    galleryHint: "Scroll or drag horizontally to view all posters",
    zoomHint: "Click to zoom image",

    // Card Captions (1 to 8)
    card1Title: "Make Your Summer Unforgettable",
    card1Sub: "Private beach, luxury chalets, yacht & complete safety",

    card2Title: "A Night to Remember — Sunset Lounge",
    card2Sub: "Unforgettable moments sailing through the Red Sea sunset",

    card3Title: "Winter Looks Better Here",
    card3Sub: "Year-round coastal sun aboard luxury mega yachts",

    card4Title: "Meet Me by the Sea",
    card4Sub: "Exclusive waterfront villas with panoramic maritime vistas",

    card5Title: "Escape, But Make It Private",
    card5Sub: "Private yacht charters tailored for families and VIP guests",

    card6Title: "A New Year Begins From The Sea",
    card6Sub: "Night parties and chic celebrations on the open deck",

    card7Title: "Escape to Sahl Hasheesh",
    card7Sub: "Speedboat excursions, water sports & azure adventures",

    card8Title: "Your Next Luxurious Adventure",
    card8Sub: "Magnificent aerial coastline views of Sahl Hasheesh Bay",

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

    // About & Logo
    aboutTag: "About Kuba Tours",
    aboutTitle: "Our Motto: Golden Memories that Last Forever",
    aboutP1: "Kuba is the premier travel app designed specifically for travelers and families seeking refined luxury and tranquility along the Red Sea.",
    aboutP2: "We combine authentic warmth with strict standards of privacy and marine safety to ensure an unforgettable vacation.",
    stat1Num: "100%",
    stat1Label: "Privacy & Safety",
    stat2Num: "5-Star",
    stat2Label: "Hospitality Standard",
    stat3Num: "24/7",
    stat3Label: "Dedicated Concierge",

    // Download Section
    downloadTag: "Download Today",
    downloadTitle: "Begin Your Voyage and Plan Your Escape in Seconds",
    downloadSubtitle: "The Kuba App is available for free on iOS and Android. Discover, select, and confirm your private stay or yacht charter in taps.",
    downloadAppleBadgeAlt: "Download on the App Store",
    downloadGoogleBadgeAlt: "Get it on Google Play",
    downloadNote: "Compatible with iPhone and Android devices",

    // Contact
    contactTag: "Get in Touch",
    contactTitle: "Our Concierge Team is at Your Service 24/7",
    contactPhone: "Phone / WhatsApp:",
    contactEmail: "Email:",
    contactLocation: "Location: Sahl Hasheesh • Hurghada • Red Sea, Egypt",
    contactBtn: "Direct WhatsApp Chat",

    // Footer
    copyright: "All Rights Reserved © Kuba Tours 2026"
  }
};

let currentLang = localStorage.getItem('kuba_portfolio_lang') || 'ar';

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

// Horizontal Gallery Scrolling
function setupHorizontalGallery() {
  const track = document.getElementById('horizontal-gallery');
  const btnNext = document.getElementById('scroll-next');
  const btnPrev = document.getElementById('scroll-prev');
  if (!track) return;

  const getScrollAmount = () => {
    const card = track.querySelector('.h-poster-card');
    return card ? card.offsetWidth + 24 : 400;
  };

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const isRtl = document.documentElement.dir === 'rtl';
      const dir = isRtl ? -1 : 1;
      track.scrollBy({ left: getScrollAmount() * dir, behavior: 'smooth' });
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const isRtl = document.documentElement.dir === 'rtl';
      const dir = isRtl ? 1 : -1;
      track.scrollBy({ left: getScrollAmount() * dir, behavior: 'smooth' });
    });
  }

  // Mouse Wheel horizontal scroll over track
  track.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Mouse Drag to Scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
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

// Init
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  setupHorizontalGallery();

  // Lightbox click triggers
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

  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }
});
