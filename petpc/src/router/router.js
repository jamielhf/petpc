/**
 * Created by linhaifeng on 2016/10/28.
 */
import Vue from 'vue';
import VueRouter from 'vueRouter';
import App from '../App.vue'
import Index from '../page/index.vue'
import Signup from '../page/signup.vue'
import Signin from '../page/signin.vue'
import User from '../page/user.vue'
import Write from '../page/write.vue'
import Article from '../page/article.vue'
import Content from '../page/content.vue'
import MyStar from '../page/myStar.vue'

Vue.use(VueRouter);

const isLogin = (to, from, next) => {
    let token = localStorage.getItem('token');

    if (token) {
        console.log(132);
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
        console.log(132);
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