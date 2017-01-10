var express = require('express');
var router = express.Router();
var User = require('../model/article');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;


/*
 * 保存文章
 *
 * */
router.get('/',ensureAuthorized,function (req, res, next) {
        console.log(req.body)

})




module.exports = router;