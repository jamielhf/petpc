/**
 * Created by linhaifeng on 2016/10/28.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        login
    },
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
});


export default store