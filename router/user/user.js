const Mod = require('../../model')
const userMod = Mod.user
const tokenMod = Mod.token
const JWT = require('jsonwebtoken')
const config = require('../../config')
const logger = require('../../log')
const randomStr = require('../../unitl').randomWord
let login = function (req, res) {
    try {
        userMod.find({ role: 'admin', username: req.body.username }, function (err, fluffy) {
            if (err) {
                throw Error(err)
            } else {
                if (fluffy.length > 0) {
                    let userinfo = fluffy[0]
                    if (req.body.username == userinfo.username && req.body.password == userinfo.password) {
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
                            date:new Date()
                        })
                        res.cookie('token', token.toString(), { path: '/', httpOnly: true })
                        res.send({
                            msg: 'success',
                            code: 200
                        })
                    } else {
                        res.send({
                            msg: '没有该用户'
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
let logout = function (req, res) {
    try {
        let token = req.cookies.token
        res.clearCookie('token', { path: '/', httpOnly: true })
        tokenMod.remove({token}, function (err) {
            if(err){
                logger.error(err)
            }else{
                res.send({
                    code:200,
                    msg:'退出成功'
                })
            }
        })
    } catch (error) {
        logger.error(error)
        res.status(500).send({
            code:500,
            msg:'服务器错误'
        })
    }
}
module.exports = {
    login,
    logout
}