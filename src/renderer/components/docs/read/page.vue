<template>
    <div>
        <section-content>
            <div class="box">
                <div class="box-header">
                    <h3>{{page.name}} <small class="text-sm text-info" v-if="page.isPrivate">Private</small></h3>
                </div>

                <div class="box-body markdown-body" v-html="page.contentHtml">
                </div>
            </div>
        </section-content>
    </div>
</template>

<script>
	export default {
		watch: {
		    '$route.params.page': function() {
		        this.updatePage();
            }
        },
		data() {
			return {
				page: {},
            }
        },
        created() {
        	this.$db.table("docPage").get(this.$route.params.page).run().then((page) => {
        		this.page = page;
        		console.log(page);
            })
        },

        methods: {
			updatePage() {
				this.$db.table("docPage").get(this.$route.params.page).run().then((page) => {
					this.page = page;

				})
            }
        }
	}
</script>

<style>
    @import url('../../../../../node_modules/markdown-it-editor/lib/index.css');
</style>