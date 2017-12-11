<template>
    <div>


        <section-content>
            <section-title>Обновление APP.ASAR</section-title>
            <div class="row">
                <div class="col-xs-6">
                    <div class="box box-primary" style="height:282px;">
                        <div class="box-header">
                            <h3 class="box-title">Загрузка app.asar</h3>
                        </div>

                        <div class="box-body">
                            <div class="form-group">
                                <label>Версия</label>
                                <input type="text" v-model="version.asar.version">
                            </div>
                            <small>{{version.asar.date}}</small>
                            <div class="form-group">
                                <button class="btn btn-primary btn-xs btn-flat" @click="selectFile(['asar'], 'asar')"><i
                                        class="fa fa-file"></i> Выбрать файл
                                </button>
                            </div>
                            <div v-if="file.asar">
                                <div class="progress progress-sm active">
                                    <div class="progress-bar progress-bar-success progress-bar-striped"
                                         role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                                         :style="'width: ' + percentageComplete.asar + '%'">
                                    </div>
                                </div>
                                <button class="btn primary btn-flat btn-xs" @click="upload('asar')"
                                        :disabled="uploading.asar">Загрузить {{file.asar}} <i
                                        class="fa fa-refresh fa-spin" v-if="uploading.asar"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="box box-primary" style="height:282px;" >
                        <div class="box-header">
                            <h3 class="box-title">Описание обновления</h3>
                        </div>

                        <div class="box box-body">
                            <div class="form-group">
                                <textarea class="form-control" v-model="notes.asar" style="height:200px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section-title>Обновление Windows</section-title>
            <div class="row">
                <div class="col-xs-6">
                    <div class="box box-primary" style="height:282px;">
                        <div class="box-header">
                            <h3 class="box-title">Загрузить релиз windows</h3>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label>Версия</label>
                                <input type="text" v-model="version.win.version">
                            </div>
                            <small>{{version.win.date}}</small>
                            <div class="form-group">
                                <button class="btn btn-primary btn-xs btn-flat" @click="selectFile(['exe'], 'win')"><i
                                        class="fa fa-file"></i> Выбрать файл
                                </button>
                            </div>
                            <div v-if="file.win">
                                <div class="progress progress-sm active">
                                    <div class="progress-bar progress-bar-success progress-bar-striped"
                                         role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                                         :style="'width: ' + percentageComplete.win + '%'">
                                    </div>
                                </div>
                                <button class="btn primary btn-flat btn-xs" @click="upload('win')"
                                        :disabled="uploading.win">Загрузить {{file.win}} <i
                                        class="fa fa-refresh fa-spin" v-if="uploading.win"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="box box-primary">
                        <div class="box-header">
                            <h3 class="box-title">Описание обновления</h3>
                        </div>

                        <div class="box box-body">
                            <div class="form-group">
                                <textarea class="form-control" v-model="notes.win" style="height: 200px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section-title>Обновление Mac</section-title>
            <div class="row">
                <div class="col-xs-6">
                    <div class="box box-primary" style="height:282px;">
                        <div class="box-header">
                            <h3 class="box-title">Загрузить релиз mac</h3>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label>Версия</label>
                                <input type="text" v-model="version.mac.version">
                            </div>
                            <small>{{version.mac.date}}</small>
                            <div class="form-group">
                                <button class="btn btn-primary btn-xs btn-flat" @click="selectFile(['dmg'], 'mac')"><i
                                        class="fa fa-file"></i> Выбрать файл
                                </button>
                            </div>
                            <div v-if="file.mac">
                                <div class="progress progress-sm active">
                                    <div class="progress-bar progress-bar-success progress-bar-striped"
                                         role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                                         :style="'width: ' + percentageComplete.mac + '%'">
                                    </div>
                                </div>
                                <button class="btn primary btn-flat btn-xs" @click="upload('mac')"
                                        :disabled="uploading.mac">Загрузить {{file.mac}} <i
                                        class="fa fa-refresh fa-spin" v-if="uploading.mac"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="box box-primary">
                        <div class="box-header">
                            <h3 class="box-title">Описание обновления</h3>
                        </div>

                        <div class="box box-body">
                            <div class="form-group">
                                <textarea class="form-control" v-model="notes.mac" style="height:200px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section-content>
    </div>
