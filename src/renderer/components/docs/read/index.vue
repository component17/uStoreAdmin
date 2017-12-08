<template>
    <div>
       <section-content>
           <div class="box">
               <div class="box-header">Выберите секцию</div>
           </div>
       </section-content>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				sections: []
            }
		},

        created() {
			this.$db.table('docSection').run().then((sections) => {
				this.sections = sections;
            })
        }
	}
</script>

<style scoped>

</style>