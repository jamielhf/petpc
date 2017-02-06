var express = require('express');
var router = express.Router();
var Star = require('../model/star');
var Article = require('../model/article');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;



/*
*
* @uid 用户id
* @aid 文章id
* @star 是否收藏
* */

router.get('/',ensureAuthorized,function (req,res,next) {

      var  uid = req.query.uid;
      var  aid = req.query.aid;
      var  star = req.query.star;

      Star.find({_uid:uid},function(err,doc){
            if(!err){
                if(doc[0]){

                    if(star){
                       if( doc[0]._aid.indexOf(aid)<0){
                           doc[0]._aid.push(aid);
                       }else{
                           console.log(star)
                           res.json({
                               status:201,
                               msg:"已经收藏",
                               data:''
                           })
                       }

                    }else{
                        var l =  doc[0]._aid.length;
                        var i = 0;
                        for(;i<l;i++){
                            if(doc[0]._aid[i]==aid){
                                doc[0]._aid.splice(i,1);

                            }
                        }
                    }

                    Star.update({_id:doc[0]._id},{$set:{_aid:doc[0]._aid}},function(err,result){
                        if(!err&&result){
                            res.json({
                                status:200,
                                msg:star?"收藏成功":"取消收藏成功",
                                data:''
                            })
                        }else{
                            res.json({
                                status:401,
                                msg:star?"收藏失败":"取消收藏失败",
                                data:''
                            })
                        }

                    })
                }else{
                    var nStar  = new Star({
                        _uid:uid,
                        _aid:[aid]
                    })
                    nStar.save(function(err,doc){
                        if(!err){
                            res.json({
                                status:200,
                                msg:"收藏成功",
                                data:''
                            })
                        }else{
                            res.json({
                                status:401,
                                msg:"收藏失败",
                                data:''
                            })
                        }

                    })
                }
            }
      })

})


module.exports = router;