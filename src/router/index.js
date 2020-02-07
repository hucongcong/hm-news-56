import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import EditProfile from '../pages/EditProfile.vue'
import Follow from '../pages/Follow.vue'
import Test from '../pages/Test.vue'
import MyComments from '../pages/MyComments.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    // name： 给这个路由规则起一个名字 /home/one
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/follow', component: Follow, name: 'follow' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/my-comments', component: MyComments, name: 'my-comments' }
  ]
})

// 给路由对象注册前置导航守卫
// to: 到哪儿去
// from： 从哪儿来
// next: 是一个函数，  next(): 代表放行  next('/login')
// 需要授权的路径
const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow',
  '/my-comments'
]
router.beforeEach(function (to, from, next) {
  // 判断用户是否登录
  const token = localStorage.getItem('token')
  // 如果去个人中心，需要判断是否登录
  //   如果有token，说明，登录了，继续
  //   如果没有token，没有没有登录，去登录
  // 如果不是去个人中心，不判断，直接去
  // 判断数组是否包含某个值
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
