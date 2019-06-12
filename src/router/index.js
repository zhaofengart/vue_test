import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// import HelloWorld from '@/components/HelloWorld'
import Index from '../pages/index.vue'
import ArticlePublish from '../pages/articlePublish'
import LoginPage from '../pages/loginPage'
import TagAddPage from '../pages/tagAddPage'
import ArticleDeatil from '../pages/articleDetail'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/articlePublish',
      component: ArticlePublish
    },
    {
      path: '/loginPage',
      component: LoginPage
    },
    {
      path: '/tagAddPage',
      component: TagAddPage
    },
    {
      path: '/articleDetail',
      component: ArticleDeatil
    }
  ]
})
