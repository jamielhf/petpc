var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _Article = new Schema({
    content:String,     //内容
    title:String,      //标题
    uid :String,      //用户id
    uHead :String,      //用户id
    username :String,   //用户id
    tag:[],      //标签
    time:Date,      //日期
    address:String, //地区
    imgArr:[],
    comments:[
        {
            content:String,
            time:Date,
            uid:String,
            uHead:String,
            username :String,      //用户id
            rid: String,
            rHead:String,
            rUsername:String,
        }
    ], //评论
    pet:{},
    read:Number,
    star:Number,    //收藏人数
    status:String, //文章审核状态
    isDone:Boolean,  //文章类型，是否领养成功
    isStar:Boolean
});
// export them


module.exports = mongoose.model('Article', _Article);


