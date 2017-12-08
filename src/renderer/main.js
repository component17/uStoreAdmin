import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import DB from './database'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';
Vue.use(VueToastr, {
	defaultPosition: 'toast-top-right'
})

const firebase = require('firebase');
import socket from 'socket.io-client';
const config = {
	apiKey: "AIzaSyCwwc2vMvkd5RN9M5G87_cdnIUOa0Ab5lY",
	authDomain: "ustore-2d4e9.firebaseapp.com",
	databaseURL: "https://ustore-2d4e9.firebaseio.com",
	projectId: "ustore-2d4e9",
	storageBucket: "ustore-2d4e9.appspot.com",
	messagingSenderId: "1097525562366"
};
firebase.initializeApp(config);
firebase.auth().languageCode = 'ru';



Vue.component('section-title', require('./components/pageparts/section-title.vue').default);
Vue.component('section-content', require('./components/pageparts/section-content').default);
Vue.prototype.$db = DB;
Vue.prototype.$fb = firebase;
Vue.prototype.$auth = firebase.auth();
Vue.prototype.$socket = socket;
firebase.auth().onAuthStateChanged(function(user) {
	Vue.prototype.$auth = user;
	if(!user) {
		router.push('/auth');
	}
});
Vue.prototype.$created = () => {
	return {
		uid: firebase.auth().currentUser.uid,
		date: new Date().toISOString(),
	}
}

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth) && !Vue.prototype.$auth) {
		next({ path: '/auth', query: { redirect: to.fullPath }});
	} else {
		next();
	}
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
	window.APP = new Vue({
		components: { App },
		router,
		store,
		template: '<App/>'
	}).$mount('#app')
})
/* eslint-disable no-new */

