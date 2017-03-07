


module.exports = function (app) {

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/user', require('./user'));
  app.use('/user/head', require('./upload'));
  app.use('/articleList', require('./articleList'));
  app.use('/articleList/photo', require('./articlePhoto'));
  app.use('/articleList/star', require('./star'));
  app.use('/articleList/comments', require('./comments'));
  app.use('/articleList/test', require('./test'));
  app.use('/articleList/status', require('./articleStatus'));

};