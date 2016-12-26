var express = require('express');
var router = express.Router();
var User = require('../model/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;


// POST /signin 用户登录
router.post('/', function(req, res, next) {
    User.find(req.body,function (err,doc) {

        if(doc.length>0){
            res.json({
                status:200,
                msg:'登录成功',
                data:{
                    username:doc[0].username,
                    email:req.body.email
                }

            })
        }else{
            res.json({
                status:301,
                msg:'用户名或密码错误',
                data:{}
            })
        }
    })
});

module.exports = router;