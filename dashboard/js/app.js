// ─── Kuba Admin Dashboard Application ─────────────────────────────────────────

const I18N = {
    ar: {
        appName: 'لوحة تحكم كوبا',
        appSubtitle: 'الإدارة والتحكم الشامل بالتطبيق',
        overview: 'نظرة عامة',
        overviewSubtitle: 'ملخص سريع لحالة التطبيق والأقسام',
        navGroupGeneral: 'عام',
        navGroupPeople: 'المستخدمون',
        navGroupContent: 'المحتوى',
        navGroupApp: 'واجهة التطبيق',
        navGroupSystem: 'النظام',
        sectionUsers: 'المستخدمون والحجوزات',
        sectionListings: 'العقارات والمواقع',
        sectionApp: 'واجهة التطبيق',
        bookings: 'الحجوزات والطلبات',
        kpiRegistered: 'المسجلين في النظام',
        kpiActiveHint: 'حسابات نشطة ومفعلة',
        kpiBookingsHint: 'طلبات الحجز المسجلة',
        kpiAdsHint: 'شاليهات ووحدات سكنية',
        kpiRegionsHint: 'المدن والمحافظات',
        kpiTypesHint: 'شاليهات، فنادق، يخوت',
        kpiCategoriesHint: 'تصنيفات العرض الرئيسية',
        kpiBannersHint: 'بانرات الواجهة النشطة',
        kpiOnboardingHint: 'شاشات البداية',
        users: 'إدارة المستخدمين',
        onboarding: 'شاشات الترحيب',
        categoriesBanners: 'الفئات والبانرات',
        systemStatus: 'فحص النظام والـ APIs',
        logout: 'تسجيل الخروج',
        online: 'متصل',
        totalUsers: 'إجمالي المستخدمين',
        activeUsers: 'المستخدمون النشطون',
        verifiedAccounts: 'الحسابات الموثقة',
        totalOnboarding: 'شاشات الترحيب',
        quickActions: 'إجراءات سريعة',
        addUser: 'إضافة مستخدم جديد',
        addOnboarding: 'إضافة شاشة ترحيب',
        refresh: 'تحديث البيانات',
        recentUsers: 'أحدث المستخدمين المسجلين',
        systemInfo: 'معلومات الخادم وقاعدة البيانات',
        environment: 'البيئة',
        serverTime: 'توقيت الخادم',
        databaseStatus: 'حالة قاعدة البيانات',
        connected: 'متصلة بنجاح (MongoDB)',
        searchUsersPlaceholder: 'ابحث بالاسم، البريد أو الهاتف...',
        filterAll: 'الكل',
        filterActive: 'نشط فقط',
        filterInactive: 'معطل فقط',
        filterVerified: 'موثق',
        filterUnverified: 'غير موثق',
        filterGoogle: 'Google',
        filterLocal: 'محلي (كلمة مرور)',
        roleAdmin: 'مدير (Admin)',
        roleUser: 'مستخدم (User)',
        user: 'المستخدم',
        contact: 'الاتصال',
        provider: 'طريقة التسجيل',
        status: 'الحالة',
        role: 'الصلاحية',
        actions: 'الإجراءات',
        edit: 'تعديل',
        delete: 'حذف',
        active: 'نشط',
        inactive: 'معطل',
        verified: 'موثق',
        unverified: 'غير موثق',
        confirmDeleteUser: 'هل أنت متأكد من رغبتك في حذف هذا المستخدم نهائياً؟',
        confirmDeleteScreen: 'هل أنت متأكد من رغبتك في حذف شاشة الترحيب هذه؟',
        save: 'حفظ',
        cancel: 'إلغاء',
        close: 'إغلاق',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        phone: 'الهاتف',
        titleEn: 'العنوان (باللغة الإنجليزية)',
        titleAr: 'العنوان (باللغة العربية)',
        descEn: 'الوصف (باللغة الإنجليزية)',
        descAr: 'الوصف (باللغة العربية)',
        order: 'الترتيب',
        image: 'الصورة',
        screenPreview: 'معاينة شاشة الترحيب',
        loginTitle: 'تسجيل الدخول للوحة التحكم',
        loginSubtitle: 'أدخل بيانات حساب المدير للمتابعة',
        loginBtn: 'دخول للوحة التحكم',
        quickFillAdmin: 'تعبئة بيانات المدير التجريبي',
        categoriesInfo: 'قسم إدارة التصنيفات والبانرات الإعلانية المرتبطة بإعلانات التطبيق.',
        addCategory: 'إضافة تصنيف جديد',
        addBanner: 'إضافة بانر جديد',
        categoriesTitle: 'التصنيفات',
        bannersTitle: 'البانرات الإعلانية',
        categoryName: 'اسم التصنيف',
        categoryImage: 'صورة التصنيف',
        bannerImage: 'صورة البانر',
        bannerPosition: 'موضع البانر',
        positionTop: 'أعلى الصفحة (Top)',
        positionCenter: 'منتصف الصفحة (Center)',
        positionBottom: 'أسفل الصفحة (Bottom)',
        linkedAd: 'الإعلان المرتبط',
        confirmDeleteCategory: 'هل أنت متأكد من رغبتك في حذف هذا التصنيف نهائياً؟',
        confirmDeleteBanner: 'هل أنت متأكد من رغبتك في حذف هذا البانر نهائياً؟',
        regions: 'المناطق',
        regionsSubtitle: 'إدارة المناطق والمدن المعتمدة بالتطبيق لتصفية الشاليهات والإعلانات',
        addRegion: 'إضافة منطقة جديدة',
        regionName: 'اسم المنطقة',
        regionImage: 'صورة المنطقة',
        regionZone: 'نطاق المنطقة (Zone)',
        zonePoints: 'نقاط النطاق',
        confirmDeleteRegion: 'هل أنت متأكد من رغبتك في حذف هذه المنطقة نهائياً؟',
        unitTypes: 'أنواع الوحدات',
        advertisements: 'الإعلانات والشاليهات',
        advertisementsSubtitle: 'إدارة إعلانات الوحدات، الشقق، والشاليهات التابعة لكل منطقة وتصنيف',
        addAdvertisement: 'إضافة إعلان جديد',
        adTitle: 'عنوان الإعلان',
        adType: 'نوع الوحدة',
        adPrice: 'السعر (ج.م)',
        adLocation: 'الموقع',
        adRegion: 'المنطقة',
        adCategory: 'التصنيف',
        adDescription: 'الوصف',
        adImage: 'صورة الإعلان',
        latitude: 'خط العرض',
        longitude: 'خط الطول',
        coordinates: 'الإحداثيات',
        viewOnMap: 'عرض على الخريطة',
        confirmDeleteAdvertisement: 'هل أنت متأكد من رغبتك في حذف هذا الإعلان نهائياً؟',
        apiTestSuccess: 'الـ API يعمل بنجاح!',
        apiTestFail: 'فشل الاتصال بالـ API',
        testMainApi: 'فحص API الرئيسي (:3000)',
        testAdminApi: 'فحص API الإدارة',
        previous: 'السابق',
        next: 'التالي',
        page: 'صفحة',
        of: 'من',
        bookings: 'الحجوزات والطلبات',
        ownerOverview: 'لوحة الإعلان',
        ownerListing: 'بيانات وتفاصيل الإعلان',
        ownerGallery: 'معرض صور الإعلان',
        ownerBookings: 'الحجوزات والطلبات',
        ownerProfile: 'بيانات حسابي والأمان',
        manageOwner: 'إدارة حساب المالك',
        createOwner: 'تعيين مالك للإعلان',
        noOwner: 'بدون مالك',
    },
    en: {
        appName: 'Kuba Admin Dashboard',
        appSubtitle: 'Comprehensive Application Management',
        overview: 'Overview',
        overviewSubtitle: 'A short snapshot of the app and its sections',
        navGroupGeneral: 'General',
        navGroupPeople: 'People',
        navGroupContent: 'Content',
        navGroupApp: 'App surface',
        navGroupSystem: 'System',
        sectionUsers: 'Users and bookings',
        sectionListings: 'Listings and places',
        sectionApp: 'App surface',
        bookings: 'Bookings and requests',
        kpiRegistered: 'Registered in the system',
        kpiActiveHint: 'Active enabled accounts',
        kpiBookingsHint: 'Recorded booking requests',
        kpiAdsHint: 'Chalets and units',
        kpiRegionsHint: 'Cities and regions',
        kpiTypesHint: 'Chalets, hotels, yachts',
        kpiCategoriesHint: 'Main listing categories',
        kpiBannersHint: 'Active home banners',
        kpiOnboardingHint: 'Welcome screens',
        users: 'Users Management',
        onboarding: 'Onboarding Screens',
        categoriesBanners: 'Categories & Banners',
        systemStatus: 'System & API Console',
        logout: 'Logout',
        online: 'Online',
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        verifiedAccounts: 'Verified Accounts',
        totalOnboarding: 'Onboarding Screens',
        quickActions: 'Quick Actions',
        addUser: 'Add New User',
        addOnboarding: 'Add Onboarding Screen',
        refresh: 'Refresh Data',
        recentUsers: 'Recent Registered Users',
        systemInfo: 'Server & Database Info',
        environment: 'Environment',
        serverTime: 'Server Time',
        databaseStatus: 'Database Status',
        connected: 'Connected (MongoDB)',
        searchUsersPlaceholder: 'Search by name, email or phone...',
        filterAll: 'All',
        filterActive: 'Active only',
        filterInactive: 'Inactive only',
        filterVerified: 'Verified',
        filterUnverified: 'Unverified',
        filterGoogle: 'Google',
        filterLocal: 'Local (Password)',
        roleAdmin: 'Admin',
        roleUser: 'User',
        user: 'User',
        contact: 'Contact',
        provider: 'Provider',
        status: 'Status',
        role: 'Role',
        actions: 'Actions',
        edit: 'Edit',
        delete: 'Delete',
        active: 'Active',
        inactive: 'Inactive',
        verified: 'Verified',
        unverified: 'Unverified',
        confirmDeleteUser: 'Are you sure you want to permanently delete this user?',
        confirmDeleteScreen: 'Are you sure you want to delete this onboarding screen?',
        save: 'Save',
        cancel: 'Cancel',
        close: 'Close',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        phone: 'Phone',
        titleEn: 'Title (English)',
        titleAr: 'Title (Arabic)',
        descEn: 'Description (English)',
        descAr: 'Description (Arabic)',
        order: 'Order',
        image: 'Image',
        screenPreview: 'Screen Preview',
        loginTitle: 'Admin Dashboard Login',
        loginSubtitle: 'Enter administrator credentials to proceed',
        loginBtn: 'Sign In to Dashboard',
        quickFillAdmin: 'Quick Fill Demo Admin',
        categoriesInfo: 'Categories & Promotional Banners management linked to app advertisements.',
        addCategory: 'Add Category',
        addBanner: 'Add Banner',
        categoriesTitle: 'Categories',
        bannersTitle: 'Promotional Banners',
        categoryName: 'Category Name',
        categoryImage: 'Category Image',
        bannerImage: 'Banner Image',
        bannerPosition: 'Banner Position',
        positionTop: 'Top',
        positionCenter: 'Center',
        positionBottom: 'Bottom',
        linkedAd: 'Linked Advertisement',
        confirmDeleteCategory: 'Are you sure you want to delete this category?',
        confirmDeleteBanner: 'Are you sure you want to delete this banner?',
        regions: 'Regions',
        regionsSubtitle: 'Manage regions and cities for filtering chalets, ads and banners',
        addRegion: 'Add Region',
        regionName: 'Region Name',
        regionImage: 'Region Image',
        regionZone: 'Region Zone',
        zonePoints: 'Zone Points',
        confirmDeleteRegion: 'Are you sure you want to delete this region permanently?',
        unitTypes: 'Unit Types',
        advertisements: 'Advertisements & Chalets',
        advertisementsSubtitle: 'Manage units, chalets and advertisements per region and category',
        addAdvertisement: 'Add Advertisement',
        adTitle: 'Advertisement Title',
        adType: 'Unit Type',
        adPrice: 'Price (EGP)',
        adLocation: 'Location',
        adRegion: 'Region',
        adCategory: 'Category',
        adDescription: 'Description',
        adImage: 'Image',
        latitude: 'Latitude',
        longitude: 'Longitude',
        coordinates: 'Coordinates',
        viewOnMap: 'View on Map',
        confirmDeleteAdvertisement: 'Are you sure you want to delete this advertisement permanently?',
        apiTestSuccess: 'API is running successfully!',
        apiTestFail: 'Failed to connect to API',
        testMainApi: 'Test Main API (:3000)',
        testAdminApi: 'Test Admin API',
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
        bookings: 'Bookings & Orders',
        ownerOverview: 'Listing Dashboard',
        ownerListing: 'Listing Details',
        ownerGallery: 'Photo Gallery',
        ownerBookings: 'Bookings & Orders',
        ownerProfile: 'My Profile & Security',
        manageOwner: 'Manage Owner',
        createOwner: 'Assign Owner',
        noOwner: 'No Owner',
    }
};

const state = {
    token: localStorage.getItem('kuba_admin_token') || '',
    user: JSON.parse(localStorage.getItem('kuba_admin_user') || 'null'),
    lang: localStorage.getItem('kuba_admin_lang') || 'ar',
    currentTab: 'overview',
    stats: null,
    users: [],
    usersTotal: 0,
    usersPage: 1,
    usersTotalPages: 1,
    onboardingScreens: [],
    categories: [],
    banners: [],
    advertisements: [],
    cities: [],
    regions: [],
    unitTypes: [],
    selectedUnitTypeId: null,
    unitTypeAttributes: [],
    editingUserId: null,
    editingScreenId: null,
    editingCategoryId: null,
    editingBannerId: null,
    bannerPositionFilter: 'all',
    editingCityId: null,
    editingRegionId: null,
    locationSubTab: 'cities',
    selectedCityFilter: '',
    editingAdvertisementId: null,
    editingUnitTypeId: null,
    editingAttributeId: null,
    bookings: [],
    bookingsTotal: 0,
    ownerAds: [],
    activeOwnerAdId: null,
    ownerBookings: [],
    ownerCurrentBookingFilter: 'all',
    selectedAdForOwnerModal: null,
    ownerMapInstance: null,
    ownerMapMarker: null,
    activeHotelId: null,
    activeHotelTitle: '',
    hotelRooms: [],
};

// ─── HELPERS & API ────────────────────────────────────────────────────────────

function t(key) {
    return I18N[state.lang]?.[key] || I18N.en[key] || key;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    toast.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function getApiBaseUrl() {
    if (window.location.protocol === 'file:') {
        return 'http://localhost:4000';
    }
    const port = window.location.port;
    if ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && port !== '3000' && port !== '4000') {
        return 'http://localhost:4000';
    }
    return '';
}

async function apiFetch(endpoint, options = {}) {
    const headers = options.headers || {};
    if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`;
    }
    
    // Auto attach accept-language
    headers['Accept-Language'] = state.lang;

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const baseUrl = getApiBaseUrl();
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

    try {
        let res;
        try {
            res = await fetch(url, { ...options, headers });
        } catch (fetchErr) {
            if (baseUrl && baseUrl.includes(':4000') && !options._fallbackAttempted) {
                const altUrl = url.replace(':4000', ':3000');
                res = await fetch(altUrl, { ...options, headers, _fallbackAttempted: true });
            } else {
                throw fetchErr;
            }
        }
        
        if (res.status === 401 && !endpoint.includes('/login')) {
            logout();
            showToast('Session expired. Please log in again.', 'warning');
            throw new Error('Unauthorized');
        }

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            const errorMsg = data.message || `Request failed (${res.status})`;
            throw new Error(errorMsg);
        }

        return data;
    } catch (err) {
        if (!options.silent) {
            showToast(err.message, 'error');
        }
        throw err;
    }
}

// ─── AUTHENTICATION ───────────────────────────────────────────────────────────

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let res = null;
    let primaryError = null;

    try {
        res = await apiFetch('/api/v1/admin/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            silent: true,
        });
    } catch (err) {
        primaryError = err;
        // Fallback to client login route if admin route not yet reloaded in node process
        try {
            res = await apiFetch('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                silent: true,
            });
        } catch (fallbackErr) {
            if (primaryError.message?.includes('غير موجود') || primaryError.message?.includes('not found') || primaryError.message?.includes('404')) {
                showToast(state.lang === 'ar' ? 'تنبيه: يجب إعادة تشغيل السيرفر (Ctrl+C ثم npm start) لتفعيل مسارات الأدمن الجديدة.' : 'Notice: Please restart your server (Ctrl+C then npm start) to load new admin routes.', 'warning');
            } else {
                showToast(primaryError.message || fallbackErr.message, 'error');
            }
            return;
        }
    }

    if (res && res.token) {
        state.token = res.token;
        state.user = res.data?.user || { name: 'Admin', email };
        localStorage.setItem('kuba_admin_token', state.token);
        localStorage.setItem('kuba_admin_user', JSON.stringify(state.user));

        showToast(state.lang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!', 'success');
        checkAuth();
    }
}

function fillDemoAdmin() {
    document.getElementById('login-email').value = 'admin@kuba-app.com';
    document.getElementById('login-password').value = 'Admin@123456';
}

function logout() {
    state.token = '';
    state.user = null;
    localStorage.removeItem('kuba_admin_token');
    localStorage.removeItem('kuba_admin_user');
    checkAuth();
}

function isOwnerUser() {
    return state.user && (state.user.role === 'owner' || state.user.role === 'advertiser');
}

function checkAuth() {
    const authScreen = document.getElementById('auth-screen');
    const appScreen = document.getElementById('app-screen');

    if (!state.token) {
        authScreen.classList.remove('hidden');
        appScreen.classList.add('hidden');
    } else {
        authScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
        setupRoleUI();
        loadCurrentTab();
    }
}

function setupRoleUI() {
    const adminNav = document.getElementById('sidebar-admin-nav');
    const ownerNav = document.getElementById('sidebar-owner-nav');
    const roleBadge = document.getElementById('header-role-badge');
    const portalLabel = document.getElementById('header-portal-label');
    const avatarIcon = document.getElementById('header-user-avatar-icon');
    const ownerAdContainer = document.getElementById('header-owner-ad-container');

    updateAdminProfileUI();

    if (isOwnerUser()) {
        if (adminNav) adminNav.classList.add('hidden');
        if (ownerNav) ownerNav.classList.remove('hidden');
        if (roleBadge) {
            roleBadge.textContent = 'صاحب إعلان';
            roleBadge.className = 'badge bg-amber-500 text-white text-[9px] ms-1 py-0 px-1.5';
        }
        if (portalLabel) portalLabel.textContent = 'بوابة صاحب الإعلان';
        if (avatarIcon) avatarIcon.innerHTML = '<i class="fas fa-crown text-[10px] text-amber-300"></i>';

        // If currently on an admin tab, switch to owner-overview
        if (!state.currentTab || !state.currentTab.startsWith('owner-')) {
            state.currentTab = 'owner-overview';
        }

        // Initialize Owner Portal Data
        initOwnerPortal();
    } else {
        if (adminNav) adminNav.classList.remove('hidden');
        if (ownerNav) ownerNav.classList.add('hidden');
        if (ownerAdContainer) ownerAdContainer.classList.add('hidden');
        if (roleBadge) {
            roleBadge.textContent = 'مدير عام';
            roleBadge.className = 'badge badge-brand text-[9px] ms-1 py-0 px-1.5';
        }
        if (portalLabel) portalLabel.textContent = 'لوحة تحكم كوبا الإدارية';
        if (avatarIcon) avatarIcon.innerHTML = '<i class="fas fa-user-shield text-[10px]"></i>';

        if (state.currentTab && state.currentTab.startsWith('owner-')) {
            state.currentTab = 'overview';
        }
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.tab === state.currentTab);
    });
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.toggle('hidden', view.id !== `view-${state.currentTab}`);
    });
    updatePageTitle();
}

function updateAdminProfileUI() {
    const nameEl = document.getElementById('header-admin-name');
    const emailEl = document.getElementById('header-admin-email');
    if (nameEl) nameEl.textContent = state.user?.name || (isOwnerUser() ? 'صاحب الإعلان' : 'Administrator');
    if (emailEl) emailEl.textContent = state.user?.email || '';
}

// ─── NAVIGATION & TABS ────────────────────────────────────────────────────────

const PAGE_TITLES = {
    overview: 'overview',
    users: 'users',
    bookings: 'bookings',
    regions: 'regions',
    advertisements: 'advertisements',
    'unit-types': 'unitTypes',
    onboarding: 'onboarding',
    categories: 'categoriesTitle',
    banners: 'bannersTitle',
    system: 'systemStatus',
    'owner-overview': 'ownerOverview',
    'owner-listing': 'ownerListing',
    'owner-gallery': 'ownerGallery',
    'owner-bookings': 'ownerBookings',
    'owner-profile': 'ownerProfile',
};

function updatePageTitle() {
    const el = document.getElementById('page-title');
    if (!el) return;
    const key = PAGE_TITLES[state.currentTab] || 'overview';
    el.setAttribute('data-i18n', key);
    el.textContent = t(key);
}

function switchTab(tab) {
    state.currentTab = tab;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.tab === tab);
    });

    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.toggle('hidden', view.id !== `view-${tab}`);
    });

    updatePageTitle();
    document.getElementById('sidebar')?.classList.remove('open');
    loadCurrentTab();
}

function loadCurrentTab() {
    if (state.currentTab === 'overview') {
        loadStats();
    } else if (state.currentTab === 'users') {
        loadUsers();
    } else if (state.currentTab === 'bookings') {
        loadBookingsTab();
    } else if (state.currentTab === 'regions') {
        loadCitiesAndRegions();
    } else if (state.currentTab === 'unit-types') {
        loadUnitTypes();
    } else if (state.currentTab === 'advertisements') {
        loadAdvertisementsTab();
    } else if (state.currentTab === 'onboarding') {
        loadOnboarding();
    } else if (state.currentTab === 'categories') {
        loadCategories();
    } else if (state.currentTab === 'banners') {
        loadBannersTab();
    } else if (state.currentTab === 'owner-overview') {
        loadOwnerOverviewTab();
    } else if (state.currentTab === 'owner-listing') {
        loadOwnerListingTab();
    } else if (state.currentTab === 'owner-gallery') {
        loadOwnerGalleryTab();
    } else if (state.currentTab === 'owner-bookings') {
        loadOwnerBookingsTab();
    } else if (state.currentTab === 'owner-profile') {
        loadOwnerProfileTab();
    }
}

// ─── OVERVIEW / STATS ─────────────────────────────────────────────────────────

let userGrowthChartInstance = null;
let adsRegionChartInstance = null;

function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text !== undefined && text !== null ? text : '0';
}

async function loadStats() {
    const icon = document.getElementById('refresh-icon');
    if (icon) icon.classList.add('fa-spin');

    try {
        const res = await apiFetch('/api/v1/admin/users/stats');
        state.stats = res.data;
        renderStats();
    } catch (err) {
        console.error('Stats loading error:', err);
    } finally {
        if (icon) {
            setTimeout(() => icon.classList.remove('fa-spin'), 600);
        }
    }
}

function renderStats() {
    if (!state.stats) return;
    const s = state.stats;

    // 1. Primary KPIs
    setElText('stat-total-users', Number(s.totalUsers || 0).toLocaleString());
    setElText('stat-active-users', Number(s.activeUsers || 0).toLocaleString());
    setElText('stat-inactive-users', Number(s.inactiveUsers || 0).toLocaleString());
    setElText('stat-verified-users', Number(s.verifiedUsers || 0).toLocaleString());

    setElText('stat-bookings', Number(s.totalBookings || 0).toLocaleString());
    const confirmedCount = s.charts?.bookingsByStatus?.find(b => b.status === 'confirmed')?.count || 0;
    const pendingCount = s.charts?.bookingsByStatus?.find(b => b.status === 'pending')?.count || 0;
    setElText('stat-bookings-confirmed', confirmedCount);
    setElText('stat-bookings-pending', pendingCount);

    setElText('stat-advertisements', Number(s.totalAdvertisements || 0).toLocaleString());
    setElText('stat-unit-types', Number(s.totalUnitTypes || 0).toLocaleString());
    setElText('stat-unit-types-bar', Number(s.totalUnitTypes || 0).toLocaleString());

    setElText('stat-cities', Number(s.totalCities !== undefined ? s.totalCities : (state.cities?.length || 0)).toLocaleString());
    setElText('stat-regions', Number(s.totalRegions !== undefined ? s.totalRegions : (state.regions?.length || 0)).toLocaleString());

    // 2. Micro Content KPIs
    setElText('stat-categories', Number(s.totalCategories || 0).toLocaleString());
    setElText('stat-banners', Number(s.totalBanners || 0).toLocaleString());
    setElText('stat-onboarding', Number(s.totalOnboarding || 0).toLocaleString());

    // 3. Date & Banner Info
    const todayDateStr = new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    setElText('overview-today-date', todayDateStr);

    // 4. Render Visual Analytics Charts
    renderOverviewCharts(s.charts);

    // 5. Render Recent Registered Users
    renderOverviewRecentUsers(s.recentUsers);
}

function renderOverviewCharts(charts) {
    if (!window.Chart || !charts) return;

    // Set Arabic-friendly font defaults
    Chart.defaults.font.family = "'Cairo', 'Outfit', sans-serif";
    Chart.defaults.color = '#64748b';

    // A. User Growth Trend Chart (Last 6 Months)
    const growthCanvas = document.getElementById('overviewUserGrowthChart');
    if (growthCanvas) {
        if (userGrowthChartInstance) {
            userGrowthChartInstance.destroy();
            userGrowthChartInstance = null;
        }

        const growthData = Array.isArray(charts.userGrowth) && charts.userGrowth.length > 0 ? charts.userGrowth : [];
        const labels = growthData.map(item => item.label);
        const data = growthData.map(item => item.count);
        const totalRecent = data.reduce((a, b) => a + b, 0);

        setElText('chart-user-growth-total', `+${totalRecent}`);

        const ctx = growthCanvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 240);
        gradient.addColorStop(0, 'rgba(45, 79, 46, 0.28)');
        gradient.addColorStop(1, 'rgba(45, 79, 46, 0.01)');

        userGrowthChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels.length ? labels : ['الشهر 1', 'الشهر 2', 'الشهر 3', 'الشهر 4', 'الشهر 5', 'الشهر الحالي'],
                datasets: [{
                    label: state.lang === 'ar' ? 'مستخدم جديد' : 'New Users',
                    data: data.length ? data : [0, 0, 0, 0, 0, 0],
                    borderColor: '#2D4F2E',
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.38,
                    pointBackgroundColor: '#2D4F2E',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4.5,
                    pointHoverRadius: 7,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        rtl: state.lang === 'ar',
                        backgroundColor: '#1b331c',
                        titleFont: { family: "'Cairo', sans-serif", size: 12, weight: 'bold' },
                        bodyFont: { family: "'Cairo', sans-serif", size: 11 },
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: (context) => ` ${context.parsed.y} ${state.lang === 'ar' ? 'مستخدم جديد' : 'new users'}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: "'Cairo', sans-serif", size: 11 },
                            color: '#64748b'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            font: { family: "'Outfit', 'Cairo', sans-serif", size: 11 },
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.7)',
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

    // B. Ads by Region / Distribution Chart
    const adsCanvas = document.getElementById('overviewAdsRegionChart');
    if (adsCanvas) {
        if (adsRegionChartInstance) {
            adsRegionChartInstance.destroy();
            adsRegionChartInstance = null;
        }

        const hasRegions = Array.isArray(charts.adsByRegion) && charts.adsByRegion.length > 0;
        const regionItems = hasRegions ? charts.adsByRegion : [{ label: state.lang === 'ar' ? 'لا توجد بيانات كافية' : 'No data yet', count: 1 }];
        const labels = regionItems.map(r => r.label);
        const data = regionItems.map(r => r.count);
        const palette = hasRegions
            ? ['#2D4F2E', '#0284c7', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']
            : ['#cbd5e1'];

        adsRegionChartInstance = new Chart(adsCanvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: palette,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: state.lang === 'ar',
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 10,
                            font: { family: "'Cairo', sans-serif", size: 11 }
                        }
                    },
                    tooltip: {
                        enabled: hasRegions,
                        rtl: state.lang === 'ar',
                        backgroundColor: '#1b331c',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => ` ${context.label}: ${context.parsed} ${state.lang === 'ar' ? 'إعلان' : 'listing'}`
                        }
                    }
                }
            }
        });
    }
}

