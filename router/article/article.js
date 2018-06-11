const mod = require('../../model').article
const logger = require('../../log')
//文章管理
//发表文章
let publish = function (req, res) {
    let addParams = {}
    try {
        let content = req.body.content.toString()
        let title = req.body.title.toString()
        let desc = req.body.desc.toString()
        let createTime = new Date().getTime()
        let category = req.body.category.toString()
        addParams = { content, title, desc, createTime, category }
    } catch (error) {
        logger.error(error)
        res.status(400).send({
            code: 400,
            msg: '保存失败，参数错误' 
        })
    }
    mod.create(addParams, function (err) {
        if (err) {
            res.status(500).send({
                code: 500,
                msg: '保存失败，服务器错误'
            })
        } else {
            res.send({
                code: 201,
                msg: '保存成功'
            })
        }
    })
}
module.exports = {
    publish
}
