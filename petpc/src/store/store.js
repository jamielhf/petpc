/**
 * Created by linhaifeng on 2016/10/28.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login'
import comm from './modules/comm'
import article from './modules/article'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        login,
        comm,
        article,
    },
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
});


export default store