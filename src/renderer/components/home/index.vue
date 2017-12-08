<template>
    <div>

        <div id="dropzone" v-if="visible">
            <div><i class="mdi mdi-drag"></i> Перетащите файлы сюда</div>
        </div>


    </div>
</template>

<script>
	const {shell} = require('electron');

    export default {
    	name: 'home',

        data() {
    		return {
    			visible: false,
                files: [],
            }
        },

        mounted() {
	        window.addEventListener('dragenter', this.dragEnter);
	        window.addEventListener('dragleave', this.dragLeave);
	        window.addEventListener('dragover', this.dragOver);
	        window.addEventListener('drop', this.droped);
        },

        beforeDestroy() {
	        window.removeEventListener('dragenter', this.dragEnter);
	        window.removeEventListener('dragleave', this.dragLeave);
	        window.removeEventListener('dragover', this.dragOver);
	        window.removeEventListener('drop', this.droped);
        },


        methods: {
	        dragOver(e) {
		        e.preventDefault();
	        },

	        dragLeave(e) {
		        if (e.target === this.lastTarget) {
			        this.visible = false;
		        }
	        },

	        dragEnter(e) {
		        this.lastTarget = e.target;
		        this.visible = true;
	        },

	        droped(e) {
		        e.preventDefault();
		        this.visible = false;
		        for(let key = 0; key < e.dataTransfer.files.length; key ++) {
			        let file = e.dataTransfer.files[key];
			        this.files.push(file.path);
			        shell.openExternal(file.path);
			        shell.beep()

		        }


		        return false;
	        },
        }
    }
</script>

<style>
    #dropzone {
        width: 100vw;
        height: 100vh;
        top:0;
        left:0;
        position: fixed;
        background: rgba(0,0,0, .3);
        color:#fff;
        z-index:10000;
        border:2px dashed #fff;
        display: flex;
        align-content: center;
        justify-content: center;
    }

    #dropzone > div {
        font-size:20px;
    }
</style>