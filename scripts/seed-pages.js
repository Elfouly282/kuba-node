/**
 * Seeds the three storefront content pages: about, contact, privacy-policy.
 * Safe to re-run — upserts by slug.
 *
 * Usage: node scripts/seed-pages.js
 */
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { ensureDns } = require('../src/config/database');

dotenv.config({ path: path.join(__dirname, '..', 'config.env') });
ensureDns();

const Page = require('../src/features/page/models/pageModel');

const DEFAULT_PAGES = [
    {
        slug: 'about',
        titleEn: 'About AUREVIA',
        titleAr: 'عن أوريفيا',
        subtitleEn: 'We source what others cannot find.',
        subtitleAr: 'نحن نجلب ما لا يستطيع غيرنا إيجاده.',
        contentEn:
            'AUREVIA was built on a single belief: that the most extraordinary fragrances come from ingredients the world has not yet discovered. We travel directly to source regions — the oud forests of Assam, the rose fields of Taif, the vanilla groves of Madagascar — and return with oils that simply cannot be found anywhere else.\n\nThis is not marketing. This is the literal calling point of what we offer: fragrances built from ingredients the world has not yet discovered.',
        contentAr:
            'بُنيت أوريفيا على قناعة واحدة: أن أروع العطور تأتي من مكونات لم يكتشفها العالم بعد. نسافر مباشرة إلى مناطق المصدر — غابات العود في آسام، وحقول الورد في الطائف، وبساتين الفانيليا في مدغشقر — ونعود بزيوت لا توجد في أي مكان آخر.\n\nهذا ليس تسويقاً. هذه هي حرفياً نقطة العرض لدينا: عطور مصنوعة من مكونات لم يكتشفها العالم بعد.',
    },
    {
        slug: 'contact',
        titleEn: 'Contact AUREVIA',
        titleAr: 'تواصل مع أوريفيا',
        subtitleEn: 'Our fragrance advisors are available Monday through Sunday, 9am–9pm',
        subtitleAr: 'مستشارو العطور لدينا متاحون من الاثنين إلى الأحد، من 9 صباحاً إلى 9 مساءً',
        contentEn:
            'We would love to hear from you. Reach out for product advice, order support, or partnership inquiries — a fragrance advisor will respond within 24 hours.',
        contentAr:
            'يسعدنا سماعك. تواصل معنا للاستشارة حول المنتجات أو دعم الطلبات أو فرص الشراكة — سيرد عليك مستشار عطور خلال 24 ساعة.',
        email: 'hello@aurevia.com',
        phone: '+971 4 000 0000',
        addressEn: 'Dubai Design District, Building 7, Dubai, UAE',
        addressAr: 'حي دبي للتصميم، مبنى 7، دبي، الإمارات',
    },
    {
        slug: 'privacy-policy',
        titleEn: 'Privacy Policy',
        titleAr: 'سياسة الخصوصية',
        subtitleEn: 'How AUREVIA collects, uses, and protects your information',
        subtitleAr: 'كيف تجمع أوريفيا معلوماتك وتستخدمها وتحميها',
        contentEn:
            'Last updated: August 2026\n\nAUREVIA ("we", "us", or "our") respects your privacy. This Privacy Policy explains what personal data we collect when you visit our website or place an order, how we use it, and the choices you have.\n\n1. Information We Collect\nWe collect information you provide directly (name, email, phone, shipping address, payment details) and technical data such as IP address, browser type, and pages visited.\n\n2. How We Use Your Information\nWe use your data to process orders, provide customer support, improve our products and website, and send marketing communications only when you have opted in.\n\n3. Sharing of Information\nWe do not sell your personal data. We share it only with trusted service providers (payment, shipping, analytics) who process it on our behalf under strict agreements.\n\n4. Data Retention\nWe retain order and account data as long as needed for legal, accounting, and service purposes, then delete or anonymize it.\n\n5. Your Rights\nDepending on your location, you may request access, correction, deletion, or portability of your personal data by contacting hello@aurevia.com.\n\n6. Cookies\nWe use essential cookies for the site to function and optional analytics cookies. You can control cookies through your browser settings.\n\n7. Contact\nFor privacy questions, email hello@aurevia.com.',
        contentAr:
            'آخر تحديث: أغسطس 2026\n\nتحترم أوريفيا ("نحن") خصوصيتك. توضح سياسة الخصوصية هذه البيانات الشخصية التي نجمعها عند زيارة موقعنا أو تقديم طلب، وكيف نستخدمها، والخيارات المتاحة لك.\n\n1. المعلومات التي نجمعها\nنجمع المعلومات التي تقدمها مباشرة (الاسم، البريد الإلكتروني، الهاتف، عنوان الشحن، بيانات الدفع) وبيانات تقنية مثل عنوان IP ونوع المتصفح والصفحات التي تزورها.\n\n2. كيف نستخدم معلوماتك\nنستخدم بياناتك لمعالجة الطلبات، وتقديم دعم العملاء، وتحسين منتجاتنا وموقعنا، وإرسال رسائل تسويقية فقط عند موافقتك.\n\n3. مشاركة المعلومات\nلا نبيع بياناتك الشخصية. نشاركها فقط مع مزودي خدمات موثوقين (الدفع، الشحن، التحليلات) الذين يعالجونها نيابةً عنا بموجب اتفاقيات صارمة.\n\n4. الاحتفاظ بالبيانات\nنحتفظ ببيانات الطلبات والحسابات طالما لزم الأمر لأغراض قانونية ومحاسبية وخدمية، ثم نحذفها أو نجعلها مجهولة الهوية.\n\n5. حقوقك\nحسب موقعك، يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها أو نقلها عبر التواصل على hello@aurevia.com.\n\n6. ملفات تعريف الارتباط\nنستخدم ملفات ضرورية لعمل الموقع وملفات تحليلات اختيارية. يمكنك التحكم فيها من إعدادات المتصفح.\n\n7. التواصل\nلأسئلة الخصوصية، راسلنا على hello@aurevia.com.',
    },
];

(async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to DB');

        for (const page of DEFAULT_PAGES) {
            const result = await Page.findOneAndUpdate(
                { slug: page.slug },
                { $set: page },
                { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
            );
            console.log(`  upserted page: ${result.slug} (${result._id})`);
        }

        console.log('Done seeding pages.');
    } catch (err) {
        console.error('Seed failed:', err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
})();
