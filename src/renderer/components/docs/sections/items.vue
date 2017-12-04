<template>
    <div>
        <section-title>Категория: список разделов</section-title>
        <section-content>
            123
        </section-content>
    </div>
</template>

<script>
	export default {
        name: 'docs-sections-items',
        created() {
        	console.log(this.$route.params.id);
        }
	}
</script>

<style scoped>

</style>