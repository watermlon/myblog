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
module.exports = {
    get
}