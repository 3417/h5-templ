import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
/**
 * webpackChunkName:打包项目的chunk名称
 * 
 * */ 
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router
