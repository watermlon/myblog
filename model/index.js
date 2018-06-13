const mongoose = require('mongoose')
const config = require('../config')
mongoose.connect('mongodb://'+config.dbUrl,{
    user:config.dbUsername,
    pass:config.dbpassword,
    dbName :config.dbName
})
const db = mongoose.connection;
db.on('error',function(){
    console.log('链接失败')
})
db.once('open', function() {
   console.log('链接成功')
});
const user = require('./user.js')
const token = require('./token')
const article = require('./article')
module.exports = {
    user,
    token,
    article,
    categoryModel
}

