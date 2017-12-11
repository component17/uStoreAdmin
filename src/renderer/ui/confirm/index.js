import Modal from './index.vue';
import Vue from 'vue';

let component;

let create = () => {
	component = Vue.extend(Modal);
	let g = guid();
	let el = document.createElement('div');
	el.id = 'ui__modal__'+g;
	document.querySelector('body').append(el);
	return new component().$mount('#ui__modal__'+g);
};
let e = create();


function guid() {
	function _p8(s) {
		var p = (Math.random().toString(16)+"000000000").substr(2,8);
		return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	}
	return _p8() + _p8(true) + _p8(true) + _p8();
}

export default (options) => {
	let promise = e.display(options);
	return new Promise((resolve, reject) => {
		promise.then((data) => {
			//console.log('Data', data);
			//console.log('Component: ', e);
			//e.$destroy();
			resolve(data);
		}).catch((err) => {
			//e.$destroy();
			
			reject();
		});
	});
};