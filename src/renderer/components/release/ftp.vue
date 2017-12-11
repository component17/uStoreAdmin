<template>
    <div>
        <section-content>
            <div class="row">
                <div class="col-md-4">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Настройки FTP</h3>
                        </div>

                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-8">
                                    <div class="form-group">
                                        <label>Хост</label>
                                        <input class="form-control" v-model="host">
                                    </div>
                                </div>

                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Порт</label>
                                        <input type="text" class="form-control" v-model="port">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Имя</label>
                                        <input class="form-control" v-model="user">
                                    </div>
                                </div>

                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Пароль</label>
                                        <input type="password" class="form-control" v-model="pass">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-footer">
                            <div class="row">
                                <div class="col-xs-8">
                                    <div class="text-danger" v-if="error">{{error}}</div>
                                </div>
                                <div class="col-xs-4">
                                    <button class="btn btn-primary btn-flat pull-right" @click="save">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section-content>
    </div>
</template>

<script>
    const ftp = require('ftp');
	export default {
        name: 'release-ftp',
        data() {
        	return {
        		host: '',
                port: '',
                user: '',
                pass: '',

                error: null
            }
        },

        created() {
        	let data = JSON.parse(localStorage.getItem('ftp_settings'));
        	this.host = data[0];
        	this.port = data[1];
        	this.user = data[2];
        	this.pass = data[3];
        },

        methods: {
        	save() {
        		let data = [this.host, this.port, this.user, this.pass];
        		//localStorage.setItem('ftp_settings', JSON.stringify(data));

                let client = new ftp();
                client.on('ready', () => {
                	console.log('ok');
                	client.end();
	                localStorage.setItem('ftp_settings', JSON.stringify(data));
	                this.$toastr("success", "Даные ФТП обновлены")
                });

                client.on('error', (err) => {
                	console.log(err);
                	this.error = err.code;
                });

                client.connect({
                    host: this.host,
                    port: this.port,
                    user: this.user,
                    password: this.pass,
                });
            }
        }
	}
</script>

<style scoped>

</style>