const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'span', 'div', 'a']);

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripHtml = (html) => String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h2|h3|h4|li|blockquote)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const looksLikeHtml = (value) => /<\/?[a-z][^>]*>/i.test(value);

const plainTextToHtml = (text) => String(text)
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');

const sanitizeHtml = (html) => {
    const withoutDangerous = String(html)
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(script|style|iframe|object|embed|form|textarea|input|button|link|meta)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(/<(script|style|iframe|object|embed|form|textarea|input|button|link|meta)\b[^>]*\/?>/gi, '');

    return withoutDangerous.replace(/<\/?([a-z0-9]+)\b([^>]*)>/gi, (match, tag, attrs) => {
        const name = tag.toLowerCase();
        if (!ALLOWED_TAGS.has(name)) return '';
        if (match.startsWith('</')) return `</${name}>`;
        if (name === 'br') return '<br>';
        if (name === 'div' && /class\s*=\s*["']ad-auto-specs["']/i.test(attrs)) {
            return '<div class="ad-auto-specs">';
        }
        if (name === 'a') {
            const hrefMatch = String(attrs).match(/href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
            const href = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || '') : '';
            if (!/^https?:\/\//i.test(href)) return '<a>';
            return `<a href="${escapeHtml(href)}" rel="noopener noreferrer" target="_blank">`;
        }
        return `<${name}>`;
    }).trim();
};

const stripAutoSpecs = (html) => String(html || '')
    .replace(/<div class="ad-auto-specs">[\s\S]*?<\/div>/gi, '')
    .trim();

const normalizeDescriptionHtml = (value) => {
    const raw = stripAutoSpecs(value).replace(/\u00a0/g, ' ').trim();
    if (!raw) return '';
    const html = looksLikeHtml(raw) ? sanitizeHtml(raw) : plainTextToHtml(raw);
    return stripHtml(html) ? html : '';
};

const styleDescription = (html) => String(html || '')
    .replace(/<p>/g, '<p style="margin:0 0 8px;font-size:14px;line-height:1.8;color:#334155;">')
    .replace(/<ul>/g, '<ul style="margin:0 18px 8px 0;padding:0;">')
    .replace(/<ol>/g, '<ol style="margin:0 18px 8px 0;padding:0;">')
    .replace(/<li>/g, '<li style="margin:0 0 4px;line-height:1.7;color:#334155;">')
    .replace(/<h2>/g, '<h2 style="margin:12px 0 6px;font-size:16px;font-weight:700;color:#2D4F2E;">')
    .replace(/<h3>/g, '<h3 style="margin:12px 0 6px;font-size:15px;font-weight:700;color:#1e293b;">')
    .replace(/<h4>/g, '<h4 style="margin:10px 0 6px;font-size:14px;font-weight:700;color:#1e293b;">')
    .replace(/<blockquote>/g, '<blockquote style="margin:0 0 8px;padding:8px 12px;border-right:3px solid #2D4F2E;color:#475569;">');

const formatAttributeValue = (value, def) => {
    if (value === null || value === undefined || value === '') return '';
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean).join('، ');
    }
    if (typeof value === 'boolean' || def?.dataType === 'boolean') {
        if (value === true || value === 'true' || value === 1 || value === '1') return 'نعم';
        return '';
    }
    const text = String(value).trim();
    if (!text) return '';
    return def?.unit ? `${text} ${def.unit}` : text;
};

const collectSpecItems = (attributes, attributeDefs) => {
    const allDefs = (Array.isArray(attributeDefs) ? attributeDefs : []).filter((def) => def && def.key);
    const hidden = new Set(allDefs.filter((def) => def.showInDetails === false || def.active === false).map((def) => def.key));
    const defs = allDefs
        .filter((def) => !hidden.has(def.key))
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    const attrs = attributes && typeof attributes === 'object' ? attributes : {};
    const used = new Set();
    const items = [];

    const pushItem = (label, value) => {
        if (!label || !value) return;
        items.push({ label, value });
    };

    defs.forEach((def) => {
        used.add(def.key);
        pushItem(def.nameAr || def.name || def.key, formatAttributeValue(attrs[def.key], def));
    });

    Object.keys(attrs).forEach((key) => {
        if (used.has(key) || hidden.has(key)) return;
        pushItem(String(key).replace(/_/g, ' '), formatAttributeValue(attrs[key]));
    });

    return items;
};

const formatSpecLinesHtml = (items) => {
    if (!items.length) return '';
    const lines = items
        .map((item) => `• ${escapeHtml(item.label)}: ${escapeHtml(item.value)}`)
        .join('<br>');
    return `<p style="display:block;margin:0;line-height:2;font-size:14px;color:#334155;">${lines}</p>`;
};

const buildAttributeSpecsHtml = (attributes, attributeDefs) => {
    const items = collectSpecItems(attributes, attributeDefs);
    if (!items.length) return '';
    return `<div class="ad-auto-specs"><p style="display:block;margin:14px 0 8px;font-size:15px;font-weight:700;color:#2D4F2E;">المواصفات</p>${formatSpecLinesHtml(items)}</div>`;
};

const buildDetailsHtml = ({ description, location, address, attributes, attributeDefs } = {}) => {
    const descriptionHtml = styleDescription(normalizeDescriptionHtml(description));
    const rows = formatSpecLinesHtml(collectSpecItems(attributes, attributeDefs));

    const sections = [];
    if (descriptionHtml) {
        sections.push(
            `<section style="margin:0 0 16px;">`
            + `<h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2D4F2E;">الوصف</h2>`
            + `<div>${descriptionHtml}</div>`
            + `</section>`
        );
    }
    if (rows) {
        sections.push(
            `<section style="margin:0 0 16px;">`
            + `<h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2D4F2E;">المواصفات</h2>`
            + `<div>${rows}</div>`
            + `</section>`
        );
    }

    const place = [location, address].map((part) => String(part || '').trim()).filter(Boolean);
    if (place.length) {
        sections.push(
            `<section style="margin:0 0 16px;">`
            + `<h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2D4F2E;">الموقع</h2>`
            + place.map((part) => `<p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#334155;">${escapeHtml(part)}</p>`).join('')
            + `</section>`
        );
    }

    if (!sections.length) return '';

    return `<article dir="rtl" style="font-family:Cairo,Tahoma,sans-serif;direction:rtl;text-align:right;color:#0f172a;line-height:1.7;">${sections.join('')}</article>`;
};

module.exports = {
    escapeHtml,
    stripHtml,
    normalizeDescriptionHtml,
    buildAttributeSpecsHtml,
    buildDetailsHtml,
};
