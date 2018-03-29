const express = require('express')
const route = express.Router()
const user = require('./user.js')

route.get('/',function(req,res){
    res.send('hello world')
})
route.get('/user',user.get)
route.post('/user',user.post)
module.exports = route
