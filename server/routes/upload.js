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

// router.get('/a',function (req, res, next) {
//     // req.file 是 `avatar` 文件的信息
//     // req.body 将具有文本域数据, 如果存在的话
//     res.json({'name':'121233'})
// })

router.post('/',ensureAuthorized, upload.single('file'), function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据, 如果存在的话
    console.log(req.file)

    User.findOne({token: req.token},function (err,doc){
      if(!err){
            if(doc){
                var imgUrl = (req.file.destination+ req.file.filename).split('/');
                console.log(imgUrl)
                User.findByIdAndUpdate({_id:doc._id},{$set:{head:url+imgUrl[1]}},function (err, user) {
                    res.json({
                        status: 200,
                        msg:'更新头像成功',
                        data: {
                            username:user.username,
                            email:user.email,
                            head:url+imgUrl[1],
                        }
                    });
                })
            }else{
                res.json({
                    status: 401,
                    msg:'上传失败',
                    data: {}
                });
            }
      }else{
          res.json({
              status: 401,
              msg:'上传失败',
              data: {}
          });
      }

    })

})


module.exports = router;