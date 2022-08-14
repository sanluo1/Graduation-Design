//search模块小仓库
import {reqgetSearchlnfo} from "@/api";
//引入这个api请求
const state={
    searchList:{}
};
const mutations={
     GETSEARCHLIST(state,searchList){
       state.searchList = searchList
     }
};
const actions={
    async getsearchList({commit},params={}){
      let result = await reqgetSearchlnfo(params)
      if(result.code == 200){
        commit('GETSEARCHLIST',result.data)
      }
     }
};
//计算属性 为简化数据而生
const getters={
  //当前形参state：是当前仓库的state，不是大仓库的state
      goosList(state){
        //这样写是有问题的
        //因为你要考虑一些别的问题 比如你要是请求没发出去的话 是undifind 会直接报错整个页面估计也出不来
        //这个我没运行过
        //但确实是这个问题
        return  state.searchList.goodsList||[]
      },
      attrsList(state){
        //返回一个searchList数据的attesList
        return state.searchList.attrsList
      },
      trademarkList(state){
        return state.searchList.trademarkList
      }
};
export default {
    state,
    mutations,
    actions,
    getters,

}




//state:仓库的数据
//mutations：修改state的唯一手段
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步
//getters:相当于计算属性，用于简化仓库数据，让组件获取仓库数据更方便