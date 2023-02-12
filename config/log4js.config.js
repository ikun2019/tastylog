const path = require('path');
const rootDir = require('../util/path');

module.exports = {
  appenders: {
    ConsoleLogAppender: {
      type: 'console'
    },
    ApplicationLogAppender: {
      type: 'dateFile',
      filename: path.join(`${rootDir}/logs`, './application.log'),
      pattern: 'yyyyMMdd',
      daysToKeep: 7
    },
    AccessLogAppender: {
      type: 'dateFile',
      filename: path.join(`${rootDir}/logs`, './access.log'),
      pattern: 'yyyyMMdd',
      daysToKeep: 7
    }
  },
  categories: {
    'default': {
      appenders: ['ConsoleLogAppender'],
      level: 'ALL'
    },
    'application': {
      appenders: ['ConsoleLogAppender', 'ApplicationLogAppender'],
      level: 'INFO'
    },
    'access': {
      appenders: ['ConsoleLogAppender','AccessLogAppender'],
      level: 'INFO'
    }
  }
};