<template>
    <div id="auth" >
            <div class="login-box">
                <div class="login-logo">
                    <a href="#"><b>uStore</b>admin</a>
                </div>
                <!-- /.login-logo -->
                <div class="login-box-body">
                    <p class="login-box-msg">Вход</p>

                    <form @submit.prevent="">
                        <div class="form-group has-feedback">
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input type="password" class="form-control" placeholder="Password" v-model="pass">
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                                <span class="text text-danger" v-if="error">{{error}}</span>
                                <div class="progress progress-sm active" v-if="loading" style="margin-top:10px;">
                                    <div class="progress-bar progress-bar-success progress-bar-striped"  style="width: 100%">
                                    </div>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-xs-4">
                                <button class="btn btn-primary btn-block btn-flat" @click="auth" :disabled="loading">Войти</button>
                            </div>
                            <!-- /.col -->
                        </div>

                    </form>
                </div>
                <!-- /.login-box-body -->
            </div>
            <!-- /.login-box -->
    </div>
</template>

<script>
	export default {
        name:'auth',
        mounted() {


        },
		data() {
			return {
				email: 'mail@k1on.ru',
                pass: '123456',
                error: null,
                loading: false,
			}
		},
		methods: {
			auth() {
				this.error = null;
				this.loading = true;
                this.$fb.auth().signInWithEmailAndPassword(this.email, this.pass).then((data) => {
                	console.log('auth', data);
                	this.$auth = data;
                	this.$router.push('/');
                	this.loading = false;
                }).catch((error) => {
                	this.error = error.message;
                	this.loading = false;
                })
			}
		},
	}
</script>

<style scoped>
    .content-wrapper {
        max-height: 100% !important;
        min-height: 100% !important;
    }
</style>