const express = require('express')
const app = new express();
const bodyParser = require('body-parser');
const route = require('./router')
const log4js = require('log4js');
const JWT = require('jsonwebtoken')
const cookiePaser = require('cookie-parser')
const config = require('./config')
const unitl = require('./unitl')
const logger = require('./log')
// const session = require('express-session');
app.use(cookiePaser())

app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url' }));
//跨域设置
app.all('*', function (req, res, next) {
    console.log(req.headers.origin)
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '4.16.2')
    if (req.method == "OPTIONS") {
        res.send(200);
    }/*让options请求快速返回*/
    else next();
});
const tokenMod = require('./model').token
//登陆拦截器，判断有没有权限
app.use(function (req, res, next) {
    if (req.path == '/login' ||req.path =='/article/list'||req.path =='/article/query') {
        next()
    } else {
        tokenMod.find({ token: req.cookies.token }, function (err, val) {
            //捕捉查询错误
            try {
                if (err) {
                    throw new Error(err)
                } else {
                    if (val.length > 0) {
                        // let data = val.sort((a, b) => {
                        //     return b.updateTime - a.updateTime
                        // })
                        //捕捉验证错误
                        try {
                            let sear = val[0].sear
                            let token = JWT.verify(req.cookies.token, sear)
                            let newSear = unitl.randomWord(false,20)
                            if (val[0].name === token.username) {
                                let newToken = JWT.sign({ username: token.username }, newSear, { expiresIn: 60 * 30 })
                                res.cookie('token', newToken.toString(), { path: '/', httpOnly: true })
                                tokenMod.update({ token: req.cookies.token }, { token: newToken, updateTime: new Date().getTime(), sear: newSear,date:new Date() }, function (err) {
                                    try {
                                        if (err) {
                                            throw new Error(err)
                                        } else {
                                            req.cookies.token = newToken
                                            next()
                                        }
                                    } catch (error) {
                                        logger.error(error)
                                        res.status(500).send({
                                            code: 500,
                                            msg: '服务器内部错误'
                                        })
                                    }
                                })
                            }
                        } catch (error) {
                            logger.info('验证错误')
                            logger.error(error)
                            res.status(401).send({
                                code: 401,
                                msg: '用户没有登陆'
                            })
                        }
                    } else {
                        logger.info('数据库为空')
                        res.status(401).send({
                            code: 401,
                            msg: '用户没有登陆'
                        })
                    }
                }
            } catch (error) {
                logger.error(error)
                res.status(500).send({
                    code: 500,
                    msg: '服务器内部错误'
                })
            }
        })


    }
})
//接受post参数设置
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
require('./model')
app.use('/', route)
app.listen(8022, function () {
    console.log('server runing ')
})