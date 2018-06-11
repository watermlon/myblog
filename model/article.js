const mongoose = require('mongoose')
let article = mongoose.Schema({
    title:String,
    content:String,
    desc:String,
    createTime:Number,
    category:String
})
let articleModel = mongoose.model('article',article,'article')
module.exports = articleModel