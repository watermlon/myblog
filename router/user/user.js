const userMod = require('../../model').user
const JWT = require('jsonwebtoken')
let login = function(req,res){
    try {
        userMod.find({role:'admin'},function(err, fluffy){
            if(err){
                throw Error(err)
            }else{
                let userinfo = fluffy[0]
                if(req.body.username==userinfo.username&&req.body.password == userinfo.password){
                    // req.session.username = req.body.username
                    var token = JWT.sign({username:req.body.username},'secret',{ expiresIn: 60 * 60 })
                    res.send({
                        msg:'success',
                        token
                    })
                }else{
                    res.send('error')
                }
                console.log(fluffy)
            }
        })
    } catch (error) {
        logger.error(error)
        res.send({
            err:'500'
        })
    }
}
module.exports = {
    login
}