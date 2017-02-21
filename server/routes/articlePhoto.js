var express = require('express');
var router = express.Router();
var User = require('../model/user');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;
var fs = require('fs');
var upload = require('../middlewares/multerArticle');

var images = require("images");


var url = 'http://localhost:3001/';
/*
 * 保存文章图片
 *
 * */
router.post('/',ensureAuthorized,upload.single('file'),function (req, res, next) {

    User.findOne({token: req.token},function (err,doc){

        if(!err){
           
            if(doc){
                var imgUrl = (req.file.destination+ req.file.filename).split('/');
                images(req.file.destination+ req.file.filename)
                    .size(200)
                    .save(req.file.destination+'s_'+ req.file.filename, {
                        quality : 100
                    });

                var photoUrl = url+imgUrl[2]+'/'+imgUrl[3]+'/'+imgUrl[4];
                var sPhotoUrl = url+imgUrl[2]+'/'+imgUrl[3]+'/s_'+imgUrl[4];

                    res.json({
                        status: 200,
                        msg:'上传图片成功',
                        data: {
                           photo:photoUrl,
                           sPhoto:sPhotoUrl
                        }
                    });

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