const logger = require('../util/logger').application;

module.exports = (options) => {
  return (err, req, res, next) => {
    logger.error(err.message);
    next(err);
  };
};