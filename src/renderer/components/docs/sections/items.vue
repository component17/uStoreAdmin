<template>
    <div>
        <section-content>
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">{{section.name}}: список разделов</h3>
                    <div class="box-tools">
                        <button class="btn btn-flat btn-info btn-xs" @click="addCategory"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <tbody>
                            <tr v-for="category in categories">
                                <td @click="$router.push('/docs/category/'+category.id)">{{category.name}}</td>
                                <td>
                                    <div class="pull-right">
                                        <button type="button" class="btn bnt-primary btn-xs btn-flat btn-social btn-bitbucket" ><i class="fa fa-list"></i> Просмотр</button>
                                        <button type="button" class="btn btn-info btn-xs btn-flat  btn-social"><i class="fa fa-edit"></i> Редактировать</button>
                                        <button type="button" class="btn btn-danger btn-xs btn-flat  btn-social" @click="remove(category)"><i class="fa fa-remove"></i> Удалить</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section-content>
    </div>
</template>

<script>
	export default {
        name: 'docs-sections-items',
        data() {
        	return {
        		section: {},
                categories: [],
            }
        },
        created() {
        	//console.log(this.$route.params.id);
        	this.$db.table('docSection').get(this.$route.params.id).run().then((section) => {
        		console.log(section);
        		this.section = section;
            });

        	this.$db.table('docCategory').filter({parentId: this.$route.params.id}).run().then((categories) => {
        		this.categories = categories;
        		console.log('Categories:', categories);
            })
        },

        methods: {
        	addCategory() {
        		this.$router.push('/docs/category/add/' + this.section.id);
            },

            remove(id) {
        		this.$ui.confirm({
                    title: "Удаление категории",
                    body: `Вы удаляете категорию <b>${id.name}</b>! Для продолжения нажмите "Удалить". Категория будет удалена <b>навсегда</b>`,
                    ok: "Удалить навсегда"
                }).then(() => {

                }).catch(() => {

                })
            }
        }
	}
</script>

<style scoped>

</style>