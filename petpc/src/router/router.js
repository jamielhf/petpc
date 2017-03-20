/**
 * Created by linhaifeng on 2016/10/28.
 */
import Vue from 'vue';
import VueRouter from 'vueRouter';
import App from '../App.vue'


import Index from '../page/index.vue';
const User = resolve => require(['../page/user.vue'], resolve);
const Signup = resolve => require(['../page/signup.vue'], resolve);
const Signin = resolve => require(['../page/signin.vue'], resolve);
const Write = resolve => require(['../page/write.vue'], resolve);
const Article = resolve => require(['../page/article.vue'], resolve);
const Content = resolve => require(['../page/content.vue'], resolve);
const MyStar = resolve => require(['../page/myStar.vue'], resolve);
const Admin = resolve => require(['../page/admin.vue'], resolve);
const Message = resolve => require(['../page/message.vue'], resolve);


Vue.use(VueRouter);

const isLogin = (to, from, next) => {
    let token = localStorage.getItem('token');
    if (token) {
        next({
            path: '/index'
        })
    } else {
        next()
    }
}

const notLogin = (to, from, next) => {
    let token = localStorage.getItem('token');
    if (!token) {
        next({
            path: '/index'
        })
    } else {
        next()
    }
}

const routes = [
    { path: '/',redirect: '/index', component: App,
        children: [
            {path: 'index', component: Index},
            {
                path: 'user/setting',
                component: User,
                beforeEnter: notLogin,
            },
            {
                path: 'user/article',
                component: Article,
                beforeEnter: notLogin,
            },
            {
                path: 'user/message',
                component: Message,
                beforeEnter: notLogin,
            },
            {
                path: 'user/star',
                component: MyStar,
                beforeEnter: notLogin,
            },
            {
                path: '/write',
                component: Write,
                beforeEnter: notLogin
            },
            {
                path: '/admin',
                component: Admin,
                beforeEnter: notLogin
            },
            {
                path:'/article/content',
                component:Content
            },
        ]
    },

    {
        path: '/signup',
        component: Signup,
        beforeEnter: isLogin
    },
    {
        path: '/signin',
        component: Signin,
        beforeEnter: isLogin
    },


    // {path:'*',redirect: '/index'},

];



const router = new VueRouter({
    mode:'history', //这样url就没有/#/XXX,而是常见的url形式
    routes:routes, // short for routes: routes
    linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
    history:true
});





export  default router