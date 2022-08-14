import { reqGetCode,reqGetUserCode,reqUserLogin,reqUserInfo,reqLoginOut} from "@/api";
import {setToken,clearToken} from '@/utile/uuid_token'
const state={
    code:'',
    token:localStorage.getItem('TOKEN')||'',
    userInfo:{}
}
const mutations={
     GETCODE(state,code){
        state.code = code
     },
     GETLOGINTOKEN(state,token){
        state.token = token 
     },
     GETUSER(state,userInfo){
        state.userInfo = userInfo
     },
     //删除本地数据
     CLEAK(state){
       state.code='',
       state.userInfo='',
       clearToken();
     } 
}
const actions={ 
    //获取验证码的接口，但正常情况下，后台应该把验证码发到手机上，但这样得花钱做
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE',result.data)
            return 'ok';
       } else{
            return Promise.reject(new Error('failer'));
       }
      },
      //完成注册
    async getUser({commit},user){
           let result =  await reqGetUserCode(user);
           console.log(result)
    },
    //登录业务（token）
    async getUserInfo({commit},data){
    let result = await reqUserLogin(data);
     //通过这个接口服务器会给你发token【令牌】 相当于你的身份证
     //一般会存储到浏览器的
     if(result.code==200){
        commit('GETLOGINTOKEN',result.data.token);
       //把token存到本地  
       setToken(result.data.token)
        return 'ok'
     }else{
        return Promise.reject(new Error('faile'))
     }
    },
    //获取用户信息
    async getUserInfoListOBJ({commit},data){
     let result = await reqUserInfo(data);
     if(result.code==200){
      commit('GETUSER',result.data);
      return 'ok'
     }else{
      return Promise.reject(new Error('失败了'))
     }
    },
    //退出登录
    async getLoginOut({commit}){
      let result =  await reqLoginOut();
       //退出登录以后还要把token等信息都删除了
       if(result.code==200){
         //只有派发commit才能去修改state的数据
         commit('CLEAK')
       }
    }
 }
const getters={}


export default {
    state,
    mutations,
    actions,
    getters,

}