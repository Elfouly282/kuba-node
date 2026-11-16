const mongoose = require('mongoose');
const Policy = require('./models/policyModel');
const defaultPrivacyPolicy = require('./defaultPrivacyPolicy');

const publicBase = () => (process.env.BASE_URL || 'https://kuba-app.com').replace(/\/$/, '');

const presentPolicy = (policy) => {
    const base = publicBase();
    return {
        slug: policy.slug || 'privacy-policy',
        titleEn: policy.titleEn,
        titleAr: policy.titleAr,
        contentEn: policy.contentEn,
        contentAr: policy.contentAr,
        contactEmail: policy.contactEmail || defaultPrivacyPolicy.contactEmail,
        updatedAt: policy.updatedAt || policy.createdAt || new Date(),
        url: `${base}/privacy-policy`,
        urlEn: `${base}/privacy-policy?lang=en`,
        urlAr: `${base}/privacy-policy?lang=ar`,
    };
};

const loadPrivacyPolicy = async () => {
    const fallback = { ...defaultPrivacyPolicy, updatedAt: new Date() };
    if (mongoose.connection.readyState !== 1) return fallback;

    try {
        const policy = await Policy.findOneAndUpdate(
            { slug: 'privacy-policy' },
            { $setOnInsert: defaultPrivacyPolicy },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        return policy || fallback;
    } catch (err) {
        console.error('[privacy-policy] load failed:', err.message);
        return fallback;
    }
};

const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const toParagraphs = (text) => escapeHtml(text)
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
    .join('');

const pickLang = (req) => {
    const queryLang = String(req.query.lang || '').toLowerCase();
    if (queryLang === 'ar' || queryLang === 'en') return queryLang;
    const header = String(req.headers['accept-language'] || '').toLowerCase();
    return header.startsWith('ar') ? 'ar' : 'en';
};

const renderPrivacyHtml = (policy, lang) => {
    const presented = presentPolicy(policy);
    const isAr = lang === 'ar';
    const title = isAr ? presented.titleAr : presented.titleEn;
    const content = isAr ? presented.contentAr : presented.contentEn;
    const updated = new Date(presented.updatedAt);
    const updatedLabel = updated.toLocaleDateString(isAr ? 'ar-EG' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const updatedCaption = isAr ? 'آخر تحديث' : 'Last updated';
    const otherLang = isAr ? 'en' : 'ar';
    const otherLabel = isAr ? 'English' : 'العربية';
    const contactLabel = isAr ? 'للتواصل' : 'Contact';

    return `<!DOCTYPE html>
<html lang="${lang}" dir="${isAr ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} | Kuba Tours</title>
<meta name="description" content="Privacy Policy for the Kuba Tours app on Google Play and the App Store.">
<link rel="canonical" href="${escapeHtml(presented.url)}">
<link rel="icon" href="/images/kuba-logo.jpeg">
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4f7f4; color: #1c281c; font-family: Georgia, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
  header, main, footer { width: min(820px, calc(100% - 32px)); margin: 0 auto; }
  header { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 28px 0 12px; }
  .brand { color: #1c281c; font-weight: 700; text-decoration: none; letter-spacing: 0.04em; }
  .lang { color: #2D4F2E; font-weight: 700; text-decoration: none; }
  h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 8px; }
  .updated { color: #5c6b5c; margin: 0 0 24px; }
  article p { margin: 0 0 14px; white-space: normal; }
  footer { padding: 8px 0 40px; color: #3d4d3d; }
  a { color: #2D4F2E; }
</style>
</head>
<body>
<header>
  <a class="brand" href="/">KUBA TOURS</a>
  <a class="lang" href="/privacy-policy?lang=${otherLang}">${otherLabel}</a>
</header>
<main>
  <h1>${escapeHtml(title)}</h1>
  <p class="updated">${updatedCaption}: ${escapeHtml(updatedLabel)}</p>
  <article>${toParagraphs(content)}</article>
</main>
<footer>
  <p>${contactLabel}: <a href="mailto:${escapeHtml(presented.contactEmail)}">${escapeHtml(presented.contactEmail)}</a></p>
</footer>
</body>
</html>`;
};

module.exports = {
    presentPolicy,
    loadPrivacyPolicy,
    pickLang,
    renderPrivacyHtml,
    defaultPrivacyPolicy,
};
