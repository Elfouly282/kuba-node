const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

console.log('Building Kuba Flutter API Documentation HTML and PDF...');

const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>دليل مطور Flutter - واجهات برمجة تطبيقات منصة Kuba (API Documentation)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0f172a;
      --primary-light: #1e293b;
      --accent: #b45309;
      --accent-light: #f59e0b;
      --emerald: #059669;
      --emerald-light: #10b981;
      --rose: #e11d48;
      --blue: #2563eb;
      --purple: #7c3aed;
      --bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --font-ar: 'Cairo', system-ui, -apple-system, sans-serif;
      --font-code: 'Fira Code', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-ar);
      background-color: var(--bg);
      color: var(--text-main);
      line-height: 1.7;
      font-size: 13.5px;
      -webkit-font-smoothing: antialiased;
    }

    /* Print settings */
    @page {
      size: A4;
      margin: 14mm 12mm 14mm 12mm;
      @bottom-right {
        content: counter(page);
      }
    }

    @media print {
      body {
        background-color: #ffffff;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .page-break {
        page-break-before: always;
      }
      .avoid-break {
        page-break-inside: avoid;
      }
      .cover-page {
        height: 100vh;
        page-break-after: always;
      }
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    /* Cover Page */
    .cover {
      background: linear-gradient(135deg, #090d16 0%, #1e293b 100%);
      color: white;
      padding: 60px 40px;
      border-radius: 20px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(245, 158, 11, 0.3);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    .cover::before {
      content: '';
      position: absolute;
      top: -100px;
      right: -100px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(217, 119, 6, 0.25) 0%, transparent 70%);
      border-radius: 50%;
    }
    .cover-badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.2);
      color: #fcd34d;
      border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 6px 16px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }
    .cover-title {
      font-size: 32px;
      font-weight: 900;
      line-height: 1.3;
      margin-bottom: 12px;
      color: #ffffff;
    }
    .cover-subtitle {
      font-size: 16px;
      color: #cbd5e1;
      font-weight: 400;
      max-width: 750px;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .cover-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 25px;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
    }
    .meta-label {
      font-size: 11px;
      color: #94a3b8;
      text-transform: uppercase;
      font-weight: 600;
    }
    .meta-val {
      font-size: 13px;
      color: #f8fafc;
      font-weight: 700;
    }

    /* Section Styling */
    h1.sec-title {
      font-size: 22px;
      font-weight: 800;
      color: var(--primary);
      margin: 40px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 3px solid var(--accent);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    h2.sub-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--primary-light);
      margin: 28px 0 14px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    h3.sub-sub-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--accent);
      margin: 18px 0 8px 0;
    }

    p {
      margin-bottom: 12px;
      color: #334155;
    }

    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03);
    }
    .card-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Step Timeline Flow */
    .flow-step {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px 24px;
      margin-bottom: 24px;
      border-right: 5px solid var(--accent);
      box-shadow: 0 4px 10px rgba(0,0,0,0.02);
    }
    .flow-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fef3c7;
      color: #92400e;
      font-weight: 800;
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
      border: 1px solid #fde68a;
    }
    .flow-heading {
      font-size: 16px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 10px;
    }
    .flow-desc {
      font-size: 13.5px;
      color: #475569;
      margin-bottom: 14px;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 9px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      font-family: var(--font-code);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-get { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .badge-post { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .badge-patch { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .badge-delete { background: #ffe4e6; color: #be123c; border: 1px solid #fecdd3; }
    .badge-auth { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }
    .badge-public { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 20px 0;
      font-size: 12.5px;
      background: var(--surface);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    th {
      background: #f1f5f9;
      color: var(--primary);
      text-align: right;
      padding: 10px 14px;
      font-weight: 700;
      border-bottom: 1px solid var(--border);
    }
    td {
      padding: 10px 14px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      vertical-align: top;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:hover td {
      background: #f8fafc;
    }

    /* Code blocks */
    pre {
      direction: ltr;
      text-align: left;
      background: #0f172a;
      color: #e2e8f0;
      padding: 14px 16px;
      border-radius: 10px;
      overflow-x: auto;
      font-family: var(--font-code);
      font-size: 12px;
      margin: 10px 0 16px 0;
      border: 1px solid #1e293b;
      line-height: 1.5;
    }
    code {
      font-family: var(--font-code);
      font-size: 12px;
      background: #f1f5f9;
      color: #be123c;
      padding: 2px 6px;
      border-radius: 4px;
      direction: ltr;
      display: inline-block;
    }
    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      display: block;
    }

    /* Callout Alert Boxes */
    .callout {
      padding: 14px 18px;
      border-radius: 10px;
      margin: 14px 0;
      font-size: 13px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .callout-info {
      background: #eff6ff;
      border-right: 4px solid var(--blue);
      color: #1e40af;
    }
    .callout-warning {
      background: #fffbeb;
      border-right: 4px solid var(--accent);
      color: #92400e;
    }
    .callout-success {
      background: #ecfdf5;
      border-right: 4px solid var(--emerald);
      color: #065f46;
    }

    /* Navigation Map Box */
    .nav-map {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }
    .nav-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      transition: all 0.2s;
    }
    .nav-card-num {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: var(--accent);
      color: white;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 700;
      margin-left: 8px;
    }
    .nav-card-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 6px;
    }
    .nav-card-next {
      font-size: 12px;
      color: var(--accent);
      font-weight: 600;
      margin-top: 8px;
      border-top: 1px dashed #e2e8f0;
      padding-top: 6px;
    }

    .toc {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px 30px;
      margin: 25px 0 35px 0;
    }
    .toc-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 14px;
    }
    .toc-list {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 24px;
    }
    .toc-item a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
    }
    .toc-item a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

<div class="container">

  <!-- COVER PAGE -->
  <div class="cover">
    <div class="cover-badge">KUBA PLATFORM — MOBILE ARCHITECTURE GUIDE</div>
    <h1 class="cover-title">دليل مطور الموبايل (Flutter) لواجهات منصة Kuba</h1>
    <p class="cover-subtitle">
      مرجع شامل وتفصيلي يوضح بالتحديد رحلة المستخدم ومسار البيانات (Data Flow) من أول فتح التطبيق، شاشات التعريف، المصادقة، التصفح والبحث الذكي، تفاصيل العقارات والغرف واليخوت وعربات الجولف، وفحص التوفر والحجز، وحتى إدارة الحجوزات والمفضلة والملف الشخصي.
    </p>
    <div class="cover-meta">
      <div class="meta-item">
        <span class="meta-label">المنصة والتقنية المستهدفة</span>
        <span class="meta-val">Flutter (iOS & Android) — REST API</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">إصدار الباك إند</span>
        <span class="meta-val">Kuba Node.js v1.0.0 (Express 5 + MongoDB)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">نطاق التغطية</span>
        <span class="meta-val">100% لجميع الـ Endpoints (Client & Admin)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">تاريخ المراجعة</span>
        <span class="meta-val">أكتوبر 2026</span>
      </div>
    </div>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="toc avoid-break">
    <div class="toc-title">📑 فهرس الدليل الشامل</div>
    <ul class="toc-list">
      <li class="toc-item"><a href="#sec1">1. التجهيزات الأساسية والـ Headers وقواعد السيرفر</a></li>
      <li class="toc-item"><a href="#sec2">2. خريطة رحلة التطبيق (يروح فين ويجي منين)</a></li>
      <li class="toc-item"><a href="#sec3">3. رحلة المستخدم خطوة بخطوة (Step-by-Step Flow)</a></li>
      <li class="toc-item"><a href="#sec4">4. محرك البحث والفلترة وحساب التوفر الذكي</a></li>
      <li class="toc-item"><a href="#sec5">5. نظام الحجوزات الشامل (فنادق، يخوت، جولف كار، شاليهات)</a></li>
      <li class="toc-item"><a href="#sec6">6. القاموس الفني الكامل لجميع الـ Endpoints (45+ APIs)</a></li>
      <li class="toc-item"><a href="#sec7">7. نصائح وأكواد مساعدة جاهزة لـ Flutter (Dio & Models)</a></li>
    </ul>
  </div>

  <!-- SECTION 1: CORE SETUP -->
  <div id="sec1" class="avoid-break">
    <h1 class="sec-title">1. التجهيزات الأساسية وقواعد الاتصال بالـ Backend</h1>
    
    <div class="card">
      <div class="card-title">🌐 روابط السيرفر (Base URLs) حسب بيئة التشغيل</div>
      <p>يجب على مطور الفلاتر تهيئة الـ Base URL في ملف الإعدادات وفقاً للجهاز أو المحاكي:</p>
      <table>
        <thead>
          <tr>
            <th>البيئة / الجهاز</th>
            <th>الرابط (Base URL)</th>
            <th>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Android Emulator</strong></td>
            <td><code>http://10.0.2.2:3000/api/v1</code></td>
            <td>الـ IP الخاص بـ Loopback في محاكي أندرويد الافتراضي</td>
          </tr>
          <tr>
            <td><strong>iOS Simulator / Desktop</strong></td>
            <td><code>http://localhost:3000/api/v1</code></td>
            <td>يعمل مباشرة على شبكة الماك</td>
          </tr>
          <tr>
            <td><strong>جهاز حقيقي (Physical Device)</strong></td>
            <td><code>http://192.168.x.x:3000/api/v1</code></td>
            <td>استبدل بـ IP جهاز الكمبيوتر على نفس شبكة الواي فاي</td>
          </tr>
          <tr>
            <td><strong>Production Server</strong></td>
            <td><code>https://api.kuba-app.com/api/v1</code></td>
            <td>سيرفر الإنتاج الفعلي (HTTPS)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">🛡️ الهيدرز الإلزامية (Standard Request Headers)</div>
      <p>يجب إرسال هذه الـ Headers في كل طلب عبر الـ Interceptor الخاص بـ Dio:</p>
      <pre><code>{
  "Content-Type": "application/json",
  "Accept-Language": "ar", // يدعم "ar" أو "en" (يعيد رسائل الخطأ والنجاح مترجمة جاهزة للعرض)
  "Authorization": "Bearer &lt;TOKEN&gt;" // يُرسل فقط في الـ APIs المحمية بعد تسجيل الدخول
}</code></pre>
    </div>

    <div class="card">
      <div class="card-title">📦 الهيكل الموحد لردود السيرفر (Unified JSON Envelope)</div>
      <p>جميع ردود السيرفر تتبع نمطاً ثابتاً، مما يسهل كتابة Generic Model في Flutter:</p>
      
      <h3 class="sub-sub-title">1. الرد الناجح (Success Response - HTTP 200 / 201):</h3>
      <pre><code>{
  "status": "success",
  "message": "تمت العملية بنجاح", // اختياري
  "data": { ... },                // يحتوي الكائن أو القائمة
  "results": 15,                  // عدد العناصر عند جلب مصفوفات
  "total": 120,                   // إجمالي العناصر
  "page": 1,                      // رقم الصفحة الحالية
  "totalPages": 8,                // إجمالي الصفحات
  "token": "eyJhbGciOi..."        // عند تسجيل الدخول أو إنشاء الحساب
}</code></pre>

      <h3 class="sub-sub-title">2. رد الخطأ (Fail / Error Response - HTTP 400 / 401 / 403 / 404 / 500):</h3>
      <pre><code>{
  "status": "fail", // أو "error" في أخطاء السيرفر 500
  "message": "كلمة المرور غير صحيحة", // رسالة مترجمة بلغة الـ Header
  "errors": [ ... ]                   // تفاصيل إضافية في حال validation errors
}</code></pre>
    </div>

    <div class="callout callout-warning">
      <div>⚠️</div>
      <div>
        <strong>ملاحظة هامة للصور:</strong> السيرفر يقوم بحفظ الصور داخل مجلد <code>/uploads/</code>. قد يعيد السيرفر رابط الصورة كاملاً مثل <code>https://api.kuba.com/uploads/...</code> أو مساراً نسبياً مثل <code>banners/image-123.jpg</code>. يجب إنشاء دالة مساعدة (Helper) في تطبيق الفلاتر تضيف <code>http://&lt;BASE_URL&gt;/uploads/</code> إذا لم يكن الرابط يبدأ بـ <code>http</code>.
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 2: NAVIGATION MAP -->
  <div id="sec2">
    <h1 class="sec-title">2. خريطة رحلة التطبيق (يروح فين ويجي منين)</h1>
    <p>
      هذا المخطط يمثل الدليل التوجيهي لمطور الفلاتر: كيف يتحرك المستخدم بين الشاشات، وما هي الـ API المسؤولة عن كل خطوة:
    </p>

    <div class="nav-map">
      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">1</span> شاشة البداية (Splash)</div>
        <p>فحص وجود التوكن المخزن محلياً.</p>
        <div class="nav-card-next">➡️ إذا وجد توكن: <code>GET /auth/me</code> ثم للرئيسية<br>➡️ إذا لم يوجد: شاشات التعريف أو المدينة</div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">2</span> شاشات التعريف (Onboarding)</div>
        <p>استعراض مزايا التطبيق للزائر لأول مرة.</p>
        <div class="nav-card-next">➡️ <code>GET /onboarding</code> ثم الانتقال لاختيار المدينة</div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">3</span> اختيار المدينة (City Picker)</div>
        <p>الساحل الشمالي، الجونة، القاهرة، شرم الشيخ...</p>
        <div class="nav-card-next">➡️ <code>GET /cities</code> وحفظ المدينة في الـ State</div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">4</span> المصادقة أو التصفح كزائر</div>
        <p>تسجيل الدخول، إنشاء حساب، أو تصفح كـ Guest.</p>
        <div class="nav-card-next">➡️ <code>POST /auth/login</code> أو <code>/signup</code> أو <code>/google</code></div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">5</span> الرئيسية (Home Screen)</div>
        <p>بانرات، تصنيفات، مناطق، وعقارات مقترحة.</p>
        <div class="nav-card-next">➡️ السريعة: <code>GET /cities/:id/data?position=top</code></div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">6</span> شاشة المنطقة (Region Screen)</div>
        <p>عند الضغط على منطقة (مثل هاسيندا، مراسي...).</p>
        <div class="nav-card-next">➡️ <code>GET /regions/:id/data</code> لجلب إعلانات المنطقة</div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">7</span> البحث المتقدم (Search & Filter)</div>
        <p>فلترة بالتواريخ، عدد النزلاء، السعر، والخريطة.</p>
        <div class="nav-card-next">➡️ <code>GET /search</code> أو <code>POST /search</code></div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">8</span> تفاصيل العقار (Property Details)</div>
        <p>فندق، شاليه، فيلا، يخت، عربة جولف.</p>
        <div class="nav-card-next">➡️ <code>GET /advertisements/:id</code> و <code>/available-rooms</code></div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">9</span> فحص التوفر وتقدير السعر</div>
        <p>حاسبة السعر قبل الدفع (ساعات، أيام، ليالي).</p>
        <div class="nav-card-next">➡️ <code>POST /bookings/calculate-price</code></div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">10</span> إنشاء وتأكيد الحجز</div>
        <p>إدخال بيانات الضيوف، طريقة الدفع، وتثبيت الحجز.</p>
        <div class="nav-card-next">➡️ <code>POST /bookings</code> (يتطلب Token)</div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">11</span> قائمة حجوزاتي (My Bookings)</div>
        <p>متابعة الحجوزات السابقة والقادمة وإلغاؤها.</p>
        <div class="nav-card-next">➡️ <code>GET /bookings</code> و <code>PATCH /:id/cancel</code></div>
      </div>

      <div class="nav-card">
        <div class="nav-card-title"><span class="nav-card-num">12</span> المفضلة والملف الشخصي</div>
        <p>قائمة الرغبات بزر القلب، وتعديل البروفايل.</p>
        <div class="nav-card-next">➡️ <code>POST /wishlist/toggle</code> و <code>GET /auth/me</code></div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 3: STEP-BY-STEP USER JOURNEY -->
  <div id="sec3">
    <h1 class="sec-title">3. رحلة المستخدم خطوة بخطوة (Step-by-Step Flow)</h1>
    <p>
      شرح مفصل لكل خطوة مع الطلب المطلوب (Request) والرد المتوقع (Response) وما يفعله المطور في تطبيق Flutter:
    </p>

    <!-- STEP 1 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة الأولى — مرحلة بدء التطبيق (App Startup & Splash)</div>
      <div class="flow-heading">شاشة الـ Splash وفحص الجلسة (Auto Login)</div>
      <div class="flow-desc">
        عند فتح التطبيق، يقوم تطبيق الفلاتر بالتحقق مما إذا كان هناك رمز JWT Token محفوظ في <code>flutter_secure_storage</code>:
      </div>
      
      <p><strong>السيناريو أ: يوجد توكن محفوظ:</strong></p>
      <p>يتم إرسال طلب للتحقق من هوية المستخدم وتحديث بياناته:</p>
      <div><span class="badge badge-get">GET</span> <code>/auth/me</code> <span class="badge badge-auth">يحتاج توكن</span></div>
      <p style="margin-top: 8px;">إذا رد السيرفر بـ <code>200 OK</code>: احفظ بيانات المستخدم في UserProvider وتوجه مباشرة إلى <strong>الشاشة الرئيسية</strong>.</p>
      <p>إذا رد السيرفر بـ <code>401 Unauthorized</code> (التوكن منتهي): قم بمسح التوكن من الهاتف وافتح <strong>شاشة تسجيل الدخول</strong>.</p>

      <p style="margin-top: 12px;"><strong>السيناريو ب: لا يوجد توكن:</strong></p>
      <p>تحقق هل التطبيق يفتح لأول مرة (<code>isFirstTime = true</code>)؟ إذا نعم، توجه لشاشة <strong>Onboarding</strong>، وإلا توجه لشاشة <strong>اختيار المدينة</strong> أو <strong>الرئيسية كزائر (Guest)</strong>.</p>
    </div>

    <!-- STEP 2 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة الثانية — شاشات التعريف (Onboarding Screens)</div>
      <div class="flow-heading">عرض شرائح تعريف المنصة</div>
      <div class="flow-desc">
        تُعرض للعميل الجديد للتعريف بخدمات Kuba (حجز الشاليهات، الفنادق، اليخوت، وعربات الجولف).
      </div>
      <div><span class="badge badge-get">GET</span> <code>/onboarding?active=true</code> <span class="badge badge-public">عام</span></div>
      <p style="margin-top: 10px;"><strong>الرد المتوقع:</strong></p>
      <pre><code>{
  "status": "success",
  "results": 3,
  "data": {
    "screens": [
      {
        "_id": "66000001",
        "title": "فخامة الإقامة في الساحل",
        "description": "احجز أفخم الفلل والشاليهات مباشرة بأفضل الأسعار",
        "image": "http://api.kuba.com/uploads/onboarding/slide1.jpg",
        "order": 1
      }
    ]
  }
}</code></pre>
      <div class="callout callout-info">
        💡 <strong>نصيحة فلاتر:</strong> استخدم <code>PageView.builder</code> مع مؤشر صفحات (SmoothPageIndicator)، وعند الضغط على "تخطي" أو إكمال الشرائح، احفظ في <code>SharedPreferences: setBool('onboarding_seen', true)</code> وتوجه لشاشة اختيار المدينة.
      </div>
    </div>

    <!-- STEP 3 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة الثالثة — اختيار المدينة (City Selection Gate)</div>
      <div class="flow-heading">تحديد وجهة العميل الرئيسية (الساحل، الجونة، القاهرة...)</div>
      <div class="flow-desc">
        تطبيق Kuba قائم على المدن والمناطق السياحية الفاخرة. جميع الإعلانات والبانرات ترتبط بالمدينة المختارة.
      </div>
      <div><span class="badge badge-get">GET</span> <code>/cities?active=true</code> <span class="badge badge-public">عام</span></div>
      <p style="margin-top: 10px;"><strong>الرد المتوقع:</strong></p>
      <pre><code>{
  "status": "success",
  "results": 2,
  "data": {
    "cities": [
      {
        "_id": "66c82301abc123",
        "name": "الساحل الشمالي",
        "slug": "north-coast",
        "image": "http://api.kuba.com/uploads/cities/sahel.jpg",
        "color": "#2D4F2E",
        "regionsCount": 12
      }
    ]
  }
}</code></pre>
      <p>
        <strong>ما يفعله الفلاتر:</strong> يحفظ معرف المدينة <code>selectedCityId</code> في الـ Global State (Bloc / Riverpod / Provider) وفي الذاكرة المحلية، وإذا كان المستخدم مسجلاً دخوله يمكن مزامنتها مع حسابه عبر:
      </p>
      <div><span class="badge badge-post">POST</span> <code>/auth/select-city</code> <span class="badge badge-auth">يحتاج توكن</span> (Body: <code>{"cityId": "..."}</code>)</div>
    </div>

    <!-- STEP 4 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة الرابعة — مسار التسجيل والمصادقة (Authentication Lifecycle)</div>
      <div class="flow-heading">إنشاء حساب، تسجيل الدخول، واستعادة كلمة المرور</div>
      <div class="flow-desc">
        يدعم التطبيق 3 مسارات رئيسية للمصادقة:
      </div>

      <h3 class="sub-sub-title">المسار 1: إنشاء حساب جديد وتأكيد البريد (Sign Up Flow)</h3>
      <ol style="margin-right: 20px; line-height: 2;">
        <li>
          <strong>إرسال بيانات التسجيل:</strong><br>
          <span class="badge badge-post">POST</span> <code>/auth/signup</code><br>
          Body:
          <pre><code>{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+201012345678",
  "password": "Password123@",
  "confirmPassword": "Password123@"
}</code></pre>
          يعود السيرفر بـ <code>201 Created</code> مع رسالة بأن كود / رابط التفعيل أُرسل للبريد.
        </li>
        <li>
          <strong>تأكيد البريد الإلكتروني:</strong><br>
          <span class="badge badge-get">GET</span> <code>/auth/verify-email/:token</code> (أو عبر الرابط المرسل).
        </li>
        <li>
          <strong>إعادة إرسال رمز التفعيل إذا لم يصل:</strong><br>
          <span class="badge badge-post">POST</span> <code>/auth/resend-verification</code> (Body: <code>{"email": "..."}</code>).
        </li>
      </ol>

      <h3 class="sub-sub-title" style="margin-top: 15px;">المسار 2: تسجيل الدخول (Login Flow)</h3>
      <ul style="margin-right: 20px; line-height: 2;">
        <li>
          <strong>تسجيل الدخول بالإيميل وكلمة المرور:</strong><br>
          <span class="badge badge-post">POST</span> <code>/auth/login</code> (Body: <code>{"email": "...", "password": "..."}</code>)<br>
          الرد: يعود بـ <code>token</code> وكائن <code>data.user</code>. قم بتخزين الـ <code>token</code> فوراً.
        </li>
        <li>
          <strong>تسجيل الدخول بحساب جوجل (Google / Firebase Sign-In):</strong><br>
          في الفلاتر يتم استخدام باقة <code>google_sign_in</code> للحصول على <code>idToken</code>، ثم إرساله للباك إند:<br>
          <span class="badge badge-post">POST</span> <code>/auth/google</code> (Body: <code>{"idToken": "firebase_id_token_here"}</code>)
        </li>
      </ul>

      <h3 class="sub-sub-title" style="margin-top: 15px;">المسار 3: استعادة كلمة المرور عبر الـ OTP (Forgot Password 3-Steps)</h3>
      <div style="background: #f1f5f9; padding: 12px; border-radius: 8px;">
        <p><strong>1. طلب رمز الاستعادة:</strong> <span class="badge badge-post">POST</span> <code>/auth/forgot-password</code> (Body: <code>{"email": "ahmed@example.com"}</code>) ➡️ يرسل كود OTP من 6 أرقام للإيميل.</p>
        <p><strong>2. التحقق من الـ OTP:</strong> <span class="badge badge-post">POST</span> <code>/auth/verify-reset-otp</code> (Body: <code>{"email": "...", "otp": "481920"}</code>) ➡️ يعود السيرفر بـ <code>resetToken</code> مؤقت.</p>
        <p><strong>3. تعيين كلمة السر الجديدة:</strong> <span class="badge badge-patch">PATCH</span> <code>/auth/reset-password/:resetToken</code> (Body: <code>{"password": "NewPassword123@", "confirmPassword": "NewPassword123@"}</code>) ➡️ يتم التعيين ويُمنح المستخدم جلسة جديدة.</p>
      </div>
    </div>

    <!-- STEP 5 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة الخامسة — الشاشة الرئيسية (Home Screen)</div>
      <div class="flow-heading">بناء واجهة الاستكشاف بطلب واحد أو عدة طلبات</div>
      <div class="flow-desc">
        تتكون الصفحة الرئيسية من: شريط المدينة المحددة، بانرات العروض العلوية، قائمة التصنيفات الأفقية (فنادق، يخوت، جولف كار، شاليهات)، قائمة المناطق (Regions)، وأحدث الإعلانات المقترحة.
      </div>

      <div class="callout callout-success">
        🚀 <strong>الـ Endpoint السحرية الشاملة لصفحة المدينة (All-in-One City Screen API):</strong><br>
        لتفادي إرسال 4 طلبات شبكة متتالية، وفر الباك إند مساراً مجمعاً يعيد كل ما تحتاجه الشاشة في استدعاء واحد:<br>
        <span class="badge badge-get">GET</span> <code>/cities/:id/data?position=top</code>
      </div>

      <p><strong>هيكل الرد الشامل لصفحة المدينة:</strong></p>
      <pre><code>{
  "status": "success",
  "data": {
    "city": { "_id": "...", "name": "الساحل الشمالي", "image": "..." },
    "regions": [
      { "_id": "reg1", "name": "سيدي عبد الرحمن", "image": "..." },
      { "_id": "reg2", "name": "مراسي", "image": "..." }
    ],
    "banners": [
      { "id": "b1", "image": "...", "position": "top", "advertisementId": "ad123" }
    ],
    "advertisements": [
      {
        "_id": "ad1",
        "title": "فيلا مستقلة صف أول على البحر",
        "price": 15000,
        "pricing": { "finalPrice": 15000, "currency": "EGP", "pricingUnit": "per_night" },
        "image": "...",
        "type": "villa"
      }
    ]
  }
}</code></pre>

      <p style="margin-top: 10px;"><strong>البديل (طلبات منفصلة إذا رغبت في عزل الـ Caching):</strong></p>
      <ul style="margin-right: 20px; line-height: 1.8;">
        <li>البانرات: <span class="badge badge-get">GET</span> <code>/banners?city={cityId}&position=top</code></li>
        <li>التصنيفات: <span class="badge badge-get">GET</span> <code>/categories</code></li>
        <li>المناطق: <span class="badge badge-get">GET</span> <code>/regions?city={cityId}</code></li>
        <li>أبرز العقارات: <span class="badge badge-get">GET</span> <code>/advertisements?city={cityId}&limit=10</code></li>
      </ul>
    </div>

    <!-- STEP 6 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة السادسة — شاشة تفاصيل المنطقة (Region View)</div>
      <div class="flow-heading">استعراض عقارات قرية أو منطقة معينة (مثل هاسيندا أو سيدي حنيش)</div>
      <div class="flow-desc">
        عندما يضغط المستخدم على أي بطاقة منطقة من الصفحة الرئيسية، ينتقل لشاشة تفاصيل المنطقة:
      </div>
      <div><span class="badge badge-get">GET</span> <code>/regions/:id/data</code> <span class="badge badge-public">عام</span></div>
      <p style="margin-top: 8px;">
        يعيد السيرفر: بيانات المنطقة، البانرات الخاصة بها، الشاليهات، وجميع الإعلانات التي تقع داخل نطاق هذه المنطقة الجغرافي.
      </p>
    </div>

    <div class="page-break"></div>

    <!-- STEP 7 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة السابعة — محرك البحث المتقدم والفلترة (Search Engine)</div>
      <div class="flow-heading">البحث بالتواريخ، عدد النزلاء، السعر، والخريطة الجغرافية</div>
      <div class="flow-desc">
        محرك بحث Kuba يعتبر من أقوى أجزاء النظام؛ فهو يفحص ليس فقط الأسماء والأسعار، بل يفحص <strong>توفر المواعيد الفعلية في جدول الحجوزات</strong> ويستبعد الوحدات المحجوزة تلقائياً!
      </div>
      <div><span class="badge badge-get">GET</span> أو <span class="badge badge-post">POST</span> <code>/search</code></div>

      <p style="margin-top: 10px;"><strong>أهم معايير الفلترة (Query Parameters):</strong></p>
      <table>
        <thead>
          <tr>
            <th>المعامل (Parameter)</th>
            <th>النوع</th>
            <th>الوصف والأهمية</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>city</code></td>
            <td>String (ID)</td>
            <td>معرف المدينة (مهم لحصر النتائج في نفس المحافظة/الساحل)</td>
          </tr>
          <tr>
            <td><code>category</code></td>
            <td>String (ID/Slug)</td>
            <td>تصنيف العقار: فندق، يخت، شاليه، جولف كار...</td>
          </tr>
          <tr>
            <td><code>regions</code></td>
            <td>String (IDs)</td>
            <td>معرفات المناطق مفصولة بفاصلة مثل: <code>reg1,reg2</code></td>
          </tr>
          <tr>
            <td><code>guests</code></td>
            <td>Number</td>
            <td>عدد النزلاء/الركاب (يفحص سعة الوحدة <code>capacity</code>)</td>
          </tr>
          <tr>
            <td><code>startDate</code> / <code>endDate</code></td>
            <td>Date (YYYY-MM-DD)</td>
            <td>تاريخ الوصول والمغادرة (يتحقق من خلو الوحدة من الحجوزات!)</td>
          </tr>
          <tr>
            <td><code>minPrice</code> / <code>maxPrice</code></td>
            <td>Number</td>
            <td>نطاق السعر المطلوب</td>
          </tr>
          <tr>
            <td><code>unitType</code></td>
            <td>String (ID)</td>
            <td>نوع الوحدة (ستوديو، فيلا، كابينة...)</td>
          </tr>
          <tr>
            <td><code>keyword</code></td>
            <td>String</td>
            <td>بحث نصي بالاسم أو الوصف</td>
          </tr>
          <tr>
            <td><code>lat</code>, <code>lng</code>, <code>radius</code></td>
            <td>Floats</td>
            <td>بحث جغرافي حول موقع المستخدم أو نقطة معينة بالكيلومتر</td>
          </tr>
        </tbody>
      </table>

      <h3 class="sub-sub-title">الفلاتر الديناميكية (Dynamic Attributes):</h3>
      <p>إذا أراد التطبيق بناء صفحة فلاتر ديناميكية حسب نوع الوحدة (مثلاً: حمام سباحة، يرى البحر، عدد الغرف):</p>
      <div><span class="badge badge-get">GET</span> <code>/unit-types/:id/attributes</code></div>
      <p style="margin-top: 6px;">يعيد قائمة بالحقول والخصائص الممكنة ليقوم الفلاتر برسم Checkboxes و Sliders ديناميكية.</p>
    </div>

    <!-- STEP 8 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة الثامنة — شاشة تفاصيل العقار (Advertisement Details Screen)</div>
      <div class="flow-heading">عرض مواصفات الوحدة ومسارات الأنواع المختلفة</div>
      <div class="flow-desc">
        عند فتح صفحة أي إعلان، يتم جلب تفاصيله الكاملة:
      </div>
      <div><span class="badge badge-get">GET</span> <code>/advertisements/:id</code> <span class="badge badge-public">عام</span></div>

      <p style="margin-top: 12px;"><strong>بناء واجهة الفلاتر حسب نوع العقار (Type Switch):</strong></p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
          <h4 style="color: var(--blue); margin-bottom: 6px;">🏢 الحالة 1: الإعلان فندق (isHotel == true)</h4>
          <p style="font-size: 12.5px;">الفنادق لا تحجز مباشرة كوحدة واحدة، بل تحتوي على غرف (Rooms). يجب على الفلاتر عرض زر "اختر الغرفة":</p>
          <ul style="font-size: 12px; margin-right: 15px; line-height: 1.8;">
            <li>جلب الغرف المتاحة بالتواريخ والنزلاء:<br>
            <span class="badge badge-get">GET</span> <code>/advertisements/:id/available-rooms?startDate=...&endDate=...&guests=2</code></li>
            <li>جلب كل غرف الفندق: <code>/advertisements/:id/rooms</code></li>
          </ul>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
          <h4 style="color: var(--emerald); margin-bottom: 6px;">⛵ الحاله 2: يخت أو عربة جولف (Yacht / Golf Car)</h4>
          <p style="font-size: 12.5px;">يتم تأجيرها بالساعة أو باليوم الكامل. يجب على الفلاتر عرض DatePicker وعند اختيار يوم، جلب السلوتات المحجوزة:</p>
          <ul style="font-size: 12px; margin-right: 15px; line-height: 1.8;">
            <li>جلب جدول مواعيد اليوم الشاغرة والمحجوزة:<br>
            <span class="badge badge-get">GET</span> <code>/bookings/schedule/:advertisementId?date=2026-11-20</code></li>
            <li>يعيد السلوتات المحجوزة بالساعات وخيار اليوم الكامل.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- STEP 9 & 10 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوة التاسعة والعاشرة — فحص التوفر، حاسبة السعر، وتأكيد الحجز</div>
      <div class="flow-heading">Universal Booking Pipeline (الحجز الموحد)</div>
      <div class="flow-desc">
        قبل أن يدفع المستخدم أو يضغط "تأكيد الحجز"، يجب حساب السعر النهائي والتأكد من خلو الوحدة من التعارضات (Conflict Check).
      </div>

      <h3 class="sub-sub-title">1. تقدير السعر وفحص التوفر (Estimate / Calculate Price):</h3>
      <div><span class="badge badge-post">POST</span> <code>/bookings/calculate-price</code> <span class="badge badge-public">عام</span></div>
      <p style="margin-top: 8px;"><strong>نماذج الـ Payload حسب نوع العقار:</strong></p>
      
      <p><em>أ) للشاليهات والفلل والفنادق (بالليالي / الأيام):</em></p>
      <pre><code>{
  "advertisement": "660000000000000000000010",
  "room": "660000000000000000000020", // اختياري في الفنادق فقط
  "startDate": "2026-11-01",
  "endDate": "2026-11-05"
}</code></pre>

      <p><em>ب) لليخوت وعربات الجولف (بالساعات):</em></p>
      <pre><code>{
  "advertisement": "660000000000000000000030",
  "date": "2026-11-20",
  "startTime": "14:00",
  "durationHours": 3,
  "rentalType": "hourly"
}</code></pre>

      <p><em>ج) لليخوت وعربات الجولف (يوم كامل Full Day):</em></p>
      <pre><code>{
  "advertisement": "660000000000000000000030",
  "date": "2026-11-20",
  "rentalType": "full_day"
}</code></pre>

      <p><strong>الرد النموذجي لحاسبة السعر:</strong></p>
      <pre><code>{
  "status": "success",
  "data": {
    "available": true,          // هل الموعد شاغر؟
    "duration": 4,             // 4 ليالي أو 3 ساعات
    "pricingUnit": "per_night", // أو "per_hour" أو "per_day"
    "unitPrice": 5000,
    "totalPrice": 20000,
    "currency": "EGP",
    "minDuration": 1
  }
}</code></pre>

      <h3 class="sub-sub-title" style="margin-top: 15px;">2. إنشاء وتأكيد الحجز النهائي (Create Booking):</h3>
      <p>إذا كانت <code>available == true</code> ووافق العميل على السعر وتفاصيل النزلاء:</p>
      <div><span class="badge badge-post">POST</span> <code>/bookings</code> <span class="badge badge-auth">يحتاج توكن</span></div>
      <p style="margin-top: 8px;"><strong>الـ Body المرسل:</strong></p>
      <pre><code>{
  "advertisement": "660000000000000000000010",
  "room": "660000000000000000000020", // إن وجد
  "startDate": "2026-11-01",
  "endDate": "2026-11-05",
  "guestDetails": {
    "fullName": "أحمد محمود",
    "phone": "+201012345678",
    "adults": 2,
    "children": 1
  },
  "paymentMethod": "cash", // "cash", "credit_card", "wallet"
  "notes": "يرجى توفير سرير إضافي للأطفال"
}</code></pre>
      <p>يعود السيرفر بـ <code>201 Created</code> مع كائن الحجز ورقم المرجع، وحالته المبدئية <code>pending</code>.</p>
    </div>

    <!-- STEP 11, 12, 13 -->
    <div class="flow-step">
      <div class="flow-badge">الخطوات 11 و 12 و 13 — حجوزاتي، المفضلة، وإدارة الحساب</div>
      <div class="flow-heading">متابعة الحجوزات، قائمة الرغبات، والبروفايل</div>
      
      <h3 class="sub-sub-title">1. شاشة حجوزاتي (My Bookings Tab):</h3>
      <ul style="margin-right: 20px; line-height: 1.8;">
        <li>عرض قائمة الحجوزات: <span class="badge badge-get">GET</span> <code>/bookings?status=pending&page=1&limit=10</code></li>
        <li>عرض تفاصيل حجز: <span class="badge badge-get">GET</span> <code>/bookings/:id</code></li>
        <li>إلغاء حجز: <span class="badge badge-patch">PATCH</span> <code>/bookings/:id/cancel</code> ➡️ يتم تحرير الموعد في جدول الحجوزات تلقائياً.</li>
      </ul>

      <h3 class="sub-sub-title" style="margin-top: 12px;">2. شاشة المفضلة (Wishlist):</h3>
      <ul style="margin-right: 20px; line-height: 1.8;">
        <li>جلب كل العناصر المفضلة: <span class="badge badge-get">GET</span> <code>/wishlist</code></li>
        <li><strong>زر القلب الذكي (One-Click Toggle):</strong><br>
        <span class="badge badge-post">POST</span> <code>/wishlist/toggle</code> (Body: <code>{"advertisementId": "..."}</code>)<br>
        أو <span class="badge badge-post">POST</span> <code>/advertisements/:id/wishlist/toggle</code><br>
        يقوم السيرفر بالإضافة إن لم يكن موجوداً، أو الحذف إن كان موجوداً، ويعيد لك الحالة الجديدة!</li>
        <li>تفريغ المفضلة بالكامل: <span class="badge badge-delete">DELETE</span> <code>/wishlist/clear</code></li>
      </ul>

      <h3 class="sub-sub-title" style="margin-top: 12px;">3. شاشة الحساب والإعدادات (Profile Screen):</h3>
      <ul style="margin-right: 20px; line-height: 1.8;">
        <li>بيانات حسابي: <span class="badge badge-get">GET</span> <code>/auth/me</code></li>
        <li>تحديث الاسم ورقم الهاتف: <span class="badge badge-patch">PATCH</span> <code>/auth/update-profile</code> (Body: <code>{"name": "...", "phone": "..."}</code>)</li>
        <li>تغيير كلمة المرور: <span class="badge badge-patch">PATCH</span> <code>/auth/change-password</code></li>
        <li>تسجيل الخروج: <span class="badge badge-post">POST</span> <code>/auth/logout</code> (قم بحذف التوكن محلياً)</li>
        <li>حذف الحساب نهائياً: <span class="badge badge-delete">DELETE</span> <code>/auth/delete-account</code></li>
      </ul>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 6: COMPLETE TECHNICAL API REFERENCE -->
  <div id="sec6">
    <h1 class="sec-title">4. القاموس الفني الكامل لجميع الـ Endpoints (100% APIs)</h1>
    <p>
      جدول شامل ومفهرس يضم كل نقطة نهاية (Endpoint) معرفة في كود المشروع:
    </p>

    <h2 class="sub-title">1. واجهات المصادقة والحساب (Auth APIs - /api/v1/auth)</h2>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Auth?</th>
          <th>الوصف وبيانات الـ Body</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/signup</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>إنشاء حساب مستخدم جديد (name, email, phone, password, confirmPassword)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/login</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تسجيل الدخول بالبريد وكلمة المرور (email, password)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/google</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تسجيل الدخول عبر توكن Firebase Google (idToken)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/auth/verify-email/:token</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تأكيد البريد الإلكتروني برمز التفعيل</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/resend-verification</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>إعادة إرسال رسالة تفعيل البريد الإلكتروني (email)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/forgot-password</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>طلب كود OTP لإعادة ضبط كلمة المرور (email)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/verify-reset-otp</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>التحقق من كود الـ OTP (email, otp) والحصول على resetToken</td>
        </tr>
        <tr>
          <td><span class="badge badge-patch">PATCH</span></td>
          <td><code>/auth/reset-password/:token</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تعيين كلمة مرور جديدة (password, confirmPassword)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/auth/me</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>جلب بيانات الملف الشخصي للمستخدم الحالي وصلاحياته</td>
        </tr>
        <tr>
          <td><span class="badge badge-patch">PATCH</span></td>
          <td><code>/auth/update-profile</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تحديث بيانات البروفايل (name, phone)</td>
        </tr>
        <tr>
          <td><span class="badge badge-patch">PATCH</span></td>
          <td><code>/auth/change-password</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تغيير كلمة المرور (currentPassword, newPassword, confirmPassword)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/select-city</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تحديد وحفظ المدينة المفضلة للمستخدم (cityId)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/select-region</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تحديد وحفظ المنطقة المفضلة للمستخدم (regionId)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/auth/logout</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تسجيل الخروج وإنهاء الجلسة</td>
        </tr>
        <tr>
          <td><span class="badge badge-delete">DELETE</span></td>
          <td><code>/auth/delete-account</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>حذف حساب المستخدم وجميع بياناته نهائياً</td>
        </tr>
      </tbody>
    </table>

    <h2 class="sub-title">2. واجهات المدن والمناطق (Cities & Regions)</h2>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Auth?</th>
          <th>الوصف</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/cities</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>قائمة المدن المتاحة وعدد مناطق كل مدينة (active=true)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/cities/:id</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تفاصيل مدينة محددة وقائمة مناطقها التابعة</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/cities/:id/regions</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>جلب مناطق مدينة معينة فقط (سيدي عبد الرحمن، مراسي...)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/cities/:id/data</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td><strong>شاشة المدينة الشاملة:</strong> تعيد المدينة + المناطق + البانرات + أبرز الإعلانات</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/regions</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>قائمة المناطق (يمكن فلترتها بـ ?city=cityId)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/regions/:id</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تفاصيل منطقة معينة وحدودها الجغرافية</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/regions/:id/data</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td><strong>شاشة المنطقة الشاملة:</strong> بانرات المنطقة + الشاليهات + كل عقاراتها</td>
        </tr>
      </tbody>
    </table>

    <h2 class="sub-title">3. واجهات الإعلانات والبحث والغرف (Ads, Search & Rooms)</h2>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Auth?</th>
          <th>الوصف</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/advertisements</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>قائمة الإعلانات مع فلترة بـ city, category, unitType, page, limit</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/advertisements/:id</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>التفاصيل الكاملة لإعلان (المواصفات، الأسعار، الصور، المالك)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/advertisements/:id/rooms</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>قائمة الغرف التابعة لفندق معين</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/advertisements/:id/available-rooms</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>الغرف المتاحة بالفندق بالتواريخ والنزلاء (?startDate=&endDate=&guests=)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span> / <span class="badge badge-post">POST</span></td>
          <td><code>/search</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>محرك البحث والفلترة الذكي (تواريخ، أسعار، نزلاء، موقع، تصنيفات)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/rooms/:id</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>تفاصيل غرفة معينة داخل فندق (السرائر، السعة، السعر)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/unit-types</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>قائمة أنواع الوحدات (فيلا، كابينة، شقة، ستوديو...)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/unit-types/:id/attributes</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>الخصائص والحقول الديناميكية لنوع الوحدة لبناء فلاتر متقدمة</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/banners</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>البانرات الإعلانية (?city=&region=&position=top|center|bottom)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/categories</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>التصنيفات الرئيسية (فنادق، شاليهات، يخوت، عربات جولف)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/onboarding</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>شرائح التعريف والشرح لتطبيق الموبايل</td>
        </tr>
      </tbody>
    </table>

    <h2 class="sub-title">4. واجهات الحجوزات والمفضلة (Bookings & Wishlist)</h2>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Auth?</th>
          <th>الوصف</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/bookings/check-availability/:id</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>فحص توفر عقار أو غرفة محددة في تواريخ معينة</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/bookings/schedule/:id</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td>سلوتات ومواعيد اليخت أو الجولف كار بيوم محدد (?date=YYYY-MM-DD)</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/bookings/calculate-price</code></td>
          <td><span class="badge badge-public">No</span></td>
          <td><strong>حاسبة السعر الموحدة:</strong> تفحص التوفر وتحسب السعر الدقيق قبل الحجز</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/bookings</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td><strong>إنشاء حجز جديد:</strong> (فندق، شاليه، يخت، جولف كار)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/bookings</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>عرض قائمة حجوزات المستخدم الحالي (?status=pending|confirmed...)</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/bookings/:id</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>عرض التفاصيل الكاملة لحجز معين وإيصاله المالي</td>
        </tr>
        <tr>
          <td><span class="badge badge-patch">PATCH</span></td>
          <td><code>/bookings/:id/cancel</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>إلغاء حجز قائم وتحرير الموعد في جدول المواعيد</td>
        </tr>
        <tr>
          <td><span class="badge badge-get">GET</span></td>
          <td><code>/wishlist</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>عرض قائمة الإعلانات المضافة للمفضلة للمستخدم الحالي</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/wishlist/toggle</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تبديل حالة المفضلة بنقرة واحدة (Body: {"advertisementId": "..."})</td>
        </tr>
        <tr>
          <td><span class="badge badge-post">POST</span></td>
          <td><code>/advertisements/:id/wishlist/toggle</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>تبديل حالة المفضلة من صفحة تفاصيل الإعلان مباشرة</td>
        </tr>
        <tr>
          <td><span class="badge badge-delete">DELETE</span></td>
          <td><code>/wishlist/clear</code></td>
          <td><span class="badge badge-auth">Yes</span></td>
          <td>مسح كافة العناصر من قائمة المفضلة</td>
        </tr>
      </tbody>
    </table>

    <h2 class="sub-title">5. ملخص واجهات الإدارة (Admin APIs - /api/v1/admin/*)</h2>
    <p>هذه الواجهات مخصصة للوحة التحكم والأدمن والمالك (Owner):</p>
    <table>
      <thead>
        <tr>
          <th>الوحدة</th>
          <th>المسارات (Endpoints)</th>
          <th>الصلاحيات</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Admin Auth</strong></td>
          <td><code>POST /admin/auth/login</code>, <code>POST /admin/auth/google</code>, <code>GET /admin/auth/me</code></td>
          <td>Admin / Super Admin</td>
        </tr>
        <tr>
          <td><strong>Users Management</strong></td>
          <td><code>GET /admin/users</code>, <code>GET /stats</code>, <code>POST /</code>, <code>PATCH /:id/toggle-status</code></td>
          <td>Super Admin</td>
        </tr>
        <tr>
          <td><strong>Advertisements Admin</strong></td>
          <td>CRUD كامل، <code>POST /:id/owner</code> (تعيين مالك)، <code>POST /:id/images</code> (رفع حتى 10 صور)، <code>PATCH /set-main-image</code></td>
          <td>Admin / Owner</td>
        </tr>
        <tr>
          <td><strong>Bookings Admin</strong></td>
          <td>CRUD كامل على جميع الحجوزات، تغيير الحالة (confirm, complete, cancel)، وفحص التوفر</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td><strong>Cities, Regions & Banners</strong></td>
          <td>إضافة وتعديل وحذف المدن والمناطق ورسم إحداثيات الـ Polygons ورفع الصور</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td><strong>Unit Types & Attributes</strong></td>
          <td>إدارة أنواع الوحدات وإضافة وحذف الخصائص الديناميكية (Attributes)</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td><strong>Onboarding Admin</strong></td>
          <td>إضافة وتعديل وحذف شرائح التعريف وترتيبها <code>PATCH /reorder/bulk</code></td>
          <td>Admin</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 7: FLUTTER READY CODE SNIPPETS -->
  <div id="sec7">
    <h1 class="sec-title">5. نصائح وأكواد مساعدة جاهزة لـ Flutter</h1>
    <p>
      أكواد معمارية جاهزة تمكن مطور الفلاتر من ربط المشروع باحترافية في دقائق معدودة:
    </p>

    <div class="card">
      <div class="card-title">1. إعداد عميل Dio والـ Interceptors</div>
      <p>يتولى إرفاق الـ Token واللغة المختارة ومعالجة أخطاء 401 تلقائياً:</p>
      <pre><code>import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  static const String baseUrl = 'http://10.0.2.2:3000/api/v1'; // أو سيرفر الإنتاج
  late final Dio dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  ApiClient() {
    dio = Dio(
      BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': 'ar', // يدعم 'ar' أو 'en'
        },
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _storage.read(key: 'jwt_token');
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (DioException error, handler) async {
          if (error.response?.statusCode == 401) {
            // التوكن منتهي أو غير صالح
            await _storage.delete(key: 'jwt_token');
            // يمكنك هنا إطلاق حدث لإعادة التوجيه لصفحة تسجيل الدخول
          }
          return handler.next(error);
        },
      ),
    );
  }
}</code></pre>
    </div>

    <div class="card">
      <div class="card-title">2. كود Generic ApiResponse Model</div>
      <p>نموذج Dart موحد يتعامل مع كل ردود السيرفر تلقائياً:</p>
      <pre><code>class ApiResponse&lt;T&gt; {
  final String status;
  final String? message;
  final T? data;
  final int? results;
  final int? total;
  final int? page;
  final int? totalPages;
  final String? token;

  ApiResponse({
    required this.status,
    this.message,
    this.data,
    this.results,
    this.total,
    this.page,
    this.totalPages,
    this.token,
  });

  bool get isSuccess =&gt; status == 'success';

  factory ApiResponse.fromJson(
    Map&lt;String, dynamic&gt; json,
    T Function(dynamic dataJson)? fromDataJson,
  ) {
    return ApiResponse&lt;T&gt;(
      status: json['status'] ?? 'fail',
      message: json['message'],
      data: (json['data'] != null && fromDataJson != null)
          ? fromDataJson(json['data'])
          : json['data'] as T?,
      results: json['results'],
      total: json['total'],
      page: json['page'],
      totalPages: json['totalPages'],
      token: json['token'],
    );
  }
}</code></pre>
    </div>

    <div class="card">
      <div class="card-title">3. دالة معالجة روابط الصور (Image URL Resolver)</div>
      <pre><code>String resolveImageUrl(String? rawUrl) {
  if (rawUrl == null || rawUrl.isEmpty) return 'assets/images/placeholder.png';
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }
  const String serverDomain = 'http://10.0.2.2:3000';
  final cleanPath = rawUrl.startsWith('/') ? rawUrl : '/$rawUrl';
  // إذا كان المسار يحتوي بالفعل على uploads
  if (cleanPath.startsWith('/uploads/')) {
    return '$serverDomain$cleanPath';
  }
  return '$serverDomain/uploads$cleanPath';
}</code></pre>
    </div>

    <div class="card" style="border-right: 5px solid var(--emerald);">
      <div class="card-title" style="color: var(--emerald);">✨ ملخص تنفيذي لمطور فلاتر (Quick Cheat Sheet)</div>
      <ol style="margin-right: 20px; line-height: 2;">
        <li><strong>أول شاشة:</strong> نادِ <code>GET /cities</code> واحفظ الـ <code>cityId</code> في State إداري عام.</li>
        <li><strong>الصفحة الرئيسية:</strong> استخدم دائماً <code>GET /cities/:id/data?position=top</code> لجلب كل محتويات الصفحة بطلب واحد.</li>
        <li><strong>البحث:</strong> استخدم <code>GET /search</code> مع تمرير <code>city</code> و <code>startDate</code> و <code>endDate</code> لاستبعاد الوحدات المحجوزة.</li>
        <li><strong>قبل الحجز:</strong> استدعِ دائماً <code>POST /bookings/calculate-price</code> للتأكد من التوفر وعرض السعر الإجمالي للمستخدم.</li>
        <li><strong>عند الحجز:</strong> أرسل <code>POST /bookings</code> مع הـ Bearer Token وتفاصيل الضيف.</li>
        <li><strong>زر القلب:</strong> استخدم <code>POST /wishlist/toggle</code> لإضافة أو إزالة الوحدة بلمسة واحدة.</li>
      </ol>
    </div>
  </div>

</div>

</body>
</html>
`;

const htmlFilePath = path.join(__dirname, '..', 'docs', 'kuba_flutter_api_guide.html');
const pdfFilePath = path.join(__dirname, '..', 'docs', 'Kuba_Flutter_API_Documentation.pdf');

fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('HTML Documentation written to:', htmlFilePath);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');

try {
  console.log('Rendering PDF via Headless Edge...');
  execFileSync(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfFilePath}`,
    fileUrl
  ]);
  const stats = fs.statSync(pdfFilePath);
  console.log('PDF Generated Successfully!');
  console.log('Path:', pdfFilePath);
  console.log('Size:', (stats.size / 1024).toFixed(2), 'KB');
} catch (err) {
  console.error('Failed to generate PDF:', err);
}
