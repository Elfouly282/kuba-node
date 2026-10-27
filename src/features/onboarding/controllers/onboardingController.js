const OnboardingScreen = require('../models/onboardingScreenModel');
const { localizeOnboardingScreens } = require('../../../../utils/localize');
const { SuccessResponse } = require('../../../utils/apiResponse');

exports.getAll = async (req, res) => {
    const screens = await OnboardingScreen.find().sort('order');

    SuccessResponse.ok(res, {
        results: screens.length,
        data: { screens: localizeOnboardingScreens(screens, req.locale) },
    });
};
