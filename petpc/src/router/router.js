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

const routes = [
    { path: '/',redirect: '/index', component: App,
        children: [
            {path: 'index', component: Index},

        ]
    },
    {path: '/signup', component: Signup},
    {path: '/signin', component: Signin}
];




const router = new VueRouter({
    mode:'history', //这样url就没有/#/XXX,而是常见的url形式
    routes:routes, // short for routes: routes
    linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
    history:true
});


export  default router