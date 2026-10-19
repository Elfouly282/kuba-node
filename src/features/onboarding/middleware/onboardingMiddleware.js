/**
 * Validates onboarding query params and normalizes locale.
 */
const validateOnboardingQuery = (req, _res, next) => {
    if (req.query.lang) {
        const lang = req.query.lang.toLowerCase();
        if (['ar', 'en'].includes(lang)) {
            req.locale = lang;
        }
    }
    next();
};

module.exports = {
    validateOnboardingQuery,
};
