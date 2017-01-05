import Vue from 'vue'
import store from './store/store'
import router from './router/router';
import VueQuillEditor from 'vue-quill-editor'




// use
Vue.use(VueQuillEditor)
require('./css/base/base.scss');



let data = {
  router,
  store
}

const app = new Vue(data).$mount('#app');