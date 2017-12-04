<template>
  <div>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view class="content-wrapper"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'admin',
      components: {
    	AppHeader: require('./components/header').default,
          AppSidebar: require('./components/sidebar').default,
      }
  }
</script>

<style>
  @import url('../../static/bower_components/bootstrap/dist/css/bootstrap.min.css');
  @import url('../../static/bower_components/font-awesome/css/font-awesome.min.css');
  @import url('../../static/bower_components/Ionicons/css/ionicons.min.css');
  @import url('../../static/css/AdminLTE.min.css');
  @import url('../../static/css/skins/_all-skins.min.css');
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic');
</style>
