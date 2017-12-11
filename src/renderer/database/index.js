import Vue from 'vue';
class DB {
	conn = null;
	options = {};
	r = require('rethinkdb');
	http = null;
	builder = [];
	socket = false;
	socket_list = [];
	
	constructor() {
		this.options = require('./options').default;
		
		this.connect();
	}
	
	
	connect() {
		
		this.r.connect(this.options, (err, conn) => {
			this.conn = conn;
			//this.r = this.r.db('uStoreAdmin');
		});
		
	}
	
	test(test) {
		console.log(test);
	}
	
	hello(args) {
	
	}
	
	run(cb) {
		let query = this.builder.join('.');
		this.builder = [];
		
		if(this.socket) {
			this.socket = false;
			return this.send_socket(query, cb);
		}
		return this.send(query);
		
	}
	
	uid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	
	send_socket(query, callback) {
		let firebase = Vue.prototype.$fb;
		
		console.log('send_socket');
		firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then((token)  => {
			console.log('token')
			let uid = this.uid();
			let socket = new Vue.prototype.$socket('http://localhost:8088');
			this.socket_list.push(socket);
			socket.connect();
			socket.on('connect', () => {
				console.log('socket connected', socket.id);
				socket.emit('query', {query, uid, token});
			});
			
			
			socket.on(uid, (data) => {
				callback(data);
			});
			
			socket.on('error', (err) => {
				console.warn(err);
			})
		}).catch((e) => {
			console.warn(e);
		})
		
	}
	
	close() {
		//this.socket_list.map((socket) => socket.close());
	}
	
	send(r) {
		let firebase = Vue.prototype.$fb;

		if(!this.http) {
			this.createHTTP();
		}
		
		return new Promise((resolve, reject) => {
			firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then((idToken)  => {
				var myInit = { method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					mode: 'cors',
					cache: 'default',
					body: JSON.stringify({
						query: r,
						token: idToken
					})
				};
				
				fetch('http://api.upoint.store:8088/query', myInit).then(function(response) {
					response.json().then((data) => {
						console.log(data);
						resolve(data);
					});
					
				}).catch((e) => {
					reject(e.message);
				});
				
				
			}).catch(function(error) {
				console.warn(error);
				reject(error.message);
			});
		})
		
		
		
		
	}
	
	
	createHTTP() {
		this.http = Vue.prototype.$http.create({
			baseURL: 'http://localhost:8088/',
			timeout: 10000,
			withCredentials: true,
			//transformRequest: [(data) => JSON.stringify(data.data)],
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'text/plain',
			}
		});
	}
}
const database = new DB();





export default new Proxy({},{get(target,name) {
		return function() {
			
			if(name === 'socket') {
				database.socket = true;
				return this;
			}
			
			if(database[name] !== undefined && ['r'].indexOf(name) >= 0) {
				console.log('ret ', name);
				return database[name]
			}
			
			if(name === "close") {
				database.close();
			}
			
			if(name === "run") {
				let fn = typeof arguments[0] === "function" ? arguments[0] : () => {};
				return database.run(fn);
			}
			
			if(name === "changes") {
				let fn = typeof arguments[0] === "function" ? arguments[0] : () => {};
				database.socket = true;
				return database.run(fn);
			}
			
			let args = [];
			
			for(let key in arguments) {
				let a = arguments[key];
				switch(typeof a) {
					case 'string':args.push(`'${a}'`); break;
					case 'object':args.push(JSON.stringify(a));break;
					default:
						args.push(a);
						break;
				}
			}
			
			database.builder.push(name + '(' + args.join(',')  + ')');
			return this;
		}
	}})