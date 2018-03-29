const userModal = require('../model').user
let get = function(req, res, next){
    userModal.find({},function (err, fluffy) {
        if (err) {
            console.log(err)
        } else {
            console.log('success',fluffy)
        }
    })
}
let post = function(req, res, next){
    console.log(req)
    res.send('hello')
}
module.exports = {
    get,
    post
}