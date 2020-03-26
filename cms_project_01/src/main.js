import Vue from 'vue'
import App from './App'
import router from './router/index'
import Axios from 'axios'

import Moment from 'moment'

Vue.config.productionTip = false

// 使用mint-ui 引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

// 引入全局css文件
import '../static/css/global.css'

// 引入awesome图标库
import 'vue-awesome'


// 引入mockjs
require('./mock.js');

// 配置公共URL
// Axios.defaults.baseURL = ' https://easy-mock.com/mock/5c7f92c788e28e3357e28d9e/v1'
// 配置axios
Vue.prototype.$axios = Axios;

import Navbar from '@/components/Common/Navbar'
Vue.component(Navbar.name,Navbar);

// 自定义Moment全局过滤器
Vue.filter('converTime',(data, formatStr) => Moment(data).format(formatStr));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
