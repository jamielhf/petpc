/**
 * Created by linhaifeng on 2017/2/10.
 */
var express = require('express');
var router = express.Router();
var Comments = require('../model/comments');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;



/*
 *
 * 获取评论
 * */


router.get(function (req, res, next) {

})
/*
 *
 * 提交评论
 * */
router.post(ensureAuthorized,function (req, res, next) {

})

module.exports = router;