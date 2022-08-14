//这个文件是对axios做二次封装
//做一个请求拦截器和响应拦截器
//主要是对请求发送前和发送请求后做的事



// 引入axios
import store from '@/store';
import axios from 'axios';

//引入进度条
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'

//start：进度条开始
//done：进度条结束



//request其实就是axios
//axios.create其实就是配置对象
const request = axios.create({
//基础路径 接口路径都带有/api 路径
   baseURL: "/api",
  //超时时间是5秒 5000是毫秒
  timeout:5000
});

//请求拦截器
//这里可以处理发送请求前可以处理的事
request.interceptors.request.use((config)=>{
  //config:配置对象，对象里有个东西很重要，headers请求头
  if(store.state.detail.uuid_token){
    //给后端发送了一个数据 加了个请求头 请求头添加一个字段 userTempId
    config.headers.userTempId = store.state.detail.uuid_token
  }
    if(store.state.user.token){
     config.headers.token = store.state.user.token
    }
  //进度条开始
  nProgress.start();
  return config;
});


   //响应拦截器
   //这里可以处理请求成功了数据到了这里可以做的事
request.interceptors.response.use((res)=>{
    //进度条结束
    nProgress.done();
  
   return res.data;
}),(error)=>{
     //请求失败了可以做的事
     console.log(error)
}




//暴露axios
export default request;



