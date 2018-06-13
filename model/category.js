const mongoose = require('mongoose')
let category = mongoose.Schema({
    name:String
})
let categoryModel = mongoose.model('category',category,'category')
module.exports = categoryModel