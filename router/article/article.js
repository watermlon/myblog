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
        let updataTime = new Date().getTime()
        let category = req.body.category.toString()
        let isDelete = false
        addParams = { content, title, desc, createTime, category, updataTime, isDelete }
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
//文章列表
let getList = function (req, res) {
    let pageSize = parseInt(req.query.pageSize || '');
    let pageNo = parseInt(req.query.pageNo || 1);
    console.log(req)
    console.log(pageNo)
    console.log(pageSize)
    if (isNaN(pageSize)) {
        pageSize = 0
    }
    if (isNaN(pageNo)) {
        pageNo = 0
    }
    mod.find({ isDelete: false }, null, { skip: ((pageNo - 1) * pageSize), limit: (pageSize) }, function (err, val) {
        if (err) {
            logger.error(err)
            res.status(500).send({
                code: 500,
                msg: '服务器错误'
            })
        } else {
            console.log(val)
            res.send(val)
        }
    })
}
//修改文章
let edit = function (req, res) {
    console.log(req)
    let objId = req.body.id
    let content = req.body.content.toString()
    let title = req.body.title.toString()
    let desc = req.body.desc.toString()
    let updataTime = new Date().getTime()
    let category = req.body.category.toString()
    addParams = { content, title, desc, updataTime, category }
    let objid = mod.getObjId(objId)
    mod.update({ "_id": objid }, addParams, function (err) {
        if (err) {
            logger.error(err)
            res.status(500).send({
                code: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                code: 200,
                msg: '修改成功'
            })
        }
    })
}
//删除文章
let remove = function (req, res) {
    let objId = mod.getObjId(req.body.id)
    mod.update({ "_id": objId }, { "isDelete": true }, function (err) {
        if (err) {
            logger.error(err)
            res.status(500).send({
                code: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                code: 200,
                msg: '删除成功'
            })
        }
    })
}
//根据ID查文章
let queryArticle = function (req, res) {
    let objId = mod.getObjId(req.body.id)
    mod.find({ "_id": objId }, function (err, val) {
        if (err) {
            logger.error(err)
            res.status(500).send({
                code: 500,
                msg: '服务器错误'
            })
        } else {
            if(val.length==1){
                res.send(val[0])
            }else{
                res.send({})
            }
            console.log(val)
           
        }
    })
}
module.exports = {
    publish,
    getList,
    edit,
    remove,
    queryArticle
}
