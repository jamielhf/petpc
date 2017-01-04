var express = require('express');
var router = express.Router();
var User = require('../model/user');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;

var upload = require('../lib/multerUtil');

var url = 'http://localhost:3000/';

router.get('/', function(req, res, next) {

    res.json({'name':'121233'})
});

/*
* 提交图片
*
* */


router.post('/head', function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据, 如果存在的话
   

    res.json({'name':'121233'})
})
// router.post('/head',ensureAuthorized, upload.single('file'), function (req, res, next) {
//     // req.file 是 `avatar` 文件的信息
//     // req.body 将具有文本域数据, 如果存在的话
//     console.log(req.file)
//
//     User.findOne({token: req.token},function (err,doc){
//       if(!err){
//             if(doc){
//                 var imgUrl = (req.file.destination+ req.file.filename).split('/');
//                 console.log(imgUrl)
//
//
//                 User.findByIdAndUpdate({_id:doc._id},{$set:{head:url+imgUrl[1]+'/'+imgUrl[2]}},function (err, user) {
//                     console.log(user);
//                 })
//             }
//       }
//
//     })
//
// })

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