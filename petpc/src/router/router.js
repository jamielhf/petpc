/**
 * Created by linhaifeng on 2016/10/28.
 */
import Vue from 'vue';
import VueRouter from 'vueRouter';
import App from '../App.vue'
import Index from '../page/index.vue'
import Signup from '../page/signup.vue'
import Signin from '../page/signin.vue'

Vue.use(VueRouter);

const checkLogin = (to, from, next) => {
    let token = localStorage.getItem('token');
    console.log(!token)
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
        ]
    },

    {
        path: '/signup',
        component: Signup,
        beforeEnter: checkLogin
    },
    {
        path: '/signin',
        component: Signin,
        beforeEnter: checkLogin
    },
    {path:'*',redirect: '/index'},

];



const router = new VueRouter({
    mode:'history', //这样url就没有/#/XXX,而是常见的url形式
    routes:routes, // short for routes: routes
    linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
    history:true
});



// router.beforeEach(function (transition) {
//     if (!localStorage.getItem('token')) {
//         next({
//             path: '/login',
//             query: { redirect: to.fullPath }
//         })
//     } else {
//         next()
//     }
// })


export  default router