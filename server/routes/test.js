/**
 * Created by linhaifeng on 2017/2/10.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
   console.log(13333)
})


module.exports = router;