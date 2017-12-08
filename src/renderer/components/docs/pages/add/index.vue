<template>
    <div>
        <section class="content-header">
            <h1>
                {{breadcrumb}} <span v-if="!saved" class="text-danger text-sm">Не сохранена</span>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> {{section.name}}</a></li>
                <li><a href="#">{{category.name}}</a></li>
                <li class="active">{{breadcrumb}}</li>
            </ol>
        </section>

       <section-content>
           <div class="box" :class="titleError || slugError ? 'box-danger' : 'box-success'">
              <div class="box-body">
                  <div class="form-group" :class="{'has-error': titleError}" style="margin:0;">
                      <label>Название страницы</label>
                      <input type="text" class="form-control" placeholder="Название страницы" v-model="pageTitle" >
                  </div>

                  <div class="form-group" :class="{'has-error': slugError}" style="margin:0;">
                      <label>Патч</label>
                      <input type="text" class="form-control" placeholder="патч" v-model="slug" >
                  </div>
                  <div class="checkbox">
                      <label>
                          <input type="checkbox" v-model="private"> Приватная страница
                      </label>
                  </div>
              </div>
           </div>
          <div class="box box-info">
             <div class="box-body">
                 <div class="form-group" style="height:500px;">
                     <markdown-editor v-model="code" height="100%" :options="options" :z-index="10000"></markdown-editor>
                 </div>
             </div>
          </div>
           <div class="box text-right" :class="titleError ? 'box-danger' : 'box-success'">
               <div class="box-body">
                   <button class="btn btn-primary" @click="save" :disabled="disabled">Сохранить</button>
               </div>
           </div>
       </section-content>
    </div>
</template>

<script>

    import {debounce} from 'lodash';
    import { MarkdownEditor } from 'markdown-it-editor'
    import 'markdown-it-editor/lib/index.css'
    import hljs from 'highlightjs' // have to npm install highlight
    import 'highlightjs/styles/github.css'


    export default {
    	components: {MarkdownEditor},
        computed: {
    		disabled() {
    			if(this.pageID) return false;

    			return this.loading || this.titleError || this.slugError || !this.pageTitle || !this.slug;
            },

	        breadcrumb() {
    			return this.pageTitle || 'Новая страница'
            },
            saved() {
    			if(this.pageSaved === false && (this.pageTitle || this.code || this.slug)) {
    				return false;
                }

                return true;
            }
        },
		data() {
			return {
				pageID: null,
				loading: false,
				pageSaved: false,
				private: false,
				titleError: false,
                slugError: false,
				pageTitle: '',
                slug: '',
				section_id: '',
                category_id: '',
                category: '',
                section: '',
                code: '',
                preview: '',
				options: {
					typographer:  true,
					highlight: (str, lang) => { // you can add highlightjs plugin to highlight your code
						if (lang && hljs.getLanguage(lang)) {
							try {
                                return hljs.highlight(lang, str).value;
							} catch (__) { console.log(__)}
						}
						return ''
					},
                    zIndex: 10000,
				}
            }
        },
        created() {

    		if(this.$route.name === 'docs-pages-edit') {
    			this.pageID = this.$route.params.id;

    			this.$db.table('docPage').get(this.pageID).run().then((data) => {
    				this.code = data.contentMd;
    				this.slug = data.slug;
    				this.pageTitle = data.name;
    				this.private = data.isPrivate;
    				this.pageSaved = true;
				    this.category_id = data.categoryId;
				    this.$db.table('docCategory').get(this.category_id).run().then((category) => {
					    this.category = category;
					    this.$db.table('docSection').get(this.category.parentId).run().then((section) => {
						    this.section = section;
					    })
				    });
                });




            } else {
			    this.category_id = this.$route.params.category;
			    this.$db.table('docCategory').get(this.category_id).run().then((category) => {
				    this.category = category;
				    this.$db.table('docSection').get(this.category.parentId).run().then((section) => {
					    this.section = section;
				    })
			    });
            }


        },

        watch: {
			code: debounce(function(newVal, oldVal) {
				this.pageSaved = false;
                this.update(newVal);
            }, 1),

            pageTitle: debounce(function(title)  {
                this.$db.table('docPage').filter({name: title, categoryId: this.category.id}).run().then((docs) => {
                	docs.forEach((page) => {
                		if(this.pageID && page.id !== this.pageID) {
                			this.titleError = true;
                        }
                    });

                	if(!docs.length) {
                		this.titleError = false;
                    }
                	this.pageSaved = false;
                })
            }, 300),

            slug: debounce(function(slug) {
            	this.$db.table('docPage').filter({slug: slug, parentId: this.category.id}).run().then((docs) => {
            		docs.forEach((doc) => {
            			if(this.pageID && doc.id !== this.pageID) {
            				this.slugError = true;
                        }
                    });

            		if(!docs.length) {
            			this.slugError = false;
                    }
            		this.pageSaved = false;
                })
            }),

            private() {
				this.pageSaved = false;
            }


        },

        mounted() {

        },

        methods: {
			update(code) {
				//this.preview = marked(code);
            },

            save() {

				if(!this.pageTitle || this.titleError) {
				    return alert('Измение заголовок')
                }

                this.loading = true;
				let page = {
					categoryId: this.category.id,
					sectionId: this.section.id,
					name: this.pageTitle,
					slug: this.slug,
					isPrivate: this.private,
					createAt: new Date().toISOString(),
					userId: this.$created().uid,
					contentMd: this.code,
					contentHtml: document.querySelector('.markdown__editor-preview').innerHTML,

				};
				if(this.pageID) {
				    this.$db.table('docPage').get(this.pageID).update(page).run().then((data) => {
				    	console.log('updated', data);
				    	this.pageSaved = true;
				    	this.loading = false;
					    this.$toastr('success', 'Запись обновлена', '')

				    })
                } else {

					this.$db.table('docPage').insert(page).run().then((data) => {
						console.log('saved', data);
						this.pageSaved = true;
						this.loading = false;
						this.pageID = data.generated_keys[0];
						this.$toastr('success', 'Запись создана', '')

					});
				}
            }
        }
	}
</script>

<style>
    .markdown__editor .markdown__editor-content .content-wrapper {
        margin-left:0;
    }
</style>