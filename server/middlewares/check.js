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

    }

};