function renderOverviewRecentUsers(users) {
    const container = document.getElementById('recent-users-list');
    if (!container) return;

    if (!Array.isArray(users) || users.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 text-slate-400">
                <i class="fas fa-user-clock text-3xl mb-2 opacity-50 text-slate-300"></i>
                <p class="text-xs">لا يوجد مستخدمون مسجلون حتى الآن</p>
            </div>
        `;
        return;
    }

    container.innerHTML = users.map(u => {
        const name = u.name || (state.lang === 'ar' ? 'بدون اسم' : 'Unnamed');
        const initial = (u.name || u.email || 'U')[0].toUpperCase();
        const contact = u.email || u.phone || '—';
        const dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString(state.lang === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
        const isActive = u.active !== false;
        const isGoogle = u.provider === 'google';
        const regionName = u.region?.name || null;

        return `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition border border-slate-100 hover:border-slate-200 gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-[#2D4F2E] flex items-center justify-center font-black text-sm shrink-0 shadow-xs border border-emerald-300/40">
                        ${initial}
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-sm text-slate-900 truncate">${name}</span>
                            ${isGoogle ? `<span class="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100"><i class="fab fa-google text-[9px]"></i> Google</span>` : ''}
                            ${regionName ? `<span class="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium truncate max-w-[100px]"><i class="fas fa-location-dot text-[8px] text-[#2D4F2E]"></i> ${regionName}</span>` : ''}
                        </div>
                        <div class="text-xs text-slate-500 font-mono truncate mt-0.5">${contact}</div>
                    </div>
                </div>

                <div class="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                        <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                        <span>${isActive ? (state.lang === 'ar' ? 'نشط' : 'Active') : (state.lang === 'ar' ? 'معطل' : 'Inactive')}</span>
                    </span>
                    <span class="text-[11px] text-slate-400 font-medium">${dateStr}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ─── USERS MANAGEMENT ─────────────────────────────────────────────────────────

async function loadUsers(page = 1) {
    state.usersPage = page;
    const search = document.getElementById('user-search-input')?.value || '';
    const role = document.getElementById('user-filter-role')?.value || '';
    const active = document.getElementById('user-filter-active')?.value || '';
    const provider = document.getElementById('user-filter-provider')?.value || '';

    const params = new URLSearchParams({
        page: state.usersPage,
        limit: 10,
        search,
        role,
        active,
        provider,
    });

    try {
        const res = await apiFetch(`/api/v1/admin/users?${params.toString()}`);
        state.users = res.data?.users || [];
        state.usersTotal = res.total || 0;
        state.usersTotalPages = res.totalPages || 1;
        renderUsersTable();
    } catch (err) {
        console.error('Users load error:', err);
    }
}

function renderUsersTable() {
    const tbody = document.getElementById('users-table-body');
    const paginationEl = document.getElementById('users-pagination');
    if (!tbody) return;

    if (state.users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">لا توجد نتائج مطابقة للبحث أو الفلتر</td></tr>`;
        if (paginationEl) paginationEl.innerHTML = '';
        return;
    }

    tbody.innerHTML = state.users.map(u => `
        <tr>
            <td>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#eaf1ea] border border-[#c2d6c3] flex items-center justify-center font-bold text-[#2D4F2E] text-xs">
                        ${(u.name || u.email || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                        <div class="font-bold text-slate-900">${u.name || '<span class="text-slate-400">غير محدد</span>'}</div>
                        <div class="text-xs text-slate-400 font-mono">${u._id}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="text-sm font-medium text-slate-800">${u.email}</div>
                <div class="text-xs text-slate-400">${u.phone || '—'}</div>
            </td>
            <td>
                <span class="badge ${u.provider === 'google' ? 'badge-info' : 'badge-warning'}">
                    <i class="fab fa-${u.provider === 'google' ? 'google' : 'key'}"></i> ${u.provider}
                </span>
            </td>
            <td>
                <span class="badge ${u.role === 'admin' ? 'badge-brand' : 'badge-info'}">
                    ${u.role || 'user'}
                </span>
            </td>
            <td>
                <span class="badge ${u.isEmailVerified ? 'badge-success' : 'badge-danger'}">
                    ${u.isEmailVerified ? t('verified') : t('unverified')}
                </span>
            </td>
            <td>
                <label class="switch">
                    <input type="checkbox" ${u.active ? 'checked' : ''} onchange="toggleUserActive('${u._id}')">
                    <span class="slider"></span>
                </label>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <button class="btn-secondary text-xs p-1.5" onclick="openEditUserModal('${u._id}')" title="${t('edit')}">
                        <i class="fas fa-edit text-[#2D4F2E]"></i>
                    </button>
                    <button class="btn-danger text-xs p-1.5" onclick="deleteUser('${u._id}')" title="${t('delete')}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Pagination
    if (paginationEl) {
        paginationEl.innerHTML = `
            <div class="text-xs text-gray-400">
                ${t('page')} ${state.usersPage} ${t('of')} ${state.usersTotalPages} (${state.usersTotal} ${t('users')})
            </div>
            <div class="flex gap-2">
                <button class="btn-secondary text-xs py-1 px-3" ${state.usersPage <= 1 ? 'disabled style="opacity:0.5"' : ''} onclick="loadUsers(${state.usersPage - 1})">
                    ${t('previous')}
                </button>
                <button class="btn-secondary text-xs py-1 px-3" ${state.usersPage >= state.usersTotalPages ? 'disabled style="opacity:0.5"' : ''} onclick="loadUsers(${state.usersPage + 1})">
                    ${t('next')}
                </button>
            </div>
        `;
    }
}

async function toggleUserActive(userId) {
    try {
        await apiFetch(`/api/v1/admin/users/${userId}/toggle-status`, { method: 'PATCH' });
        showToast('تم تحديث حالة المستخدم بنجاح', 'success');
        loadUsers(state.usersPage);
    } catch (err) {
        loadUsers(state.usersPage);
    }
}

function openAddUserModal() {
    state.editingUserId = null;
    document.getElementById('user-modal-title').textContent = t('addUser');
    document.getElementById('user-form').reset();
    document.getElementById('user-modal-password-container').classList.remove('hidden');
    document.getElementById('user-modal').classList.add('active');
}

function openEditUserModal(userId) {
    const user = state.users.find(u => u._id === userId);
    if (!user) return;

    state.editingUserId = userId;
    document.getElementById('user-modal-title').textContent = t('edit');
    document.getElementById('user-modal-name').value = user.name || '';
    document.getElementById('user-modal-email').value = user.email || '';
    document.getElementById('user-modal-phone').value = user.phone || '';
    document.getElementById('user-modal-role').value = user.role || 'user';
    document.getElementById('user-modal-active').checked = user.active !== false;
    document.getElementById('user-modal-verified').checked = !!user.isEmailVerified;
    document.getElementById('user-modal-password-container').classList.add('hidden');

    document.getElementById('user-modal').classList.add('active');
}

async function handleUserFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('user-modal-name').value;
    const email = document.getElementById('user-modal-email').value;
    const phone = document.getElementById('user-modal-phone').value;
    const role = document.getElementById('user-modal-role').value;
    const active = document.getElementById('user-modal-active').checked;
    const isEmailVerified = document.getElementById('user-modal-verified').checked;
    const password = document.getElementById('user-modal-password')?.value;

    const payload = { name, email, phone, role, active, isEmailVerified };
    if (!state.editingUserId && password) {
        payload.password = password;
    }

    try {
        if (state.editingUserId) {
            await apiFetch(`/api/v1/admin/users/${state.editingUserId}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
            });
            showToast('تم تعديل بيانات المستخدم بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/users', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            showToast('تمت إضافة المستخدم بنجاح', 'success');
        }

        closeModal('user-modal');
        loadUsers(state.usersPage);
    } catch (err) {}
}

async function deleteUser(userId) {
    if (!confirm(t('confirmDeleteUser'))) return;

    try {
        await apiFetch(`/api/v1/admin/users/${userId}`, { method: 'DELETE' });
        showToast('تم حذف المستخدم بنجاح', 'success');
        loadUsers(state.usersPage);
    } catch (err) {}
}

// ─── ONBOARDING SCREENS MANAGEMENT ────────────────────────────────────────────

async function loadOnboarding() {
    try {
        const res = await apiFetch('/api/v1/admin/onboarding');
        state.onboardingScreens = res.data?.screens || [];
        renderOnboardingGrid();
    } catch (err) {
        console.error('Onboarding loading error:', err);
    }
}

function renderOnboardingGrid() {
    const grid = document.getElementById('onboarding-grid');
    if (!grid) return;

    if (state.onboardingScreens.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">لا توجد شاشات ترحيب حالياً. اضغط على "إضافة شاشة ترحيب" لإنشاء الأولى!</div>`;
        return;
    }

    grid.innerHTML = state.onboardingScreens.map(s => `
        <div class="card p-4 flex flex-col justify-between bg-white border border-slate-200 shadow-sm">
            <div>
                <div class="h-44 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 mb-3 flex items-center justify-center relative">
                    ${s.image ? 
                        `<img src="/uploads/${s.image}" class="w-full h-full object-cover" onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'text-xs text-slate-400\'>الصورة غير متوفرة</div>'">` : 
                        `<div class="text-xs text-slate-400 flex flex-col items-center gap-1"><i class="fas fa-image text-2xl text-slate-300"></i><span>بدون صورة</span></div>`}
                    <div class="absolute top-2 start-2">
                        <span class="badge badge-brand">#${s.order}</span>
                    </div>
                    <div class="absolute top-2 end-2">
                        <span class="badge ${s.active ? 'badge-success' : 'badge-danger'}">${s.active ? t('active') : t('inactive')}</span>
                    </div>
                </div>

                <div class="mb-2">
                    <div class="text-xs text-[#2D4F2E] font-bold uppercase tracking-wider mb-0.5">EN</div>
                    <h3 class="font-bold text-slate-900 text-sm mb-1">${s.titleEn}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2">${s.descriptionEn || '—'}</p>
                </div>

                <div class="border-t border-slate-100 pt-2 mb-3">
                    <div class="text-xs text-[#2D4F2E] font-bold uppercase tracking-wider mb-0.5">AR</div>
                    <h3 class="font-bold text-slate-900 text-sm mb-1">${s.titleAr}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2">${s.descriptionAr || '—'}</p>
                </div>
            </div>

            <div class="flex items-center justify-between border-t border-slate-100 pt-3">
                <div class="text-xs text-slate-500 font-medium">الترتيب: ${s.order}</div>
                <div class="flex items-center gap-2">
                    <button class="btn-secondary text-xs py-1 px-2.5" onclick="openEditOnboardingModal('${s._id}')">
                        <i class="fas fa-edit text-[#2D4F2E]"></i> ${t('edit')}
                    </button>
                    <button class="btn-danger text-xs py-1 px-2" onclick="deleteOnboardingScreen('${s._id}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openAddOnboardingModal() {
    state.editingScreenId = null;
    document.getElementById('onboarding-modal-title').textContent = t('addOnboarding');
    document.getElementById('onboarding-form').reset();
    document.getElementById('onboarding-modal-preview').innerHTML = '';
    document.getElementById('onboarding-modal').classList.add('active');
}

function openEditOnboardingModal(screenId) {
    const screen = state.onboardingScreens.find(s => s._id === screenId);
    if (!screen) return;

    state.editingScreenId = screenId;
    document.getElementById('onboarding-modal-title').textContent = t('edit');
    document.getElementById('onboarding-title-en').value = screen.titleEn || '';
    document.getElementById('onboarding-title-ar').value = screen.titleAr || '';
    document.getElementById('onboarding-desc-en').value = screen.descriptionEn || '';
    document.getElementById('onboarding-desc-ar').value = screen.descriptionAr || '';
    document.getElementById('onboarding-order').value = screen.order ?? 0;
    document.getElementById('onboarding-active').checked = screen.active !== false;

    const previewContainer = document.getElementById('onboarding-modal-preview');
    if (screen.image) {
        previewContainer.innerHTML = `<img src="/uploads/${screen.image}" class="h-24 w-auto rounded border border-slate-700 object-cover mt-2">`;
    } else {
        previewContainer.innerHTML = '';
    }

    document.getElementById('onboarding-modal').classList.add('active');
}

async function handleOnboardingFormSubmit(e) {
    e.preventDefault();
    const titleEn = document.getElementById('onboarding-title-en').value;
    const titleAr = document.getElementById('onboarding-title-ar').value;
    const descriptionEn = document.getElementById('onboarding-desc-en').value;
    const descriptionAr = document.getElementById('onboarding-desc-ar').value;
    const order = document.getElementById('onboarding-order').value;
    const active = document.getElementById('onboarding-active').checked;
    const imageFile = document.getElementById('onboarding-image').files[0];

    const formData = new FormData();
    formData.append('titleEn', titleEn);
    formData.append('titleAr', titleAr);
    formData.append('descriptionEn', descriptionEn);
    formData.append('descriptionAr', descriptionAr);
    formData.append('order', order);
    formData.append('active', active);

    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        if (state.editingScreenId) {
            await apiFetch(`/api/v1/admin/onboarding/${state.editingScreenId}`, {
                method: 'PATCH',
                body: formData,
            });
            showToast('تم تعديل شاشة الترحيب بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/onboarding', {
                method: 'POST',
                body: formData,
            });
            showToast('تمت إضافة شاشة الترحيب بنجاح', 'success');
        }

        closeModal('onboarding-modal');
        loadOnboarding();
    } catch (err) {}
}

async function deleteOnboardingScreen(screenId) {
    if (!confirm(t('confirmDeleteScreen'))) return;

    try {
        await apiFetch(`/api/v1/admin/onboarding/${screenId}`, { method: 'DELETE' });
        showToast('تم حذف شاشة الترحيب بنجاح', 'success');
        loadOnboarding();
    } catch (err) {}
}

// ─── CATEGORIES & BANNERS MANAGEMENT ──────────────────────────────────────────

async function loadBannersTab() {
    await Promise.all([loadBanners(), loadAdvertisements(), loadRegions()]);
}

async function loadCategoriesAndBanners() {
    await Promise.all([loadCategories(), loadBanners(), loadAdvertisements()]);
}

