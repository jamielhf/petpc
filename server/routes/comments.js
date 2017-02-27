/**
 * Created by linhaifeng on 2017/2/10.
 */
var express = require('express');
var router = express.Router();
var Comments = require('../model/comments');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;



/*
 *
 * 获取评论
 * */


router.get('/',function (req, res, next) {
    res.json({
        status:401,
        msg:'参数错误',
        data:[1]
    })
})
/*
 *
 * 提交评论
 *
 * */
// var _Comments = new Schema({
//     _aid:String, //文章id
//     comments:[
//         {
//             _cid:String, //评论id
//             _uid:String, //用户id
//             name:String, //用户昵称
//             content:String, //评论内容
//             time:Date,  //日期
//             replyContent:[
//                 {
//                     _uid:String, //评论者id
//                     username:String, //用户昵称
//                     _rid:String, //回复的人的id
//                     rname:String, //回复的人的昵称
//                     content:String, //评论内容
//                     time:Date  //日期
//                 }
//             ]
//         }
//     ]
// });
router.post('/',ensureAuthorized,function (req, res, next) {
    console.log(123);
    if(req.body._uid&&req.body.name&&req.body._aid&&req.body.content){
        var _uid = req.body._uid;
        var name = req.body.name;
        var _aid = req.body._aid;
        var content = req.body.content;
        /*
         * 判断是用户评论还是文章评论
         * */
        //对用户评论
        if(req.body._cid){
            Comments.find({_aid:_aid},function (err,doc) {
                   if(!err){
                       //_uid:String, //评论者id
                       //    username:String, //用户昵称
                       //    _rid:String, //回复的人的id
                       //    rname:String, //回复的人的昵称
                       //    content:String, //评论内容
                       //    time:Date  //日期
                       var i=0,l= doc[0].comments.length;
                       var replyContent = {
                           _uid:_uid,
                           username:name,
                           _rid:req.body._rid,
                           rname:req.body.rname,
                           content:content,
                           time:(new Date()).getTime(),
                       };
                      for(;i<l;i++){
                          if(doc[0].comments[i]._cid ==req.body._cid){
                              doc[0].comments[i].replyContent.unshift(replyContent)
                          }
                      }
                       Comments.update({_aid:_aid},{$set:{comments:doc[0].comments}},function (err, r) {
                           if(!err){
                               res.json({
                                   status:200,
                                   msg:'评论成功',
                                   data:doc[0]
                               })
                           }
                       })

                   }
            })
        }else{
            //对文章评论
            Comments.find({_aid:_aid},function (err,doc) {
                if(!err){
                    console.log(doc);
                    var _cid = parseInt((new Date()).getTime()/1000);
                    //已有评论记录
                    if(doc.length>0){
                        doc[0].comments.unshift({
                            _cid:_cid,
                            _uid:_uid,
                            name:name,
                            content:content,
                            head:req.body.head,
                            time:(new Date()).getTime(),
                        })
                        Comments.update({_aid:_aid},{$set:{comments:doc[0].comments}},function (err, r) {
                            if(!err){
                                res.json({
                                    status:200,
                                    msg:'评论成功',
                                    data:doc[0]
                                })
                            }
                        })
                    }else{
                        //没有评论记录
                        var  comments = [];
                        comments.push({
                            _cid:_cid,
                            _uid:_uid,
                            name:name,
                            content:content,
                            head:req.body.head,
                            time:(new Date()).getTime(),
                            replyContent:[]
                        });

                        var commentsModel  = new Comments({
                            _aid:_aid,
                            comments:comments,
                        });
                        commentsModel.save(function (err, doc) {
                            res.json({
                                status:200,
                                msg:'评论成功',
                                data:doc
                            })
                        });
                    }
                }
            })

        }


    }else{
        res.json({
            status:401,
            msg:'参数错误',
            data:''
        })
    }




})

module.exports = router;