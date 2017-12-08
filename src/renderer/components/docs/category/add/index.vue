<template>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Добавить раздел документации</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form role="form">
            <div class="box-body">
                <div class="form-group" :class="{'has-error': titleExists}">
                    <label>Название</label>
                    <input type="text" class="form-control" v-model="title" placeholder="Название раздела">
                </div>
                <div class="form-group" :class="{'has-error': slugExists}">
                    <label>Патч</label>
                    <input type="text" class="form-control" v-model="slug" placeholder="Патч">
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="private"> Приватный раздел
                    </label>
                </div>
            </div>
            <!-- /.box-body -->

            <div class="box-footer">
                <div class="form-group">
                    <button @click="create" class="btn btn-primary btn-flat" :disabled="disabled">Создать раздел</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {debounce} from 'lodash';
	export default {
        computed: {
        	disabled() {
        		return !this.title || !this.slug || this.titleExists || this.slugExists;
            }
        },

        data() {
        	return {
        		title: '',
                slug: '',
                private: false,

                titleExists: false,
                slugExists: false,
            }
        },

		watch: {
			title: debounce(function(v) {
				this.$db.table('docSection').filter({name: this.title}).run().then((docs) => {
					this.titleExists = !!docs.length;
				})
			}, 300),

			slug: debounce(function(v) {
				this.$db.table('docSection').filter({slug: this.slug}).run().then((docs) => {
					this.slugExists = !!docs.length;
				})
			}, 300),
        },

        methods: {
	        create() {

		        this.$db.table('docCategory').insert({
			        name: this.title,
			        isPrivate: this.private,
			        userId: this.$created().uid,
			        createdAt: new Date().toISOString(),
			        slug: this.slug,
                    parentId: this.$route.params.section,
		        }).run().then((data) => {
			        console.log('Row created', data);
			        this.$router.push('/docs/category/'+data.generated_keys[0])
		        })
	        }
        }
	}
</script>

<style scoped>

</style>