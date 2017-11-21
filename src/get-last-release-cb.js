const getLastRelease = require('./get-last-release');

module.exports = function(options, { npm }, cb) {
  const logger = {
    log: (...args) => npm.loglevel && console.log(...args),
    info: (...args) => npm.loglevel && console.info(...args),
    error: (...args) => npm.loglevel && console.error(...args),
    warn: (...args) => npm.loglevel && console.warn(...args),
  };
  return getLastRelease({npm}, logger)
    .then(result => {
      return cb(null, result);
    })
    .catch(err => {
      return cb(err);
    });
};