// 1. Categories
async function loadCategories() {
    try {
        const res = await apiFetch('/api/v1/admin/categories');
        state.categories = res.data?.categories || [];
        renderCategories();
    } catch (err) {
        console.error('Error loading categories:', err);
    }
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    const badge = document.getElementById('badge-categories-count');
    if (badge) badge.textContent = `${state.categories.length} ${t('categoriesTitle')}`;

    if (!grid) return;

    if (state.categories.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد تصنيفات حالياً. يمكنك إضافة أول تصنيف بالضغط على زر "إضافة تصنيف".</div>`;
        return;
    }

    grid.innerHTML = state.categories.map(cat => {
        const imgSrc = cat.image?.startsWith('http') ? cat.image : `/uploads/${cat.image}`;
        const catId = cat.id || cat._id;
        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition group relative flex flex-col justify-between">
                <div>
                    <div class="h-28 w-full rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                        <img src="${imgSrc}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
                    </div>
                    <div class="font-bold text-slate-900 text-sm mb-1">${cat.name}</div>
                    <div class="text-[10px] text-slate-400 font-mono truncate" title="ID: ${catId}">ID: ${catId}</div>
                </div>
                <div class="flex items-center justify-end gap-1.5 pt-3 mt-2 border-t border-slate-100">
                    <button onclick="openEditCategoryModal('${catId}')" class="p-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded" title="${t('edit')}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteCategory('${catId}')" class="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded" title="${t('delete')}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openAddCategoryModal() {
    state.editingCategoryId = null;
    document.getElementById('category-modal-title').textContent = t('addCategory');
    document.getElementById('category-form').reset();
    document.getElementById('category-modal-preview').innerHTML = '';
    document.getElementById('category-modal').classList.add('active');
}

function openEditCategoryModal(categoryId) {
    const cat = state.categories.find(c => (c.id || c._id) === categoryId);
    if (!cat) return;

    state.editingCategoryId = categoryId;
    document.getElementById('category-modal-title').textContent = `${t('edit')}: ${cat.name}`;
    document.getElementById('category-modal-name').value = cat.name || '';
    
    const urlInput = document.getElementById('category-modal-image-url');
    if (cat.image?.startsWith('http')) {
        urlInput.value = cat.image;
    } else {
        urlInput.value = '';
    }

    const preview = document.getElementById('category-modal-preview');
    const imgSrc = cat.image?.startsWith('http') ? cat.image : `/uploads/${cat.image}`;
    preview.innerHTML = cat.image ? `<img src="${imgSrc}" class="h-20 w-auto rounded border border-slate-300 object-cover mt-2">` : '';

    document.getElementById('category-modal').classList.add('active');
}

async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('category-modal-name').value.trim();
    const imageFile = document.getElementById('category-modal-image-file').files[0];
    const imageUrl = document.getElementById('category-modal-image-url').value.trim();

    if (!name) {
        showToast('يرجى كتابة اسم التصنيف', 'error');
        return;
    }

    let payload;
    let isFormData = false;

    if (imageFile) {
        payload = new FormData();
        payload.append('name', name);
        payload.append('image', imageFile);
        isFormData = true;
    } else if (imageUrl) {
        payload = JSON.stringify({ name, image: imageUrl });
    } else if (state.editingCategoryId) {
        // Keeping current image
        payload = JSON.stringify({ name });
    } else {
        showToast('يرجى اختيار ملف صورة أو إدخال رابط الصورة للتصنيف', 'error');
        return;
    }

    try {
        if (state.editingCategoryId) {
            await apiFetch(`/api/v1/admin/categories/${state.editingCategoryId}`, {
                method: 'PATCH',
                body: payload,
            });
            showToast('تم تحديث التصنيف بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/categories', {
                method: 'POST',
                body: payload,
            });
            showToast('تمت إضافة التصنيف بنجاح', 'success');
        }

        closeModal('category-modal');
        loadCategories();
    } catch (err) {}
}

async function deleteCategory(categoryId) {
    if (!confirm(t('confirmDeleteCategory'))) return;

    try {
        await apiFetch(`/api/v1/admin/categories/${categoryId}`, { method: 'DELETE' });
        showToast('تم حذف التصنيف بنجاح', 'success');
        loadCategories();
    } catch (err) {}
}

// 2. Advertisements Helper (for selecting linked ad in Banners)
async function loadAdvertisements() {
    try {
        const res = await apiFetch('/api/v1/admin/advertisements');
        state.advertisements = res.data?.advertisements || [];
        populateBannerAdSelect();
    } catch (err) {
        console.error('Error loading advertisements:', err);
    }
}

function populateBannerAdSelect() {
    const select = document.getElementById('banner-modal-ad-select');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '<option value="">-- اختر الإعلان من القائمة --</option>' + 
        state.advertisements.map(ad => {
            const adId = ad.id || ad._id;
            return `<option value="${adId}">${ad.title} (${ad.location || ad.type || ''}) - [${adId}]</option>`;
        }).join('');

    if (currentVal) select.value = currentVal;
}

function syncBannerAdInput() {
    const select = document.getElementById('banner-modal-ad-select');
    const input = document.getElementById('banner-modal-ad-id');
    if (select && input && select.value) {
        input.value = select.value;
    }
}

// 3. Banners
async function loadBanners() {
    try {
        const res = await apiFetch('/api/v1/admin/banners');
        state.banners = res.data?.banners || [];
        renderBanners();
    } catch (err) {
        console.error('Error loading banners:', err);
    }
}

function filterBannersByPosition(pos) {
    state.bannerPositionFilter = pos || 'all';
    renderBanners();
}

function renderBanners() {
    const grid = document.getElementById('banners-grid');
    const badge = document.getElementById('badge-banners-count');

    const filteredBanners = state.bannerPositionFilter && state.bannerPositionFilter !== 'all'
        ? state.banners.filter(b => (b.position || 'top') === state.bannerPositionFilter)
        : state.banners;

    if (badge) badge.textContent = `${filteredBanners.length} ${t('bannersTitle')}`;

    if (!grid) return;

    if (filteredBanners.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد بانرات إعلانية تطابق الموضع المحدد. يمكنك إضافة بانر جديد بالضغط على زر "إضافة بانر".</div>`;
        return;
    }

    grid.innerHTML = filteredBanners.map(banner => {
        const bannerId = banner.id || banner._id;
        const adId = banner.advertisementId;
        const position = (banner.position || 'top').toLowerCase();
        const imgSrc = banner.image?.startsWith('http') ? banner.image : `/uploads/${banner.image}`;
        
        // Find linked advertisement details if loaded
        const linkedAd = state.advertisements.find(a => (a.id || a._id) === adId);
        const adTitle = linkedAd ? linkedAd.title : 'إعلان مرتبط في التطبيق';

        const regionName = typeof banner.region === 'object' && banner.region ? banner.region.name : null;

        const positionBadges = {
            top: {
                badgeClass: 'bg-indigo-600 text-white',
                icon: 'fa-arrow-up',
                label: 'أعلى (Top)',
                textClass: 'text-indigo-600',
            },
            center: {
                badgeClass: 'bg-amber-600 text-white',
                icon: 'fa-arrows-alt-v',
                label: 'منتصف (Center)',
                textClass: 'text-amber-600',
            },
            bottom: {
                badgeClass: 'bg-purple-600 text-white',
                icon: 'fa-arrow-down',
                label: 'أسفل (Bottom)',
                textClass: 'text-purple-600',
            },
        };
        const posInfo = positionBadges[position] || positionBadges.top;

        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition flex flex-col justify-between">
                <div>
                    <div class="h-40 w-full rounded-lg overflow-hidden bg-slate-100 mb-3 relative">
                        <img src="${imgSrc}" alt="Banner" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x300?text=Banner+Image'">
                        <span class="absolute top-2 start-2 badge ${posInfo.badgeClass} text-[10px] shadow">
                            <i class="fas ${posInfo.icon} me-1"></i> ${posInfo.label}
                        </span>
                        ${regionName ? `<span class="absolute top-2 end-2 badge bg-emerald-700 text-white text-[10px] shadow"><i class="fas fa-map-marker-alt me-1"></i> ${regionName}</span>` : `<span class="absolute top-2 end-2 badge bg-slate-800 text-white text-[10px] shadow">عام للكل</span>`}
                    </div>

                    <div class="space-y-1.5 text-xs">
                        <div class="flex items-center justify-between">
                            <span class="text-slate-400 text-[11px]">معرف البانر (ID):</span>
                            <span class="font-mono text-[11px] text-slate-700 font-bold truncate max-w-[150px]">${bannerId}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-slate-400 text-[11px]">موضع العرض:</span>
                            <span class="font-bold text-[11px] ${posInfo.textClass}">
                                <i class="fas ${posInfo.icon} me-1"></i>${posInfo.label}
                            </span>
                        </div>
                        <div class="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                            <div>
                                <span class="text-slate-500 font-medium block text-[11px]">الإعلان المفتوح (advertisementId):</span>
                                <span class="font-bold text-[#2D4F2E] text-xs">${adTitle}</span>
                            </div>
                            <span class="font-mono text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[110px]">${adId}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-1.5 pt-3 mt-3 border-t border-slate-100">
                    <button onclick="openEditBannerModal('${bannerId}')" class="btn-secondary text-xs py-1 px-2.5">
                        <i class="fas fa-edit text-blue-600 me-1"></i> ${t('edit')}
                    </button>
                    <button onclick="deleteBanner('${bannerId}')" class="btn-secondary text-xs py-1 px-2.5 hover:text-red-600">
                        <i class="fas fa-trash-alt text-red-600 me-1"></i> ${t('delete')}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openAddBannerModal() {
    state.editingBannerId = null;
    document.getElementById('banner-modal-title').textContent = t('addBanner');
    document.getElementById('banner-form').reset();
    document.getElementById('banner-modal-preview').innerHTML = '';
    const posSelect = document.getElementById('banner-modal-position');
    if (posSelect) posSelect.value = 'top';
    populateBannerAdSelect();
    populateLocationSelects();
    document.getElementById('banner-modal').classList.add('active');
}

function openEditBannerModal(bannerId) {
    const banner = state.banners.find(b => (b.id || b._id) === bannerId);
    if (!banner) return;

    state.editingBannerId = bannerId;
    document.getElementById('banner-modal-title').textContent = `${t('edit')}: بانر (${bannerId.slice(-6)})`;
    
    populateBannerAdSelect();
    populateLocationSelects();
    const select = document.getElementById('banner-modal-ad-select');
    const input = document.getElementById('banner-modal-ad-id');
    const adId = banner.advertisementId;
    if (select) select.value = adId;
    if (input) input.value = adId;

    const posSelect = document.getElementById('banner-modal-position');
    if (posSelect) posSelect.value = banner.position || 'top';

    const citySelect = document.getElementById('banner-modal-city-select');
    if (citySelect) {
        const cityId = typeof banner.city === 'object' && banner.city ? (banner.city.id || banner.city._id) : (banner.city || '');
        citySelect.value = cityId || '';
        onBannerModalCityChange();
    }

    const regSelect = document.getElementById('banner-modal-region-select');
    if (regSelect) {
        const regId = typeof banner.region === 'object' && banner.region ? (banner.region.id || banner.region._id) : (banner.region || '');
        regSelect.value = regId || '';
    }

    const urlInput = document.getElementById('banner-modal-image-url');
    if (banner.image?.startsWith('http')) {
        urlInput.value = banner.image;
    } else {
        urlInput.value = '';
    }

    const preview = document.getElementById('banner-modal-preview');
    const imgSrc = banner.image?.startsWith('http') ? banner.image : `/uploads/${banner.image}`;
    preview.innerHTML = banner.image ? `<img src="${imgSrc}" class="h-24 w-auto rounded border border-slate-300 object-cover mt-2">` : '';

    document.getElementById('banner-modal').classList.add('active');
}

async function handleBannerFormSubmit(e) {
    e.preventDefault();
    const advertisementId = document.getElementById('banner-modal-ad-id').value.trim();
    const city = document.getElementById('banner-modal-city-select')?.value.trim() || '';
    const region = document.getElementById('banner-modal-region-select')?.value.trim() || '';
    const position = document.getElementById('banner-modal-position')?.value || 'top';
    const imageFile = document.getElementById('banner-modal-image-file').files[0];
    const imageUrl = document.getElementById('banner-modal-image-url').value.trim();

    if (!advertisementId) {
        showToast('يرجى تحديد أو إدخال معرّف الإعلان المرتبط بالبانر (advertisementId)', 'error');
        return;
    }

    let payload;

    if (imageFile) {
        payload = new FormData();
        payload.append('advertisementId', advertisementId);
        payload.append('position', position);
        if (city) payload.append('city', city);
        if (region) payload.append('region', region);
        payload.append('image', imageFile);
    } else if (imageUrl) {
        payload = JSON.stringify({ advertisementId, position, image: imageUrl, city: city || null, region: region || null });
    } else if (state.editingBannerId) {
        payload = JSON.stringify({ advertisementId, position, city: city || null, region: region || null });
    } else {
        showToast('يرجى اختيار ملف صورة للبانر أو إدخال رابط الصورة المباشر', 'error');
        return;
    }

    try {
        if (state.editingBannerId) {
            await apiFetch(`/api/v1/admin/banners/${state.editingBannerId}`, {
                method: 'PATCH',
                body: payload,
            });
            showToast('تم تحديث البانر الإعلاني بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/banners', {
                method: 'POST',
                body: payload,
            });
            showToast('تم إنشاء البانر الإعلاني وربطه بالإعلان بنجاح', 'success');
        }

        closeModal('banner-modal');
        loadBanners();
    } catch (err) {}
}

async function deleteBanner(bannerId) {
    if (!confirm(t('confirmDeleteBanner'))) return;

    try {
        await apiFetch(`/api/v1/admin/banners/${bannerId}`, { method: 'DELETE' });
        showToast('تم حذف البانر بنجاح', 'success');
        loadBanners();
    } catch (err) {}
}

// ─── CITIES & REGIONS MANAGEMENT ───────────────────────────────────────────────

async function loadCitiesAndRegions() {
    try {
        const [citiesRes, regionsRes] = await Promise.all([
            apiFetch('/api/v1/admin/cities'),
            apiFetch('/api/v1/admin/regions')
        ]);
        state.cities = citiesRes.data?.cities || [];
        state.regions = regionsRes.data?.regions || [];

        renderCities();
        renderRegions();
        populateLocationSelects();
    } catch (err) {
        console.error('Error loading cities and regions:', err);
    }
}

async function loadRegions() {
    return loadCitiesAndRegions();
}

function switchLocationSubTab(subTab) {
    state.locationSubTab = subTab || 'cities';
    const citiesBtn = document.getElementById('tab-btn-cities');
    const regionsBtn = document.getElementById('tab-btn-regions');
    const citiesPanel = document.getElementById('subtab-cities-panel');
    const regionsPanel = document.getElementById('subtab-regions-panel');

    if (subTab === 'regions') {
        if (citiesBtn) {
            citiesBtn.className = 'location-subtab-btn px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
        }
        if (regionsBtn) {
            regionsBtn.className = 'location-subtab-btn active px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 bg-[#2D4F2E] text-white shadow-sm cursor-pointer';
        }
        if (citiesPanel) citiesPanel.classList.add('hidden');
        if (regionsPanel) regionsPanel.classList.remove('hidden');
    } else {
        if (citiesBtn) {
            citiesBtn.className = 'location-subtab-btn active px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 bg-[#2D4F2E] text-white shadow-sm cursor-pointer';
        }
        if (regionsBtn) {
            regionsBtn.className = 'location-subtab-btn px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
        }
        if (citiesPanel) citiesPanel.classList.remove('hidden');
        if (regionsPanel) regionsPanel.classList.add('hidden');
    }
}

function filterRegionsByCity(cityId) {
    state.selectedCityFilter = cityId || '';
    const select = document.getElementById('regions-filter-city-select');
    if (select) select.value = cityId || '';
    switchLocationSubTab('regions');
    renderRegions();
}

function onRegionFilterCityChanged() {
    state.selectedCityFilter = document.getElementById('regions-filter-city-select')?.value || '';
    renderRegions();
}

// Client-side Ray-Casting algorithm for Point-in-Polygon detection
function isPointInsidePolygon(point, polygonPoints) {
    if (!point || !Array.isArray(polygonPoints) || polygonPoints.length < 3) return false;
    const lat = Number(point.latitude !== undefined ? point.latitude : point.lat);
    const lng = Number(point.longitude !== undefined ? point.longitude : point.lng);
    if (isNaN(lat) || isNaN(lng)) return false;

    let inside = false;
    const n = polygonPoints.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const p1 = polygonPoints[i];
        const p2 = polygonPoints[j];
        const lat1 = Number(p1.latitude !== undefined ? p1.latitude : p1.lat);
        const lng1 = Number(p1.longitude !== undefined ? p1.longitude : p1.lng);
        const lat2 = Number(p2.latitude !== undefined ? p2.latitude : p2.lat);
        const lng2 = Number(p2.longitude !== undefined ? p2.longitude : p2.lng);
        if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) continue;

        const intersect = ((lng1 > lng) !== (lng2 > lng)) &&
            (lat < ((lat2 - lat1) * (lng - lng1)) / (lng2 - lng1 || 0.0000000001) + lat1);
        if (intersect) inside = !inside;
    }
    return inside;
}

function findRegionForPointClient(lat, lng, regions) {
    if (!regions || !Array.isArray(regions)) return null;
    for (const r of regions) {
        if (r.active !== false && Array.isArray(r.points) && r.points.length >= 3) {
            if (isPointInsidePolygon({ latitude: lat, longitude: lng }, r.points)) {
                return r;
            }
        }
    }
    return null;
}

function findCityForPointClient(lat, lng, cities) {
    if (!cities || !Array.isArray(cities)) return null;
    for (const c of cities) {
        if (c.active !== false && Array.isArray(c.points) && c.points.length >= 3) {
            if (isPointInsidePolygon({ latitude: lat, longitude: lng }, c.points)) {
                return c;
            }
        }
    }
    return null;
}

// ─── CITIES ZONE MAP (POLYGONS / GEOFENCES) ───────────────────────────────────
let cityZoneMap = null;
let cityZonePoints = []; // [{ latitude, longitude }]
let cityZoneMarkers = [];
let cityZonePolygon = null;
let cityZoneColor = '#2D4F2E';

function createCityVertexIcon(index) {
    return L.divIcon({
        className: 'kuba-vertex-icon',
        html: `
            <div style="background-color: ${cityZoneColor}; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.35); cursor: grab;">
                ${index}
            </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function initCityZoneMap() {
    if (typeof L === 'undefined') return;
    const container = document.getElementById('city-zone-map');
    if (!container) return;

    if (!cityZoneMap) {
        cityZoneMap = L.map('city-zone-map', {
            center: [27.041086, 33.891272],
            zoom: 11,
            scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(cityZoneMap);

        cityZoneMap.on('click', (e) => {
            addCityZonePoint(e.latlng.lat, e.latlng.lng);
        });
    }

    setTimeout(() => {
        if (cityZoneMap) cityZoneMap.invalidateSize();
    }, 200);
}

function addCityZonePoint(lat, lng) {
    const numLat = Number(Number(lat).toFixed(6));
    const numLng = Number(Number(lng).toFixed(6));

    cityZonePoints.push({ latitude: numLat, longitude: numLng });
    const idx = cityZonePoints.length;

    const marker = L.marker([numLat, numLng], {
        draggable: true,
        icon: createCityVertexIcon(idx)
    }).addTo(cityZoneMap);

    const pointIndex = cityZonePoints.length - 1;
    marker.on('drag', (ev) => {
        const pos = ev.target.getLatLng();
        cityZonePoints[pointIndex] = {
            latitude: Number(pos.lat.toFixed(6)),
            longitude: Number(pos.lng.toFixed(6))
        };
        redrawCityZonePolygon();
    });

    cityZoneMarkers.push(marker);
    redrawCityZonePolygon();
}

function redrawCityZonePolygon() {
    if (!cityZoneMap) return;

    if (cityZonePolygon) {
        cityZoneMap.removeLayer(cityZonePolygon);
        cityZonePolygon = null;
    }

    cityZoneMarkers.forEach((m, idx) => {
        m.setIcon(createCityVertexIcon(idx + 1));
    });

    if (cityZonePoints.length >= 3) {
        const latLngs = cityZonePoints.map(p => [p.latitude, p.longitude]);
        cityZonePolygon = L.polygon(latLngs, {
            color: cityZoneColor,
            weight: 3,
            fillColor: cityZoneColor,
            fillOpacity: 0.35,
        }).addTo(cityZoneMap);
    } else if (cityZonePoints.length === 2) {
        const latLngs = cityZonePoints.map(p => [p.latitude, p.longitude]);
        cityZonePolygon = L.polyline(latLngs, {
            color: cityZoneColor,
            weight: 2,
            dashArray: '5, 5'
        }).addTo(cityZoneMap);
    }

    const input = document.getElementById('city-modal-points');
    if (input) input.value = JSON.stringify(cityZonePoints);

    const badge = document.getElementById('city-zone-points-count');
    const text = document.getElementById('city-zone-status-text');

    if (badge) {
        badge.textContent = `${cityZonePoints.length} نقاط`;
        if (cityZonePoints.length >= 3) {
            badge.className = 'badge badge-success text-[10px]';
        } else {
            badge.className = 'badge bg-slate-200 text-slate-700 text-[10px]';
        }
    }

    if (text) {
        if (cityZonePoints.length === 0) {
            text.textContent = 'انقر على الخريطة لإضافة أول نقطة';
        } else if (cityZonePoints.length < 3) {
            text.textContent = `تم وضع ${cityZonePoints.length} نقطة (أضف ${3 - cityZonePoints.length} نقطة إضافية لتشكيل نطاق مغلق)`;
        } else {
            text.textContent = `تم تشكيل نطاق المدينة بنجاح (${cityZonePoints.length} نقاط) ✅`;
        }
    }
}

function undoLastCityZonePoint() {
    if (cityZonePoints.length === 0) return;
    cityZonePoints.pop();
    const marker = cityZoneMarkers.pop();
    if (marker && cityZoneMap) {
        cityZoneMap.removeLayer(marker);
    }
    redrawCityZonePolygon();
}

function clearCityZone() {
    cityZonePoints = [];
    if (cityZoneMarkers && cityZoneMap) {
        cityZoneMarkers.forEach(m => cityZoneMap.removeLayer(m));
    }
    cityZoneMarkers = [];
    if (cityZonePolygon && cityZoneMap) {
        cityZoneMap.removeLayer(cityZonePolygon);
        cityZonePolygon = null;
    }
    redrawCityZonePolygon();
}

function updateCityZoneColor() {
    const colorInput = document.getElementById('city-modal-color');
    if (colorInput) {
        cityZoneColor = colorInput.value || '#2D4F2E';
        redrawCityZonePolygon();
    }
}

function locateMeOnCityMap() {
    if (!navigator.geolocation) {
        showToast('تحديد الموقع غير مدعوم', 'error');
        return;
    }
    showToast('جاري تحديد موقعك...', 'info');
    navigator.geolocation.getCurrentPosition((pos) => {
        if (cityZoneMap) {
            cityZoneMap.setView([pos.coords.latitude, pos.coords.longitude], 12);
            showToast('تم التوجه إلى موقعك على الخريطة', 'success');
        }
    }, () => {
        showToast('تعذر الحصول على الموقع الجغرافي', 'error');
    });
}

function promptQuickCityCircleZone() {
    const inputRadius = prompt('أدخل نصف قطر الدائرة بالكيلومتر (مثال: 15):', '15');
    if (!inputRadius) return;
    const radiusKm = parseFloat(inputRadius);
    if (isNaN(radiusKm) || radiusKm <= 0) {
        showToast('يرجى إدخال نصف قطر صحيح', 'error');
        return;
    }

    initCityZoneMap();
    if (!cityZoneMap) return;

    const center = cityZoneMap.getCenter();
    const centerLat = center.lat;
    const centerLng = center.lng;

    clearCityZone();

    const numPoints = 16;
    const earthRadius = 6371;

    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 360 / numPoints) * (Math.PI / 180);
        const dLat = (radiusKm / earthRadius) * (180 / Math.PI);
        const dLng = (radiusKm / (earthRadius * Math.cos(centerLat * Math.PI / 180))) * (180 / Math.PI);
        const lat = centerLat + dLat * Math.cos(angle);
        const lng = centerLng + dLng * Math.sin(angle);
        addCityZonePoint(lat, lng);
    }

    if (cityZonePolygon) {
        cityZoneMap.fitBounds(cityZonePolygon.getBounds());
    }
    showToast(`تم رسم دائرة بنصف قطر ${radiusKm} كم بنجاح (${numPoints} نقطة)`, 'success');
}

function goToCityCoordinates() {
    const latInput = document.getElementById('city-nav-latitude');
    const lngInput = document.getElementById('city-nav-longitude');
    if (!latInput || !lngInput) return;

    let latVal = latInput.value.trim();
    let lngVal = lngInput.value.trim();

    const parsed = parseCoordsString(`${latVal}, ${lngVal}`) || parseCoordsString(latVal) || parseCoordsString(lngVal);
    if (parsed) {
        latInput.value = parsed.lat;
        lngInput.value = parsed.lng;
        initCityZoneMap();
        if (cityZoneMap) {
            cityZoneMap.setView([parsed.lat, parsed.lng], 14);
            addMapPulseEffect(cityZoneMap, parsed.lat, parsed.lng);
        }
        showToast(`📍 تم الانتقال لموقع الإحداثيات: ${parsed.lat}, ${parsed.lng}`, 'success');
    } else {
        showToast('يرجى إدخال خط عرض وطول صحيحين', 'error');
    }
}

function addCityPointFromInputs() {
    const latInput = document.getElementById('city-nav-latitude');
    const lngInput = document.getElementById('city-nav-longitude');
    if (!latInput || !lngInput) return;

    let latVal = latInput.value.trim();
    let lngVal = lngInput.value.trim();

    const parsed = parseCoordsString(`${latVal}, ${lngVal}`) || parseCoordsString(latVal) || parseCoordsString(lngVal);
    if (parsed) {
        initCityZoneMap();
        addCityZonePoint(parsed.lat, parsed.lng);
        if (cityZoneMap) {
            cityZoneMap.setView([parsed.lat, parsed.lng], cityZoneMap.getZoom());
        }
        showToast(`✅ تمت إضافة النقطة (${parsed.lat}, ${parsed.lng}) إلى نطاق المدينة`, 'success');
    } else {
        showToast('يرجى إدخال خط عرض وطول صحيحين لإضافة النقطة', 'error');
    }
}

// ─── REGION ZONE MAP (POLYGONS / GEOFENCES) ────────────────────────────────────
let regionZoneMap = null;
let regionZonePoints = []; // [{ latitude, longitude }]
let regionZoneMarkers = [];
let regionZonePolygon = null;
let regionZoneColor = '#2D4F2E';

let regionPreviewMapInstance = null;
let regionPreviewPolygon = null;
let regionPreviewMarkers = [];

function createVertexIcon(index) {
    return L.divIcon({
        className: 'kuba-vertex-icon',
        html: `
            <div style="background-color: ${regionZoneColor}; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.35); cursor: grab;">
                ${index}
            </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function initRegionZoneMap() {
    if (typeof L === 'undefined') return;
    const container = document.getElementById('region-zone-map');
    if (!container) return;

    if (!regionZoneMap) {
        regionZoneMap = L.map('region-zone-map', {
            center: [27.041086, 33.891272],
            zoom: 12,
            scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(regionZoneMap);

        regionZoneMap.on('click', (e) => {
            addRegionZonePoint(e.latlng.lat, e.latlng.lng);
        });
    }

    setTimeout(() => {
        if (regionZoneMap) regionZoneMap.invalidateSize();
    }, 200);
}

function addRegionZonePoint(lat, lng) {
    const numLat = Number(Number(lat).toFixed(6));
    const numLng = Number(Number(lng).toFixed(6));

    regionZonePoints.push({ latitude: numLat, longitude: numLng });
    const idx = regionZonePoints.length;

    const marker = L.marker([numLat, numLng], {
        draggable: true,
        icon: createVertexIcon(idx)
    }).addTo(regionZoneMap);

    const pointIndex = regionZonePoints.length - 1;
    marker.on('drag', (ev) => {
        const pos = ev.target.getLatLng();
        regionZonePoints[pointIndex] = {
            latitude: Number(pos.lat.toFixed(6)),
            longitude: Number(pos.lng.toFixed(6))
        };
        redrawRegionZonePolygon();
    });

    regionZoneMarkers.push(marker);
    redrawRegionZonePolygon();
}

function redrawRegionZonePolygon() {
    if (!regionZoneMap) return;

    if (regionZonePolygon) {
        regionZoneMap.removeLayer(regionZonePolygon);
        regionZonePolygon = null;
    }

    regionZoneMarkers.forEach((m, idx) => {
        m.setIcon(createVertexIcon(idx + 1));
    });

    if (regionZonePoints.length >= 3) {
        const latLngs = regionZonePoints.map(p => [p.latitude, p.longitude]);
        regionZonePolygon = L.polygon(latLngs, {
            color: regionZoneColor,
            weight: 3,
            fillColor: regionZoneColor,
            fillOpacity: 0.35,
        }).addTo(regionZoneMap);
    } else if (regionZonePoints.length === 2) {
        const latLngs = regionZonePoints.map(p => [p.latitude, p.longitude]);
        regionZonePolygon = L.polyline(latLngs, {
            color: regionZoneColor,
            weight: 2,
            dashArray: '5, 5'
        }).addTo(regionZoneMap);
    }

    const input = document.getElementById('region-modal-points');
    if (input) input.value = JSON.stringify(regionZonePoints);

    const badge = document.getElementById('region-zone-points-count');
    const text = document.getElementById('region-zone-status-text');

    if (badge) {
        badge.textContent = `${regionZonePoints.length} نقاط`;
        if (regionZonePoints.length >= 3) {
            badge.className = 'badge badge-success text-[10px]';
        } else {
            badge.className = 'badge bg-slate-200 text-slate-700 text-[10px]';
        }
    }

    if (text) {
        if (regionZonePoints.length === 0) {
            text.textContent = 'انقر على الخريطة لإضافة أول نقطة';
        } else if (regionZonePoints.length < 3) {
            text.textContent = `تم وضع ${regionZonePoints.length} نقطة (أضف ${3 - regionZonePoints.length} نقطة إضافية لتشكيل نطاق مغلق)`;
        } else {
            text.textContent = `تم تشكيل نطاق المنطقة بنجاح (${regionZonePoints.length} نقاط) ✅`;
        }
    }
}

function undoLastRegionZonePoint() {
    if (regionZonePoints.length === 0) return;
    regionZonePoints.pop();
    const marker = regionZoneMarkers.pop();
    if (marker && regionZoneMap) {
        regionZoneMap.removeLayer(marker);
    }
    redrawRegionZonePolygon();
}

function clearRegionZone() {
    regionZonePoints = [];
    if (regionZoneMarkers && regionZoneMap) {
        regionZoneMarkers.forEach(m => regionZoneMap.removeLayer(m));
    }
    regionZoneMarkers = [];
    if (regionZonePolygon && regionZoneMap) {
        regionZoneMap.removeLayer(regionZonePolygon);
        regionZonePolygon = null;
    }
    redrawRegionZonePolygon();
}

function updateRegionZoneColor() {
    const colorInput = document.getElementById('region-modal-color');
    if (colorInput) {
        regionZoneColor = colorInput.value || '#2D4F2E';
        redrawRegionZonePolygon();
    }
}

function locateMeOnRegionMap() {
    if (!navigator.geolocation) {
        showToast('تحديد الموقع غير مدعوم', 'error');
        return;
    }
    showToast('جاري تحديد موقعك...', 'info');
    navigator.geolocation.getCurrentPosition((pos) => {
        if (regionZoneMap) {
            regionZoneMap.setView([pos.coords.latitude, pos.coords.longitude], 12);
            showToast('تم التوجه إلى موقعك على الخريطة', 'success');
        }
    }, () => {
        showToast('تعذر الحصول على الموقع الجغرافي', 'error');
    });
}

function promptQuickCircleZone() {
    const inputRadius = prompt('أدخل نصف قطر الدائرة بالكيلومتر (مثال: 15):', '15');
    if (!inputRadius) return;
    const radiusKm = parseFloat(inputRadius);
    if (isNaN(radiusKm) || radiusKm <= 0) {
        showToast('يرجى إدخال نصف قطر صحيح', 'error');
        return;
    }

    initRegionZoneMap();
    if (!regionZoneMap) return;

    const center = regionZoneMap.getCenter();
    const centerLat = center.lat;
    const centerLng = center.lng;

    clearRegionZone();

    const numPoints = 16;
    const earthRadius = 6371;

    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 360 / numPoints) * (Math.PI / 180);
        const dLat = (radiusKm / earthRadius) * (180 / Math.PI);
        const dLng = (radiusKm / (earthRadius * Math.cos(centerLat * Math.PI / 180))) * (180 / Math.PI);
        const lat = centerLat + dLat * Math.cos(angle);
        const lng = centerLng + dLng * Math.sin(angle);
        addRegionZonePoint(lat, lng);
    }

    if (regionZonePolygon) {
        regionZoneMap.fitBounds(regionZonePolygon.getBounds());
    }
    showToast(`تم رسم دائرة بنصف قطر ${radiusKm} كم بنجاح (${numPoints} نقطة)`, 'success');
}

async function openZonePreviewModal(type, id) {
    const isCity = type === 'city';
    const item = isCity
        ? state.cities.find(c => (c.id || c._id) === id)
        : state.regions.find(r => (r.id || r._id) === id);

    if (!item) return;

    const titlePrefix = isCity ? 'نطاق مدينة' : 'نطاق منطقة';
    document.getElementById('region-zone-preview-title').textContent = `${titlePrefix}: ${item.name}`;
    document.getElementById('region-zone-preview-modal').classList.add('active');

    setTimeout(async () => {
        if (typeof L === 'undefined') return;
        const container = document.getElementById('region-zone-preview-map');
        if (!container) return;

        if (!regionPreviewMapInstance) {
            regionPreviewMapInstance = L.map('region-zone-preview-map', {
                center: [27.041086, 33.891272],
                zoom: 12,
                scrollWheelZoom: true,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(regionPreviewMapInstance);
        }

        regionPreviewMapInstance.invalidateSize();

        if (regionPreviewPolygon) {
            regionPreviewMapInstance.removeLayer(regionPreviewPolygon);
            regionPreviewPolygon = null;
        }
        regionPreviewMarkers.forEach(m => regionPreviewMapInstance.removeLayer(m));
        regionPreviewMarkers = [];

        const points = item.points || [];
        if (points.length >= 3) {
            const latLngs = points.map(p => [p.latitude, p.longitude]);
            regionPreviewPolygon = L.polygon(latLngs, {
                color: item.color || '#2D4F2E',
                weight: 3,
                fillColor: item.color || '#2D4F2E',
                fillOpacity: 0.25,
            }).addTo(regionPreviewMapInstance);

            regionPreviewMapInstance.fitBounds(regionPreviewPolygon.getBounds(), { padding: [25, 25] });
        } else if (item.center && item.center.latitude) {
            regionPreviewMapInstance.setView([item.center.latitude, item.center.longitude], 12);
        }

        // If previewing a city, also display sub-regions boundaries inside it
        if (isCity) {
            const subRegions = state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === id);
            subRegions.forEach(sr => {
                if (Array.isArray(sr.points) && sr.points.length >= 3) {
                    const srLatLngs = sr.points.map(p => [p.latitude, p.longitude]);
                    const srPoly = L.polygon(srLatLngs, {
                        color: sr.color || '#C5A880',
                        weight: 2,
                        dashArray: '3, 3',
                        fillColor: sr.color || '#C5A880',
                        fillOpacity: 0.35,
                    }).addTo(regionPreviewMapInstance);
                    srPoly.bindTooltip(`<b>منطقة: ${sr.name}</b>`, { sticky: true });
                    regionPreviewMarkers.push(srPoly);
                }
            });
        }

        try {
            const endpoint = isCity
                ? `/api/v1/admin/advertisements?city=${id}`
                : `/api/v1/admin/advertisements?region=${id}`;
            const res = await apiFetch(endpoint, { silent: true });
            const ads = res?.data?.advertisements || [];
            document.getElementById('region-zone-preview-ads-count').textContent = `${ads.length} إعلان مرتبط بالنطاق`;

            ads.forEach(ad => {
                if (ad.latitude && ad.longitude) {
                    const pin = L.marker([ad.latitude, ad.longitude], {
                        icon: getAdMarkerIcon() || undefined
                    }).addTo(regionPreviewMapInstance);
                    pin.bindPopup(`<b>${ad.title}</b><br>${ad.location || ''}<br>${ad.price || 0} ج.م`);
                    regionPreviewMarkers.push(pin);
                }
            });
        } catch (_) {}
    }, 250);
}

function openRegionZonePreviewModal(regionId) {
    return openZonePreviewModal('region', regionId);
}

function renderCities() {
    const grid = document.getElementById('cities-grid');
    const badge = document.getElementById('badge-cities-count');
    if (badge) badge.textContent = `${state.cities.length} مدينة`;

    if (!grid) return;

    if (state.cities.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد مدن مضافة حالياً. يمكنك إضافة مدينة جديدة بالضغط على زر "إضافة مدينة جديدة".</div>`;
        return;
    }

    grid.innerHTML = state.cities.map(city => {
        const cityId = city.id || city._id;
        const imgSrc = city.image?.startsWith('http') ? city.image : (city.image ? `/uploads/${city.image}` : 'https://placehold.co/400x250?text=City+Image');
        const isActive = city.active !== false;
        const hasZone = Array.isArray(city.points) && city.points.length >= 3;

        // Sub-regions count
        const subRegions = state.regions.filter(r => {
            const rCityId = r.city ? (r.city._id || r.city.id || r.city) : null;
            return rCityId === cityId;
        });

        const zoneBadge = hasZone ? `
            <button type="button" onclick="openZonePreviewModal('city', '${cityId}')" class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition flex items-center gap-1 cursor-pointer" title="عرض نطاق المدينة">
                <i class="fas fa-draw-polygon text-emerald-600"></i>
                <span>Zone محددة (${city.points.length} نقاط)</span>
            </button>
        ` : `
            <span class="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">بدون نطاق</span>
        `;

        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition group relative flex flex-col justify-between">
                <div>
                    <div class="h-32 w-full rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                        <img src="${imgSrc}" alt="${city.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/400x250?text=City+Image'">
                        <span class="absolute top-2 start-2 badge ${isActive ? 'badge-success' : 'badge-danger'} text-[10px] shadow">
                            ${isActive ? 'نشطة' : 'معطلة'}
                        </span>
                        <span class="absolute bottom-2 start-2 bg-slate-900/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md font-bold shadow flex items-center gap-1">
                            <i class="fas fa-map-location-dot text-amber-400"></i>
                            <span>${subRegions.length} مناطق تابعة</span>
                        </span>
                    </div>
                    <div class="font-bold text-slate-900 text-sm mb-1 flex items-center justify-between">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-city text-[#2D4F2E] text-xs"></i>
                            <span>${city.name}</span>
                        </span>
                        <span class="text-[10px] text-slate-400 font-mono">#${city.order || 0}</span>
                    </div>
                    <div class="mt-1 flex items-center justify-between">
                        ${zoneBadge}
                        <span class="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shadow-sm" style="background-color: ${city.color || '#2D4F2E'}" title="لون النطاق"></span>
                    </div>
                    <div class="text-[10px] text-slate-400 font-mono truncate mt-1" title="ID: ${cityId}">ID: ${cityId}</div>
                </div>

                <div class="space-y-2 pt-3 mt-2 border-t border-slate-100">
                    <button type="button" onclick="filterRegionsByCity('${cityId}')" class="w-full text-xs py-1.5 px-2 bg-[#eaf1ea] hover:bg-[#d8e7d8] text-[#2D4F2E] rounded-lg transition font-medium flex items-center justify-center gap-1.5 cursor-pointer" title="عرض المناطق التابعة لمدينة ${city.name}">
                        <i class="fas fa-map-location-dot"></i>
                        <span>عرض مناطق المدينة (${subRegions.length})</span>
                    </button>
                    <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openAddRegionModal('${cityId}')" class="p-1.5 text-xs text-[#2D4F2E] hover:bg-slate-100 rounded" title="إضافة منطقة داخل هذه المدينة">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                        ${hasZone ? `
                            <button onclick="openZonePreviewModal('city', '${cityId}')" class="p-1.5 text-xs text-emerald-600 hover:bg-emerald-50 rounded" title="عرض النطاق على الخريطة">
                                <i class="fas fa-map-marked-alt"></i>
                            </button>
                        ` : ''}
                        <button onclick="openEditCityModal('${cityId}')" class="p-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded" title="${t('edit')}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteCity('${cityId}')" class="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded" title="${t('delete')}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderRegions() {
    const grid = document.getElementById('regions-grid');
    const badge = document.getElementById('badge-regions-count');

    const filterCityId = document.getElementById('regions-filter-city-select')?.value || state.selectedCityFilter || '';

    const filteredRegions = filterCityId
        ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === filterCityId)
        : state.regions;

    if (badge) badge.textContent = `${filteredRegions.length} منطقة`;

    if (!grid) return;

    if (filteredRegions.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد مناطق مضافة${filterCityId ? ' لهذه المدينة' : ''}. اضغط على "إضافة منطقة جديدة" لإضافة أول منطقة.</div>`;
        return;
    }

    grid.innerHTML = filteredRegions.map(region => {
        const regId = region.id || region._id;
        const imgSrc = region.image?.startsWith('http') ? region.image : (region.image ? `/uploads/${region.image}` : 'https://placehold.co/400x250?text=Region+Image');
        const isActive = region.active !== false;
        const hasZone = Array.isArray(region.points) && region.points.length >= 3;

        // Parent city lookup
        const parentCityId = region.city ? (region.city._id || region.city.id || region.city) : null;
        const parentCity = parentCityId ? state.cities.find(c => (c.id || c._id) === parentCityId) : null;
        const parentCityName = parentCity ? parentCity.name : (region.city?.name || 'بدون مدينة');

        const zoneBadge = hasZone ? `
            <button type="button" onclick="openZonePreviewModal('region', '${regId}')" class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition flex items-center gap-1 cursor-pointer" title="عرض نطاق المنطقة والإعلانات الواقعة داخله">
                <i class="fas fa-draw-polygon text-emerald-600"></i>
                <span>Zone محددة (${region.points.length} نقاط)</span>
            </button>
        ` : `
            <span class="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">بدون نطاق</span>
        `;

        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition group relative flex flex-col justify-between">
                <div>
                    <div class="h-32 w-full rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                        <img src="${imgSrc}" alt="${region.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/400x250?text=Region+Image'">
                        <span class="absolute top-2 start-2 badge ${isActive ? 'badge-success' : 'badge-danger'} text-[10px] shadow">
                            ${isActive ? 'نشطة' : 'معطلة'}
                        </span>
                        <span class="absolute bottom-2 start-2 bg-[#2D4F2E]/90 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md font-semibold shadow flex items-center gap-1">
                            <i class="fas fa-city text-amber-300"></i>
                            <span>${parentCityName}</span>
                        </span>
                    </div>
                    <div class="font-bold text-slate-900 text-sm mb-1 flex items-center justify-between">
                        <span>${region.name}</span>
                        <span class="text-[10px] text-slate-400 font-mono">#${region.order || 0}</span>
                    </div>
                    <div class="mt-1 flex items-center justify-between">
                        ${zoneBadge}
                        <span class="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shadow-sm" style="background-color: ${region.color || '#2D4F2E'}" title="لون النطاق"></span>
                    </div>
                    <div class="text-[10px] text-slate-400 font-mono truncate mt-1" title="ID: ${regId}">ID: ${regId}</div>
                </div>
                <div class="flex items-center justify-end gap-1.5 pt-3 mt-2 border-t border-slate-100">
                    ${hasZone ? `
                        <button onclick="openZonePreviewModal('region', '${regId}')" class="p-1.5 text-xs text-emerald-600 hover:bg-emerald-50 rounded" title="عرض النطاق على الخريطة">
                            <i class="fas fa-map-marked-alt"></i>
                        </button>
                    ` : ''}
                    <button onclick="openEditRegionModal('${regId}')" class="p-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded" title="${t('edit')}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteRegion('${regId}')" class="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded" title="${t('delete')}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ─── CITY MODAL (ADD / EDIT) ──────────────────────────────────────────────────
function openAddCityModal() {
    exitMapFullscreen();
    const navLat = document.getElementById('city-nav-latitude');
    const navLng = document.getElementById('city-nav-longitude');
    if (navLat) navLat.value = '';
    if (navLng) navLng.value = '';
    state.editingCityId = null;
    document.getElementById('city-modal-title').textContent = 'إضافة مدينة جديدة';
    document.getElementById('city-form').reset();
    document.getElementById('city-modal-active').checked = true;
    document.getElementById('city-modal-order').value = state.cities.length;
    document.getElementById('city-modal-preview').innerHTML = '';
    document.getElementById('city-modal-color').value = '#2D4F2E';
    cityZoneColor = '#2D4F2E';

    clearCityZone();
    setTimeout(() => {
        initCityZoneMap();
        if (cityZoneMap) {
            cityZoneMap.invalidateSize();
            cityZoneMap.setView([27.041086, 33.891272], 10);
        }
    }, 250);

    document.getElementById('city-modal').classList.add('active');
}

function openEditCityModal(cityId) {
    exitMapFullscreen();
    const navLat = document.getElementById('city-nav-latitude');
    const navLng = document.getElementById('city-nav-longitude');
    if (navLat) navLat.value = '';
    if (navLng) navLng.value = '';
    const city = state.cities.find(c => (c.id || c._id) === cityId);
    if (!city) return;

    state.editingCityId = cityId;
    document.getElementById('city-modal-title').textContent = `تعديل المدينة: ${city.name}`;
    document.getElementById('city-modal-name').value = city.name || '';
    document.getElementById('city-modal-order').value = city.order || 0;
    document.getElementById('city-modal-active').checked = city.active !== false;

    cityZoneColor = city.color || '#2D4F2E';
    document.getElementById('city-modal-color').value = cityZoneColor;

    clearCityZone();

    const urlInput = document.getElementById('city-modal-image-url');
    if (city.image?.startsWith('http')) {
        urlInput.value = city.image;
    } else {
        urlInput.value = '';
    }

    const preview = document.getElementById('city-modal-preview');
    const imgSrc = city.image?.startsWith('http') ? city.image : (city.image ? `/uploads/${city.image}` : '');
    preview.innerHTML = imgSrc ? `<img src="${imgSrc}" class="h-20 w-auto rounded border border-slate-300 object-cover mt-2">` : '';

    setTimeout(() => {
        initCityZoneMap();
        if (cityZoneMap) {
            cityZoneMap.invalidateSize();
            if (Array.isArray(city.points) && city.points.length > 0) {
                city.points.forEach(p => {
                    addCityZonePoint(p.latitude, p.longitude);
                });
                if (cityZonePolygon) {
                    cityZoneMap.fitBounds(cityZonePolygon.getBounds(), { padding: [25, 25] });
                }
            } else if (city.center && city.center.latitude) {
                cityZoneMap.setView([city.center.latitude, city.center.longitude], 12);
            } else {
                cityZoneMap.setView([27.041086, 33.891272], 10);
            }
        }
    }, 250);

    document.getElementById('city-modal').classList.add('active');
}

async function handleCityFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('city-modal-name').value.trim();
    const order = document.getElementById('city-modal-order').value || 0;
    const active = document.getElementById('city-modal-active').checked;
    const pointsStr = document.getElementById('city-modal-points').value || '[]';
    const color = document.getElementById('city-modal-color').value || '#2D4F2E';
    const imageFile = document.getElementById('city-modal-image-file').files[0];
    const imageUrl = document.getElementById('city-modal-image-url').value.trim();

    if (!name) {
        showToast('يرجى إدخال اسم المدينة', 'error');
        return;
    }

    let payload;

    if (imageFile) {
        payload = new FormData();
        payload.append('name', name);
        payload.append('order', order);
        payload.append('active', active);
        payload.append('points', pointsStr);
        payload.append('color', color);
        payload.append('image', imageFile);
    } else {
        const bodyObj = {
            name,
            order,
            active,
            points: JSON.parse(pointsStr),
            color,
        };
        if (imageUrl) bodyObj.image = imageUrl;
        payload = JSON.stringify(bodyObj);
    }

    try {
        if (state.editingCityId) {
            await apiFetch(`/api/v1/admin/cities/${state.editingCityId}`, {
                method: 'PATCH',
                body: payload,
            });
            showToast('تم تحديث المدينة ونطاقها بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/cities', {
                method: 'POST',
                body: payload,
            });
            showToast('تمت إضافة المدينة ونطاقها بنجاح', 'success');
        }

        closeModal('city-modal');
        loadCitiesAndRegions();
    } catch (err) {}
}

async function deleteCity(cityId) {
    const city = state.cities.find(c => (c.id || c._id) === cityId);
    const childRegions = state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === cityId);
    let msg = `هل أنت متأكد من حذف مدينة "${city?.name || ''}"؟`;
    if (childRegions.length > 0) {
        msg += `\nتنبيه: يوجد ${childRegions.length} منطقة تابعة لهذه المدينة!`;
    }
    if (!confirm(msg)) return;

    try {
        await apiFetch(`/api/v1/admin/cities/${cityId}`, { method: 'DELETE' });
        showToast('تم حذف المدينة بنجاح', 'success');
        loadCitiesAndRegions();
    } catch (err) {}
}

// ─── REGION (AREA) MODAL (ADD / EDIT) ─────────────────────────────────────────
function openAddRegionModal(preselectedCityId) {
    exitMapFullscreen();
    const navLat = document.getElementById('region-nav-latitude');
    const navLng = document.getElementById('region-nav-longitude');
    if (navLat) navLat.value = '';
    if (navLng) navLng.value = '';
    state.editingRegionId = null;
    document.getElementById('region-modal-title').textContent = t('addRegion');
    document.getElementById('region-form').reset();
    document.getElementById('region-modal-active').checked = true;
    document.getElementById('region-modal-order').value = state.regions.length;
    document.getElementById('region-modal-preview').innerHTML = '';
    document.getElementById('region-modal-color').value = '#2D4F2E';
    regionZoneColor = '#2D4F2E';

    populateLocationSelects();

    // Preselect city if provided or currently filtered
    const targetCityId = preselectedCityId || state.selectedCityFilter || (state.cities[0] ? (state.cities[0].id || state.cities[0]._id) : '');
    const citySelect = document.getElementById('region-modal-city');
    if (citySelect && targetCityId) {
        citySelect.value = targetCityId;
    }

    clearRegionZone();
    setTimeout(() => {
        initRegionZoneMap();
        if (regionZoneMap) {
            regionZoneMap.invalidateSize();
            // Center on target city if possible
            const parentCity = state.cities.find(c => (c.id || c._id) === targetCityId);
            if (parentCity && parentCity.center && parentCity.center.latitude) {
                regionZoneMap.setView([parentCity.center.latitude, parentCity.center.longitude], 13);
            } else {
                regionZoneMap.setView([27.041086, 33.891272], 12);
            }
        }
    }, 250);

    document.getElementById('region-modal').classList.add('active');
}

function openEditRegionModal(regionId) {
    exitMapFullscreen();
    const navLat = document.getElementById('region-nav-latitude');
    const navLng = document.getElementById('region-nav-longitude');
    if (navLat) navLat.value = '';
    if (navLng) navLng.value = '';
    const region = state.regions.find(r => (r.id || r._id) === regionId);
    if (!region) return;

    state.editingRegionId = regionId;
    document.getElementById('region-modal-title').textContent = `${t('edit')}: ${region.name}`;
    document.getElementById('region-modal-name').value = region.name || '';
    document.getElementById('region-modal-order').value = region.order || 0;
    document.getElementById('region-modal-active').checked = region.active !== false;

    populateLocationSelects();
    const parentCityId = region.city ? (region.city._id || region.city.id || region.city) : '';
    const citySelect = document.getElementById('region-modal-city');
    if (citySelect) citySelect.value = parentCityId || '';

    regionZoneColor = region.color || '#2D4F2E';
    document.getElementById('region-modal-color').value = regionZoneColor;

    clearRegionZone();

    const urlInput = document.getElementById('region-modal-image-url');
    if (region.image?.startsWith('http')) {
        urlInput.value = region.image;
    } else {
        urlInput.value = '';
    }

    const preview = document.getElementById('region-modal-preview');
    const imgSrc = region.image?.startsWith('http') ? region.image : (region.image ? `/uploads/${region.image}` : '');
    preview.innerHTML = imgSrc ? `<img src="${imgSrc}" class="h-20 w-auto rounded border border-slate-300 object-cover mt-2">` : '';

    setTimeout(() => {
        initRegionZoneMap();
        if (regionZoneMap) {
            regionZoneMap.invalidateSize();
            if (Array.isArray(region.points) && region.points.length > 0) {
                region.points.forEach(p => {
                    addRegionZonePoint(p.latitude, p.longitude);
                });
                if (regionZonePolygon) {
                    regionZoneMap.fitBounds(regionZonePolygon.getBounds(), { padding: [25, 25] });
                }
            } else {
                const parentCity = state.cities.find(c => (c.id || c._id) === parentCityId);
                if (parentCity && parentCity.center && parentCity.center.latitude) {
                    regionZoneMap.setView([parentCity.center.latitude, parentCity.center.longitude], 13);
                } else {
                    regionZoneMap.setView([27.041086, 33.891272], 12);
                }
            }
        }
    }, 250);

    document.getElementById('region-modal').classList.add('active');
}

async function handleRegionFormSubmit(e) {
    e.preventDefault();
    const city = document.getElementById('region-modal-city').value || null;
    const name = document.getElementById('region-modal-name').value.trim();
    const order = document.getElementById('region-modal-order').value || 0;
    const active = document.getElementById('region-modal-active').checked;
    const pointsStr = document.getElementById('region-modal-points').value || '[]';
    const color = document.getElementById('region-modal-color').value || '#2D4F2E';
    const imageFile = document.getElementById('region-modal-image-file').files[0];
    const imageUrl = document.getElementById('region-modal-image-url').value.trim();

    if (!city) {
        showToast('يرجى اختيار المدينة التابعة لها هذه المنطقة', 'error');
        return;
    }

    if (!name) {
        showToast('يرجى إدخال اسم المنطقة', 'error');
        return;
    }

    let payload;

    if (imageFile) {
        payload = new FormData();
        payload.append('city', city);
        payload.append('name', name);
        payload.append('order', order);
        payload.append('active', active);
        payload.append('points', pointsStr);
        payload.append('color', color);
        payload.append('image', imageFile);
    } else {
        const bodyObj = {
            city,
            name,
            order,
            active,
            points: JSON.parse(pointsStr),
            color,
        };
        if (imageUrl) bodyObj.image = imageUrl;
        payload = JSON.stringify(bodyObj);
    }

    try {
        if (state.editingRegionId) {
            await apiFetch(`/api/v1/admin/regions/${state.editingRegionId}`, {
                method: 'PATCH',
                body: payload,
            });
            showToast('تم تحديث المنطقة ونطاقها بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/regions', {
                method: 'POST',
                body: payload,
            });
            showToast('تمت إضافة المنطقة ونطاقها بنجاح', 'success');
        }

        closeModal('region-modal');
        loadCitiesAndRegions();
    } catch (err) {}
}

async function deleteRegion(regionId) {
    if (!confirm(t('confirmDeleteRegion'))) return;

    try {
        await apiFetch(`/api/v1/admin/regions/${regionId}`, { method: 'DELETE' });
        showToast('تم حذف المنطقة بنجاح', 'success');
        loadCitiesAndRegions();
    } catch (err) {}
}

// ─── LOCATION SELECTS POPULATION & CASCADING ──────────────────────────────────
function populateLocationSelects() {
    // 1. Regions filter by city
    const regionFilterCity = document.getElementById('regions-filter-city-select');
    if (regionFilterCity) {
        const curVal = regionFilterCity.value || state.selectedCityFilter || '';
        regionFilterCity.innerHTML = '<option value="">كل المدن</option>' + state.cities.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');
        if (curVal) regionFilterCity.value = curVal;
    }

    // 2. Region Modal parent city
    const regionModalCity = document.getElementById('region-modal-city');
    if (regionModalCity) {
        const curVal = regionModalCity.value;
        regionModalCity.innerHTML = '<option value="">-- اختر المدينة التابعة لها --</option>' + state.cities.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');
        if (curVal) regionModalCity.value = curVal;
    }

    // 3. Ad Filter City
    const adFilterCity = document.getElementById('ad-filter-city');
    if (adFilterCity) {
        const curVal = adFilterCity.value;
        adFilterCity.innerHTML = '<option value="">كل المدن</option>' + state.cities.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');
        if (curVal) adFilterCity.value = curVal;
    }

    // 4. Ad Filter Region (cascaded from adFilterCity)
    const adFilterRegion = document.getElementById('ad-filter-region');
    if (adFilterRegion) {
        const curCityId = adFilterCity?.value || '';
        const curVal = adFilterRegion.value;
        const filtered = curCityId 
            ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === curCityId)
            : state.regions;
        adFilterRegion.innerHTML = '<option value="">كل المناطق</option>' + filtered.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}">${r.name}</option>`;
        }).join('');
        if (curVal && filtered.some(r => (r.id || r._id) === curVal)) {
            adFilterRegion.value = curVal;
        }
    }

    // 5. Ad Modal City
    const adModalCity = document.getElementById('ad-modal-city');
    if (adModalCity) {
        const curVal = adModalCity.value;
        adModalCity.innerHTML = '<option value="">-- اختر المدينة --</option>' + state.cities.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');
        if (curVal) adModalCity.value = curVal;
    }

    // 6. Ad Modal Region (cascaded)
    const adModalRegion = document.getElementById('ad-modal-region');
    if (adModalRegion) {
        const curCityId = adModalCity?.value || '';
        const curVal = adModalRegion.value;
        const filtered = curCityId 
            ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === curCityId)
            : state.regions;
        adModalRegion.innerHTML = '<option value="">-- اختر المنطقة --</option>' + filtered.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}">${r.name}</option>`;
        }).join('');
        if (curVal && filtered.some(r => (r.id || r._id) === curVal)) {
            adModalRegion.value = curVal;
        }
    }

    // 7. Banner Modal City
    const bannerModalCity = document.getElementById('banner-modal-city-select');
    if (bannerModalCity) {
        const curVal = bannerModalCity.value;
        bannerModalCity.innerHTML = '<option value="">-- عام (يظهر لجميع المدن) --</option>' + state.cities.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');
        if (curVal) bannerModalCity.value = curVal;
    }

    // 8. Banner Modal Region (cascaded)
    const bannerModalRegion = document.getElementById('banner-modal-region-select');
    if (bannerModalRegion) {
        const curCityId = bannerModalCity?.value || '';
        const curVal = bannerModalRegion.value;
        const filtered = curCityId 
            ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === curCityId)
            : state.regions;
        bannerModalRegion.innerHTML = '<option value="">-- عام (يظهر لجميع المناطق) --</option>' + filtered.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}">${r.name}</option>`;
        }).join('');
        if (curVal && filtered.some(r => (r.id || r._id) === curVal)) {
            bannerModalRegion.value = curVal;
        }
    }
}

