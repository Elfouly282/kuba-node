// ─── Kuba Admin Dashboard Application ─────────────────────────────────────────

const I18N = {
    ar: {
        appName: 'لوحة تحكم كوبا',
        appSubtitle: 'الإدارة والتحكم الشامل بالتطبيق',
        overview: 'نظرة عامة',
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
    },
    en: {
        appName: 'Kuba Admin Dashboard',
        appSubtitle: 'Comprehensive Application Management',
        overview: 'Overview',
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
    regions: [],
    unitTypes: [],
    selectedUnitTypeId: null,
    unitTypeAttributes: [],
    editingUserId: null,
    editingScreenId: null,
    editingCategoryId: null,
    editingBannerId: null,
    bannerPositionFilter: 'all',
    editingRegionId: null,
    editingAdvertisementId: null,
    editingUnitTypeId: null,
    editingAttributeId: null,
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

function checkAuth() {
    const authScreen = document.getElementById('auth-screen');
    const appScreen = document.getElementById('app-screen');

    if (!state.token) {
        authScreen.classList.remove('hidden');
        appScreen.classList.add('hidden');
    } else {
        authScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
        updateAdminProfileUI();
        loadCurrentTab();
    }
}

function updateAdminProfileUI() {
    const nameEl = document.getElementById('header-admin-name');
    const emailEl = document.getElementById('header-admin-email');
    if (nameEl) nameEl.textContent = state.user?.name || 'Administrator';
    if (emailEl) emailEl.textContent = state.user?.email || '';
}

// ─── NAVIGATION & TABS ────────────────────────────────────────────────────────

function switchTab(tab) {
    state.currentTab = tab;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.tab === tab) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-view').forEach(view => {
        if (view.id === `view-${tab}`) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });

    loadCurrentTab();
}

function loadCurrentTab() {
    if (state.currentTab === 'overview') {
        loadStats();
    } else if (state.currentTab === 'users') {
        loadUsers();
    } else if (state.currentTab === 'regions') {
        loadRegions();
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
    }
}

// ─── OVERVIEW / STATS ─────────────────────────────────────────────────────────

async function loadStats() {
    try {
        const res = await apiFetch('/api/v1/admin/users/stats');
        state.stats = res.data;
        renderStats();
    } catch (err) {
        console.error('Stats loading error:', err);
    }
}

function renderStats() {
    if (!state.stats) return;
    const s = state.stats;

    document.getElementById('stat-total-users').textContent = s.totalUsers || 0;
    document.getElementById('stat-active-users').textContent = s.activeUsers || 0;
    document.getElementById('stat-verified-users').textContent = s.verifiedUsers || 0;
    document.getElementById('stat-onboarding').textContent = s.totalOnboarding || 0;
    const statCategories = document.getElementById('stat-categories');
    if (statCategories) statCategories.textContent = s.totalCategories || 0;
    const statBanners = document.getElementById('stat-banners');
    if (statBanners) statBanners.textContent = s.totalBanners || 0;
    const statRegions = document.getElementById('stat-regions');
    if (statRegions) statRegions.textContent = s.totalRegions || 0;
    const statAds = document.getElementById('stat-advertisements');
    if (statAds) statAds.textContent = s.totalAdvertisements || 0;
    const statUnitTypes = document.getElementById('stat-unit-types');
    if (statUnitTypes) statUnitTypes.textContent = s.totalUnitTypes || 0;
    const statBookings = document.getElementById('stat-bookings');
    if (statBookings) statBookings.textContent = s.totalBookings || 0;

    document.getElementById('info-env').textContent = s.environment || 'development';
    document.getElementById('info-time').textContent = new Date(s.serverTime).toLocaleTimeString();

    // Render recent users
    const recentList = document.getElementById('recent-users-list');
    if (recentList && s.recentUsers) {
        if (!Array.isArray(s.recentUsers) || s.recentUsers.length === 0) {
            recentList.innerHTML = `<p class="text-sm text-slate-400 py-6 text-center">لا يوجد مستخدمون حتى الآن</p>`;
        } else {
            recentList.innerHTML = s.recentUsers.map(u => `
                <div class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-slate-100 mb-2">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-[#eaf1ea] border border-[#c2d6c3] flex items-center justify-center font-black text-[#2D4F2E] text-sm shadow-sm">
                            ${(u.name || u.email || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                            <div class="font-bold text-sm text-slate-900">${u.name || 'بدون اسم'}</div>
                            <div class="text-xs text-slate-500">${u.email || u.phone || '—'}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="badge ${u.active ? 'badge-success' : 'badge-danger'}">${u.active ? t('active') : t('inactive')}</span>
                        <span class="text-xs text-slate-400 font-medium">${new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            `).join('');
        }
    }
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
    populateRegionSelects();
    document.getElementById('banner-modal').classList.add('active');
}

