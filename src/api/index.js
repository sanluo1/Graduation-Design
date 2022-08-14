//接口统一管理

import request from './request';
import mockRequest from './mockAjax'

//这个接口有跨域问题 所以在vue.config.js有一个代理处理器 就能解决跨域问题
//处理器与处理器是没有跨域问题的




export const reqCategory = ()=>request.get('/product/getBaseCategoryList')


export const reqgetBannerList = ()=>mockRequest.get('/banner')


export const reqgetFloorList = ()=>mockRequest.get('/floor')

//获取搜索接口 需要发请求带参数 至少是一个空对象
export const reqgetSearchlnfo = (params)=>request({url:"/list",method:"post",data:params})

export const reqGoodsInfo = (skuId)=>request({url:`/item/${skuId}`,method:"get"})
//需要带两个参数 一个是产品id 一个是产品个数
export const reqShopInfo = (skuId,skuNum)=>request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})


export const reqshopCart = ()=>request.get('/cart/cartList')



export const reqDeleteCart = (skuId)=>request({url:`/cart/deleteCart/${skuId}`,method:'delete'});


//不知道为啥网络发不出去
//也不是啥要紧的需求
//不做也罢
//就是标记多选框的一个网络请求
export const reqUpDateCartById = (skuId,isChecked)=>request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'});
export const reqUpdateChecked=(skuId,isChecked)=>request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'});


//获取验证码
export const reqGetCode = (phone)=>request({url:`/user/passport/sendCode/${phone}`,method:'get'})
//完成注册
export const reqGetUserCode =(data)=>request({url:'/user/passport/register',data,method:'POST'})
//完成登录

export const reqUserLogin = (data)=>request({url:'/user/passport/login',data,method:'POST'})

export const reqUserInfo = (data)=>request({url:'/user/passport/auth/getUserInfo',method:'get'})

export const reqLoginOut =()=>request({url:'/user/passport/logout',method:'GET'})

//获取用户地址信息 因为你没设置过地址 所以你只能用老师的账号获取 13700000000 111111
export const reqAddressInfo =()=>request({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取交易页商品信息
export const reqThingInfo =()=>request({url:'/order/auth/trade',method:'GET'})


//提交订单
export const reqThingInfoList =(tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'})

//获取支付信息
export const reqThingobj = (orderId)=>request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付成功与否信息
export const reqThingArray = (orderId)=>request({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})

export const reqUser = (page,limit)=>request({url:`/order/auth/${page}/${limit}`,method:'get'})

export const reqUSER = ()=>request({url:'/homepage/block/page',method:'GET'})



  

