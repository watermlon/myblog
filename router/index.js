const express = require('express')
const route = express.Router()
const userList = require('./user/userList.js')
const user = require('./user/user.js')

route.get('/',function(req,res){
    res.send('hello world')
})
route.get('/user',userList.get)
route.post('/user',userList.post)
route.post('/login',user.login)
route.post('/logout',user.logout)
module.exports = route
