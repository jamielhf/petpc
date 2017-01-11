var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Article = require('../model/article');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;


/*
*
* 获取文章的列表
* @param id 用户id
* @param status 用户文章类型
* @param type 文章类型
*
*
* */


router.get('/',function (req, res, next) {
        res.json({
                data:'test'
        })



})




router.post('/',function (req, res, next) {
    res.json({
        data:'test'
    })

})



module.exports = router;