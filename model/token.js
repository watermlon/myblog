const mongoose = require('mongoose')
let token = mongoose.Schema({
    token:String,
    name:String,
    creatTime:Number,
    updateTime:Number
})
let tokenModel = mongoose.model('token',token,'token')
module.exports = tokenModel