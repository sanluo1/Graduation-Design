//这里是vuex的模块化开发
//把每个组件都用单独的文件装数据 模块化开发
//更容易的开发 维护


import Vue from 'vue'
import Vuex from 'vuex'
//使用vuex插件
 Vue.use(Vuex)




//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'
 //暴露Vuex的store对象实例
export default new Vuex.Store({
   modules:{
    //注册小仓库
    home,
    search,
    detail,
    shopCart,
    user,
    trade
   }
})