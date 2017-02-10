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


router.get(function (req, res, next) {

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
router.post(ensureAuthorized,function (req, res, next) {

    if(req.body._uid&&req.body.name&&req.body._aid&&req.body.content){
        var _uid = req.body._uid;
        var name = req.body.name;
        var _aid = req.body._aid;
        var content = req.body.content;
        /*
         * 判断是否是回复信息
         * */
        if(req.body._cid){

            Comments.find({_aid:_aid},function (err,doc) {
                if(!err){
                    console.log(doc);
                    var _cid = parseInt((new Date()).getTime()/1000);
                    //已有评论记录
                    if(doc.length>0){
                        doc[0].comments.push({
                            _cid:_cid,
                            _uid:_uid,
                            name:name,
                            content:content,
                            time:(new Date()).getTime(),
                        })
                        doc.update({_aid:_aid},{$set:{comments:doc[0].comments}},function (err, r) {
                            if(!err){
                                res.json({
                                    status:200,
                                    msg:'评论成功',
                                    data:''
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
                            time:(new Date()).getTime(),
                        });

                        var commentsModel  = new Comments({
                            _aid:_aid,
                            comments:comments,
                            replyContent:[]
                        });
                        commentsModel.save(function (err, doc) {
                            res.json({
                                status:200,
                                msg:'评论成功',
                                data:''
                            })
                        });
                    }
                }
            })



        }else{

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