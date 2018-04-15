const express = require('express')
const app = new express();
const bodyParser = require('body-parser');
const route = require('./router')
const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'console' },
        task: { type: 'dateFile', filename: 'logs/task', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        result: { type: 'dateFile', filename: 'logs/result', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        error: { type: 'dateFile', filename: 'logs/error', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        default: { type: 'dateFile', filename: 'logs/default', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true },
        rate: { type: 'dateFile', filename: 'logs/rate', "pattern": "yyyy-MM-dd.log", alwaysIncludePattern: true }
    },
    categories: {
        default: { appenders: ['out', 'default'], level: 'all' },
        task: { appenders: ['task'], level: 'info' },
        result: { appenders: ['out','result'], level: 'info' },
        error: { appenders: ['out','error'], level: 'error' },
        rate: { appenders: ['rate'], level: 'info' },
    }
});
const logger = log4js.getLogger('default');
console.log = logger.info.bind(logger);
const loggerError = log4js.getLogger('error')
console.error = logger.error.bind(loggerError);
app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url'}));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '4.16.2')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
require('./model')
app.use('/', route)
app.listen(80, function () {
    console.log('server runing ')
})