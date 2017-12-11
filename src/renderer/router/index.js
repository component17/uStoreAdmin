import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/home').default
    },
      {path: '/docs/sections/', component: require('@/components/docs/sections/').default, name: 'docs-sections', meta: {auth:true}},
      {path: '/docs/sections/create', component: require('@/components/docs/sections/create').default, name: 'docs-sections-create', meta: {auth:true}},
      {path: '/docs/sections/:id', component: require('@/components/docs/sections/items').default, name: 'docs-sections-items',meta: {auth:true}},
      {path: '/docs/category/:id', component: require('@/components/docs/category/items').default, name: 'docs-category-items',meta: {auth:true}},
      {path: '/docs/pages/add/:category', component: require('@/components/docs/pages/add/').default, name: 'docs-pages-add',meta: {auth:true}},
      {path: '/docs/pages/edit/:id', component: require('@/components/docs/pages/add/').default, name: 'docs-pages-edit',meta: {auth:true}},
      {path: '/docs/category/add/:section', component: require('@/components/docs/category/add/').default, name: 'docs-category-add',meta: {auth:true}},
      {path: '/releases/', component: require('@/components/release').default, name: 'release',meta: {auth:true}},
      {path: '/releases/ftp/', component: require('@/components/release/ftp').default, name: 'release-ftp',meta: {auth:true}},
/*      {path: '/docs/read/', component: require('@/components/docs/read/').default, name: 'docs-read', meta: {auth: true}},
      {path: '/docs/read/:section', component: require('@/components/docs/read/section').default, name: 'docs-read-section', meta: {auth: true}},
      {path: '/docs/read/:section/:category', component: require('@/components/docs/read/category').default, name: 'docs-read-category', meta: {auth: true}},*/
      {path: '/docs/read/:section/:category/:page', component: require('@/components/docs/read/page').default, name: 'docs-read-page', meta: {auth: true}},
      {path: '/auth', component: require('@/components/auth/').default, name: 'auth',meta: {auth:false}},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
