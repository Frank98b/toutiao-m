import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import Vant from 'vant'
// 引入vant所有组件
import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'
// 引入用于设置rem基准值
import 'amfe-flexible'
// 引入dayjs
import '@/utils/dayjs'
// 注册vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