</template>

<script>
	const zip = require('adm-zip');
	const ftp = require('ftp');
	const fs = require('fs');
	//const ofs = require('original-fs');
	const path = require('path');
	const app = require('electron').remote.app;
	export default {
		name: 'release',
		data() {
			return {
				file: {
					win: '',
					mac: '',
					asar: '',
				},
				uploading: {
					mac: false,
					win: false,
					asar: false,
				},

				version: {
					win: '',
					mac: '',
					asar: '',
				},
				notes: {
					asar: '',
				},
				percentageComplete: {
					win: 0,
					mac: 0,
					asar: 0,
				},
			}
		},

		created() {
			let client = new ftp();
			client.on('ready', () => {
				client.get('./.htversion', (err, stream) => {
					let buffer = '';
					stream.on('end', () => {
						this.version = JSON.parse(buffer);
						client.end();
					});

					stream.on('data', (data) => {
						buffer += data;
					})
				});
			});

			let data = JSON.parse(localStorage.getItem('ftp_settings'));
			let host = data[0],
				port = data[1],
				user = data[2],
				password = data[3];

			client.connect({
				host, port, user, password
			});


		},

		methods: {
			some() {
				console.log('confirmed')
            },
			selectFile(ext, os) {
				const {dialog} = require('electron').remote;

				dialog.showOpenDialog({
					properties: ['openFile'], filters: [
						{name: "Upoint APP", extensions: ext}
					]
				}, (files) => {
					if (files) {
						this.file[os] = files[0];
					}
				});
			},


			upload(os) {


				if (os === "asar") {
					process.noAsar = true
					console.log(path.join(app.getPath('temp'), '__ftp__upload__zip.zip'));
					console.log('try zip')
					let archive = new zip();
					archive.addFile("app.asar", fs.readFileSync(this.file[os]));
					archive.writeZip(path.join(app.getPath('temp'), '__ftp__upload__zip.zip'));
					console.log('zipped');
					process.noAsar = false;
					this.file[os] = path.join(app.getPath('temp'), '__ftp__upload__zip.zip');

				}

				let data = JSON.parse(localStorage.getItem('ftp_settings'));
				let host = data[0],
					port = data[1],
					user = data[2],
					password = data[3];

				this.uploading[os] = true;
				let client = new ftp();
				client.on('ready', () => {
					let stream = fs.createReadStream(path.normalize(this.file[os])),
						cur = 0,
						total = fs.statSync(this.file[os]).size;

					stream.on('data', (d) => {
						cur += d.length;
						this.percentageComplete[os] = ((cur / total) * 100).toFixed(1);
					});

					let fn;
					switch (os) {
						case 'win':
							fn = 'upoint.exe';
							break;
						case 'mac':
							fn = 'upoint.dmg';
							break;
						case 'asar':
							fn = 'upoint.asar.zip';
							break;
					}
					client.put(stream, fn, (err) => {
						if (err) {
							console.warn(err);
							this.$toastr("error", "Ошибка загрузки");

						}

						this.$toastr("success", "Файл загружен");


						this.version[os].date = new Date().toISOString();
						this.version[os].version = this.version[os].version;

						client.put(JSON.stringify(this.version), './.htversion', (err) => {
							this.$toastr("success", "Версия обновлена");
							client.end();
						});

						this.uploading[os] = false;
						this.file[os] = '';
						this.percentageComplete[os] = 0;
					})
				});

				client.on('error', (err) => {
					console.warn(err);
				});

				client.connect({
					host, port, user, password
				});
			}
		}
	}
</script>

<style scoped>

</style>