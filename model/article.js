const mongoose = require('mongoose')
let article = mongoose.Schema({
    title:String,
    content:String,
    desc:String,
    createTime:Number,
    category:String,
    tags:Array,
    isDelete:Boolean
})
let articleModel = mongoose.model('article',article,'article')
module.exports = articleModel