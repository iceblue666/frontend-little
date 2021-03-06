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
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'


// 引入图片查看器
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

// 引入mockjs
require('./mock.js');

// 配置公共URL
// Axios.defaults.baseURL = ' https://easy-mock.com/mock/5c7f92c788e28e3357e28d9e/v1'
// 配置axios
Vue.prototype.$axios = Axios;

import EventBus from './EventBus'

Vue.prototype.$bus = EventBus;


// 注册全局导航栏组件
import Navbar from '@/components/Common/Navbar'
Vue.component(Navbar.name,Navbar);

// 注册全局评论组件
import Comment from '@/components/Common/Comment'
Vue.component(Comment.name,Comment);

// 注册全局轮播组件
import MySwiper from '@/components/Common/MySwiper'
Vue.component(MySwiper.name,MySwiper);




// 自定义Moment全局过滤器
Vue.filter('converTime',(data, formatStr) => Moment(data).format(formatStr));

// 自定义相对事件过滤器
Vue.filter('relativeTime',(data) => Moment(data).fromNow());

// Moment设置中文
Moment.locale('zh-cn')

// 设置字数显示过滤器
Vue.filter('controllShow',function(str,num){
  if(str.length <= num){
    return str;
  }
  else{
    return str.substr(0,num-1)+"..."
  }
})

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  Mint.Indicator.open({
    text:'玩命加载ing...'
  })

  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  Mint.Indicator.close();
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
