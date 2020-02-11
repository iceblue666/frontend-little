import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false

// 使用mint-ui 引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

// 引入全局css文件
import '../static/css/global.css'

// 引入mockjs
require('./mock.js');

// 配置公共URL
// Axios.defaults.baseURL = ' https://easy-mock.com/mock/5c7f92c788e28e3357e28d9e/v1'
// 配置axios
Vue.prototype.$axios = Axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
