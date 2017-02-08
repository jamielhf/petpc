var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Article = require('../model/article');
var Star = require('../model/star');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;


/*
 *
 * 获取文章的列表
 * @param id 用户id
 * @param status 用户文章类型
 * @param type 文章类型
 * @param star 收藏的文章
 *
 *
 * */


router.get('/',function (req, res, next) {

        var q = {};
        if(req.query.uid){
                q.uid = req.query.uid;
        }

        if(req.query.id){
                Article.findOne({_id:req.query.id}).exec(function (err, doc) {
                    Article.findByIdAndUpdate(req.query.id,{$set:{read:doc.read+1}}).exec(function(err,doc1) {

                            if(!err){

                                    res.json({
                                            status:200,
                                            msg:"文章列表",
                                            data:doc1
                                    })
                            }else{
                                    res.json({
                                            status:404,
                                            msg:"未知错误",
                                            data:''
                                    })
                            }

                    })

                });
            return
        }

        if(req.query.status){
                q.status = req.query.status;
        }
        if(req.query.type){
                var s ;
                switch(req.query.type){
                        case 'time' :s = {time:-1};break;
                        case 'star' :s = {star:-1};break;
                }
                Article.find({}).sort({s:-1}).exec(function (err, doc) {
                        res.json({
                                status:200,
                                msg:"文章列表",
                                data:doc
                        })
                });
                return false
        }

    /*
    * 用户收藏的文章
    *
    * */
       if(req.query.star){
           Star.find({_uid:q.uid}).limit(10).exec(function (err, doc) {



               if(!err){
                   Article.find({_id:{$in:doc[0]._aid}}).exec(function (err, r) {
                       if(!err){
                           res.json({
                               status:200,
                               msg:"文章列表",
                               data:r
                           })
                       }else{
                           res.json({
                               status:404,
                               msg:"请求是吧",
                               data:''
                           })
                       }

                   })
               }

           })
           return
       }

        /*
        * 用户自己的文章
        *
        * */
        Article.find({uid:q.uid}).sort({time:-1}).limit(10).exec(function (err, doc) {
                if(!err){
                        /*
                        *
                        * 查询哪些文章收藏过
                        * */
                        Star.find({_uid:q.uid},function (err,star) {

                                if(!err){
                                        var i =0,l = doc.length;
                                       for(;i<l;i++){
                                               if(star[0]._aid.indexOf(doc[i]._id)>=0){
                                                       doc[i].isStar = true;

                                               }
                                       }
                                        res.json({
                                            status:200,
                                            msg:"文章列表",
                                            data:doc
                                        })
                                    return



                                }
                        });

                }

        });


})


/*
 * 保存文章
 *
 * */
router.post('/',ensureAuthorized,function (req, res, next) {
        User.findOne({token:req.token},function (err, doc) {
                if(!err){
                        console.log(req.body);
                        if(doc&&req.body){
                                var data = {};

                                data = req.body;

                                data.uid =  doc._id,
                                data.uHead = doc.head,
                                data.username = doc.username,
                                data.time = (new Date()).getTime(),
                                data.tag = [];
                                data.tag.push(req.body.pet[0].type);
                                data.tag.push(req.body.address.split('|')[0]);
                                data.comments = [];
                                data.star = 0;
                                data.status = 0;
                                data.read = 0;
                                data.isDone = false;
                                data.isStar = false;
                                var article = new Article(data)
                                article.save(function (err, doc) {
                                        console.log(doc);
                                        if(!err){

                                                res.json({
                                                        status:200,
                                                        msg:"保存成功",
                                                        data:{}
                                                })
                                        }else{
                                            console.log(err);
                                                res.json({
                                                        status: 401,
                                                        msg:'保存失败',
                                                        data: {}
                                                });
                                        }
                                })

                        }else{
                                res.json({
                                        status: 402,
                                        msg:'保存失败',
                                        data: {}
                                });
                        }
                }else{

                        res.json({
                                status: 404,
                                msg:err,
                                data: {}
                        });

                }
        })

})




module.exports = router;