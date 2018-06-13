const mongoose = require('mongoose')
let article = mongoose.Schema({
    title:String,
    content:String,
    desc:String,
    createTime:Number,
    updataTime:Number,
    category:String,
    tags:Array,
    isDelete:Boolean
})
article.static( 'getObjId', function(str){
    let objid = mongoose.Types.ObjectId(str)
    return objid
} )
let articleModel = mongoose.model('article',article,'article')
module.exports = articleModel