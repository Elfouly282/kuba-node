const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (to, subject, html) =>
    transporter.sendMail({
        from: `"Aurevia" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });

const sendVerificationEmail = (to, name, token, locale) => {
    const url = `${process.env.BASE_URL}/api/v1/auth/verify-email/${token}`;
    const isAr = locale === 'ar';

    const subject = isAr ? 'تأكيد البريد الإلكتروني - Aurevia' : 'Verify your email – Aurevia';
    const html = isAr
        ? `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>مرحباً ${name}،</h2>
               <p>شكراً لتسجيلك في <strong>Aurevia</strong>. اضغط على الزر لتأكيد بريدك الإلكتروني.</p>
               <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px">تأكيد البريد الإلكتروني</a>
               <p style="color:#888;font-size:13px;margin-top:16px">الرابط صالح 24 ساعة.</p>
           </div>`
        : `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>Hi ${name},</h2>
               <p>Thanks for signing up for <strong>Aurevia</strong>. Click below to verify your email.</p>
               <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px">Verify Email</a>
               <p style="color:#888;font-size:13px;margin-top:16px">This link expires in 24 hours.</p>
           </div>`;

    return sendEmail(to, subject, html);
};

const sendPasswordResetEmail = (to, name, token, locale) => {
    const url = `${process.env.BASE_URL}/api/v1/auth/reset-password/${token}`;
    const isAr = locale === 'ar';

    const subject = isAr ? 'إعادة تعيين كلمة المرور - Aurevia' : 'Reset your password – Aurevia';
    const html = isAr
        ? `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>مرحباً ${name}،</h2>
               <p>تلقينا طلباً لإعادة تعيين كلمة مرور حسابك في <strong>Aurevia</strong>.</p>
               <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px">إعادة تعيين كلمة المرور</a>
               <p style="color:#888;font-size:13px;margin-top:16px">الرابط صالح 10 دقائق فقط.</p>
           </div>`
        : `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>Hi ${name},</h2>
               <p>We received a request to reset your <strong>Aurevia</strong> password.</p>
               <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px">Reset Password</a>
               <p style="color:#888;font-size:13px;margin-top:16px">This link expires in 10 minutes.</p>
           </div>`;

    return sendEmail(to, subject, html);
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
