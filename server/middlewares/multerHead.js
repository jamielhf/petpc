/**
 * Created by linhaifeng on 2017/1/4.
 */
var multer  = require('multer');
var fs = require("fs");

var t =  new Date();
var m = t.getMonth()+1>=10?t.getMonth()+1:(0+(t.getMonth()+1).toString());
var d = t.getDate()+1>=10?t.getDate()+1:(0+t.getDate().toString());
var dir = t.getFullYear().toString()+m+d;

// var images = require("images");
//
// images("./uploads/user/20170110/file-1483931839351.jpg")                     //Load image from file
// //加载图像文件
//     .size(100)                          //Geometric scaling the image to 400 pixels width
//     //等比缩放图像到400像素宽
//     //在(10,10)处绘制Logo
//     .save("./uploads/user/20170110/s-file-1483931839351.jpg", {               //Save the image to a file,whih quality 50
//         quality : 70                    //保存图片到文件,图片质量为50
//     });
//

//创建文件夹
fs.readdir("./uploads/user/"+dir+"/",function(err, files){

    if (err) {
        fs.mkdir("./uploads/user/"+dir+"/",function(err){
            if (err) {
                return console.error(err);
            }
            console.log("目录创建成功。");
        });
    }

});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user/'+dir+'/')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({ storage: storage});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;