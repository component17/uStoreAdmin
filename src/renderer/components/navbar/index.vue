<template>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" role="button" class="navbar-action" @click="reload();">
            <i class="fa fa-refresh"></i>
        </a>

        <a href="#" role="button" class="navbar-action" @click="back();">
            <i class="fa fa-angle-left"></i>
        </a>

        <a href="#" role="button" class="navbar-action" @click="forward()">
            <i class="fa fa-angle-right"></i>
        </a>

        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span class="hidden-xs">{{useremail}}</span>
                    </a>
                </li>
                <!-- Control Sidebar Toggle Button -->
                <li>
                    <a href="#" @click="logout"><i class="fa fa-sign-out"></i></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
	export default {
        name: 'page-part-nav-bar',
        data() {
        	return {
        		menu: false,
            }
        },
        computed: {
        	useremail() {
        		//console.log(this.$auth);
        		return this.$auth.email;
            }
        },
		methods: {
			reload() {
                //this.$route.
			},

            back() {
				this.$router.go(-1);
            },

            forward() {
				this.$router.go(1);
            },

            logout() {
			    this.$fb.auth().signOut().then(() => {
			    	this.$router.push('/');
                })
            }
		},
	}
</script>

<style scoped>
    .navbar-action {
        color:#fff;
        font-size:22px;
        margin:0 5px;
        font-weight: 100;
        line-height: 50px;
        display:inline-block;
        width:50px;
    }
    .navbar-action:first-child {
        margin-left:20px;
    }

    .open {
        display:block;
    }
</style>