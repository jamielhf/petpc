var express = require('express');
var router = express.Router();
var Star = require('../model/star');
var Article = require('../model/article');
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;

router.get('/',ensureAuthorized,function (req,res,next) {
    
})


module.exports = router;