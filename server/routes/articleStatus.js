/**
 * Created by Administrator on 2017/3/6.
 */

var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Article = require('../model/article');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;



/*
 *
 * 修改审核状态
 * */
router.get('/',ensureAuthorized,function(req,res,next){
    User.findOne({token:req.token},function(err,doc){

        if(doc.type=='admin'){
            if(req.query.id&&req.query.status){
                Article.findByIdAndUpdate(req.query.id,{$set:{status:req.query.status}}).exec(function(err,reslut){
                    console.log(reslut)
                    res.json({
                        status: 200,
                        msg:'修改成功',
                        data:{}
                    });

                })
            }
        }else{
            res.json({
                status: 201,
                msg:'没有权限'
            });
        }

    })

})


module.exports = router;