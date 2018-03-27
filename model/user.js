const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    username: String,
    password: String,
    introduction: String,
    avatar: String,
    createtime: String
})
let userModel = mongoose.model('user', userSchema,'user')

module.exports = userModel