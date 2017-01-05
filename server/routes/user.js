var express = require('express');
var router = express.Router();
var User = require('../model/user');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;


/*
 * 修改密码或用户名
 *
 * */
router.post('/',ensureAuthorized,function (req, res, next) {
        var params =  req.body;
        // console.log(params);
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
                                    User.findOne({token: req.token},function (err, doc1) {
                                        doc1.password = '';
                                        res.json({
                                            status: 200,
                                            msg:'修改成功',
                                            data:doc1
                                        });
                                    })

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
            User.findOne({token: req.token,password:password},function (err,doc) {
                if (!err) {
                    if(doc){
                        User.update({token: req.token,password:password},{$set:{password:nPassword}}, function(err, doc1) {

                            if (!err) {
                                console.log(doc1)
                                if(doc1.n>0){
                                    doc.password = '';
                                    res.json({
                                        status: 200,
                                        msg:'修改成功',
                                        data: doc
                                    });
                                }else{

                                }


                            }
                        });
                    }else{
                        res.json({
                            status: 401,
                            msg:'密码错误',
                            data: {}
                        });
                    }


                }
            })

        }else{

        }




})

module.exports = router;