var express = require('express');
var router = express.Router();
var User = require('../model/user');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;

// GET /signup 注册页
router.get('/', function(req, res, next) {

    res.json({'name':'123'})
});
router.post('/',ensureAuthorized,function (req, res, next) {
        var params =  req.body;
        if(!params){
            res.json({
                status: 401,
                msg:'参数错误',
                data: {}
            });
        }
        var username = params.username;
        var password = params.password;
        var nPassword = params.nPassword;
        var q;

        if(username){
            User.find({username:username},function (err,doc) {
                if(!err){
                    if(doc.length>0){
                        res.json({
                            status: 402,
                            msg:'用户名已存在',
                            data: {}
                        });
                    }else{
                        User.update({token: req.token},{$set:{username:username}},function(err,user){
                            if (!err) {
                                if(user.ok){
                                    res.json({
                                        status: 200,
                                        msg:'修改成功',
                                        data: {}
                                    });
                                }else{
                                    res.json({
                                        status: 403,
                                        msg:'修改失败',
                                        data: {}
                                    });
                                }
                            }
                        });
                    }

                }else{

                }
            })

        }else if(password){
            User.findOne({token: req.token,password:password}, function(err, user) {

                if (!err) {
                    if(user){

                    }else{
                        res.json({
                            status: 402,
                            msg:'无效用户',
                            data: {}
                        });
                    }


                }
            });
        }




})

module.exports = router;