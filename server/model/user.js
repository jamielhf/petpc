var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _User = new Schema({
    email : String,
    name : {type:String,unique:true},
    salt : String,
    password : String,
    avatar:String
});
// export them


module.exports = mongoose.model('User', _User);


