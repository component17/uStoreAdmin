<template>
   <div>
       <section-content>
           <div class="box">
               <div class="box-header">
                   <h3 class="box-title">{{category.name}}: список страниц</h3>
                   <div class="box-tools">
                       <button class="btn btn-flat btn-info btn-xs" @click="addPage"><i class="fa fa-plus"></i></button>
                   </div>
               </div>
               <div class="box-body no-padding">
                   <table class="table table-striped">
                       <tbody>
                            <tr v-for="page in pages">
                                <td @click="edit(page.id)">{{page.name}}</td>
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
		data() {
			return {
				category: {},
                pages: [],
            }
        },
        created() {
        	console.log(this.$route.params.id);
        	this.$db.table('docPage').filter({categoryId: this.$route.params.id}).run().then((pages) => {
        	    this.pages = pages;
            });

        	this.$db.table('docCategory').get(this.$route.params.id).run().then(category => this.category = category);
        },

        methods: {
			addPage() {
                this.$router.push('/docs/pages/add/' + this.$route.params.id);
            },

            edit(id) {
				this.$router.push('/docs/pages/edit/'+id);
            }
        }
	}
</script>

<style scoped>

</style>