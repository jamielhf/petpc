var express = require('express');
var router = express.Router();
var User = require('../model/user');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;


// POST /signin 用户登录
router.post('/', function(req, res, next) {



    User.find(req.body,function (err,doc) {

        if(doc.length>0){


            res.json({
                status:200,
                msg:'登录成功',
                data:{
                    username:doc[0].username,
                    email:doc[0].email,
                    token:doc[0].token,
                }


            })
        }else{
            res.json({
                status:301,
                msg:'用户名或密码错误',
                data:{},

            })
        }
    })
});

router.get('/',ensureAuthorized,function (req, res, next) {

        User.findOne({token: req.token}, function(err, user) {
        
            if (!err) {
                if(user){
                    res.json({
                        status: true,
                        data: {
                            email:user.email,
                            token:user.token,
                            username:user.username
                        }
                    });
                }else{
                    res.json({
                        status: false,
                        data: {}
                    });
                }


            }
        });

})

module.exports = router;