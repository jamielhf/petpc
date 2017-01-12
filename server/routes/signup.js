var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require('../model/user');



// GET /signup 注册页
router.get('/', function(req, res, next) {

   res.send(123)
});

// POST /signup 用户注册
router.post('/', function(req, res, next) {

    User.find({username:req.body.username},function (err, doc) {
        if(!err){

            if(doc.length>0){
                res.json({
                    status:301,
                    msg:"已存在用户名",
                    data:{}
                })
            }else{
               next();
            }
        }
    });


},function (req,res,next) {

    User.find({email:req.body.email},function (err, doc) {
        if(!err){
            if(doc.length>0){
                res.json({
                    status:302,
                    msg:"已存在邮箱",
                    data:{}
                })
            }else{

            var userModel = new User(req.body);
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, 'pet');
                    user.head = 'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg';
                    user.save(function(err, user1) {
                        if(!err){
                            user1.password = ''
                            res.json({
                                status:200,
                                msg:"注册成功",
                                data:user1
                            })
                        }
                    });
                })

            }
        }
    });
});

module.exports = router;