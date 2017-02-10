var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _Comments = new Schema({

});
// export them


module.exports = mongoose.model('Comments', _Comments);


