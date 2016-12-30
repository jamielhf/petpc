var express = require('express');
var router = express.Router();
var ensureAuthorized = require('../middlewares/check').ensureAuthorized;


// GET /signout 登出
router.get('/',ensureAuthorized, function(req, res, next) {
      
});

module.exports = router;