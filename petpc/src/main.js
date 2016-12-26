import Vue from 'vue'
import store from './store/store'
import router from './router/router';

require('./css/base/base.scss');



let data = {
  router,
  store
}

const app = new Vue(data).$mount('#app');