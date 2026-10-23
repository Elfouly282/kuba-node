/**
 * Kuba Tours - Luxury Auto-Scrolling Showcase & Lightbox Script
 * Pure Visual Elegance: No text on images, auto-scroll Right-to-Left, mobile optimized.
 */

const content = {
  ar: {
    brandTitle: "KUBA TOURS",
    brandTag: "ذكريات ذهبية",
    navHome: "الرئيسية",
    navGallery: "معرض التجارب",
    navDownload: "تحميل التطبيق",
    navContact: "تواصل معنا",
    langBtn: "English",

    // Gallery section title
    galleryTag: "ألبوم البوسترات والتجارب الحصرية",
    galleryTitle: "تجارب وعطلات كوبا في سهل حشيش",

    // Download section
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
    brandTitle: "KUBA TOURS",
    brandTag: "Golden Memories",
    navHome: "Home",
    navGallery: "Showcase",
    navDownload: "Download App",
    navContact: "Contact",
    langBtn: "العربية",

    // Gallery section title
    galleryTag: "EXCLUSIVE POSTERS & EXPERIENCES",
    galleryTitle: "Kuba Experiences in Sahl Hasheesh",

    // Download section
    downloadTag: "DOWNLOAD TODAY",
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
  if (langBtn) langBtn.textContent = t.langBtn;
}

// ==================== AUTO-SCROLL RIGHT-TO-LEFT ====================
let isPaused = false;
let autoScrollRaf = null;
let detectedRtlDirection = -1; // -1 for RTL standard leftward scroll
const scrollSpeed = 0.9; // Smooth 60fps continuous glide

function startAutoScroll() {
  const track = document.getElementById('horizontal-gallery');
  if (!track) return;

  function loop() {
    if (!isPaused && track) {
      const isRtl = document.documentElement.dir === 'rtl';

      if (isRtl) {
        const prev = track.scrollLeft;
        track.scrollLeft += (detectedRtlDirection * scrollSpeed);
        
        // Adaptive check for browser RTL sign convention
        if (track.scrollLeft === prev && prev === 0) {
          detectedRtlDirection = -detectedRtlDirection;
          track.scrollLeft += (detectedRtlDirection * scrollSpeed);
        }

        // Loop seamlessly halfway
        if (Math.abs(track.scrollLeft) >= (track.scrollWidth / 2)) {
          track.scrollLeft = 0;
        }
      } else {
        track.scrollLeft += scrollSpeed;
        if (track.scrollLeft >= (track.scrollWidth / 2)) {
          track.scrollLeft = 0;
        }
      }
    }
    autoScrollRaf = requestAnimationFrame(loop);
  }

  cancelAnimationFrame(autoScrollRaf);
  autoScrollRaf = requestAnimationFrame(loop);
}

function setupGalleryControls() {
  const track = document.getElementById('horizontal-gallery');
  const section = document.getElementById('gallery-section');
  const btnNext = document.getElementById('scroll-next');
  const btnPrev = document.getElementById('scroll-prev');
  if (!track) return;

  // Pause on hover
  if (section) {
    section.addEventListener('mouseenter', () => { isPaused = true; });
    section.addEventListener('mouseleave', () => { isPaused = false; });
  }

  // Pause on touch (mobile)
  let touchTimeout = null;
  track.addEventListener('touchstart', () => {
    isPaused = true;
    clearTimeout(touchTimeout);
  }, { passive: true });

  track.addEventListener('touchend', () => {
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => { isPaused = false; }, 2000);
  }, { passive: true });

  // Arrow Buttons
  const getScrollStep = () => {
    const card = track.querySelector('.h-poster-card');
    return card ? card.offsetWidth + 24 : 320;
  };

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      isPaused = true;
      const isRtl = document.documentElement.dir === 'rtl';
      const dir = isRtl ? -1 : 1;
      track.scrollBy({ left: getScrollStep() * dir, behavior: 'smooth' });
      setTimeout(() => { isPaused = false; }, 1500);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      isPaused = true;
      const isRtl = document.documentElement.dir === 'rtl';
      const dir = isRtl ? 1 : -1;
      track.scrollBy({ left: getScrollStep() * dir, behavior: 'smooth' });
      setTimeout(() => { isPaused = false; }, 1500);
    });
  }

  // Duplicate the 8 cards once inside the track for seamless infinite loop
  const originalCards = Array.from(track.children);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  // Re-bind click events on all cards (original + clones)
  track.querySelectorAll('.h-poster-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-lightbox-index'), 10);
      openLightbox(idx);
    });
  });

  // Start auto scroll
  startAutoScroll();
}

// ==================== LIGHTBOX (PURE IMAGE ONLY) ====================
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
  isPaused = true;
  activeLightboxIndex = index % posters.length;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  if (modal && img) {
    img.src = posters[activeLightboxIndex];
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
  isPaused = false;
}

function nextLightbox() {
  activeLightboxIndex = (activeLightboxIndex + 1) % posters.length;
  openLightbox(activeLightboxIndex);
}

function prevLightbox() {
  activeLightboxIndex = (activeLightboxIndex - 1 + posters.length) % posters.length;
  openLightbox(activeLightboxIndex);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const langBtn = document.getElementById('lang-btn');
  const handleLangToggle = () => {
    setLanguage(currentLang === 'ar' ? 'en' : 'ar');
  };

  if (langBtn) langBtn.addEventListener('click', handleLangToggle);

  setupGalleryControls();

  // Lightbox close & navigation
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
      if (e.key === 'ArrowRight') (document.documentElement.dir === 'rtl' ? prevLightbox() : nextLightbox());
      if (e.key === 'ArrowLeft') (document.documentElement.dir === 'rtl' ? nextLightbox() : prevLightbox());
    }
  });

  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }
});
