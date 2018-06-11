const Mod = require('../../model')
const userMod = Mod.user
const tokenMod = Mod.token
const JWT = require('jsonwebtoken')
const config = require('../../config')
const logger = require('../../log')
const unitl = require('../../unitl')
const randomStr = unitl.randomWord
let login = function (req, res) {
    try {
        userMod.find({ role: 'admin', username: req.body.username }, function (err, fluffy) {
            if (err) {
                throw Error(err)
            } else {
                if (fluffy.length > 0) {
                    let userinfo = fluffy[0]
                    let salt = userinfo.salt
                    let pass = unitl.encryption(req.body.password,salt).str
                    if (req.body.username == userinfo.username && pass == userinfo.password) {
                        // req.session.username = req.body.username
                        let sear = randomStr(false, 20)
                        console.log(sear)
                        var token = JWT.sign({ username: req.body.username }, sear, { expiresIn: 60 * 30 })
                        let now = new Date().getTime()
                        tokenMod.create({
                            token,
                            name: req.body.username,
                            creatTime: now,
                            updateTime: now,
                            sear,
                            date: new Date()
                        })
                        res.cookie('token', token.toString(), { path: '/', httpOnly: true })
                        res.send({
                            msg: 'success',
                            code: 200
                        })
                    } else {
                        res.send({
                            msg: '密码错误'
                        })
                    }
                    console.log(fluffy)
                } else {
                    res.send({
                        msg: '没有该用户'
                    })
                }
            }
        })
    } catch (error) {
        logger.error(error)
        res.send({
            err: '500'
        })
    }
}
let logoutFunc = function (req, res) {
    let token = req.cookies.token
    res.clearCookie('token', { path: '/', httpOnly: true })
    tokenMod.remove({ token }, function (err) {
        if (err) {
            logger.error(err)
        } else {
            res.send({
                code: 200,
                msg: '退出成功'
            })
        }
    })
}
let logout = function (req, res) {
    try {
        logoutFunc(req, res)
    } catch (error) {
        logger.error(error)
        res.status(500).send({
            code: 500,
            msg: '服务器错误'
        })
    }
}
let editPassword = function (req, res) {
    let token = req.cookies.token
    let data = req.body
    try {
        tokenMod.find({ token }, function (err, val) {
            console.log(val)
            if (err) {
                logger(err)
                res.status(500).send({
                    code: 500,
                    msg: '服务器异常'
                })
            } else {
                let username = val[0].name
                try {
                    userMod.find({ username: username }, function (error, value) {
                        if (error) {
                            logger(error)
                            res.status(500).send({
                                code: 500,
                                msg: '服务器异常'
                            })
                        } else {
                            let oldPass = value[0].password
                            let salt = value[0].salt
                            let dataPass = unitl.encryption(data.oldPass,salt)
                            let newPass = unitl.encryption(data.newPass)
                            if (oldPass === dataPass.str) {
                                try {
                                    userMod.update({ username: username }, { password: newPass.str,salt:newPass.salt }, function (error) {
                                        if (error) {
                                            logger(error)
                                            res.status(500).send({
                                                code: 500,
                                                msg: '服务器异常'
                                            })
                                        } else {
                                            res.send({
                                                code: 200,
                                                msg: '修改成功'
                                            })
                                        }
                                    })
                                } catch (error) {
                                    logger.error(error)
                                    res.status(500).send({
                                        code: 500,
                                        msg: '服务器异常'
                                    })
                                }
                            }else{
                                logger.error('密码错误')
                                res.status(500).send({
                                    code: 400,
                                    msg: '密码错误'
                                }) 
                            }
                        }
                    })
                } catch (error) {
                    logger(error)
                    res.status(500).send({
                        code: 500,
                        msg: '服务器异常'
                    })
                }
            }
        })
    } catch (error) {
        logger(error)
        res.status(500).send({
            code: 500,
            msg: '服务器异常'
        })
    }
}
module.exports = {
    login,
    logout,
    editPassword
}