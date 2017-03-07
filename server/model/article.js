var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _Article = new Schema({
    content:String,     //内容
    title:String,      //标题
    uid :String,      //发布用户id
    uHead :String,      //发布用户头像
    username :String,   //发布用户昵称
    tag:[],      //标签
    time:Date,      //日期
    address:String, //地区
    imgArr:[],
    comments:{}, //评论
    commentsNum:Number, //评论
    pet:{},
    read:Number,
    star:Number,    //收藏人数
    status:String, //文章审核状态 0 审核中 1 审核通过 2审核不通过
    isDone:Boolean,  //文章类型，是否领养成功
    isStar:Boolean
});
// export them


module.exports = mongoose.model('Article', _Article);


