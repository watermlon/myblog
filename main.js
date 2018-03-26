const express = require('express')
const app = new express();
require('./model')
 app.get('/',function(req,res){
    res.send('hello world')
 })
 app.listen(80,function(){
     console.log('server runing port:80')
 })