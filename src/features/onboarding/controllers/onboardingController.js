const OnboardingScreen = require('../models/onboardingScreenModel');
const { localizeOnboardingScreens } = require('../../../../utils/localize');

exports.getAll = async (req, res, next) => {
    try {
        const screens = await OnboardingScreen.find().sort('order');

        res.status(200).json({
            status: 'success',
            results: screens.length,
            data: { screens: localizeOnboardingScreens(screens, req.locale) },
        });
    } catch (err) { next(err); }
};
