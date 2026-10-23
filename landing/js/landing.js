/**
 * Kuba Tours - Luxury Green Portfolio Theme Script
 * Bilingual (AR/EN) + Horizontal Gallery Scroll + Lightbox
 */

const content = {
  ar: {
    // Header
    brandTitle: "KUBA TOURS",
    brandTag: "ذكريات ذهبية",
    navHome: "الرئيسية",
    navGallery: "معرض التجارب",
    navDownload: "تحميل التطبيق",
    navContact: "تواصل معنا",
    langBtn: "English",

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

    // Download Section (No white box, all white text)
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
    navGallery: "Showcase",
    navDownload: "Download App",
    navContact: "Contact",
    langBtn: "العربية",

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

    // Download Section (No white box, all white text)
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
    return card ? card.offsetWidth + 24 : 420;
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
