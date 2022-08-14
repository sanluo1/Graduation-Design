import { reqGoodsInfo ,reqShopInfo } from "@/api";
//封装了一个生成一个随机字符串--只要有一次就不能在变了
//游客模式
//一般情况下需要登录才能实现从后端获取购物车数据，因为你不登录你后端不知道给你哪个数据，你没有身份，所以用来一个uuid生成随机字符串来识别你的身份
import {getUUID} from '@/utile/uuid_token'
const state={
   goodinfo:{},
   //游客模式下也需要有个购物车数据
   //uuid是一个生成随机数的js库
   uuid_token:getUUID(),
}
const mutations={
 
    GETGOODINFO(state,goodinfo){
        state.goodinfo = goodinfo
  
    }
};
const actions={
    //产品信息
     async getGoodsInfo({commit,state,dispatch},skuId){
        let result = await reqGoodsInfo(skuId);
        console.log(result)
        if(result.code==200){
            commit("GETGOODINFO",result.data)
        }
    },
    //购物车网络请求
    async getShopCart({commit,state,dispatch},{skuId,skuNum}){
        //注意：async函数返回的一定是一个promise【要么成功，要么失败】
        let result =  await reqShopInfo(skuId,skuNum)
        console.log(result)
        if(result.code==200){
            //如果状态码是200 返回一个ok的标记
        return 'ok';
        }else{
            //如果失败了，返回一个错误 faile
            return Promise.reject(new Error('失败了'))
        }
    }
};
const getters={
    //万一网不好的话可能会报错因为你没数据他渲染会报错
    //所以给他加个管道符给他个空对象这样他就不会报错了
    categoryView(){
        return state.goodinfo.categoryView||{};
    },
    //简化产品信息的数据
    skuInfo(){
        return state.goodinfo.skuInfo||{};
    },
    //简化产品售卖属性的数据
    spuSaleAttrList(){
        return state.goodinfo.spuSaleAttrList||[]
    }
};


export default {
    state,
    mutations,
    actions,
    getters,

}
