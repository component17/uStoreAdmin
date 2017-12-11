<template>
    <div>
        <section-content>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Секции документации</h3>
                            <div class="box-tools">
                                <button class="btn btn-primary btn-xs btn-flat" @click="addSection"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="box-body no-padding">
                            <table class="table table-striped" style="width:100%;">
                                <tbody>
                                <tr v-for="section in sections" :id="'section__'+section.id">
                                    <td @click="$router.push('/docs/sections/'+section.id);">{{section.name}}</td>
                                    <td>
                                        <div class="pull-right">
                                            <button type="button" class="btn bnt-primary btn-xs btn-flat btn-social btn-bitbucket" ><i class="fa fa-list"></i> Просмотр</button>
                                            <button type="button" class="btn btn-info btn-xs btn-flat  btn-social"><i class="fa fa-edit"></i> Редактировать</button>
                                            <button type="button" class="btn btn-danger btn-xs btn-flat  btn-social" @click="remove(section)"><i class="fa fa-remove"></i> Удалить</button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </section-content>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				sections: {},
                socket: null,
            }
        },
        mounted() {

        },
		created() {
			this.$db.table('docSection').run().then((data) => {
				console.log('socket data', data);
				this.sections = data;
			});

        },
        beforeDestroy() {
		    //this.$db.close();
        },
		methods: {
			addSection() {
				this.$router.push('/docs/sections/create')
            },

            remove(section, $event) {
				this.$ui.confirm({
                    title: "УДАЛЕНИЕ СЕКЦИИ",
                    body: `Вы удаляете секцию <b>${section.name}</b> ! Для продолжения нажмите "Удалить". Секция будет удалена <b>навсегда</b>`,
                    ok:"Удалить навсегда",

                }).then(() => {
					//this.$db.table('docSection').get(id).delete().run();

                    new Promise((resolve, reject) => {
                    	let el = document.querySelector('#section__'+section.id);
                    	for(let i = 0; i <= 6; i++) {
                    		setTimeout(() => {
                    			if(i > 5) {
                    				resolve();
                                } else {
                    				el.classList.toggle('remove');
                                }
                            }, i * 200);
                        }
                    }).then(() => {
	                    this.sections = this.sections.filter((s) => s.id !== section.id);
                    })
                }).catch(() => {
                });

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

    tr td {
        transition-duration: 150ms;
    }
    tr.remove td {
        background: #ED4337;
        transition-duration: 150ms;
    }

</style>