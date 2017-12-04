<template>
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="static/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>Alexander Pierce</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">MAIN NAVIGATION</li>
                <li class="treeview" :class="{'menu-open': menuID === 1}" >
                    <a @click="menuOpen(1);">
                        <i class="fa fa-dashboard"></i> <span>Документация</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu" :class="{open: menuID === 1}">
                        <li><a @click="push('/docs/sections/');"><i class="fa fa-circle-o"></i> Разделы</a></li>
                        <li><a @click="$router.push('/docs/pages/add/');"><i class="fa fa-circle-o"></i> Добавить страницу</a></li>
                    </ul>
                </li>

            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
	export default {
        name: 'page-part-sidebar',
		data() {
			return {
				menuID: false
			}
		},
		methods: {
			menuOpen(id) {
				if(this.menuID === id) {
					this.menuID = false;
					return;
                }
                this.menuID = id;
			},

            push(route) {
				console.log(route);
				this.$router.push(route);
            }
		},
	}
</script>

<style scoped>
    .treeview-menu.open {
        display:block;
    }

    a {
        cursor: pointer;
    }
</style>