<template>
  <div class="wrapper">
    <app-header v-if="$auth"></app-header>
    <app-sidebar  v-if="$auth"></app-sidebar>
    <router-view class="content-wrapper" :class="{left0:!$auth}"></router-view>
  </div>
</template>

<script>
  export default {
      name: 'admin',
      components: {
    	  AppHeader: require('./components/header').default,
          AppSidebar: require('./components/sidebar').default,
      },

      mounted() {
      	//alert('auto updated!!!');
      /*	let r  = this.$db.r();
        setTimeout(() => {
	        this.$db.table('test').merge((name) => {
	          return {
		          aaa: r.table('test2').get('fdd36872-7f2f-4b1d-bdfb-ac26400b233e'),
	          }
            }).run();
        }, 1000);*/
      },



  }
</script>

<style>
  @import url('../../static/bower_components/bootstrap/dist/css/bootstrap.min.css');
  @import url('../../static/bower_components/font-awesome/css/font-awesome.min.css');
  @import url('../../static/bower_components/Ionicons/css/ionicons.min.css');
  @import url('../../static/css/AdminLTE.css');
  @import url('../../static/css/skins/skin-blue.css');
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic');

  .left0 {
    margin-left:0;
    margin-top:0;
  }


</style>
