var express = require('express');
var router = express.Router();

var User = require('../model/user');



// GET /signup 注册页
router.get('/', function(req, res, next) {
   res.send(123)
});

// POST /signup 用户注册
router.post('/', function(req, res, next) {
    var user = new User(req.body);

    User.find({username:req.body.username},function (err, doc) {
        if(!err){


            if(doc.length>0){
                res.json({
                    status:301,
                    msg:"已存在用户名",
                    data:{}
                })
            }else{
                User.find({email:req.body.email},function (err, doc) {
                    if(!err){
                        if(doc.length>0){
                            res.json({
                                status:302,
                                msg:"已存在邮箱",
                                data:{}
                            })
                        }else{
                            user.save(function (err) {
                                if(!err){

                                    req.session.user = doc[0];
                                    console.log(req.session.user)
                                    res.json({
                                        status:200,
                                        msg:"注册成功",
                                        data:{
                                            username:req.body.username,
                                            email:req.body.email
                                        }
                                    })
                                }

                            });
                        }
                    }
                });
            }
        }
    });





});

module.exports = router;