import { reqshopCart,reqDeleteCart,/*qUpdateChecked*/} from "@/api";
const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
     state.cartList =cartList
    }
}
const actions={
    async getCartList({commit}){
     let result = await reqshopCart();
     if(result.code==200){
        commit("GETCARTLIST",result.data)
    }
    },
    async deleteCartById({ commit, state, dispatch }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
             return 'ok';
        } else {
             return Promise.reject();
        }
   },
    /*asyne ,changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked);
    if (result.code == 200) {
         return 'ok';
    } else {
         return Promise.reject(new Error('failer'));
    }
     */
    //删除选中的产品
    //这个没有专门的网络请求 直接调用上面的删除单个的网络请求就可以删除全部的
     deleteCartList({dispatch,getters}){
        //context:上下文 一个小仓库 相当于你这个小仓库的实例了
        getters.cartList.cartInfoList.forEach(item => {
            //做了个判断 如果isChecked等于1
            //则派发action 删除选中的商品 
            //但我上个没做好，所以直接删除全部的
          if(item.isChecked==1){
            dispatch('deleteCartById',item.skuId)
          }
        });
        
     }

}
const getters={
    cartList(){
        return state.cartList[0]||{}
    }
}


export default {
    state,
    mutations,
    actions,
    getters,

}

