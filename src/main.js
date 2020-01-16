import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入lib-flexible
import 'lib-flexible'

// 导入通用的样式
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'

// 导入自己封装的hm-button组件
import HmButton from './components/hm-button.vue'
import HmInput from './components/hm-input.vue'
import { Button, Toast } from 'vant'

Vue.use(Button)
Vue.use(Toast)
Vue.component('HmButton', HmButton)
Vue.component('HmInput', HmInput)
// 使用vant这个ui组件库的插件， 会把vant中所有的组件都全局的注册

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
