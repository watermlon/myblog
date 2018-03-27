const express = require('express')
const app = new express();
const route = require('./router')
require('./model')
 app.use('/',route)
 app.listen(80,function(){
     console.log('server runing ')
 })