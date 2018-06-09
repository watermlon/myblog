const Mod = require('../../model')
const userMod = Mod.user
const tokenMod = Mod.token
const JWT = require('jsonwebtoken')
const config = require('../../config')
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
                        var token = JWT.sign({ username: req.body.username }, config.tokenSear, { expiresIn: 60 * 30 })
                        let now = new Date().getTime()
                        tokenMod.create({
                            token,
                            name: req.body.username,
                            creatTime: now,
                            updateTime: now
                        })
                        res.cookie('token', token.toString(), { path: '/', httpOnly: true })
                        res.send({
                            msg: 'success',
                            code: 200
                        })
                    } else {
                        res.send({
                            msg:'没有该用户'
                        })
                    }
                    console.log(fluffy)
                }else{
                    res.send({
                        msg:'没有该用户'
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
module.exports = {
    login
}