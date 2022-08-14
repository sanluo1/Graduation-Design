//这个是创建了一个生成随机数的一个模块
//需要暴露一个getUUID
//每次执行不能发生变化，且游客身份持久存储
import { v4 as uuidv4 } from 'uuid';
export const getUUID = ()=>{
    //先从本地存储看以下你有没有uuid_token
   let uuid_token = localStorage.getItem('UUIDTOKEN');
   //如果没有uuid_token
   if(!uuid_token){
    //随机生成一个游客临时身份 随机的字符串
     uuid_token = uuidv4();
     //存储到本地
     localStorage.setItem('UUIDTOKEN',uuid_token)
   }
   //存储到本地还要在返回 否则的话undfind
   return uuid_token;
}


//装逼技巧加1 封装了一个把token存到本地存储的东西
//就一行代码而已没啥软用
export const setToken =(token)=>{
  //形参 会在后边把参数传进来的
  localStorage.setItem('TOKEN',token)
}

//封装一个删除本地存储的token函数
export const clearToken=()=>{
  localStorage.removeItem('TOKEN')
}
