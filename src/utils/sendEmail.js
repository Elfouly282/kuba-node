const nodemailer = require('nodemailer');

let _transporter = null;

const getTransporter = () => {
    if (_transporter) return _transporter;

    const port = Number(process.env.EMAIL_PORT) || 465;
    _transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port,
        secure: port === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: { rejectUnauthorized: false },
    });
    return _transporter;
};

const sendEmail = (to, subject, html) =>
    getTransporter().sendMail({
        from: `"Kuba" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });

const greeting = (name, isAr) => {
    if (!name || name === 'null') return isAr ? 'مرحباً،' : 'Hello,';
    return isAr ? `مرحباً ${name}،` : `Hi ${name},`;
};

const sendVerificationEmail = (to, name, token, locale) => {
    const url = `${process.env.BASE_URL}/api/v1/auth/verify-email/${token}`;
    const isAr = locale === 'ar';

    const subject = isAr ? 'تأكيد البريد الإلكتروني - Kuba' : 'Verify your email – Kuba';
    const html = isAr
        ? `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>${greeting(name, true)}</h2>
               <p>شكراً لتسجيلك في <strong>Kuba</strong>. اضغط على الزر لتأكيد بريدك الإلكتروني.</p>
               <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px">تأكيد البريد الإلكتروني</a>
               <p style="color:#888;font-size:13px;margin-top:16px">الرابط صالح 24 ساعة.</p>
           </div>`
        : `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>${greeting(name, false)}</h2>
               <p>Thanks for signing up for <strong>Kuba</strong>. Click below to verify your email.</p>
               <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px">Verify Email</a>
               <p style="color:#888;font-size:13px;margin-top:16px">This link expires in 24 hours.</p>
           </div>`;

    return sendEmail(to, subject, html);
};

const sendPasswordResetOtpEmail = (to, name, otp, locale) => {
    const isAr = locale === 'ar';

    const subject = isAr ? 'رمز إعادة تعيين كلمة المرور - Kuba' : 'Your password reset code – Kuba';
    const html = isAr
        ? `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>${greeting(name, true)}</h2>
               <p>تلقينا طلباً لإعادة تعيين كلمة مرور حسابك في <strong>Kuba</strong>.</p>
               <p>استخدم الرمز التالي:</p>
               <div style="font-size:36px;font-weight:bold;letter-spacing:10px;text-align:center;padding:20px;background:#f4f4f4;border-radius:8px;margin:24px 0">
                   ${otp}
               </div>
               <p style="color:#888;font-size:13px">الرمز صالح لمدة 10 دقائق فقط. إذا لم تطلب إعادة التعيين تجاهل هذا البريد.</p>
           </div>`
        : `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
               <h2>${greeting(name, false)}</h2>
               <p>We received a request to reset your <strong>Kuba</strong> password.</p>
               <p>Use the code below:</p>
               <div style="font-size:36px;font-weight:bold;letter-spacing:10px;text-align:center;padding:20px;background:#f4f4f4;border-radius:8px;margin:24px 0">
                   ${otp}
               </div>
               <p style="color:#888;font-size:13px">This code expires in 10 minutes. If you didn't request a reset, ignore this email.</p>
           </div>`;

    return sendEmail(to, subject, html);
};

module.exports = { sendVerificationEmail, sendPasswordResetOtpEmail };
