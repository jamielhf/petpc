var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _Star = new Schema({
    _aid : Array,
    _uid : String,
});
// export them


module.exports = mongoose.model('Star', _Star);


