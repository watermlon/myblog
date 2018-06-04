const userModal = require('../../model').user
let get = function(req, res, next){
    //查询所有数据
    userModal.find({},function (err, fluffy) {
        if (err) {
            console.log(err)
        } else {
            try {
                let sendArr = []
                fluffy.forEach(v=>{
                    sendArr.push({
                        id:v.id,
                        avatar:v.avatar,
                        createtime:v.createtime,
                        introduction:v.introduction,
                        username:v.username
                    })
                })
                res.send(sendArr)
            } catch (error) {
                // console.log(error)
                console.error(error)
            }
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