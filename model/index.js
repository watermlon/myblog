const mongoose = require('mongoose')
mongoose.connect('mongodb://101.200.63.181:27017',{
    user:'root',
    pass:'zhangcan1213',
    dbName :'blog'
})
const db = mongoose.connection;
db.on('error',function(){
    console.log('链接失败')
})
db.once('open', function() {
   console.log('链接成功')
});
let user = require('./user.js')
module.exports = {
    user
}

