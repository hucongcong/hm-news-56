import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    // name： 给这个路由规则起一个名字 /home/one
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' }
  ]
})

export default router
