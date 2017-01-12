


module.exports = function (app) {

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/user', require('./user'));
  app.use('/user/head', require('./upload'));
  app.use('/articleList', require('./articleList'));
  app.use('/articleList/photo', require('./articlePhoto'));
};