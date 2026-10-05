const { translate } = require('../../utils/i18n');

class APIError extends Error {
  constructor(key, statusCode, vars = {}) {
    super(translate('en', key, vars));
    this.key = key;
    this.vars = vars;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

module.exports = APIError;
