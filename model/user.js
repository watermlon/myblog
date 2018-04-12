const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    username: String,//用户名
    password: String,//密码
    introduction: String,//简介
    avatar: String,//头像
    createtime: String//创建时间
})
let userModel = mongoose.model('user', userSchema,'user')

module.exports = userModel