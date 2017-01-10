/**
 * Created by linhaifeng on 2017/1/4.
 */
var multer  = require('multer');
var fs = require("fs");

var t =  new Date();
var m = t.getMonth()+1>=10?t.getMonth()+1:(0+(t.getMonth()+1).toString());
var d = t.getDate()+1>=10?t.getDate()+1:(0+t.getDate().toString());
var dir = t.getFullYear().toString()+m+d;
var url = './uploads/article/'+dir+'/';


//

//创建文件夹
fs.readdir(url,function(err, files){

    if (err) {
        fs.mkdir(url,function(err){
            if (err) {
                return console.error(err);
            }
            console.log("目录创建成功。");
        });
    }

});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, url)
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({ storage: storage});


//导出对象
module.exports = upload;