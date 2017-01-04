/**
 * Created by linhaifeng on 2017/1/4.
 */
var multer  = require('multer');
var t =  new Date();
var m = t.getMonth()+1>=10?t.getMonth()+1:(0+(t.getMonth()+1).toString());
var d = t.getDate()+1>=10?t.getDate()+1:(0+t.getDate().toString());
var dir = t.getFullYear().toString()+m+d

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'+dir+'/')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({ storage: storage})

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;