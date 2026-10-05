const nodemailer = require('nodemailer');

/**
 * Creates a reusable nodemailer transporter from environment variables.
 */
const createTransporter = () =>
    nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

/**
 * Sends an email.
 *
 * @param {object} options
 * @param {string} options.to       - Recipient email address
 * @param {string} options.subject  - Email subject
 * @param {string} options.html     - HTML body
 * @param {string} [options.text]   - Plain-text fallback
 */
const sendEmail = async ({ to, subject, html, text }) => {
    const transporter = createTransporter();

    await transporter.sendMail({
        from: `"Aurevia" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''), // strip tags as plain-text fallback
    });
};

// ── Pre-built email templates ─────────────────────────────────────────────

/**
 * Sends an email-verification link to a newly registered user.
 *
 * @param {object} params
 * @param {string} params.to    - Recipient email
 * @param {string} params.name  - Recipient name
 * @param {string} params.token - Raw verification token
 * @param {string} params.locale - Request locale ('en' | 'ar')
 */
const sendVerificationEmail = async ({ to, name, token, locale = 'en' }) => {
    const verifyUrl = `${process.env.BASE_URL}/api/v1/auth/verify-email/${token}`;

    const isAr = locale === 'ar';

    const subject = isAr ? 'تأكيد البريد الإلكتروني - Aurevia' : 'Verify your email – Aurevia';

    const html = isAr
        ? `
            <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                <h2>مرحباً ${name}،</h2>
                <p>شكراً لتسجيلك في <strong>Aurevia</strong>. انقر على الزر أدناه لتأكيد بريدك الإلكتروني.</p>
                <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px;margin:16px 0">
                    تأكيد البريد الإلكتروني
                </a>
                <p style="color:#888;font-size:13px">هذا الرابط صالح لمدة 24 ساعة. إذا لم تقم بإنشاء حساب، تجاهل هذه الرسالة.</p>
                <hr/>
                <p style="color:#888;font-size:12px">أو انسخ هذا الرابط في متصفحك:<br/>${verifyUrl}</p>
            </div>`
        : `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                <h2>Hi ${name},</h2>
                <p>Thanks for signing up for <strong>Aurevia</strong>. Click the button below to verify your email address.</p>
                <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px;margin:16px 0">
                    Verify Email
                </a>
                <p style="color:#888;font-size:13px">This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
                <hr/>
                <p style="color:#888;font-size:12px">Or copy this link into your browser:<br/>${verifyUrl}</p>
            </div>`;

    await sendEmail({ to, subject, html });
};

/**
 * Sends a password-reset link.
 *
 * @param {object} params
 * @param {string} params.to    - Recipient email
 * @param {string} params.name  - Recipient name
 * @param {string} params.token - Raw reset token
 * @param {string} params.locale - Request locale
 */
const sendPasswordResetEmail = async ({ to, name, token, locale = 'en' }) => {
    const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${token}`;

    const isAr = locale === 'ar';

    const subject = isAr ? 'إعادة تعيين كلمة المرور - Aurevia' : 'Reset your password – Aurevia';

    const html = isAr
        ? `
            <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                <h2>مرحباً ${name}،</h2>
                <p>تلقينا طلباً لإعادة تعيين كلمة مرور حسابك في <strong>Aurevia</strong>.</p>
                <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px;margin:16px 0">
                    إعادة تعيين كلمة المرور
                </a>
                <p style="color:#888;font-size:13px">هذا الرابط صالح لمدة 10 دقائق فقط. إذا لم تطلب ذلك، تجاهل هذه الرسالة.</p>
                <hr/>
                <p style="color:#888;font-size:12px">أو انسخ هذا الرابط في متصفحك:<br/>${resetUrl}</p>
            </div>`
        : `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                <h2>Hi ${name},</h2>
                <p>We received a request to reset the password for your <strong>Aurevia</strong> account.</p>
                <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px;margin:16px 0">
                    Reset Password
                </a>
                <p style="color:#888;font-size:13px">This link expires in 10 minutes. If you didn't request a password reset, you can safely ignore this email.</p>
                <hr/>
                <p style="color:#888;font-size:12px">Or copy this link into your browser:<br/>${resetUrl}</p>
            </div>`;

    await sendEmail({ to, subject, html });
};

module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
