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
        if (name === 'a') {
            const hrefMatch = String(attrs).match(/href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
            const href = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || '') : '';
            if (!/^https?:\/\//i.test(href)) return '<a>';
            return `<a href="${escapeHtml(href)}" rel="noopener noreferrer" target="_blank">`;
        }
        return `<${name}>`;
    }).trim();
};

const normalizeDescriptionHtml = (value) => {
    const raw = String(value || '').replace(/\u00a0/g, ' ').trim();
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
        if (value === false || value === 'false' || value === 0 || value === '0') return 'لا';
    }
    const text = String(value).trim();
    if (!text) return '';
    return def?.unit ? `${text} ${def.unit}` : text;
};

const buildDetailsHtml = ({ description, location, address, attributes, attributeDefs } = {}) => {
    const descriptionHtml = styleDescription(normalizeDescriptionHtml(description));
    const allDefs = (Array.isArray(attributeDefs) ? attributeDefs : []).filter((def) => def && def.key);
    const hidden = new Set(allDefs.filter((def) => def.showInDetails === false || def.active === false).map((def) => def.key));
    const defs = allDefs
        .filter((def) => !hidden.has(def.key))
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    const attrs = attributes && typeof attributes === 'object' ? attributes : {};
    const used = new Set();
    const rows = [];

    const pushRow = (label, value) => {
        if (!label || !value) return;
        rows.push(
            `<div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;">`
            + `<span style="color:#64748b;font-weight:600;">${escapeHtml(label)}</span>`
            + `<span style="color:#0f172a;font-weight:700;">${escapeHtml(value)}</span>`
            + `</div>`
        );
    };

    defs.forEach((def) => {
        if (!def.key) return;
        used.add(def.key);
        pushRow(def.nameAr || def.name || def.key, formatAttributeValue(attrs[def.key], def));
    });

    Object.keys(attrs).forEach((key) => {
        if (used.has(key) || hidden.has(key)) return;
        pushRow(String(key).replace(/_/g, ' '), formatAttributeValue(attrs[key]));
    });

    const sections = [];
    if (descriptionHtml) {
        sections.push(
            `<section style="margin:0 0 16px;">`
            + `<h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2D4F2E;">الوصف</h2>`
            + `<div>${descriptionHtml}</div>`
            + `</section>`
        );
    }
    if (rows.length) {
        sections.push(
            `<section style="margin:0 0 16px;">`
            + `<h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2D4F2E;">المواصفات</h2>`
            + `<div>${rows.join('')}</div>`
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
    buildDetailsHtml,
};
