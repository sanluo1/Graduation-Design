import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入路由
import router from '@/router'
//引入全局组件
import TypeNav from '@/components/TypeNav';

//引入api请求
import {reqCategory} from '@/api';
reqCategory();
import {reqgetSearchlnfo} from '@/api';
reqgetSearchlnfo({});


//mock：模拟 就是一些假数据 不会向后端发送请求
//引入mock数据
//mockServer没有暴露 所以直接引入就行
import '@/mock/mockServer';

import 'swiper/css/swiper.css'
//引入vuex
import store from './store'
//注册组件 第一个参数是注册的名字 第二个是哪个组件
Vue.component(TypeNav.name,TypeNav),
//注册组件 elementui按需引入的注册
 
Vue.use(ElementUI);


Vue.config.productionTip = false

//所以接口api统一暴露
import * as API from '@/api'
console.log(API)
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this;
    //所以接口都统一到$API了，不需要在引入了
    Vue.prototype.$API=API;
  },
  //注册路由 :这里是key value 一致的情况下 即router：router
  router,
  //注册vuex
   store,

}).$mount('#app')
