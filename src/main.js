import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入lib-flexible
import 'lib-flexible'

// 导入通用的样式
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'

import axios from 'axios'
// 导入自己封装的hm-button组件
import HmButton from './components/hm-button.vue'
import HmInput from './components/hm-input.vue'
import HmNav from './components/hm-nav.vue'
import HmHeader from './components/hm-header.vue'
import { Button, Toast, Dialog, Field, RadioGroup, Radio, Cell, CellGroup, Uploader, List } from 'vant'
import moment from 'moment'

Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)

Vue.component('HmButton', HmButton)
Vue.component('HmInput', HmInput)
Vue.component('HmNav', HmNav)
Vue.component('HmHeader', HmHeader)

// 使用vant这个ui组件库的插件， 会把vant中所有的组件都全局的注册

Vue.config.productionTip = false

// ----------------------axios优化------------------------------
Vue.prototype.$axios = axios
// 给axios设置默认的baseURL (基准路径)  会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做一些通用的处理
  // 判断状态码是否是401，并且信息是否是 用户信息验证失败
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    // 只要token校验失败，也去login
    router.push('/login')

    // 把过期的信息删除
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    // 给一个提示的消息
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // config指的就是请求的配置参数
  // console.log('我拦截到了请求', config)
  // 通过config.headers来设置请求头

  // 如果有token，我们就给接口携带上token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// ---------------------过滤器--------------------------------
Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
