const log4js = require('log4js');
const config = require('../config/log4js.config');

log4js.configure(config);

exports.console = log4js.getLogger();
exports.application = log4js.getLogger('application');
exports.access = log4js.getLogger('access');
