/**
 * Created by linhaifeng on 2016/12/20.
 */
module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            res.json('error', '未登录');
        }else{
            next();
        }

    },
    ensureAuthorized:function (req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
    
        if (!(bearerToken == 'undefined')) {
            req.token = bearerToken;
            console.log(req.token)
            next();
        } else {
            res.json({
                status: false,
                data: {}
            });
        }
    }


};