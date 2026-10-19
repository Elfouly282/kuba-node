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
        linkedAd: 'الإعلان المرتبط',
        confirmDeleteCategory: 'هل أنت متأكد من رغبتك في حذف هذا التصنيف نهائياً؟',
        confirmDeleteBanner: 'هل أنت متأكد من رغبتك في حذف هذا البانر نهائياً؟',
        regions: 'المناطق',
        regionsSubtitle: 'إدارة المناطق والمدن المعتمدة بالتطبيق لتصفية الشاليهات والإعلانات',
        addRegion: 'إضافة منطقة جديدة',
        regionName: 'اسم المنطقة',
        regionImage: 'صورة المنطقة',
        confirmDeleteRegion: 'هل أنت متأكد من رغبتك في حذف هذه المنطقة نهائياً؟',
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
        linkedAd: 'Linked Advertisement',
        confirmDeleteCategory: 'Are you sure you want to delete this category?',
        confirmDeleteBanner: 'Are you sure you want to delete this banner?',
        regions: 'Regions',
        regionsSubtitle: 'Manage regions and cities for filtering chalets, ads and banners',
        addRegion: 'Add Region',
        regionName: 'Region Name',
        regionImage: 'Region Image',
        confirmDeleteRegion: 'Are you sure you want to delete this region permanently?',
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
    editingUserId: null,
    editingScreenId: null,
    editingCategoryId: null,
    editingBannerId: null,
    editingRegionId: null,
    editingAdvertisementId: null,
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

    try {
        const res = await fetch(endpoint, { ...options, headers });
        
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
    } else if (state.currentTab === 'advertisements') {
        loadAdvertisementsTab();
    } else if (state.currentTab === 'onboarding') {
        loadOnboarding();
    } else if (state.currentTab === 'categories') {
        loadCategoriesAndBanners();
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

    document.getElementById('info-env').textContent = s.environment || 'development';
    document.getElementById('info-time').textContent = new Date(s.serverTime).toLocaleTimeString();

    // Render recent users
    const recentList = document.getElementById('recent-users-list');
    if (recentList && s.recentUsers) {
        if (s.recentUsers.length === 0) {
            recentList.innerHTML = `<p class="text-sm text-slate-400 py-3 text-center">لا يوجد مستخدمون حتى الآن</p>`;
        } else {
            recentList.innerHTML = s.recentUsers.map(u => `
                <div class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition border border-slate-100 mb-2">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-[#eaf1ea] border border-[#c2d6c3] flex items-center justify-center font-bold text-[#2D4F2E] text-sm">
                            ${(u.name || u.email || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                            <div class="font-bold text-sm text-slate-900">${u.name || 'بدون اسم'}</div>
                            <div class="text-xs text-slate-500">${u.email}</div>
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

function renderBanners() {
    const grid = document.getElementById('banners-grid');
    const badge = document.getElementById('badge-banners-count');
    if (badge) badge.textContent = `${state.banners.length} ${t('bannersTitle')}`;

    if (!grid) return;

    if (state.banners.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-xs">لا توجد بانرات إعلانية حالياً. يمكنك إضافة أول بانر بالضغط على زر "إضافة بانر".</div>`;
        return;
    }

    grid.innerHTML = state.banners.map(banner => {
        const bannerId = banner.id || banner._id;
        const adId = banner.advertisementId;
        const imgSrc = banner.image?.startsWith('http') ? banner.image : `/uploads/${banner.image}`;
        
        // Find linked advertisement details if loaded
        const linkedAd = state.advertisements.find(a => (a.id || a._id) === adId);
        const adTitle = linkedAd ? linkedAd.title : 'إعلان مرتبط في التطبيق';

        const regionName = typeof banner.region === 'object' && banner.region ? banner.region.name : null;

        return `
            <div class="card p-3 bg-white border border-slate-200 hover:border-[#2D4F2E] transition flex flex-col justify-between">
                <div>
                    <div class="h-40 w-full rounded-lg overflow-hidden bg-slate-100 mb-3 relative">
                        <img src="${imgSrc}" alt="Banner" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x300?text=Banner+Image'">
                        <span class="absolute top-2 start-2 badge badge-brand text-[10px] shadow">
                            <i class="fas fa-bullhorn me-1"></i> بانر إعلاني
                        </span>
                        ${regionName ? `<span class="absolute top-2 end-2 badge bg-emerald-700 text-white text-[10px] shadow"><i class="fas fa-map-marker-alt me-1"></i> ${regionName}</span>` : `<span class="absolute top-2 end-2 badge bg-slate-800 text-white text-[10px] shadow">عام للكل</span>`}
                    </div>

                    <div class="space-y-1.5 text-xs">
                        <div class="flex items-center justify-between">
                            <span class="text-slate-400 text-[11px]">معرف البانر (ID):</span>
                            <span class="font-mono text-[11px] text-slate-700 font-bold truncate max-w-[150px]">${bannerId}</span>
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
        if (region) payload.append('region', region);
        payload.append('image', imageFile);
    } else if (imageUrl) {
        payload = JSON.stringify({ advertisementId, image: imageUrl, region: region || null });
    } else if (state.editingBannerId) {
        payload = JSON.stringify({ advertisementId, region: region || null });
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

async function loadAdvertisementsTab() {
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
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400 text-xs">لا توجد إعلانات أو شاليهات مطابقة للبحث. يمكنك إضافة إعلان جديد بالضغط على زر "إضافة إعلان جديد".</div>`;
        return;
    }

    grid.innerHTML = state.advertisements.map(ad => {
        const adId = ad.id || ad._id;
        const imgSrc = ad.image?.startsWith('http') ? ad.image : (ad.image ? `/uploads/${ad.image}` : 'https://placehold.co/400x250?text=No+Image');
        const isActive = ad.active !== false;

        const isChalet = ad.type === 'chalet';
        const typeLabel = {
            chalet: 'شاليه (Chalet)',
            apartment: 'شقة (Apartment)',
            hotel: 'فندق (Hotel)',
            villa: 'فيلا (Villa)',
            resort: 'منتجع (Resort)',
            unit: 'وحدة (Unit)',
            other: 'أخرى',
        }[ad.type] || ad.type;

        const regionName = ad.region?.name || '';
        const categoryName = ad.category?.name || '';

        return `
            <div class="card p-3 bg-white border ${isChalet ? 'border-[#2D4F2E]/40 shadow-sm' : 'border-slate-200'} hover:border-[#2D4F2E] transition flex flex-col justify-between">
                <div>
                    <div class="h-36 w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5 relative">
                        <img src="${imgSrc}" alt="${ad.title}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/400x250?text=No+Image'">
                        
                        <!-- Type badge -->
                        <span class="absolute top-2 start-2 badge ${isChalet ? 'bg-amber-600 text-white' : 'badge-brand'} text-[10px] shadow">
                            ${isChalet ? '<i class="fas fa-umbrella-beach me-1"></i>' : ''} ${typeLabel}
                        </span>

                        <!-- Active status -->
                        <span class="absolute top-2 end-2 badge ${isActive ? 'badge-success' : 'badge-danger'} text-[10px] shadow">
                            ${isActive ? 'نشط' : 'معطل'}
                        </span>
                    </div>

                    <div class="space-y-1 text-xs">
                        <div class="font-bold text-slate-900 line-clamp-1 text-sm mb-1">${ad.title}</div>
                        
                        <div class="flex items-center justify-between text-slate-600">
                            <span class="text-slate-400">السعر:</span>
                            <span class="font-bold text-[#2D4F2E] text-sm">${ad.price ? Number(ad.price).toLocaleString() : 0} ج.م</span>
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

                        ${categoryName ? `
                            <div class="text-[11px] text-slate-400">
                                التصنيف: <span class="text-slate-600 font-medium">${categoryName}</span>
                            </div>
                        ` : ''}
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

function openAddAdvertisementModal() {
    state.editingAdvertisementId = null;
    document.getElementById('advertisement-modal-title').textContent = t('addAdvertisement');
    document.getElementById('advertisement-form').reset();
    document.getElementById('ad-modal-active').checked = true;
    document.getElementById('ad-modal-preview').innerHTML = '';

    populateRegionSelects();
    populateAdCategorySelect();

    document.getElementById('advertisement-modal').classList.add('active');
}

function openEditAdvertisementModal(adId) {
    const ad = state.advertisements.find(a => (a.id || a._id) === adId);
    if (!ad) return;

    state.editingAdvertisementId = adId;
    document.getElementById('advertisement-modal-title').textContent = `${t('edit')}: ${ad.title}`;

    populateRegionSelects();
    populateAdCategorySelect();

    document.getElementById('ad-modal-title').value = ad.title || '';
    document.getElementById('ad-modal-type').value = ad.type || 'apartment';
    document.getElementById('ad-modal-price').value = ad.price || '';
    document.getElementById('ad-modal-location').value = ad.location || '';
    document.getElementById('ad-modal-description').value = ad.description || '';
    document.getElementById('ad-modal-active').checked = ad.active !== false;

    const regId = ad.region ? (ad.region._id || ad.region.id || ad.region) : '';
    document.getElementById('ad-modal-region').value = regId || '';

    const catId = ad.category ? (ad.category._id || ad.category.id || ad.category) : '';
    document.getElementById('ad-modal-category').value = catId || '';

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

function populateAdCategorySelect() {
    const select = document.getElementById('ad-modal-category');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '<option value="">-- اختر التصنيف --</option>' + 
        state.categories.map(c => {
            const id = c.id || c._id;
            return `<option value="${id}">${c.name}</option>`;
        }).join('');

    if (currentVal) select.value = currentVal;
}

async function handleAdvertisementFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('ad-modal-title').value.trim();
    const type = document.getElementById('ad-modal-type').value;
    const region = document.getElementById('ad-modal-region').value || null;
    const category = document.getElementById('ad-modal-category').value || null;
    const price = document.getElementById('ad-modal-price').value || 0;
    const location = document.getElementById('ad-modal-location').value.trim();
    const description = document.getElementById('ad-modal-description').value.trim();
    const active = document.getElementById('ad-modal-active').checked;
    const imageFile = document.getElementById('ad-modal-image-file').files[0];
    const imageUrl = document.getElementById('ad-modal-image-url').value.trim();

    if (!title) {
        showToast('يرجى إدخال عنوان الإعلان', 'error');
        return;
    }

    let payload;

    if (imageFile) {
        payload = new FormData();
        payload.append('title', title);
        payload.append('type', type);
        if (region) payload.append('region', region);
        if (category) payload.append('category', category);
        payload.append('price', price);
        payload.append('location', location);
        payload.append('description', description);
        payload.append('active', active);
        payload.append('image', imageFile);
    } else {
        const bodyObj = {
            title,
            type,
            region: region || null,
            category: category || null,
            price: Number(price),
            location,
            description,
            active,
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
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        }
    });
});
