//home模块小仓库
import {reqCategory, reqgetBannerList, reqgetFloorList} from '@/api'
import store from '..';
const state={
    categoryList:[],
    bannerlist:[],
    floorlist:[]
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerlist){
        state.bannerlist=bannerlist
    },
    GETFLOORLIST(state,floorList){
        state.floorlist=floorList
    }

};
const actions={
     async category({commit}){
     let result = await reqCategory();
     if(result.code==200){
        //如果状态码是200的话
        //发送commit给mutations，让mutations存储数据到state
        store.commit("CATEGORYLIST",result.data),
        //收到的数据有17个，但17个数据多了一个 所以指定数据长度为16个
        state.categoryList.length=16
     }
   
    },
   async getBannerList({commit}){
       let result=await  reqgetBannerList();
        if(result.code==200){
            store.commit("GETBANNERLIST",result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqgetFloorList();
        if(result.code==200){
            store.commit("GETFLOORLIST",result.data)
        }
    }
};
const getters={};
export default {
    state,
    mutations,
    actions,
    getters
}

//state:仓库的数据
//mutations：修改state的唯一手段
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步
//getters:相当于计算属性，用于简化仓库数据，让组件获取仓库数据更方便