function openEditBannerModal(bannerId) {
    const banner = state.banners.find(b => (b.id || b._id) === bannerId);
    if (!banner) return;

    state.editingBannerId = bannerId;
    document.getElementById('banner-modal-title').textContent = `${t('edit')}: بانر (${bannerId.slice(-6)})`;
    
    populateBannerAdSelect();
    populateRegionSelects();
    const select = document.getElementById('banner-modal-ad-select');
    const input = document.getElementById('banner-modal-ad-id');
    const adId = banner.advertisementId;
    if (select) select.value = adId;
    if (input) input.value = adId;

    const posSelect = document.getElementById('banner-modal-position');
    if (posSelect) posSelect.value = banner.position || 'top';

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
        if (region) payload.append('region', region);
        payload.append('image', imageFile);
    } else if (imageUrl) {
        payload = JSON.stringify({ advertisementId, position, image: imageUrl, region: region || null });
    } else if (state.editingBannerId) {
        payload = JSON.stringify({ advertisementId, position, region: region || null });
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

// ─── REGIONS MANAGEMENT ───────────────────────────────────────────────────────

async function loadRegions() {
    try {
        const res = await apiFetch('/api/v1/admin/regions');
        state.regions = res.data?.regions || [];
        renderRegions();
        populateRegionSelects();
    } catch (err) {
        console.error('Error loading regions:', err);
    }
}

function renderRegions() {
    const grid = document.getElementById('regions-grid');
    const badge = document.getElementById('badge-regions-count');
    if (badge) badge.textContent = `${state.regions.length} ${t('regions')}`;

    if (!grid) return;

    if (state.regions.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد مناطق مضافة حالياً. يمكنك إضافة منطقة جديدة بالضغط على زر "إضافة منطقة جديدة".</div>`;
        return;
    }

    grid.innerHTML = state.regions.map(region => {
        const regId = region.id || region._id;
        const imgSrc = region.image?.startsWith('http') ? region.image : (region.image ? `/uploads/${region.image}` : 'https://placehold.co/400x250?text=Region+Image');
        const isActive = region.active !== false;

        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition group relative flex flex-col justify-between">
                <div>
                    <div class="h-32 w-full rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                        <img src="${imgSrc}" alt="${region.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/400x250?text=Region+Image'">
                        <span class="absolute top-2 start-2 badge ${isActive ? 'badge-success' : 'badge-danger'} text-[10px] shadow">
                            ${isActive ? 'نشطة' : 'معطلة'}
                        </span>
                    </div>
                    <div class="font-bold text-slate-900 text-sm mb-1 flex items-center justify-between">
                        <span>${region.name}</span>
                        <span class="text-[10px] text-slate-400 font-mono">#${region.order || 0}</span>
                    </div>
                    <div class="text-[10px] text-slate-400 font-mono truncate" title="ID: ${regId}">ID: ${regId}</div>
                </div>
                <div class="flex items-center justify-end gap-1.5 pt-3 mt-2 border-t border-slate-100">
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

function openAddRegionModal() {
    state.editingRegionId = null;
    document.getElementById('region-modal-title').textContent = t('addRegion');
    document.getElementById('region-form').reset();
    document.getElementById('region-modal-active').checked = true;
    document.getElementById('region-modal-order').value = state.regions.length;
    document.getElementById('region-modal-preview').innerHTML = '';
    document.getElementById('region-modal').classList.add('active');
}

function openEditRegionModal(regionId) {
    const region = state.regions.find(r => (r.id || r._id) === regionId);
    if (!region) return;

    state.editingRegionId = regionId;
    document.getElementById('region-modal-title').textContent = `${t('edit')}: ${region.name}`;
    document.getElementById('region-modal-name').value = region.name || '';
    document.getElementById('region-modal-order').value = region.order || 0;
    document.getElementById('region-modal-active').checked = region.active !== false;

    const urlInput = document.getElementById('region-modal-image-url');
    if (region.image?.startsWith('http')) {
        urlInput.value = region.image;
    } else {
        urlInput.value = '';
    }

    const preview = document.getElementById('region-modal-preview');
    const imgSrc = region.image?.startsWith('http') ? region.image : (region.image ? `/uploads/${region.image}` : '');
    preview.innerHTML = imgSrc ? `<img src="${imgSrc}" class="h-20 w-auto rounded border border-slate-300 object-cover mt-2">` : '';

    document.getElementById('region-modal').classList.add('active');
}

async function handleRegionFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('region-modal-name').value.trim();
    const order = document.getElementById('region-modal-order').value || 0;
    const active = document.getElementById('region-modal-active').checked;
    const imageFile = document.getElementById('region-modal-image-file').files[0];
    const imageUrl = document.getElementById('region-modal-image-url').value.trim();

    if (!name) {
        showToast('يرجى إدخال اسم المنطقة', 'error');
        return;
    }

    let payload;

    if (imageFile) {
        payload = new FormData();
        payload.append('name', name);
        payload.append('order', order);
        payload.append('active', active);
        payload.append('image', imageFile);
    } else if (imageUrl) {
        payload = JSON.stringify({ name, order, active, image: imageUrl });
    } else {
        payload = JSON.stringify({ name, order, active });
    }

    try {
        if (state.editingRegionId) {
            await apiFetch(`/api/v1/admin/regions/${state.editingRegionId}`, {
                method: 'PATCH',
                body: payload,
            });
            showToast('تم تحديث المنطقة بنجاح', 'success');
        } else {
            await apiFetch('/api/v1/admin/regions', {
                method: 'POST',
                body: payload,
            });
            showToast('تمت إضافة المنطقة بنجاح', 'success');
        }

        closeModal('region-modal');
        loadRegions();
    } catch (err) {}
}

async function deleteRegion(regionId) {
    if (!confirm(t('confirmDeleteRegion'))) return;

    try {
        await apiFetch(`/api/v1/admin/regions/${regionId}`, { method: 'DELETE' });
        showToast('تم حذف المنطقة بنجاح', 'success');
        loadRegions();
    } catch (err) {}
}

function populateRegionSelects() {
    const filterSelect = document.getElementById('ad-filter-region');
    const adModalSelect = document.getElementById('ad-modal-region');
    const bannerModalSelect = document.getElementById('banner-modal-region-select');

    const optionsHtml = state.regions.map(r => {
        const id = r.id || r._id;
        return `<option value="${id}">${r.name}</option>`;
    }).join('');

    if (filterSelect) {
        const currentVal = filterSelect.value;
        filterSelect.innerHTML = '<option value="">كل المناطق</option>' + optionsHtml;
        if (currentVal) filterSelect.value = currentVal;
    }

    if (adModalSelect) {
        const currentVal = adModalSelect.value;
        adModalSelect.innerHTML = '<option value="">-- اختر المنطقة --</option>' + optionsHtml;
        if (currentVal) adModalSelect.value = currentVal;
    }

    if (bannerModalSelect) {
        const currentVal = bannerModalSelect.value;
        bannerModalSelect.innerHTML = '<option value="">-- عام (يظهر لجميع المناطق) --</option>' + optionsHtml;
        if (currentVal) bannerModalSelect.value = currentVal;
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
    await Promise.all([loadUnitTypes(), loadCategories(), loadRegions()]);

    try {
        const search = document.getElementById('ad-search-input')?.value.trim() || '';
        const region = document.getElementById('ad-filter-region')?.value || '';
        const type = document.getElementById('ad-filter-type')?.value || '';
        const active = document.getElementById('ad-filter-active')?.value || '';

        const params = new URLSearchParams();
        if (search) params.append('search', search);
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

        const regionName = ad.region?.name || '';
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

                        ${regionName ? `
                            <div class="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                                <i class="fas fa-map-location-dot"></i>
                                <span>${regionName}</span>
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

                <div class="flex items-center justify-end gap-1.5 pt-3 mt-3 border-t border-slate-100">
                    <button onclick="openEditAdvertisementModal('${adId}')" class="btn-secondary text-xs py-1 px-2.5">
                        <i class="fas fa-edit text-blue-600 me-1"></i> ${t('edit')}
                    </button>
                    <button onclick="deleteAdvertisement('${adId}')" class="btn-secondary text-xs py-1 px-2.5 hover:text-red-600">
                        <i class="fas fa-trash-alt text-red-600 me-1"></i> ${t('delete')}
                    </button>
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

function initAdMapPicker() {
    if (typeof L === 'undefined') {
        console.warn('Leaflet is not available yet.');
        return;
    }
    const container = document.getElementById('ad-map-picker');
    if (!container) return;

    if (!adMapInstance) {
        adMapInstance = L.map('ad-map-picker', {
            center: [30.0444, 31.2357],
            zoom: 7,
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

function openAddAdvertisementModal() {
    state.editingAdvertisementId = null;
    document.getElementById('advertisement-modal-title').textContent = t('addAdvertisement');
    document.getElementById('advertisement-form').reset();
    document.getElementById('ad-modal-active').checked = true;
    document.getElementById('ad-modal-preview').innerHTML = '';

    populateRegionSelects();
    populateAdCategorySelect();
    populateAdUnitTypeSelect();

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
            adMapInstance.setView([30.0444, 31.2357], 7);
        }
    }, 250);

    document.getElementById('advertisement-modal').classList.add('active');
}

async function openEditAdvertisementModal(adId) {
    const ad = state.advertisements.find(a => (a.id || a._id) === adId);
    if (!ad) return;

    state.editingAdvertisementId = adId;
    document.getElementById('advertisement-modal-title').textContent = `${t('edit')}: ${ad.title}`;

    populateRegionSelects();
    populateAdCategorySelect();
    populateAdUnitTypeSelect();

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
                adMapInstance.setView([30.0444, 31.2357], 7);
            }
        }
    }, 250);

    const regId = ad.region ? (ad.region._id || ad.region.id || ad.region) : '';
    document.getElementById('ad-modal-region').value = regId || '';

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
    const region = document.getElementById('ad-modal-region').value || null;

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
        payload.append('attributes', JSON.stringify(attributes));
        payload.append('image', imageFile);
    } else {
        const bodyObj = {
            title,
            category: category || null,
            unitType: unitType || null,
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
    document.getElementById(modalId)?.classList.remove('active');
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
