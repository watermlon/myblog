const log4js = require('log4js');
//log4js配置
log4js.configure({
    appenders: {
        out: { type: 'console' },
        // task: { type: 'dateFile', filename: 'logs/task', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        // result: { type: 'dateFile', filename: 'logs/result', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        // error: { type: 'dateFile', filename: 'logs/error', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        write: { type: 'dateFile', filename: 'logs/default', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        // rate: { type: 'dateFile', filename: 'logs/rate', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true }
    },
    categories: {
        default: { appenders: ['out', 'write'], level: 'all' },
        dev: { appenders: ['out'], level: 'info' },
        // result: { appenders: ['out', 'result'], level: 'info' },
        // error: { appenders: ['out', 'error'], level: 'error' },
        // rate: { appenders: ['rate'], level: 'info' },
    }
});
const logger = log4js.getLogger('dev');
module.exports = logger