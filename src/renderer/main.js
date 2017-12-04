import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

Vue.component('section-title', require('./components/pageparts/section-title.vue').default);
Vue.component('section-content', require('./components/pageparts/section-content').default);


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
window.APP = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
