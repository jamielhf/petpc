var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _Comments = new Schema({
    _aid:String, //文章id
    comments:[
        {
            _cid:String, //评论id
            _uid:String, //用户id
            name:String, //用户昵称
            content:String, //评论内容
            head:String,
            time:Date,  //日期
            replyContent:[
                {
                    _uid:String, //评论者id
                    username:String, //用户昵称
                    _rid:String, //回复的人的id
                    rname:String, //回复的人的昵称
                    content:String, //评论内容
                    time:Date  //日期
                }
            ]
        }
    ]
});
// export them


module.exports = mongoose.model('Comments', _Comments);


