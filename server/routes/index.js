


module.exports = function (app) {

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/user', require('./user'));
  app.use('/user/head', require('./upload'));
  app.use('/article', require('./article'));
  app.use('/test', require('./test'));
  app.use('/article/photo', require('./articlePhoto'));
};