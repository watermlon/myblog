const mongoose = require('mongoose')
mongoose.connect('mongodb://101.200.63.181:27017',{
    user:'admin',
    pass:'password'
})
const db = mongoose.connection;
db.on('error',function(){
    console.log('链接失败')
})
db.once('open', function() {
   console.log('链接成功')
});