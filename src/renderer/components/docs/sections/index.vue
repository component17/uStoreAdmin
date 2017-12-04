<template>
    <div>
        <section-title>Разделы документации</section-title>
        <section-content>
            <div class="row">
                <div class="col-md-6">
                    <div class="box">
                        <table class="table  table-hover" style="width:100%;">
                            <tr>
                                <th>Раздел</th>
                                <th style="width:80px;">Действия</th>
                            </tr>
                            <tr>
                                <td @click="$router.push('/docs/sections/1');">Быстрый старт</td>
                                <td>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-info"><i class="fa fa-edit"></i></button>
                                        <button type="button" class="btn btn-danger"><i class="fa fa-remove"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </section-content>
    </div>
</template>

<script>
	export default {
		methods: {
			test() {
                console.log('test')
			}
		},
	}
</script>

<style scoped>
    .box {
        padding:20px;
    }
    tr > td:first-child {
        cursor: pointer;
    }

</style>