import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/home').default
    },
      {path: '/docs/sections/', component: require('@/components/docs/sections/').default, name: 'docs-sections'},
      {path: '/docs/sections/:id', component: require('@/components/docs/sections/items').default, name: 'docs-sections-items'},
      {path: '/docs/pages/add/', component: require('@/components/docs/pages/add/').default, name: 'docs-pages-add'},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