function populateRegionSelects() {
    return populateLocationSelects();
}

function onAdFilterCityChange() {
    const cityId = document.getElementById('ad-filter-city')?.value || '';
    const regionSelect = document.getElementById('ad-filter-region');
    if (regionSelect) {
        const filtered = cityId 
            ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === cityId)
            : state.regions;
        regionSelect.innerHTML = '<option value="">كل المناطق</option>' + filtered.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}">${r.name}</option>`;
        }).join('');
        regionSelect.value = '';
    }
    loadAdvertisementsTab();
}

function onAdModalCityChange() {
    const cityId = document.getElementById('ad-modal-city')?.value || '';
    const regionSelect = document.getElementById('ad-modal-region');
    if (regionSelect) {
        const currentVal = regionSelect.value;
        const filtered = cityId 
            ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === cityId)
            : state.regions;
        regionSelect.innerHTML = '<option value="">-- اختر المنطقة --</option>' + filtered.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}">${r.name}</option>`;
        }).join('');
        if (currentVal && filtered.some(r => (r.id || r._id) === currentVal)) {
            regionSelect.value = currentVal;
        } else {
            regionSelect.value = '';
        }
    }
    if (cityId && adMapInstance && !adMapMarker) {
        const city = state.cities.find(c => (c.id || c._id) === cityId);
        if (city && city.center && city.center.latitude) {
            adMapInstance.setView([city.center.latitude, city.center.longitude], 12);
        }
    }
}

function onBannerModalCityChange() {
    const cityId = document.getElementById('banner-modal-city-select')?.value || '';
    const regionSelect = document.getElementById('banner-modal-region-select');
    if (regionSelect) {
        const currentVal = regionSelect.value;
        const filtered = cityId 
            ? state.regions.filter(r => (r.city?._id || r.city?.id || r.city) === cityId)
            : state.regions;
        regionSelect.innerHTML = '<option value="">-- عام (يظهر لجميع المناطق) --</option>' + filtered.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}">${r.name}</option>`;
        }).join('');
        if (currentVal && filtered.some(r => (r.id || r._id) === currentVal)) {
            regionSelect.value = currentVal;
        } else {
            regionSelect.value = '';
        }
    }
}

// ─── ADVERTISEMENTS MANAGEMENT ───────────────────────────────────────────────

// ─── UNIT TYPES MANAGEMENT ───────────────────────────────────────────────────

async function loadUnitTypes() {
    try {
        const res = await apiFetch('/api/v1/admin/unit-types');
        state.unitTypes = res.data?.unitTypes || [];
        renderUnitTypes();
        populateAdUnitTypeSelect();
    } catch (err) {
        console.error('Error loading unit types:', err);
    }
}

