var express = require('express');
var router = express.Router();

var User = require('../model/user');

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
    res.render('index');

});

// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;