var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _ArticleList = new Schema({
    title:String,
    uid :String,
    tag:String,
    time:Date,
    star:Number,
    status:String,
    types:String
});
// export them


module.exports = mongoose.model('ArticleList', _ArticleList);


