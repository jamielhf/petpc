var express = require('express');
var router = express.Router();
var User = require('../model/user');
var checkLogin = require('../middlewares/check').checkLogin;


// POST /signin 用户登录
router.post('/', function(req, res, next) {
    User.find(req.body,function (err,doc) {

        if(doc.length>0){

            req.session.user = doc[0];
            console.log(req.session.user)
            res.json({
                status:200,
                msg:'登录成功',
                data:doc[0]

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

router.get('/',function (req, res, next) {
    console.log(req.session.user)
    if(req.session.user){
        res.json({
            msg:'已登录',
            status:true,
            data:{
                username:req.sesssion.user.username,
                email:req.sesssion.user.email
            }
        });
    }else{
        res.json({
            msg:'未登录',
            status:false,
            data:{}
        });
    }
})

module.exports = router;