function renderUnitTypes() {
    const grid = document.getElementById('unit-types-grid');
    const badge = document.getElementById('badge-unit-types-count');
    if (badge) badge.textContent = `${state.unitTypes.length} نوع وحدة`;

    if (!grid) return;

    if (state.unitTypes.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد أنواع وحدات مسجلة حالياً. اضغط "إضافة نوع وحدة جديد" لإنشاء الأول.</div>`;
        return;
    }

    grid.innerHTML = state.unitTypes.map(ut => {
        const utId = ut.id || ut._id;
        const isSelected = state.selectedUnitTypeId === utId;
        const pricingUnitsLabels = (ut.pricingUnits || ['per_night']).map(u => {
            return {
                per_night: 'ليلة',
                per_hour: 'ساعة',
                per_day: 'يوم',
                per_trip: 'رحلة',
                fixed: 'ثابت',
            }[u] || u;
        }).join('، ');

        const catsLabels = (ut.categories || []).map(c => c.name || c).join(', ') || 'كل الأقسام';

                const attrCount = (ut.attributesCount !== undefined) ? `${ut.attributesCount} خاصية` : (ut.attributes?.length !== undefined ? `${ut.attributes.length} خاصية` : 'عرض');

                return `
            <div class="card p-4 bg-white border ${isSelected ? 'border-[#2D4F2E] ring-2 ring-[#2D4F2E]/20 shadow-md' : 'border-slate-200'} hover:border-[#2D4F2E] transition flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-slate-400 font-semibold">(${ut.name})</span>
                        <span class="badge ${ut.active ? 'badge-success' : 'badge-danger'} text-[10px]">
                            ${ut.active ? 'نشط' : 'معطل'}
                        </span>
                    </div>

                    <div class="space-y-1.5 text-xs mb-3">
                        <div class="font-bold text-slate-900 text-base">
                            ${ut.nameAr || ut.name}
                        </div>
                        ${ut.description ? `<p class="text-slate-500 line-clamp-2 text-[11px]">${ut.description}</p>` : ''}
                        
                        <div class="pt-2 border-t border-slate-100 space-y-1">
                            <div class="text-[11px] text-slate-600">
                                <span class="text-slate-400">التسعير:</span> <span class="font-medium text-[#2D4F2E]">${pricingUnitsLabels}</span>
                            </div>
                            <div class="text-[11px] text-slate-600 truncate" title="${catsLabels}">
                                <span class="text-slate-400">الأقسام:</span> <span class="font-medium text-slate-700">${catsLabels}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-2 pt-3 border-t border-slate-100">
                    <button onclick="selectUnitTypeForAttributes('${utId}')" class="gold-btn w-full text-xs py-2 flex items-center justify-center gap-1.5 font-bold shadow-xs">
                        <i class="fas fa-sliders-h"></i>
                        <span>إدارة الخصائص</span>
                        <span class="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white font-mono font-bold">${attrCount}</span>
                    </button>
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="openEditUnitTypeModal('${utId}')" class="btn-secondary text-xs py-1 px-2.5">
                            <i class="fas fa-edit text-blue-600 me-1"></i> تعديل
                        </button>
                        <button onclick="deleteUnitType('${utId}')" class="btn-secondary text-xs py-1 px-2.5 hover:text-red-600">
                            <i class="fas fa-trash-alt text-red-600 me-1"></i> حذف
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openAddUnitTypeModal() {
    state.editingUnitTypeId = null;
    document.getElementById('unit-type-modal-title').textContent = 'إضافة نوع وحدة جديد';
    document.getElementById('unit-type-form').reset();
    document.getElementById('unit-type-modal-active').checked = true;

    // Populate categories multi-select
    const catSelect = document.getElementById('unit-type-modal-categories');
    if (catSelect) {
        catSelect.innerHTML = state.categories.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');
    }

    document.getElementById('unit-type-modal').classList.add('active');
}

function openEditUnitTypeModal(utId) {
    const ut = state.unitTypes.find(u => (u.id || u._id) === utId);
    if (!ut) return;

    state.editingUnitTypeId = utId;
    document.getElementById('unit-type-modal-title').textContent = `تعديل نوع الوحدة: ${ut.nameAr || ut.name}`;
    document.getElementById('unit-type-modal-name').value = ut.name || '';
    document.getElementById('unit-type-modal-name-ar').value = ut.nameAr || '';
    document.getElementById('unit-type-modal-description').value = ut.description || '';
    document.getElementById('unit-type-modal-order').value = ut.order || 0;
    document.getElementById('unit-type-modal-default-unit').value = ut.defaultPricingUnit || 'per_night';
    document.getElementById('unit-type-modal-active').checked = ut.active !== false;

    // Populate and select categories
    const catSelect = document.getElementById('unit-type-modal-categories');
    if (catSelect) {
        const assignedCats = (ut.categories || []).map(c => c._id || c.id || c);
        catSelect.innerHTML = state.categories.map(c => {
            const id = c.id || c._id;
            const selected = assignedCats.includes(id) ? 'selected' : '';
            return `<option value="${id}" ${selected}>${c.name}</option>`;
        }).join('');
    }

    // Set pricing units checkboxes
    const units = ut.pricingUnits || ['per_night'];
    document.querySelectorAll('input[name="unit-type-pricing-unit"]').forEach(chk => {
        chk.checked = units.includes(chk.value);
    });

    document.getElementById('unit-type-modal').classList.add('active');
}

async function handleUnitTypeFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('unit-type-modal-name').value.trim();
    const nameAr = document.getElementById('unit-type-modal-name-ar').value.trim();
    const description = document.getElementById('unit-type-modal-description').value.trim();
    const order = document.getElementById('unit-type-modal-order').value || 0;
    const defaultPricingUnit = document.getElementById('unit-type-modal-default-unit').value;
    const active = document.getElementById('unit-type-modal-active').checked;

    // Categories multi-select
    const catSelect = document.getElementById('unit-type-modal-categories');
    const categories = Array.from(catSelect?.selectedOptions || []).map(opt => opt.value);

    // Pricing units
    const pricingUnits = Array.from(document.querySelectorAll('input[name="unit-type-pricing-unit"]:checked')).map(chk => chk.value);

    const payload = {
        name,
        nameAr,
        description,
        categories,
        pricingUnits: pricingUnits.length > 0 ? pricingUnits : ['per_night'],
        defaultPricingUnit,
        order: Number(order),
        active,
    };

    try {
        if (state.editingUnitTypeId) {
            await apiFetch(`/api/v1/admin/unit-types/${state.editingUnitTypeId}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
            });
            showToast('تم تحديث نوع الوحدة بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/unit-types', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            showToast('تمت إضافة نوع الوحدة بنجاح', 'success');
        }

        closeModal('unit-type-modal');
        loadUnitTypes();
    } catch (err) {}
}

async function deleteUnitType(utId) {
    if (!confirm('هل أنت متأكد من رغبتك في حذف نوع الوحدة هذا وكافة خصائصه المرتبطة؟')) return;

    try {
        await apiFetch(`/api/v1/admin/unit-types/${utId}`, { method: 'DELETE' });
        showToast('تم حذف نوع الوحدة بنجاح', 'success');
        if (state.selectedUnitTypeId === utId) {
            hideAttributesSection();
        }
        loadUnitTypes();
    } catch (err) {}
}

// ─── UNIT TYPE ATTRIBUTES MANAGEMENT ─────────────────────────────────────────

let attributesSearchQuery = '';
let attributesTypeFilter = '';
let attributesViewMode = 'table';

async function selectUnitTypeForAttributes(utId) {
    state.selectedUnitTypeId = utId;
    attributesSearchQuery = '';
    attributesTypeFilter = '';

    const ut = state.unitTypes.find(u => (u.id || u._id) === utId);

    // Reset inputs
    const searchInput = document.getElementById('attrs-modal-search');
    if (searchInput) searchInput.value = '';
    const typeFilterEl = document.getElementById('attrs-modal-type-filter');
    if (typeFilterEl) typeFilterEl.value = '';

    // Update modal header
    updateAttributesModalHeader(ut);

    // Open the popup modal
    const modal = document.getElementById('unit-type-attributes-modal');
    if (modal) modal.classList.add('active');

    // Show loading state
    const list = document.getElementById('attributes-list');
    if (list) {
        list.innerHTML = `
            <div class="py-16 text-center text-slate-500">
                <i class="fas fa-circle-notch fa-spin text-3xl text-[#2D4F2E] mb-3"></i>
                <p class="text-sm font-semibold text-slate-700">جاري تحميل خصائص نوع الوحدة...</p>
                <p class="text-xs text-slate-400 mt-1">يرجى الانتظار لحظات</p>
            </div>
        `;
    }

    renderUnitTypes();
    await loadUnitTypeAttributes(utId);
}

function updateAttributesModalHeader(ut) {
    if (!ut) return;
    const nameEl = document.getElementById('attrs-modal-unit-name');
    const enNameEl = document.getElementById('attrs-modal-unit-en-name');
    const statusBadge = document.getElementById('attrs-modal-status-badge');
    const metaEl = document.getElementById('attrs-modal-unit-meta');

    if (nameEl) nameEl.textContent = `إدارة خصائص: ${ut.nameAr || ut.name}`;
    if (enNameEl) {
        enNameEl.textContent = ut.name || '';
        enNameEl.style.display = ut.name ? 'inline-block' : 'none';
    }
    if (statusBadge) {
        statusBadge.className = `badge ${ut.active !== false ? 'badge-success' : 'badge-danger'} text-xs`;
        statusBadge.textContent = ut.active !== false ? 'نشط' : 'معطل';
    }
    if (metaEl) {
        const pricingUnitsLabels = (ut.pricingUnits || ['per_night']).map(u => {
            return {
                per_night: 'ليلة',
                per_hour: 'ساعة',
                per_day: 'يوم',
                per_trip: 'رحلة',
                fixed: 'ثابت',
            }[u] || u;
        }).join('، ');

        const catsLabels = (ut.categories || []).map(c => c.name || c).join(', ') || 'كل الأقسام';

        metaEl.innerHTML = `
            <span class="inline-flex items-center gap-1.5"><i class="fas fa-money-bill-wave text-[#2D4F2E]"></i> وحدات التسعير: <strong class="text-slate-700">${pricingUnitsLabels}</strong></span>
            <span class="text-slate-300">•</span>
            <span class="inline-flex items-center gap-1.5"><i class="fas fa-folder text-slate-400"></i> الأقسام: <strong class="text-slate-700">${catsLabels}</strong></span>
        `;
    }
}

async function loadUnitTypeAttributes(utId) {
    const ut = state.unitTypes.find(u => (u.id || u._id) === utId);
    if (ut) updateAttributesModalHeader(ut);

    try {
        const res = await apiFetch(`/api/v1/admin/unit-types/${utId}/attributes`);
        state.unitTypeAttributes = res.data?.attributes || [];
        renderAttributesList();
    } catch (err) {
        console.error('Error loading attributes:', err);
        const list = document.getElementById('attributes-list');
        if (list) {
            list.innerHTML = `
                <div class="py-16 text-center text-red-500">
                    <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
                    <p class="text-sm font-bold">تعذر تحميل خصائص نوع الوحدة</p>
                    <p class="text-xs text-slate-400 mt-1">تأكد من الاتصال بالخادم ثم حاول مرة أخرى</p>
                    <button onclick="loadUnitTypeAttributes('${utId}')" class="btn-secondary text-xs mt-3">
                        <i class="fas fa-sync-alt me-1"></i> إعادة المحاولة
                    </button>
                </div>
            `;
        }
    }
}

function hideAttributesSection() {
    state.selectedUnitTypeId = null;
    closeModal('unit-type-attributes-modal');
    renderUnitTypes();
}

function filterAttributesList() {
    attributesSearchQuery = document.getElementById('attrs-modal-search')?.value || '';
    attributesTypeFilter = document.getElementById('attrs-modal-type-filter')?.value || '';
    renderAttributesList();
}

function resetAttributesFilter() {
    attributesSearchQuery = '';
    attributesTypeFilter = '';
    const s = document.getElementById('attrs-modal-search');
    if (s) s.value = '';
    const t = document.getElementById('attrs-modal-type-filter');
    if (t) t.value = '';
    renderAttributesList();
}

function setAttributesViewMode(mode) {
    attributesViewMode = mode;
    const btnTable = document.getElementById('btn-attrs-view-table');
    const btnCards = document.getElementById('btn-attrs-view-cards');

    if (mode === 'table') {
        btnTable?.classList.add('bg-[#2D4F2E]', 'text-white');
        btnTable?.classList.remove('text-slate-600');
        btnCards?.classList.remove('bg-[#2D4F2E]', 'text-white');
        btnCards?.classList.add('text-slate-600');
    } else {
        btnCards?.classList.add('bg-[#2D4F2E]', 'text-white');
        btnCards?.classList.remove('text-slate-600');
        btnTable?.classList.remove('bg-[#2D4F2E]', 'text-white');
        btnTable?.classList.add('text-slate-600');
    }

    renderAttributesList();
}

function toggleAttributesModalFullscreen() {
    const container = document.getElementById('unit-type-attributes-modal-container');
    const btn = document.getElementById('btn-toggle-attrs-fullscreen');
    if (!container) return;

    const isFullscreen = container.classList.contains('modal-fullscreen');
    if (isFullscreen) {
        container.classList.remove('modal-fullscreen');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
            btn.title = 'تكبير كصفحة كاملة';
        }
    } else {
        container.classList.add('modal-fullscreen');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
            btn.title = 'تصغير النافذة';
        }
    }
}

function renderAttributesList() {
    const list = document.getElementById('attributes-list');
    const totalCountEl = document.getElementById('attrs-modal-total-count');
    const reqCountEl = document.getElementById('attrs-modal-required-count');
    const filterCountEl = document.getElementById('attrs-modal-filters-count');
    const footerInfoEl = document.getElementById('attrs-modal-footer-info');

    const total = (state.unitTypeAttributes || []).length;
    const requiredTotal = (state.unitTypeAttributes || []).filter(a => a.required).length;
    const filtersTotal = (state.unitTypeAttributes || []).filter(a => a.showInFilters).length;

    if (totalCountEl) totalCountEl.textContent = total;
    if (reqCountEl) reqCountEl.textContent = requiredTotal;
    if (filterCountEl) filterCountEl.textContent = filtersTotal;

    if (!list) return;

    if (total === 0) {
        list.innerHTML = `
            <div class="py-16 px-4 text-center max-w-md mx-auto bg-white rounded-2xl border border-dashed border-slate-300 shadow-xs my-4">
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#eaf1ea] text-[#2D4F2E] flex items-center justify-center text-2xl shadow-sm border border-[#2D4F2E]/20">
                    <i class="fas fa-sliders-h"></i>
                </div>
                <h4 class="text-base font-bold text-slate-800 mb-1.5">لا توجد خصائص مضافة لهذا النوع حتى الآن</h4>
                <p class="text-xs text-slate-500 mb-6 leading-relaxed">
                    الخصائص تتيح لك تخصيص المعلومات التي يجب على المعلن إدخالها عند إضافة وحدة من هذا النوع (مثل: عدد الغرف، السعة، وجود طاقم، إلخ) لتظهر للمستأجرين بشكل منظم وجميل.
                </p>
                <button type="button" onclick="openAddAttributeModal()" class="gold-btn text-xs py-2.5 px-6 inline-flex items-center gap-2 font-bold shadow-md">
                    <i class="fas fa-plus-circle"></i>
                    <span>إضافة أول خاصية الآن</span>
                </button>
            </div>
        `;
        if (footerInfoEl) footerInfoEl.textContent = 'لا توجد خصائص مسجلة بعد';
        return;
    }

    // Filter attributes
    const q = (attributesSearchQuery || '').toLowerCase().trim();
    const typeFilter = attributesTypeFilter || '';

    let items = (state.unitTypeAttributes || []).slice();
    if (typeFilter) {
        items = items.filter(a => a.dataType === typeFilter);
    }
    if (q) {
        items = items.filter(a => {
            const name = (a.name || '').toLowerCase();
            const nameAr = (a.nameAr || '').toLowerCase();
            const key = (a.key || '').toLowerCase();
            const options = (a.options || []).join(' ').toLowerCase();
            return name.includes(q) || nameAr.includes(q) || key.includes(q) || options.includes(q);
        });
    }

    if (footerInfoEl) {
        footerInfoEl.innerHTML = `يتم عرض <strong class="text-slate-800 font-bold">${items.length}</strong> من إجمالي <strong class="text-slate-800 font-bold">${total}</strong> خاصية`;
    }

    if (items.length === 0) {
        list.innerHTML = `
            <div class="py-14 px-4 text-center bg-white rounded-2xl border border-slate-200 shadow-xs my-4">
                <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl">
                    <i class="fas fa-search"></i>
                </div>
                <h4 class="text-sm font-bold text-slate-700 mb-1">لا توجد نتائج مطابقة</h4>
                <p class="text-xs text-slate-400 mb-4">لم نجد أي خاصية تطابق عبارة البحث "${attributesSearchQuery}" أو الفلتر المحدد</p>
                <button type="button" onclick="resetAttributesFilter()" class="btn-secondary text-xs py-1.5 px-4 font-semibold">
                    <i class="fas fa-redo me-1"></i> مسح خيارات البحث
                </button>
            </div>
        `;
        return;
    }

    const dataTypeLabels = {
        string: { label: 'نص (String)', icon: 'fa-font', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
        number: { label: 'رقم (Number)', icon: 'fa-hashtag', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        boolean: { label: 'نعم / لا (Boolean)', icon: 'fa-toggle-on', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
        single_select: { label: 'قائمة اختيار مفرد', icon: 'fa-list-ul', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
        multi_select: { label: 'قائمة اختيار متعدد', icon: 'fa-check-double', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
        date: { label: 'تاريخ (Date)', icon: 'fa-calendar-alt', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    };

    if (attributesViewMode === 'cards') {
        list.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${items.map(attr => {
                    const attrId = attr.id || attr._id;
                    const typeCfg = dataTypeLabels[attr.dataType] || { label: attr.dataType, icon: 'fa-cube', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
                    const hasOptions = (attr.dataType === 'single_select' || attr.dataType === 'multi_select') && attr.options && attr.options.length > 0;

                    return `
                        <div class="bg-white rounded-xl border border-slate-200 hover:border-[#2D4F2E] shadow-xs hover:shadow-md transition p-4 flex flex-col justify-between">
                            <div>
                                <div class="flex items-start justify-between gap-2 mb-3">
                                    <div class="flex items-center gap-2">
                                        <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                                            #${attr.order || 0}
                                        </span>
                                        <div>
                                            <h4 class="font-extrabold text-slate-900 text-sm">${attr.nameAr || attr.name}</h4>
                                            ${attr.nameAr && attr.name ? `<p class="text-[11px] text-slate-400 font-medium">${attr.name}</p>` : ''}
                                        </div>
                                    </div>
                                    ${attr.required 
                                        ? '<span class="badge badge-danger text-[10px] py-0.5 px-2 font-bold">إجباري</span>' 
                                        : '<span class="badge text-[10px] py-0.5 px-2 bg-slate-100 text-slate-500 font-medium">اختياري</span>'
                                    }
                                </div>

                                <div class="space-y-2 mb-3 text-xs">
                                    <div class="flex items-center gap-1.5">
                                        <span class="text-[11px] text-slate-400">الكود البرمجي:</span>
                                        <code class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-50 text-[#2D4F2E] border border-slate-200 select-all font-semibold">
                                            ${attr.key}
                                        </code>
                                    </div>

                                    <div class="flex items-center gap-2 flex-wrap">
                                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${typeCfg.bg} ${typeCfg.text} border ${typeCfg.border}">
                                            <i class="fas ${typeCfg.icon}"></i>
                                            <span>${typeCfg.label}</span>
                                        </span>
                                        ${attr.unit ? `<span class="inline-flex items-center text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">الوحدة: <strong>${attr.unit}</strong></span>` : ''}
                                    </div>

                                    ${attr.defaultValue !== null && attr.defaultValue !== undefined && attr.defaultValue !== '' ? `
                                        <div class="text-[11px] text-slate-500">
                                            <span class="text-slate-400">القيمة الافتراضية:</span>
                                            <span class="font-mono text-slate-700 font-medium">${attr.defaultValue}</span>
                                        </div>
                                    ` : ''}

                                    ${hasOptions ? `
                                        <div class="pt-2 border-t border-slate-100">
                                            <span class="text-[11px] text-slate-400 block mb-1">الخيارات المتاحة (${attr.options.length}):</span>
                                            <div class="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                                                ${attr.options.map(opt => `<span class="px-2 py-0.5 text-[11px] bg-purple-50 text-purple-800 rounded border border-purple-200 font-medium">${opt}</span>`).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>

                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                <div class="flex items-center gap-1">
                                    ${attr.showInFilters ? '<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-sky-50 text-sky-700 border border-sky-200 font-semibold" title="يظهر كفلتر تصفية"><i class="fas fa-filter text-[9px]"></i> فلاتر</span>' : ''}
                                    ${attr.showInDetails !== false ? '<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold" title="يظهر في صفحة التفاصيل"><i class="fas fa-eye text-[9px]"></i> تفاصيل</span>' : ''}
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <button onclick="openEditAttributeModal('${attrId}')" class="btn-secondary text-xs py-1 px-2.5 text-blue-700 hover:bg-blue-50 font-semibold">
                                        <i class="fas fa-edit me-1"></i> تعديل
                                    </button>
                                    <button onclick="deleteAttribute('${attrId}')" class="btn-secondary text-xs py-1 px-2 text-red-600 hover:bg-red-50" title="حذف">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        // Table view (Default)
        list.innerHTML = `
            <div class="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-xs">
                <table class="w-full text-right border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-bold">
                            <th class="py-3 px-4 w-12 text-center">#</th>
                            <th class="py-3 px-4 min-w-[200px]">الخاصية (الاسم والمفتاح البرمجي)</th>
                            <th class="py-3 px-4 min-w-[160px]">نوع البيانات والوحدة</th>
                            <th class="py-3 px-4 min-w-[220px]">الخيارات والقيم المتاحة</th>
                            <th class="py-3 px-4 min-w-[160px]">شروط الظهور</th>
                            <th class="py-3 px-4 w-28 text-center">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-xs">
                        ${items.map(attr => {
                            const attrId = attr.id || attr._id;
                            const typeCfg = dataTypeLabels[attr.dataType] || { label: attr.dataType, icon: 'fa-cube', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
                            const hasOptions = (attr.dataType === 'single_select' || attr.dataType === 'multi_select') && attr.options && attr.options.length > 0;

                            let optionsContent = '';
                            if (hasOptions) {
                                const pills = attr.options.map(opt => `
                                    <span class="inline-block px-2 py-0.5 text-xs bg-purple-50 text-purple-800 rounded-md border border-purple-200 font-medium">
                                        ${opt}
                                    </span>
                                `).join('');
                                optionsContent = `<div class="flex flex-wrap gap-1 max-w-sm">${pills}</div>`;
                            } else if (attr.dataType === 'single_select' || attr.dataType === 'multi_select') {
                                optionsContent = '<span class="text-xs text-amber-600 font-medium"><i class="fas fa-exclamation-triangle me-1"></i> لم تحدد خيارات بعد</span>';
                            } else {
                                optionsContent = '<span class="text-slate-300 text-xs">—</span>';
                            }

                            return `
                                <tr class="hover:bg-slate-50/70 transition group">
                                    <td class="py-3.5 px-4 text-center">
                                        <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs group-hover:bg-[#eaf1ea] group-hover:text-[#2D4F2E] transition">
                                            ${attr.order || 0}
                                        </span>
                                    </td>
                                    <td class="py-3.5 px-4">
                                        <div class="space-y-1">
                                            <div class="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                                                <span>${attr.nameAr || attr.name}</span>
                                                ${attr.nameAr && attr.name ? `<span class="text-xs text-slate-400 font-medium">(${attr.name})</span>` : ''}
                                            </div>
                                            <div class="flex items-center gap-1.5">
                                                <span class="text-[10px] text-slate-400 font-medium">المفتاح:</span>
                                                <code class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-[#2D4F2E] border border-slate-200 select-all font-semibold">
                                                    ${attr.key}
                                                </code>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-3.5 px-4">
                                        <div class="space-y-1.5">
                                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${typeCfg.bg} ${typeCfg.text} border ${typeCfg.border}">
                                                <i class="fas ${typeCfg.icon}"></i>
                                                <span>${typeCfg.label}</span>
                                            </span>
                                            ${attr.unit ? `
                                                <div class="text-[11px] text-slate-600 flex items-center gap-1">
                                                    <span class="text-slate-400">الوحدة:</span>
                                                    <strong class="text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">${attr.unit}</strong>
                                                </div>
                                            ` : ''}
                                            ${attr.defaultValue !== null && attr.defaultValue !== undefined && attr.defaultValue !== '' ? `
                                                <div class="text-[11px] text-slate-500">
                                                    <span class="text-slate-400">افتراضي:</span>
                                                    <span class="font-mono text-slate-700 font-medium">${attr.defaultValue}</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </td>
                                    <td class="py-3.5 px-4">
                                        ${optionsContent}
                                    </td>
                                    <td class="py-3.5 px-4">
                                        <div class="flex flex-wrap gap-1.5">
                                            ${attr.required 
                                                ? '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200"><i class="fas fa-asterisk text-[9px]"></i> إجباري</span>' 
                                                : '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-500">اختياري</span>'
                                            }
                                            ${attr.showInFilters 
                                                ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200" title="يظهر كفلتر تصفية في واجهة البحث"><i class="fas fa-filter text-[10px]"></i> فلتر بحث</span>' 
                                                : ''
                                            }
                                            ${attr.showInDetails !== false 
                                                ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200" title="يظهر في صفحة تفاصيل الإعلان"><i class="fas fa-eye text-[10px]"></i> في التفاصيل</span>' 
                                                : ''
                                            }
                                        </div>
                                    </td>
                                    <td class="py-3.5 px-4 text-center">
                                        <div class="flex items-center justify-center gap-1.5">
                                            <button onclick="openEditAttributeModal('${attrId}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1" title="تعديل الخاصية">
                                                <i class="fas fa-edit"></i>
                                                <span>تعديل</span>
                                            </button>
                                            <button onclick="deleteAttribute('${attrId}')" class="p-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 transition" title="حذف الخاصية">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

function toggleAttributeOptionsInput() {
    const dt = document.getElementById('attr-modal-datatype')?.value;
    const container = document.getElementById('attr-options-container');
    if (!container) return;

    if (dt === 'single_select' || dt === 'multi_select') {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

function openAddAttributeModal() {
    if (!state.selectedUnitTypeId) {
        showToast('يرجى اختيار نوع الوحدة أولاً', 'warning');
        return;
    }

    state.editingAttributeId = null;
    document.getElementById('attribute-modal-title').textContent = 'إضافة خاصية جديدة';
    document.getElementById('attribute-form').reset();
    document.getElementById('attr-modal-unit-type-id').value = state.selectedUnitTypeId;
    document.getElementById('attr-modal-show-details').checked = true;
    document.getElementById('attr-modal-order').value = (state.unitTypeAttributes || []).length;
    toggleAttributeOptionsInput();

    document.getElementById('attribute-modal').classList.add('active');
}

function openEditAttributeModal(attrId) {
    const attr = state.unitTypeAttributes.find(a => (a.id || a._id) === attrId);
    if (!attr) return;

    state.editingAttributeId = attrId;
    document.getElementById('attribute-modal-title').textContent = `تعديل الخاصية: ${attr.nameAr || attr.name}`;
    document.getElementById('attr-modal-name').value = attr.name || '';
    document.getElementById('attr-modal-name-ar').value = attr.nameAr || '';
    document.getElementById('attr-modal-key').value = attr.key || '';
    document.getElementById('attr-modal-datatype').value = attr.dataType || 'string';
    document.getElementById('attr-modal-options').value = (attr.options || []).join(', ');
    document.getElementById('attr-modal-unit').value = attr.unit || '';
    document.getElementById('attr-modal-order').value = attr.order || 0;
    document.getElementById('attr-modal-default').value = attr.defaultValue !== null ? attr.defaultValue : '';
    document.getElementById('attr-modal-required').checked = !!attr.required;
    document.getElementById('attr-modal-show-filters').checked = !!attr.showInFilters;
    document.getElementById('attr-modal-show-details').checked = attr.showInDetails !== false;

    toggleAttributeOptionsInput();
    document.getElementById('attribute-modal').classList.add('active');
}

async function handleAttributeFormSubmit(e) {
    e.preventDefault();
    const unitTypeId = state.selectedUnitTypeId;
    if (!unitTypeId) return;

    const name = document.getElementById('attr-modal-name').value.trim();
    const nameAr = document.getElementById('attr-modal-name-ar').value.trim();
    const key = document.getElementById('attr-modal-key').value.trim();
    const dataType = document.getElementById('attr-modal-datatype').value;
    const optionsStr = document.getElementById('attr-modal-options').value.trim();
    const unit = document.getElementById('attr-modal-unit').value.trim();
    const order = document.getElementById('attr-modal-order').value || 0;
    const defaultValue = document.getElementById('attr-modal-default').value.trim();
    const required = document.getElementById('attr-modal-required').checked;
    const showInFilters = document.getElementById('attr-modal-show-filters').checked;
    const showInDetails = document.getElementById('attr-modal-show-details').checked;

    const options = optionsStr ? optionsStr.split(',').map(s => s.trim()).filter(Boolean) : [];

    const payload = {
        name,
        nameAr,
        key,
        dataType,
        options,
        unit,
        order: Number(order),
        defaultValue: defaultValue || null,
        required,
        showInFilters,
        showInDetails,
    };

    try {
        if (state.editingAttributeId) {
            await apiFetch(`/api/v1/admin/unit-types/${unitTypeId}/attributes/${state.editingAttributeId}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
            });
            showToast('تم تحديث الخاصية بنجاح', 'success');
        } else {
            await apiFetch(`/api/v1/admin/unit-types/${unitTypeId}/attributes`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            showToast('تمت إضافة الخاصية بنجاح', 'success');
        }

        closeModal('attribute-modal');
        await loadUnitTypeAttributes(unitTypeId);
        loadUnitTypes();
    } catch (err) {}
}

async function deleteAttribute(attrId) {
    if (!confirm('هل أنت متأكد من حذف هذه الخاصية؟')) return;

    try {
        await apiFetch(`/api/v1/admin/unit-types/${state.selectedUnitTypeId}/attributes/${attrId}`, {
            method: 'DELETE',
        });
        showToast('تم حذف الخاصية بنجاح', 'success');
        await loadUnitTypeAttributes(state.selectedUnitTypeId);
        loadUnitTypes();
    } catch (err) {}
}

// ─── ADVERTISEMENTS MANAGEMENT ───────────────────────────────────────────────

async function loadAdvertisementsTab() {
    await Promise.all([loadUnitTypes(), loadCategories(), loadCitiesAndRegions()]);

    try {
        const search = document.getElementById('ad-search-input')?.value.trim() || '';
        const city = document.getElementById('ad-filter-city')?.value || '';
        const region = document.getElementById('ad-filter-region')?.value || '';
        const type = document.getElementById('ad-filter-type')?.value || '';
        const active = document.getElementById('ad-filter-active')?.value || '';

        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (city) params.append('city', city);
        if (region) params.append('region', region);
        if (type) params.append('type', type);
        if (active) params.append('active', active);

        const queryStr = params.toString() ? `?${params.toString()}` : '';
        const res = await apiFetch(`/api/v1/admin/advertisements${queryStr}`);
        state.advertisements = res.data?.advertisements || [];
        renderAdvertisementsGrid();
        populateBannerAdSelect();
    } catch (err) {
        console.error('Error loading advertisements:', err);
    }
}

function renderAdvertisementsGrid() {
    const grid = document.getElementById('advertisements-grid');
    if (!grid) return;

    if (state.advertisements.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400 text-xs">لا توجد إعلانات أو وحدات مطابقة للبحث. اضغط "إضافة إعلان جديد" للبدء.</div>`;
        return;
    }

    grid.innerHTML = state.advertisements.map(ad => {
        const adId = ad.id || ad._id;
        const imgSrc = ad.image?.startsWith('http') ? ad.image : (ad.image ? `/uploads/${ad.image}` : 'https://placehold.co/400x250?text=No+Image');
        const isActive = ad.active !== false;

        // Pricing details
        const pricing = ad.pricing || {};
        const finalPrice = pricing.finalPrice || ad.price || 0;
        const basePrice = pricing.basePrice || ad.price || 0;
        const discountType = pricing.discountType || 'none';
        const discountVal = pricing.discountValue || 0;
        const pricingUnit = pricing.pricingUnit || 'per_night';

        const pricingUnitLabel = {
            per_night: '/ ليلة',
            per_hour: '/ ساعة',
            per_day: '/ يوم',
            per_trip: '/ رحلة',
            fixed: 'سعر ثابت',
        }[pricingUnit] || '';

        // Unit Type info
        const ut = ad.unitType;
        const typeName = ut ? (ut.nameAr || ut.name) : (ad.type || 'وحدة');

        // Attributes summary
        const attrs = ad.attributes || {};
        const attrKeys = Object.keys(attrs);
        let attrsHtml = '';
        if (attrKeys.length > 0) {
            attrsHtml = `
                <div class="flex flex-wrap gap-1 pt-1.5 border-t border-slate-100">
                    ${attrKeys.slice(0, 3).map(k => {
                        const val = attrs[k];
                        if (typeof val === 'boolean') {
                            return `<span class="badge text-[9px] bg-slate-100 text-slate-700">${k}: ${val ? 'نعم' : 'لا'}</span>`;
                        }
                        return `<span class="badge text-[9px] bg-slate-100 text-slate-700">${k}: ${val}</span>`;
                    }).join('')}
                    ${attrKeys.length > 3 ? `<span class="text-[9px] text-slate-400 self-center">+${attrKeys.length - 3}</span>` : ''}
                </div>
            `;
        }

        const cityName = ad.city?.name || (state.cities.find(c => (c.id || c._id) === (ad.city?._id || ad.city))?.name || '');
        const regionName = ad.region?.name || (state.regions.find(r => (r.id || r._id) === (ad.region?._id || ad.region))?.name || '');
        const categoryName = ad.category?.name || '';

        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition flex flex-col justify-between group">
                <div>
                    <div class="h-36 w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5 relative">
                        <img src="${imgSrc}" alt="${ad.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/400x250?text=No+Image'">
                        
                        <!-- Unit Type badge -->
                        <span class="absolute top-2 start-2 badge badge-brand text-[10px] shadow">
                            ${typeName}
                        </span>

                        <!-- Active status -->
                        <span class="absolute top-2 end-2 badge ${isActive ? 'badge-success' : 'badge-danger'} text-[10px] shadow">
                            ${isActive ? 'نشط' : 'معطل'}
                        </span>
                    </div>

                    <div class="space-y-1 text-xs">
                        <div class="font-bold text-slate-900 line-clamp-1 text-sm mb-1">${ad.title}</div>
                        
                        <!-- Price display -->
                        <div class="flex items-center justify-between">
                            <span class="text-slate-400">السعر:</span>
                            <div class="text-end">
                                <span class="font-bold text-[#2D4F2E] text-sm">${Number(finalPrice).toLocaleString()} ج.م</span>
                                <span class="text-[10px] text-slate-400">${pricingUnitLabel}</span>
                                ${discountType !== 'none' && basePrice > finalPrice ? `
                                    <div class="text-[10px] text-slate-400 line-through">${Number(basePrice).toLocaleString()} ج.م</div>
                                ` : ''}
                            </div>
                        </div>

                        ${(cityName || regionName) ? `
                            <div class="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium flex-wrap">
                                <i class="fas fa-map-location-dot"></i>
                                ${cityName ? `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold"><i class="fas fa-city me-0.5"></i>${cityName}</span>` : ''}
                                ${regionName ? `<span>${regionName}</span>` : ''}
                            </div>
                        ` : ''}

                        ${ad.location ? `
                            <div class="flex items-center gap-1 text-[11px] text-slate-500 truncate" title="${ad.location}">
                                <i class="fas fa-map-pin text-slate-400"></i>
                                <span class="truncate">${ad.location}</span>
                            </div>
                        ` : ''}

                        ${(ad.latitude !== null && ad.latitude !== undefined && ad.longitude !== null && ad.longitude !== undefined) ? `
                            <div class="flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 px-2 py-1 rounded border border-emerald-200">
                                <div class="flex items-center gap-1 font-mono text-[10px]" title="خط العرض: ${ad.latitude} | خط الطول: ${ad.longitude}">
                                    <i class="fas fa-location-dot text-emerald-600"></i>
                                    <span>${Number(ad.latitude).toFixed(4)}, ${Number(ad.longitude).toFixed(4)}</span>
                                </div>
                                <a href="https://www.google.com/maps?q=${ad.latitude},${ad.longitude}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:text-emerald-900 underline text-[10px] font-bold flex items-center gap-1" title="${t('viewOnMap')}">
                                    <span>${t('viewOnMap')}</span>
                                    <i class="fas fa-arrow-up-right-from-square text-[9px]"></i>
                                </a>
                            </div>
                        ` : ''}

                        ${categoryName ? `
                            <div class="text-[11px] text-slate-400">
                                القسم: <span class="text-slate-700 font-medium">${categoryName}</span>
                            </div>
                        ` : ''}

                        ${attrsHtml}
                    </div>
                </div>

                <!-- Owner Info & Action -->
                <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div class="flex items-center gap-1.5 truncate max-w-[65%]">
                        <i class="fas fa-user-shield text-[#2D4F2E]"></i>
                        ${ad.owner ? `
                            <span class="font-bold text-slate-800 truncate" title="${ad.owner.email || ''}">${ad.owner.name || ad.owner.email || 'صاحب الإعلان'}</span>
                        ` : `
                            <span class="text-amber-600 font-semibold text-[10px]">⚠️ بدون مالك</span>
                        `}
                    </div>
                    <button onclick="openAdOwnerModal('${adId}')" class="text-[10px] text-[#2D4F2E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded font-bold transition flex items-center gap-1 cursor-pointer">
                        <i class="fas fa-user-gear"></i>
                        <span>${ad.owner ? 'إدارة المالك' : 'تعيين مالك'}</span>
                    </button>
                </div>

                <div class="flex items-center justify-between gap-1.5 pt-2 mt-2 border-t border-slate-100">
                    <div>
                        ${(ad.isHotel || ad.type === 'hotel' || ut?.slug === 'hotel' || ut?.slug === 'hotel_room') ? `
                            <button onclick="openHotelRoomsManagementModal('${adId}', '${(ad.title || '').replace(/'/g, "\\'")}')" class="btn-secondary text-xs py-1 px-2.5 bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 font-bold cursor-pointer">
                                <i class="fas fa-door-open text-purple-600 me-1"></i> إدارة الغرف
                            </button>
                        ` : ''}
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button onclick="openEditAdvertisementModal('${adId}')" class="btn-secondary text-xs py-1 px-2.5 cursor-pointer">
                            <i class="fas fa-edit text-blue-600 me-1"></i> ${t('edit')}
                        </button>
                        <button onclick="deleteAdvertisement('${adId}')" class="btn-secondary text-xs py-1 px-2.5 hover:text-red-600 cursor-pointer">
                            <i class="fas fa-trash-alt text-red-600 me-1"></i> ${t('delete')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function populateAdCategorySelect() {
    const select = document.getElementById('ad-modal-category');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '<option value="">-- اختر القسم --</option>' + 
        state.categories.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');

    if (currentVal) select.value = currentVal;
}

function populateAdUnitTypeSelect() {
    const select = document.getElementById('ad-modal-unit-type');
    const filterSelect = document.getElementById('ad-filter-type');

    const optionsHtml = state.unitTypes.map(ut => {
        const id = ut.id || ut._id;
        return `<option value="${id}">${ut.nameAr || ut.name} (${ut.slug})</option>`;
    }).join('');

    if (select) {
        const currentVal = select.value;
        select.innerHTML = '<option value="">-- اختر نوع الوحدة --</option>' + optionsHtml;
        if (currentVal) select.value = currentVal;
    }

    if (filterSelect) {
        const currentFilterVal = filterSelect.value;
        filterSelect.innerHTML = '<option value="">كل الأنواع</option>' + optionsHtml;
        if (currentFilterVal) filterSelect.value = currentFilterVal;
    }
}

async function onAdUnitTypeChanged(existingAttributes = {}) {
    const select = document.getElementById('ad-modal-unit-type');
    const wrapper = document.getElementById('ad-attributes-wrapper');
    const container = document.getElementById('ad-dynamic-attributes-container');
    const pricingUnitSelect = document.getElementById('ad-modal-pricing-unit');

    if (!select || !select.value) {
        if (wrapper) wrapper.classList.add('hidden');
        if (container) container.innerHTML = '';
        return;
    }

    const unitTypeId = select.value;
    const ut = state.unitTypes.find(u => (u.id || u._id) === unitTypeId);

    // Update pricing units dropdown based on unit type's allowed units
    if (ut && pricingUnitSelect) {
        const allowedUnits = ut.pricingUnits || ['per_night'];
        const unitLabels = {
            per_night: 'بالليلة (Per Night)',
            per_hour: 'بالساعة (Per Hour)',
            per_day: 'باليوم (Per Day)',
            per_trip: 'بالرحلة (Per Trip)',
            fixed: 'سعر ثابت (Fixed)',
        };
        pricingUnitSelect.innerHTML = allowedUnits.map(u => `<option value="${u}">${unitLabels[u] || u}</option>`).join('');
        if (ut.defaultPricingUnit && allowedUnits.includes(ut.defaultPricingUnit)) {
            pricingUnitSelect.value = ut.defaultPricingUnit;
        }
    }

    // Fetch attributes of this unit type
    try {
        const res = await apiFetch(`/api/v1/admin/unit-types/${unitTypeId}/attributes`);
        const attrs = res.data?.attributes || [];

        if (attrs.length === 0) {
            if (wrapper) wrapper.classList.add('hidden');
            if (container) container.innerHTML = '';
            return;
        }

        if (wrapper) wrapper.classList.remove('hidden');

        // Render dynamic input controls for each attribute
        container.innerHTML = attrs.map(attr => {
            const key = attr.key;
            const currentVal = existingAttributes[key] !== undefined ? existingAttributes[key] : (attr.defaultValue || '');
            const isReq = attr.required;
            const label = `${attr.nameAr || attr.name} ${isReq ? '*' : ''} ${attr.unit ? `(${attr.unit})` : ''}`;

            let inputHtml = '';

            switch (attr.dataType) {
                case 'boolean': {
                    const isChecked = currentVal === true || currentVal === 'true' || currentVal === 1;
                    inputHtml = `
                        <div class="flex items-center pt-5">
                            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                                <input type="checkbox" name="attr_${key}" ${isChecked ? 'checked' : ''} class="rounded text-[#2D4F2E] focus:ring-[#2D4F2E]">
                                <span>${label}</span>
                            </label>
                        </div>
                    `;
                    break;
                }

                case 'number': {
                    inputHtml = `
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
                            <input type="number" name="attr_${key}" value="${currentVal}" ${isReq ? 'required' : ''} class="form-input text-xs" placeholder="مثال: 4">
                        </div>
                    `;
                    break;
                }

                case 'single_select': {
                    const opts = attr.options || [];
                    inputHtml = `
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
                            <select name="attr_${key}" ${isReq ? 'required' : ''} class="form-select text-xs">
                                <option value="">-- اختر --</option>
                                ${opts.map(o => `<option value="${o}" ${o === currentVal ? 'selected' : ''}>${o}</option>`).join('')}
                            </select>
                        </div>
                    `;
                    break;
                }

                case 'multi_select': {
                    const opts = attr.options || [];
                    const selectedArr = Array.isArray(currentVal) ? currentVal : (currentVal ? String(currentVal).split(',') : []);
                    inputHtml = `
                        <div class="sm:col-span-2">
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${label} (متعدد)</label>
                            <div class="flex flex-wrap gap-2 bg-white p-2 rounded border border-slate-200">
                                ${opts.map(o => `
                                    <label class="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                                        <input type="checkbox" name="attr_${key}[]" value="${o}" ${selectedArr.includes(o) ? 'checked' : ''} class="rounded text-[#2D4F2E]">
                                        <span>${o}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    break;
                }

                case 'date': {
                    const dateStr = currentVal ? new Date(currentVal).toISOString().split('T')[0] : '';
                    inputHtml = `
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
                            <input type="date" name="attr_${key}" value="${dateStr}" ${isReq ? 'required' : ''} class="form-input text-xs">
                        </div>
                    `;
                    break;
                }

                case 'string':
                default: {
                    inputHtml = `
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
                            <input type="text" name="attr_${key}" value="${currentVal}" ${isReq ? 'required' : ''} class="form-input text-xs" placeholder="${attr.nameAr || attr.name}">
                        </div>
                    `;
                    break;
                }
            }

            return inputHtml;
        }).join('');
    } catch (err) {
        console.error('Error fetching unit attributes:', err);
    }
}

function calculateAdFinalPrice() {
    const base = Number(document.getElementById('ad-modal-base-price')?.value) || 0;
    const discountType = document.getElementById('ad-modal-discount-type')?.value || 'none';
    const discountVal = Number(document.getElementById('ad-modal-discount-value')?.value) || 0;

    let final = base;
    if (discountType === 'percentage') {
        const pct = Math.min(100, Math.max(0, discountVal));
        final = Math.max(0, base - (base * pct) / 100);
    } else if (discountType === 'fixed') {
        final = Math.max(0, base - discountVal);
    }

    final = Math.round(final * 100) / 100;

    const finalInput = document.getElementById('ad-modal-final-price');
    if (finalInput) finalInput.value = final;

    const summaryBadge = document.getElementById('ad-pricing-summary-badge');
    if (summaryBadge) summaryBadge.textContent = `السعر النهائي: ${final.toLocaleString()} ج.م`;
}

// ─── ADVERTISEMENT MAP PICKER ─────────────────────────────────────────────────
let adMapInstance = null;
let adMapMarker = null;

function getAdMarkerIcon() {
    if (typeof L === 'undefined') return null;
    return L.divIcon({
        className: 'kuba-map-marker-icon',
        html: `
            <div style="transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; cursor: pointer;">
                <div style="background-color: #2D4F2E; color: white; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2px solid #ffffff;">
                    <i class="fas fa-location-dot" style="transform: rotate(45deg); font-size: 15px; color: #ffffff;"></i>
                </div>
                <div style="width: 10px; height: 4px; background: rgba(0,0,0,0.35); border-radius: 50%; margin-top: 1px; filter: blur(0.5px);"></div>
            </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
}

let adMapRegionLayers = [];

function drawRegionZonesOnAdMap() {
    if (!adMapInstance) return;

    adMapRegionLayers.forEach(l => adMapInstance.removeLayer(l));
    adMapRegionLayers = [];

    // Draw City zones
    if (Array.isArray(state.cities)) {
        state.cities.forEach(c => {
            if (c.active !== false && Array.isArray(c.points) && c.points.length >= 3) {
                const latLngs = c.points.map(p => [p.latitude, p.longitude]);
                const poly = L.polygon(latLngs, {
                    color: c.color || '#2D4F2E',
                    weight: 3,
                    fillColor: c.color || '#2D4F2E',
                    fillOpacity: 0.12,
                }).addTo(adMapInstance);

                poly.bindTooltip(`<b>مدينة: ${c.name}</b>`, { sticky: true });
                adMapRegionLayers.push(poly);
            }
        });
    }

    // Draw Region zones
    if (Array.isArray(state.regions)) {
        state.regions.forEach(r => {
            if (r.active !== false && Array.isArray(r.points) && r.points.length >= 3) {
                const latLngs = r.points.map(p => [p.latitude, p.longitude]);
                const poly = L.polygon(latLngs, {
                    color: r.color || '#2D4F2E',
                    weight: 2,
                    dashArray: '4, 4',
                    fillColor: r.color || '#2D4F2E',
                    fillOpacity: 0.20,
                }).addTo(adMapInstance);

                poly.bindTooltip(`<b>منطقة: ${r.name}</b>`, { sticky: true });
                adMapRegionLayers.push(poly);
            }
        });
    }
}

function initAdMapPicker() {
    if (typeof L === 'undefined') {
        console.warn('Leaflet is not available yet.');
        return;
    }
    const container = document.getElementById('ad-map-picker');
    if (!container) return;

    if (!adMapInstance) {
        adMapInstance = L.map('ad-map-picker', {
            center: [27.041086, 33.891272],
            zoom: 12,
            scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(adMapInstance);

        adMapInstance.on('click', (e) => {
            setAdMapCoordinates(e.latlng.lat, e.latlng.lng, false);
        });
    }

    setTimeout(() => {
        if (adMapInstance) {
            adMapInstance.invalidateSize();
            drawRegionZonesOnAdMap();
        }
    }, 200);
}

function setAdMapCoordinates(lat, lng, panTo = true) {
    if (typeof L === 'undefined') return;
    initAdMapPicker();
    if (!adMapInstance) return;

    const numLat = Number(Number(lat).toFixed(6));
    const numLng = Number(Number(lng).toFixed(6));

    const latInput = document.getElementById('ad-modal-latitude');
    const lngInput = document.getElementById('ad-modal-longitude');
    if (latInput) latInput.value = numLat;
    if (lngInput) lngInput.value = numLng;

    const badge = document.getElementById('ad-map-coords-badge');
    const badgeText = document.getElementById('ad-map-coords-text');
    if (badge && badgeText) {
        badgeText.textContent = `${numLat}, ${numLng}`;
        badge.classList.remove('hidden');
    }

    // Auto-detect matching city zone if ad is placed inside a city zone!
    const matchedCity = findCityForPointClient(numLat, numLng, state.cities);
    const citySelect = document.getElementById('ad-modal-city');
    if (matchedCity && citySelect) {
        const cityId = matchedCity.id || matchedCity._id;
        if (citySelect.value !== cityId) {
            citySelect.value = cityId;
            onAdModalCityChange();
        }
    }

    // Auto-detect matching region zone if ad is placed inside a region zone!
    const matchedRegion = findRegionForPointClient(numLat, numLng, state.regions);
    const regionSelect = document.getElementById('ad-modal-region');
    if (matchedRegion && regionSelect) {
        const targetId = matchedRegion.id || matchedRegion._id;
        if (regionSelect.value !== targetId) {
            regionSelect.value = targetId;
            showToast(`📍 تم تحديد منطقة "${matchedRegion.name}" تلقائياً لوقوع الإعلان داخل نطاقها الجغرافي!`, 'info');
        }
    }

    const icon = getAdMarkerIcon();

    if (adMapMarker) {
        adMapMarker.setLatLng([numLat, numLng]);
    } else {
        adMapMarker = L.marker([numLat, numLng], {
            icon: icon,
            draggable: true,
        }).addTo(adMapInstance);

        adMapMarker.on('dragend', () => {
            const pos = adMapMarker.getLatLng();
            setAdMapCoordinates(pos.lat, pos.lng, false);
        });
    }

    if (panTo) {
        adMapInstance.setView([numLat, numLng], Math.max(adMapInstance.getZoom(), 14));
    }
}

function clearAdCoordinates() {
    const latInput = document.getElementById('ad-modal-latitude');
    const lngInput = document.getElementById('ad-modal-longitude');
    if (latInput) latInput.value = '';
    if (lngInput) lngInput.value = '';

    const badge = document.getElementById('ad-map-coords-badge');
    if (badge) badge.classList.add('hidden');

    if (adMapMarker && adMapInstance) {
        adMapInstance.removeLayer(adMapMarker);
        adMapMarker = null;
    }
}

function onAdCoordinateInput() {
    const latVal = document.getElementById('ad-modal-latitude')?.value;
    const lngVal = document.getElementById('ad-modal-longitude')?.value;

    if (!latVal && !lngVal) {
        clearAdCoordinates();
        return;
    }

    const lat = parseFloat(latVal);
    const lng = parseFloat(lngVal);

    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        setAdMapCoordinates(lat, lng, true);
    }
}

function getCurrentLocationForAd() {
    if (!navigator.geolocation) {
        showToast('خاصية تحديد الموقع الجغرافي غير مدعومة في متصفحك', 'error');
        return;
    }
    showToast('جاري تحديد موقعك الجغرافي الحالي...', 'info');
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            setAdMapCoordinates(latitude, longitude, true);
            showToast('تم تحديد الموقع بنجاح على الخريطة', 'success');
        },
        (err) => {
            console.error('Geolocation error:', err);
            showToast('تعذر الحصول على الموقع الجغرافي. تأكد من تفعيل صلاحية الموقع للمتصفح.', 'error');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

let activeMapPulseCircle = null;
let currentFullscreenMapType = null;

function parseCoordsString(str) {
    if (!str || typeof str !== 'string') return null;
    const cleaned = str.trim().replace(/[^\d.,\s-]/g, ' ');
    const parts = cleaned.split(/[\s,]+/).filter(Boolean).map(Number);
    if (parts.length >= 2) {
        const lat = parts[0];
        const lng = parts[1];
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            return { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) };
        }
    }
    return null;
}

function handleAdCoordPaste(e) {
    const text = (e.clipboardData || window.clipboardData)?.getData('text');
    if (!text) return;
    const parsed = parseCoordsString(text);
    if (parsed) {
        e.preventDefault();
        const latInput = document.getElementById('ad-modal-latitude');
        const lngInput = document.getElementById('ad-modal-longitude');
        if (latInput) latInput.value = parsed.lat;
        if (lngInput) lngInput.value = parsed.lng;
        initAdMapPicker();
        setAdMapCoordinates(parsed.lat, parsed.lng, true);
        if (adMapInstance) {
            adMapInstance.setView([parsed.lat, parsed.lng], 15);
            addMapPulseEffect(adMapInstance, parsed.lat, parsed.lng);
        }
        showToast(`📍 تم لصق وتثبيت الإحداثيات: ${parsed.lat}, ${parsed.lng}`, 'success');
    }
}

function applyAdCoordinatesFromInputs() {
    const latInput = document.getElementById('ad-modal-latitude');
    const lngInput = document.getElementById('ad-modal-longitude');
    if (!latInput || !lngInput) return;

    let latVal = latInput.value.trim();
    let lngVal = lngInput.value.trim();

    const parsed = parseCoordsString(`${latVal}, ${lngVal}`) || parseCoordsString(latVal) || parseCoordsString(lngVal);
    if (parsed) {
        latInput.value = parsed.lat;
        lngInput.value = parsed.lng;
        initAdMapPicker();
        setAdMapCoordinates(parsed.lat, parsed.lng, true);
        if (adMapInstance) {
            adMapInstance.setView([parsed.lat, parsed.lng], 15);
            addMapPulseEffect(adMapInstance, parsed.lat, parsed.lng);
        }
        showToast(`📍 تم تثبيت المؤشر على الإحداثيات: ${parsed.lat}, ${parsed.lng}`, 'success');
    } else {
        showToast('يرجى إدخال خط عرض وطول صحيحين (مثال: 30.044420 و 31.235712)', 'error');
    }
}

function handleRegionCoordPaste(e) {
    const text = (e.clipboardData || window.clipboardData)?.getData('text');
    if (!text) return;
    const parsed = parseCoordsString(text);
    if (parsed) {
        e.preventDefault();
        const latInput = document.getElementById('region-nav-latitude');
        const lngInput = document.getElementById('region-nav-longitude');
        if (latInput) latInput.value = parsed.lat;
        if (lngInput) lngInput.value = parsed.lng;
        initRegionZoneMap();
        if (regionZoneMap) {
            regionZoneMap.setView([parsed.lat, parsed.lng], 14);
            addMapPulseEffect(regionZoneMap, parsed.lat, parsed.lng);
        }
        showToast(`📍 تم لصق الإحداثيات والانتقال للموقع: ${parsed.lat}, ${parsed.lng}`, 'success');
    }
}

function goToRegionCoordinates() {
    const latInput = document.getElementById('region-nav-latitude');
    const lngInput = document.getElementById('region-nav-longitude');
    if (!latInput || !lngInput) return;

    let latVal = latInput.value.trim();
    let lngVal = lngInput.value.trim();

    const parsed = parseCoordsString(`${latVal}, ${lngVal}`) || parseCoordsString(latVal) || parseCoordsString(lngVal);
    if (parsed) {
        latInput.value = parsed.lat;
        lngInput.value = parsed.lng;
        initRegionZoneMap();
        if (regionZoneMap) {
            regionZoneMap.setView([parsed.lat, parsed.lng], 14);
            addMapPulseEffect(regionZoneMap, parsed.lat, parsed.lng);
        }
        showToast(`📍 تم الانتقال لموقع الإحداثيات: ${parsed.lat}, ${parsed.lng}`, 'success');
    } else {
        showToast('يرجى إدخال خط عرض وطول صحيحين (مثال: 27.864442 و 34.295447)', 'error');
    }
}

function addRegionPointFromInputs() {
    const latInput = document.getElementById('region-nav-latitude');
    const lngInput = document.getElementById('region-nav-longitude');
    if (!latInput || !lngInput) return;

    let latVal = latInput.value.trim();
    let lngVal = lngInput.value.trim();

    const parsed = parseCoordsString(`${latVal}, ${lngVal}`) || parseCoordsString(latVal) || parseCoordsString(lngVal);
    if (parsed) {
        initRegionZoneMap();
        addRegionZonePoint(parsed.lat, parsed.lng);
        if (regionZoneMap) {
            regionZoneMap.setView([parsed.lat, parsed.lng], regionZoneMap.getZoom());
        }
        showToast(`✅ تمت إضافة النقطة (${parsed.lat}, ${parsed.lng}) إلى نطاق المنطقة`, 'success');
    } else {
        showToast('يرجى إدخال خط عرض وطول صحيحين لإضافة النقطة', 'error');
    }
}

function addMapPulseEffect(map, lat, lng) {
    if (!map || typeof L === 'undefined') return;
    if (activeMapPulseCircle) {
        try { map.removeLayer(activeMapPulseCircle); } catch (_) {}
        activeMapPulseCircle = null;
    }

    activeMapPulseCircle = L.circle([lat, lng], {
        radius: 350,
        color: '#2D4F2E',
        fillColor: '#2D4F2E',
        fillOpacity: 0.25,
        weight: 2
    }).addTo(map);

    setTimeout(() => {
        if (activeMapPulseCircle) {
            try { map.removeLayer(activeMapPulseCircle); } catch (_) {}
            activeMapPulseCircle = null;
        }
    }, 3500);
}

function toggleMapFullscreen(type) {
    const boxId = type === 'ad' ? 'ad-map-box' : (type === 'city' ? 'city-map-box' : (type === 'region' ? 'region-map-box' : 'preview-map-box'));
    const btnId = type === 'ad' ? 'ad-map-fullscreen-btn' : (type === 'city' ? 'city-map-fullscreen-btn' : (type === 'region' ? 'region-map-fullscreen-btn' : 'preview-map-fullscreen-btn'));
    const textId = type === 'ad' ? 'ad-map-fullscreen-text' : (type === 'city' ? 'city-map-fullscreen-text' : (type === 'region' ? 'region-map-fullscreen-text' : 'preview-map-fullscreen-text'));

    const box = document.getElementById(boxId);
    const btn = document.getElementById(btnId);
    const text = document.getElementById(textId);
    if (!box) return;

    let targetMap = null;
    if (type === 'ad') {
        initAdMapPicker();
        targetMap = adMapInstance;
    } else if (type === 'city') {
        initCityZoneMap();
        targetMap = cityZoneMap;
    } else if (type === 'region') {
        initRegionZoneMap();
        targetMap = regionZoneMap;
    } else if (type === 'preview') {
        targetMap = regionPreviewMapInstance;
    }

    const isFullscreen = box.classList.contains('kuba-map-fullscreen');

    if (isFullscreen) {
        exitMapFullscreen();
    } else {
        if (currentFullscreenMapType) {
            exitMapFullscreen();
        }

        box.classList.add('kuba-map-fullscreen');
        currentFullscreenMapType = type;

        if (btn) {
            btn.classList.add('bg-slate-800', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-700');
            const icon = btn.querySelector('i');
            if (icon) icon.className = 'fas fa-compress';
        }
        if (text) text.textContent = 'تصغير الخريطة (Esc)';

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (targetMap) targetMap.invalidateSize();
        }, 80);
        setTimeout(() => {
            if (targetMap) targetMap.invalidateSize();
        }, 250);

        showToast('اضغط Esc أو زر التصغير للرجوع للحجم الطبيعي', 'info');
    }
}

function exitMapFullscreen() {
    if (!currentFullscreenMapType) return;
    const type = currentFullscreenMapType;
    const boxId = type === 'ad' ? 'ad-map-box' : (type === 'city' ? 'city-map-box' : (type === 'region' ? 'region-map-box' : 'preview-map-box'));
    const btnId = type === 'ad' ? 'ad-map-fullscreen-btn' : (type === 'city' ? 'city-map-fullscreen-btn' : (type === 'region' ? 'region-map-fullscreen-btn' : 'preview-map-fullscreen-btn'));
    const textId = type === 'ad' ? 'ad-map-fullscreen-text' : (type === 'city' ? 'city-map-fullscreen-text' : (type === 'region' ? 'region-map-fullscreen-text' : 'preview-map-fullscreen-text'));

    const box = document.getElementById(boxId);
    const btn = document.getElementById(btnId);
    const text = document.getElementById(textId);

    if (box) box.classList.remove('kuba-map-fullscreen');

    if (btn) {
        btn.classList.remove('bg-slate-800');
        if (type === 'ad' || type === 'city' || type === 'region') {
            btn.classList.add('bg-[#2D4F2E]', 'text-white');
        } else {
            btn.classList.add('bg-white', 'text-slate-700');
        }
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-expand';
    }
    if (text) text.textContent = 'ملء الشاشة';

    document.body.style.overflow = '';
    currentFullscreenMapType = null;

    let targetMap = null;
    if (type === 'ad') targetMap = adMapInstance;
    else if (type === 'city') targetMap = cityZoneMap;
    else if (type === 'region') targetMap = regionZoneMap;
    else if (type === 'preview') targetMap = regionPreviewMapInstance;

    setTimeout(() => {
        if (targetMap) targetMap.invalidateSize();
    }, 80);
    setTimeout(() => {
        if (targetMap) targetMap.invalidateSize();
    }, 250);
}

function toggleMapHeight(type) {
    const mapId = type === 'ad' ? 'ad-map-picker' : (type === 'city' ? 'city-zone-map' : 'region-zone-map');
    const textId = type === 'ad' ? 'ad-map-height-text' : (type === 'city' ? 'city-map-height-text' : 'region-map-height-text');
    const mapEl = document.getElementById(mapId);
    const text = document.getElementById(textId);
    if (!mapEl) return;

    let targetMap = type === 'ad' ? adMapInstance : (type === 'city' ? cityZoneMap : regionZoneMap);

    const isTall = mapEl.classList.contains('kuba-map-tall');
    if (isTall) {
        mapEl.classList.remove('kuba-map-tall');
        if (text) text.textContent = 'توسيع';
    } else {
        mapEl.classList.add('kuba-map-tall');
        if (text) text.textContent = 'تقليص';
    }

    setTimeout(() => {
        if (targetMap) targetMap.invalidateSize();
    }, 120);
    setTimeout(() => {
        if (targetMap) targetMap.invalidateSize();
    }, 280);
}

function openAddAdvertisementModal() {
    exitMapFullscreen();
    state.editingAdvertisementId = null;
    document.getElementById('advertisement-modal-title').textContent = t('addAdvertisement');
    document.getElementById('advertisement-form').reset();
    document.getElementById('ad-modal-active').checked = true;
    document.getElementById('ad-modal-preview').innerHTML = '';

    populateLocationSelects();
    populateAdCategorySelect();
    populateAdUnitTypeSelect();
    populateAdOwnerSelect('');

    // Reset dynamic attributes
    document.getElementById('ad-attributes-wrapper')?.classList.add('hidden');
    document.getElementById('ad-dynamic-attributes-container').innerHTML = '';
    calculateAdFinalPrice();

    // Reset coordinates and map picker
    clearAdCoordinates();
    setTimeout(() => {
        initAdMapPicker();
        if (adMapInstance) {
            adMapInstance.invalidateSize();
            adMapInstance.setView([27.041086, 33.891272], 11);
        }
    }, 250);

    document.getElementById('advertisement-modal').classList.add('active');
}

async function openEditAdvertisementModal(adId) {
    exitMapFullscreen();
    const ad = state.advertisements.find(a => (a.id || a._id) === adId);
    if (!ad) return;

    state.editingAdvertisementId = adId;
    document.getElementById('advertisement-modal-title').textContent = `${t('edit')}: ${ad.title}`;

    populateLocationSelects();
    populateAdCategorySelect();
    populateAdUnitTypeSelect();
    populateAdOwnerSelect(ad.owner?._id || ad.owner?.id || ad.owner || '');

    document.getElementById('ad-modal-title').value = ad.title || '';
    document.getElementById('ad-modal-location').value = ad.location || '';
    document.getElementById('ad-modal-address').value = ad.address || '';
    document.getElementById('ad-modal-description').value = ad.description || '';
    document.getElementById('ad-modal-active').checked = ad.active !== false;

    // Populate and sync coordinates with map picker
    const hasValidCoords = ad.latitude !== null && ad.latitude !== undefined && !isNaN(Number(ad.latitude)) &&
                           ad.longitude !== null && ad.longitude !== undefined && !isNaN(Number(ad.longitude));

    if (hasValidCoords) {
        document.getElementById('ad-modal-latitude').value = Number(ad.latitude);
        document.getElementById('ad-modal-longitude').value = Number(ad.longitude);
    } else {
        document.getElementById('ad-modal-latitude').value = '';
        document.getElementById('ad-modal-longitude').value = '';
    }

    setTimeout(() => {
        initAdMapPicker();
        if (adMapInstance) {
            adMapInstance.invalidateSize();
            if (hasValidCoords) {
                setAdMapCoordinates(Number(ad.latitude), Number(ad.longitude), true);
                adMapInstance.setView([Number(ad.latitude), Number(ad.longitude)], 14);
            } else {
                clearAdCoordinates();
                adMapInstance.setView([27.041086, 33.891272], 11);
            }
        }
    }, 250);

    const cityId = ad.city ? (ad.city._id || ad.city.id || ad.city) : '';
    const citySelect = document.getElementById('ad-modal-city');
    if (citySelect) {
        citySelect.value = cityId || '';
        onAdModalCityChange();
    }

    const regId = ad.region ? (ad.region._id || ad.region.id || ad.region) : '';
    const regSelect = document.getElementById('ad-modal-region');
    if (regSelect) regSelect.value = regId || '';

    const catId = ad.category ? (ad.category._id || ad.category.id || ad.category) : '';
    document.getElementById('ad-modal-category').value = catId || '';

    // Unit Type
    const utId = ad.unitType ? (ad.unitType._id || ad.unitType.id || ad.unitType) : '';
    const utSelect = document.getElementById('ad-modal-unit-type');
    if (utSelect && utId) {
        utSelect.value = utId;
    }

    // Pricing
    const p = ad.pricing || {};
    document.getElementById('ad-modal-base-price').value = p.basePrice || ad.price || '';
    document.getElementById('ad-modal-discount-type').value = p.discountType || 'none';
    document.getElementById('ad-modal-discount-value').value = p.discountValue || 0;
    document.getElementById('ad-modal-pricing-unit').value = p.pricingUnit || 'per_night';
    document.getElementById('ad-modal-min-duration').value = p.minDuration || 1;
    calculateAdFinalPrice();

    // Trigger dynamic attributes with existing values
    if (utId) {
        await onAdUnitTypeChanged(ad.attributes || {});
    }

    const urlInput = document.getElementById('ad-modal-image-url');
    if (ad.image?.startsWith('http')) {
        urlInput.value = ad.image;
    } else {
        urlInput.value = '';
    }

    const preview = document.getElementById('ad-modal-preview');
    const imgSrc = ad.image?.startsWith('http') ? ad.image : (ad.image ? `/uploads/${ad.image}` : '');
    preview.innerHTML = imgSrc ? `<img src="${imgSrc}" class="h-24 w-auto rounded border border-slate-300 object-cover mt-2">` : '';

    document.getElementById('advertisement-modal').classList.add('active');
}

async function handleAdvertisementFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('ad-modal-title').value.trim();
    const category = document.getElementById('ad-modal-category').value || null;
    const unitType = document.getElementById('ad-modal-unit-type').value || null;
    const city = document.getElementById('ad-modal-city')?.value || null;
    const region = document.getElementById('ad-modal-region')?.value || null;

    const basePrice = document.getElementById('ad-modal-base-price').value || 0;
    const discountType = document.getElementById('ad-modal-discount-type').value || 'none';
    const discountValue = document.getElementById('ad-modal-discount-value').value || 0;
    const pricingUnit = document.getElementById('ad-modal-pricing-unit').value || 'per_night';
    const minDuration = document.getElementById('ad-modal-min-duration').value || 1;

    const location = document.getElementById('ad-modal-location').value.trim();
    const address = document.getElementById('ad-modal-address').value.trim();
    const latVal = document.getElementById('ad-modal-latitude')?.value?.trim();
    const lngVal = document.getElementById('ad-modal-longitude')?.value?.trim();
    const latitude = (latVal !== '' && latVal !== undefined && !isNaN(Number(latVal))) ? Number(latVal) : null;
    const longitude = (lngVal !== '' && lngVal !== undefined && !isNaN(Number(lngVal))) ? Number(lngVal) : null;

    const description = document.getElementById('ad-modal-description').value.trim();
    const active = document.getElementById('ad-modal-active').checked;
    const owner = document.getElementById('ad-modal-owner')?.value || null;
    const imageFile = document.getElementById('ad-modal-image-file').files[0];
    const imageUrl = document.getElementById('ad-modal-image-url').value.trim();

    if (!title) {
        showToast('يرجى إدخال عنوان الإعلان', 'error');
        return;
    }

    if (!category) {
        showToast('يرجى اختيار القسم (Category)', 'error');
        return;
    }

    // Collect dynamic attributes values
    const attributes = {};
    const attrInputs = document.querySelectorAll('#ad-dynamic-attributes-container input, #ad-dynamic-attributes-container select');
    attrInputs.forEach(input => {
        const name = input.name;
        if (!name || !name.startsWith('attr_')) return;
        const key = name.replace(/^attr_/, '').replace(/\[\]$/, '');

        if (input.type === 'checkbox') {
            if (name.endsWith('[]')) {
                if (!attributes[key]) attributes[key] = [];
                if (input.checked) attributes[key].push(input.value);
            } else {
                attributes[key] = input.checked;
            }
        } else if (input.type === 'number') {
            attributes[key] = input.value !== '' ? Number(input.value) : null;
        } else {
            attributes[key] = input.value !== '' ? input.value : null;
        }
    });

    const pricing = {
        basePrice: Number(basePrice),
        discountType,
        discountValue: Number(discountValue),
        pricingUnit,
        minDuration: Number(minDuration),
    };

    let payload;

    if (imageFile) {
        payload = new FormData();
        payload.append('title', title);
        if (category) payload.append('category', category);
        if (unitType) payload.append('unitType', unitType);
        if (city) payload.append('city', city);
        if (region) payload.append('region', region);
        payload.append('pricing[basePrice]', basePrice);
        payload.append('pricing[discountType]', discountType);
        payload.append('pricing[discountValue]', discountValue);
        payload.append('pricing[pricingUnit]', pricingUnit);
        payload.append('pricing[minDuration]', minDuration);
        payload.append('location', location);
        payload.append('address', address);
        if (latitude !== null) payload.append('latitude', latitude);
        if (longitude !== null) payload.append('longitude', longitude);
        payload.append('description', description);
        payload.append('active', active);
        if (owner) payload.append('owner', owner);
        payload.append('attributes', JSON.stringify(attributes));
        payload.append('image', imageFile);
    } else {
        const bodyObj = {
            title,
            owner: owner || null,
            category: category || null,
            unitType: unitType || null,
            city: city || null,
            region: region || null,
            region: region || null,
            pricing,
            location,
            address,
            latitude,
            longitude,
            description,
            active,
            attributes,
        };
        if (imageUrl) bodyObj.image = imageUrl;
        payload = JSON.stringify(bodyObj);
    }

    try {
        if (state.editingAdvertisementId) {
            await apiFetch(`/api/v1/admin/advertisements/${state.editingAdvertisementId}`, {
                method: 'PATCH',
                body: payload,
            });
            showToast('تم تحديث الإعلان بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/advertisements', {
                method: 'POST',
                body: payload,
            });
            showToast('تم إنشاء الإعلان بنجاح', 'success');
        }

        closeModal('advertisement-modal');
        loadAdvertisementsTab();
    } catch (err) {}
}

async function deleteAdvertisement(adId) {
    if (!confirm(t('confirmDeleteAdvertisement'))) return;

    try {
        await apiFetch(`/api/v1/admin/advertisements/${adId}`, { method: 'DELETE' });
        showToast('تم حذف الإعلان بنجاح', 'success');
        loadAdvertisementsTab();
    } catch (err) {}
}

// ─── SYSTEM API CONSOLE ───────────────────────────────────────────────────────

async function pingMainApi() {
    try {
        const res = await apiFetch('/', { silent: true });
        showToast(`Main API: ${res.message || 'Connected 200 OK'}`, 'success');
    } catch (err) {
        showToast(`Main API Error: ${err.message}`, 'error');
    }
}

async function pingAdminApi() {
    try {
        const res = await apiFetch('/api-status', { silent: true });
        showToast(`Admin API: ${res.message || 'Connected 200 OK'}`, 'success');
    } catch (err) {
        showToast(`Admin API Error: ${err.message}`, 'error');
    }
}

// ─── LANGUAGE & THEME ─────────────────────────────────────────────────────────

function toggleLanguage() {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('kuba_admin_lang', state.lang);
    applyLanguage();
}

function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && I18N[state.lang]?.[key]) {
            el.textContent = I18N[state.lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key && I18N[state.lang]?.[key]) {
            el.placeholder = I18N[state.lang][key];
        }
    });

    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
        langBtnText.textContent = state.lang === 'ar' ? 'English' : 'العربية';
    }

    if (state.token) {
        loadCurrentTab();
    }
}

function closeModal(modalId) {
    exitMapFullscreen();
    document.getElementById(modalId)?.classList.remove('active');
}

// ─── SUPER ADMIN: AD OWNER MANAGEMENT ──────────────────────────────────────────

async function populateAdOwnerSelect(selectedOwnerId = '') {
    const select = document.getElementById('ad-modal-owner');
    if (!select) return;

    try {
        let users = state.users;
        if (!users || users.length === 0) {
            const res = await apiFetch('/api/v1/admin/users?limit=200', { silent: true });
            users = res.data?.users || res.data || [];
        }

        const ownerCandidates = users.filter(u => ['owner', 'advertiser', 'user', 'admin'].includes(u.role));

        let html = '<option value="">-- بدون مالك / تابع للإدارة مباشرة --</option>';
        ownerCandidates.forEach(u => {
            const uId = u.id || u._id;
            const isSelected = String(uId) === String(selectedOwnerId);
            const roleBadge = u.role === 'owner' ? '[صاحب إعلان]' : (u.role === 'admin' ? '[إدارة]' : '[مستخدم]');
            html += `<option value="${uId}" ${isSelected ? 'selected' : ''}>${u.name || u.email} (${u.email}) ${roleBadge}</option>`;
        });

        select.innerHTML = html;
        if (selectedOwnerId) select.value = selectedOwnerId;
    } catch (err) {
        console.warn('Failed to populate owner select:', err);
    }
}

function openAdOwnerModalFromAdEdit() {
    if (!state.editingAdvertisementId) {
        showToast('يرجى حفظ الإعلان أولاً قبل تخصيص حساب المالك له', 'warning');
        return;
    }
    openAdOwnerModal(state.editingAdvertisementId);
}

async function openAdOwnerModal(adId) {
    state.selectedAdForOwnerModal = adId;
    const ad = state.advertisements.find(a => (a.id || a._id) === adId);
    if (!ad) {
        showToast('الإعلان غير موجود', 'error');
        return;
    }

    const adTitleEl = document.getElementById('ad-owner-modal-ad-title');
    if (adTitleEl) adTitleEl.textContent = `${ad.title} (ID: ${adId})`;

    const unlinkBtn = document.getElementById('ad-owner-unlink-btn');
    const curNameEl = document.getElementById('ad-owner-current-name');
    const curEmailEl = document.getElementById('ad-owner-current-email');
    const curPhoneEl = document.getElementById('ad-owner-current-phone');

    if (ad.owner) {
        if (unlinkBtn) unlinkBtn.classList.remove('hidden');
        if (curNameEl) curNameEl.textContent = ad.owner.name || 'بدون اسم';
        if (curEmailEl) curEmailEl.textContent = ad.owner.email || '--';
        if (curPhoneEl) curPhoneEl.textContent = ad.owner.phone || 'لا يوجد هاتف مسجل';
    } else {
        if (unlinkBtn) unlinkBtn.classList.add('hidden');
        if (curNameEl) curNameEl.textContent = 'بدون مالك حالياً (تابع للإدارة)';
        if (curEmailEl) curEmailEl.textContent = '--';
        if (curPhoneEl) curPhoneEl.textContent = '--';
    }

    document.getElementById('ad-owner-create-form')?.reset();
    generateRandomOwnerPassword();

    const selectEl = document.getElementById('owner-existing-user-select');
    if (selectEl) {
        try {
            const res = await apiFetch('/api/v1/admin/users?limit=200', { silent: true });
            const allUsers = res.data?.users || res.data || [];
            selectEl.innerHTML = '<option value="">-- اختر مستخدماً لتعيينه كصاحب إعلان --</option>' +
                allUsers.map(u => {
                    const uId = u.id || u._id;
                    const rLabel = u.role === 'owner' ? '[صاحب إعلان]' : `[${u.role}]`;
                    return `<option value="${uId}">${u.name || u.email} (${u.email}) ${rLabel}</option>`;
                }).join('');
        } catch (err) {
            console.warn('Error loading users for owner select:', err);
        }
    }

    switchAdOwnerSubTab('create');
    document.getElementById('ad-owner-modal')?.classList.add('active');
}

function switchAdOwnerSubTab(tab) {
    const createBtn = document.getElementById('tab-btn-create-owner');
    const selectBtn = document.getElementById('tab-btn-select-owner');
    const createForm = document.getElementById('ad-owner-create-form');
    const selectForm = document.getElementById('ad-owner-select-form');

    if (tab === 'create') {
        createBtn?.classList.add('bg-white', 'text-[#2D4F2E]', 'shadow-sm');
        createBtn?.classList.remove('text-slate-600');
        selectBtn?.classList.remove('bg-white', 'text-[#2D4F2E]', 'shadow-sm');
        selectBtn?.classList.add('text-slate-600');
        createForm?.classList.remove('hidden');
        selectForm?.classList.add('hidden');
    } else {
        selectBtn?.classList.add('bg-white', 'text-[#2D4F2E]', 'shadow-sm');
        selectBtn?.classList.remove('text-slate-600');
        createBtn?.classList.remove('bg-white', 'text-[#2D4F2E]', 'shadow-sm');
        createBtn?.classList.add('text-slate-600');
        selectForm?.classList.remove('hidden');
        createForm?.classList.add('hidden');
    }
}

function generateRandomOwnerPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pwd = '';
    for (let i = 0; i < 10; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const input = document.getElementById('owner-new-password-input');
    if (input) input.value = pwd;
}

async function handleAdOwnerCreateSubmit(e) {
    if (e) e.preventDefault();
    const adId = state.selectedAdForOwnerModal;
    if (!adId) return;

    const name = document.getElementById('owner-new-name').value.trim();
    const email = document.getElementById('owner-new-email').value.trim();
    const phone = document.getElementById('owner-new-phone').value.trim();
    const password = document.getElementById('owner-new-password-input').value.trim();

    if (!name || !email || !password) {
        showToast('يرجى ملء جميع الحقول المطلوبة (الاسم، البريد، كلمة السر)', 'error');
        return;
    }

    try {
        const res = await apiFetch(`/api/v1/admin/advertisements/${adId}/owner`, {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, password }),
        });

        showToast(res.message || 'تم إنشاء حساب المالك وربطه بالإعلان بنجاح!', 'success');
        closeModal('ad-owner-modal');
        await loadAdvertisements();

        if (state.editingAdvertisementId === adId && res.data?.owner?.id) {
            populateAdOwnerSelect(res.data.owner.id);
        }
    } catch (err) {
        // apiFetch shows error toast
    }
}

async function handleAdOwnerSelectSubmit(e) {
    if (e) e.preventDefault();
    const adId = state.selectedAdForOwnerModal;
    if (!adId) return;

    const userId = document.getElementById('owner-existing-user-select').value;
    if (!userId) {
        showToast('يرجى اختيار مستخدم من القائمة', 'warning');
        return;
    }

    try {
        const res = await apiFetch(`/api/v1/admin/advertisements/${adId}/owner`, {
            method: 'POST',
            body: JSON.stringify({ userId }),
        });

        showToast(res.message || 'تم تعيين المستخدم كمالك للإعلان بنجاح!', 'success');
        closeModal('ad-owner-modal');
        await loadAdvertisements();

        if (state.editingAdvertisementId === adId) {
            populateAdOwnerSelect(userId);
        }
    } catch (err) {
        // apiFetch shows error toast
    }
}

async function unlinkCurrentOwner() {
    const adId = state.selectedAdForOwnerModal;
    if (!adId) return;

    if (!confirm('هل أنت متأكد من رغبتك في إلغاء ربط حساب المالك بهذا الإعلان؟')) {
        return;
    }

    try {
        const res = await apiFetch(`/api/v1/admin/advertisements/${adId}/owner`, {
            method: 'DELETE',
        });

        showToast(res.message || 'تم إلغاء ربط صاحب الإعلان بنجاح', 'success');
        closeModal('ad-owner-modal');
        await loadAdvertisements();

        if (state.editingAdvertisementId === adId) {
            populateAdOwnerSelect('');
        }
    } catch (err) {
        // apiFetch shows error toast
    }
}

// ─── SUPER ADMIN: BOOKINGS MANAGEMENT ──────────────────────────────────────────

async function loadBookingsTab() {
    const tbody = document.getElementById('admin-bookings-table-body');
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-slate-400">جاري تحميل الحجوزات...</td></tr>';
    }

    try {
        const res = await apiFetch('/api/v1/admin/bookings?limit=150');
        state.bookings = res.data?.bookings || res.data || [];
        state.bookingsTotal = state.bookings.length;
        renderAdminBookingsTable(state.bookings);
    } catch (err) {
        console.error('Error loading bookings:', err);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-red-500">فشل في تحميل الحجوزات: ${err.message}</td></tr>`;
        }
    }
}

function filterAdminBookings() {
    const search = document.getElementById('admin-booking-search')?.value.trim().toLowerCase() || '';
    const bType = document.getElementById('admin-booking-filter-type')?.value || '';
    const status = document.getElementById('admin-booking-filter-status')?.value || '';
    const payment = document.getElementById('admin-booking-filter-payment')?.value || '';

    let filtered = state.bookings;

    if (search) {
        filtered = filtered.filter(b => {
            const userName = b.user?.name?.toLowerCase() || '';
            const userEmail = b.user?.email?.toLowerCase() || '';
            const userPhone = b.user?.phone?.toLowerCase() || '';
            const adTitle = b.advertisement?.title?.toLowerCase() || '';
            const roomTitle = b.room?.title?.toLowerCase() || '';
            const guestName = b.guestDetails?.fullName?.toLowerCase() || '';
            const bookingId = (b.id || b._id || '').toLowerCase();
            return userName.includes(search) || userEmail.includes(search) || userPhone.includes(search) || adTitle.includes(search) || roomTitle.includes(search) || guestName.includes(search) || bookingId.includes(search);
        });
    }

    if (bType) {
        filtered = filtered.filter(b => (b.bookingType || b.advertisement?.type) === bType);
    }

    if (status) {
        filtered = filtered.filter(b => b.status === status);
    }

    if (payment) {
        filtered = filtered.filter(b => (b.paymentStatus || 'unpaid') === payment);
    }

    renderAdminBookingsTable(filtered);
}

function renderAdminBookingsTable(list) {
    const tbody = document.getElementById('admin-bookings-table-body');
    const countEl = document.getElementById('admin-bookings-count');
    if (countEl) countEl.textContent = list.length;
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-slate-400">لا توجد حجوزات مطابقة للبحث أو الفلتر</td></tr>';
        return;
    }

    const typeBadge = {
        hotel: '<span class="badge bg-purple-50 text-purple-700 border border-purple-200 font-bold whitespace-nowrap"><i class="fas fa-hotel me-1"></i>فندق</span>',
        chalet: '<span class="badge bg-amber-50 text-amber-700 border border-amber-200 font-bold whitespace-nowrap"><i class="fas fa-umbrella-beach me-1"></i>شاليه</span>',
        yacht: '<span class="badge bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold whitespace-nowrap"><i class="fas fa-ship me-1"></i>يخت</span>',
        golf_car: '<span class="badge bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold whitespace-nowrap"><i class="fas fa-car-side me-1"></i>جولف كار</span>',
        villa: '<span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold whitespace-nowrap"><i class="fas fa-house-chimney me-1"></i>فيلا</span>',
        apartment: '<span class="badge bg-blue-50 text-blue-700 border border-blue-200 font-bold whitespace-nowrap"><i class="fas fa-building me-1"></i>شقة</span>',
    };

    const statusBadge = {
        pending: '<span class="badge bg-amber-100 text-amber-700 border border-amber-300 font-bold">قيد الانتظار</span>',
        confirmed: '<span class="badge bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">مؤكد</span>',
        completed: '<span class="badge bg-blue-100 text-blue-800 border border-blue-300 font-bold">مكتمل</span>',
        cancelled: '<span class="badge bg-red-100 text-red-800 border border-red-300 font-bold">ملغي</span>',
    };

    const paymentBadge = {
        paid: '<span class="badge bg-emerald-50 text-emerald-700 border border-emerald-200">مدفوع</span>',
        unpaid: '<span class="badge bg-amber-50 text-amber-700 border border-amber-200">غير مدفوع</span>',
        refunded: '<span class="badge bg-slate-100 text-slate-600 border border-slate-300">مسترجع</span>',
    };

    tbody.innerHTML = list.map(b => {
        const bId = b.id || b._id;
        const shortId = bId ? bId.substring(bId.length - 6) : '--';
        const ad = b.advertisement || {};
        const room = b.room || null;
        const customer = b.user || {};
        const bType = b.bookingType || ad.type || 'general';
        const adImg = ad.image?.startsWith('http') ? ad.image : (ad.image ? `/uploads/${ad.image}` : 'images/kuba-logo.jpeg');

        const startStr = b.startDate ? new Date(b.startDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' }) : '--';
        const endStr = b.endDate ? new Date(b.endDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' }) : '--';

        return `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-xs">
                <td class="p-3 font-mono font-bold text-slate-600">
                    <span title="${bId}">#${shortId}</span>
                    <div class="text-[10px] text-slate-400 font-sans">${b.createdAt ? new Date(b.createdAt).toLocaleDateString('ar-EG') : ''}</div>
                </td>
                <td class="p-3">
                    ${typeBadge[bType] || `<span class="badge bg-slate-100 text-slate-700">${bType}</span>`}
                    ${b.rentalType === 'hourly' ? '<div class="text-[9px] text-sky-700 font-bold mt-0.5">بالساعة</div>' : ''}
                    ${b.rentalType === 'full_day' ? '<div class="text-[9px] text-indigo-700 font-bold mt-0.5">يوم كامل</div>' : ''}
                </td>
                <td class="p-3">
                    <div class="flex items-center gap-2">
                        <img src="${adImg}" class="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" onerror="this.src='images/kuba-logo.jpeg'">
                        <div class="max-w-[180px]">
                            <div class="font-bold text-slate-900 truncate" title="${ad.title || '--'}">${ad.title || 'إعلان محذوف'}</div>
                            <div class="text-[11px] text-slate-400 truncate">${ad.location || ''}</div>
                            ${room ? `
                                <div class="mt-1 inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                    <i class="fas fa-door-closed text-[9px]"></i>
                                    <span>غرفة: ${room.title || room.roomNumber || 'غرفة فندقية'}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </td>
                <td class="p-3">
                    <div class="font-bold text-slate-900">${customer.name || b.guestDetails?.fullName || 'عميل بدون اسم'}</div>
                    <div class="text-[11px] text-slate-500 font-mono">${customer.phone || customer.email || b.guestDetails?.phone || '--'}</div>
                </td>
                <td class="p-3">
                    <div class="font-medium text-slate-700">من: <span class="font-bold">${startStr}</span></div>
                    <div class="text-[11px] text-slate-500">إلى: <span class="font-bold">${endStr}</span></div>
                </td>
                <td class="p-3">
                    <div class="font-bold text-[#2D4F2E] text-sm">${Number(b.totalPrice || 0).toLocaleString()} ج.م</div>
                    <div class="text-[10px] text-slate-400">${b.duration || 1} ${b.pricingUnit === 'per_hour' ? 'ساعات' : 'أيام / ليال'}</div>
                </td>
                <td class="p-3">
                    ${statusBadge[b.status] || b.status}
                </td>
                <td class="p-3">
                    ${paymentBadge[b.paymentStatus] || b.paymentStatus || '--'}
                </td>
                <td class="p-3 text-center">
                    <div class="inline-flex items-center gap-1">
                        <button onclick="openBookingDetailsModal('${bId}')" class="text-slate-500 hover:text-[#2D4F2E] p-1.5 transition rounded hover:bg-slate-100" title="عرض تفاصيل الحجز">
                            <i class="fas fa-eye text-xs"></i>
                        </button>
                        <select onchange="changeBookingStatus('${bId}', this.value)" class="form-select text-[11px] py-1 px-2 border-slate-300">
                            <option value="">تغيير الحالة</option>
                            <option value="confirmed" ${b.status === 'confirmed' ? 'disabled' : ''}>تأكيد (Confirmed)</option>
                            <option value="completed" ${b.status === 'completed' ? 'disabled' : ''}>اكتمال (Completed)</option>
                            <option value="cancelled" ${b.status === 'cancelled' ? 'disabled' : ''}>إلغاء (Cancelled)</option>
                            <option value="pending" ${b.status === 'pending' ? 'disabled' : ''}>قيد الانتظار (Pending)</option>
                        </select>
                        <button onclick="deleteBookingAdmin('${bId}')" class="text-slate-400 hover:text-red-600 p-1.5 transition" title="حذف الحجز">
                            <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function changeBookingStatus(bookingId, newStatus) {
    if (!newStatus) return;

    try {
        await apiFetch(`/api/v1/admin/bookings/${bookingId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus }),
        });

        showToast('تم تحديث حالة الحجز بنجاح', 'success');
        const item = state.bookings.find(b => (b.id || b._id) === bookingId);
        if (item) item.status = newStatus;
        filterAdminBookings();
    } catch (err) {
        filterAdminBookings();
    }
}

async function deleteBookingAdmin(bookingId) {
    if (!confirm('هل أنت متأكد من حذف هذا الحجز نهائياً من النظام؟')) return;

    try {
        await apiFetch(`/api/v1/admin/bookings/${bookingId}`, {
            method: 'DELETE',
        });

        showToast('تم حذف الحجز بنجاح', 'success');
        state.bookings = state.bookings.filter(b => (b.id || b._id) !== bookingId);
        filterAdminBookings();
    } catch (err) {
        // apiFetch shows error toast
    }
}


// ─── BOOKING DETAILS MODAL & ACTIONS ──────────────────────────────────────────

async function openBookingDetailsModal(bookingId) {
    if (!bookingId) return;

    let booking = (state.bookings || []).find(b => (b.id || b._id) === bookingId);
    if (!booking && state.ownerBookings) {
        booking = state.ownerBookings.find(b => (b.id || b._id) === bookingId);
    }

    if (!booking || !booking.room) {
        try {
            const res = await apiFetch('/api/v1/admin/bookings/' + bookingId);
            if (res.data?.booking || res.data) {
                booking = res.data.booking || res.data;
            }
        } catch (_) {}
    }

    if (!booking) {
        showToast('لم يتم العثور على بيانات هذا الحجز', 'error');
        return;
    }

    const bId = booking.id || booking._id;
    const shortId = bId ? bId.substring(bId.length - 8) : '--';
    const idEl = document.getElementById('bmodal-id');
    if (idEl) idEl.textContent = '#' + shortId + ' (' + bId + ')';

    const contentEl = document.getElementById('bmodal-content');
    const actionsEl = document.getElementById('bmodal-quick-actions');
    if (!contentEl) return;

    const ad = booking.advertisement || {};
    const room = booking.room || null;
    const customer = booking.user || {};
    const guest = booking.guestDetails || {};
    const bType = booking.bookingType || ad.type || 'general';

    const typeBadge = {
        hotel: '<span class="badge bg-purple-50 text-purple-700 border border-purple-200 font-bold"><i class="fas fa-hotel me-1"></i>فندق</span>',
        chalet: '<span class="badge bg-amber-50 text-amber-700 border border-amber-200 font-bold"><i class="fas fa-umbrella-beach me-1"></i>شاليه</span>',
        yacht: '<span class="badge bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold"><i class="fas fa-ship me-1"></i>يخت</span>',
        golf_car: '<span class="badge bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold"><i class="fas fa-car-side me-1"></i>جولف كار</span>',
        villa: '<span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold"><i class="fas fa-house-chimney me-1"></i>فيلا</span>',
        apartment: '<span class="badge bg-blue-50 text-blue-700 border border-blue-200 font-bold"><i class="fas fa-building me-1"></i>شقة</span>',
    };

    const statusBadge = {
        pending: '<span class="badge bg-amber-100 text-amber-800 border border-amber-300 font-bold">قيد الانتظار (Pending)</span>',
        confirmed: '<span class="badge bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">مؤكد ومقبول (Confirmed)</span>',
        completed: '<span class="badge bg-blue-100 text-blue-800 border border-blue-300 font-bold">مكتمل (Completed)</span>',
        cancelled: '<span class="badge bg-red-100 text-red-800 border border-red-300 font-bold">ملغي (Cancelled)</span>',
    };

    const adImg = ad.image?.startsWith('http') ? ad.image : (ad.image ? ('/uploads/' + ad.image) : 'images/kuba-logo.jpeg');
    const startStr = booking.startDate ? new Date(booking.startDate).toLocaleDateString('ar-EG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '--';
    const endStr = booking.endDate ? new Date(booking.endDate).toLocaleDateString('ar-EG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '--';

    const customerPhone = customer.phone || guest.phone || '';
    const waLink = customerPhone ? ('https://wa.me/' + customerPhone.replace(/[^0-9]/g, '')) : null;

    contentEl.innerHTML = `
        <!-- Status & Type Header -->
        <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500 font-semibold">حالة الحجز:</span>
                ${statusBadge[booking.status] || booking.status}
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500 font-semibold">نوع الوحدة:</span>
                ${typeBadge[bType] || ('<span class="badge bg-slate-100">' + bType + '</span>')}
                ${booking.rentalType === 'hourly' ? '<span class="badge bg-sky-100 text-sky-800 text-[10px] font-bold">إيجار بالساعة</span>' : ''}
                ${booking.rentalType === 'full_day' ? '<span class="badge bg-indigo-100 text-indigo-800 text-[10px] font-bold">يوم كامل</span>' : ''}
            </div>
        </div>

        <!-- Property & Room Card -->
        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <i class="fas fa-building text-[#2D4F2E]"></i>
                <span>بيانات العقار والوحدة</span>
            </div>
            <div class="flex items-start gap-3">
                <img src="${adImg}" class="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" onerror="this.src='images/kuba-logo.jpeg'">
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-slate-900 text-sm truncate">${ad.title || 'إعلان غير محدد'}</h4>
                    <p class="text-xs text-slate-500 mt-0.5"><i class="fas fa-location-dot text-[#2D4F2E] me-1"></i>${ad.location || ad.address || 'العنوان غير محدد'}</p>
                </div>
            </div>

            ${room ? `
                <div class="mt-2 p-3 bg-purple-50/80 border border-purple-200 rounded-lg space-y-1.5">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-purple-900 text-xs flex items-center gap-1.5">
                            <i class="fas fa-door-closed text-purple-600"></i>
                            تفاصيل الغرفة الفندقية المحجوزة
                        </span>
                        ${room.roomNumber ? ('<span class="badge bg-purple-200 text-purple-800 font-mono text-[10px] font-bold">غرفة رقم: ' + room.roomNumber + '</span>') : ''}
                    </div>
                    <div class="font-bold text-slate-800 text-xs">${room.title || 'غرفة فندقية'}</div>
                    <div class="text-[11px] text-slate-600 flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                        <span><i class="fas fa-tag text-purple-600 me-1"></i>نوع الغرفة: <b>${room.roomType || 'standard'}</b></span>
                        <span><i class="fas fa-bed text-purple-600 me-1"></i>الأسرّة: <b>${room.beds?.count || 1} (${room.beds?.bedType || 'مزدوج'})</b></span>
                        <span><i class="fas fa-user-friends text-purple-600 me-1"></i>السعة: <b>${room.capacity?.adults || 2} بالغين ${room.capacity?.children ? ('+ ' + room.capacity.children + ' أطفال') : ''}</b></span>
                    </div>
                </div>
            ` : ''}
        </div>

        <!-- Schedule & Timing -->
        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <i class="fas fa-clock text-[#2D4F2E]"></i>
                <span>فترة ومواعيد الحجز</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div class="text-slate-400 text-[10px] mb-0.5">تاريخ البداية (Check-In)</div>
                    <div class="font-bold text-slate-800">${startStr}</div>
                    ${booking.rentalType === 'hourly' && booking.startDate ? ('<div class="text-[10px] text-sky-700 font-mono mt-0.5 font-bold">الساعة: ' + new Date(booking.startDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) + '</div>') : ''}
                </div>
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div class="text-slate-400 text-[10px] mb-0.5">تاريخ النهاية (Check-Out)</div>
                    <div class="font-bold text-slate-800">${endStr}</div>
                    ${booking.rentalType === 'hourly' && booking.endDate ? ('<div class="text-[10px] text-sky-700 font-mono mt-0.5 font-bold">الساعة: ' + new Date(booking.endDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) + '</div>') : ''}
                </div>
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div class="text-slate-400 text-[10px] mb-0.5">المدة المحسوبة</div>
                    <div class="font-bold text-[#2D4F2E] text-sm">${booking.duration || 1} ${booking.pricingUnit === 'per_hour' ? 'ساعات' : 'ليال / أيام'}</div>
                    <div class="text-[10px] text-slate-400">${booking.rentalType === 'hourly' ? 'حساب بالساعة' : 'حساب باليوم'}</div>
                </div>
            </div>
        </div>

        <!-- Customer & Guest Info -->
        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span class="flex items-center gap-1.5"><i class="fas fa-user-check text-[#2D4F2E]"></i>بيانات العميل والنزيل</span>
                ${customerPhone ? `
                    <div class="flex items-center gap-1.5">
                        <a href="tel:${customerPhone}" class="text-[11px] text-slate-700 hover:text-[#2D4F2E] font-bold flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded transition">
                            <i class="fas fa-phone text-emerald-600"></i>اتصال
                        </a>
                        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-white bg-emerald-600 hover:bg-emerald-700 font-bold flex items-center gap-1 px-2 py-0.5 rounded transition">
                            <i class="fab fa-whatsapp"></i>واتساب
                        </a>
                    </div>
                ` : ''}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div class="text-slate-400 text-[10px]">حساب العميل المسجل</div>
                    <div class="font-bold text-slate-900">${customer.name || 'عميل مسجل'}</div>
                    <div class="text-slate-600 font-mono text-[11px]">${customer.phone || 'بدون هاتف'}</div>
                    <div class="text-slate-400 text-[10px]">${customer.email || ''}</div>
                </div>

                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div class="text-slate-400 text-[10px]">بيانات النزيل الفعلي (Guest Details)</div>
                    <div class="font-bold text-slate-900">${guest.fullName || customer.name || 'نفس العميل'}</div>
                    <div class="text-slate-600 font-mono text-[11px]">${guest.phone || customer.phone || '--'}</div>
                    ${guest.nationalId ? ('<div class="text-[10px] text-slate-500">رقم الهوية: <b class="font-mono text-slate-700">' + guest.nationalId + '</b></div>') : ''}
                    ${guest.adults ? ('<div class="text-[10px] text-slate-500">العدد: ' + guest.adults + ' بالغين ' + (guest.children ? ('+ ' + guest.children + ' أطفال') : '') + '</div>') : ''}
                </div>
            </div>
        </div>

        <!-- Pricing & Financials -->
        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <i class="fas fa-receipt text-[#2D4F2E]"></i>
                <span>الحساب والدفع</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div class="text-slate-400 text-[10px]">سعر الوحدة / الفترة</div>
                    <div class="font-bold text-slate-800">${Number(booking.unitPrice || (booking.totalPrice / (booking.duration || 1)) || 0).toLocaleString()} ج.م</div>
                    <div class="text-[10px] text-slate-400">لكل ${booking.pricingUnit === 'per_hour' ? 'ساعة' : 'ليلة'}</div>
                </div>
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div class="text-slate-400 text-[10px]">إجمالي التكلفة</div>
                    <div class="font-black text-[#2D4F2E] text-base">${Number(booking.totalPrice || 0).toLocaleString()} ج.م</div>
                    <div class="text-[10px] text-slate-400">شامل الضرائب والرسوم</div>
                </div>
                <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div class="text-slate-400 text-[10px]">حالة وطريقة الدفع</div>
                    <div class="font-bold ${booking.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'}">
                        ${booking.paymentStatus === 'paid' ? 'مدفوع بالكامل' : (booking.paymentStatus === 'refunded' ? 'مسترجع' : 'غير مدفوع (عند الوصول)')}
                    </div>
                    <div class="text-[10px] text-slate-400 uppercase mt-0.5">طريقة الدفع: ${booking.paymentMethod || 'cash'}</div>
                </div>
            </div>
        </div>

        ${booking.notes || booking.cancellationReason ? `
            <div class="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                ${booking.notes ? ('<div><b class="text-amber-900">ملاحظات العميل:</b> <span class="text-slate-700">"' + booking.notes + '"</span></div>') : ''}
                ${booking.cancellationReason ? ('<div><b class="text-red-800">سبب الإلغاء:</b> <span class="text-red-700">"' + booking.cancellationReason + '"</span></div>') : ''}
            </div>
        ` : ''}
    `;

    // Dynamic Quick Actions
    if (actionsEl) {
        if (booking.status === 'pending') {
            actionsEl.innerHTML = `
                <button type="button" onclick="changeBookingStatusAndRefresh('${bId}', 'confirmed')" class="gold-btn text-xs py-1.5 px-3.5 shadow-sm cursor-pointer">
                    <i class="fas fa-check-circle me-1"></i>تأكيد الحجز
                </button>
                <button type="button" onclick="changeBookingStatusAndRefresh('${bId}', 'cancelled')" class="btn-secondary text-xs py-1.5 px-3 text-red-600 hover:bg-red-50 cursor-pointer">
                    <i class="fas fa-times me-1"></i>إلغاء الحجز
                </button>
            `;
        } else if (booking.status === 'confirmed') {
            actionsEl.innerHTML = `
                <button type="button" onclick="changeBookingStatusAndRefresh('${bId}', 'completed')" class="btn-secondary text-xs py-1.5 px-3.5 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 cursor-pointer">
                    <i class="fas fa-flag-checkered me-1"></i>اكتمال الحجز
                </button>
                <button type="button" onclick="changeBookingStatusAndRefresh('${bId}', 'cancelled')" class="btn-secondary text-xs py-1.5 px-3 text-red-600 hover:bg-red-50 cursor-pointer">
                    <i class="fas fa-ban me-1"></i>إلغاء
                </button>
            `;
        } else {
            actionsEl.innerHTML = `
                <span class="text-xs text-slate-400 font-semibold">لا توجد إجراءات إضافية</span>
            `;
        }
    }

    document.getElementById('booking-details-modal')?.classList.add('active');
}

async function changeBookingStatusAndRefresh(bookingId, status) {
    await changeBookingStatus(bookingId, status);
    openBookingDetailsModal(bookingId);
}

// ─── HOTEL ROOMS MANAGEMENT CONTROLLER ────────────────────────────────────────

function openHotelRoomsManagementModal(hotelId, hotelTitle) {
    if (!hotelId) return;

    state.activeHotelId = hotelId;
    state.activeHotelTitle = hotelTitle || '';

    const titleEl = document.getElementById('hotel-rooms-modal-hotel-title');
    if (titleEl) titleEl.textContent = hotelTitle || ('فندق #' + hotelId.substring(hotelId.length - 6));

    switchHotelRoomsSubTab('list');
    loadHotelRooms(hotelId);

    document.getElementById('hotel-rooms-modal')?.classList.add('active');
}

function switchHotelRoomsSubTab(tab) {
    const listContainer = document.getElementById('hotel-rooms-list-container');
    const addForm = document.getElementById('hotel-room-add-form');
    const listBtn = document.getElementById('tab-btn-hotel-rooms-list');
    const addBtn = document.getElementById('tab-btn-hotel-rooms-add');

    if (tab === 'add') {
        if (listContainer) listContainer.classList.add('hidden');
        if (addForm) {
            addForm.classList.remove('hidden');
            addForm.reset();
        }
        if (addBtn) addBtn.className = 'flex-1 py-1.5 rounded-md text-center transition bg-white text-[#2D4F2E] shadow-sm cursor-pointer';
        if (listBtn) listBtn.className = 'flex-1 py-1.5 rounded-md text-center transition text-slate-600 hover:text-slate-900 cursor-pointer';
    } else {
        if (listContainer) listContainer.classList.remove('hidden');
        if (addForm) addForm.classList.add('hidden');
        if (listBtn) listBtn.className = 'flex-1 py-1.5 rounded-md text-center transition bg-white text-[#2D4F2E] shadow-sm cursor-pointer';
        if (addBtn) addBtn.className = 'flex-1 py-1.5 rounded-md text-center transition text-slate-600 hover:text-slate-900 cursor-pointer';
    }
}

async function loadHotelRooms(hotelId) {
    const tbody = document.getElementById('hotel-rooms-table-body');
    const badge = document.getElementById('hotel-rooms-count-badge');
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-6 text-slate-400">جاري تحميل الغرف الفندقية...</td></tr>';
    }

    try {
        const res = await apiFetch('/api/v1/advertisements/' + hotelId + '/rooms');
        const rooms = res.data?.rooms || (Array.isArray(res.data) ? res.data : []);
        state.hotelRooms = rooms;

        if (badge) badge.textContent = rooms.length;

        if (!tbody) return;

        if (rooms.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-8 text-slate-400">
                        <i class="fas fa-door-open text-3xl mb-2 text-slate-300 block"></i>
                        <div class="font-bold text-slate-600">لا توجد غرف مسجلة لهذا الفندق حتى الآن</div>
                        <div class="text-[11px] text-slate-400 mt-1">اضغط على زر "إضافة غرفة جديدة" بالقسم العلوي لإضافة غرفة فندقية</div>
                    </td>
                </tr>
            `;
            return;
        }

        const roomTypeNames = {
            standard: 'Standard (قياسية)',
            deluxe: 'Deluxe (ديلوكس)',
            suite: 'Suite (جناح)',
            junior_suite: 'Junior Suite (جناح صغير)',
            royal_suite: 'Royal Suite (جناح ملكي)',
            studio: 'Studio (استوديو)',
            family: 'Family (عائلية)',
            chalet_room: 'Chalet Room (غرفة شاليه)',
        };

        tbody.innerHTML = rooms.map(r => {
            const rId = r.id || r._id;
            const rImg = r.image?.startsWith('http') ? r.image : (r.image ? ('/uploads/' + r.image) : 'images/kuba-logo.jpeg');
            const priceVal = r.pricing?.finalPrice || r.price || 0;
            const capAdults = r.capacity?.adults || 2;
            const capChildren = r.capacity?.children || 0;
            const bedsCount = r.beds?.count || 1;
            const bedType = r.beds?.bedType || 'King';

            return `
                <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                    <td class="p-2.5">
                        <div class="flex items-center gap-2">
                            <img src="${rImg}" class="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0" onerror="this.src='images/kuba-logo.jpeg'">
                            <div>
                                <div class="font-bold text-slate-800">${r.title || 'غرفة فندقية'}</div>
                                <div class="text-[10px] text-slate-400 font-mono">رقم: ${r.roomNumber || '--'}</div>
                            </div>
                        </div>
                    </td>
                    <td class="p-2.5">
                        <span class="badge bg-purple-50 text-purple-700 border border-purple-200 font-bold whitespace-nowrap">
                            ${roomTypeNames[r.roomType] || r.roomType || 'standard'}
                        </span>
                    </td>
                    <td class="p-2.5">
                        <div class="text-slate-800 font-semibold">${capAdults} بالغين ${capChildren > 0 ? ('+ ' + capChildren + ' أطفال') : ''}</div>
                        <div class="text-[10px] text-slate-400">${bedsCount} سرير (${bedType})</div>
                    </td>
                    <td class="p-2.5">
                        <div class="font-bold text-[#2D4F2E] text-sm">${Number(priceVal).toLocaleString()} ج.م</div>
                        <div class="text-[10px] text-slate-400">لكل ليلة</div>
                    </td>
                    <td class="p-2.5 text-center">
                        <button type="button" onclick="deleteHotelRoom('${rId}')" class="text-slate-400 hover:text-red-600 p-1.5 transition rounded hover:bg-red-50 cursor-pointer" title="حذف الغرفة">
                            <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (err) {
        console.error('Error loading hotel rooms:', err);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-red-500">فشل في تحميل الغرف: ${err.message}</td></tr>`;
        }
    }
}

async function handleCreateHotelRoomSubmit(e) {
    if (e) e.preventDefault();

    if (!state.activeHotelId) {
        showToast('لم يتم تحديد الفندق', 'error');
        return;
    }

    const title = document.getElementById('hroom-title')?.value.trim();
    const roomNumber = document.getElementById('hroom-number')?.value.trim();
    const roomType = document.getElementById('hroom-type')?.value || 'standard';
    const price = Number(document.getElementById('hroom-price')?.value || 0);
    const adults = Number(document.getElementById('hroom-adults')?.value || 2);
    const children = Number(document.getElementById('hroom-children')?.value || 0);
    const bedsCount = Number(document.getElementById('hroom-beds-count')?.value || 1);
    const bedType = document.getElementById('hroom-bed-type')?.value.trim() || 'King Bed';
    const amenitiesStr = document.getElementById('hroom-amenities')?.value.trim() || '';

    if (!title || price <= 0) {
        showToast('يرجى كتابة اسم الغرفة وسعر الليلة بشكل صحيح', 'error');
        return;
    }

    const amenities = amenitiesStr ? amenitiesStr.split(',').map(s => s.trim()).filter(Boolean) : [];

    const payload = {
        hotel: state.activeHotelId,
        title,
        roomNumber,
        roomType,
        price,
        pricing: {
            basePrice: price,
            finalPrice: price,
            pricingUnit: 'per_night',
            currency: 'EGP',
        },
        capacity: {
            adults,
            children,
            maxGuests: adults + children,
        },
        beds: {
            count: bedsCount,
            bedType,
        },
        amenities,
        active: true,
    };

    try {
        await apiFetch('/api/v1/advertisements/' + state.activeHotelId + '/rooms', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        showToast('تمت إضافة الغرفة الفندقية بنجاح!', 'success');
        document.getElementById('hotel-room-add-form')?.reset();
        switchHotelRoomsSubTab('list');
        loadHotelRooms(state.activeHotelId);
    } catch (err) {
        // apiFetch shows error toast
    }
}

async function deleteHotelRoom(roomId) {
    if (!roomId) return;
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه الغرفة نهائياً؟')) return;

    try {
        await apiFetch('/api/v1/rooms/' + roomId, {
            method: 'DELETE',
        });

        showToast('تم حذف الغرفة بنجاح', 'success');
        if (state.activeHotelId) {
            loadHotelRooms(state.activeHotelId);
        }
    } catch (err) {
        // apiFetch shows error toast
    }
}

// Global window bindings for inline HTML handlers
window.openModal = function(id) { document.getElementById(id)?.classList.add('active'); };
window.openBookingDetailsModal = openBookingDetailsModal;
window.changeBookingStatusAndRefresh = changeBookingStatusAndRefresh;
window.openHotelRoomsManagementModal = openHotelRoomsManagementModal;
window.switchHotelRoomsSubTab = switchHotelRoomsSubTab;
window.loadHotelRooms = loadHotelRooms;
window.handleCreateHotelRoomSubmit = handleCreateHotelRoomSubmit;
window.deleteHotelRoom = deleteHotelRoom;
function openOwnerHotelRoomsModal() {
    const ad = getActiveOwnerAd();
    if (!ad) return;
    openHotelRoomsManagementModal(ad.id || ad._id, ad.title);
}
window.openOwnerHotelRoomsModal = openOwnerHotelRoomsModal;

// ─── OWNER PORTAL: CONTROLLER & VIEWS ─────────────────────────────────────────

async function initOwnerPortal() {
    try {
        const promises = [];
        if (!state.categories || state.categories.length === 0) promises.push(loadCategories());
        if (!state.cities || state.cities.length === 0) promises.push(loadCitiesAndRegions());
        if (!state.unitTypes || state.unitTypes.length === 0) promises.push(loadUnitTypes());
        if (promises.length > 0) await Promise.allSettled(promises);

        const res = await apiFetch('/api/v1/admin/advertisements?limit=50');
        state.ownerAds = res.data?.advertisements || (Array.isArray(res.data) ? res.data : []);

        const adSelect = document.getElementById('header-owner-ad-select');
        const adContainer = document.getElementById('header-owner-ad-container');

        if (state.ownerAds.length === 0) {
            state.activeOwnerAdId = null;
            if (adContainer) adContainer.classList.add('hidden');
            showToast('لا يوجد إعلانات مسندة لحسابك حالياً. يرجى التواصل مع إدارة كوبا لتفعيل إعلانك.', 'warning');
            renderOwnerEmptyState();
            return;
        }

        if (!state.activeOwnerAdId || !state.ownerAds.some(a => (a.id || a._id) === state.activeOwnerAdId)) {
            state.activeOwnerAdId = state.ownerAds[0].id || state.ownerAds[0]._id;
        }

        if (adContainer) adContainer.classList.remove('hidden');
        if (adSelect) {
            adSelect.innerHTML = state.ownerAds.map(a => {
                const id = a.id || a._id;
                return `<option value="${id}">${a.title || 'إعلان بدون عنوان'}</option>`;
            }).join('');
            adSelect.value = state.activeOwnerAdId;
        }

        loadCurrentTab();
    } catch (err) {
        console.error('Owner portal init error:', err);
    }
}

function renderOwnerEmptyState() {
    const welcomeTitle = document.getElementById('owner-welcome-title');
    const welcomeSub = document.getElementById('owner-welcome-subtitle');
    if (welcomeTitle) welcomeTitle.textContent = 'مرحباً بك في بوابة صاحب الإعلان';
    if (welcomeSub) welcomeSub.textContent = 'لا توجد إعلانات مرتبطة بحسابك بعد. يرجى مراجعة إدارة النظام لربط إعلانك.';
}

function switchOwnerActiveAd(adId) {
    if (!adId || adId === state.activeOwnerAdId) return;
    state.activeOwnerAdId = adId;

    const adSelect = document.getElementById('header-owner-ad-select');
    if (adSelect && adSelect.value !== adId) {
        adSelect.value = adId;
    }

    loadCurrentTab();
}

function getActiveOwnerAd() {
    if (!state.ownerAds || state.ownerAds.length === 0) return null;
    return state.ownerAds.find(a => (a.id || a._id) === state.activeOwnerAdId) || state.ownerAds[0];
}

// ── OWNER TAB 1: OVERVIEW ──

async function loadOwnerOverviewTab() {
    const ad = getActiveOwnerAd();
    if (!ad) {
        renderOwnerEmptyState();
        return;
    }

    const welcomeTitle = document.getElementById('owner-welcome-title');
    const welcomeSub = document.getElementById('owner-welcome-subtitle');
    if (welcomeTitle) welcomeTitle.textContent = `مرحباً بك: ${ad.title}`;
    if (welcomeSub) welcomeSub.textContent = `متابعة أداء وحجوزات إعلانك في ${ad.location || ad.city?.name || 'كوبا'}`;

    updateOwnerAdStatusUI(ad.active !== false);

    const previewImg = document.getElementById('owner-preview-image');
    const previewPrice = document.getElementById('owner-preview-price-tag');
    const previewTitle = document.getElementById('owner-preview-title');
    const previewLoc = document.getElementById('owner-preview-location');
    const previewCount = document.getElementById('owner-preview-photos-count');
    const previewType = document.getElementById('owner-preview-type');

    const imgSrc = ad.image?.startsWith('http') ? ad.image : (ad.image ? `/uploads/${ad.image}` : 'images/kuba-logo.jpeg');
    if (previewImg) previewImg.src = imgSrc;

    const finalP = ad.pricing?.finalPrice || ad.price || 0;
    const pUnit = ad.pricing?.pricingUnit === 'per_hour' ? 'ساعة' : 'ليلة';
    if (previewPrice) previewPrice.textContent = `${Number(finalP).toLocaleString()} ج.م / ${pUnit}`;
    if (previewTitle) previewTitle.textContent = ad.title || '--';
    if (previewLoc) previewLoc.innerHTML = `<i class="fas fa-location-dot text-[#2D4F2E] me-1"></i>${ad.location || ad.city?.name || 'غير محدد'}`;
    const photosCount = Array.isArray(ad.images) ? ad.images.length : (ad.image ? 1 : 0);
    if (previewCount) previewCount.textContent = photosCount;
    if (previewType) previewType.textContent = ad.unitType?.nameAr || ad.unitType?.name || 'وحدة سكنية';

    try {
        const adId = ad.id || ad._id;
        const res = await apiFetch(`/api/v1/admin/bookings?advertisement=${adId}`);
        state.ownerBookings = res.data?.bookings || res.data || [];
    } catch (err) {
        console.warn('Failed to load owner bookings for overview:', err);
    }

    renderOwnerOverviewKPIs();
}

function updateOwnerAdStatusUI(isActive) {
    const badge = document.getElementById('owner-ad-status-badge');
    const btn = document.getElementById('owner-toggle-status-btn');
    const btnText = document.getElementById('owner-toggle-status-text');

    if (isActive) {
        if (badge) {
            badge.textContent = 'نشط ومعروض للعملاء';
            badge.className = 'badge bg-emerald-500/90 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-emerald-400';
        }
        if (btn) btn.className = 'bg-white text-red-600 hover:bg-red-50 font-bold text-xs px-3 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer';
        if (btnText) btnText.textContent = 'إيقاف الإعلان مؤقتاً';
    } else {
        if (badge) {
            badge.textContent = 'متوقف ومخفي عن البحث';
            badge.className = 'badge bg-amber-500/90 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-amber-400';
        }
        if (btn) btn.className = 'bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-xs px-3 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer';
        if (btnText) btnText.textContent = 'تفعيل الإعلان الآن';
    }
}

async function toggleOwnerAdStatus() {
    const ad = getActiveOwnerAd();
    if (!ad) return;

    const newActive = !(ad.active !== false);
    const adId = ad.id || ad._id;

    try {
        await apiFetch(`/api/v1/admin/advertisements/${adId}`, {
            method: 'PATCH',
            body: JSON.stringify({ active: newActive }),
        });

        ad.active = newActive;
        updateOwnerAdStatusUI(newActive);
        showToast(newActive ? 'تم تفعيل الإعلان بنجاح، أصبح معروضاً للعملاء' : 'تم إيقاف الإعلان مؤقتاً، لن يظهر في نتائج البحث', 'success');
    } catch (err) {
        // apiFetch shows error
    }
}

function renderOwnerOverviewKPIs() {
    const list = state.ownerBookings || [];

    const total = list.length;
    const confirmed = list.filter(b => b.status === 'confirmed').length;
    const pending = list.filter(b => b.status === 'pending').length;
    const revenue = list
        .filter(b => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

    const totalEl = document.getElementById('owner-kpi-total-bookings');
    const confEl = document.getElementById('owner-kpi-confirmed-bookings');
    const pendEl = document.getElementById('owner-kpi-pending-bookings');
    const revEl = document.getElementById('owner-kpi-revenue');

    if (totalEl) totalEl.textContent = total;
    if (confEl) confEl.textContent = confirmed;
    if (pendEl) pendEl.textContent = pending;
    if (revEl) revEl.textContent = `${Number(revenue).toLocaleString()} ج.م`;

    const recentContainer = document.getElementById('owner-overview-recent-bookings');
    if (!recentContainer) return;

    const pendingList = list.filter(b => b.status === 'pending').slice(0, 4);

    if (pendingList.length === 0) {
        recentContainer.innerHTML = '<div class="text-center py-6 text-xs text-slate-400">لا توجد طلبات حجز بانتظار التأكيد حالياً 👍</div>';
        return;
    }

    recentContainer.innerHTML = pendingList.map(b => {
        const bId = b.id || b._id;
        const customer = b.user || {};
        const startStr = b.startDate ? new Date(b.startDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }) : '';
        const endStr = b.endDate ? new Date(b.endDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }) : '';

        return `
            <div class="flex items-center justify-between p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl text-xs gap-3">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                        <i class="fas fa-calendar-day"></i>
                    </div>
                    <div>
                        <div class="font-bold text-slate-900">${customer.name || 'عميل'}</div>
                        <div class="text-[11px] text-slate-500">الفترة: ${startStr} إلى ${endStr} • <span class="font-bold text-[#2D4F2E]">${Number(b.totalPrice || 0).toLocaleString()} ج.م</span></div>
                    </div>
                </div>
                <div class="flex items-center gap-1.5">
                    <button type="button" onclick="updateOwnerBookingStatus('${bId}', 'confirmed')" class="gold-btn text-[11px] py-1 px-3 shadow-none cursor-pointer">
                        <i class="fas fa-check me-1"></i>تأكيد
                    </button>
                    <button type="button" onclick="updateOwnerBookingStatus('${bId}', 'cancelled')" class="btn-secondary text-[11px] py-1 px-2.5 text-red-600 hover:bg-red-50 cursor-pointer">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ── OWNER TAB 2: LISTING EDITOR ──

async function loadOwnerListingTab() {
    const ad = getActiveOwnerAd();
    if (!ad) return;

    populateOwnerCategories(ad.category?._id || ad.category?.id || ad.category);
    populateOwnerUnitTypes(ad.unitType?._id || ad.unitType?.id || ad.unitType);
    populateOwnerCities(ad.city?._id || ad.city?.id || ad.city);
    populateOwnerRegions(ad.city?._id || ad.city?.id || ad.city, ad.region?._id || ad.region?.id || ad.region);

    const hotelBtn = document.getElementById('owner-manage-hotel-rooms-btn');
    if (hotelBtn) {
        const isHotelAd = ad.isHotel || ad.type === 'hotel' || ad.unitType?.slug === 'hotel' || ad.unitType?.slug === 'hotel_room';
        hotelBtn.classList.toggle('hidden', !isHotelAd);
    }

    const titleInput = document.getElementById('owner-form-title');
    const descInput = document.getElementById('owner-form-description');
    if (titleInput) titleInput.value = ad.title || '';
    if (descInput) descInput.value = ad.description || '';

    const p = ad.pricing || {};
    const basePrice = document.getElementById('owner-form-base-price');
    const pricingUnit = document.getElementById('owner-form-pricing-unit');
    const minDuration = document.getElementById('owner-form-min-duration');
    const discountType = document.getElementById('owner-form-discount-type');
    const discountValue = document.getElementById('owner-form-discount-value');

    if (basePrice) basePrice.value = p.basePrice || ad.price || '';
    if (pricingUnit) pricingUnit.value = p.pricingUnit || 'per_night';
    if (minDuration) minDuration.value = p.minDuration || 1;
    if (discountType) discountType.value = p.discountType || 'none';
    if (discountValue) discountValue.value = p.discountValue || 0;

    calcOwnerFinalPrice();

    const utId = ad.unitType?._id || ad.unitType?.id || ad.unitType;
    if (utId) {
        await onOwnerUnitTypeChanged(ad.attributes || {});
    }

    const locInput = document.getElementById('owner-form-location');
    const addrInput = document.getElementById('owner-form-address');
    const latInput = document.getElementById('owner-form-latitude');
    const lngInput = document.getElementById('owner-form-longitude');

    if (locInput) locInput.value = ad.location || '';
    if (addrInput) addrInput.value = ad.address || '';

    const hasCoords = ad.latitude !== null && ad.latitude !== undefined && !isNaN(Number(ad.latitude)) &&
                      ad.longitude !== null && ad.longitude !== undefined && !isNaN(Number(ad.longitude));

    if (hasCoords) {
        if (latInput) latInput.value = Number(ad.latitude);
        if (lngInput) lngInput.value = Number(ad.longitude);
    } else {
        if (latInput) latInput.value = '';
        if (lngInput) lngInput.value = '';
    }

    const activeCheck = document.getElementById('owner-form-active');
    if (activeCheck) activeCheck.checked = ad.active !== false;

    setTimeout(() => {
        initOwnerMapPicker();
        if (state.ownerMapInstance) {
            state.ownerMapInstance.invalidateSize();
            if (hasCoords) {
                setOwnerMapCoordinates(Number(ad.latitude), Number(ad.longitude), true);
            } else {
                state.ownerMapInstance.setView([27.041086, 33.891272], 11);
                if (state.ownerMapMarker) {
                    state.ownerMapInstance.removeLayer(state.ownerMapMarker);
                    state.ownerMapMarker = null;
                }
            }
        }
    }, 200);
}

function populateOwnerCategories(selectedId) {
    const select = document.getElementById('owner-form-category');
    if (!select) return;
    select.innerHTML = '<option value="">-- اختر القسم --</option>' +
        state.categories.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}" ${String(id) === String(selectedId) ? 'selected' : ''}>${c.name}</option>`;
        }).join('');
}

function populateOwnerUnitTypes(selectedId) {
    const select = document.getElementById('owner-form-unit-type');
    if (!select) return;
    select.innerHTML = '<option value="">-- اختر نوع الوحدة --</option>' +
        state.unitTypes.map(ut => {
            const id = ut.id || ut._id;
            return `<option value="${id}" ${String(id) === String(selectedId) ? 'selected' : ''}>${ut.nameAr || ut.name} (${ut.slug})</option>`;
        }).join('');
}

function populateOwnerCities(selectedId) {
    const select = document.getElementById('owner-form-city');
    if (!select) return;
    select.innerHTML = '<option value="">-- اختر المدينة --</option>' +
        state.cities.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}" ${String(id) === String(selectedId) ? 'selected' : ''}>${c.name}</option>`;
        }).join('');
}

function populateOwnerRegions(cityId, selectedRegionId) {
    const select = document.getElementById('owner-form-region');
    if (!select) return;

    let regions = state.regions;
    if (cityId) {
        regions = regions.filter(r => {
            const rCity = r.city?._id || r.city?.id || r.city;
            return String(rCity) === String(cityId);
        });
    }

    select.innerHTML = '<option value="">-- اختر المنطقة --</option>' +
        regions.map(r => {
            const id = r.id || r._id;
            return `<option value="${id}" ${String(id) === String(selectedRegionId) ? 'selected' : ''}>${r.name}</option>`;
        }).join('');
}

function onOwnerCityChange() {
    const cityId = document.getElementById('owner-form-city')?.value;
    populateOwnerRegions(cityId, '');
}

async function onOwnerUnitTypeChanged(existingAttributes = null) {
    const select = document.getElementById('owner-form-unit-type');
    const container = document.getElementById('owner-dynamic-attributes-container');
    const pricingUnitSelect = document.getElementById('owner-form-pricing-unit');

    if (!select || !select.value) {
        if (container) container.innerHTML = '';
        return;
    }

    const unitTypeId = select.value;
    const ut = state.unitTypes.find(u => (u.id || u._id) === unitTypeId);

    if (ut && pricingUnitSelect) {
        const allowedUnits = ut.pricingUnits || ['per_night'];
        const unitLabels = {
            per_night: 'بالليلة (Per Night)',
            per_hour: 'بالساعة (Per Hour)',
            per_day: 'باليوم (Per Day)',
            per_trip: 'بالرحلة (Per Trip)',
            fixed: 'سعر ثابت (Fixed)',
        };
        const curPricingUnit = pricingUnitSelect.value;
        pricingUnitSelect.innerHTML = allowedUnits.map(u => `<option value="${u}">${unitLabels[u] || u}</option>`).join('');
        if (allowedUnits.includes(curPricingUnit)) pricingUnitSelect.value = curPricingUnit;
    }

    if (!container) return;

    try {
        const res = await apiFetch(`/api/v1/admin/unit-types/${unitTypeId}/attributes`, { silent: true });
        const attributes = res.data || [];

        if (attributes.length === 0) {
            container.innerHTML = '<div class="col-span-full text-slate-400 text-xs py-2">لا توجد خصائص إضافية مخصصة لنوع الوحدة هذا.</div>';
            return;
        }

        const ad = getActiveOwnerAd();
        const currentVals = existingAttributes || ad?.attributes || {};

        container.innerHTML = attributes.map(attr => {
            const key = attr.name;
            const label = attr.labelAr || attr.label || attr.name;
            const val = currentVals[key] !== undefined ? currentVals[key] : (attr.defaultValue ?? '');

            if (attr.type === 'boolean') {
                const isChecked = val === true || val === 'true';
                return `
                    <div class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                        <input type="checkbox" id="owner-attr-${key}" name="owner_attr_${key}" data-attr-key="${key}" data-attr-type="boolean" ${isChecked ? 'checked' : ''} class="rounded border-slate-300 text-[#2D4F2E] focus:ring-[#2D4F2E]">
                        <label for="owner-attr-${key}" class="text-xs font-semibold text-slate-700 cursor-pointer">${label}</label>
                    </div>
                `;
            } else if (attr.type === 'number') {
                return `
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${label} ${attr.required ? '*' : ''}</label>
                        <input type="number" id="owner-attr-${key}" name="owner_attr_${key}" data-attr-key="${key}" data-attr-type="number" value="${val}" ${attr.required ? 'required' : ''} class="form-input text-xs" placeholder="${label}">
                    </div>
                `;
            } else if (attr.type === 'select' && Array.isArray(attr.options)) {
                return `
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${label} ${attr.required ? '*' : ''}</label>
                        <select id="owner-attr-${key}" name="owner_attr_${key}" data-attr-key="${key}" data-attr-type="select" ${attr.required ? 'required' : ''} class="form-select text-xs">
                            <option value="">-- اختر --</option>
                            ${attr.options.map(opt => `<option value="${opt}" ${String(val) === String(opt) ? 'selected' : ''}>${opt}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else {
                return `
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${label} ${attr.required ? '*' : ''}</label>
                        <input type="text" id="owner-attr-${key}" name="owner_attr_${key}" data-attr-key="${key}" data-attr-type="text" value="${val}" ${attr.required ? 'required' : ''} class="form-input text-xs" placeholder="${label}">
                    </div>
                `;
            }
        }).join('');
    } catch (err) {
        console.warn('Failed to load attributes for owner form:', err);
    }
}

function calcOwnerFinalPrice() {
    const basePrice = parseFloat(document.getElementById('owner-form-base-price')?.value) || 0;
    const discountType = document.getElementById('owner-form-discount-type')?.value || 'none';
    const discountVal = parseFloat(document.getElementById('owner-form-discount-value')?.value) || 0;

    let finalPrice = basePrice;
    if (discountType === 'percentage') {
        const pct = Math.min(Math.max(discountVal, 0), 100);
        finalPrice = basePrice - (basePrice * (pct / 100));
    } else if (discountType === 'fixed') {
        finalPrice = Math.max(0, basePrice - discountVal);
    }

    finalPrice = Math.round(finalPrice * 100) / 100;

    const finalInput = document.getElementById('owner-form-final-price');
    const finalBadge = document.getElementById('owner-form-final-badge');

    if (finalInput) finalInput.value = finalPrice;
    if (finalBadge) finalBadge.textContent = `السعر النهائي: ${finalPrice.toLocaleString()} ج.م`;
}

// ── Leaflet Map Picker for Owner Listing ──
function initOwnerMapPicker() {
    if (typeof L === 'undefined') return;

    if (!state.ownerMapInstance) {
        state.ownerMapInstance = L.map('owner-map-picker', {
            center: [27.041086, 33.891272],
            zoom: 12,
            scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(state.ownerMapInstance);

        state.ownerMapInstance.on('click', (e) => {
            setOwnerMapCoordinates(e.latlng.lat, e.latlng.lng, false);
        });
    }

    setTimeout(() => {
        if (state.ownerMapInstance) state.ownerMapInstance.invalidateSize();
    }, 150);
}

function setOwnerMapCoordinates(lat, lng, panTo = true) {
    if (typeof L === 'undefined') return;
    initOwnerMapPicker();
    if (!state.ownerMapInstance) return;

    const numLat = Number(Number(lat).toFixed(6));
    const numLng = Number(Number(lng).toFixed(6));

    const latInput = document.getElementById('owner-form-latitude');
    const lngInput = document.getElementById('owner-form-longitude');
    if (latInput) latInput.value = numLat;
    if (lngInput) lngInput.value = numLng;

    if (!state.ownerMapMarker) {
        state.ownerMapMarker = L.marker([numLat, numLng], { draggable: true }).addTo(state.ownerMapInstance);
        state.ownerMapMarker.on('dragend', (e) => {
            const pos = e.target.getLatLng();
            setOwnerMapCoordinates(pos.lat, pos.lng, false);
        });
    } else {
        state.ownerMapMarker.setLatLng([numLat, numLng]);
    }

    if (panTo) {
        state.ownerMapInstance.panTo([numLat, numLng]);
    }
}

function getOwnerCurrentLocation() {
    if (!navigator.geolocation) {
        showToast('المتصفح لا يدعم تحديد الموقع الجغرافي', 'error');
        return;
    }

    showToast('جاري تحديد موقعك الجغرافي...', 'info');
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setOwnerMapCoordinates(pos.coords.latitude, pos.coords.longitude, true);
            showToast('تم تحديد الموقع بنجاح', 'success');
        },
        (err) => {
            showToast(`فشل في تحديد الموقع: ${err.message}`, 'error');
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function saveOwnerListingForm() {
    const form = document.getElementById('owner-listing-form');
    if (form) {
        if (form.reportValidity()) {
            handleOwnerListingSubmit(new Event('submit'));
        }
    }
}

async function handleOwnerListingSubmit(e) {
    if (e) e.preventDefault();

    const ad = getActiveOwnerAd();
    if (!ad) {
        showToast('لا يوجد إعلان محدد للحفظ', 'error');
        return;
    }
    const adId = ad.id || ad._id;

    const title = document.getElementById('owner-form-title')?.value.trim();
    if (!title) {
        showToast('عنوان الإعلان مطلوب', 'error');
        return;
    }

    const category = document.getElementById('owner-form-category')?.value || null;
    const unitType = document.getElementById('owner-form-unit-type')?.value || null;
    const city = document.getElementById('owner-form-city')?.value || null;
    const region = document.getElementById('owner-form-region')?.value || null;
    const description = document.getElementById('owner-form-description')?.value.trim() || '';

    const basePrice = parseFloat(document.getElementById('owner-form-base-price')?.value) || 0;
    const pricingUnit = document.getElementById('owner-form-pricing-unit')?.value || 'per_night';
    const minDuration = parseInt(document.getElementById('owner-form-min-duration')?.value, 10) || 1;
    const discountType = document.getElementById('owner-form-discount-type')?.value || 'none';
    const discountValue = parseFloat(document.getElementById('owner-form-discount-value')?.value) || 0;

    const location = document.getElementById('owner-form-location')?.value.trim() || '';
    const address = document.getElementById('owner-form-address')?.value.trim() || '';
    const lat = document.getElementById('owner-form-latitude')?.value;
    const lng = document.getElementById('owner-form-longitude')?.value;

    const active = document.getElementById('owner-form-active')?.checked !== false;

    const attributes = {};
    document.querySelectorAll('#owner-dynamic-attributes-container [data-attr-key]').forEach(el => {
        const key = el.getAttribute('data-attr-key');
        const type = el.getAttribute('data-attr-type');
        if (type === 'boolean') {
            attributes[key] = el.checked;
        } else if (type === 'number') {
            attributes[key] = el.value !== '' ? Number(el.value) : null;
        } else {
            attributes[key] = el.value;
        }
    });

    const payload = {
        title,
        description,
        category,
        unitType,
        city,
        region,
        location,
        address,
        active,
        basePrice,
        price: basePrice,
        pricingUnit,
        minDuration,
        discountType,
        discountValue,
        attributes,
    };

    if (lat !== '' && lng !== '' && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
        payload.latitude = Number(lat);
        payload.longitude = Number(lng);
    }

    try {
        const res = await apiFetch(`/api/v1/admin/advertisements/${adId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        });

        showToast('تم حفظ وتحديث بيانات الإعلان بنجاح!', 'success');

        if (res.data) {
            const updated = res.data.advertisement || res.data;
            const idx = state.ownerAds.findIndex(a => (a.id || a._id) === adId);
            if (idx !== -1) {
                state.ownerAds[idx] = { ...state.ownerAds[idx], ...updated };
            }
        }

        loadOwnerOverviewTab();
    } catch (err) {
        // apiFetch shows error toast
    }
}

// ── OWNER TAB 3: GALLERY MANAGER ──

async function loadOwnerGalleryTab() {
    const ad = getActiveOwnerAd();
    if (!ad) return;

    renderOwnerGalleryImages(ad);
}

function renderOwnerGalleryImages(ad) {
    const container = document.getElementById('owner-gallery-images-grid');
    const countEl = document.getElementById('owner-gallery-count');
    if (!container) return;

    let images = [];
    if (Array.isArray(ad.images) && ad.images.length > 0) {
        images = [...ad.images];
    } else if (ad.image) {
        images = [ad.image];
    }

    if (countEl) countEl.textContent = images.length;

    if (images.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-slate-400">
                <i class="fas fa-images text-4xl mb-3 text-slate-300"></i>
                <div class="text-xs font-semibold">لم تقم بإضافة صور لهذا الإعلان بعد</div>
                <div class="text-[11px] text-slate-400 mt-1">قم برفع أول صورة من المربع أعلاه لظهور إعلانك بشكل جذاب</div>
            </div>
        `;
        return;
    }

    const mainImg = ad.image || images[0];

    container.innerHTML = images.map((img, idx) => {
        const isMain = img === mainImg;
        const fullSrc = img.startsWith('http') ? img : `/uploads/${img}`;

        return `
            <div class="card overflow-hidden p-0 bg-white border ${isMain ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-200'} rounded-xl group relative shadow-sm transition hover:shadow-md">
                <div class="relative h-36 bg-slate-100 overflow-hidden">
                    <img src="${fullSrc}" alt="Listing Photo" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='images/kuba-logo.jpeg'">
                    
                    ${isMain ? `
                        <div class="absolute top-2 start-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                            <i class="fas fa-crown text-[9px]"></i>
                            <span>الغلاف الرئيسي</span>
                        </div>
                    ` : ''}

                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 p-2">
                        ${!isMain ? `
                            <button type="button" onclick="setOwnerMainImage('${img}')" class="bg-white/95 text-slate-900 hover:bg-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow transition cursor-pointer flex items-center gap-1">
                                <i class="fas fa-star text-amber-500"></i>
                                <span>تعيين كغلاف</span>
                            </button>
                        ` : ''}
                        <button type="button" onclick="deleteOwnerImage('${img}')" class="bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow transition cursor-pointer flex items-center gap-1" title="حذف الصورة">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>

                <div class="p-2 flex items-center justify-between text-[11px] bg-slate-50 border-t border-slate-100">
                    <span class="text-slate-400 font-mono">صورة #${idx + 1}</span>
                    <button type="button" onclick="deleteOwnerImage('${img}')" class="text-red-500 hover:text-red-700 text-xs cursor-pointer" title="حذف">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function handleOwnerImagesUpload(e) {
    if (e) e.preventDefault();
    const ad = getActiveOwnerAd();
    if (!ad) return;
    const adId = ad.id || ad._id;

    const fileInput = document.getElementById('owner-gallery-files-input');
    const urlInput = document.getElementById('owner-gallery-url-input');
    const uploadBtn = document.getElementById('owner-gallery-upload-btn');

    const files = fileInput?.files;
    const url = urlInput?.value.trim();

    if ((!files || files.length === 0) && !url) {
        showToast('يرجى اختيار صور لرفعها أو إدخال رابط مباشر', 'warning');
        return;
    }

    const originalBtnHtml = uploadBtn?.innerHTML;
    if (uploadBtn) {
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>جاري الرفع...';
    }

    try {
        let res;
        if (files && files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            res = await apiFetch(`/api/v1/admin/advertisements/${adId}/images`, {
                method: 'POST',
                body: formData,
            });
        } else if (url) {
            res = await apiFetch(`/api/v1/admin/advertisements/${adId}/images`, {
                method: 'POST',
                body: JSON.stringify({ imageUrl: url }),
            });
        }

        showToast(res.message || 'تم رفع الصور بنجاح', 'success');

        if (fileInput) fileInput.value = '';
        if (urlInput) urlInput.value = '';

        if (res.data?.advertisement) {
            const updated = res.data.advertisement;
            const idx = state.ownerAds.findIndex(a => (a.id || a._id) === adId);
            if (idx !== -1) {
                state.ownerAds[idx] = { ...state.ownerAds[idx], ...updated };
            }
            renderOwnerGalleryImages(updated);
        }
    } catch (err) {
        // apiFetch shows error toast
    } finally {
        if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = originalBtnHtml;
        }
    }
}

async function deleteOwnerImage(imagePath) {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة من المعرض؟')) return;

    const ad = getActiveOwnerAd();
    if (!ad) return;
    const adId = ad.id || ad._id;

    try {
        const res = await apiFetch(`/api/v1/admin/advertisements/${adId}/images`, {
            method: 'DELETE',
            body: JSON.stringify({ image: imagePath }),
        });

        showToast(res.message || 'تم حذف الصورة بنجاح', 'success');

        if (res.data?.advertisement) {
            const updated = res.data.advertisement;
            const idx = state.ownerAds.findIndex(a => (a.id || a._id) === adId);
            if (idx !== -1) {
                state.ownerAds[idx] = { ...state.ownerAds[idx], ...updated };
            }
            renderOwnerGalleryImages(updated);
        }
    } catch (err) {
        // apiFetch shows error toast
    }
}

async function setOwnerMainImage(imagePath) {
    const ad = getActiveOwnerAd();
    if (!ad) return;
    const adId = ad.id || ad._id;

    try {
        const res = await apiFetch(`/api/v1/admin/advertisements/${adId}/set-main-image`, {
            method: 'PATCH',
            body: JSON.stringify({ image: imagePath }),
        });

        showToast(res.message || 'تم تعيين الصورة كغلاف رئيسي للإعلان', 'success');

        if (res.data?.advertisement) {
            const updated = res.data.advertisement;
            const idx = state.ownerAds.findIndex(a => (a.id || a._id) === adId);
            if (idx !== -1) {
                state.ownerAds[idx] = { ...state.ownerAds[idx], ...updated };
            }
            renderOwnerGalleryImages(updated);
        }
    } catch (err) {
        // apiFetch shows error toast
    }
}

// ── OWNER TAB 4: BOOKINGS ──

async function loadOwnerBookingsTab() {
    const container = document.getElementById('owner-bookings-cards-container');
    if (container) {
        container.innerHTML = '<div class="card p-8 text-center text-xs text-slate-400">جاري تحميل طلبات الحجز...</div>';
    }

    const ad = getActiveOwnerAd();
    const adId = ad ? (ad.id || ad._id) : '';

    try {
        const endpoint = adId ? `/api/v1/admin/bookings?advertisement=${adId}` : '/api/v1/admin/bookings';
        const res = await apiFetch(endpoint);
        state.ownerBookings = res.data?.bookings || res.data || [];

        const pendingCount = state.ownerBookings.filter(b => b.status === 'pending').length;
        const badge = document.getElementById('owner-pending-badge-count');
        if (badge) {
            badge.textContent = pendingCount;
            badge.classList.toggle('hidden', pendingCount === 0);
        }

        renderOwnerBookings();
    } catch (err) {
        if (container) {
            container.innerHTML = `<div class="card p-8 text-center text-xs text-red-500">فشل في تحميل الحجوزات: ${err.message}</div>`;
        }
    }
}

function filterOwnerBookings(status) {
    state.ownerCurrentBookingFilter = status || 'all';

    document.querySelectorAll('.owner-booking-tab-btn').forEach(btn => {
        const isMatch = btn.getAttribute('onclick')?.includes(`'${status}'`);
        if (isMatch) {
            btn.className = 'owner-booking-tab-btn active px-3 py-1.5 rounded-lg text-xs font-bold transition bg-[#2D4F2E] text-white cursor-pointer';
        } else {
            btn.className = 'owner-booking-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer';
        }
    });

    renderOwnerBookings();
}

function filterOwnerBookingsText() {
    renderOwnerBookings();
}

function renderOwnerBookings() {
    const container = document.getElementById('owner-bookings-cards-container');
    if (!container) return;

    const list = state.ownerBookings || [];
    const filter = state.ownerCurrentBookingFilter || 'all';
    const search = document.getElementById('owner-booking-search-input')?.value.trim().toLowerCase() || '';

    let filtered = list;
    if (filter !== 'all') {
        filtered = filtered.filter(b => b.status === filter);
    }
    if (search) {
        filtered = filtered.filter(b => {
            const userName = b.user?.name?.toLowerCase() || '';
            const userPhone = b.user?.phone?.toLowerCase() || '';
            const bId = (b.id || b._id || '').toLowerCase();
            return userName.includes(search) || userPhone.includes(search) || bId.includes(search);
        });
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="card p-10 text-center text-xs text-slate-400 bg-white">
                <i class="fas fa-calendar-xmark text-4xl mb-3 text-slate-300"></i>
                <div class="font-bold text-slate-600">لا توجد حجوزات في هذا التصنيف</div>
                <div class="text-[11px] text-slate-400 mt-1">ستظهر طلبات الحجز هنا فور قيام العملاء بحجز إعلانك</div>
            </div>
        `;
        return;
    }

    const statusBadge = {
        pending: '<span class="badge bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold py-1 px-2.5">قيد الانتظار</span>',
        confirmed: '<span class="badge bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold py-1 px-2.5">مؤكد ومقبول</span>',
        completed: '<span class="badge bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold py-1 px-2.5">مكتمل</span>',
        cancelled: '<span class="badge bg-red-100 text-red-800 border border-red-300 text-xs font-bold py-1 px-2.5">ملغي</span>',
    };

    container.innerHTML = filtered.map(b => {
        const bId = b.id || b._id;
        const shortId = bId ? bId.substring(bId.length - 6) : '--';
        const customer = b.user || {};
        const startStr = b.startDate ? new Date(b.startDate).toLocaleDateString('ar-EG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '--';
        const endStr = b.endDate ? new Date(b.endDate).toLocaleDateString('ar-EG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '--';

        const phoneNum = customer.phone || '';
        const waLink = phoneNum ? `https://wa.me/${phoneNum.replace(/[^0-9]/g, '')}` : null;

        return `
            <div class="card p-5 bg-white space-y-4 border border-slate-200 transition hover:border-[#2D4F2E]/40">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div class="flex items-center gap-3">
                        <span class="font-mono font-bold text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">#${shortId}</span>
                        <div>
                            <span class="text-xs text-slate-400">تاريخ الطلب:</span>
                            <span class="text-xs font-semibold text-slate-700">${b.createdAt ? new Date(b.createdAt).toLocaleDateString('ar-EG') : '--'}</span>
                        </div>
                    </div>
                    <div>${statusBadge[b.status] || b.status}</div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div class="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                            <i class="fas fa-user text-[#2D4F2E]"></i>
                            <span>بيانات العميل</span>
                        </div>
                        <div class="font-bold text-slate-900 text-sm">${customer.name || 'عميل'}</div>
                        <div class="text-slate-600 font-mono">${customer.phone || 'بدون هاتف'}</div>
                        <div class="text-[11px] text-slate-400">${customer.email || ''}</div>
                        ${phoneNum ? `
                            <div class="flex items-center gap-2 pt-1.5">
                                <a href="tel:${phoneNum}" class="text-[11px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-2 py-1 rounded-md transition flex items-center gap-1">
                                    <i class="fas fa-phone text-emerald-600"></i>اتصال
                                </a>
                                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded-md transition flex items-center gap-1">
                                    <i class="fab fa-whatsapp"></i>واتساب
                                </a>
                            </div>
                        ` : ''}
                    </div>

                    <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div class="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                            <i class="fas fa-calendar-range text-[#2D4F2E]"></i>
                            <span>فترة الإقامة</span>
                        </div>
                        <div>من: <span class="font-bold text-slate-900">${startStr}</span></div>
                        <div>إلى: <span class="font-bold text-slate-900">${endStr}</span></div>
                        <div class="text-[11px] text-slate-500">المدة: <span class="font-bold text-[#2D4F2E]">${b.duration || 1}</span> ${b.pricingUnit === 'per_hour' ? 'ساعات' : 'أيام / ليال'}</div>
                        ${b.room ? `
                            <div class="mt-1 inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                <i class="fas fa-door-closed text-[9px]"></i>
                                <span>غرفة: ${b.room.title || b.room.roomNumber || 'غرفة فندقية'}</span>
                            </div>
                        ` : ''}
                    </div>

                    <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div class="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                            <i class="fas fa-receipt text-[#2D4F2E]"></i>
                            <span>التكلفة والحساب</span>
                        </div>
                        <div class="text-xl font-black text-[#2D4F2E]">${Number(b.totalPrice || 0).toLocaleString()} ج.م</div>
                        <div class="text-[11px] text-slate-500">حالة الدفع: <span class="font-bold ${b.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}">${b.paymentStatus === 'paid' ? 'مدفوع' : 'غير مدفوع (عند الوصول)'}</span></div>
                        ${b.notes ? `<div class="text-[11px] text-slate-500 italic mt-1">ملاحظات: "${b.notes}"</div>` : ''}
                    </div>
                </div>

                <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    ${b.status === 'pending' ? `
                        <button type="button" onclick="updateOwnerBookingStatus('${bId}', 'confirmed')" class="gold-btn text-xs py-1.5 px-4 shadow-sm cursor-pointer">
                            <i class="fas fa-check-circle me-1"></i>
                            <span>تأكيد الحجز</span>
                        </button>
                        <button type="button" onclick="updateOwnerBookingStatus('${bId}', 'cancelled')" class="btn-secondary text-xs py-1.5 px-3 text-red-600 hover:bg-red-50 hover:border-red-300 cursor-pointer">
                            <i class="fas fa-times me-1"></i>
                            <span>رفض / إلغاء</span>
                        </button>
                    ` : ''}

                    ${b.status === 'confirmed' ? `
                        <button type="button" onclick="updateOwnerBookingStatus('${bId}', 'completed')" class="btn-secondary text-xs py-1.5 px-3.5 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 cursor-pointer">
                            <i class="fas fa-flag-checkered me-1"></i>
                            <span>اكتمال الحجز</span>
                        </button>
                        <button type="button" onclick="updateOwnerBookingStatus('${bId}', 'cancelled')" class="btn-secondary text-xs py-1.5 px-3 text-red-600 hover:bg-red-50 cursor-pointer">
                            <i class="fas fa-ban me-1"></i>
                            <span>إلغاء</span>
                        </button>
                    ` : ''}

                    ${b.status === 'completed' || b.status === 'cancelled' ? `
                        <span class="text-xs text-slate-400 font-semibold">لا توجد إجراءات إضافية على هذا الحجز</span>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

async function updateOwnerBookingStatus(bookingId, newStatus) {
    if (!bookingId || !newStatus) return;

    if (newStatus === 'cancelled') {
        if (!confirm('هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟')) return;
    }

    try {
        await apiFetch(`/api/v1/admin/bookings/${bookingId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus }),
        });

        const statusLabels = {
            confirmed: 'تم تأكيد الحجز بنجاح!',
            completed: 'تم تعيين الحجز كمكتمل بنجاح!',
            cancelled: 'تم إلغاء الحجز',
        };

        showToast(statusLabels[newStatus] || 'تم تحديث حالة الحجز', 'success');

        const item = state.ownerBookings.find(b => (b.id || b._id) === bookingId);
        if (item) item.status = newStatus;

        renderOwnerOverviewKPIs();
        renderOwnerBookings();
    } catch (err) {
        // apiFetch shows error toast
    }
}

// ── OWNER TAB 5: PROFILE & SECURITY ──

function loadOwnerProfileTab() {
    const user = state.user || {};
    const nameInput = document.getElementById('owner-profile-name');
    const emailInput = document.getElementById('owner-profile-email');
    const phoneInput = document.getElementById('owner-profile-phone');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
}

async function handleOwnerProfileUpdate(e) {
    if (e) e.preventDefault();
    const user = state.user;
    if (!user) return;
    const userId = user.id || user._id;

    const name = document.getElementById('owner-profile-name')?.value.trim();
    const phone = document.getElementById('owner-profile-phone')?.value.trim();

    if (!name) {
        showToast('الاسم مطلوب', 'error');
        return;
    }

    try {
        await apiFetch(`/api/v1/admin/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({ name, phone }),
        });

        showToast('تم تحديث البيانات الشخصية بنجاح', 'success');

        state.user = { ...state.user, name, phone };
        localStorage.setItem('kuba_admin_user', JSON.stringify(state.user));
        updateAdminProfileUI();
    } catch (err) {
        // apiFetch shows error toast
    }
}

async function handleOwnerPasswordUpdate(e) {
    if (e) e.preventDefault();
    const user = state.user;
    if (!user) return;
    const userId = user.id || user._id;

    const newPassword = document.getElementById('owner-new-password')?.value;
    const confirmPassword = document.getElementById('owner-confirm-password')?.value;

    if (!newPassword || newPassword.length < 8) {
        showToast('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('كلمتا المرور غير متطابقتين', 'error');
        return;
    }

    try {
        await apiFetch(`/api/v1/admin/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({ password: newPassword }),
        });

        showToast('تم تغيير كلمة المرور بنجاح!', 'success');
        document.getElementById('owner-password-form')?.reset();
    } catch (err) {
        // apiFetch shows error toast
    }
}


// ─── INITIALIZATION ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage();
    checkAuth();

    // Event listeners
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('user-form')?.addEventListener('submit', handleUserFormSubmit);
    document.getElementById('onboarding-form')?.addEventListener('submit', handleOnboardingFormSubmit);
    document.getElementById('category-form')?.addEventListener('submit', handleCategoryFormSubmit);
    document.getElementById('banner-form')?.addEventListener('submit', handleBannerFormSubmit);
    document.getElementById('region-form')?.addEventListener('submit', handleRegionFormSubmit);
    document.getElementById('advertisement-form')?.addEventListener('submit', handleAdvertisementFormSubmit);
    document.getElementById('unit-type-form')?.addEventListener('submit', handleUnitTypeFormSubmit);
    document.getElementById('attribute-form')?.addEventListener('submit', handleAttributeFormSubmit);

    // Ad Owner Management listeners
    document.getElementById('ad-owner-create-form')?.addEventListener('submit', handleAdOwnerCreateSubmit);
    document.getElementById('ad-owner-select-form')?.addEventListener('submit', handleAdOwnerSelectSubmit);

    // Owner Portal listeners
    document.getElementById('owner-listing-form')?.addEventListener('submit', handleOwnerListingSubmit);
    document.getElementById('owner-gallery-upload-form')?.addEventListener('submit', handleOwnerImagesUpload);
    document.getElementById('owner-profile-form')?.addEventListener('submit', handleOwnerProfileUpdate);
    document.getElementById('owner-password-form')?.addEventListener('submit', handleOwnerPasswordUpdate);

    // Sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;
            if (tab) switchTab(tab);
        });
    });

    // Close modal on escape or backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (currentFullscreenMapType) {
                exitMapFullscreen();
                return;
            }
            const attrModal = document.getElementById('attribute-modal');
            if (attrModal && attrModal.classList.contains('active')) {
                attrModal.classList.remove('active');
                return;
            }
            const activeOverlays = Array.from(document.querySelectorAll('.modal-overlay.active'));
            if (activeOverlays.length > 0) {
                activeOverlays[activeOverlays.length - 1].classList.remove('active');
            }
        }
    });
});
