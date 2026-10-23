/**
 * Kuba App - Simple & Light Landing Page Script
 * Bilingual System (AR / EN) + Smooth Poster Slider
 */

const content = {
  ar: {
    brandTag: "ذكريات ذهبية",
    navDownload: "تحميل التطبيق",
    langBtn: "English",
    
    // Hero
    heroTitle: "كوبا — عطلتك الأجمل في سهل حشيش والبحر الأحمر",
    heroSubtitle: "تطبيقك المفضل لحجز أرقى الفلل والشاليهات الشاطئية ورحلات اليخوت الخاصة بكل سهولة وخصوصية.",
    
    // View Switcher
    viewSlider: "عرض متتالي (سلايدر)",
    viewGrid: "عرض الكل",
    
    // Download
    downloadTitle: "حمّل تطبيق كوبا الآن",
    downloadSubtitle: "ابدأ التخطيط لإجازتك القادمة واحجز يختك أو إقامتك الفاخرة بلمسة واحدة",
    downloadNote: "متاح مجاناً على متجري App Store و Google Play",
    
    // Footer
    copyright: "جميع الحقوق محفوظة © كوبا تورز (Kuba Tours) 2026"
  },
  en: {
    brandTag: "Golden Memories",
    navDownload: "Download App",
    langBtn: "العربية",
    
    // Hero
    heroTitle: "Kuba — Your Ultimate Holiday in Sahl Hasheesh & Red Sea",
    heroSubtitle: "Your go-to mobile app for booking luxury seaside chalets, private beachfront villas, and exclusive yacht charters with utmost privacy.",
    
    // View Switcher
    viewSlider: "Slider View",
    viewGrid: "View All",
    
    // Download
    downloadTitle: "Download the Kuba App",
    downloadSubtitle: "Start planning your dream getaway and reserve your private yacht or stay with a single tap.",
    downloadNote: "Available for free on the App Store and Google Play",
    
    // Footer
    copyright: "All Rights Reserved © Kuba Tours 2026"
  }
};

let currentLang = localStorage.getItem('kuba_simple_lang') || 'ar';
let currentSlide = 0;
const totalSlides = 5;

// Change Language
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kuba_simple_lang', lang);

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

// Slider controls
function updateSlider() {
  const track = document.getElementById('slider-track');
  const dots = document.querySelectorAll('.slider-dot');
  const isRtl = document.documentElement.dir === 'rtl';

  if (track) {
    // In RTL, standard transform or direction calculation
    const offset = currentSlide * 100;
    track.style.transform = isRtl ? `translateX(${offset}%)` : `translateX(-${offset}%)`;
  }

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function setupSwipe() {
  const container = document.getElementById('slider-container');
  if (!container) return;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const diff = touchEndX - touchStartX;
  const isRtl = document.documentElement.dir === 'rtl';
  if (Math.abs(diff) > 40) {
    if (diff < 0) {
      isRtl ? prevSlide() : nextSlide();
    } else {
      isRtl ? nextSlide() : prevSlide();
    }
  }
}

// Toggle between Slider and Grid view
function setupViewToggle() {
  const btnSlider = document.getElementById('btn-view-slider');
  const btnGrid = document.getElementById('btn-view-grid');
  const sliderView = document.getElementById('slider-view');
  const gridView = document.getElementById('grid-view');

  if (!btnSlider || !btnGrid) return;

  btnSlider.addEventListener('click', () => {
    btnSlider.classList.add('bg-white', 'shadow-sm', 'text-slate-900', 'font-bold');
    btnSlider.classList.remove('text-slate-500');
    btnGrid.classList.remove('bg-white', 'shadow-sm', 'text-slate-900', 'font-bold');
    btnGrid.classList.add('text-slate-500');

    sliderView.classList.remove('hidden');
    gridView.classList.add('hidden');
    updateSlider();
  });

  btnGrid.addEventListener('click', () => {
    btnGrid.classList.add('bg-white', 'shadow-sm', 'text-slate-900', 'font-bold');
    btnGrid.classList.remove('text-slate-500');
    btnSlider.classList.remove('bg-white', 'shadow-sm', 'text-slate-900', 'font-bold');
    btnSlider.classList.add('text-slate-500');

    gridView.classList.remove('hidden');
    sliderView.classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
      updateSlider();
    });
  }

  const nextBtn = document.getElementById('slider-next');
  const prevBtn = document.getElementById('slider-prev');
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  document.querySelectorAll('.slider-dot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      goToSlide(idx);
    });
  });

  setupSwipe();
  setupViewToggle();
  updateSlider();
});
