# 功能与路由设计


注册  
注册页：GET /signup  
注册（包含上传头像）：POST /signup  
登录  
登录页：GET /signin  
登录：POST /signin  
登出：GET /signout  
查看文章  
主页：GET /posts  
个人主页：GET /posts?author=xxx  
查看一篇文章（包含留言）：GET /posts/:postId  
发表文章  
发表文章页：GET /posts/create  
发表文章：POST /posts  
修改文章  
修改文章页：GET /posts/:postId/edit  
修改文章：POST /posts/:postId/edit  
删除文章：GET /posts/:postId/remove  
留言  
创建留言：POST /posts/:postId/comment  
删除留言：GET /posts/:postId/comment/:commentId/remove  
