<template>
   <transition  name="modal" >
       <div class="ui__confirm" v-if="show">
          <div class="ui__confirm__row">

                <i class="fa fa-exclamation-circle fa-5x fa-border fa-pull-left"></i>


                  <div class="confirm-container">
                      <div class="ui__confirm-title">
                          {{options.title}}
                          <span class="close"><i class="fa fa-times" @click="setState(false);"></i></span>
                      </div>
                      <div class="ui__confirm-body" v-html="options.body"></div>
                      <div class="ui__confirm-footer">
                          <button class="btn btn-danger btn-flat btn-md" @click="setState(true)" v-html="options.ok"></button>
                          <button class="btn btn-muted btn-flat btn-md pull-right" @click="setState(false)">Отмена</button>
                      </div>
                  </div>

          </div>
       </div>
   </transition>
</template>

<script>
    const watcher = {
    	state: null,
    };
    export default {
    	name: 'ui-confirm',
        data() {
    	    return {
    	    	show: false,
                options: {
    	    		title: "Удалить?",
                    body: "Ты реально хочешь удалить запись или просто ошибся кнопкой?",
                    ok: "Подвердить"
                },
            }
        },

        mounted() {
    	    this.$nextTick(() => {
		       // document.querySelector('.ui__confirm').addEventListener('click', this.backgroundClick);
            })
        },
        beforeDestroy() {
	        //document.querySelector('.ui__confirm').removeEventListener('click', this.backgroundClick);

        }   ,

        methods: {

    		backgroundClick() {
    			console.log('test');
    		    this.setState(false);
            },

    		ok() {
    			this.$emit("ok")
            },

            cancel() {
    			this.$emit("cancel");
            },

            setState(state) {
    			watcher.state = state;
            },

            display(options) {
    			this.options = Object.assign({}, this.options, options);
                this.show = true;
                let self = this;
                return new Promise((resolve, reject) => {

	                Object.defineProperty(watcher, 'state', {
	                	set(s) {
	                		self.show = false;
	                		console.log(s);
	                		console.log(self);
	                	    s ? resolve() : reject();
		                }
	                });
                })
            }
        }
    }
</script>

<style>
    .ui__confirm {
        position: absolute;
        top:0;
        left:0;
        background: rgba(122,122,122, .45);
        width:100%;
        height:100%;
        z-index:10001;

        display:flex;
        align-content: center;
        align-items: center;
    }

    .ui__confirm .ui__confirm__row {
        width:auto;
        max-width:500px;
        margin:auto;
        background:#fff;
        padding:20px 30px;
        border-radius: 5px;
        border:1px solid #eff1f7;

        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }



    .ui__confirm .confirm-container .ui__confirm-title {
        font-size:16px;
        font-weight:bold;
        border-bottom:1px solid #eff1f7;
        padding-bottom:8px;
        margin-bottom:8px;
        margin-left:120px;
    }

    .ui__confirm .confirm-container .ui__confirm-title .close {
        position: relative;
        top:-3px;
    }
    .ui__confirm .confirm-container .ui__confirm-body {
        font-size:14px;
        border-bottom:1px solid #eff1f7;
        margin-left:120px;
        padding-bottom: 8px;

    }

    .ui__confirm .confirm-container .ui__confirm-footer {
        margin-top:8px;
        padding-top:8px;

    }
    /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>