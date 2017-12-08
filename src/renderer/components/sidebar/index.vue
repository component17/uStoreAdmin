<template>
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->

            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">MAIN NAVIGATION</li>
                <li class="treeview" :class="{'menu-open': menuID === 1, active: menuID === 1}" >
                    <a @click="menuOpen(1);">
                        <i class="fa fa-dashboard"></i> <span>Документация</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu" :class="{open: menuID === 1}">
                        <li><a @click="push('/docs/sections/')"><i class="fa fa-circle-o"></i> Управление</a></li>
                        <li>
                            <a @click="expandMenu = !expandMenu"><i class="fa fa-circle-o"></i> <span>Просмотр</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu" :class="{open: expandMenu}">
                                <li class="treeview" v-for="section in sections">
                                    <a href="#"><i class="fa fa-angle-double-right"></i> {{section.name}}
                                    </a>
                                    <ul class="treeview-menu open">
                                        <li class="treeview" v-for="category in section.categories">
                                            <a href="#"><i class="fa fa-angle-right"></i> {{category.name}}
                                            </a>
                                            <ul class="treeview-menu open" v-for="page in category.pages">
                                                <li><a href="#" @click="push(`/docs/read/${section.id}/${category.id}/${page.id}/`)"><i class="fa fa-file-text"></i> {{page.name}}</a></li>

                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
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
				menuID: false,
                expandMenu: false,
                sections: [],
			}
		},


        created() {
            new Promise((resolve, reject) => {
                this.$db.table("docSection").changes((sections) => {
                    sections.forEach((section, sIndex) => {
                        this.$db.table("docCategory").filter({parentId: section.id}).changes((categories) => {
                            sections[sIndex].categories = categories;
                            categories.forEach((category, cIndex) => {
                                this.$db.table("docPage").filter({categoryId: category.id}).changes((pages) => {
                                    sections[sIndex].categories[cIndex].pages = pages;
                                    resolve(sections);
                                })
                            })
                        })
                    })
                })

            }).then((sections) => {
                this.sections = sections;
            });
        },

		methods: {
			menuOpen(id) {
				this.expandMenu = false;
				if(this.menuID === id) {
					this.menuID = false;
					return;
                }
                this.menuID = id;
			},

            push(route) {
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