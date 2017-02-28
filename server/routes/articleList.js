var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Article = require('../model/article');
var Comments = require('../model/comments');
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



        if(req.query.id){
                Article.findOne({_id:req.query.id}).exec(function (err, doc) {


                    Article.findByIdAndUpdate(req.query.id,{$set:{read:doc.read+1}}).exec(function(err,doc1) {

                            if(!err){
                                Comments.find({_aid:req.query.id}).exec(function(err,comments){

                                  if(comments.length>0){

                                      doc1.comments = comments[0];

                                  }else{
                                      doc1.comments ={
                                          _aid:req.query.id,
                                          comments:[]
                                      };
                                  }
                                    console.log(123);
                                    res.json({
                                        status:200,
                                        msg:"文章列表",
                                        data:doc1
                                    })

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

        /*
         * 用户收藏的文章
         *
         * */


        if(req.query.type&&req.query.uid){


            if(req.query.type=='myStar'){
                Star.find({_uid:req.query.uid}).limit(20).exec(function (err, doc) {

                    if(!err){
                        if(doc[0]){
                            Article.find({_id:{$in:doc[0]._aid}}).sort({time:-1}).exec(function (err, r) {
                                if(!err){
                                    var i=0,l=r.length;
                                    for(;i<l;i++){
                                        r[i].isStar = true
                                    }
                                    res.json({
                                        status:200,
                                        msg:"文章列表",
                                        data:r
                                    })
                                }else{
                                    res.json({
                                        status:404,
                                        msg:"请求失败",
                                        data:''
                                    })
                                }

                            })
                        }else{
                            res.json({
                                status:200,
                                msg:"文章列表",
                                data:[]
                            })
                        }

                    }

                })

            }else{
                var s , q = {};
                switch(req.query.type){
                    case 'time' :s = {time:-1};break;
                    case 'star' :s = {star:-1};break;
                    case 'noPass' :q = {status:2};break;
                    case 'reviewed' :q = {status:0};break;
                    case 'pass' :q = {status:1};break;
                    case 'all' :s = {time:-1};break;
                    case 'comments' :s = {commentsNum:-1};break;
                    case 'my' :s = {star:-1};q = {uid:req.query.uid};break;
                    default :s = {time:-1};
                }
                Article.find(q).sort(s).limit(20).exec(function (err, doc) {
                    /*
                     *
                     * 查询哪些文章收藏过
                     * */
                    Star.find({_uid:req.query.uid},function (err,star) {

                        if(!err){
                            console.log(star.length>0);
                            if(star.length>0){
                                var i =0,l = doc.length;
                                for(;i<l;i++){
                                    if(star[0]._aid.indexOf(doc[i]._id)>=0){
                                        doc[i].isStar = true;

                                    }
                                }

                            }

                            res.json({
                                status:200,
                                msg:"文章列表",
                                data:doc
                            })

                        }
                    });

                });
                return false
            }



        }





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
                                data.commentsNum = 0;
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